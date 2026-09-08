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
  let rawUrl = (process.env.DATABASE_URL || '').trim();
  
  // Clean surrounding quotes, whitespace, and brackets
  rawUrl = rawUrl.replace(/^["'“”‘’\s]+|["'“”‘’\s]+$/g, '').trim();

  // If rawUrl does not start with mysql:// or is empty, rebuild it from discrete params
  if (!rawUrl || !rawUrl.startsWith('mysql://')) {
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

    rawUrl = `mysql://${user}:${encodedPassword}@${host}:${port}/${name}?connect_timeout=3&socket_timeout=3&pool_timeout=3`;
  } else {
    // Sanitize the password in rawUrl
    rawUrl = rawUrl.replace(/:([^:@]+)@/, (_, pwd) => {
      const decoded = decodeURIComponent(pwd);
      const encoded = encodeURIComponent(decoded)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A');
      return `:${encoded}@`;
    });
    if (!rawUrl.includes('connect_timeout=')) {
      rawUrl += (rawUrl.includes('?') ? '&' : '?') + 'connect_timeout=3&socket_timeout=3&pool_timeout=3';
    }
  }

  return rawUrl;
}

const activeUrl = getDatabaseUrl();
process.env.DATABASE_URL = activeUrl;

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
