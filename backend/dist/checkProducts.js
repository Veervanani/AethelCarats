"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function check() {
    const products = await prisma.product.findMany({
        include: { category: true },
    });
    console.log('--- DB PRODUCTS CHECK ---');
    console.log(`Total Products in DB: ${products.length}`);
    products.forEach((p) => {
        console.log(`- ID: ${p.id} | Name: ${p.name} | SKU: ${p.sku} | Category: ${p.category?.name || p.categoryId} | Status: ${p.status}`);
    });
    const categories = await prisma.category.findMany({});
    console.log('\n--- DB CATEGORIES CHECK ---');
    console.log(`Total Categories in DB: ${categories.length}`);
    categories.forEach((c) => {
        console.log(`- ID: ${c.id} | Name: ${c.name} | Slug: ${c.slug}`);
    });
    await prisma.$disconnect();
}
check().catch((err) => {
    console.error(err);
    prisma.$disconnect();
});
