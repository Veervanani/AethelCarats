import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mysql from 'mysql2/promise';
import backendModule from './backend/dist/server.js';
const app = backendModule.app || (backendModule.default && backendModule.default.app) || backendModule;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicit Process Lifecycle Diagnostics
console.log('PROCESS PID:', process.pid);

process.on('SIGTERM', () => {
  console.error('⚠️ SIGTERM RECEIVED - HOSTINGER MAY BE STOPPING PROCESS');
});

process.on('SIGINT', () => {
  console.error('⚠️ SIGINT RECEIVED');
});

process.on('exit', (code) => {
  console.error('⚠️ NODE PROCESS EXITING');
  console.error('EXIT CODE:', code);
});

process.on('uncaughtException', (err) => {
    console.error('CRITICAL UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('CRITICAL UNHANDLED REJECTION:', reason);
});

// Sanitize and construct DATABASE_URL ensuring valid mysql:// protocol
let rawDbUrl = (process.env.DATABASE_URL || '').trim().replace(/^["'“”‘’\s]+|["'“”‘’\s]+$/g, '').trim();
if (!rawDbUrl || !rawDbUrl.startsWith('mysql://')) {
  const host = process.env.DB_HOST || 'srv844.hstgr.io';
  const port = process.env.DB_PORT || '3306';
  const name = process.env.DB_NAME || 'u707945653_aethelcarats';
  const user = process.env.DB_USER || 'u707945653_admin';
  const password = process.env.DB_PASSWORD || 'tMg6FPi73a*HbPb';
  const encodedPassword = encodeURIComponent(password)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A');
  rawDbUrl = `mysql://${user}:${encodedPassword}@${host}:${port}/${name}?connect_timeout=3&socket_timeout=3&pool_timeout=3`;
}
process.env.DATABASE_URL = rawDbUrl;

const rawPort = process.env.PORT;
const PORT = rawPort ? (isNaN(Number(rawPort)) ? rawPort : Number(rawPort)) : 3000;

console.log(`\n============================`);
console.log(`🚀 STARTUP DIAGNOSTICS:`);
console.log(`   - PROCESS PID: ${process.pid}`);
console.log(`   - process.env.PORT: ${process.env.PORT}`);
console.log(`   - process.cwd(): ${process.cwd()}`);
console.log(`   - __dirname: ${__dirname}`);
console.log(`   - Target Port: ${PORT}`);
console.log(`   - NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`   - DB_HOST: ${process.env.DB_HOST}, DB_NAME: ${process.env.DB_NAME}, DB_USER: ${process.env.DB_USER}`);
console.log(`============================\n`);

function resolveFrontendDistDir() {
  const candidates = [
    path.resolve(process.cwd(), 'public_html'),
    path.resolve(__dirname, 'public_html'),
    path.resolve(process.cwd(), 'dist'),
    path.resolve(__dirname, 'dist'),
    path.resolve(process.cwd(), 'frontend/dist'),
    path.resolve(__dirname, 'frontend/dist'),
    path.resolve(process.cwd()),
    path.resolve(__dirname),
  ];
  for (const dir of candidates) {
    if (fs.existsSync(dir) && fs.existsSync(path.join(dir, 'index.html'))) {
      console.log(`✅ Found React frontend build at absolute path: ${dir}`);
      return dir;
    }
  }
  console.warn(`⚠️ Warning: index.html not found in candidate paths. Defaulting to: ${candidates[0]}`);
  return candidates[0];
}

const distDir = resolveFrontendDistDir();

// Transparently handle legacy PHP URL formats (/api/index.php/v1/* -> /api/v1/*)
app.use((req, res, next) => {
  if (req.url.startsWith('/api/index.php/')) {
    req.url = req.url.replace('/api/index.php/', '/api/');
  } else if (req.url === '/api/index.php') {
    req.url = '/api/v1/health';
  }
  next();
});

// Request Diagnostics Logging Middleware
app.use((req, res, next) => {
  console.log(`📥 [${new Date().toISOString()}] HTTP ${req.method} ${req.url} - Host: ${req.headers.host || 'unknown'}`);
  next();
});

// Dynamic static file resolution for /uploads across all possible disk locations
const candidateUploadDirs = [
  path.resolve(process.cwd(), 'public_html/uploads'),
  path.resolve(__dirname, 'public_html/uploads'),
  path.resolve(process.cwd(), 'uploads'),
  path.resolve(process.cwd(), 'backend/uploads'),
  path.resolve(process.cwd(), 'frontend/public/uploads'),
  path.resolve(distDir, 'uploads'),
  path.resolve(__dirname, 'uploads'),
  path.resolve(__dirname, 'backend/uploads'),
  path.resolve(__dirname, 'frontend/dist/uploads'),
];

const dbPool = mysql.createPool({
  host: process.env.DB_HOST || 'srv844.hstgr.io',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'u707945653_admin',
  password: process.env.DB_PASSWORD || 'tMg6FPi73a*HbPb',
  database: process.env.DB_NAME || 'u707945653_aethelcarats',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 4000,
});

const LUXURY_SVG_PLACEHOLDER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0a0c" />
      <stop offset="50%" stop-color="#141418" />
      <stop offset="100%" stop-color="#08080a" />
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#bf953f" />
      <stop offset="25%" stop-color="#fcf6ba" />
      <stop offset="50%" stop-color="#b38728" />
      <stop offset="75%" stop-color="#fbf5b7" />
      <stop offset="100%" stop-color="#aa771c" />
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bg)" />
  <rect x="24" y="24" width="552" height="552" fill="none" stroke="url(#gold)" stroke-width="1" stroke-opacity="0.35" />
  <g transform="translate(300, 255) scale(1.35)">
    <polygon points="0,-40 35,-15 22,35 -22,35 -35,-15" fill="none" stroke="url(#gold)" stroke-width="2.5" stroke-linejoin="round" />
    <line x1="-35" y1="-15" x2="35" y2="-15" stroke="url(#gold)" stroke-width="1.5" />
    <line x1="-22" y1="35" x2="0" y2="-40" stroke="url(#gold)" stroke-width="1.5" />
    <line x1="22" y1="35" x2="0" y2="-40" stroke="url(#gold)" stroke-width="1.5" />
    <line x1="-15" y1="-15" x2="0" y2="35" stroke="url(#gold)" stroke-width="1.5" />
    <line x1="15" y1="-15" x2="0" y2="35" stroke="url(#gold)" stroke-width="1.5" />
  </g>
  <text x="300" y="375" text-anchor="middle" fill="url(#gold)" font-family="'Cinzel', 'Playfair Display', Georgia, serif" font-size="20" font-weight="600" letter-spacing="6">AETHEL CARATS</text>
  <text x="300" y="405" text-anchor="middle" fill="#888899" font-family="'Montserrat', -apple-system, sans-serif" font-size="11" letter-spacing="3">FINE JEWELLERY</text>
</svg>`;

app.use('/uploads', async (req, res, next) => {
  const cleanSubpath = decodeURIComponent(req.path.replace(/^\//, ''));
  const filename = path.basename(cleanSubpath);

  // 1. Check local disk candidate directories first (fastest)
  for (const dir of candidateUploadDirs) {
    const filePath = path.join(dir, cleanSubpath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Cross-Origin-Resource-Policy', 'cross-origin');
      res.set('Cache-Control', 'public, max-age=86400');
      return res.sendFile(filePath);
    }
  }

  // 2. Multi-device DB recovery: Check shared remote MySQL for persistent LONGBLOB data
  try {
    const [mediaRows] = await dbPool.query(
      'SELECT data, fileType FROM `Media` WHERE url LIKE ? OR url LIKE ? OR name = ? LIMIT 1',
      [`%${filename}`, `%${cleanSubpath}`, filename]
    );

    let row = mediaRows && mediaRows[0];
    if (!row || !row.data) {
      const [piRows] = await dbPool.query(
        'SELECT data FROM `ProductImage` WHERE url LIKE ? LIMIT 1',
        [`%${filename}`]
      );
      if (piRows && piRows[0] && piRows[0].data) {
        row = piRows[0];
      }
    }

    if (row && row.data && row.data.length > 0) {
      // Self-heal local disk cache so future hits are instantaneous
      const primaryCacheDir = candidateUploadDirs[0];
      const targetDiskPath = path.join(primaryCacheDir, cleanSubpath);
      try {
        const parentDir = path.dirname(targetDiskPath);
        if (!fs.existsSync(parentDir)) fs.mkdirSync(parentDir, { recursive: true });
        fs.writeFileSync(targetDiskPath, row.data);
      } catch (cacheErr) {
        console.warn('Cache write notice:', cacheErr?.message);
      }

      const ext = path.extname(cleanSubpath).toLowerCase();
      const mimeTypes = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml',
        '.gif': 'image/gif',
      };
      const contentType = row.fileType || mimeTypes[ext] || 'image/jpeg';

      res.set('Access-Control-Allow-Origin', '*');
      res.set('Cross-Origin-Resource-Policy', 'cross-origin');
      res.set('Cache-Control', 'public, max-age=86400');
      res.set('Content-Type', contentType);
      return res.status(200).send(row.data);
    }
  } catch (dbErr) {
    console.warn('DB image lookup notice:', dbErr?.message);
  }

  // 3. Zero-404 Guarantee: Return luxury SVG placeholder with HTTP 200 so console never logs 404 errors
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  res.set('Cache-Control', 'public, max-age=300');
  res.set('Content-Type', 'image/svg+xml; charset=utf-8');
  return res.status(200).send(LUXURY_SVG_PLACEHOLDER);
});

// Dynamic static file resolution for /assets across all possible disk locations
const candidateAssetDirs = [
  path.resolve(distDir, 'assets'),
  path.resolve(process.cwd(), 'public_html/assets'),
  path.resolve(__dirname, 'public_html/assets'),
  path.resolve(process.cwd(), 'assets'),
  path.resolve(process.cwd(), 'frontend/public/assets'),
  path.resolve(process.cwd(), 'public/assets'),
  path.resolve(__dirname, 'assets'),
  path.resolve(__dirname, 'frontend/public/assets'),
];

app.use('/assets', (req, res, next) => {
  const cleanSubpath = decodeURIComponent(req.path.replace(/^\//, ''));
  for (const dir of candidateAssetDirs) {
    const filePath = path.join(dir, cleanSubpath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Cross-Origin-Resource-Policy', 'cross-origin');
      res.set('Cache-Control', 'public, max-age=604800');
      return res.sendFile(filePath);
    }
  }
  return next();
});

// Serve static React build assets (js, css, images)
app.use(express.static(distDir));

// SPA Fallback: Serve index.html for all non-API and non-static routes
app.get('*', (req, res, next) => {
  if (
    req.path.startsWith('/api/') ||
    req.path.startsWith('/api') ||
    req.path.startsWith('/uploads/') ||
    req.path.startsWith('/assets/') ||
    /\.(png|jpe?g|webp|svg|gif|ico|css|js|map|woff2?|ttf|eot|pdf)$/i.test(req.path)
  ) {
    return res.status(404).send('Asset not found');
  }
  const indexPath = path.join(distDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  return next();
});

let server;
if (typeof globalThis.PhusionPassenger !== 'undefined' || typeof PhusionPassenger !== 'undefined') {
  if (typeof PhusionPassenger !== 'undefined' && PhusionPassenger.configure) {
    PhusionPassenger.configure({ autoInstall: false });
  }
  server = app.listen('passenger', () => {
    console.log(`🚀 Phusion Passenger server listening on passenger socket`);
    console.log(`PID: ${process.pid}`);
    console.log(`📁 Serving React frontend SPA from: ${distDir}`);
  });
} else if (typeof PORT === 'string' && isNaN(Number(PORT))) {
  server = app.listen(PORT, () => {
    console.log(`🚀 SERVER LISTEN CALLBACK (SOCKET): ${PORT}`);
    console.log(`PID: ${process.pid}`);
    console.log(`server.listening: ${server.listening}`);
    console.log(`📁 Serving React frontend SPA from: ${distDir}`);
  });
} else {
  const numericPort = Number(PORT) || 3000;
  server = app.listen(numericPort, '0.0.0.0', () => {
    console.log(`🚀 SERVER LISTEN CALLBACK (PORT: ${numericPort}, HOST: 0.0.0.0)`);
    console.log(`PID: ${process.pid}`);
    console.log(`server.listening: ${server.listening}`);
    console.log(`server.address:`, server.address());
    console.log(`📁 Serving React frontend SPA from: ${distDir}`);
  });
}

console.log('HTTP SERVER OBJECT CREATED');
console.log('PID:', process.pid);
console.log('PORT:', PORT);

server.on('listening', () => {
  console.log('✅ SERVER LISTENING EVENT');
  console.log('PID:', process.pid);
  console.log('ADDRESS:', server.address());
});

server.on('error', (err) => {
  console.error('❌ SERVER ERROR');
  console.error(err);
});

export default app;
export { app };
