import fs from "node:fs";
import path from "node:path";

const targets = [
  "data/site.json",
  "data/farms.json",
  "data/legacy-comments.json",
];

const bom = Buffer.from([0xef, 0xbb, 0xbf]);

for (const relativePath of targets) {
  const absolutePath = path.join(process.cwd(), relativePath);

  if (!fs.existsSync(absolutePath)) {
    continue;
  }

  const data = fs.readFileSync(absolutePath);
  const hasBom =
    data.length >= 3 && data.subarray(0, 3).equals(bom);

  if (hasBom) {
    fs.writeFileSync(absolutePath, data.subarray(3));
    console.log(`[strip-json-bom] removed BOM: ${relativePath}`);
  }
}
