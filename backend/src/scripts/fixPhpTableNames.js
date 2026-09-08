const fs = require('fs');
const path = require('path');

const prismaTables = [
  'User',
  'ActivityLog',
  'Employee',
  'Category',
  'Collection',
  'Product',
  'ProductVariant',
  'ProductImage',
  'ProductVideo',
  'Review',
  'Diamond',
  'DiamondImportHistory',
  'CustomRequest',
  'CustomRequestFile',
  'CustomTimelineItem',
  'Customer',
  'CustomerSpecificPrice',
  'RingSizeGuide',
  'Address',
  'Order',
  'OrderItem',
  'Payment',
  'Refund',
  'PaymentReceipt',
  'Invoice',
  'Statement',
  'PaymentMethod',
  'FinancialAuditLog',
  'Shipment',
  'Wishlist',
  'WishlistItem',
  'Cart',
  'CartItem',
  'Page',
  'PageSection',
  'PageRevision',
  'FaqItem',
  'BlogPost',
  'Menu',
  'MenuItem',
  'FilterGroup',
  'FilterOption',
  'Promotion',
  'SeoMetadata',
  'Redirect',
  'SiteSetting',
  'ProductDetailSection',
  'ProductPageContent',
  'InternalSale',
  'SalesTarget',
  'CommissionPlan',
  'EmployeeCommission',
  'AttendanceRecord',
  'DiamondFilterConfig',
  'DiamondFilterOption'
];

// Map lowercase to PascalCase
const tableMap = {};
prismaTables.forEach(t => {
  tableMap[t.toLowerCase()] = t;
});

function processPhpDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processPhpDir(full);
    } else if (entry.name.endsWith('.php')) {
      let content = fs.readFileSync(full, 'utf8');
      let modified = false;

      // Replace backtick table names
      for (const [lower, pascal] of Object.entries(tableMap)) {
        const regex = new RegExp('`' + lower + '`', 'g');
        if (regex.test(content)) {
          content = content.replace(regex, '`' + pascal + '`');
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(full, content, 'utf8');
        console.log('Fixed tables in:', path.relative(process.cwd(), full));
      }
    }
  }
}

processPhpDir(path.join(process.cwd(), 'api'));
processPhpDir(path.join(process.cwd(), 'public_html/api'));
console.log('Done fixing PHP table names!');
