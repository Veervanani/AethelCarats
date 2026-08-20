import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '8080', 10);
const HOST = '0.0.0.0';

function resolveDistDir() {
  const candidates = [
    path.join(__dirname, 'dist'),
    path.join(__dirname, 'frontend', 'dist'),
    path.join(process.cwd(), 'frontend', 'dist'),
    path.join(process.cwd(), 'dist'),
  ];
  for (const dir of candidates) {
    if (fs.existsSync(dir) && fs.existsSync(path.join(dir, 'index.html'))) {
      return dir;
    }
  }
  return candidates[0];
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    return res.end('Method Not Allowed');
  }

  // Handle Cloud Run health check & readiness probes
  if (req.url === '/healthz' || req.url === '/_health' || req.url === '/ping') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('OK');
  }

  const distDir = resolveDistDir();

  // Parse requested URL path
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(distDir, reqPath);

  // Security check against directory traversal
  if (!filePath.startsWith(distDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Forbidden');
  }

  // Check if requested path is a file on disk
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      serveFile(filePath, distDir, res, req.method);
    } else if (!err && stats.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      fs.stat(indexPath, (indexErr, indexStats) => {
        if (!indexErr && indexStats.isFile()) {
          serveFile(indexPath, distDir, res, req.method);
        } else {
          serveSPA(distDir, res, req.method);
        }
      });
    } else {
      // SPA Fallback for client-side routes (e.g. /rings, /diamonds, /pendants, /customise, /admin) -> index.html
      serveSPA(distDir, res, req.method);
    }
  });
});

function serveFile(filePath, distDir, res, method) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('Internal Server Error');
    }

    const isHashedAsset = filePath.includes('/assets/');
    const cacheHeader = isHashedAsset
      ? 'public, max-age=31536000, immutable'
      : 'no-cache';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': cacheHeader,
      'Content-Length': data.length,
    });

    if (method === 'HEAD') {
      res.end();
    } else {
      res.end(data);
    }
  });
}

function serveSPA(distDir, res, method) {
  const indexPath = path.join(distDir, 'index.html');
  fs.readFile(indexPath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('Build output missing. Run npm run build first.');
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Content-Length': data.length,
    });

    if (method === 'HEAD') {
      res.end();
    } else {
      res.end(data);
    }
  });
}

server.listen(PORT, HOST, () => {
  console.log(`✨ Floksy Jewel Production Server listening on http://${HOST}:${PORT}`);
  console.log(`📁 Serving static assets & SPA routes from: ${resolveDistDir()}`);
});
