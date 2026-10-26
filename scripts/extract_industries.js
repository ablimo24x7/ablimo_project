const fs = require('fs');
const path = require('path');

const base = 'industories_details-pages';
const files = [
  { slug: 'aviation', dir: 'Aviation industry page-html', file: 'IndAviation.dc.html' },
  { slug: 'corporate-enterprise', dir: 'Corporate industry page-html', file: 'IndCorporate.dc.html' },
  { slug: 'energy', dir: 'Energy industry page-html', file: 'IndEnergy.dc.html' },
  { slug: 'events', dir: 'Events industry page-html', file: 'IndEvents.dc.html' },
  { slug: 'government-diplomatic', dir: 'Government industry page-html', file: 'IndGovernment.dc.html' },
  { slug: 'hospitality', dir: 'Hospitality industry page-html', file: 'IndHospitality.dc.html' },
  { slug: 'sports', dir: 'Sports industry page-html', file: 'IndSports.dc.html' },
];

const results = {};

files.forEach(({ slug, dir, file }) => {
  const content = fs.readFileSync(path.join(base, dir, file), 'utf8');
  
  // Extract Title
  const titleM = content.match(/<title>([^<]+)<\/title>/);
  const title = titleM ? titleM[1] : '';

  // Extract Hero section
  const h1M = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const heroPM = content.match(/<h1[\s\S]*?<\/h1>\s*<p[^>]*>([\s\S]*?)<\/p>/);

  // Extract badge (inside hero)
  const heroArea = content.substring(content.indexOf('<!-- Hero -->'), content.indexOf('<!-- Statement -->'));
  const badgeM = heroArea.match(/<span style="[^"]*border-radius:\s*999px[^"]*">([\s\S]*?)<\/span>/);
  let badge = '';
  if (badgeM) {
    badge = badgeM[1].replace(/<[^>]+>/g, '').trim();
  }

  // Extract Statement section
  const stmtEyebrowM = content.match(/<!-- Statement -->[\s\S]*?<p style="[^"]*letter-spacing:[^"]*">([\s\S]*?)<\/p>\s*<p[^>]*>([\s\S]*?)<\/p>/);

  // Extract Needs H2 & eyebrow
  const needsArea = content.substring(content.indexOf('<!-- Needs -->'), content.indexOf('<!-- Steps -->'));
  const needsEyebrowM = needsArea.match(/<p style="[^"]*letter-spacing:[^"]*">([\s\S]*?)<\/p>/);
  const needsH2M = needsArea.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);

  // Extract Steps H2 & eyebrow
  const stepsArea = content.substring(content.indexOf('<!-- Steps -->'), content.indexOf('<!-- Proof -->') !== -1 ? content.indexOf('<!-- Proof -->') : content.indexOf('<!-- Services and vehicles -->'));
  const stepsEyebrowM = stepsArea.match(/<p style="[^"]*letter-spacing:[^"]*">([\s\S]*?)<\/p>/);
  const stepsH2M = stepsArea.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);

  // Extract Closing CTA H2 & P
  const ctaH2M = content.match(/<!-- Closing call to action -->[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>/);
  const ctaPM = content.match(/<!-- Closing call to action -->[\s\S]*?<h2[\s\S]*?<\/h2>\s*<p[^>]*>([\s\S]*?)<\/p>/);

  // Extract D object
  const dM = content.match(/const D = (\{.+?\});/);
  const D = dM ? JSON.parse(dM[1]) : {};

  results[slug] = {
    title,
    badge,
    h1: h1M ? h1M[1].replace(/<[^>]+>/g, '').trim() : '',
    heroP: heroPM ? heroPM[1].trim() : '',
    statementEyebrow: stmtEyebrowM ? stmtEyebrowM[1].trim() : '',
    statement: stmtEyebrowM ? stmtEyebrowM[2].trim() : '',
    needsEyebrow: needsEyebrowM ? needsEyebrowM[1].trim() : '',
    needsH2: needsH2M ? needsH2M[1].trim() : '',
    stepsEyebrow: stepsEyebrowM ? stepsEyebrowM[1].trim() : '',
    stepsH2: stepsH2M ? stepsH2M[1].trim() : '',
    ctaH2: ctaH2M ? ctaH2M[1].trim() : '',
    ctaP: ctaPM ? ctaPM[1].trim() : '',
    D
  };
});

fs.writeFileSync('scripts/extracted_industries.json', JSON.stringify(results, null, 2));
console.log('Successfully extracted all 7 industries into scripts/extracted_industries.json');
Object.keys(results).forEach(k => {
  console.log(k, '->', results[k].h1, '| badge:', results[k].badge);
});
