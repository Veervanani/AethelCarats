import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { app } from './backend/dist/server.js';

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
    path.resolve(process.cwd(), 'frontend/dist'),
    path.resolve(process.cwd(), 'dist'),
    path.resolve(__dirname, 'frontend/dist'),
    path.resolve(__dirname, 'dist'),
    path.resolve(__dirname, '../frontend/dist'),
    path.resolve(__dirname, '../dist'),
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
  path.resolve(process.cwd(), 'uploads'),
  path.resolve(process.cwd(), 'backend/uploads'),
  path.resolve(process.cwd(), 'frontend/public/uploads'),
  path.resolve(distDir, 'uploads'),
  path.resolve(__dirname, 'uploads'),
  path.resolve(__dirname, 'backend/uploads'),
  path.resolve(__dirname, 'frontend/dist/uploads'),
];

app.use('/uploads', (req, res, next) => {
  const cleanSubpath = decodeURIComponent(req.path.replace(/^\//, ''));
  for (const dir of candidateUploadDirs) {
    const filePath = path.join(dir, cleanSubpath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Cross-Origin-Resource-Policy', 'cross-origin');
      res.set('Cache-Control', 'public, max-age=86400');
      return res.sendFile(filePath);
    }
  }
  return next();
});

// Dynamic static file resolution for /assets across all possible disk locations
const candidateAssetDirs = [
  path.resolve(distDir, 'assets'),
  path.resolve(process.cwd(), 'frontend/public/assets'),
  path.resolve(process.cwd(), 'public/assets'),
  path.resolve(process.cwd(), 'assets'),
  path.resolve(__dirname, 'frontend/public/assets'),
  path.resolve(__dirname, 'assets'),
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
if (typeof PORT === 'string') {
  server = app.listen(PORT, () => {
    console.log(`🚀 SERVER LISTEN CALLBACK (SOCKET): ${PORT}`);
    console.log(`PID: ${process.pid}`);
    console.log(`server.listening: ${server.listening}`);
    console.log(`📁 Serving React frontend SPA from: ${distDir}`);
  });
} else {
  server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 SERVER LISTEN CALLBACK (0.0.0.0:${PORT})`);
    console.log(`PID: ${process.pid}`);
    console.log(`PORT: ${PORT}`);
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
