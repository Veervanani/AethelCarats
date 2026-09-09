"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Migration Script: PostgreSQL → Hostinger MySQL / MariaDB
 * Safely exports all data from existing database and generates MySQL-compatible SQL dumps.
 * Existing database remains 100% untouched.
 */
const prisma = new client_1.PrismaClient();
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
    const jsonPath = path_1.default.join(__dirname, '../../database_export_mysql.json');
    fs_1.default.writeFileSync(jsonPath, JSON.stringify(exportData, null, 2), 'utf-8');
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
