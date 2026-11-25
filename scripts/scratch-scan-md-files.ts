import * as fs from "fs";
import * as path from "path";

const dir = path.resolve(process.cwd(), "services-pages-md");
const files = fs.readdirSync(dir).filter(f => f.endsWith(".md"));

for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), "utf-8");
  const lines = content.split("\n");
  const h1 = lines.find(l => l.startsWith("# ")) || "";
  const images = [...content.matchAll(/!\[(.*?)\]\((.*?)\)/g)].map(m => ({ alt: m[1], src: m[2] }));
  console.log(`\n========================================`);
  console.log(`FILE: ${f}`);
  console.log(`H1: ${h1}`);
  console.log(`Images count: ${images.length}`);
  images.forEach(img => console.log(`  - [${img.alt}] -> ${img.src}`));
}
