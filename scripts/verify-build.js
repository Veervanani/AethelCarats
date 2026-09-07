import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const frontendDist = path.resolve(rootDir, 'frontend/dist');
const targetIndexHtml = path.join(frontendDist, 'index.html');

if (!fs.existsSync(targetIndexHtml)) {
  console.error(`❌ BUILD ERROR: ${targetIndexHtml} is missing!`);
  process.exit(1);
}

console.log(`✅ VERIFIED BUILD: ${targetIndexHtml} generated successfully!`);

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

const rootAssetsDir = path.resolve(rootDir, 'assets');
const rootDistDir = path.resolve(rootDir, 'dist');
const rootPublicHtmlDir = path.resolve(rootDir, 'public_html');
const frontendAssetsDir = path.resolve(frontendDist, 'assets');

try {
  // 1. Copy frontend/dist contents without wiping old asset chunks (prevents breaking cached clients)
  copyDirRecursive(frontendDist, rootDistDir);
  copyDirRecursive(frontendDist, rootPublicHtmlDir);

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
