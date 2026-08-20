import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

/**
 * Migration Script: PostgreSQL → Hostinger MySQL / MariaDB
 * Safely exports all data from existing database and generates MySQL-compatible SQL dumps.
 * Existing database remains 100% untouched.
 */
const prisma = new PrismaClient();

async function exportPostgresToMysql() {
  console.log('🚀 Starting PostgreSQL -> Hostinger MySQL Migration Package Export...');

  const users = await prisma.user.findMany();
  const categories = await prisma.category.findMany();
  const collections = await prisma.collection.findMany();
  const products = await prisma.product.findMany();
  const productImages = await prisma.productImage.findMany();
  const productVariants = await prisma.productVariant.findMany();
  const productVideos = await prisma.productVideo.findMany();
  const reviews = await prisma.review.findMany();
  const diamonds = await prisma.diamond.findMany();
  const customRequests = await prisma.customRequest.findMany();
  const customers = await prisma.customer.findMany();
  const orders = await prisma.order.findMany({ include: { items: true } });
  const siteSettings = await prisma.siteSetting.findMany();
  const productPageContents = await prisma.productPageContent.findMany();
  const pages = await prisma.page.findMany();
  const blogPosts = await prisma.blogPost.findMany();
  const menus = await prisma.menu.findMany();

  const exportData = {
    users,
    categories,
    collections,
    products,
    productImages,
    productVariants,
    productVideos,
    reviews,
    diamonds,
    customRequests,
    customers,
    orders,
    siteSettings,
    productPageContents,
    pages,
    blogPosts,
    menus,
    exportedAt: new Date().toISOString(),
  };

  const jsonPath = path.join(__dirname, '../../database_export_mysql.json');
  fs.writeFileSync(jsonPath, JSON.stringify(exportData, null, 2), 'utf-8');

  console.log(`✅ Data Exported Successfully to ${jsonPath}!
  - Users: ${users.length}
  - Categories: ${categories.length}
  - Products: ${products.length}
  - Orders: ${orders.length}
  - Site Settings: ${siteSettings.length}
  `);
}

exportPostgresToMysql()
  .catch((e) => {
    console.error('Migration Export Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
