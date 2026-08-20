import fs from 'fs';
import path from 'path';
import prisma from '../prisma';

async function main() {
  const filePath = path.join(__dirname, '../../export_data.json');
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Export file not found at ${filePath}. Run 'npm run db:export' first!`);
    process.exit(1);
  }

  console.log('Importing database from export_data.json...');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // 1. Users
  if (Array.isArray(data.users)) {
    for (const item of data.users) {
      await prisma.user.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      }).catch(console.error);
    }
  }

  // 2. Categories
  if (Array.isArray(data.categories)) {
    for (const item of data.categories) {
      await prisma.category.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      }).catch(console.error);
    }
  }

  // 3. Products
  if (Array.isArray(data.products)) {
    for (const item of data.products) {
      const { images, detailSections, ...productData } = item as any;
      await prisma.product.upsert({
        where: { id: item.id },
        update: productData,
        create: productData,
      }).catch(console.error);
    }
  }

  // 4. Product Images
  if (Array.isArray(data.productImages)) {
    for (const item of data.productImages) {
      await prisma.productImage.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      }).catch(console.error);
    }
  }

  // 5. Site Settings
  if (Array.isArray(data.siteSettings)) {
    for (const item of data.siteSettings) {
      await prisma.siteSetting.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      }).catch(console.error);
    }
  }

  // 6. Product Page Content
  if (Array.isArray(data.productPageContents)) {
    for (const item of data.productPageContents) {
      await prisma.productPageContent.upsert({
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
    await prisma.$disconnect();
  });
