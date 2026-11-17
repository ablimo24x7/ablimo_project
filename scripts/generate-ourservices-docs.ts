import fs from "fs";
import path from "path";
import { Packer } from "docx";
import {
  pageToDocx,
  pageToMarkdown,
  stripHtml,
  type PageData,
  type DocContentSection,
} from "./doc-builder-helper";
import { corporateContentEn } from "../src/app/[lang]/corporate-accounts/_components/corporate-content";

const OUT_DIR = path.resolve("OurServices");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Load dumped services
const dumpedServices: any[] = JSON.parse(
  fs.readFileSync(path.resolve("scripts/dumped_services.json"), "utf8")
);

const pagesToGenerate: PageData[] = [];

// =========================================================================
// 1. CORPORATE ACCOUNTS
// =========================================================================
const c = corporateContentEn;
const corpAccountsSections: DocContentSection[] = [
  // Section 1: Hero
  {
    eyebrow: c.hero.badge,
    title: "Executive Hero: Master Framework Agreement",
    subtitle: c.hero.h1,
    description: c.hero.lead,
    stats: c.hero.quickStats.map((s) => ({
      value: s.value,
      label: `${s.label} (${s.sub})`,
    })),
    buttons: [
      { label: c.hero.primaryCta, href: "#proposal-form" },
      { label: c.hero.secondaryCta, href: "#capability-statement" },
    ],
  },

  // Section 2: Scope of Account Coverage
  {
    eyebrow: "UNIFIED ACCOUNT SCOPE",
    title: c.scope.h2,
    subtitle: c.scope.subhead,
    description:
      "A single commercial master agreement covering point-to-point transfers, dedicated executive cars, airport arrivals, roadshows, and staff shuttle operations across the GCC.",
    cards: c.scope.items.map((it) => ({
      title: `${it.title} [${it.badge}]`,
      description: it.description,
      bullets: it.highlights,
      actions: [{ label: "View Service Scope", href: it.href }],
    })),
  },

  // Section 3: Procurement & Commercial Framework
  {
    eyebrow: "PROCUREMENT & COMPLIANCE",
    title: c.procurement.h2,
    subtitle: c.procurement.subhead,
    description:
      "Enterprise supplier governance designed for multinational corporations, regional headquarters, and government institutions operating under formal procurement rules.",
    cards: c.procurement.pillars.map((p) => ({
      title: `${p.h3} [${p.tag}]`,
      description: p.text,
      bullets: p.points,
    })),
  },

  // Section 4: Billing, Reporting & Audit Transparency
  {
    eyebrow: "FINANCIAL GOVERNANCE",
    title: c.billing.h2,
    subtitle: c.billing.subhead,
    description:
      "Transparent commercial billing with zero hidden surcharges. Monthly statements partitioned cleanly by business unit, project matter code, or regional entity.",
    cards: c.billing.features.map((f) => ({
      title: `${f.title} (${f.tag})`,
      description: f.description,
      bullets: [f.detail],
    })),
    subsections: [
      {
        title: "Sample Monthly Invoice Structure",
        description: `Entity: ${c.billing.invoiceSample.entity} · Billing Cycle: ${c.billing.invoiceSample.period}`,
        bullets: c.billing.invoiceSample.costCentres.map(
          (cc) => `${cc.name} (Code: ${cc.code}): ${cc.trips} verified journeys · Net Total: ${cc.total}`
        ),
      },
    ],
  },

  // Section 5: Governance & Account Leadership
  {
    eyebrow: "ACCOUNT GOVERNANCE",
    title: c.governance.h2,
    subtitle: c.governance.subhead,
    description:
      "Dedicated operational and commercial management assigned to your account from day one.",
    cards: c.governance.team.map((t) => ({
      title: `${t.title} — ${t.role} [${t.tag}]`,
      description: t.description,
      bullets: t.features,
    })),
  },

  // Section 6: Executive Booking Channels & Protocol
  {
    eyebrow: "DISPATCH PROTOCOL",
    title: c.booking.h2,
    subtitle: c.booking.subhead,
    description:
      "Multiple redundant booking channels for executive assistants, travel managers, and authorized bookers.",
    cards: c.booking.channels.map((ch) => ({
      title: ch.title,
      description: ch.desc,
    })),
    subsections: [
      {
        title: `${c.booking.dispatchNotice.title} [${c.booking.dispatchNotice.badge}]`,
        description: c.booking.dispatchNotice.description,
        bullets: c.booking.dispatchNotice.items,
      },
      {
        title: c.booking.preferences.title,
        description: "Stored passenger profiles applied automatically across all regional bookings:",
        bullets: c.booking.preferences.items.map((pr) => `**${pr.name}:** ${pr.options}`),
      },
    ],
  },

  // Section 7: Industries & Sectors Supported
  {
    eyebrow: "SECTOR EXPERTISE",
    title: c.sectors.h2,
    subtitle: c.sectors.subhead,
    description:
      "Tailored transportation programmes compliant with the regulatory, confidentiality, and duty-of-care requirements of key Gulf industries.",
    cards: c.sectors.items.map((sec) => ({
      title: `${sec.name} — ${sec.role}`,
      description: sec.description,
    })),
  },

  // Section 8: RFP & Proposal Request
  {
    eyebrow: "PROPOSAL REQUEST",
    title: "Open a Corporate Account / Submit RFP",
    subtitle: "Tell us roughly how your organisation travels today",
    description:
      "Our commercial desk will review your passenger groups, routes, and timeline, and return with a customized proposal and draft rate card within 4 business hours.",
    bullets: [
      "Company name, contact details, and role (Executive Office, Procurement, Travel Manager, HR)",
      "Target countries: Saudi Arabia (KSA), UAE, Qatar, Bahrain, Kuwait, Oman",
      "Services needed: Executive Chauffeurs, Airport Transfers, Dedicated Drivers, Staff Routes, Events",
      "Estimated monthly volume & target start date",
      "Formal RFP documentation & tender package upload",
    ],
    buttons: [{ label: "Request Corporate Proposal", href: "#proposal-form" }],
  },

  // Section 9: Frequently Asked Questions
  {
    eyebrow: "CORPORATE FAQS",
    title: c.faqs.h2,
    subtitle: c.faqs.subhead,
    faqs: c.faqs.items.map((faq) => ({
      question: faq.q,
      answer: faq.a,
    })),
  },
];

pagesToGenerate.push({
  fileName: "1.Corporate Accounts",
  title: c.meta.title,
  subtitle: c.hero.h1,
  url: "https://www.ab.limo/corporate-accounts",
  description: c.meta.description,
  sections: corpAccountsSections,
});

// =========================================================================
// 2. HELPER TO PARSE DB SERVICES INTO PAGEDATA
// =========================================================================
function parseDbService(doc: any, fileName: string, urlPath: string): PageData {
  const sections: DocContentSection[] = [];

  // 1. Hero
  sections.push({
    eyebrow: doc.breadcrumb || doc.title,
    title: `Hero: ${doc.title}`,
    subtitle: doc.subtitle || doc.desc,
    description: doc.desc || doc.subtitle,
    buttons: [
      { label: doc.ctaLabel || "Request a proposal", href: doc.ctaHref || "#contact" },
      { label: "Talk to an operations manager", href: "/contact" },
    ],
  });

  // 2. Key Features
  if (doc.features && doc.features.length > 0) {
    sections.push({
      eyebrow: "OPERATIONAL PILLARS",
      title: "Core Features & Service Hallmarks",
      description: "Fundamental operational guarantees embedded into every booking and managed route.",
      cards: doc.features.map((f: any) => ({
        title: f.title || f.name,
        description: f.desc || f.description || "",
      })),
    });
  }

  // 3. Programmes / Cards
  if (doc.cards && doc.cards.length > 0) {
    sections.push({
      eyebrow: "SERVICE PROGRAMMES",
      title: doc.cardsHeading || "Programmes We Operate Across the GCC",
      description:
        doc.cardsDesc ||
        "Customized transportation programmes designed to handle every organizational mobility demand under one operating agreement.",
      cards: doc.cards.map((c: any) => ({
        title: c.tag ? `${c.title} [${c.tag}]` : c.title,
        description: c.desc || c.description || "",
      })),
    });
  }

  // 4. Content Sections (How We Run It / Standards / Framework)
  if (doc.sections && doc.sections.length > 0) {
    doc.sections.forEach((sec: any) => {
      const bullets = (sec.bullets || []).map((b: any) => (typeof b === "string" ? b : b.text || ""));
      sections.push({
        eyebrow: "OPERATIONAL DELIVERY",
        title: sec.title || "How We Run It",
        description: (sec.paragraphs || []).join("\n\n"),
        bullets: bullets.length ? bullets : undefined,
      });
    });
  }

  // 5. Text + Media Grid Section (Regional Impact / Vision 2030 / GCC Execution)
  const rawSections: any[] = doc.pageSections || [];
  const tmgSection = rawSections.find((s) => s.type === "textMediaGrid" && s.enabled !== false);
  if (tmgSection && tmgSection.content) {
    const tc = tmgSection.content;
    const bullets: string[] = [];
    if (tc.items && Array.isArray(tc.items)) {
      tc.items.forEach((it: any) => {
        if (it.heading) {
          bullets.push(`**${it.heading}:** ${it.description || ""}`);
        }
      });
    }
    const stats: Array<{ value: string; label: string }> = [];
    if (tc.media && Array.isArray(tc.media)) {
      tc.media.forEach((m: any) => {
        if (m.type === "stat" && m.statValue) {
          stats.push({ value: m.statValue, label: m.statLabel || "" });
        }
      });
    }
    sections.push({
      eyebrow: tc.eyebrow || "REGIONAL EXECUTION",
      title: tc.heading || "Regional Impact & Case Study",
      subtitle: tc.headingHighlight ? `${tc.heading} ${tc.headingHighlight}` : undefined,
      description: stripHtml(tc.description || ""),
      bullets: bullets.length ? bullets : undefined,
      stats: stats.length ? stats : undefined,
    });
  }

  // 6. Fleet Grid Section
  const fleetSection = rawSections.find((s) => s.type === "fleetGrid" && s.enabled !== false);
  if (fleetSection) {
    const fc = fleetSection.content || {};
    const fItems: any[] = fleetSection.items || [];
    if (fItems.length > 0) {
      sections.push({
        eyebrow: fc.eyebrow || "FLEET ALLOCATION",
        title: fc.heading || "Vehicles Available for This Service",
        description: stripHtml(fc.description || "Executive sedans, SUVs, MPVs, and luxury motorcoaches compliant with regional standards."),
        cards: fItems.map((v) => ({
          title: `${v.category || "Vehicle"} — ${v.name || ""}`,
          subtitle: `Badge: ${v.badge || "Executive"} · Capacity: ${v.capacity || "N/A"} · Luggage: ${v.bags || "N/A"}`,
          description: "Late-model executive vehicle compliant with GCC transport standards.",
        })),
      });
    }
  }

  // 7. Lead Proposal Form
  sections.push({
    eyebrow: "REQUEST A PROPOSAL",
    title: doc.ctaTitle || "Request a Transportation Proposal",
    description: doc.ctaDesc || "Tell us roughly how your organisation travels today. Our commercial desk will review your parameters and return with a customized proposal and rate card.",
    buttons: [
      { label: doc.ctaLabel || "Request Corporate Proposal", href: doc.ctaHref || "#contact" },
    ],
  });

  // 8. FAQs
  if (doc.faqs && doc.faqs.length > 0) {
    sections.push({
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "Questions & Operational Answers",
      faqs: doc.faqs.map((f: any) => ({
        question: f.q || f.question || "",
        answer: f.a || f.answer || "",
      })),
    });
  }

  return {
    fileName,
    title: doc.seo?.metaTitle || `${doc.title} in KSA, UAE & Qatar | AB`,
    subtitle: doc.subtitle || doc.desc || doc.title,
    url: `https://www.ab.limo${urlPath}`,
    description: doc.seo?.metaDescription || doc.desc || `${doc.title} across Saudi Arabia, UAE, and Qatar.`,
    sections,
  };
}

// =========================================================================
// 2. CORPORATE & STAFF TRANSPORTATION
// =========================================================================
const corpDoc = dumpedServices.find((s) => s.slug === "corporate-transportation");
if (corpDoc) {
  pagesToGenerate.push(
    parseDbService(corpDoc, "2.Corporate & Staff Transportation", "/services/corporate-transportation")
  );
}

// =========================================================================
// 3. EVENT TRANSPORTATION
// =========================================================================
const eventDoc = dumpedServices.find((s) => s.slug === "event-transportation");
if (eventDoc) {
  pagesToGenerate.push(
    parseDbService(eventDoc, "3.Event Transportation", "/services/event-transportation")
  );
}

// =========================================================================
// 4 TO 10: REMAINING SERVICES (TO KEEP OURSERVICES COMPREHENSIVE)
// =========================================================================
const otherServicesMap = [
  { slug: "airport-transfers", file: "4.Airport Transfers", path: "/services/airport-transfers" },
  { slug: "chauffeur-vip", file: "5.Executive & Corporate Mobility (Chauffeur & VIP)", path: "/services/chauffeur-vip" },
  { slug: "bus-coach-hire", file: "6.Group & Coach Charter (Bus & Coach Hire)", path: "/services/bus-coach-hire" },
  { slug: "workforce-mobility", file: "7.Workforce Mobility Solutions", path: "/services/workforce-mobility" },
  { slug: "tourism-transportation", file: "8.Tourism & Leisure Transportation", path: "/services/tourism-transportation" },
  { slug: "religious-tourism", file: "9.Religious Tourism (Hajj & Umrah)", path: "/services/religious-tourism" },
  { slug: "intercity-transfers", file: "10.Intercity Transfers", path: "/services/intercity-transfers" },
];

for (const item of otherServicesMap) {
  const doc = dumpedServices.find((s) => s.slug === item.slug);
  if (doc) {
    pagesToGenerate.push(parseDbService(doc, item.file, item.path));
  }
}

// =========================================================================
// WRITE FILES (.docx and .md)
// =========================================================================
async function generateAll() {
  console.log(`\n=========================================================`);
  console.log(`Generating Word (.docx) & Markdown (.md) documents in:`);
  console.log(OUT_DIR);
  console.log(`Total Pages: ${pagesToGenerate.length}`);
  console.log(`=========================================================\n`);

  for (const page of pagesToGenerate) {
    const docxPath = path.join(OUT_DIR, `${page.fileName}.docx`);
    const mdPath = path.join(OUT_DIR, `${page.fileName}.md`);

    console.log(`Writing: ${page.fileName}...`);

    // 1. Write Markdown
    const mdContent = pageToMarkdown(page);
    fs.writeFileSync(mdPath, mdContent, "utf8");

    // 2. Write Docx
    const doc = pageToDocx(page);
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(docxPath, buffer);

    console.log(`  ✓ ${page.fileName}.docx (${(buffer.length / 1024).toFixed(1)} KB)`);
    console.log(`  ✓ ${page.fileName}.md (${(mdContent.length / 1024).toFixed(1)} KB)`);
  }

  console.log(`\n✓ All ${pagesToGenerate.length} services documents generated successfully in OurServices/`);
}

generateAll().catch((err) => {
  console.error("Error generating documents:", err);
  process.exit(1);
});

