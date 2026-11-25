import fs from "fs";
import path from "path";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType,
} from "docx";

// Helpers
function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<br\s*[\/]?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

interface DocContentSection {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  bullets?: string[];
  cards?: Array<{
    title: string;
    subtitle?: string;
    description: string;
    bullets?: string[];
    actions?: Array<{ label: string; href?: string }>;
  }>;
  items?: Array<{
    heading: string;
    description: string;
    icon?: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  buttons?: Array<{
    label: string;
    href?: string;
    style?: string;
  }>;
  stats?: Array<{
    value: string;
    label: string;
  }>;
  subsections?: Array<{
    title: string;
    description?: string;
    bullets?: string[];
  }>;
}

interface PageData {
  fileName: string;
  title: string;
  subtitle: string;
  url: string;
  description: string;
  sections: DocContentSection[];
}

// Convert PageData to Markdown
function pageToMarkdown(page: PageData): string {
  let md = `# ${page.title}\n\n`;
  if (page.subtitle) md += `**${page.subtitle}**\n\n`;
  md += `> **Page URL:** \`${page.url}\`\n`;
  if (page.description) md += `> **Meta Description:** ${page.description}\n`;
  md += `\n---\n\n`;

  page.sections.forEach((sec, sIdx) => {
    md += `## Section ${sIdx + 1}: ${sec.title}\n\n`;
    if (sec.eyebrow) md += `*Eyebrow Badge:* \`${sec.eyebrow}\`\n\n`;
    if (sec.subtitle) md += `### ${sec.subtitle}\n\n`;
    if (sec.description) md += `${sec.description}\n\n`;

    if (sec.buttons && sec.buttons.length > 0) {
      md += `**Buttons / Actions:**\n`;
      sec.buttons.forEach((btn) => {
        md += `- [BUTTON] "${btn.label}" → \`${btn.href || "#"}\`\n`;
      });
      md += `\n`;
    }

    if (sec.stats && sec.stats.length > 0) {
      md += `**Key Metrics / Highlights:**\n`;
      sec.stats.forEach((st) => {
        md += `- **${st.value}** — ${st.label}\n`;
      });
      md += `\n`;
    }

    if (sec.bullets && sec.bullets.length > 0) {
      sec.bullets.forEach((b) => {
        md += `- ${b}\n`;
      });
      md += `\n`;
    }

    if (sec.items && sec.items.length > 0) {
      sec.items.forEach((item, iIdx) => {
        md += `#### ${iIdx + 1}. ${item.heading}\n`;
        if (item.description) md += `${item.description}\n\n`;
      });
    }

    if (sec.cards && sec.cards.length > 0) {
      md += `### Cards / Service Tiers:\n\n`;
      sec.cards.forEach((c, cIdx) => {
        md += `#### ${c.title}\n`;
        if (c.subtitle) md += `*${c.subtitle}*\n\n`;
        if (c.description) md += `${c.description}\n\n`;
        if (c.bullets && c.bullets.length > 0) {
          c.bullets.forEach((cb) => {
            md += `  - ${cb}\n`;
          });
          md += `\n`;
        }
        if (c.actions && c.actions.length > 0) {
          c.actions.forEach((act) => {
            md += `  - [ACTION] "${act.label}" → \`${act.href || "#"}\`\n`;
          });
          md += `\n`;
        }
      });
    }

    if (sec.subsections && sec.subsections.length > 0) {
      sec.subsections.forEach((sub) => {
        md += `### ${sub.title}\n\n`;
        if (sub.description) md += `${sub.description}\n\n`;
        if (sub.bullets && sub.bullets.length > 0) {
          sub.bullets.forEach((sb) => {
            md += `- ${sb}\n`;
          });
          md += `\n`;
        }
      });
    }

    if (sec.faqs && sec.faqs.length > 0) {
      md += `### Frequently Asked Questions:\n\n`;
      sec.faqs.forEach((faq, fIdx) => {
        md += `**Q${fIdx + 1}: ${faq.question}**\n\n`;
        md += `A: ${faq.answer}\n\n`;
      });
    }

    md += `---\n\n`;
  });

  return md;
}

// Convert PageData to Word DOCX Document
function pageToDocx(page: PageData): Document {
  const children: Paragraph[] = [];

  // Document Header / Title
  children.push(
    new Paragraph({
      text: page.title,
      heading: HeadingLevel.TITLE,
      spacing: { before: 0, after: 120 },
    })
  );

  if (page.subtitle) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: page.subtitle,
            bold: true,
            size: 26, // 13pt
            color: "259FCF",
          }),
        ],
        spacing: { before: 60, after: 180 },
      })
    );
  }

  // Meta Box
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: "Page URL: ", bold: true, size: 20 }),
        new TextRun({ text: page.url, size: 20, font: "Consolas", color: "4A5568" }),
      ],
      spacing: { before: 60, after: 60 },
    })
  );

  if (page.description) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: "Meta Description: ", bold: true, size: 20 }),
          new TextRun({ text: page.description, size: 20, italics: true, color: "718096" }),
        ],
        spacing: { before: 0, after: 240 },
      })
    );
  }

  // Divider
  children.push(
    new Paragraph({
      children: [new TextRun({ text: "_________________________________________________________________________________", color: "CBD5E0", size: 16 })],
      spacing: { before: 60, after: 240 },
    })
  );

  // Sections
  page.sections.forEach((sec, sIdx) => {
    // Section Eyebrow
    if (sec.eyebrow) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `[ ${sec.eyebrow.toUpperCase()} ]`,
              bold: true,
              size: 18,
              color: "259FCF",
            }),
          ],
          spacing: { before: 240, after: 60 },
        })
      );
    }

    // Section Title (H1 / H2)
    children.push(
      new Paragraph({
        text: `Section ${sIdx + 1}: ${sec.title}`,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: sec.eyebrow ? 60 : 240, after: 120 },
      })
    );

    // Section Subtitle
    if (sec.subtitle) {
      children.push(
        new Paragraph({
          text: sec.subtitle,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 60, after: 120 },
        })
      );
    }

    // Section Description
    if (sec.description) {
      const paras = sec.description.split("\n\n");
      paras.forEach((pText) => {
        if (!pText.trim()) return;
        children.push(
          new Paragraph({
            children: [new TextRun({ text: pText.trim(), size: 22 })],
            spacing: { before: 60, after: 100 },
          })
        );
      });
    }

    // Buttons
    if (sec.buttons && sec.buttons.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: "Interactive Actions / Buttons:", bold: true, size: 20, color: "2B6CB0" }),
          ],
          spacing: { before: 100, after: 60 },
        })
      );
      sec.buttons.forEach((btn) => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: "  [BUTTON] ", bold: true, color: "259FCF", size: 20 }),
              new TextRun({ text: `"${btn.label}"`, bold: true, size: 20 }),
              new TextRun({ text: `  -> Destination URL: ${btn.href || "#"}`, italics: true, color: "4A5568", size: 18 }),
            ],
            spacing: { before: 30, after: 40 },
          })
        );
      });
    }

    // Key Stats
    if (sec.stats && sec.stats.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: "Operational Metrics / Stats:", bold: true, size: 20, color: "2B6CB0" }),
          ],
          spacing: { before: 120, after: 60 },
        })
      );
      sec.stats.forEach((st) => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: `* ${st.value}`, bold: true, color: "259FCF", size: 22 }),
              new TextRun({ text: ` — ${st.label}`, size: 22 }),
            ],
            spacing: { before: 30, after: 40 },
          })
        );
      });
    }

    // Bullets
    if (sec.bullets && sec.bullets.length > 0) {
      sec.bullets.forEach((b) => {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: b, size: 22 })],
            bullet: { level: 0 },
            spacing: { before: 30, after: 40 },
          })
        );
      });
    }

    // Items
    if (sec.items && sec.items.length > 0) {
      sec.items.forEach((item, iIdx) => {
        children.push(
          new Paragraph({
            text: `${iIdx + 1}. ${item.heading}`,
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 120, after: 40 },
          })
        );
        if (item.description) {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: item.description, size: 22 })],
              spacing: { before: 20, after: 80 },
            })
          );
        }
      });
    }

    // Cards
    if (sec.cards && sec.cards.length > 0) {
      children.push(
        new Paragraph({
          text: "Service Cards / Tiers:",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 140, after: 80 },
        })
      );
      sec.cards.forEach((c) => {
        children.push(
          new Paragraph({
            text: c.title,
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 100, after: 40 },
          })
        );
        if (c.subtitle) {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: c.subtitle, italics: true, color: "259FCF", size: 20 })],
              spacing: { before: 0, after: 60 },
            })
          );
        }
        if (c.description) {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: c.description, size: 22 })],
              spacing: { before: 20, after: 60 },
            })
          );
        }
        if (c.bullets && c.bullets.length > 0) {
          c.bullets.forEach((cb) => {
            children.push(
              new Paragraph({
                children: [new TextRun({ text: cb, size: 20 })],
                bullet: { level: 1 },
                spacing: { before: 20, after: 20 },
              })
            );
          });
        }
        if (c.actions && c.actions.length > 0) {
          c.actions.forEach((act) => {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({ text: "  [ACTION] ", bold: true, color: "259FCF", size: 18 }),
                  new TextRun({ text: `"${act.label}"`, bold: true, size: 18 }),
                  new TextRun({ text: ` -> ${act.href || "#"}`, italics: true, color: "4A5568", size: 18 }),
                ],
                spacing: { before: 20, after: 20 },
              })
            );
          });
        }
      });
    }

    // Subsections
    if (sec.subsections && sec.subsections.length > 0) {
      sec.subsections.forEach((sub) => {
        children.push(
          new Paragraph({
            text: sub.title,
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 120, after: 60 },
          })
        );
        if (sub.description) {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: sub.description, size: 22 })],
              spacing: { before: 20, after: 60 },
            })
          );
        }
        if (sub.bullets && sub.bullets.length > 0) {
          sub.bullets.forEach((sb) => {
            children.push(
              new Paragraph({
                children: [new TextRun({ text: sb, size: 22 })],
                bullet: { level: 0 },
                spacing: { before: 20, after: 20 },
              })
            );
          });
        }
      });
    }

    // FAQs
    if (sec.faqs && sec.faqs.length > 0) {
      children.push(
        new Paragraph({
          text: "Frequently Asked Questions:",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 160, after: 80 },
        })
      );
      sec.faqs.forEach((faq, fIdx) => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: `Q${fIdx + 1}: `, bold: true, color: "259FCF", size: 22 }),
              new TextRun({ text: faq.question, bold: true, size: 22 }),
            ],
            spacing: { before: 100, after: 40 },
          })
        );
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: "A: ", bold: true, color: "4A5568", size: 22 }),
              new TextRun({ text: faq.answer, size: 22 }),
            ],
            spacing: { before: 20, after: 100 },
          })
        );
      });
    }

    // Divider between sections
    children.push(
      new Paragraph({
        children: [new TextRun({ text: "---------------------------------------------------------------------------------", color: "E2E8F0", size: 14 })],
        spacing: { before: 160, after: 200 },
      })
    );
  });

  return new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });
}

export { pageToMarkdown, pageToDocx, stripHtml, type PageData, type DocContentSection };

