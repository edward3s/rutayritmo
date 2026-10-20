import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const source = new URL('../public/images/articles/', import.meta.url);
const coverOutput = new URL('../public/images/articles/en/', import.meta.url);
const ogOutput = new URL('../public/images/og/en/', import.meta.url);
await mkdir(coverOutput, { recursive: true });
await mkdir(ogOutput, { recursive: true });

const labels = {
  'COMIDA PREVIA': 'PRE-RUN MEAL',
  RODILLA: 'KNEE',
  RECUPERACIÓN: 'RECOVERY',
  'DROP Y APOYO': 'DROP AND SUPPORT',
  'PRIMEROS KILÓMETROS': 'FIRST KILOMETERS',
  MOVILIDAD: 'MOBILITY',
  'PIE Y CARGA': 'FOOT AND LOAD',
  HIDRATACIÓN: 'HYDRATION',
  '42 KILÓMETROS': '42 KILOMETERS',
  '21 KILÓMETROS': '21 KILOMETERS',
  'DATOS ÚTILES': 'USEFUL DATA',
  SERIES: 'INTERVALS',
  UMBRAL: 'THRESHOLD',
  DESGASTE: 'WEAR',
  'ZONA AERÓBICA': 'AEROBIC ZONE',
};

const categories = {
  ENTRENAMIENTO: 'TRAINING',
  MATERIAL: 'GEAR',
  NUTRICIÓN: 'NUTRITION',
  SALUD: 'HEALTH',
  CARRERAS: 'RACES',
};

const titleLabels = {
  'Comida previa': 'Pre-run meal',
  Rodilla: 'Knee',
  Recuperación: 'Recovery',
  'Drop y apoyo': 'Drop and support',
  'Primeros kilómetros': 'First kilometers',
  Movilidad: 'Mobility',
  'Pie y carga': 'Foot and load',
  Hidratación: 'Hydration',
  '42 kilómetros': '42 kilometers',
  '21 kilómetros': '21 kilometers',
  'Datos útiles': 'Useful data',
  Series: 'Intervals',
  Umbral: 'Threshold',
  Desgaste: 'Wear',
  'Zona aeróbica': 'Aerobic zone',
};

const files = (await readdir(source)).filter((file) => file.endsWith('.svg'));

for (const file of files) {
  const slug = file.slice(0, -4);
  let svg = await readFile(new URL(file, source), 'utf8');

  for (const [from, to] of Object.entries(labels)) {
    svg = svg.replaceAll(`>${from}<`, `>${to}<`);
  }
  for (const [from, to] of Object.entries(categories)) {
    svg = svg.replaceAll(`>${from}<`, `>${to}<`);
  }

  const titleMatch = svg.match(/<title>(.*?) — Ruta y Ritmo<\/title>/);
  const spanishTitle = titleMatch?.[1] ?? '';
  const englishTitle = titleLabels[spanishTitle] ?? spanishTitle;
  svg = svg.replace(
    /<title>.*?<\/title>/,
    `<title>${englishTitle} — Ruta y Ritmo</title>`,
  );
  svg = svg.replace(
    /<desc>.*?<\/desc>/,
    `<desc>Editorial vector illustration about ${englishTitle.toLowerCase()} in running.</desc>`,
  );

  await writeFile(new URL(file, coverOutput), svg);
  await sharp(Buffer.from(svg))
    .resize(1200, 630, { fit: 'cover' })
    .png()
    .toFile(`${fileURLToPath(ogOutput)}${slug}.png`);
}

console.log(`Generated ${files.length} English covers and Open Graph images.`);
