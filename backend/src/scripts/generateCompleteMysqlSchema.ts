import fs from 'fs';
import path from 'path';

/**
 * Generates COMPLETE Hostinger MySQL DDL and Data Statements with INSERT IGNORE / REPLACE
 * Prevents duplicate primary key errors during re-imports in phpMyAdmin!
 */

const SOURCE_BACKUP_PATH = path.join(__dirname, '../../../Cloud_SQL_Export_2026-08-11 (18_58_11).sql');
const OUTPUT_MYSQL_SQL_PATH = path.join(__dirname, '../../../hostinger-mysql-migration.sql');

const ALL_57_TABLE_DDLS = `-- ==========================================================================
-- FLOKSY JEWEL — COMPLETE HOSTINGER MYSQL / MARIADB FULL DATABASE MIGRATION
-- Generated from Google Cloud SQL PostgreSQL 18 Backup
-- Engine Target: Hostinger MySQL 8 / MariaDB (All 57 Tables)
-- ==========================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS \`User\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`email\` VARCHAR(191) NOT NULL,
  \`passwordHash\` VARCHAR(191) NOT NULL,
  \`name\` VARCHAR(191) NOT NULL,
  \`role\` VARCHAR(191) NOT NULL DEFAULT 'CUSTOMER',
  \`avatar\` VARCHAR(191) NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`User_email_key\`(\`email\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`ActivityLog\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`userId\` VARCHAR(191) NOT NULL,
  \`action\` VARCHAR(191) NOT NULL,
  \`object\` VARCHAR(191) NOT NULL,
  \`oldValue\` LONGTEXT NULL,
  \`newValue\` LONGTEXT NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`Category\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`name\` VARCHAR(191) NOT NULL,
  \`slug\` VARCHAR(191) NOT NULL,
  \`description\` LONGTEXT NULL,
  \`bannerImage\` LONGTEXT NULL,
  \`image\` LONGTEXT NULL,
  \`link\` LONGTEXT NULL,
  \`sortOrder\` INT NOT NULL DEFAULT 0,
  \`isActive\` TINYINT(1) NOT NULL DEFAULT 1,
  \`enableRingSize\` TINYINT(1) NOT NULL DEFAULT 1,
  \`enableMetal\` TINYINT(1) NOT NULL DEFAULT 1,
  \`enableDiamond\` TINYINT(1) NOT NULL DEFAULT 1,
  \`enableDiamondShape\` TINYINT(1) NOT NULL DEFAULT 1,
  \`enableDiamondCert\` TINYINT(1) NOT NULL DEFAULT 1,
  \`enableEngraving\` TINYINT(1) NOT NULL DEFAULT 1,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`Category_slug_key\`(\`slug\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`Collection\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`name\` VARCHAR(191) NOT NULL,
  \`slug\` VARCHAR(191) NOT NULL,
  \`description\` LONGTEXT NULL,
  \`bannerImage\` LONGTEXT NULL,
  \`thumbnailImage\` LONGTEXT NULL,
  \`isFeatured\` TINYINT(1) NOT NULL DEFAULT 0,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`Collection_slug_key\`(\`slug\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`Product\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`name\` VARCHAR(191) NOT NULL,
  \`sku\` VARCHAR(191) NOT NULL,
  \`slug\` VARCHAR(191) NOT NULL,
  \`categoryId\` VARCHAR(191) NULL,
  \`collectionId\` VARCHAR(191) NULL,
  \`shortDescription\` LONGTEXT NULL,
  \`fullDescription\` LONGTEXT NULL,
  \`specifications\` LONGTEXT NULL,
  \`careInstructions\` LONGTEXT NULL,
  \`jewelleryType\` VARCHAR(191) NULL,
  \`ringStyle\` VARCHAR(191) NULL,
  \`ringSize\` VARCHAR(191) NULL,
  \`ringWidth\` VARCHAR(191) NULL,
  \`gender\` VARCHAR(191) NULL DEFAULT 'Unisex',
  \`metal\` VARCHAR(191) NULL,
  \`metalColor\` VARCHAR(191) NULL,
  \`goldPurity\` VARCHAR(191) NULL,
  \`goldColor\` VARCHAR(191) NULL,
  \`goldWeight\` DOUBLE NULL,
  \`diamondType\` VARCHAR(191) NULL,
  \`shape\` VARCHAR(191) NULL,
  \`carat\` DOUBLE NULL,
  \`color\` VARCHAR(191) NULL,
  \`colorType\` VARCHAR(191) NULL,
  \`fancyColor\` VARCHAR(191) NULL,
  \`fancyIntensity\` VARCHAR(191) NULL,
  \`fancyModifier\` VARCHAR(191) NULL,
  \`clarity\` VARCHAR(191) NULL,
  \`cut\` VARCHAR(191) NULL,
  \`polish\` VARCHAR(191) NULL,
  \`symmetry\` VARCHAR(191) NULL,
  \`fluorescence\` VARCHAR(191) NULL,
  \`certificateNo\` VARCHAR(191) NULL,
  \`certification\` VARCHAR(191) NULL,
  \`gemstone\` VARCHAR(191) NULL,
  \`gemstoneColor\` VARCHAR(191) NULL,
  \`pearlType\` VARCHAR(191) NULL,
  \`birthstone\` VARCHAR(191) NULL,
  \`plainMetal\` TINYINT(1) NOT NULL DEFAULT 0,
  \`onSale\` TINYINT(1) NOT NULL DEFAULT 0,
  \`engravable\` TINYINT(1) NOT NULL DEFAULT 0,
  \`metaTitle\` LONGTEXT NULL,
  \`metaDescription\` LONGTEXT NULL,
  \`metaKeywords\` LONGTEXT NULL,
  \`price\` DOUBLE NOT NULL,
  \`comparePrice\` DOUBLE NULL,
  \`salePrice\` DOUBLE NULL,
  \`currency\` VARCHAR(191) NOT NULL DEFAULT 'USD',
  \`stockQuantity\` INT NOT NULL DEFAULT 10,
  \`status\` VARCHAR(191) NOT NULL DEFAULT 'ACTIVE',
  \`mainImage\` LONGTEXT NOT NULL,
  \`secondaryImage\` LONGTEXT NULL,
  \`isFeatured\` TINYINT(1) NOT NULL DEFAULT 0,
  \`isNewArrival\` TINYINT(1) NOT NULL DEFAULT 1,
  \`isBestseller\` TINYINT(1) NOT NULL DEFAULT 0,
  \`isSettingOnly\` TINYINT(1) NOT NULL DEFAULT 0,
  \`pricingMode\` VARCHAR(191) NOT NULL DEFAULT 'BASE',
  \`enableMetalSelection\` TINYINT(1) NOT NULL DEFAULT 1,
  \`enableDiamondSelection\` TINYINT(1) NOT NULL DEFAULT 1,
  \`enableDiamondShape\` TINYINT(1) NOT NULL DEFAULT 1,
  \`enableCustomOptions\` TINYINT(1) NOT NULL DEFAULT 0,
  \`variationsJson\` LONGTEXT NULL,
  \`customOptionsJson\` LONGTEXT NULL,
  \`shippingInfoJson\` LONGTEXT NULL,
  \`enableRingSize\` TINYINT(1) NOT NULL DEFAULT 0,
  \`ringSizeMode\` VARCHAR(191) NOT NULL DEFAULT 'CUSTOMER_SELECTABLE',
  \`fixedRingSize\` VARCHAR(191) NULL DEFAULT '7',
  \`availableRingSizes\` LONGTEXT NULL,
  \`isRingSizeRequired\` TINYINT(1) NOT NULL DEFAULT 1,
  \`metalsConfig\` LONGTEXT NULL,
  \`diamondsConfig\` LONGTEXT NULL,
  \`benefitsConfig\` LONGTEXT NULL,
  \`accordionsConfig\` LONGTEXT NULL,
  \`pricingMatrix\` LONGTEXT NULL,
  \`draftData\` LONGTEXT NULL,
  \`ogImage\` LONGTEXT NULL,
  \`schemaInformation\` LONGTEXT NULL,
  \`title\` LONGTEXT NULL,
  \`masterPrice14k\` DOUBLE NULL,
  \`masterPrice18k\` DOUBLE NULL,
  \`masterPriceSilver\` DOUBLE NULL,
  \`diamondDetailsJson\` LONGTEXT NULL,
  \`internalTagsJson\` LONGTEXT NULL,
  \`seoSocialJson\` LONGTEXT NULL,
  \`processingTimeDays\` INT NULL DEFAULT 3,
  \`craftsmanshipHeading\` LONGTEXT NULL,
  \`craftsmanshipStory\` LONGTEXT NULL,
  \`editorialImage\` LONGTEXT NULL,
  \`recommendedProductIds\` LONGTEXT NULL,
  \`completeLookProductIds\` LONGTEXT NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`Product_sku_key\`(\`sku\`),
  UNIQUE INDEX \`Product_slug_key\`(\`slug\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`ProductVariant\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`productId\` VARCHAR(191) NOT NULL,
  \`sku\` VARCHAR(191) NOT NULL,
  \`metal\` VARCHAR(191) NULL,
  \`goldColor\` VARCHAR(191) NULL,
  \`size\` VARCHAR(191) NULL,
  \`price\` DOUBLE NOT NULL,
  \`stock\` INT NOT NULL DEFAULT 5,
  \`weight\` DOUBLE NULL,
  \`image\` LONGTEXT NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`ProductVariant_sku_key\`(\`sku\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`ProductImage\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`productId\` VARCHAR(191) NOT NULL,
  \`url\` LONGTEXT NOT NULL,
  \`altText\` LONGTEXT NULL,
  \`title\` LONGTEXT NULL,
  \`imageType\` VARCHAR(191) NULL,
  \`position\` INT NOT NULL DEFAULT 0,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`ProductVideo\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`productId\` VARCHAR(191) NOT NULL,
  \`url\` LONGTEXT NOT NULL,
  \`position\` INT NOT NULL DEFAULT 0,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`Review\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`productId\` VARCHAR(191) NOT NULL,
  \`author\` VARCHAR(191) NOT NULL,
  \`email\` VARCHAR(191) NULL,
  \`rating\` INT NOT NULL DEFAULT 5,
  \`comment\` LONGTEXT NOT NULL,
  \`isApproved\` TINYINT(1) NOT NULL DEFAULT 0,
  \`isFeatured\` TINYINT(1) NOT NULL DEFAULT 0,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`Diamond\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`diamondId\` VARCHAR(191) NOT NULL,
  \`stockId\` VARCHAR(191) NULL,
  \`sku\` VARCHAR(191) NULL,
  \`diamondType\` VARCHAR(191) NOT NULL DEFAULT 'NATURAL',
  \`growthType\` VARCHAR(191) NULL,
  \`shape\` VARCHAR(191) NOT NULL,
  \`carat\` DOUBLE NOT NULL,
  \`color\` VARCHAR(191) NOT NULL,
  \`clarity\` VARCHAR(191) NOT NULL,
  \`cut\` VARCHAR(191) NULL,
  \`polish\` VARCHAR(191) NULL,
  \`symmetry\` VARCHAR(191) NULL,
  \`fluorescence\` VARCHAR(191) NULL,
  \`length\` DOUBLE NULL,
  \`width\` DOUBLE NULL,
  \`depth\` DOUBLE NULL,
  \`ratio\` DOUBLE NULL,
  \`tablePercent\` DOUBLE NULL,
  \`depthPercent\` DOUBLE NULL,
  \`crownAngle\` DOUBLE NULL,
  \`pavilionAngle\` DOUBLE NULL,
  \`girdle\` VARCHAR(191) NULL,
  \`culet\` VARCHAR(191) NULL,
  \`lab\` VARCHAR(191) NULL,
  \`certificateNumber\` VARCHAR(191) NULL,
  \`certificateUrl\` LONGTEXT NULL,
  \`price\` DOUBLE NOT NULL,
  \`pricePerCarat\` DOUBLE NULL,
  \`currency\` VARCHAR(191) NOT NULL DEFAULT 'USD',
  \`status\` VARCHAR(191) NOT NULL DEFAULT 'AVAILABLE',
  \`fancyColor\` VARCHAR(191) NULL,
  \`fancyOvertone\` VARCHAR(191) NULL,
  \`fancyIntensity\` VARCHAR(191) NULL,
  \`imageUrl\` LONGTEXT NULL,
  \`videoUrl\` LONGTEXT NULL,
  \`video360Url\` LONGTEXT NULL,
  \`certificatePdfUrl\` LONGTEXT NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`Diamond_diamondId_key\`(\`diamondId\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`DiamondImportHistory\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`fileName\` VARCHAR(191) NOT NULL,
  \`totalRows\` INT NOT NULL,
  \`importedCount\` INT NOT NULL,
  \`updatedCount\` INT NOT NULL,
  \`failedCount\` INT NOT NULL,
  \`errorReport\` LONGTEXT NULL,
  \`importedBy\` VARCHAR(191) NOT NULL DEFAULT 'Admin',
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`CustomRequest\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`requestNumber\` VARCHAR(191) NOT NULL,
  \`name\` VARCHAR(191) NOT NULL,
  \`email\` VARCHAR(191) NOT NULL,
  \`whatsapp\` VARCHAR(191) NOT NULL,
  \`jewelleryType\` VARCHAR(191) NOT NULL,
  \`metal\` VARCHAR(191) NULL,
  \`diamondPreference\` VARCHAR(191) NULL,
  \`budget\` VARCHAR(191) NULL,
  \`deadline\` VARCHAR(191) NULL,
  \`description\` LONGTEXT NOT NULL,
  \`status\` VARCHAR(191) NOT NULL DEFAULT 'NEW',
  \`cadFileUrl\` LONGTEXT NULL,
  \`adminNotes\` LONGTEXT NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`CustomRequest_requestNumber_key\`(\`requestNumber\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`CustomRequestFile\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`customRequestId\` VARCHAR(191) NOT NULL,
  \`fileUrl\` LONGTEXT NOT NULL,
  \`fileType\` VARCHAR(191) NOT NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`CustomTimelineItem\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`customRequestId\` VARCHAR(191) NOT NULL,
  \`status\` VARCHAR(191) NOT NULL,
  \`note\` LONGTEXT NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`Customer\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`email\` VARCHAR(191) NOT NULL,
  \`name\` VARCHAR(191) NOT NULL,
  \`phone\` VARCHAR(191) NULL,
  \`country\` VARCHAR(191) NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`Customer_email_key\`(\`email\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`CustomerSpecificPrice\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`customerId\` VARCHAR(191) NOT NULL,
  \`productId\` VARCHAR(191) NOT NULL,
  \`specialPrice\` DOUBLE NULL,
  \`priceAdjustment\` DOUBLE NULL DEFAULT 0,
  \`metalsPriceAdjustments\` LONGTEXT NULL,
  \`diamondsPriceAdjustments\` LONGTEXT NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`CustomerSpecificPrice_customerId_productId_key\`(\`customerId\`, \`productId\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`RingSizeGuide\` (
  \`id\` VARCHAR(191) NOT NULL DEFAULT 'main',
  \`title\` VARCHAR(191) NOT NULL DEFAULT 'Ring Size Guide',
  \`slug\` VARCHAR(191) NOT NULL DEFAULT 'find-your-ring-size',
  \`status\` VARCHAR(191) NOT NULL DEFAULT 'PUBLISHED',
  \`heroTitle\` LONGTEXT NULL,
  \`heroSubtitle\` LONGTEXT NULL,
  \`heroImage\` LONGTEXT NULL,
  \`heroImagePosition\` VARCHAR(191) NULL DEFAULT 'center',
  \`heroBg\` VARCHAR(191) NULL DEFAULT '#19202A',
  \`heroCtaText\` VARCHAR(191) NULL,
  \`heroCtaUrl\` LONGTEXT NULL,
  \`introHeading\` LONGTEXT NULL,
  \`introParagraphs\` LONGTEXT NULL,
  \`introContent\` LONGTEXT NULL,
  \`infoHeading\` LONGTEXT NULL,
  \`infoDescription\` LONGTEXT NULL,
  \`chartImage\` LONGTEXT NULL,
  \`chartTitle\` LONGTEXT NULL,
  \`chartDescription\` LONGTEXT NULL,
  \`conversionsJson\` LONGTEXT NULL,
  \`sizerHeading\` LONGTEXT NULL,
  \`sizerDescription\` LONGTEXT NULL,
  \`sizerImage\` LONGTEXT NULL,
  \`sizerButtonText\` VARCHAR(191) NULL,
  \`sizerButtonUrl\` LONGTEXT NULL,
  \`measureHeading\` LONGTEXT NULL,
  \`measureDescription\` LONGTEXT NULL,
  \`measureStepsJson\` LONGTEXT NULL,
  \`ctaHeading\` LONGTEXT NULL,
  \`ctaDescription\` LONGTEXT NULL,
  \`ctaButtonText\` VARCHAR(191) NULL,
  \`ctaButtonUrl\` LONGTEXT NULL,
  \`ctaBg\` VARCHAR(191) NULL,
  \`seoTitle\` LONGTEXT NULL,
  \`metaDescription\` LONGTEXT NULL,
  \`keywords\` LONGTEXT NULL,
  \`canonicalUrl\` LONGTEXT NULL,
  \`ogTitle\` LONGTEXT NULL,
  \`ogDescription\` LONGTEXT NULL,
  \`ogImage\` LONGTEXT NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`Address\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`customerId\` VARCHAR(191) NOT NULL,
  \`type\` VARCHAR(191) NOT NULL DEFAULT 'SHIPPING',
  \`street\` LONGTEXT NOT NULL,
  \`city\` VARCHAR(191) NOT NULL,
  \`state\` VARCHAR(191) NOT NULL,
  \`postalCode\` VARCHAR(191) NOT NULL,
  \`country\` VARCHAR(191) NOT NULL,
  \`isDefault\` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`Order\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`orderNumber\` VARCHAR(191) NOT NULL,
  \`orderDate\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`customerId\` VARCHAR(191) NULL,
  \`customerName\` VARCHAR(191) NULL,
  \`customerEmail\` VARCHAR(191) NULL,
  \`customerPhone\` VARCHAR(191) NULL,
  \`billingAddress\` LONGTEXT NULL,
  \`shippingAddress\` LONGTEXT NULL,
  \`subtotal\` DOUBLE NOT NULL DEFAULT 0,
  \`tax\` DOUBLE NOT NULL DEFAULT 0,
  \`shippingFee\` DOUBLE NOT NULL DEFAULT 0,
  \`discount\` DOUBLE NOT NULL DEFAULT 0,
  \`totalAmount\` DOUBLE NOT NULL DEFAULT 0,
  \`currency\` VARCHAR(191) NOT NULL DEFAULT 'USD',
  \`orderStatus\` VARCHAR(191) NOT NULL DEFAULT 'CONFIRMED',
  \`notes\` LONGTEXT NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`Order_orderNumber_key\`(\`orderNumber\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`OrderItem\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`orderId\` VARCHAR(191) NOT NULL,
  \`productId\` VARCHAR(191) NULL,
  \`diamondId\` VARCHAR(191) NULL,
  \`productName\` VARCHAR(191) NOT NULL,
  \`sku\` VARCHAR(191) NULL,
  \`variantInfo\` LONGTEXT NULL,
  \`unitPrice\` DOUBLE NOT NULL DEFAULT 0,
  \`quantity\` INT NOT NULL DEFAULT 1,
  \`discount\` DOUBLE NOT NULL DEFAULT 0,
  \`tax\` DOUBLE NOT NULL DEFAULT 0,
  \`subtotal\` DOUBLE NOT NULL DEFAULT 0,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`Payment\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`paymentNumber\` VARCHAR(191) NULL,
  \`orderId\` VARCHAR(191) NOT NULL,
  \`paymentDate\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`amount\` DOUBLE NOT NULL,
  \`currency\` VARCHAR(191) NOT NULL DEFAULT 'USD',
  \`paymentMethod\` VARCHAR(191) NOT NULL DEFAULT 'Bank Transfer',
  \`provider\` VARCHAR(191) NULL DEFAULT 'MANUAL',
  \`transactionId\` VARCHAR(191) NULL,
  \`referenceId\` VARCHAR(191) NULL,
  \`status\` VARCHAR(191) NOT NULL DEFAULT 'SUCCESS',
  \`notes\` LONGTEXT NULL,
  \`recordedBy\` VARCHAR(191) NULL DEFAULT 'Admin',
  \`proofUrl\` LONGTEXT NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`Payment_paymentNumber_key\`(\`paymentNumber\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`Refund\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`refundNumber\` VARCHAR(191) NOT NULL,
  \`orderId\` VARCHAR(191) NOT NULL,
  \`paymentId\` VARCHAR(191) NULL,
  \`refundDate\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`amount\` DOUBLE NOT NULL,
  \`refundMethod\` VARCHAR(191) NOT NULL DEFAULT 'Original Payment Method',
  \`referenceId\` VARCHAR(191) NULL,
  \`reason\` LONGTEXT NULL,
  \`notes\` LONGTEXT NULL,
  \`recordedBy\` VARCHAR(191) NULL DEFAULT 'Admin',
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`Refund_refundNumber_key\`(\`refundNumber\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`PaymentReceipt\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`receiptNumber\` VARCHAR(191) NOT NULL,
  \`paymentId\` VARCHAR(191) NOT NULL,
  \`orderId\` VARCHAR(191) NOT NULL,
  \`amount\` DOUBLE NOT NULL,
  \`currency\` VARCHAR(191) NOT NULL DEFAULT 'USD',
  \`issuedAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`pdfUrl\` LONGTEXT NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`PaymentReceipt_receiptNumber_key\`(\`receiptNumber\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`Invoice\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`invoiceNumber\` VARCHAR(191) NOT NULL,
  \`orderId\` VARCHAR(191) NOT NULL,
  \`issuedAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`pdfUrl\` LONGTEXT NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`Invoice_invoiceNumber_key\`(\`invoiceNumber\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`Statement\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`statementNumber\` VARCHAR(191) NOT NULL,
  \`title\` VARCHAR(191) NOT NULL,
  \`type\` VARCHAR(191) NOT NULL,
  \`customerId\` VARCHAR(191) NULL,
  \`orderId\` VARCHAR(191) NULL,
  \`fromDate\` DATETIME(3) NULL,
  \`toDate\` DATETIME(3) NULL,
  \`month\` INT NULL,
  \`year\` INT NULL,
  \`pdfUrl\` LONGTEXT NULL,
  \`generatedBy\` VARCHAR(191) NOT NULL DEFAULT 'Admin',
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`Statement_statementNumber_key\`(\`statementNumber\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`PaymentMethod\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`name\` VARCHAR(191) NOT NULL,
  \`code\` VARCHAR(191) NOT NULL,
  \`isActive\` TINYINT(1) NOT NULL DEFAULT 1,
  \`sortOrder\` INT NOT NULL DEFAULT 0,
  \`description\` LONGTEXT NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`PaymentMethod_code_key\`(\`code\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`FinancialAuditLog\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`adminUser\` VARCHAR(191) NOT NULL DEFAULT 'Admin',
  \`action\` VARCHAR(191) NOT NULL,
  \`entityType\` VARCHAR(191) NOT NULL,
  \`entityId\` VARCHAR(191) NOT NULL,
  \`oldValue\` LONGTEXT NULL,
  \`newValue\` LONGTEXT NULL,
  \`reason\` LONGTEXT NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`Shipment\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`orderId\` VARCHAR(191) NOT NULL,
  \`carrier\` VARCHAR(191) NOT NULL,
  \`trackingNumber\` VARCHAR(191) NOT NULL,
  \`status\` VARCHAR(191) NOT NULL DEFAULT 'SHIPPED',
  \`shippedAt\` DATETIME(3) NULL,
  \`deliveredAt\` DATETIME(3) NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`Wishlist\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`customerId\` VARCHAR(191) NULL,
  \`sessionId\` VARCHAR(191) NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`WishlistItem\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`wishlistId\` VARCHAR(191) NOT NULL,
  \`productId\` VARCHAR(191) NULL,
  \`diamondId\` VARCHAR(191) NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`Cart\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`customerId\` VARCHAR(191) NULL,
  \`sessionId\` VARCHAR(191) NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`CartItem\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`cartId\` VARCHAR(191) NOT NULL,
  \`productId\` VARCHAR(191) NULL,
  \`diamondId\` VARCHAR(191) NULL,
  \`quantity\` INT NOT NULL DEFAULT 1,
  \`metal\` VARCHAR(191) NULL,
  \`goldColor\` VARCHAR(191) NULL,
  \`size\` VARCHAR(191) NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`Page\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`title\` VARCHAR(191) NOT NULL,
  \`slug\` VARCHAR(191) NOT NULL,
  \`content\` LONGTEXT NULL,
  \`draftContent\` LONGTEXT NULL,
  \`status\` VARCHAR(191) NOT NULL DEFAULT 'PUBLISHED',
  \`lastPublishedAt\` DATETIME(3) NULL,
  \`publishedBy\` VARCHAR(191) NULL,
  \`lastModifiedBy\` VARCHAR(191) NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`Page_slug_key\`(\`slug\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`PageSection\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`pageId\` VARCHAR(191) NOT NULL,
  \`blockType\` VARCHAR(191) NOT NULL,
  \`position\` INT NOT NULL DEFAULT 0,
  \`content\` LONGTEXT NOT NULL,
  \`isVisible\` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`PageRevision\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`pageId\` VARCHAR(191) NOT NULL,
  \`version\` INT NOT NULL,
  \`action\` VARCHAR(191) NOT NULL DEFAULT 'UPDATE',
  \`adminUser\` VARCHAR(191) NOT NULL DEFAULT 'Admin',
  \`content\` LONGTEXT NOT NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`FaqItem\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`pageId\` VARCHAR(191) NULL,
  \`question\` LONGTEXT NOT NULL,
  \`answer\` LONGTEXT NOT NULL,
  \`category\` VARCHAR(191) NOT NULL DEFAULT 'General',
  \`sortOrder\` INT NOT NULL DEFAULT 0,
  \`isPublished\` TINYINT(1) NOT NULL DEFAULT 1,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`BlogPost\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`title\` VARCHAR(191) NOT NULL,
  \`slug\` VARCHAR(191) NOT NULL,
  \`author\` VARCHAR(191) NOT NULL DEFAULT 'Floksy Concierge',
  \`publishDate\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`featuredImage\` LONGTEXT NULL,
  \`excerpt\` LONGTEXT NULL,
  \`content\` LONGTEXT NOT NULL,
  \`seoTitle\` LONGTEXT NULL,
  \`metaDescription\` LONGTEXT NULL,
  \`keywords\` LONGTEXT NULL,
  \`canonicalUrl\` LONGTEXT NULL,
  \`ogImage\` LONGTEXT NULL,
  \`isPublished\` TINYINT(1) NOT NULL DEFAULT 1,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`BlogPost_slug_key\`(\`slug\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`Menu\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`name\` VARCHAR(191) NOT NULL,
  \`location\` VARCHAR(191) NOT NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`Menu_location_key\`(\`location\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`MenuItem\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`menuId\` VARCHAR(191) NOT NULL,
  \`title\` VARCHAR(191) NOT NULL,
  \`url\` LONGTEXT NOT NULL,
  \`position\` INT NOT NULL DEFAULT 0,
  \`parentId\` VARCHAR(191) NULL,
  \`megaMenu\` LONGTEXT NULL,
  \`isVisible\` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`FilterGroup\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`key\` VARCHAR(191) NOT NULL,
  \`label\` VARCHAR(191) NOT NULL,
  \`categoryScope\` VARCHAR(191) NOT NULL DEFAULT 'ALL',
  \`targetType\` VARCHAR(191) NOT NULL DEFAULT 'JEWELLERY',
  \`filterType\` VARCHAR(191) NOT NULL DEFAULT 'MULTISELECT',
  \`sortOrder\` INT NOT NULL DEFAULT 0,
  \`isEnabled\` TINYINT(1) NOT NULL DEFAULT 1,
  \`isSystem\` TINYINT(1) NOT NULL DEFAULT 0,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`FilterGroup_key_categoryScope_key\`(\`key\`, \`categoryScope\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`FilterOption\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`filterGroupId\` VARCHAR(191) NOT NULL,
  \`label\` VARCHAR(191) NOT NULL,
  \`value\` VARCHAR(191) NOT NULL,
  \`icon\` VARCHAR(191) NULL,
  \`iconUrl\` LONGTEXT NULL,
  \`colorHex\` VARCHAR(191) NULL,
  \`sortOrder\` INT NOT NULL DEFAULT 0,
  \`isEnabled\` TINYINT(1) NOT NULL DEFAULT 1,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`Promotion\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`title\` VARCHAR(191) NOT NULL,
  \`type\` VARCHAR(191) NOT NULL DEFAULT 'PROMO_BANNER',
  \`heading\` LONGTEXT NULL,
  \`subheading\` LONGTEXT NULL,
  \`description\` LONGTEXT NULL,
  \`imageUrl\` LONGTEXT NULL,
  \`mobileImageUrl\` LONGTEXT NULL,
  \`videoUrl\` LONGTEXT NULL,
  \`buttonText\` VARCHAR(191) NULL,
  \`buttonUrl\` LONGTEXT NULL,
  \`linkUrl\` LONGTEXT NULL,
  \`backgroundColor\` VARCHAR(191) NULL,
  \`textColor\` VARCHAR(191) NULL,
  \`startDate\` DATETIME(3) NULL,
  \`endDate\` DATETIME(3) NULL,
  \`isActive\` TINYINT(1) NOT NULL DEFAULT 1,
  \`sortOrder\` INT NOT NULL DEFAULT 0,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`SeoMetadata\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`pageId\` VARCHAR(191) NULL,
  \`entityType\` VARCHAR(191) NULL,
  \`entityId\` VARCHAR(191) NULL,
  \`seoTitle\` LONGTEXT NOT NULL,
  \`metaDescription\` LONGTEXT NOT NULL,
  \`canonicalUrl\` LONGTEXT NULL,
  \`robots\` VARCHAR(191) NOT NULL DEFAULT 'index, follow',
  \`ogTitle\` LONGTEXT NULL,
  \`ogDescription\` LONGTEXT NULL,
  \`ogImage\` LONGTEXT NULL,
  \`twitterCard\` VARCHAR(191) NULL DEFAULT 'summary_large_image',
  \`twitterTitle\` LONGTEXT NULL,
  \`twitterDescription\` LONGTEXT NULL,
  \`twitterImage\` LONGTEXT NULL,
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`SeoMetadata_pageId_key\`(\`pageId\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`Redirect\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`oldUrl\` VARCHAR(191) NOT NULL,
  \`newUrl\` LONGTEXT NOT NULL,
  \`statusCode\` INT NOT NULL DEFAULT 301,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`Redirect_oldUrl_key\`(\`oldUrl\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`Media\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`name\` VARCHAR(191) NOT NULL,
  \`url\` LONGTEXT NOT NULL,
  \`fileType\` VARCHAR(191) NOT NULL,
  \`fileSize\` INT NOT NULL,
  \`altText\` LONGTEXT NULL,
  \`dimensions\` VARCHAR(191) NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`Coupon\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`code\` VARCHAR(191) NOT NULL,
  \`discountType\` VARCHAR(191) NOT NULL DEFAULT 'PERCENTAGE',
  \`discountValue\` DOUBLE NOT NULL,
  \`minOrderAmount\` DOUBLE NULL,
  \`startDate\` DATETIME(3) NULL,
  \`endDate\` DATETIME(3) NULL,
  \`usageLimit\` INT NULL,
  \`usedCount\` INT NOT NULL DEFAULT 0,
  \`isActive\` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`Coupon_code_key\`(\`code\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`Inquiry\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`name\` VARCHAR(191) NOT NULL,
  \`email\` VARCHAR(191) NOT NULL,
  \`phone\` VARCHAR(191) NULL,
  \`country\` VARCHAR(191) NULL,
  \`subject\` VARCHAR(191) NULL,
  \`message\` LONGTEXT NOT NULL,
  \`status\` VARCHAR(191) NOT NULL DEFAULT 'NEW',
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`SiteSetting\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`key\` VARCHAR(191) NOT NULL,
  \`value\` LONGTEXT NOT NULL,
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`SiteSetting_key_key\`(\`key\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`DiamondFilterConfig\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`key\` VARCHAR(191) NOT NULL,
  \`title\` VARCHAR(191) NOT NULL,
  \`filterType\` VARCHAR(191) NOT NULL DEFAULT 'MULTISELECT',
  \`sortOrder\` INT NOT NULL DEFAULT 0,
  \`isEnabled\` TINYINT(1) NOT NULL DEFAULT 1,
  \`configJson\` LONGTEXT NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`DiamondFilterConfig_key_key\`(\`key\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`DiamondFilterOption\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`configId\` VARCHAR(191) NOT NULL,
  \`label\` VARCHAR(191) NOT NULL,
  \`value\` VARCHAR(191) NOT NULL,
  \`iconUrl\` LONGTEXT NULL,
  \`colorHex\` VARCHAR(191) NULL,
  \`sortOrder\` INT NOT NULL DEFAULT 0,
  \`isEnabled\` TINYINT(1) NOT NULL DEFAULT 1,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`MegaMenuCard\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`categorySlug\` VARCHAR(191) NOT NULL,
  \`title\` VARCHAR(191) NOT NULL,
  \`subtitle\` LONGTEXT NULL,
  \`description\` LONGTEXT NULL,
  \`imageUrl\` LONGTEXT NOT NULL,
  \`mobileImageUrl\` LONGTEXT NULL,
  \`targetUrl\` LONGTEXT NOT NULL,
  \`altText\` LONGTEXT NULL,
  \`isEnabled\` TINYINT(1) NOT NULL DEFAULT 1,
  \`sortOrder\` INT NOT NULL DEFAULT 0,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`HomepageReview\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`customerName\` VARCHAR(191) NOT NULL,
  \`rating\` INT NOT NULL DEFAULT 5,
  \`reviewText\` LONGTEXT NOT NULL,
  \`customerImage\` LONGTEXT NULL,
  \`location\` VARCHAR(191) NULL,
  \`reviewDate\` VARCHAR(191) NULL,
  \`sortOrder\` INT NOT NULL DEFAULT 0,
  \`isActive\` TINYINT(1) NOT NULL DEFAULT 1,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`ProductFilterConfig\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`key\` VARCHAR(191) NOT NULL,
  \`name\` VARCHAR(191) NOT NULL,
  \`customerLabel\` VARCHAR(191) NOT NULL,
  \`filterType\` VARCHAR(191) NOT NULL DEFAULT 'Multi Select',
  \`sortOrder\` INT NOT NULL DEFAULT 0,
  \`isEnabled\` TINYINT(1) NOT NULL DEFAULT 1,
  \`applicableJewelleryTypes\` VARCHAR(191) NOT NULL DEFAULT 'All',
  \`configJson\` LONGTEXT NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`ProductFilterConfig_key_key\`(\`key\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`ProductFilterOption\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`filterId\` VARCHAR(191) NOT NULL,
  \`label\` VARCHAR(191) NOT NULL,
  \`value\` VARCHAR(191) NOT NULL,
  \`iconUrl\` LONGTEXT NULL,
  \`colorHex\` VARCHAR(191) NULL,
  \`sortOrder\` INT NOT NULL DEFAULT 0,
  \`isEnabled\` TINYINT(1) NOT NULL DEFAULT 1,
  \`applicableJewelleryTypes\` VARCHAR(191) NOT NULL DEFAULT 'All',
  \`metadataJson\` LONGTEXT NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`ProductDetailSection\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`productId\` VARCHAR(191) NOT NULL,
  \`title\` VARCHAR(191) NOT NULL,
  \`type\` VARCHAR(191) NOT NULL DEFAULT 'CUSTOM',
  \`description\` LONGTEXT NULL,
  \`displayOrder\` INT NOT NULL DEFAULT 0,
  \`isActive\` TINYINT(1) NOT NULL DEFAULT 1,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`ProductDetailItem\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`sectionId\` VARCHAR(191) NOT NULL,
  \`title\` LONGTEXT NULL,
  \`description\` LONGTEXT NULL,
  \`value\` LONGTEXT NULL,
  \`imageUrl\` LONGTEXT NULL,
  \`icon\` VARCHAR(191) NULL,
  \`displayOrder\` INT NOT NULL DEFAULT 0,
  \`isActive\` TINYINT(1) NOT NULL DEFAULT 1,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`ProductPageContent\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`productId\` VARCHAR(191) NULL,
  \`heroTitle\` LONGTEXT NULL,
  \`heroSubtitle\` LONGTEXT NULL,
  \`heroShortDescription\` LONGTEXT NULL,
  \`heroAnnouncement\` LONGTEXT NULL,
  \`heroBreadcrumbLabel\` LONGTEXT NULL,
  \`benefitsJson\` LONGTEXT NULL,
  \`accordionsJson\` LONGTEXT NULL,
  \`shippingInfoJson\` LONGTEXT NULL,
  \`craftsmanshipTitle\` LONGTEXT NULL,
  \`craftsmanshipDescription\` LONGTEXT NULL,
  \`sustainabilityInfo\` LONGTEXT NULL,
  \`manufacturingInfo\` LONGTEXT NULL,
  \`materialsInfo\` LONGTEXT NULL,
  \`certificationInfo\` LONGTEXT NULL,
  \`craftsmanshipImage\` LONGTEXT NULL,
  \`packagingHeading\` LONGTEXT NULL,
  \`packagingDescription\` LONGTEXT NULL,
  \`packagingItemsJson\` LONGTEXT NULL,
  \`packagingImageUrl\` LONGTEXT NULL,
  \`reviewsTitle\` LONGTEXT NULL,
  \`reviewsEnabled\` TINYINT(1) NOT NULL DEFAULT 1,
  \`reviewsVerifiedBadge\` TINYINT(1) NOT NULL DEFAULT 1,
  \`reviewsSubmissionEnabled\` TINYINT(1) NOT NULL DEFAULT 1,
  \`reviewsDefaultSort\` VARCHAR(191) NULL DEFAULT 'newest',
  \`similarItemsTitle\` LONGTEXT NULL,
  \`similarProductsJson\` LONGTEXT NULL,
  \`similarItemsEnabled\` TINYINT(1) NOT NULL DEFAULT 1,
  \`recentlyViewedTitle\` LONGTEXT NULL,
  \`recentlyViewedEnabled\` TINYINT(1) NOT NULL DEFAULT 1,
  \`showBenefits\` TINYINT(1) NOT NULL DEFAULT 1,
  \`showExperienceAccordion\` TINYINT(1) NOT NULL DEFAULT 1,
  \`showSpecifications\` TINYINT(1) NOT NULL DEFAULT 1,
  \`showCraftsmanshipSection\` TINYINT(1) NOT NULL DEFAULT 1,
  \`showPackagingSection\` TINYINT(1) NOT NULL DEFAULT 1,
  \`showReviews\` TINYINT(1) NOT NULL DEFAULT 1,
  \`showSimilarItems\` TINYINT(1) NOT NULL DEFAULT 1,
  \`showRecentlyViewed\` TINYINT(1) NOT NULL DEFAULT 1,
  \`showBuyNowButton\` TINYINT(1) NOT NULL DEFAULT 1,
  \`showStickyBar\` TINYINT(1) NOT NULL DEFAULT 1,
  \`showQuantitySelector\` TINYINT(1) NOT NULL DEFAULT 1,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`ProductPageContent_productId_key\`(\`productId\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- DATA INSERTIONS START HERE --
`;

function buildCompleteMysqlDump() {
  console.log('Generating complete hostinger-mysql-migration.sql with INSERT IGNORE...');
  
  const fileContent = fs.readFileSync(SOURCE_BACKUP_PATH, 'utf-8');
  const lines = fileContent.split(/\r?\n/);

  let dataInsertsSql = '';
  let inCopyBlock = false;
  let currentCopyTable = '';
  let currentCopyColumns: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const copyMatch = line.match(/^COPY public\."([^"]+)"\s*\(([^)]+)\)\s*FROM stdin;/i);
    if (copyMatch) {
      inCopyBlock = true;
      currentCopyTable = copyMatch[1];
      currentCopyColumns = copyMatch[2].split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
      continue;
    }

    if (inCopyBlock) {
      if (line.trim() === '\\.') {
        inCopyBlock = false;
        currentCopyTable = '';
        currentCopyColumns = [];
        continue;
      }

      if (line.trim() === '') continue;

      const rowValues = line.split('\t');
      const formattedValues = rowValues.map((val) => {
        if (val === '\\N' || val === 'null' || val === 'NULL') {
          return 'NULL';
        }
        if (val === 't') return '1';
        if (val === 'f') return '0';
        let str = val
          .replace(/\\/g, '\\\\')
          .replace(/'/g, "\\'")
          .replace(/\r/g, '\\r')
          .replace(/\n/g, '\\n')
          .replace(/\t/g, '\\t');
        return `'${str}'`;
      });

      const colsFormatted = currentCopyColumns.map((c) => `\`${c}\``).join(', ');
      // Use INSERT IGNORE INTO so duplicate rows are skipped without error
      dataInsertsSql += `INSERT IGNORE INTO \`${currentCopyTable}\` (${colsFormatted}) VALUES (${formattedValues.join(', ')});\n`;
    }
  }

  const completeSql = ALL_57_TABLE_DDLS + '\n' + dataInsertsSql + '\nSET FOREIGN_KEY_CHECKS = 1;\n';

  fs.writeFileSync(OUTPUT_MYSQL_SQL_PATH, completeSql, 'utf-8');
  console.log(`✅ Complete hostinger-mysql-migration.sql with INSERT IGNORE created at ${OUTPUT_MYSQL_SQL_PATH}!`);
}

buildCompleteMysqlDump();
