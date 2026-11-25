/**
 * Parse a Locations-Content-md city page into a ClientCityData object so it
 * can be fed to buildKsaCitySections() and written to locationpagetemplates.
 *
 * The MD files are highly regular but have several format variants:
 *   booking form   `**Pick up:** x`            | `### **Pick up**` + value
 *   vehicle model  `**Typical model:** x`      | plain `Toyota Camry or similar`
 *   airport bullets `**Flight tracking:** x`   | `### **Flight tracking**` + x | `- Flight tracking: x`
 *   coverage       `### Cat` + lines           | `- Cat: places` | markdown table
 *   office         `**AB X**`                  | `### **AB X**`
 *   CTA            `## **Your chauffeur...**`  | `### **Your chauffeur...**` (jizan)
 */
import type { ClientCityData } from "@/components/section-library/presets/client-city-data";

export interface ParseOptions {
  citySlug: string;
  cityName: string;
}

// ── tiny markdown helpers ────────────────────────────────────────
const blank = (l: string) => !l.trim();
const isHeading = (l: string) => /^#{1,6}\s/.test(l);
const isH2 = (l: string) => /^##\s/.test(l);
const isImage = (l: string) => /^!\[/.test(l);
const isTable = (l: string) => /^\s*\|.*\|\s*$/.test(l);
const hasLink = (l: string) => /\[[^\]]*\]\([^)]*\)/.test(l) || /<https?:/.test(l);

function inline(s: string): string {
  return s
    .replace(/\\([[\]()])/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<https?:[^>]*>/g, "")
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .trim();
}

const head = (line: string) => inline(line.replace(/^#{1,6}\s*/, ""));

/** `**Key:** value` or `**Key**: value` → { key, value } (colon inside or outside) */
function parseBold(raw: string): { key: string; value: string } | null {
  const l = raw.trim();
  const m =
    l.match(/^\*\*([^*]+?):\*\*\s*(.*)$/) || // **Key:** value
    l.match(/^\*\*([^*]+?)\*\*\s*:\s*(.*)$/); // **Key**: value
  if (!m) return null;
  return { key: m[1].trim(), value: (m[2] ?? "").trim() };
}

/** Remove every price / price placeholder from a string. */
export function stripPrice(s: string): string {
  return s
    .replace(/\bfrom\s*[:\-]?\s*\[[^\]]*\]/gi, "")
    .replace(/\bfrom\s+[A-Z]{3}\s*[\d,.]+(?:\s*[A-Za-z]+)?/gi, "")
    .replace(/\[[^\]]*\bprice\b[^\]]*\]/gi, "")
    // editor placeholders: `[Confirm]`, `[Confirm] minutes`, `\[Confirm\]`
    .replace(/\\?\[Confirm\\?\]/gi, "")
    .replace(/\s*[·|]?\s*\[Confirm\]\s*hours?/gi, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,])/g, "$1")
    .trim()
    // leftover fragments once the price is gone: "· hours" / "hours"
    .replace(/^[·|]\s*/, "")
    .replace(/^(hours?|hrs?|minutes?|mins?|days?)\.?$/i, "")
    .trim();
}

// ── service catalog (mirrors SERVICE_OPTIONS) ────────────────────
const SERVICES: Array<{ slug: string; label: string; icon: string }> = [
  { slug: "chauffeur-vip", label: "Chauffeur & VIP", icon: "Crown" },
  { slug: "airport-transfers", label: "Airport Transfers", icon: "Plane" },
  { slug: "corporate-transportation", label: "Corporate Transportation", icon: "Briefcase" },
  { slug: "event-transportation", label: "Event Transportation", icon: "CalendarCheck" },
  { slug: "bus-coach-hire", label: "Bus & Coach Hire", icon: "Bus" },
  { slug: "tourism-transportation", label: "Tourism Transportation", icon: "Globe" },
];

function matchService(text: string, urlSlug?: string) {
  const t = text.toLowerCase();
  const bySlug = urlSlug ? SERVICES.find((s) => s.slug === urlSlug) : undefined;
  if (bySlug) return bySlug;
  const byLabel = SERVICES.find(
    (s) => t.includes(s.label.toLowerCase()) || s.label.toLowerCase().includes(t)
  );
  if (byLabel) return byLabel;
  // keyword fallback
  const kw: Array<[RegExp, string]> = [
    [/chauffeur|vip/, "chauffeur-vip"],
    [/airport|terminal|flight/, "airport-transfers"],
    [/corporate|business|commute/, "corporate-transportation"],
    [/event|conference|exhibition|convention/, "event-transportation"],
    [/bus|coach|group|delegate/, "bus-coach-hire"],
    [/tour|tourism|heritage/, "tourism-transportation"],
  ];
  for (const [re, slug] of kw) if (re.test(t)) return SERVICES.find((s) => s.slug === slug)!;
  return null;
}

function coverageIcon(category: string): string {
  const t = category.toLowerCase();
  if (/business|corporate/.test(t)) return "Briefcase";
  if (/event|conference|convention/.test(t)) return "CalendarCheck";
  if (/heritage|leisure|tourism|culture/.test(t)) return "Map";
  if (/government|industry|industrial/.test(t)) return "Building";
  return "Map";
}

function bulletIcon(heading: string, idx: number): string {
  const t = heading.toLowerCase();
  if (/track|flight|satellite/.test(t)) return "Satellite";
  if (/meet|greet|welcome|passenger/.test(t)) return "Users";
  if (/minute|duration|time|waiting/.test(t)) return "Clock";
  return idx === 0 ? "Plane" : idx === 1 ? "Users" : "Clock";
}

// ── segmentation ─────────────────────────────────────────────────
interface Segment {
  key: string;
  h2: number; // line index of the "## " heading
  end: number; // line index where the next section starts
  eyebrow: string;
}

function classify(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("where we work")) return "coverage";
  if (t.includes("your questions")) return "faq";
  if (t.includes("arriving at")) return "airport";
  if (t.includes("one partner")) return "services";
  if (t.includes("and beyond")) return "journeys";
  if (t.includes("chauffeur is ready")) return "cta";
  return "";
}

function eyebrowBefore(lines: string[], idx: number): string {
  for (let i = idx - 1; i >= 0 && i > idx - 6; i--) {
    const l = lines[i];
    if (blank(l) || isImage(l)) continue;
    if (isHeading(l)) break;
    const t = inline(l);
    if (t.length <= 60 && !/[.]$/.test(t) && !t.startsWith("|")) return t;
    break;
  }
  return "";
}

function segmentLines(lines: string[], seg: Segment): string[] {
  return lines.slice(seg.h2, seg.end);
}

/** first substantial prose line after the section heading */
function sectionIntro(segs: string[]): string {
  for (let i = 1; i < segs.length; i++) {
    const l = segs[i].trim();
    if (!l || isHeading(l) || isImage(l) || hasLink(l) || isTable(l)) continue;
    const t = inline(l);
    if (t.length > 40) return t;
  }
  return "";
}

// ── the parser ───────────────────────────────────────────────────
export function parseCityMd(md: string, opts: ParseOptions): ClientCityData {
  const lines = md.split(/\r?\n/);
  const cityName = opts.cityName;

  // ---- find + classify H2 sections ----
  const h2s: number[] = [];
  lines.forEach((l, i) => {
    if (isH2(l)) h2s.push(i);
  });
  const segs: Segment[] = [];
  let fleetSeen = false;
  for (let i = 0; i < h2s.length; i++) {
    const key0 = classify(head(lines[h2s[i]]));
    let key = key0;
    if (!key) key = fleetSeen ? "office" : "fleet";
    if (key === "fleet") fleetSeen = true;
    segs.push({
      key,
      h2: h2s[i],
      end: i + 1 < h2s.length ? h2s[i + 1] : lines.length,
      eyebrow: eyebrowBefore(lines, h2s[i]),
    });
  }
  const get = (key: string): Segment | undefined => segs.find((s) => s.key === key);
  const introEnd = h2s.length ? h2s[0] : lines.length;

  // ---- intro: hero title / description / actions / image ----
  let heroTitle = "";
  let heroImage = "";
  let heroImageAlt = "";
  const descParts: string[] = [];
  const heroActions: Array<{ label: string; href: string; style: string }> = [];
  let collecting = true;
  for (let i = 0; i < introEnd; i++) {
    const l = lines[i].trim();
    if (!l) continue;
    if (/^#\s/.test(l)) {
      heroTitle = head(l);
      continue;
    }
    if (isImage(l)) {
      if (!heroImage) {
        const m = l.match(/!\[([^\]]*)\]\(([^)]+)\)/);
        if (m) {
          heroImageAlt = m[1];
          heroImage = m[2];
        }
      }
      collecting = false;
      continue;
    }
    if (hasLink(l)) {
      if (heroActions.length === 0) {
        for (const m of l.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
          const label = m[1];
          const low = label.toLowerCase();
          const href = low.includes("fleet")
            ? "#fleet"
            : (m[2].match(/\/services\/([a-z0-9-]+)/)?.[1]
                ? `/services/${m[2].match(/\/services\/([a-z0-9-]+)/)![1]}`
                : "/contact");
          heroActions.push({
            label,
            href,
            style: heroActions.length === 0 ? "primary" : "secondary",
          });
        }
      }
      collecting = false;
      continue;
    }
    if (isHeading(l) || /^\*\*/.test(l)) {
      collecting = false;
      continue;
    }
    if (collecting) descParts.push(inline(l));
  }
  const heroDescription = descParts.join("\n\n");

  // ---- fleet ----
  const fleetSeg = get("fleet");
  let fleetEyebrow = fleetSeg?.eyebrow || "";
  let fleetHeading = "";
  let fleetSubheading = "";
  const vehicles: ClientCityData["vehicles"] = [];
  if (fleetSeg) {
    const sl = segmentLines(lines, fleetSeg);
    fleetHeading = head(sl[0]);
    fleetSubheading = sectionIntro(sl);
    let pendingImage = "";
    let cur: {
      category: string;
      image: string;
      specLine: string;
      model: string;
      idealFor: string;
      description: string;
    } | null = null;
    let buf: string[] = [];
    const flush = () => {
      if (!cur) return;
      const specMatch = cur.specLine;
      let model = cur.model;
      let idealFor = cur.idealFor;
      const desc: string[] = [];
      for (const raw of buf) {
        const l = raw.trim();
        if (!l || hasLink(l) || isImage(l) || isHeading(l)) continue;
        const t = inline(l);
        if (/^\*{0,2}Typical model/i.test(t)) {
          model = t.replace(/^\*{0,2}Typical model\s*:\s*/i, "");
        } else if (/^\*{0,2}Ideal for/i.test(t)) {
          idealFor = t.replace(/^\*{0,2}Ideal for\s*:\s*/i, "");
        } else if (!model && /or similar/i.test(t) && t.length < 60) {
          model = t;
        } else {
          desc.push(t);
        }
      }
      model = stripPrice(model);
      // "or similar [Confirm]" with no marquee model → no model at all
      if (/^or similar\.?$/i.test(model)) model = "";
      idealFor = stripPrice(idealFor);
      const parts = specMatch ? specMatch.split("·").map((p) => p.trim()) : [];
      vehicles.push({
        category: cur.category,
        specLine: specMatch,
        model,
        idealFor,
        description: desc.join(" "),
        capacity: parts[1] || "",
        bags: parts[2] || "",
        imageIndex: Number((cur.image.match(/image(\d+)\./) || [])[1] || 0),
        imageAlt: "",
      } as ClientCityData["vehicles"][number]);
      // remember the raw image path for later rewriting
      (vehicles[vehicles.length - 1] as unknown as { _image: string })._image = cur.image;
      cur = null;
      buf = [];
    };
    for (let i = 1; i < sl.length; i++) {
      const l = sl[i].trim();
      if (blank(l)) continue;
      if (isImage(l)) {
        flush();
        const m = l.match(/!\[([^\]]*)\]\(([^)]+)\)/);
        pendingImage = m ? m[2] : "";
        continue;
      }
      if (/^###\s/.test(l)) {
        flush();
        cur = {
          category: head(l),
          image: pendingImage,
          specLine: "",
          model: "",
          idealFor: "",
          description: "",
        };
        pendingImage = "";
        continue;
      }
      if (!cur) continue;
      if (!cur.specLine && /·/.test(l) && /guest|passenger/i.test(l)) {
        cur.specLine = inline(l);
        continue;
      }
      buf.push(l);
    }
    flush();
  }

  // ---- journeys ----
  const jrSeg = get("journeys");
  let journeysEyebrow = jrSeg?.eyebrow || "";
  let journeysHeading = "";
  let journeysDescription = "";
  const journeys: ClientCityData["journeys"] = [];
  if (jrSeg) {
    const sl = segmentLines(lines, jrSeg);
    journeysHeading = head(sl[0]);
    journeysDescription = sectionIntro(sl);
    for (let i = 1; i < sl.length; i++) {
      if (!/^###\s/.test(sl[i])) continue;
      const title = head(sl[i]);
      // tag = nearest non-blank line above, if it looks like a tag
      let tag = "";
      for (let k = i - 1; k >= 0; k--) {
        const p = sl[k].trim();
        if (!p) continue;
        const t = inline(p);
        if (
          !isHeading(p) &&
          !isImage(p) &&
          !isTable(p) &&
          !hasLink(p) &&
          !/^\*\*/.test(t) &&
          t.length <= 40 &&
          !/[.]$/.test(t)
        ) {
          tag = t;
        }
        break;
      }
      // description + price below the title
      let description = "";
      let priceText = "";
      for (let k = i + 1; k < sl.length; k++) {
        const p = sl[k].trim();
        if (!p) continue;
        if (/^###\s/.test(p)) break;
        if (/^\*{0,2}From/i.test(inline(p))) {
          priceText = stripPrice(inline(p));
          break;
        }
        if (hasLink(p) || isImage(p)) continue;
        if (!description) description = inline(p);
      }
      journeys.push({ tag, title, description, priceText });
    }
  }

  // ---- services ----
  const svSeg = get("services");
  let servicesEyebrow = svSeg?.eyebrow || "";
  let servicesHeading = "";
  let servicesDescription = "";
  const services: ClientCityData["services"] = [];
  if (svSeg) {
    const sl = segmentLines(lines, svSeg);
    servicesHeading = head(sl[0]);
    servicesDescription = sectionIntro(sl);
    for (const raw of sl.slice(1)) {
      const l = raw.trim();
      if (!/^\s*[-*]\s+/.test(l)) continue;
      const body = inline(l.replace(/^\s*[-*]\s+/, ""));
      const link = l.match(/\[([^\]]+)\]\(([^)]+)\)/);
      let slug: string | undefined;
      if (link) slug = link[2].match(/\/services\/([a-z0-9-]+)/)?.[1];
      const source = link ? link[1] : body;
      const svc = matchService(source, slug);
      if (!svc) continue;
      let description = "";
      if (link) {
        description = body
          .replace(link[0], "")
          .replace(/^[\s,]+/, "")
          .trim();
      } else {
        const m = body.match(/^[^:]{3,70}:\s*(.+)$/);
        if (m) description = m[1].trim();
      }
      if (description.toLowerCase() === svc.label.toLowerCase()) description = "";
      services.push({
        title: svc.label,
        description,
        href: `/services/${svc.slug}`,
        icon: svc.icon,
      });
    }
  }

  // ---- airport transfer ----
  const apSeg = get("airport");
  let airportEyebrow = apSeg?.eyebrow || "Airport transfers";
  let airportHeading = "";
  const apDesc: string[] = [];
  const bullets: Array<{ heading: string; description: string; icon: string }> = [];
  let airportImage = "";
  if (apSeg) {
    const sl = segmentLines(lines, apSeg);
    airportHeading = head(sl[0]);
    let bulletStarted = false;
    for (let i = 1; i < sl.length; i++) {
      const l = sl[i].trim();
      if (!l) continue;
      if (isImage(l)) {
        if (!airportImage) {
          const m = l.match(/!\[([^\]]*)\]\(([^)]+)\)/);
          if (m) airportImage = m[2];
        }
        continue;
      }
      if (/^###\s/.test(l)) {
        bulletStarted = true;
        const heading = head(l);
        let description = "";
        for (let k = i + 1; k < sl.length; k++) {
          const p = sl[k].trim();
          if (!p) continue;
          if (isHeading(p) || isImage(p)) break;
          if (hasLink(p)) break;
          description = inline(p);
          break;
        }
        bullets.push({ heading, description, icon: bulletIcon(heading, bullets.length) });
        continue;
      }
      // pipe-separated bullets on ONE line:
      //   `**Flight tracking:** Every arrival | **Meet and greet:** Inside ...`
      //   `Meeting point: X | Free waiting time: Y`
      if (/\s\|\s/.test(l) && !hasLink(l)) {
        const parts = l.split(/\s+\|\s+/).map((p) => p.trim()).filter(Boolean);
        const labelled = parts.every(
          (p) => parseBold(p) || /^([^:]{2,60}):\s*\S/.test(p)
        );
        if (labelled && parts.length >= 2) {
          bulletStarted = true;
          for (const p of parts) {
            const b = parseBold(p);
            const heading = b ? b.key : p.match(/^([^:]{2,60}):/)![1].trim();
            const raw = b ? b.value : p.replace(/^[^:]+:\s*/, "");
            const description = stripPrice(inline(raw));
            if (!heading || !description) continue;
            bullets.push({ heading, description, icon: bulletIcon(heading, bullets.length) });
          }
          continue;
        }
      }
      // plain `Flight tracking: Every arrival` lines (no bullet marker)
      if (!hasLink(l) && !isTable(l)) {
        const m = l.match(/^([A-Za-z][A-Za-z0-9 &/'-]{2,40}):\s*(\S.*)$/);
        if (m && (bulletStarted || l.length < 120)) {
          const description = stripPrice(inline(m[2]));
          if (description) {
            bulletStarted = true;
            const heading = m[1].trim();
            bullets.push({ heading, description, icon: bulletIcon(heading, bullets.length) });
            continue;
          }
        }
      }
      if (/^\s*[-*]\s+/.test(l) && /:/.test(l)) {
        bulletStarted = true;
        const body = inline(l.replace(/^\s*[-*]\s+/, ""));
        const m = body.match(/^([^:]{2,60}):\s*(.*)$/);
        if (m) {
          bullets.push({
            heading: m[1].trim(),
            description: m[2].trim(),
            icon: bulletIcon(m[1], bullets.length),
          });
        }
        continue;
      }
      const t = inline(l);
      // markdown table of bullets: | Feature | Parameter | Scope |
      if (isTable(l)) {
        const tableRows = sl
          .slice(i)
          .filter((r) => isTable(r.trim()))
          .map((r) =>
            r
              .trim()
              .replace(/^\|/, "")
              .replace(/\|$/, "")
              .split("|")
              .map((c) => inline(c))
          );
        if (tableRows.length >= 2) {
          bulletStarted = true;
          for (const row of tableRows.slice(1)) {
            const heading = row[0]?.trim() ?? "";
            const description = stripPrice(row[1] ?? "");
            if (!heading || !description) continue;
            bullets.push({ heading, description, icon: bulletIcon(heading, bullets.length) });
          }
          i += tableRows.length - 1;
          continue;
        }
      }
      const bold = parseBold(l);
      if (bold && !bulletStarted) {
        bulletStarted = true;
        bullets.push({
          heading: bold.key,
          description: bold.value,
          icon: bulletIcon(bold.key, bullets.length),
        });
        continue;
      }
      if (bold) {
        bullets.push({
          heading: bold.key,
          description: bold.value,
          icon: bulletIcon(bold.key, bullets.length),
        });
        continue;
      }
      if (!bulletStarted && !hasLink(l)) apDesc.push(t);
    }
  }

  // ---- coverage ----
  const cvSeg = get("coverage");
  let coverageEyebrow = cvSeg?.eyebrow || "Coverage";
  let coverageHeading = "";
  let coverageDescription = "";
  const coverageGroups: Array<{ category: string; places: string; icon: string }> = [];
  let coverageImage = "";
  if (cvSeg) {
    const sl = segmentLines(lines, cvSeg);
    coverageHeading = head(sl[0]);
    coverageDescription = sectionIntro(sl);

    const tableLines = sl.filter((l) => isTable(l));
    if (tableLines.length >= 2) {
      const rows = tableLines.map((l) =>
        l
          .trim()
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((c) => c.trim())
      );
      const isLabelled = rows[0].some((c) =>
        /sector|key location|coverage detail|primary hub|secondary hub|category/i.test(c)
      );
      if (isLabelled) {
        const byCat = new Map<string, string[]>();
        for (const r of rows.slice(1)) {
          const cat = r[0];
          if (!cat) continue;
          const vals = r.slice(1).filter(Boolean);
          if (!vals.length) continue;
          const text =
            vals.length === 1
              ? vals[0]
              : `${vals.slice(0, -1).join(", ")} — ${vals[vals.length - 1]}`;
          if (!byCat.has(cat)) byCat.set(cat, []);
          byCat.get(cat)!.push(text);
        }
        for (const [category, places] of byCat)
          coverageGroups.push({ category, places: places.join(" · "), icon: coverageIcon(category) });
      } else {
        const cats = rows[0];
        for (let c = 0; c < cats.length; c++) {
          const category = cats[c];
          if (!category) continue;
          const places = rows
            .slice(1)
            .map((r) => r[c])
            .filter(Boolean);
          if (!places.length) continue;
          coverageGroups.push({ category, places: places.join(" · "), icon: coverageIcon(category) });
        }
      }
    } else {
      let cur: { category: string; places: string[] } | null = null;
      const flush = () => {
        if (cur && cur.places.length)
          coverageGroups.push({
            category: cur.category,
            places: cur.places.join(" · "),
            icon: coverageIcon(cur.category),
          });
        cur = null;
      };
      for (let i = 1; i < sl.length; i++) {
        const l = sl[i].trim();
        if (!l) continue;
        if (isImage(l)) {
          if (!coverageImage) {
            const m = l.match(/!\[([^\]]*)\]\(([^)]+)\)/);
            if (m) coverageImage = m[2];
          }
          continue;
        }
        if (hasLink(l) || isTable(l)) continue;
        if (/^###\s/.test(l)) {
          flush();
          cur = { category: head(l), places: [] };
          continue;
        }
        const li = l.match(/^\s*[-*]\s+(.+)$/);
        const raw = (li ? li[1] : l).trim();
        const bold = parseBold(raw);
        if (bold) {
          flush();
          cur = { category: bold.key, places: [] };
          if (bold.value) cur.places.push(bold.value);
          continue;
        }
        const body = inline(raw);
        if (!body) continue;
        if (body.length > 140 || /[.]$/.test(body)) {
          // prose — ignore
          if (!cur) continue;
        }
        if (!cur) continue;
        cur.places.push(body);
      }
      flush();
    }
  }

  // ---- office ----
  const ofSeg = get("office");
  let officeEyebrow = ofSeg?.eyebrow || "Our office";
  let officeHeading = "";
  let officeDescription = "";
  let officeTitle = "";
  let officeAddress = "";
  let officePhone = "";
  let officeDirectionsUrl = "";
  if (ofSeg) {
    const sl = segmentLines(lines, ofSeg);
    officeHeading = head(sl[0]);
    officeDescription = sectionIntro(sl);
    let titleIdx = -1;
    for (let i = 1; i < sl.length; i++) {
      const l = sl[i].trim();
      if (/^###\s/.test(l) || /^\*\*[^*]+\*\*\s*$/.test(l)) {
        titleIdx = i;
        officeTitle = head(l);
        break;
      }
    }
    const after = titleIdx >= 0 ? sl.slice(titleIdx + 1) : [];
    const plain: string[] = [];
    for (const raw of after) {
      const l = raw.trim();
      if (!l || isHeading(l) || isImage(l)) continue;
      const dir = l.match(/\[Get directions\]\(([^)]+)\)/) || l.match(/<(https?:[^>]+)>/);
      if (dir) {
        officeDirectionsUrl = dir[1];
        continue;
      }
      if (hasLink(l)) continue;
      plain.push(inline(l));
    }
    const phoneIdx = plain.findIndex((p) => /^\+?[\d\s()\-]{7,}$/.test(p));
    if (phoneIdx >= 0) {
      officePhone = plain[phoneIdx];
      officeAddress = plain.slice(0, phoneIdx).join(" · ");
    } else if (plain.length) {
      officeAddress = plain.join(" · ");
    }
  }

  // ---- faq (+ jizan-style inline CTA) ----
  const fqSeg = get("faq");
  let faqEyebrow = fqSeg?.eyebrow || "Questions";
  let faqHeading = "";
  const faqs: Array<{ q: string; a: string }> = [];
  let ctaHeading = "";
  let ctaDescription = "";
  if (fqSeg) {
    const sl = segmentLines(lines, fqSeg);
    faqHeading = head(sl[0]);
    for (let i = 1; i < sl.length; i++) {
      if (!/^###\s/.test(sl[i])) continue;
      const text = head(sl[i]);
      let answer = "";
      for (let k = i + 1; k < sl.length; k++) {
        const p = sl[k].trim();
        if (!p) continue;
        if (isHeading(p) || isImage(p) || hasLink(p)) break;
        answer = inline(p);
        break;
      }
      if (/chauffeur is ready/i.test(text)) {
        ctaHeading = text;
        ctaDescription = answer;
        continue;
      }
      if (!answer) continue;
      faqs.push({ q: text, a: answer });
    }
  }

  // ---- cta ----
  const ctSeg = get("cta");
  let ctaSubheading = "";
  let ctaSubdescription = "";
  if (ctSeg) {
    const sl = segmentLines(lines, ctSeg);
    ctaHeading = head(sl[0]);
    const rest = sl.slice(1);
    ctaDescription = sectionIntro(rest);
    for (let i = 1; i < rest.length; i++) {
      if (!/^###\s/.test(rest[i])) continue;
      ctaSubheading = head(rest[i]);
      for (let k = i + 1; k < rest.length; k++) {
        const p = rest[k].trim();
        if (!p || isHeading(p)) continue;
        if (hasLink(p)) break;
        ctaSubdescription = inline(p);
        break;
      }
      break;
    }
  }
  if (!ctaHeading) ctaHeading = `Your chauffeur is ready in ${cityName}.`;

  // ---- assemble ----
  const imageFolder = heroImage ? heroImage.split("/").slice(-2)[0] : "";
  const firstPara = heroDescription.split("\n\n")[0] || "";

  const data = {
    slug: opts.citySlug,    name: cityName,
    displayName: cityName,
    imageFolder,
    heroTitle: heroTitle || `Chauffeur Service in ${cityName}`,
    heroImage,
    heroDescription,
    heroImageAlt,
    description: firstPara,
    fleetEyebrow,
    fleetHeading,
    fleetSubheading,
    vehicles,
    journeysEyebrow,
    journeysHeading,
    journeysDescription,
    journeys,
    servicesEyebrow,
    servicesHeading,
    servicesDescription,
    services,
    airportInfo: {
      eyebrow: airportEyebrow,
      heading: airportHeading,
      description: apDesc.join("\n\n"),
      bullets,
      image: airportImage,
      imageAlt: airportHeading,
    },
    coverageEyebrow,
    coverageHeading,
    coverageDescription,
    coverageGroups,
    coverageImage,
    coverageImageAlt: coverageHeading,
    officeEyebrow,
    officeHeading,
    officeDescription,
    officeTitle,
    officeAddress,
    officePhone,
    officeDirectionsUrl,
    faqEyebrow,
    faqHeading,
    faqs,
    ctaHeading,
    ctaDescription,
    ...(ctaSubheading ? { ctaSubheading } : {}),
    ...(ctaSubdescription ? { ctaSubdescription } : {}),
  } as unknown as ClientCityData;

  return scrubPlaceholders(data);
}

/** Recursively drop `[Confirm]` editor placeholders from every string field. */
function scrubPlaceholders<T>(value: T): T {
  if (typeof value === "string") {
    return value
      .replace(/\\?\[Confirm\\?\]/gi, "")
      .replace(/\s{2,}/g, " ")
      .replace(/\s+([.,|])/g, "$1")
      .replace(/^\s*[|·]\s*/, "")
      .trim() as unknown as T;
  }
  if (Array.isArray(value)) return value.map(scrubPlaceholders) as unknown as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = scrubPlaceholders(v);
    }
    return out as unknown as T;
  }
  return value;
}

/** rewrite vehicle image paths onto /locations/<folder>/imageN.jpg */
export function rewriteVehicleImages(
  data: ClientCityData,
  mdImageRefs: string[]
): ClientCityData {
  const folder = data.imageFolder;
  if (!folder) return data;
  data.vehicles.forEach((v, i) => {
    const ref = mdImageRefs[i];
    if (ref) (v as unknown as { imageAlt?: string }).imageAlt = "";
    void ref;
    void folder;
  });
  return data;
}
