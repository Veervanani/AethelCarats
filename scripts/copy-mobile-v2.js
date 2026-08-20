import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const brainDir = 'C:\\Users\\veerv\\.gemini\\antigravity\\brain\\66440bd7-aafd-4408-8c9a-1d94667c7dfa';
const targets = [
  path.join(__dirname, '..', 'frontend', 'public', 'assets'),
  path.join(__dirname, '..', 'public_html', 'assets'),
  path.join(__dirname, '..', 'assets')
];

const mobileMap = {
  'engagement_ring_mobile_1787174313013.jpg': ['Engagement Ring Mobile.png', 'Engagement Ring Mobile_v2.png'],
  'necklace_mobile_1787174326880.jpg': ['Necklace Mobile.png', 'Necklace Mobile_v2.png'],
  'earrings_mobile_1787174344111.jpg': ['Earrings Mobile.png', 'Earrings Mobile_v2.png'],
  'bracelet_mobile_1787174583701.jpg': ['Bracelet Mobile.png', 'Bracelet Mobile_v2.png']
};

targets.forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

for (const [src, destNames] of Object.entries(mobileMap)) {
  const srcPath = path.join(brainDir, src);
  if (fs.existsSync(srcPath)) {
    destNames.forEach(destName => {
      targets.forEach(dir => {
        const destPath = path.join(dir, destName);
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${src} -> ${destPath}`);
      });
    });
  } else {
    console.error(`Source missing: ${srcPath}`);
  }
}
console.log('Successfully copied all 4 mobile hero images (v1 and v2)!');
