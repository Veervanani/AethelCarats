import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const frontendDist = path.resolve(rootDir, 'frontend/dist');
const publicHtmlDir = path.resolve(rootDir, 'public_html');

const hasFrontendDist = fs.existsSync(path.join(frontendDist, 'index.html'));
const hasPublicHtml = fs.existsSync(path.join(publicHtmlDir, 'index.html'));

if (!hasFrontendDist && !hasPublicHtml) {
  console.error(`❌ BUILD ERROR: Neither frontend/dist nor public_html contains index.html!`);
  process.exit(1);
}

const sourceDist = hasFrontendDist ? frontendDist : publicHtmlDir;
const targetIndexHtml = path.join(sourceDist, 'index.html');
console.log(`✅ VERIFIED BUILD: ${targetIndexHtml} verified successfully!`);

// Helper to copy directory recursively
function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Helper to clean directory before copying
function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch (e) {
      try {
        const entries = fs.readdirSync(dir);
        for (const entry of entries) {
          const curPath = path.join(dir, entry);
          fs.rmSync(curPath, { recursive: true, force: true });
        }
      } catch (err) {}
    }
  }
}

// Helper to prune obsolete JS and CSS chunks while preserving active bundles and static media
function pruneObsoleteAssets(dir, activeSet) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir);
  let pruned = 0;
  for (const entry of entries) {
    const isChunk = entry.endsWith('.js') || entry.endsWith('.js.map') || entry.endsWith('.css') || entry.endsWith('.css.map');
    if (isChunk && !activeSet.has(entry)) {
      try {
        fs.unlinkSync(path.join(dir, entry));
        pruned++;
      } catch (e) {}
    }
  }
  if (pruned > 0) {
    console.log(`🧹 Pruned ${pruned} obsolete build chunks from ${dir}`);
  }
}

const rootAssetsDir = path.resolve(rootDir, 'assets');
const rootDistDir = path.resolve(rootDir, 'dist');
const rootPublicHtmlDir = path.resolve(rootDir, 'public_html');
const frontendAssetsDir = path.resolve(frontendDist, 'assets');

try {
  // Prune obsolete JS/CSS chunks from target directories before copying fresh build
  const activeAssets = fs.existsSync(frontendAssetsDir)
    ? new Set(fs.readdirSync(frontendAssetsDir))
    : new Set();

  pruneObsoleteAssets(rootAssetsDir, activeAssets);
  pruneObsoleteAssets(path.join(rootDistDir, 'assets'), activeAssets);
  pruneObsoleteAssets(path.join(rootPublicHtmlDir, 'assets'), activeAssets);

  // 1. Copy frontend/dist contents to dist and public_html if fresh build was done
  if (fs.existsSync(frontendDist)) {
    copyDirRecursive(frontendDist, rootDistDir);
    copyDirRecursive(frontendDist, rootPublicHtmlDir);
  }

  // 3. Copy root api/ directory to dist/api and public_html/api
  const rootApiDir = path.resolve(rootDir, 'api');
  if (fs.existsSync(rootApiDir)) {
    copyDirRecursive(rootApiDir, path.resolve(rootDistDir, 'api'));
    copyDirRecursive(rootApiDir, path.resolve(rootPublicHtmlDir, 'api'));
  }

  // 4. Copy frontend/dist/assets directly to root assets/ so /assets/*.js resolution works 100%
  if (fs.existsSync(frontendAssetsDir)) {
    copyDirRecursive(frontendAssetsDir, rootAssetsDir);
  }

  // 5. Ensure .htaccess with API rewrite rules exists in root, dist/, and public_html/
  const htaccessContent = `<IfModule mod_mime.c>
  AddType application/javascript .js .mjs
  AddType text/css .css
</IfModule>

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Direct pass-through for existing physical files
  RewriteCond %{REQUEST_FILENAME} -f
  RewriteRule ^ - [L]

  # Route all API requests to PHP Front Controller
  RewriteRule ^api/v1/(.*)$ /api/index.php [QSA,L]
  RewriteRule ^api/(.*)$ /api/index.php [QSA,L]

  # Do NOT fallback to index.html for missing static assets in /assets/ or JS/CSS extensions
  RewriteCond %{REQUEST_URI} ^/assets/ [OR]
  RewriteCond %{REQUEST_URI} \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteRule ^ - [R=404,L]

  # Serve static files & SPA fallback
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\\.(html|htm)$">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
    Header set Expires 0
  </FilesMatch>
  <FilesMatch "\\.(js|css)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>
`;

  fs.writeFileSync(path.resolve(rootDir, '.htaccess'), htaccessContent, 'utf8');
  fs.writeFileSync(path.resolve(rootDistDir, '.htaccess'), htaccessContent, 'utf8');
  fs.writeFileSync(path.resolve(rootPublicHtmlDir, '.htaccess'), htaccessContent, 'utf8');

  // 6. Copy root index.html and root public files to root directory
  const rootIndexHtml = path.resolve(rootDir, 'index.html');
  fs.copyFileSync(targetIndexHtml, rootIndexHtml);

  const entriesInDist = fs.readdirSync(frontendDist, { withFileTypes: true });
  for (const entry of entriesInDist) {
    if (!entry.isDirectory()) {
      fs.copyFileSync(path.join(frontendDist, entry.name), path.resolve(rootDir, entry.name));
    }
  }

  console.log('✅ SYNCED BUILD ASSETS & API PERFECTLY: JS/CSS bundles and PHP API synced to /dist/, /public_html/, and .htaccess updated!');
} catch (err) {
  console.error('⚠️ Warning syncing build assets:', err);
}
