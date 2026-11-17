import fs from "fs";
import path from "path";
import { Packer } from "docx";
import {
  pageToDocx,
  pageToMarkdown,
  type PageData,
  type DocContentSection,
} from "./doc-builder-helper";
import {
  SKETCH_INDUSTRIES,
  HUB_STEPS,
  HUB_FAQS,
} from "../src/app/[lang]/industries/_components/industries-sketch";
import {
  INDUSTRY_DETAILS,
  type IndustryDetailData,
} from "../src/app/[lang]/industries/_components/industry-detail-data";

// Root output folder
const OUT_DIR = path.resolve("industry-content-documents");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Read Dictionaries for verification / metadata
const dictEnUs = JSON.parse(
  fs.readFileSync(path.resolve("src/app/[lang]/dictionaries/en-US.json"), "utf8")
);
const dictEnGb = JSON.parse(
  fs.readFileSync(path.resolve("src/app/[lang]/dictionaries/en-GB.json"), "utf8")
);

const allIndustryPages: PageData[] = [];

// =========================================================================
// 1. MAIN INDUSTRIES PAGE (Hub)
// =========================================================================
const hubSections: DocContentSection[] = [
  // Section 1: Hero
  {
    eyebrow: "Mobility by industry · Seven sectors, one operating standard",
    title: "Hero Section: Mobility by Industry Across the Gulf",
    subtitle: "Transportation Services by Industry Across the Gulf",
    description:
      "Transportation services by industry help corporate, aviation, government and event teams coordinate reliable ground transportation across the Gulf. AB provides managed ground transportation GCC programmes, matching fleet, chauffeur service and dispatch to each sector's operating needs in Saudi Arabia, the UAE and Qatar, with consistent duty of care and clear account oversight.",
    buttons: [
      { label: "Request a proposal", href: "/contact" },
      { label: "Talk to a planner", href: "/contact" },
      { label: "Our services", href: "/services" },
    ],
    subsections: [
      {
        title: "Seven Core Sectors in the AB Mobility Network",
        description:
          "The hub coordinates ground mobility across seven specialised industry sectors:",
        bullets: SKETCH_INDUSTRIES.map(
          (s) => `${s.num} ${s.name} — ${s.desc} (Route: ${s.href})`
        ),
      },
    ],
  },

  // Section 2: Sector Directory (7 Sectors)
  {
    eyebrow: "Specialized Industry Sectors",
    title: "Sector Directory: Dedicated Industry Mobility Programs",
    subtitle: "Seven Specialized Sectors, One Operational Standard",
    description:
      "Explore each sector's dedicated ground mobility framework, tailored chauffeur protocols, and fleet allocations:",
    cards: SKETCH_INDUSTRIES.map((s) => ({
      title: `${s.num}. ${s.name}`,
      subtitle: s.desc,
      description: `${s.intro}\n\nKey Operating Capabilities:\n${s.points.map((pt) => `• ${pt}`).join("\n")}`,
      actions: [
        {
          label: s.ctaLabel,
          href: s.href,
        },
      ],
    })),
  },

  // Section 3: Mid-page Callout
  {
    eyebrow: "Consultation Callout",
    title: "Not Sure Where You Fit?",
    subtitle: "Cross-Sector Mobility Consultation",
    description:
      "Talk to a planner about transportation services and tailored solutions for your industry, including programmes that span multiple sectors.",
    buttons: [{ label: "Talk to a planner", href: "/contact" }],
  },

  // Section 4: How We Work
  {
    eyebrow: "How We Work",
    title: "One Operational Standard for Transportation Services by Industry",
    subtitle: "Centralized Command & Local Operating Precision",
    description:
      "AB brings every sector under one standard through a 24/7 operations centre in Riyadh. Our managed transportation approach coordinates ground transportation, dispatch and GPS tracking across Saudi Arabia, the UAE and Qatar. Clients benefit from consistent duty of care, a dedicated account manager, one consolidated invoice and clear reporting. Review delivery examples in our Case Studies before finalising corporate tenders.",
    subsections: HUB_STEPS.map((step) => ({
      title: `Stage ${step.num}: ${step.title}`,
      description: step.description,
    })),
    buttons: [
      { label: "Explore Our Services", href: "/services" },
      { label: "Review Case Studies", href: "/#case-studies" },
    ],
  },

  // Section 5: FAQs
  {
    eyebrow: "Frequently Asked Questions",
    title: "Questions About Transportation Services by Industry",
    subtitle: "Operational Scope, Coverage, Fleet & Governance",
    faqs: HUB_FAQS.map((f) => ({
      question: f.q,
      answer: f.a,
    })),
  },

  // Section 6: Closing CTA
  {
    eyebrow: "Program Initiation",
    title: "Choose Transportation Services by Industry with AB",
    subtitle: "Managed Ground Transport Across KSA, UAE & Qatar",
    description:
      "AB coordinates tailored transportation services, professional chauffeurs and fleet support across Saudi Arabia, the UAE and Qatar, giving organisations one managed approach for sector-specific journeys.",
    buttons: [
      { label: "Request a proposal", href: "/contact" },
      { label: "Book a transfer", href: "/services" },
    ],
  },
];

allIndustryPages.push({
  fileName: "01-Main-Industries-Page",
  title: "AB Transportation — Industries Hub",
  subtitle: "Transportation Services by Industry Across the Gulf",
  url: "https://www.ab.limo/industries",
  description:
    dictEnUs.industries?.metadata?.description ||
    "Transportation services by industry help corporate, aviation, government and event teams coordinate reliable ground transportation across the Gulf. Managed programmes across Saudi Arabia, the UAE and Qatar.",
  sections: hubSections,
});

// =========================================================================
// HELPER TO MAP INDUSTRY DETAIL TO DOC CONTENT SECTIONS
// =========================================================================
function buildIndustryDetailSections(data: IndustryDetailData): DocContentSection[] {
  const sections: DocContentSection[] = [];

  // 1. Hero Section
  sections.push({
    eyebrow: data.badge,
    title: `Hero Section: ${data.h1}`,
    subtitle: data.heroSubtitle || data.h1,
    description: data.heroParagraphs.join("\n\n"),
    buttons: [
      { label: data.heroPrimaryCta.label, href: data.heroPrimaryCta.href },
      { label: data.heroSecondaryCta.label, href: data.heroSecondaryCta.href },
      { label: "All Industries", href: "/industries" },
    ],
    stats:
      data.strip && data.strip.length > 0
        ? data.strip.map((s) => ({
            value: s.v,
            label: `${s.l}${s.desc ? ` — ${s.desc}` : ""}`,
          }))
        : undefined,
  });

  // 2. Statement & Visual Overview
  sections.push({
    eyebrow: data.statementEyebrow || "Strategic Focus",
    title: "Strategic Overview & Operational Mandate",
    description: data.statement,
    subsections: [
      {
        title: "Operational Environment & Visual Context",
        description: `Visual reference: ${data.featureImageAlt} (Asset: ${data.featureImage})`,
      },
    ],
  });

  // 3. Operational Challenges & Requirements (Needs)
  sections.push({
    eyebrow: data.needsEyebrow || "Sector Challenges",
    title: data.needsH2,
    description: data.needsIntro.join("\n\n"),
    cards: data.needs.map((item) => ({
      title: `${item.num}. ${item.t}`,
      description: item.x,
    })),
  });

  // 4. Operating Process & Delivery Framework (Steps)
  sections.push({
    eyebrow: data.stepsEyebrow || "Operating Framework",
    title: data.stepsH2,
    description: data.stepsIntro.join("\n\n"),
    subsections: data.steps.map((item) => ({
      title: `Stage ${item.num}: ${item.t}`,
      description: item.x,
    })),
  });

  // 5. Tailored Sector Services
  sections.push({
    eyebrow: data.servicesEyebrow || "Core Capabilities",
    title: data.servicesH2,
    description: data.servicesIntro.join("\n\n"),
    cards: data.services.map((srv) => ({
      title: srv.name,
      description: srv.desc || "",
      actions: srv.subLinkLabel
        ? [{ label: srv.subLinkLabel, href: srv.subLinkHref || srv.href }]
        : [{ label: `Explore ${srv.name}`, href: srv.href }],
    })),
    bullets:
      data.serviceHighlights && data.serviceHighlights.length > 0
        ? data.serviceHighlights.map(
            (sh) => `${sh.prefix} [${sh.linkLabel}](${sh.href}) ${sh.suffix}`
          )
        : undefined,
  });

  // 6. Dedicated Fleet & Vehicle Specifications
  sections.push({
    eyebrow: data.fleetEyebrow || "Fleet Architecture",
    title: data.fleetH2,
    description: data.fleetIntro.join("\n\n"),
    cards:
      data.fleetCards && data.fleetCards.length > 0
        ? data.fleetCards.map((fc) => ({
            title: fc.title,
            description: `${fc.description} (Visual: ${fc.imageAlt})`,
            actions: fc.ctaLabel ? [{ label: fc.ctaLabel, href: fc.href }] : undefined,
          }))
        : undefined,
    bullets:
      data.vehicles && data.vehicles.length > 0
        ? [
            `Recommended Fleet Allocation: ${data.vehicles.join(" · ")}`,
            "All vehicles equipped with GPS live tracking, climate comfort, and pristine executive preparation.",
          ]
        : undefined,
  });

  // 7. Geographic Coverage & Host City Hubs
  sections.push({
    eyebrow: data.coverageEyebrow || "Regional Network",
    title: data.coverageH2,
    description: data.coverageParagraphs.join("\n\n"),
    cards: data.coverageLinks.map((cl) => ({
      title: cl.name,
      description: cl.desc || "",
      actions: [{ label: `View ${cl.name} Network`, href: cl.href }],
    })),
  });

  // 8. Proven Case Studies & Operational Delivery
  if (data.cases && data.cases.length > 0) {
    sections.push({
      eyebrow: data.proofEyebrow || "Proven Delivery",
      title: data.proofH2,
      description: data.proofIntro,
      cards: data.cases.map((c) => ({
        title: `${c.title} (${c.sector} · ${c.place})`,
        subtitle: `Operational Timeline: ${c.years}`,
        description: c.stats.map((st) => `• ${st.v}: ${st.l}`).join("\n"),
        actions: c.href ? [{ label: "View Case Details", href: c.href }] : undefined,
      })),
    });
  }

  // 9. Duty of Care, Safety & Operational Standards
  sections.push({
    eyebrow: data.standardsEyebrow || "Duty of Care & Compliance",
    title: data.standardsH2,
    description: data.standardsIntro.join("\n\n"),
    bullets: data.standardsItems.map((si) =>
      si.title ? `**${si.title}:** ${si.text}` : si.text
    ),
    subsections: data.standardsNote
      ? [
          {
            title: "Operations Desk Note & Direct Line",
            description: `${data.standardsNote}${
              data.standardsPhone
                ? ` | Central Operations Contact: ${data.standardsPhone}`
                : ""
            }`,
          },
        ]
      : undefined,
  });

  // 10. Frequently Asked Questions
  if (data.faqs && data.faqs.length > 0) {
    sections.push({
      eyebrow: data.faqsEyebrow || "Frequently Asked Questions",
      title: data.faqsH2,
      faqs: data.faqs.map((f) => ({
        question: f.q,
        answer: f.a,
      })),
    });
  }

  // 11. Cross-Sector Industry Solutions
  if (data.others && data.others.length > 0) {
    sections.push({
      eyebrow: "Related Sectors",
      title: "Other Specialized Industry Solutions",
      description:
        "Explore additional sector-specific ground mobility programmes engineered by AB across the Gulf:",
      cards: data.others.map((o) => ({
        title: o.name,
        description: o.desc || "",
        actions: [{ label: `Explore ${o.name}`, href: o.href }],
      })),
    });
  }

  // 12. Program Initiation & Consultation
  sections.push({
    eyebrow: "Program Initiation",
    title: data.ctaH2 || `Coordinate ${data.badge} Transportation with AB`,
    description:
      "Connect directly with AB's sector logistics desk to review schedules, manifests, security clearances, and fleet allocations.",
    buttons: [
      { label: "Request a Proposal", href: "/contact" },
      { label: "Talk to a Planner", href: "/contact" },
      { label: "Central Dispatch", href: "tel:+966112345678" },
    ],
  });

  return sections;
}

// =========================================================================
// 7 NAVBAR DROPDOWN INDUSTRIES (Ordered as in Header Navbar)
// =========================================================================
const navIndustriesOrder = [
  {
    fileName: "02-Events-and-Exhibitions",
    slug: "events-exhibitions",
    navLabel: dictEnUs.header.dropdowns.industriesMenu.eventsExhibitions,
    url: "https://www.ab.limo/industries/events-exhibitions",
  },
  {
    fileName: "03-Government-and-Diplomatic",
    slug: "government-diplomatic",
    navLabel: dictEnUs.header.dropdowns.industriesMenu.governmentDiplomatic,
    url: "https://www.ab.limo/industries/government-diplomatic",
  },
  {
    fileName: "04-Aviation-and-FBO",
    slug: "aviation",
    navLabel: dictEnUs.header.dropdowns.industriesMenu.aviationFbo,
    url: "https://www.ab.limo/industries/aviation",
  },
  {
    fileName: "05-Energy-and-Giga-Projects",
    slug: "energy-giga-projects",
    navLabel: dictEnUs.header.dropdowns.industriesMenu.energyGigaProjects,
    url: "https://www.ab.limo/industries/energy-giga-projects",
  },
  {
    fileName: "06-Hospitality",
    slug: "hospitality",
    navLabel: dictEnUs.header.dropdowns.industriesMenu.hospitality,
    url: "https://www.ab.limo/industries/hospitality",
  },
  {
    fileName: "07-Sports-and-Entertainment",
    slug: "sports-entertainment",
    navLabel: dictEnUs.header.dropdowns.industriesMenu.sportsEntertainment,
    url: "https://www.ab.limo/industries/sports-entertainment",
  },
  {
    fileName: "08-Corporate-and-Enterprise",
    slug: "corporate-enterprise",
    navLabel: dictEnUs.header.dropdowns.industriesMenu.corporateEnterprise,
    url: "https://www.ab.limo/industries/corporate-enterprise",
  },
];

for (const item of navIndustriesOrder) {
  const detail = INDUSTRY_DETAILS[item.slug];
  if (!detail) {
    console.error(`Missing detail for slug: ${item.slug}`);
    continue;
  }

  allIndustryPages.push({
    fileName: item.fileName,
    title: `AB Transportation — ${detail.badge}`,
    subtitle: detail.h1,
    url: item.url,
    description: detail.heroP,
    sections: buildIndustryDetailSections(detail),
  });
}

// =========================================================================
// BUILD AND SAVE ALL DOCUMENTS (.docx & .md)
// =========================================================================
async function generateAll() {
  console.log(`Generating Word (.docx) and Markdown (.md) documents for ${allIndustryPages.length} industry pages...`);

  for (const page of allIndustryPages) {
    const mdContent = pageToMarkdown(page);
    const mdPath = path.join(OUT_DIR, `${page.fileName}.md`);
    fs.writeFileSync(mdPath, mdContent, "utf8");

    const docxObj = pageToDocx(page);
    const docxBuf = await Packer.toBuffer(docxObj);
    const docxPath = path.join(OUT_DIR, `${page.fileName}.docx`);
    fs.writeFileSync(docxPath, docxBuf);

    console.log(`✓ Generated: ${page.fileName}.docx & .md (${page.sections.length} sections)`);
  }

  // Generate README.md
  let readme = `# AB Transportation — Industry Content Documents

Comprehensive repository of official website content for the **Industries Hub** and all **7 Navbar Industry Verticals** on [AB.Limo](https://www.ab.limo).

All documents are provided in **Microsoft Word (\`.docx\`)** and **Markdown (\`.md\`)** formats with complete, section-by-section fidelity including:
- Page Titles, Eyebrow Badges, Headings, Subheadings
- Hero Overviews, Lead Paragraphs, and Stat Strips
- Operational Challenges, Delivery Frameworks, and Operating Stages
- Tailored Service Offerings, Fleet Specifications, and Regional Coverage
- Proven Case Studies, Duty of Care Protocols, and Detailed FAQs
- All Action Buttons, Navigation Links, and Dispatch Telephone Numbers

---

## Live Site Industry URLs & Document Index

| # | Industry Vertical | Navbar Dropdown Label | Live Site URL | Word Document | Markdown File | Sections |
|---|-------------------|-----------------------|---------------|---------------|---------------|----------|
| 1 | **Industries Hub** | *Main Nav Link* | [ab.limo/industries](https://www.ab.limo/industries) | [\`01-Main-Industries-Page.docx\`](./01-Main-Industries-Page.docx) | [\`01-Main-Industries-Page.md\`](./01-Main-Industries-Page.md) | 6 |
| 2 | **Events & Exhibitions** | Events & exhibitions | [ab.limo/industries/events-exhibitions](https://www.ab.limo/industries/events-exhibitions) | [\`02-Events-and-Exhibitions.docx\`](./02-Events-and-Exhibitions.docx) | [\`02-Events-and-Exhibitions.md\`](./02-Events-and-Exhibitions.md) | 12 |
| 3 | **Government & Diplomatic** | Government & diplomatic | [ab.limo/industries/government-diplomatic](https://www.ab.limo/industries/government-diplomatic) | [\`03-Government-and-Diplomatic.docx\`](./03-Government-and-Diplomatic.docx) | [\`03-Government-and-Diplomatic.md\`](./03-Government-and-Diplomatic.md) | 12 |
| 4 | **Aviation & FBO** | Aviation & FBO | [ab.limo/industries/aviation](https://www.ab.limo/industries/aviation) | [\`04-Aviation-and-FBO.docx\`](./04-Aviation-and-FBO.docx) | [\`04-Aviation-and-FBO.md\`](./04-Aviation-and-FBO.md) | 12 |
| 5 | **Energy & Giga-Projects** | Energy & giga-projects | [ab.limo/industries/energy-giga-projects](https://www.ab.limo/industries/energy-giga-projects) | [\`05-Energy-and-Giga-Projects.docx\`](./05-Energy-and-Giga-Projects.docx) | [\`05-Energy-and-Giga-Projects.md\`](./05-Energy-and-Giga-Projects.md) | 12 |
| 6 | **Hospitality** | Hospitality | [ab.limo/industries/hospitality](https://www.ab.limo/industries/hospitality) | [\`06-Hospitality.docx\`](./06-Hospitality.docx) | [\`06-Hospitality.md\`](./06-Hospitality.md) | 12 |
| 7 | **Sports & Entertainment** | Sports & entertainment | [ab.limo/industries/sports-entertainment](https://www.ab.limo/industries/sports-entertainment) | [\`07-Sports-and-Entertainment.docx\`](./07-Sports-and-Entertainment.docx) | [\`07-Sports-and-Entertainment.md\`](./07-Sports-and-Entertainment.md) | 12 |
| 8 | **Corporate & Enterprise** | Corporate & enterprise | [ab.limo/industries/corporate-enterprise](https://www.ab.limo/industries/corporate-enterprise) | [\`08-Corporate-and-Enterprise.docx\`](./08-Corporate-and-Enterprise.docx) | [\`08-Corporate-and-Enterprise.md\`](./08-Corporate-and-Enterprise.md) | 12 |

---

## Content Integrity & Sourcing

- **English Dictionaries**: Aligned with \`src/app/[lang]/dictionaries/en-US.json\` and \`en-GB.json\`.
- **Navigation Configuration**: Strictly verified against \`src/lib/headerNav.ts\`, \`src/components/layout/DesktopNav.tsx\`, and \`src/components/layout/NavDropdown.tsx\`.
- **Page Layout & Section Engine**: Exact match for \`src/app/[lang]/industries/page.tsx\` and \`src/app/[lang]/industries/_components/IndustryDetailClient.tsx\`.
`;

  fs.writeFileSync(path.join(OUT_DIR, "README.md"), readme, "utf8");
  console.log("✓ Generated: README.md with live URLs and document index table.");
  console.log("All industry content documents created successfully!");
}

generateAll().catch((err) => {
  console.error("Error generating industry documents:", err);
  process.exit(1);
});

