const fs = require('fs');

const content = fs.readFileSync('temp_sections.html', 'utf8');

// Check structure
console.log('Total length:', content.length);

// Let's replace any huge base64 strings with [BASE64_IMAGE] to inspect the markup
const stripped = content.replace(/data:image\/[^;]+;base64,[^"'\s)]+/g, (match) => {
  return `[BASE64_IMAGE_${match.length}_BYTES]`;
});

console.log('Stripped length:', stripped.length);
fs.writeFileSync('temp_sections_stripped.html', stripped);

// Find headers and sections in stripped
const lines = stripped.split('\n');
console.log('Total lines in stripped:', lines.length);

// Print any section tags or comment lines
lines.forEach((line, idx) => {
  if (line.includes('<!--') || line.includes('<section') || line.includes('id="') || line.includes('<h2') || line.includes('<h3')) {
    console.log(`${idx + 1}: ${line.trim().substring(0, 120)}`);
  }
});
