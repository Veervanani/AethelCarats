import fs from 'fs';
import path from 'path';
import prisma from '../prisma';

async function main() {
  console.log('Exporting all database tables to export_data.json...');

  const users = await prisma.user.findMany();
  const categories = await prisma.category.findMany();
  const products = await prisma.product.findMany();
  const productImages = await prisma.productImage.findMany();
  const productDetailSections = await prisma.productDetailSection.findMany();
  const orders = await prisma.order.findMany({ include: { items: true } });
  const reviews = await prisma.review.findMany();
  const siteSettings = await prisma.siteSetting.findMany();
  const productPageContents = await prisma.productPageContent.findMany();

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

  const outputPath = path.join(__dirname, '../../export_data.json');
  fs.writeFileSync(outputPath, JSON.stringify(exportData, null, 2), 'utf-8');

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
    await prisma.$disconnect();
  });
