"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./prisma");
const prisma = prisma_1.default || prisma_1.prisma;
async function clearAllProducts() {
    console.log('🗑️ Deleting all products and related records from database...');
    await prisma.productImage.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.customerSpecificPrice.deleteMany();
    await prisma.review.deleteMany();
    await prisma.wishlistItem.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.orderItem.deleteMany();
    const deleted = await prisma.product.deleteMany();
    console.log(`✅ Successfully deleted ${deleted.count} products from database!`);
}
clearAllProducts()
    .catch((e) => {
    console.error('❌ Error deleting products:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
