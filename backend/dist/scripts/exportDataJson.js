"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma_1 = __importDefault(require("../prisma"));
async function main() {
    console.log('Exporting all database tables to export_data.json...');
    const users = await prisma_1.default.user.findMany();
    const categories = await prisma_1.default.category.findMany();
    const products = await prisma_1.default.product.findMany();
    const productImages = await prisma_1.default.productImage.findMany();
    const productDetailSections = await prisma_1.default.productDetailSection.findMany();
    const orders = await prisma_1.default.order.findMany({ include: { items: true } });
    const reviews = await prisma_1.default.review.findMany();
    const siteSettings = await prisma_1.default.siteSetting.findMany();
    const productPageContents = await prisma_1.default.productPageContent.findMany();
    const exportData = {
        users,
        categories,
        products,
        productImages,
        productDetailSections,
        orders,
        reviews,
        siteSettings,
        productPageContents,
        exportedAt: new Date().toISOString(),
    };
    const outputPath = path_1.default.join(__dirname, '../../export_data.json');
    fs_1.default.writeFileSync(outputPath, JSON.stringify(exportData, null, 2), 'utf-8');
    console.log(`✅ Export successful! Total:
  - Users: ${users.length}
  - Categories: ${categories.length}
  - Products: ${products.length}
  - Product Images: ${productImages.length}
  - Orders: ${orders.length}
  - Reviews: ${reviews.length}
  - Site Settings: ${siteSettings.length}
  - Product Page Content: ${productPageContents.length}

Saved to: ${outputPath}`);
}
main()
    .catch((e) => {
    console.error('Export Error:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma_1.default.$disconnect();
});
