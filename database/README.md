# AethelCarats Database

This directory contains the production database backups, schema definitions, and migration scripts for the **AethelCarats Luxury Fine Jewellery & Diamond Vault Platform**.

---

## Files Included

| File | Size | Description |
| :--- | :--- | :--- |
| [`aethelcarats-database.sql`](./aethelcarats-database.sql) | ~5.9 MB | Complete production database dump containing table schemas (DDL) and all active catalog rows (Diamonds, Products, CMS Pages, Mega Menus, Site Settings, Filter Configs). |
| [`schema.sql`](./schema.sql) | ~42 KB | Table structure and DDL definitions without data rows. Useful for initializing clean database environments. |
| [`../scripts/export_database.cjs`](../scripts/export_database.cjs) | — | Automated Node.js utility script to re-export the live database directly to this directory at any time. |

---

## Database Architecture

- **Database Engine:** MySQL 8.0+ / MariaDB 10.4+
- **Character Set:** `utf8mb4`
- **Collation:** `utf8mb4_unicode_ci`
- **Total Tables:** 57

### Key Table Groups:
1. **Catalog & Inventory:**
   - `Product`, `ProductImage`, `ProductDetailSection`, `ProductDetailItem`, `Category`, `Collection`
   - `Diamond` (Loose diamond vault with GIA/IGI specifications, carats, colors, cuts, certifications)
2. **Filters & Configuration:**
   - `FilterGroup`, `FilterOption`, `DiamondFilterConfig`, `DiamondFilterOption`, `ProductFilterConfig`, `ProductFilterOption`
3. **CMS, Pages & Brand Identity:**
   - `SiteSetting` (WhatsApp concierge, atelier contact, global branding, announcement bar, footer)
   - `Page`, `PageRevision`, `PageSection`, `HeroBanner`, `MegaMenuCard`, `Menu`, `MenuItem`, `HomepageReview`
4. **Operations & Client Care:**
   - `User`, `Customer`, `Order`, `OrderItem`, `CustomRequest`, `PaymentMethod`, `ActivityLog`

---

## How to Import

### Option 1: MySQL Command Line
```bash
mysql -u <db_user> -p -h <db_host> <db_name> < database/aethelcarats-database.sql
```

### Option 2: phpMyAdmin / Hostinger Control Panel
1. Open your database in **phpMyAdmin** or **Hostinger Database Manager**.
2. Click on the **Import** tab.
3. Select `database/aethelcarats-database.sql`.
4. Click **Go** / **Execute**.

### Option 3: Regenerate / Update Dump from Live Database
To pull the latest live data from the database at any time, run:
```bash
node scripts/export_database.cjs
```
