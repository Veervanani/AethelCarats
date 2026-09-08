"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma_1 = __importDefault(require("../prisma"));
async function main() {
    const filePath = path_1.default.join(__dirname, '../../export_data.json');
    if (!fs_1.default.existsSync(filePath)) {
        console.error(`❌ Export file not found at ${filePath}. Run 'npm run db:export' first!`);
        process.exit(1);
    }
    console.log('Importing database from export_data.json...');
    const data = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
    // 1. Users
    if (Array.isArray(data.users)) {
        for (const item of data.users) {
            await prisma_1.default.user.upsert({
                where: { id: item.id },
                update: item,
                create: item,
            }).catch(console.error);
        }
    }
    // 2. Categories
    if (Array.isArray(data.categories)) {
        for (const item of data.categories) {
            await prisma_1.default.category.upsert({
                where: { id: item.id },
                update: item,
                create: item,
            }).catch(console.error);
        }
    }
    // 3. Products
    if (Array.isArray(data.products)) {
        for (const item of data.products) {
            const { images, detailSections, ...productData } = item;
            await prisma_1.default.product.upsert({
                where: { id: item.id },
                update: productData,
                create: productData,
            }).catch(console.error);
        }
    }
    // 4. Product Images
    if (Array.isArray(data.productImages)) {
        for (const item of data.productImages) {
            await prisma_1.default.productImage.upsert({
                where: { id: item.id },
                update: item,
                create: item,
            }).catch(console.error);
        }
    }
    // 5. Site Settings
    if (Array.isArray(data.siteSettings)) {
        for (const item of data.siteSettings) {
            await prisma_1.default.siteSetting.upsert({
                where: { id: item.id },
                update: item,
                create: item,
            }).catch(console.error);
        }
    }
    // 6. Product Page Content
    if (Array.isArray(data.productPageContents)) {
        for (const item of data.productPageContents) {
            await prisma_1.default.productPageContent.upsert({
                where: { id: item.id },
                update: item,
                create: item,
            }).catch(console.error);
        }
    }
    console.log('✅ Import completed successfully!');
}
main()
    .catch((e) => {
    console.error('Import Error:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma_1.default.$disconnect();
});
