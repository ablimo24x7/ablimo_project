const fs = require('fs');
const formatted = require('./formatted_industries.json');

const code = `export interface IndustryStripItem {
  v: string;
  l: string;
}

export interface IndustryNeedItem {
  num: string;
  t: string;
  x: string;
}

export interface IndustryStepItem {
  num: string;
  t: string;
  x: string;
}

export interface IndustryCaseStat {
  v: string;
  l: string;
}

export interface IndustryCase {
  sector: string;
  years: string;
  place: string;
  title: string;
  stats: IndustryCaseStat[];
}

export interface IndustryLink {
  name: string;
  href: string;
}

export interface IndustryFaq {
  q: string;
  a: string;
}

export interface IndustryDetailData {
  slug: string;
  title: string;
  badge: string;
  h1: string;
  heroP: string;
  heroImage: string;
  heroImagePos: string;
  strip: IndustryStripItem[];
  statementEyebrow: string;
  statement: string;
  needsEyebrow: string;
  needsH2: string;
  needs: IndustryNeedItem[];
  stepsEyebrow: string;
  stepsH2: string;
  steps: IndustryStepItem[];
  cases: IndustryCase[];
  services: IndustryLink[];
  vehicles: string[];
  faqs: IndustryFaq[];
  others: IndustryLink[];
  ctaH2: string;
  ctaP: string;
}

export const INDUSTRY_DETAILS: Record<string, IndustryDetailData> = ${JSON.stringify(formatted, null, 2)};

export function getIndustryData(slug: string): IndustryDetailData | undefined {
  return INDUSTRY_DETAILS[slug];
}

export function getAllIndustrySlugs(): string[] {
  return Object.keys(INDUSTRY_DETAILS);
}
`;

fs.writeFileSync('src/app/[lang]/industries/_components/industry-detail-data.ts', code);
console.log('Successfully written industry-detail-data.ts');
