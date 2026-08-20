import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const dumpPath = path.join(__dirname, 'sqlite_dump.json');
const dumpData = JSON.parse(fs.readFileSync(dumpPath, 'utf-8'));

async function verify() {
  console.log('--- VERIFYING ROW COUNTS BETWEEN SQLITE DUMP AND POSTGRESQL ---\n');

  let totalSqlite = 0;
  let totalPg = 0;
  let allMatch = true;

  const checks = [
    { table: 'User', countFunc: () => prisma.user.count() },
    { table: 'Category', countFunc: () => prisma.category.count() },
    { table: 'Collection', countFunc: () => prisma.collection.count() },
    { table: 'Product', countFunc: () => prisma.product.count() },
    { table: 'ProductVariant', countFunc: () => prisma.productVariant.count() },
    { table: 'ProductImage', countFunc: () => prisma.productImage.count() },
    { table: 'ProductVideo', countFunc: () => prisma.productVideo.count() },
    { table: 'Review', countFunc: () => prisma.review.count() },
    { table: 'Diamond', countFunc: () => prisma.diamond.count() },
    { table: 'DiamondImportHistory', countFunc: () => prisma.diamondImportHistory.count() },
    { table: 'CustomRequest', countFunc: () => prisma.customRequest.count() },
    { table: 'CustomRequestFile', countFunc: () => prisma.customRequestFile.count() },
    { table: 'CustomTimelineItem', countFunc: () => prisma.customTimelineItem.count() },
    { table: 'Customer', countFunc: () => prisma.customer.count() },
    { table: 'CustomerSpecificPrice', countFunc: () => prisma.customerSpecificPrice.count() },
    { table: 'RingSizeGuide', countFunc: () => prisma.ringSizeGuide.count() },
    { table: 'Address', countFunc: () => prisma.address.count() },
    { table: 'Order', countFunc: () => prisma.order.count() },
    { table: 'OrderItem', countFunc: () => prisma.orderItem.count() },
    { table: 'Payment', countFunc: () => prisma.payment.count() },
    { table: 'Refund', countFunc: () => prisma.refund.count() },
    { table: 'PaymentReceipt', countFunc: () => prisma.paymentReceipt.count() },
    { table: 'Invoice', countFunc: () => prisma.invoice.count() },
    { table: 'Statement', countFunc: () => prisma.statement.count() },
    { table: 'PaymentMethod', countFunc: () => prisma.paymentMethod.count() },
    { table: 'FinancialAuditLog', countFunc: () => prisma.financialAuditLog.count() },
    { table: 'Shipment', countFunc: () => prisma.shipment.count() },
    { table: 'Wishlist', countFunc: () => prisma.wishlist.count() },
    { table: 'WishlistItem', countFunc: () => prisma.wishlistItem.count() },
    { table: 'Cart', countFunc: () => prisma.cart.count() },
    { table: 'CartItem', countFunc: () => prisma.cartItem.count() },
    { table: 'Page', countFunc: () => prisma.page.count() },
    { table: 'PageSection', countFunc: () => prisma.pageSection.count() },
    { table: 'PageRevision', countFunc: () => prisma.pageRevision.count() },
    { table: 'FaqItem', countFunc: () => prisma.faqItem.count() },
    { table: 'BlogPost', countFunc: () => prisma.blogPost.count() },
    { table: 'Menu', countFunc: () => prisma.menu.count() },
    { table: 'MenuItem', countFunc: () => prisma.menuItem.count() },
    { table: 'FilterGroup', countFunc: () => prisma.filterGroup.count() },
    { table: 'FilterOption', countFunc: () => prisma.filterOption.count() },
    { table: 'Promotion', countFunc: () => prisma.promotion.count() },
    { table: 'SeoMetadata', countFunc: () => prisma.seoMetadata.count() },
    { table: 'Redirect', countFunc: () => prisma.redirect.count() },
    { table: 'Media', countFunc: () => prisma.media.count() },
    { table: 'Coupon', countFunc: () => prisma.coupon.count() },
    { table: 'Inquiry', countFunc: () => prisma.inquiry.count() },
    { table: 'SiteSetting', countFunc: () => prisma.siteSetting.count() },
    { table: 'DiamondFilterConfig', countFunc: () => prisma.diamondFilterConfig.count() },
    { table: 'DiamondFilterOption', countFunc: () => prisma.diamondFilterOption.count() },
    { table: 'MegaMenuCard', countFunc: () => prisma.megaMenuCard.count() },
    { table: 'HomepageReview', countFunc: () => prisma.homepageReview.count() },
    { table: 'ProductFilterConfig', countFunc: () => prisma.productFilterConfig.count() },
    { table: 'ProductFilterOption', countFunc: () => prisma.productFilterOption.count() },
    { table: 'ActivityLog', countFunc: () => prisma.activityLog.count() },
  ];

  for (const c of checks) {
    const sqliteCount = dumpData[c.table]?.length || 0;
    const pgCount = await c.countFunc();
    totalSqlite += sqliteCount;
    totalPg += pgCount;

    const match = sqliteCount === pgCount;
    if (!match) allMatch = false;

    console.log(
      `${c.table.padEnd(24)} | SQLite: ${String(sqliteCount).padStart(4)} | PostgreSQL: ${String(pgCount).padStart(4)} | Match: ${match ? '✅ YES' : '❌ NO'}`
    );
  }

  console.log('\n------------------------------------------------------------');
  console.log(`TOTAL ROW COUNTS         | SQLite: ${totalSqlite} | PostgreSQL: ${totalPg}`);
  console.log(`STATUS                   | ${allMatch ? '✅ PERFECT 100% MATCH' : '❌ MISMATCH DETECTED'}`);

  // Inspect representative records
  console.log('\n--- REPRESENTATIVE RECORD VERIFICATION ---');
  const demoProduct = await prisma.product.findFirst({ where: { sku: 'FJ-DEMO-RING-001' } });
  console.log(`Product SKU: ${demoProduct?.sku}`);
  console.log(`Product Custom Options JSON: ${demoProduct?.customOptionsJson}`);
  console.log(`Product Metals Config: ${demoProduct?.metalsConfig}`);

  const siteSettings = await prisma.siteSetting.findMany();
  console.log(`Site Settings Count: ${siteSettings.length}`);
  siteSettings.forEach((s) => console.log(`  Key: ${s.key} = ${s.value}`));
}

verify()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
  });
