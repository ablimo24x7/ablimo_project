/**
 * Sync service pages from the markdown sources in `services-pages-md/`.
 *
 * - Base pages (`services` collection) get `pageSections` + `faqs` + `heroImage`.
 * - Country/city pages (`articles` collection) get `sections` + `title` + `excerpt`
 *   + `faqs` + `contentMode` built from their matching md file.
 *
 * Usage:
 *   npx tsx scripts/sync-services-md.ts             # dry run (report only)
 *   npx tsx scripts/sync-services-md.ts --write     # apply to DB
 *   npx tsx scripts/sync-services-md.ts --write --only=riyadh
 */
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "node:fs";
import path from "node:path";
import { MongoClient, type Db } from "mongodb";
import {
  SECTION_TYPES,
  type PageSection,
  type SectionType,
} from "../src/components/services/sections/section-types";

// ── Config ───────────────────────────────────────────────────────────────────

const MD_DIR = "services-pages-md";
const PUBLIC_DIR = "public";

const CATS = [
  "chauffeur-vip",
  "airport-transfers",
  "corporate-transportation",
  "event-transportation",
  "bus-coach-hire",
  "tourism-transportation",
  "intercity-transfers",
  "religious-tourism",
  "workforce-transportation",
];

const COUNTRIES = ["saudi-arabia", "uae", "qatar", "bahrain", "kuwait", "oman"];

/** Duplicated / crossed / empty sources — never applied. */
const SKIP = new Set([
  "www.ab.limo-services.md", // static hub page (already synced)
  "ww.ab.limo-services-chauffeur-vip-uae.md", // crossed: airport-transfers UAE content
  "www.ab.limo-services-corporate-transportation-saudi-arabia.md", // UAE duplicate; `...saudi-arabia1` is the real one
  "www.ab.limo-services-airport-transfers-qatar1.md", // image-path duplicate of qatar.md
  "www.ab.limo-services-chauffeur-vip-qatar-al-wakrah1.md", // identical duplicate
  "www.ab.limo-services-chauffeur-vip-saudi-arabia-dammam.md", // superseded by dammam1 (+ Page details)
  "www.ab.limo-services-tourism-transportation-saudi-arabia.md", // 0 bytes
]);

// ── Small helpers ────────────────────────────────────────────────────────────

let seq = 0;
const rid = (p: string) =>
  `${p}-${Date.now()}-${(seq++).toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

const isLabel = (t: string): boolean => {
  const w = t.trim().split(/\s+/);
  if (w.length === 0 || w.length > 6) return false;
  if (/[.!?]$/.test(t) || /:$/.test(t)) return false;
  // never treat bare phone numbers as labels/eyebrows
  if (/^\+?[\d\s().-]{7,}$/.test(t.trim())) return false;
  return true;
};

const isActionLine = (t: string): boolean =>
  /^(book|reserve|request|view|talk|all services|get|start|plan|schedule|explore)\b/i.test(
    t.trim()
  ) &&
  t.includes("·") &&
  !/[.!?]$/.test(t.trim()) &&
  t.trim().split(/\s+/).length <= 14;

function cleanText(raw: string): string {
  let s = raw;
  // unescape markdown escapes produced by the writer
  s = s.replace(/\\([[\]().])/g, "$1");
  // placeholders
  s = s.replace(
    /from\s*\[([A-Z]{3}) ?price\]\s*·\s*\[confirm[^\]]*\]\s*minutes/gi,
    (_m, cur) => `From ${cur} on request`
  );
  s = s.replace(/\[confirm:\s*minutes\]/gi, "60 minutes");
  s = s.replace(/\bis\s+\[confirm\]\s+minutes\b/gi, "is 60 minutes");
  s = s.replace(/\[confirm:\s*journey time\]/gi, "varies with traffic");
  s = s.replace(
    /\[confirm:\s*(passenger capacity|luggage capacity)\]/gi,
    "varies by vehicle"
  );
  s = s.replace(/\[confirm[^\]]*\]/gi, "");
  s = s.replace(/\[[A-Z]{3} ?price\]/gi, "on request");
  // inline links → label only
  s = s.replace(/\[([^\]]*)\]\(([^)]*)\)/g, "$1");
  // spacing artifacts
  s = s.replace(/\s{2,}/g, " ");
  s = s.replace(/\s+([.,;:])/g, "$1");
  s = s.replace(/\(\s*\)/g, "");
  s = s.replace(/\s*·\s*(?=·|$)/g, " ").trim();
  s = s.replace(/^\s*·\s*/, "").replace(/\s*·\s*$/, "");
  s = s.replace(/\s{2,}/g, " ").trim();
  return s;
}

function mapHref(href: string | undefined): string {
  if (!href) return "/contact";
  let p = href.trim();
  if (/^https?:\/\//i.test(p)) {
    try {
      p = new URL(p).pathname;
    } catch {
      return "/contact";
    }
  }
  if (p.startsWith("#") || !p.startsWith("/")) return "/contact";
  if (
    /^\/(services|locations|airports|fleet|contact|corporate-accounts|faqs|about|blogs)(\/|$)/.test(
      p
    )
  )
    return p;
  if (/^\/quote(\/|$)/.test(p)) return "/contact";
  return "/contact";
}

function labelHref(label: string): string {
  const l = label.toLowerCase();
  if (l.includes("fleet")) return "/fleet";
  if (l.includes("all services") || l.includes("other services")) return "/services";
  if (l.includes("corporate account")) return "/corporate-accounts";
  return "/contact";
}

const ICON_KEYWORDS: Array<[RegExp, string]> = [
  [/flight|airport|arrival|departure|terminal|takeoff|aviation/i, "Plane"],
  [/track|gps|monitor|telemetr|radar|live|real time/i, "SatelliteDish"],
  [/meet|greet|welcome|concierge|name board/i, "Handshake"],
  [/coach|bus|minibus|sprinter/i, "Bus"],
  [/vehicle|fleet|sedan|suv|mpv|van|saloon/i, "Car"],
  [/city|route|distance|intercity|coverage|location|destination|journey/i, "MapLocationDot"],
  [/time|schedule|punctual|wait|24\/7|delay|punctuality/i, "Clock"],
  [/corporate|account|invoice|billing|contract|report|procurement/i, "FileInvoiceDollar"],
  [/security|safety|duty of care|vetting|compliance|licence|license|standard|regulat/i, "Shield"],
  [/group|delegation|passenger|staff|employee|workforce|team|manifest/i, "Users"],
  [/vip|executive|protocol|diplomat|principal|leader/i, "Crown"],
  [/price|quote|cost|tariff|fee/i, "Receipt"],
  [/tour|tourism|visit|pilgrim|umrah|hajj|religious|heritage|landmark/i, "Map"],
  [/book|reserve|request|dispatch|portal|itinerar/i, "CalendarCheck"],
];

const FALLBACK_ICONS = ["CheckCircle", "Clock", "Car", "Shield", "MapLocationDot", "Users"];
let iconCursor = 0;
function pickIcon(text: string): string {
  for (const [re, icon] of ICON_KEYWORDS) if (re.test(text)) return icon;
  return FALLBACK_ICONS[iconCursor++ % FALLBACK_ICONS.length];
}

const MARQUEE_ICONS = ["Clock", "Globe", "Shield", "Car", "Plane", "Users", "Star", "Handshake"];

// ── Markdown parsing ─────────────────────────────────────────────────────────

type Link = { label: string; href: string };
type Block =
  | { k: "h1" | "h2" | "h3"; t: string }
  | { k: "text"; t: string }
  | { k: "img"; alt: string; src: string }
  | { k: "links"; links: Link[] }
  | { k: "bullet"; t: string }
  | { k: "stat"; t: string }
  | { k: "table"; rows: string[][] };

interface PageDetails {
  url?: string;
  metaTitle?: string;
  metaDescription?: string;
  keyword?: string;
}

interface Parsed {
  blocks: Block[];
  h1: string;
  details?: PageDetails;
  imageUrls: string[];
}

const stripBold = (s: string) => s.replace(/^\*\*/, "").replace(/\*\*$/, "").trim();

function parseLinksLine(line: string): Link[] | null {
  const re = /\[([^\]]*)\]\(([^)]*)\)/g;
  const links: Link[] = [];
  let m: RegExpExecArray | null;
  let consumed = line;
  while ((m = re.exec(line))) {
    links.push({ label: m[1].trim(), href: m[2].trim() });
    consumed = consumed.replace(m[0], " ");
  }
  if (links.length === 0) return null;
  return consumed.trim() === "" ? links : null;
}

function shouldSkipLine(t: string): boolean {
  return (
    /^pick ?up:/i.test(t) ||
    /^quote details:/i.test(t) ||
    /get a quote/i.test(t) ||
    /^route scheduling parameters:/i.test(t) ||
    /^corporate transfer planner:/i.test(t) ||
    /^pickup:/i.test(t)
  );
}

function resolveImageUrl(src: string): string {
  const clean = src.replace(/^\.\//, "");
  return `/services/${clean}`;
}

function parseFile(file: string): Parsed {
  const raw = fs.readFileSync(path.join(MD_DIR, file), "utf8");
  const allLines = raw.split(/\r?\n/);

  // trailing "Page details" block (SEO metadata)
  let details: PageDetails | undefined;
  const pdIdx = allLines.findIndex((l) => l.trim() === "Page details");
  let lines = allLines;
  if (pdIdx >= 0) {
    lines = allLines.slice(0, pdIdx);
    const tail = allLines.slice(pdIdx + 1);
    for (const l of tail) {
      const m = l.match(/^(URL|Meta title|Meta description|Primary keyword):\s*(.+)$/i);
      if (!m) continue;
      const key = m[1].toLowerCase();
      const val = m[2].trim();
      if (key === "url") details = { ...details, url: val };
      else if (key === "meta title") details = { ...details, metaTitle: val };
      else if (key === "meta description") details = { ...details, metaDescription: val };
      else if (key === "primary keyword") details = { ...details, keyword: val };
    }
  }

  const blocks: Block[] = [];
  const imageUrls: string[] = [];
  let table: string[][] | null = null;
  let h1 = "";

  const flushTable = () => {
    if (table && table.length > 0) {
      const rows = table.filter((r) => !r.every((c) => /^-+$/.test(c)));
      // drop quote-widget tables (Pick up | Drop off | Date and time | Quote)
      const header = (rows[0] || []).join(" ").toLowerCase();
      const isQuoteTable =
        rows.length > 0 &&
        (header.includes("pick up") || header.includes("drop off") || header.includes("get a quote"));
      if (rows.length > 0 && !isQuoteTable) blocks.push({ k: "table", rows });
    }
    table = null;
  };

  for (const rawLine of lines) {
    const t = rawLine.trim();
    if (!t) {
      flushTable();
      continue;
    }
    if (t.startsWith("|")) {
      const cells = t.split("|").map((c) => c.trim()).filter((c, i, arr) => !(i === 0 && c === "") && !(i === arr.length - 1 && c === ""));
      if (!table) table = [];
      table.push(cells);
      continue;
    }
    flushTable();

    if (shouldSkipLine(t)) continue;

    const h = t.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const text = cleanText(stripBold(h[2]));
      if (level === 1) {
        if (!h1) h1 = text;
        else blocks.push({ k: "h1", t: text });
      } else if (level === 2) blocks.push({ k: "h2", t: text });
      else blocks.push({ k: "h3", t: text });
      continue;
    }

    const img = t.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (img) {
      const src = resolveImageUrl(img[2]);
      imageUrls.push(src);
      blocks.push({ k: "img", alt: cleanText(img[1]) || "", src });
      continue;
    }

    if (t.startsWith("- ")) {
      blocks.push({ k: "bullet", t: cleanText(t.slice(2)) });
      continue;
    }

    const links = parseLinksLine(t);
    if (links) {
      blocks.push({ k: "links", links });
      continue;
    }

    if (/^\*\*[^*]+\*\*$/.test(t)) {
      blocks.push({ k: "stat", t: cleanText(t) });
      continue;
    }

    blocks.push({ k: "text", t: cleanText(t) });
  }
  flushTable();

  return { blocks, h1, details, imageUrls };
}

// ── Section building ─────────────────────────────────────────────────────────

interface Built {
  sections: PageSection[];
  faqs: Array<{ q: string; a: string }>;
  hero: PageSection;
  excerpt: string;
  heroImage: string;
  imagesUsed: number;
  imagesTotal: number;
}

function actionFromLink(l: Link, style: string): Record<string, unknown> {
  return {
    label: l.label,
    href: mapHref(l.href),
    style,
    icon: "ArrowRight",
    ...(style === "accent" ? { icon: "ChevronRight" } : {}),
  };
}

function actionFromLabel(label: string, style: string): Record<string, unknown> {
  return {
    label,
    href: labelHref(label),
    style,
    icon: style === "primary" ? "ArrowRight" : undefined,
  };
}

function buildSections(
  parsed: Parsed,
  existing: PageSection[],
  imageAlts: Map<string, string>
): Built {
  const blocks = parsed.blocks;
  const byType = new Map<string, PageSection>();
  for (const s of existing) if (!byType.has(s.type)) byType.set(s.type, s);

  const defaultOf = (type: SectionType): PageSection => {
    const cfg = SECTION_TYPES.find((c) => c.type === type);
    return cfg ? cfg.defaults() : null as never;
  };

  const clone = (type: SectionType): PageSection => {
    const src = byType.get(type) ?? defaultOf(type);
    return JSON.parse(JSON.stringify(src)) as PageSection;
  };

  // ── Hero + intro zone ──
  const hero = clone("hero");
  hero.id = rid("sec");
  hero.order = 0;
  hero.enabled = true;
  hero.variant = hero.variant || "background-content";

  let i = 0;
  if (blocks[i]?.k === "h1") i++;
  const h1 = parsed.h1 || (blocks[0]?.k === "h1" ? (blocks[0] as { t: string }).t : "");

  const heroParas: string[] = [];
  let heroActions: Record<string, unknown>[] = [];
  let heroImg: { src: string; alt: string } | null = null;
  const marqueeItems: Array<{ id: string; icon: string; label: string }> = [];
  const preH2Pairs: Array<{ label: string; text: string }> = [];
  let pendingLabel: string | null = null;
  let firstH2 = -1;

  for (; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.k === "h2" || b.k === "h3") {
      firstH2 = i;
      break;
    }
    switch (b.k) {
      case "text":
        if (isActionLine(b.t)) {
          heroActions = b.t
            .split("·")
            .map((s) => s.trim())
            .filter(Boolean)
            .map((label, idx) => actionFromLabel(label, idx === 0 ? "primary" : "secondary"));
        } else if (isLabel(b.t)) {
          if (pendingLabel) preH2Pairs.push({ label: pendingLabel, text: "" });
          pendingLabel = b.t;
        } else if (pendingLabel) {
          preH2Pairs.push({ label: pendingLabel, text: b.t });
          pendingLabel = null;
        } else {
          heroParas.push(b.t);
        }
        break;
      case "links":
        heroActions = b.links.map((l, idx) => ({
          ...actionFromLink(l, idx === 0 ? "primary" : "secondary"),
        }));
        break;
      case "stat":
        marqueeItems.push({
          id: rid("itm"),
          icon: MARQUEE_ICONS[marqueeItems.length % MARQUEE_ICONS.length],
          label: b.t,
        });
        break;
      case "img":
        if (!heroImg) heroImg = { src: b.src, alt: b.alt };
        break;
      default:
        break;
    }
  }
  // drop empty pair text (label directly before first H2 → eyebrow)
  const eyebrow = pendingLabel;
  while (preH2Pairs.length && !preH2Pairs[preH2Pairs.length - 1].text)
    preH2Pairs.pop();

  if (heroActions.length === 0) {
    heroActions = [
      { label: "Book now", href: "/contact", style: "primary", icon: "ArrowRight" },
      { label: "View the fleet", href: "/fleet", style: "secondary" },
    ];
  }

  const heroContent = hero.content as Record<string, unknown>;
  heroContent.title = h1;
  heroContent.titleHighlight = "";
  heroContent.eyebrow = "";
  heroContent.description = heroParas.join(" ");
  hero.items = heroActions;
  const heroAppear = hero.appearance as Record<string, unknown>;
  if (heroImg && fs.existsSync(path.join(PUBLIC_DIR, heroImg.src))) {
    heroAppear.background = heroImg.src;
    heroAppear.backgroundAlt = heroImg.alt || h1;
  }

  // ── Sections ──
  const sections: PageSection[] = [];
  const faqs: Array<{ q: string; a: string }> = [];
  let contactDesc = "";
  let mediaIdx = 0;
  const imageTargets: Array<{ sec: PageSection; cap: number; wants: boolean }> = [];

  const push = (s: PageSection) => {
    s.id = rid("sec");
    s.enabled = true;
    s.order = sections.length;
    sections.push(s);
  };

  push(hero);

  // marquee from stats
  if (marqueeItems.length > 0) {
    const mq = clone("marquee");
    (mq.content as Record<string, unknown>).items = marqueeItems;
    push(mq);
  }

  // intro pairs → mediaContent
  for (const p of preH2Pairs) {
    const mc = clone("mediaContent");
    const c = mc.content as Record<string, unknown>;
    c.eyebrow = "";
    c.heading = p.label;
    c.description = p.text;
    c.items = [];
    c.actions = [];
    push(mc);
    imageTargets.push({ sec: mc, cap: 1, wants: false });
  }

  const makeMedia = (): PageSection => {
    const mc = clone("mediaContent");
    const pos = mediaIdx % 2 === 0 ? "right" : "left";
    mediaIdx++;
    mc.variant = `media-${pos}`;
    (mc.settings as Record<string, unknown>).mediaPosition = pos;
    const c = mc.content as Record<string, unknown>;
    c.items = c.items ?? [];
    c.actions = c.actions ?? [];
    return mc;
  };

  const lastH2Idx = (() => {
    for (let j = blocks.length - 1; j >= 0; j--) if (blocks[j].k === "h2") return j;
    return -1;
  })();
  const isCtaHeading = (t: string) =>
    /^(book|reserve|planning|request|arrange|contact|talk|ready|start|schedule|plan)\b/i.test(
      t
    ) || t.endsWith("?");

  let sectEyebrow = eyebrow; // eyebrow carried into the first body H2

  while (i < blocks.length) {
    const b = blocks[i];
    if (b.k !== "h2") {
      i++;
      continue;
    }
    const heading = b.t;
    const h2Idx = i;
    i++;

    // collect body until next h2
    const body: Block[] = [];
    while (i < blocks.length && blocks[i].k !== "h2") {
      body.push(blocks[i]);
      i++;
    }

    // eyebrow carried from the intro label, or from the previous section's
    // trailing label (md puts the label BEFORE the heading it introduces)
    let eb = sectEyebrow;
    sectEyebrow = null;

    // extract trailing contact pair (label "Contact" + address text)
    for (let j = 0; j < body.length - 1; j++) {
      const a = body[j];
      const c = body[j + 1];
      if (a.k === "text" && /^contact$/i.test(a.t) && c.k === "text") {
        contactDesc = c.t;
        body.splice(j, 2);
        break;
      }
    }

    // a label at the end of this body introduces the NEXT heading
    const lastBlk = body[body.length - 1];
    if (lastBlk && lastBlk.k === "text" && isLabel(lastBlk.t)) {
      sectEyebrow = (body.pop() as { t: string }).t;
    }

    const isFaq = /frequently asked questions|\bfaqs?\b|your questions|\bquestions\b/i.test(
      heading
    );
    const isCta = h2Idx === lastH2Idx && isCtaHeading(heading);

    if (isFaq) {
      const fc = clone("faq");
      const c = fc.content as Record<string, unknown>;
      c.eyebrow = eb || "";
      c.heading = heading;
      const desc: string[] = [];
      const items: Array<{ id: string; question: string; answer: string }> = [];
      let cur: { id: string; question: string; answer: string } | null = null;
      for (const blk of body) {
        if (blk.k === "h3") {
          cur = { id: rid("itm"), question: blk.t, answer: "" };
          items.push(cur);
        } else if (blk.k === "text") {
          if (cur) cur.answer = cur.answer ? `${cur.answer} ${blk.t}` : blk.t;
          else desc.push(blk.t);
        }
      }
      c.description = desc.join(" ");
      c.items = items;
      fc.items = []; // clear stale template action buttons (tel: links etc.)
      faqs.push(...items.map((it) => ({ q: it.question, a: it.answer })));
      push(fc);
      continue;
    }

    if (isCta) {
      const cta = clone("ctaBanner");
      const c = cta.content as Record<string, unknown>;
      c.heading = heading;
      const desc: string[] = [];
      let actions: Record<string, unknown>[] = [];
      for (const blk of body) {
        if (blk.k === "text") {
          if (isActionLine(blk.t)) {
            actions = blk.t
              .split("·")
              .map((s) => s.trim())
              .filter(Boolean)
              .map((label, idx) => ({
                label,
                href: labelHref(label),
                style: idx === 0 ? "primary" : "secondary",
                icon: idx === 0 ? "ArrowRight" : undefined,
              }));
          } else desc.push(blk.t);
        } else if (blk.k === "links" && actions.length === 0) {
          actions = blk.links.map((l, idx) =>
            actionFromLink(l, idx === 0 ? "primary" : "secondary")
          );
        }
      }
      c.description = desc.join(" ");
      cta.items =
        actions.length > 0
          ? actions
          : [{ label: "Book now", href: "/contact", style: "primary", icon: "ArrowRight" }];
      push(cta);
      continue;
    }

    // ── normal section ──
    const h3Items: Array<{ title: string; desc: string[]; links: Link[] }> = [];
    const pairs: Array<{ label: string; text: string }> = [];
    const texts: string[] = [];
    const bullets: string[] = [];
    const imgs: Array<{ src: string; alt: string }> = [];
    const linkBlocks: Link[][] = [];
    let tableRows: string[][] | null = null;

    let curH3: (typeof h3Items)[number] | null = null;
    let lastLabel: string | null = null;

    for (let j = 0; j < body.length; j++) {
      const blk = body[j];
      if (blk.k === "h3") {
        curH3 = { title: blk.t, desc: [], links: [] };
        h3Items.push(curH3);
        lastLabel = null;
      } else if (blk.k === "text") {
        if (isLabel(blk.t)) {
          const next = body[j + 1];
          if (next && (next.k === "text" || next.k === "links")) {
            if (curH3) {
              // label inside an h3 group: treat as its description lead
              curH3.desc.push(blk.t);
            } else {
              lastLabel = blk.t;
            }
            continue;
          }
          // lone label (e.g. lead-in before bullets) → drop
          if (next && next.k === "bullet") continue;
          if (curH3) curH3.desc.push(blk.t);
          else texts.push(blk.t);
          lastLabel = null;
        } else if (lastLabel && !curH3) {
          pairs.push({ label: lastLabel, text: blk.t });
          lastLabel = null;
        } else if (curH3) {
          curH3.desc.push(blk.t);
        } else {
          texts.push(blk.t);
        }
      } else if (blk.k === "links") {
        if (curH3) curH3.links = blk.links;
        else linkBlocks.push(blk.links);
      } else if (blk.k === "bullet") {
        if (blk.t.split(/\s+/).length > 8) texts.push(blk.t);
        else bullets.push(blk.t);
      } else if (blk.k === "img") {
        imgs.push({ src: blk.src, alt: blk.alt });
      } else if (blk.k === "table") {
        tableRows = blk.rows;
      } else if (blk.k === "stat") {
        // ignore mid-body stats
      }
    }

    const hasFeatures =
      h3Items.length > 0 ||
      pairs.length > 0 ||
      (tableRows !== null && tableRows.length > 1);
    const hasLinks =
      h3Items.some((h) => h.links.length > 0) || linkBlocks.length > 0;
    const usableImgs = imgs.filter((im) =>
      fs.existsSync(path.join(PUBLIC_DIR, im.src))
    );

    const buildItems = (): Array<Record<string, unknown>> => {
      const items: Array<Record<string, unknown>> = [];
      for (const h of h3Items) {
        items.push({
          id: rid("itm"),
          icon: pickIcon(h.title),
          title: h.title,
          heading: h.title,
          description: h.desc.join(" "),
          actions: h.links.length ? [actionFromLink(h.links[0], "text")] : [],
        });
      }
      for (const p of pairs) {
        items.push({
          id: rid("itm"),
          icon: pickIcon(`${p.label} ${p.text}`),
          title: p.label,
          heading: p.label,
          description: p.text,
          actions: [],
        });
      }
      if (tableRows && h3Items.length === 0 && pairs.length === 0) {
        const header = tableRows[0];
        for (const row of tableRows.slice(1)) {
          items.push({
            id: rid("itm"),
            icon: pickIcon(row.join(" ")),
            title: row[0],
            heading: row[0],
            description: row
              .slice(1)
              .map((cell, ci) => (header[ci + 1] ? `${header[ci + 1]}: ${cell}` : cell))
              .join(" · "),
            actions: [],
          });
        }
      }
      // dedupe repeated card titles
      const counts = new Map<string, number>();
      for (const it of items)
        counts.set(it.title as string, (counts.get(it.title as string) ?? 0) + 1);
      for (const it of items) {
        if ((counts.get(it.title as string) ?? 0) > 1) {
          const first = (it.description as string).split("·")[0].trim();
          if (first) it.title = first;
        }
      }
      return items;
    };

    if (hasFeatures && !hasLinks && usableImgs.length > 0) {
      // features + md images → text + media grid
      const tm = clone("textMediaGrid");
      const c = tm.content as Record<string, unknown>;
      c.eyebrow = eb || "";
      c.eyebrowIcon = "";
      c.heading = heading;
      c.headingHighlight = "";
      c.headingAfter = "";
      c.description = texts.join(" ");
      c.items = buildItems();
      c.media = [];
      const pos = mediaIdx % 2 === 0 ? "right" : "left";
      mediaIdx++;
      tm.variant = `media-${pos}`;
      (tm.settings as Record<string, unknown>).mediaPosition = pos;
      (tm.settings as Record<string, unknown>).mediaLayout = "mosaic";
      push(tm);
      imageTargets.push({ sec: tm, cap: 4, wants: true });
    } else if (hasFeatures) {
      const sc = clone("serviceCards");
      const c = sc.content as Record<string, unknown>;
      c.eyebrow = eb || "";
      c.heading = heading;
      c.description = texts.join(" ");
      const items = buildItems();

      sc.items = items; // serviceCards renderer reads top-level section.items
      c.items = items;
      (sc.settings as Record<string, unknown>).source = "inline";
      // trailing/mid links → CTAs (clear stale template CTAs otherwise)
      delete c.bottomCta;
      delete c.sectionCta;
      let ctaLinks: Link[] =
        linkBlocks.length > 0 ? linkBlocks[linkBlocks.length - 1] : [];
      if (ctaLinks.length === 0 && h2Idx === lastH2Idx) {
        // closing section keeps its links in the h3 groups → promote to CTAs
        ctaLinks = h3Items.flatMap((h) => h.links);
      }
      if (ctaLinks.length > 0) {
        c.bottomCta = {
          label: ctaLinks[0].label,
          href: mapHref(ctaLinks[0].href),
          style: "primary",
          icon: "ArrowRight",
        };
        if (ctaLinks[1]) {
          c.sectionCta = {
            label: ctaLinks[1].label,
            href: mapHref(ctaLinks[1].href),
            style: "outline",
          };
        }
        // avoid showing the same label twice (card action + CTA)
        const ctaLabels = new Set(ctaLinks.map((l) => l.label.toLowerCase()));
        for (const it of items) {
          const acts = (it.actions || []) as Array<{ label: string }>;
          if (acts.length && ctaLabels.has(acts[0].label.toLowerCase()))
            it.actions = [];
        }
      }
      const cols = items.length <= 2 ? "2" : items.length <= 6 ? "3" : "4";
      (sc.settings as Record<string, unknown>).columns = cols;
      sc.variant = `${cols}-column`;
      push(sc);
      // images from this body stay in the shared pool (links kept as card actions)
    } else {
      // paragraph / bullet section → mediaContent
      if (texts.length === 0 && bullets.length === 0 && imgs.length === 0 && linkBlocks.length === 0)
        continue;
      const mc = makeMedia();
      const c = mc.content as Record<string, unknown>;
      c.eyebrow = eb || "";
      c.heading = heading;
      c.description = texts.join("\n\n");
      c.items = bullets.map((t) => ({
        id: rid("itm"),
        icon: pickIcon(t),
        heading: t,
        description: "",
      }));
      const actions: Record<string, unknown>[] = [];
      for (const lb of linkBlocks) {
        for (const l of lb) actions.push(actionFromLink(l, "outline"));
      }
      c.actions = actions;
      push(mc);
      imageTargets.push({ sec: mc, cap: 1, wants: usableImgs.length > 0 });
    }
  }

  // contact form (from extracted address) before final CTA / at end
  if (contactDesc) {
    const cf = clone("contactForm");
    const c = cf.content as Record<string, unknown>;
    c.eyebrow = "Contact";
    c.heading = "Contact AB";
    c.description = contactDesc;
    c.icon = c.icon || "Phone";
    c.submitLabel = c.submitLabel || "Send Request";
    c.successTitle = c.successTitle || "Request Received";
    c.successMessage = c.successMessage || "Our team will get back to you shortly.";
    const at =
      sections.length && (sections[sections.length - 1].type === "ctaBanner")
        ? sections.length - 1
        : sections.length;
    cf.id = rid("sec");
    cf.enabled = true;
    cf.order = at;
    sections.splice(at, 0, cf);
    for (let k = 0; k < sections.length; k++) sections[k].order = k;
  }

  // ── image allocation ──
  // hero takes the first usable md image; the rest are fairly distributed to
  // sections that can show them (textMediaGrid up to 4, mediaContent 1).
  const usableImages = parsed.imageUrls.filter((u) =>
    fs.existsSync(path.join(PUBLIC_DIR, u))
  );
  const pool = [...usableImages];
  if (heroImg) {
    const idx = pool.indexOf(heroImg.src);
    if (idx >= 0) pool.splice(idx, 1);
  }
  let imagesUsed = heroImg && usableImages.includes(heroImg.src) ? 1 : 0;

  const applyImages = (sec: PageSection, srcs: string[]) => {
    if (srcs.length === 0) return;
    imagesUsed += srcs.length;
    const c = sec.content as Record<string, unknown>;
    if (sec.type === "textMediaGrid") {
      c.media = srcs.map((src) => ({
        id: rid("itm"),
        type: "image",
        size: "tall",
        image: src,
        imageAlt: imageAlts.get(src) || (c.heading as string) || "",
        overlay: "none",
        contain: false,
      }));
      const st = sec.settings as Record<string, unknown>;
      if (srcs.length === 1) st.mediaLayout = "single";
      else if (srcs.length === 2) st.mediaLayout = "mosaic";
      else {
        st.mediaLayout = "row";
        st.mediaPosition = "bottom";
      }
    } else {
      const appear = sec.appearance as Record<string, unknown>;
      appear.background = srcs[0];
      appear.backgroundAlt =
        imageAlts.get(srcs[0]) || (c.heading as string) || "";
    }
  };

  const distribute = (targets: Array<{ sec: PageSection; cap: number; wants: boolean }>) => {
    for (let k = 0; k < targets.length && pool.length > 0; k++) {
      const t = targets[k];
      const share = Math.min(
        t.cap,
        Math.max(1, Math.ceil(pool.length / (targets.length - k)))
      );
      applyImages(t.sec, pool.splice(0, share));
    }
  };
  distribute(imageTargets.filter((t) => t.wants));
  distribute(imageTargets.filter((t) => !t.wants));

  // alternate media sides for every mediaContent section
  const mediaSections = sections.filter((s) => s.type === "mediaContent");
  mediaSections.forEach((mc, idx) => {
    const pos = idx % 2 === 0 ? "right" : "left";
    mc.variant = `media-${pos}`;
    (mc.settings as Record<string, unknown>).mediaPosition = pos;
  });

  for (let k = 0; k < sections.length; k++) sections[k].order = k;

  const excerpt = heroParas[0] || "";
  const heroImage =
    (heroImg && fs.existsSync(path.join(PUBLIC_DIR, heroImg.src))
      ? heroImg.src
      : "") ||
    ((hero.appearance as Record<string, unknown>).background as string) ||
    "";

  return { sections, faqs, hero, excerpt, heroImage, imagesUsed, imagesTotal: usableImages.length };
}

// ── Slug mapping ─────────────────────────────────────────────────────────────

function mapFile(file: string): string | null {
  let rest = file
    .replace(/\.md$/, "")
    .replace(/^(www|ww)\.ab\.limo-services-/, "");
  rest = rest.replace(/\d+$/, ""); // variant suffixes: `dammam1`, `saudi-arabia1`
  const cat = CATS.find((c) => rest === c || rest.startsWith(`${c}-`));
  if (!cat) return null;
  if (rest === cat) return cat === "workforce-transportation" ? "BASE:workforce-mobility" : `BASE:${cat}`;
  const after = rest.slice(cat.length + 1);
  const country = COUNTRIES.find((c) => after === c || after.startsWith(`${c}-`));
  if (country)
    return `services/${cat}/${country}${
      after.length > country.length ? `/${after.slice(country.length + 1)}` : ""
    }`;
  return `services/${cat}/${after}`;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function connect(): Promise<Db> {
  let uri = process.env.MONGO_URI || process.env.MONGODB_URI || "";
  if (!uri) throw new Error("MONGO_URI / MONGODB_URI not set");
  if (!uri.includes("/ablimo-db")) {
    const [base, query] = uri.split("?");
    uri =
      base.replace(/\/+$/, "") +
      "/ablimo-db" +
      (query ? `?${query}` : "");
  }
  const client = await MongoClient.connect(uri);
  return client.db("ablimo-db");
}

async function main() {
  const write = process.argv.includes("--write");
  const dump = process.argv.includes("--dump");
  const onlyArg = process.argv.find((a) => a.startsWith("--only="));
  const only = onlyArg ? onlyArg.slice("--only=".length) : "";

  const db = await connect();
  const files = fs
    .readdirSync(MD_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  interface Target {
    file: string;
    slug: string; // BASE:x or services/...
    kind: "base" | "article";
  }
  const targets: Target[] = [];
  const skipped: string[] = [];
  const unmapped: string[] = [];

  for (const f of files) {
    if (SKIP.has(f)) {
      skipped.push(f);
      continue;
    }
    const slug = mapFile(f);
    if (!slug) {
      unmapped.push(f);
      continue;
    }
    if (only && !slug.includes(only) && !f.includes(only)) continue;
    targets.push({ file: f, slug, kind: slug.startsWith("BASE:") ? "base" : "article" });
  }

  // image alt map (from md image syntax)
  const imageAlts = new Map<string, string>();
  for (const f of files) {
    const raw = fs.readFileSync(path.join(MD_DIR, f), "utf8");
    for (const m of raw.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
      const url = resolveImageUrl(m[2]);
      if (!imageAlts.has(url) && m[1]) imageAlts.set(url, cleanText(m[1]));
    }
  }

  const report: string[] = [];
  const backup: {
    at: string;
    articles: Array<Record<string, unknown>>;
    services: Array<Record<string, unknown>>;
  } = { at: new Date().toISOString(), articles: [], services: [] };

  for (const t of targets) {
    const parsed = parseFile(t.file);
    if (!parsed.h1) {
      report.push(`!! ${t.file} → no H1, skipped`);
      continue;
    }

    if (t.kind === "base") {
      const slug = t.slug.slice(5);
      const doc = await db.collection("services").findOne({ slug });
      if (!doc) {
        report.push(`!! BASE MISSING in DB: ${slug}`);
        continue;
      }
      const existing = ((doc.pageSections as PageSection[]) || []) as PageSection[];
      const built = buildSections(parsed, existing, imageAlts);
      backup.services.push({
        slug,
        pageSections: doc.pageSections,
        faqs: doc.faqs,
        heroImage: doc.heroImage,
        subtitle: doc.subtitle,
        seo: doc.seo,
      });
      const set: Record<string, unknown> = {
        pageSections: built.sections,
        faqs: built.faqs,
      };
      if (built.heroImage) set.heroImage = built.heroImage;
      if (built.excerpt) set.subtitle = built.excerpt;
      const seo = (doc.seo as Record<string, string>) || {};
      if (!seo.metaDescription && built.excerpt) {
        set.seo = { ...seo, metaDescription: built.excerpt };
      }
      report.push(
        `BASE ${slug} ← ${t.file} | sections=${built.sections
          .map((s) => s.type)
          .join(",")} | faqs=${built.faqs.length} | imgs=${built.imagesUsed}/${built.imagesTotal}`
      );
      if (dump)
        fs.writeFileSync(
          `scripts/_dump-${slug.replace(/\//g, "_")}.json`,
          JSON.stringify({ sections: built.sections, faqs: built.faqs }, null, 2)
        );
      if (write) await db.collection("services").updateOne({ _id: doc._id }, { $set: set });
    } else {
      const doc = await db.collection("articles").findOne({ slug: t.slug });
      if (!doc) {
        report.push(`!! ARTICLE MISSING in DB: ${t.slug}`);
        continue;
      }
      const existing = ((doc.sections as PageSection[]) || []) as PageSection[];
      const built = buildSections(parsed, existing, imageAlts);
      backup.articles.push({
        slug: t.slug,
        title: doc.title,
        excerpt: doc.excerpt,
        sections: doc.sections,
        faqs: doc.faqs,
        featured_image: doc.featured_image,
        contentMode: doc.contentMode,
        seo_metadata: doc.seo_metadata,
      });
      const set: Record<string, unknown> = {
        sections: built.sections,
        title: parsed.h1,
        faqs: built.faqs,
        contentMode: "page-sections",
      };
      if (built.excerpt) set.excerpt = built.excerpt;
      if (parsed.imageUrls.length > 0 && fs.existsSync(path.join(PUBLIC_DIR, parsed.imageUrls[0])))
        set.articleMedia = {
          ...((doc.articleMedia as Record<string, unknown>) || {}),
          heroCoverMedia: {
            ...(((doc.articleMedia as Record<string, Record<string, string>>)
              ?.heroCoverMedia as Record<string, string>) || {}),
            url: parsed.imageUrls[0],
          },
        };
      if (parsed.details) {
        const seo = (doc.seo_metadata as Record<string, string>) || {};
        set.seo_metadata = {
          ...seo,
          ...(parsed.details.metaTitle ? { metaTitle: parsed.details.metaTitle } : {}),
          ...(parsed.details.metaDescription
            ? { metaDescription: parsed.details.metaDescription }
            : {}),
        };
      }
      report.push(
        `ART ${t.slug} ← ${t.file} | sections=${built.sections
          .map((s) => s.type)
          .join(",")} | faqs=${built.faqs.length} | imgs=${built.imagesUsed}/${built.imagesTotal}`
      );
      if (dump)
        fs.writeFileSync(
          `scripts/_dump-${t.slug.replace(/\//g, "_")}.json`,
          JSON.stringify(
            { title: parsed.h1, excerpt: built.excerpt, sections: built.sections, faqs: built.faqs },
            null,
            2
          )
        );
      if (write) await db.collection("articles").updateOne({ _id: doc._id }, { $set: set });
    }
  }

  // no-source pages (KSA/UAE/Qatar only — Bahrain/Kuwait/Oman are known gaps)
  const allArticles = await db
    .collection("articles")
    .find({ slug: /^services\// }, { projection: { slug: 1 } })
    .toArray();
  const covered = new Set(
    targets.filter((t) => t.kind === "article").map((t) => t.slug)
  );
  const noSource = allArticles
    .map((a) => a.slug as string)
    .filter((s) => !covered.has(s) && /\/(saudi-arabia|uae|qatar)(\/|$)/.test(s))
    .sort();

  console.log(report.join("\n"));
  console.log(`\ntargets=${targets.length} skipped(dup/empty)=${skipped.length}`);
  if (skipped.length) console.log("  " + skipped.join("\n  "));
  if (unmapped.length) console.log("UNMAPPED: " + unmapped.join(", "));
  console.log(`\nKSA/UAE/Qatar pages WITHOUT md source (${noSource.length}):`);
  console.log("  " + noSource.join("\n  "));

  if (write) {
    const bp = path.join("scripts", `_backup-services-md-${Date.now()}.json`);
    fs.writeFileSync(bp, JSON.stringify(backup, null, 2));
    console.log(`\n✔ written. backup → ${bp}`);
  } else {
    console.log("\n(dry run — pass --write to apply)");
  }
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
