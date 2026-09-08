import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.PRISMA_CLIENT_ENGINE_TYPE) {
  process.env.PRISMA_CLIENT_ENGINE_TYPE = 'binary';
}
if (!process.env.PRISMA_CLI_QUERY_ENGINE_TYPE) {
  process.env.PRISMA_CLI_QUERY_ENGINE_TYPE = 'binary';
}

/**
 * Dynamically builds MySQL database connection URL if DATABASE_URL is not set directly.
 * Safely percent-encodes all special characters in DB_PASSWORD for Prisma & MySQL compatibility.
 */
export function getDatabaseUrl(): string {
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== '') {
    let url = process.env.DATABASE_URL.trim();
    if (!url.includes('connect_timeout=')) {
      url += (url.includes('?') ? '&' : '?') + 'connect_timeout=10&pool_timeout=10';
    }
    return url;
  }

  const host = process.env.DB_HOST || '127.0.0.1';
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

  return `mysql://${user}:${encodedPassword}@${host}:${port}/${name}?connect_timeout=10&pool_timeout=10`;
}

const activeUrl = getDatabaseUrl();
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = activeUrl;
}

const maskedUrl = activeUrl.replace(/:([^:@]+)@/, ':****@');
console.log(`🔌 Initializing Prisma MySQL Client: ${maskedUrl}`);

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: activeUrl,
    },
  },
});

export default prisma;
