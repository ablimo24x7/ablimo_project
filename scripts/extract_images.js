const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('temp_sections.html', 'utf8');

// Ensure directories exist
fs.mkdirSync(path.join('public', 'case-studies'), { recursive: true });
fs.mkdirSync(path.join('public', 'awards'), { recursive: true });

// Extract images
// 1. Case studies
// MDL Beast
const mdlMatch = content.match(/<!-- 03 MDL Beast[\s\S]*?<img src="(data:image\/[^;]+;base64,[^"]+)"/);
if (mdlMatch) {
  saveBase64(mdlMatch[1], 'public/case-studies/mdl-beast.jpg');
}

// NEOM Trojena
const neomMatch = content.match(/<!-- 01 NEOM Trojena[\s\S]*?<img src="(data:image\/[^;]+;base64,[^"]+)"/);
if (neomMatch) {
  saveBase64(neomMatch[1], 'public/case-studies/neom-trojena.jpg');
}

// FIFA
const fifaMatch = content.match(/<!-- 04 FIFA[\s\S]*?<img src="(data:image\/[^;]+;base64,[^"]+)"/);
if (fifaMatch) {
  saveBase64(fifaMatch[1], 'public/case-studies/fifa-2022.jpg');
}

// ADIPEC
const adipecMatch = content.match(/<!-- 05 ADIPEC[\s\S]*?<img src="(data:image\/[^;]+;base64,[^"]+)"/);
if (adipecMatch) {
  saveBase64(adipecMatch[1], 'public/case-studies/adipec.jpg');
}

// Siemens
const siemensMatch = content.match(/<!-- 02 Siemens[\s\S]*?<img src="(data:image\/[^;]+;base64,[^"]+)"/);
if (siemensMatch) {
  saveBase64(siemensMatch[1], 'public/case-studies/siemens-energy.jpg');
}

// Azimuth
const azimuthMatch = content.match(/<!-- 06 Azimuth[\s\S]*?<img src="(data:image\/[^;]+;base64,[^"]+)"/);
if (azimuthMatch) {
  saveBase64(azimuthMatch[1], 'public/case-studies/azimuth.jpg');
}

// Roshn
const roshnMatch = content.match(/<!-- 07 Roshn[\s\S]*?<img src="(data:image\/[^;]+;base64,[^"]+)"/);
if (roshnMatch) {
  saveBase64(roshnMatch[1], 'public/case-studies/roshn.png');
}

// 2. Awards
// World Luxury Travel Awards
const wltaMatch = content.match(/data-caption="World Luxury Travel Awards — 2025 Winner[^"]*"[\s\S]*?<img src="(data:image\/[^;]+;base64,[^"]+)"/);
if (wltaMatch) {
  saveBase64(wltaMatch[1], 'public/awards/world-luxury-travel-awards-2025.jpg');
}

// Entrepreneur Gulf
const egMatch = content.match(/data-caption="Entrepreneur Gulf — Company of the Year 2025[^"]*"[\s\S]*?<img src="(data:image\/[^;]+;base64,[^"]+)"/);
if (egMatch) {
  saveBase64(egMatch[1], 'public/awards/entrepreneur-gulf-2025.jpg');
}

// Eventex Awards
const eventexMatch = content.match(/data-caption="Eventex Awards — Bronze[^"]*"[\s\S]*?<img src="(data:image\/[^;]+;base64,[^"]+)"/);
if (eventexMatch) {
  saveBase64(eventexMatch[1], 'public/awards/eventex-bronze-2025.jpg');
}

// Global Passenger Network
const gpnMatch = content.match(/data-caption="Global Passenger Network \(GPN\)[^"]*"[\s\S]*?<img src="(data:image\/[^;]+;base64,[^"]+)"/);
if (gpnMatch) {
  saveBase64(gpnMatch[1], 'public/awards/global-passenger-network.jpg');
}

// Award ceremony
const ceremonyMatch = content.match(/data-caption="World Luxury Travel Awards — award ceremony"[\s\S]*?<img src="(data:image\/[^;]+;base64,[^"]+)"/);
if (ceremonyMatch) {
  saveBase64(ceremonyMatch[1], 'public/awards/award-ceremony.jpg');
}

function saveBase64(dataUri, dest) {
  const parts = dataUri.split(',');
  const buffer = Buffer.from(parts[1], 'base64');
  fs.writeFileSync(dest, buffer);
  console.log('Saved', dest, buffer.length, 'bytes');
}
