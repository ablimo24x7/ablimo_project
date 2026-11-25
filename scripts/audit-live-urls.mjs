/* Comprehensive live URL discovery for AB locations + services. */
import https from "node:https";
import fs from "node:fs";
import path from "node:path";

const BASE = "https://www.ab.limo";
const ORIGIN = new URL(BASE).origin;
const TARGET_RE = /^\/en-US\/(?:locations|services)(?:\/|$)/;
const LINK_RE = /href=["'](\/en-US\/(?:locations|services)[^"'#?]*)["']/g;
const UA = "Mozilla/5.0 (compatible; ABUrlAudit/1.0)";

function fetchUrl(url, redirectsLeft = 5) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      { headers: { "user-agent": UA, accept: "text/html" }, timeout: 25000 },
      (res) => {
        const status = res.statusCode || 0;
        const loc = res.headers.location;
        if (status >= 300 && status < 400 && loc && redirectsLeft > 0) {
          res.resume();
          const next = new URL(loc, url).toString();
          return resolve(fetchUrl(next, redirectsLeft - 1));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () =>
          resolve({
            status,
            headers: res.headers,
            body: Buffer.concat(chunks).toString("utf8"),
            finalUrl: res.responseUrl || url,
          })
        );
      }
    );
    req.on("timeout", () => req.destroy(new Error("timeout")));
    req.on("error", reject);
  });
}

function normalizePath(p) {
  let x = p.split("?")[0].split("#")[0];
  try {
    if (/^https?:/i.test(x)) x = new URL(x).pathname;
  } catch {
    /* keep */
  }
  if (x.length > 1 && x.endsWith("/")) x = x.slice(0, -1);
  return x;
}

function extractLinks(html) {
  const out = new Set();
  for (const m of html.matchAll(LINK_RE)) {
    const p = normalizePath(m[1]);
    if (TARGET_RE.test(p)) out.add(p);
  }
  for (const m of html.matchAll(
    /href=["'](https?:\/\/(?:www\.)?ab\.limo\/en-US\/(?:locations|services)[^"'#?]*)["']/g
  )) {
    const p = normalizePath(m[1]);
    if (TARGET_RE.test(p)) out.add(p);
  }
  return out;
}

function classify(p) {
  const rel = p.replace(/^\/en-US/, "");
  if (rel === "/locations") return "locations-index";
  if (rel === "/locations/cities") return "cities-index";
  if (rel === "/services") return "services-index";
  if (/^\/locations\/[^/]+\/[^/]+\/airport\//.test(rel)) return "airport";
  if (/^\/locations\/[^/]+\/[^/]+\/routes\//.test(rel)) return "route";
  if (/^\/locations\/[^/]+\/[^/]+$/.test(rel)) return "city";
  if (/^\/locations\/[^/]+$/.test(rel)) return "country";
  // static airport-transfers subpages (not country pages)
  if (/^\/services\/airport-transfers\/(drop-off|pickup|vip-tarmac)$/.test(rel))
    return "service-subpage";
  if (/^\/services\/[^/]+\/[^/]+\/[^/]+/.test(rel)) return "service-city";
  if (/^\/services\/[^/]+\/[^/]+/.test(rel)) return "service-country";
  if (/^\/services\/[^/]+$/.test(rel)) return "service";
  return "other";
}

async function mapPool(items, limit, fn) {
  const results = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length || 1) }, worker)
  );
  return results;
}

function sortPaths(paths) {
  const rank = {
    "locations-index": 0,
    "cities-index": 1,
    country: 2,
    city: 3,
    airport: 4,
    route: 5,
    "services-index": 6,
    service: 7,
    "service-subpage": 8,
    "service-country": 9,
    "service-city": 10,
    other: 11,
  };
  return paths.slice().sort((a, b) => {
    const ra = rank[classify(a)] ?? 99;
    const rb = rank[classify(b)] ?? 99;
    if (ra !== rb) return ra - rb;
    return a.localeCompare(b);
  });
}

/** Local static dataset seeds (may exist live even if unlinked). */
function localSeeds() {
  const countries = [
    "bahrain",
    "kuwait",
    "oman",
    "qatar",
    "saudi-arabia",
    "uae",
    "united-arab-emirates",
  ];
  const citiesByCountry = {
    bahrain: ["manama", "riffa", "muharraq"],
    kuwait: ["kuwait-city", "hawalli", "farwaniya", "al-ahmadi", "salmiya"],
    oman: ["muscat", "salalah", "sohar"],
    qatar: ["doha", "al-khor", "lusail", "al-wakrah"],
    "saudi-arabia": [
      "riyadh",
      "jeddah",
      "mecca",
      "medina",
      "dammam",
      "tabuk",
      "al-ula",
      "al-khobar",
      "al-qasim",
      "abha",
      "jizan",
      "neom",
      "hail",
      "jubail",
      "najran",
      "taif",
      "yanbu",
    ],
    uae: [
      "dubai",
      "abu-dhabi",
      "sharjah",
      "ajman",
      "ras-al-khaimah",
      "al-ain",
      "fujairah",
      "umm-al-quwain",
    ],
    "united-arab-emirates": [
      "dubai",
      "abu-dhabi",
      "sharjah",
      "ajman",
      "ras-al-khaimah",
      "al-ain",
      "fujairah",
      "umm-al-quwain",
    ],
  };
  const seeds = ["/en-US/locations", "/en-US/locations/cities", "/en-US/services"];
  for (const c of countries) {
    seeds.push(`/en-US/locations/${c}`);
    for (const city of citiesByCountry[c] || []) {
      seeds.push(`/en-US/locations/${c}/${city}`);
    }
  }
  return seeds;
}

async function sitemapSeeds() {
  const seeds = [];
  try {
    const sm = await fetchUrl(`${BASE}/sitemap.xml`);
    for (const m of sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const u = m[1];
      if (!u.includes("/en-US/")) continue;
      let p;
      try {
        p = normalizePath(new URL(u).pathname);
      } catch {
        continue;
      }
      // Canonical location/service paths
      if (TARGET_RE.test(p)) seeds.push(p);
      // Sitemap stores city service articles under /blog/services/...;
      // live routes are /services/...
      if (p.startsWith("/en-US/blog/services/")) {
        seeds.push(p.replace("/en-US/blog/", "/en-US/"));
      }
      // Legacy UAE long slug → also probe (redirect expected)
    }
  } catch (e) {
    console.warn("sitemap seed failed", e.message);
  }
  return seeds;
}

async function main() {
  const seeds = [
    ...localSeeds(),
    ...(await sitemapSeeds()),
  ];

  // Probe matrix: service × country for service-country pages
  const serviceSlugs = [
    "chauffeur-vip",
    "airport-transfers",
    "corporate-transportation",
    "event-transportation",
    "bus-coach-hire",
    "tourism-transportation",
    "religious-tourism",
    "executive-chauffeur",
    "chauffeur-hailing",
    "hourly-chauffeur",
    "city-transfers",
    "intercity-transfers",
    "limousine-services",
    "bus-charter",
    "mini-bus-charter",
    "coach-charter",
    "airport-coach-transfers",
    "executive-corporate-mobility",
    "vip-diplomatic-government",
    "corporate-fleet",
    "group-coach-charter",
    "tourism-leisure",
    "premium-lifestyle",
    "cross-border-mobility",
    "city-to-city",
    "religious-tourism",
  ];
  const countrySlugs = [
    "bahrain",
    "kuwait",
    "oman",
    "qatar",
    "saudi-arabia",
    "uae",
    "united-arab-emirates",
  ];
  const cityPairs = [
    ["saudi-arabia", "riyadh"],
    ["saudi-arabia", "jeddah"],
    ["saudi-arabia", "mecca"],
    ["saudi-arabia", "medina"],
    ["saudi-arabia", "dammam"],
    ["saudi-arabia", "al-khobar"],
    ["saudi-arabia", "abha"],
    ["saudi-arabia", "jizan"],
    ["saudi-arabia", "neom"],
    ["saudi-arabia", "tabuk"],
    ["saudi-arabia", "al-ula"],
    ["saudi-arabia", "al-qasim"],
    ["qatar", "doha"],
    ["qatar", "al-khor"],
    ["qatar", "lusail"],
    ["kuwait", "kuwait-city"],
    ["kuwait", "farwaniya"],
    ["kuwait", "hawalli"],
    ["kuwait", "al-ahmadi"],
    ["bahrain", "manama"],
    ["oman", "muscat"],
    ["uae", "dubai"],
    ["uae", "abu-dhabi"],
    ["uae", "sharjah"],
    ["united-arab-emirates", "dubai"],
    ["united-arab-emirates", "abu-dhabi"],
  ];

  for (const s of serviceSlugs) {
    seeds.push(`/en-US/services/${s}`);
    for (const c of countrySlugs) {
      seeds.push(`/en-US/services/${s}/${c}`);
    }
    for (const [c, city] of cityPairs) {
      seeds.push(`/en-US/services/${s}/${c}/${city}`);
    }
  }

  // Known sitemap-only city slugs (e.g. alula vs al-ula)
  const sitemapServiceCity = [
    ["chauffeur-vip", "saudi-arabia", "alula"],
    ["airport-transfers", "saudi-arabia", "alula"],
    ["corporate-transportation", "saudi-arabia", "alula"],
    ["event-transportation", "saudi-arabia", "alula"],
    ["bus-coach-hire", "saudi-arabia", "alula"],
    ["tourism-transportation", "saudi-arabia", "alula"],
  ];
  for (const [s, c, city] of sitemapServiceCity) {
    seeds.push(`/en-US/services/${s}/${c}/${city}`);
  }

  const seedList = [...new Set(seeds.map(normalizePath))].filter((p) =>
    TARGET_RE.test(p)
  );
  console.log("seed count", seedList.length);

  // Phase 1: BFS crawl from index pages to discover linked URLs
  const bfsSeeds = [
    "/en-US/locations",
    "/en-US/locations/cities",
    "/en-US/services",
    ...localSeeds(),
  ];
  const seen = new Set();
  const queue = [...new Set(bfsSeeds.map(normalizePath))];
  const statuses = new Map();

  while (queue.length) {
    const batch = queue.splice(0, 12);
    const fresh = batch.filter((p) => !seen.has(p));
    fresh.forEach((p) => seen.add(p));
    if (!fresh.length) continue;
    console.log(
      `bfs batch=${fresh.length} seen=${seen.size} queue=${queue.length}`
    );
    await mapPool(fresh, 12, async (p) => {
      try {
        const r = await fetchUrl(ORIGIN + p);
        statuses.set(p, r.status);
        if (r.status >= 200 && r.status < 400) {
          for (const link of extractLinks(r.body)) {
            if (!seen.has(link) && !queue.includes(link)) queue.push(link);
          }
        }
      } catch (e) {
        statuses.set(p, -1);
        console.warn("fetch fail", p, e.message);
      }
    });
  }

  // Phase 2: verify seed/probe URLs not already known
  const toProbe = seedList.filter((p) => !seen.has(p));
  console.log("probe count", toProbe.length);

  const CONCURRENCY = 16;
  let done = 0;
  await mapPool(toProbe, CONCURRENCY, async (p) => {
    try {
      const r = await fetchUrl(ORIGIN + p);
      statuses.set(p, r.status);
      // Only keep 200s (or final after redirect) as discovered live pages
      if (r.status === 200) {
        seen.add(p);
        // extract links from successful probes too
        for (const link of extractLinks(r.body)) {
          if (!seen.has(link) && !toProbe.includes(link) && !queue.includes(link)) {
            // will verify in a light second pass if new
            toProbe.push(link);
          }
        }
      }
    } catch {
      statuses.set(p, -1);
    }
    done++;
    if (done % 50 === 0) console.log(`probed ${done}/${toProbe.length}`);
  });

  // Second pass for newly added links
  const second = toProbe.filter((p) => !seen.has(p) && statuses.get(p) === undefined);
  if (second.length) {
    console.log("second pass", second.length);
    await mapPool(second, CONCURRENCY, async (p) => {
      try {
        const r = await fetchUrl(ORIGIN + p);
        statuses.set(p, r.status);
        if (r.status === 200) seen.add(p);
      } catch {
        statuses.set(p, -1);
      }
    });
  }

  // Final inventory: all paths we ever looked at that returned 200
  const okPaths = sortPaths(
    [...statuses.entries()].filter(([, s]) => s === 200).map(([p]) => p)
  );
  const redirectPaths = sortPaths(
    [...statuses.entries()]
      .filter(([, s]) => s >= 300 && s < 400)
      .map(([p]) => p)
  );
  const errorPaths = [...statuses.entries()]
    .filter(([, s]) => (s >= 400 && s < 600) || s === -1)
    .map(([p, s]) => ({ path: p, status: s, type: classify(p) }))
    .sort((a, b) => a.path.localeCompare(b.path));

  const groups = [
    ["Location index pages", ["locations-index", "cities-index"]],
    ["Country location pages", ["country"]],
    ["City location pages", ["city"]],
    ["Airport location pages", ["airport"]],
    ["City route pages", ["route"]],
    ["Service index pages", ["services-index"]],
    ["Service pages", ["service"]],
    ["Service subpages", ["service-subpage"]],
    ["Service country pages", ["service-country"]],
    ["Service city pages", ["service-city"]],
    ["Other location/service pages", ["other"]],
  ];

  const byType = {};
  for (const p of okPaths) {
    const t = classify(p);
    (byType[t] ||= []).push(p);
  }

  const lines = [];
  lines.push("# AB Live URL Inventory (en-US)");
  lines.push("");
  lines.push(
    `Source: live crawl of \`${BASE}\` + sitemap seeds + local static location seeds.`
  );
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push("");
  lines.push(`- HTTP 200 URLs: **${okPaths.length}**`);
  lines.push(`- Redirecting URLs: **${redirectPaths.length}**`);
  lines.push(`- Error / not found: **${errorPaths.length}**`);
  lines.push("");
  lines.push(
    "All URLs below returned **HTTP 200** at crawl time. Canonical host: `https://www.ab.limo`."
  );
  lines.push("");

  for (const [title, types] of groups) {
    const items = types.flatMap((t) => byType[t] || []);
    if (!items.length) continue;
    lines.push(`## ${title} (${items.length})`);
    lines.push("");
    for (const p of items) lines.push(`- ${BASE}${p}`);
    lines.push("");
  }

  const examples = [
    "/en-US/locations",
    "/en-US/locations/cities",
    "/en-US/locations/saudi-arabia/riyadh",
    "/en-US/services/chauffeur-vip",
    "/en-US/services/chauffeur-vip/saudi-arabia/mecca",
  ];
  lines.push("## Example pattern checks");
  lines.push("");
  const okSet = new Set(okPaths);
  for (const ex of examples) {
    lines.push(
      `- ${BASE}${ex} — ${okSet.has(ex) ? "found (200)" : "NOT FOUND (200)"}`
    );
  }
  lines.push("");

  if (redirectPaths.length) {
    lines.push("## Redirects (not canonical)");
    lines.push("");
    for (const p of redirectPaths)
      lines.push(`- ${BASE}${p} → ${statuses.get(p)}`);
    lines.push("");
  }

  if (errorPaths.length) {
    lines.push("## Errors / not found");
    lines.push("");
    for (const e of errorPaths)
      lines.push(`- ${BASE}${e.path} — ${e.status} (${e.type})`);
    lines.push("");
  }

  lines.push("## Flat list (all HTTP 200)");
  lines.push("");
  lines.push("```");
  for (const p of okPaths) lines.push(BASE + p);
  lines.push("```");
  lines.push("");

  const outPath = path.join(process.cwd(), "live-urls.md");
  fs.writeFileSync(outPath, lines.join("\n"), "utf8");

  const summary = {};
  for (const p of okPaths) {
    const t = classify(p);
    summary[t] = (summary[t] || 0) + 1;
  }
  console.log("wrote", outPath);
  console.log("200 summary", summary);
  console.log("errors", errorPaths.length, "redirects", redirectPaths.length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
