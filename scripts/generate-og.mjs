import { mkdir, readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const source = new URL('../public/images/articles/', import.meta.url);
const output = new URL('../public/images/og/', import.meta.url);
await mkdir(output, { recursive: true });

const files = (await readdir(source)).filter((file) => file.endsWith('.svg'));

for (const file of files) {
  const slug = file.slice(0, -4);
  const svg = await readFile(new URL(file, source));
  await sharp(svg)
    .resize(1200, 630, { fit: 'cover' })
    .png()
    .toFile(`${fileURLToPath(output)}${slug}.png`);
}

console.log(`Generated ${files.length} Open Graph images in public/images/og/`);
