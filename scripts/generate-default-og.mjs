import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const output = new URL('../public/', import.meta.url);
await mkdir(output, { recursive: true });

const colors = {
  paper: '#E8EDF0',
  paperDeep: '#D7E0E5',
  ink: '#0E1A20',
  petrol: '#123F52',
  orange: '#F05A28',
  muted: '#51656D',
};

function ticket(issue, lang) {
  return `<g transform="translate(842 138) rotate(3)">
    <rect x="0" y="0" width="286" height="356" rx="2" fill="#F7FAFB" stroke="${colors.ink}" stroke-width="3"/>
    <circle cx="22" cy="20" r="6" fill="${colors.paperDeep}"/>
    <circle cx="264" cy="20" r="6" fill="${colors.paperDeep}"/>
    <text x="143" y="82" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="19" letter-spacing="3" fill="${colors.muted}">${lang === 'en' ? 'RUNNING JOURNAL' : 'DIARIO DE RUNNING'}</text>
    <text x="143" y="232" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="150" font-weight="700" fill="${colors.ink}">042</text>
    <text x="143" y="278" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" letter-spacing="2" fill="${colors.ink}">RUTA Y RITMO</text>
    <line x1="28" y1="300" x2="258" y2="300" stroke="${colors.ink}" stroke-width="2"/>
    <text x="28" y="328" font-family="Arial, Helvetica, sans-serif" font-size="15" fill="${colors.muted}">${issue.split(' / ')[0]}</text>
    <text x="258" y="328" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="15" fill="${colors.muted}">${issue.split(' / ')[1]}</text>
    <g transform="translate(28 338)">
      ${Array.from({ length: 12 }, (_, i) => `<rect x="${i * 18}" y="0" width="${i % 3 === 0 ? 5 : 3}" height="14" fill="${colors.ink}"/>`).join('')}
    </g>
  </g>`;
}

function svg({ lang }) {
  const isEn = lang === 'en';
  const headline = isEn
    ? [
        { text: 'The asphalt', y: 226, size: 96 },
        { text: 'can be read,', y: 320, size: 96 },
        { text: 'too.', y: 414, size: 96 },
      ]
    : [
        { text: 'El asfalto', y: 226, size: 96 },
        { text: 'también se lee.', y: 320, size: 96 },
      ];
  const subtitle = isEn
    ? ['Routes, training and gear.', 'No miracle plans.']
    : ['Rutas, entrenamiento y material.', 'Sin planes milagro.'];

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${colors.paper}"/>
  <rect width="1200" height="84" fill="${colors.paperDeep}"/>
  <line x1="0" y1="84" x2="1200" y2="84" stroke="${colors.ink}" stroke-opacity=".22" stroke-width="2"/>
  <text x="64" y="54" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" letter-spacing="3" fill="${colors.ink}">RUTA Y RITMO</text>
  <text x="1136" y="53" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" letter-spacing="2" fill="${colors.petrol}">${isEn ? 'RUNNING JOURNAL' : 'DIARIO DE RUNNING'}</text>
  ${headline.map((line) => `<text x="64" y="${line.y}" font-family="Arial, Helvetica, sans-serif" font-size="${line.size}" font-weight="700" letter-spacing="-2" fill="${colors.ink}">${line.text}</text>`).join('\n  ')}
  ${subtitle.map((line, index) => `<text x="64" y="${isEn ? 480 + index * 38 : 390 + index * 40}" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="${colors.muted}">${line}</text>`).join('\n  ')}
  <rect x="64" y="546" width="16" height="16" fill="${colors.orange}"/>
  <text x="92" y="560" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="${colors.muted}">rutayritmo.site</text>
  <path d="M0 590c180-24 340 18 520 2 220-20 430-14 680 8v30H0Z" fill="${colors.paperDeep}"/>
  ${ticket(isEn ? 'No. 08 / Autumn 2026' : 'Nº 08 / Otoño 2026', lang)}
</svg>`;
}

await sharp(Buffer.from(svg({ lang: 'es' })))
  .png()
  .toFile(fileURLToPath(new URL('og-default.png', output)));
await sharp(Buffer.from(svg({ lang: 'en' })))
  .png()
  .toFile(fileURLToPath(new URL('og-default-en.png', output)));

console.log('Generated og-default.png and og-default-en.png');
