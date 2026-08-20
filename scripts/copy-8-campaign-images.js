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

const imageMap = {
  'floksy_rings_cat_1787172802046.jpg': 'floksy_rings_cat.png',
  'floksy_solitaire_ring_perfect_1787172813462.jpg': 'floksy_solitaire_ring_perfect.png',
  'floksy_necklaces_cat_1787173048969.jpg': 'floksy_necklaces_cat.png',
  'floksy_high_jewellery_1787173176634.jpg': 'floksy_high_jewellery.png',
  'floksy_earrings_cat_1787173269281.jpg': 'floksy_earrings_cat.png',
  'floksy_editorial_banner_1787173474296.jpg': 'floksy_editorial_banner.png',
  'floksy_bracelets_cat_1787173501966.jpg': 'floksy_bracelets_cat.png',
  'floksy_cad_craftsmanship_1787173868626.jpg': 'floksy_cad_craftsmanship.png'
};

targets.forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

for (const [src, destName] of Object.entries(imageMap)) {
  const srcPath = path.join(brainDir, src);
  if (fs.existsSync(srcPath)) {
    targets.forEach(dir => {
      const destPath = path.join(dir, destName);
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${src} -> ${destPath}`);
    });
  } else {
    console.error(`Source missing: ${srcPath}`);
  }
}
console.log('Successfully copied all 8 luxury campaign images!');
