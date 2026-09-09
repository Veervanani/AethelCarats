-- ==========================================================================
-- AETHELCARATS LUXURY FINE JEWELLERY & DIAMOND VAULT PLATFORM
-- Complete Database Schema (DDL)
-- Target Engine: MySQL 8.0+ / MariaDB 10.4+
-- Generated: 2026-09-09T10:13:43.056Z
-- ==========================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET NAMES utf8mb4;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

DROP TABLE IF EXISTS `ActivityLog`;
CREATE TABLE `ActivityLog` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `action` varchar(191) NOT NULL,
  `object` varchar(191) NOT NULL,
  `oldValue` longtext DEFAULT NULL,
  `newValue` longtext DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Address`;
CREATE TABLE `Address` (
  `id` varchar(191) NOT NULL,
  `customerId` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL DEFAULT 'SHIPPING',
  `street` longtext NOT NULL,
  `city` varchar(191) NOT NULL,
  `state` varchar(191) NOT NULL,
  `postalCode` varchar(191) NOT NULL,
  `country` varchar(191) NOT NULL,
  `isDefault` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `BlogPost`;
CREATE TABLE `BlogPost` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `author` varchar(191) NOT NULL DEFAULT 'Aura Concierge',
  `publishDate` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `featuredImage` longtext DEFAULT NULL,
  `excerpt` longtext DEFAULT NULL,
  `content` longtext NOT NULL,
  `seoTitle` longtext DEFAULT NULL,
  `metaDescription` longtext DEFAULT NULL,
  `keywords` longtext DEFAULT NULL,
  `canonicalUrl` longtext DEFAULT NULL,
  `ogImage` longtext DEFAULT NULL,
  `isPublished` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `BlogPost_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Cart`;
CREATE TABLE `Cart` (
  `id` varchar(191) NOT NULL,
  `customerId` varchar(191) DEFAULT NULL,
  `sessionId` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `CartItem`;
CREATE TABLE `CartItem` (
  `id` varchar(191) NOT NULL,
  `cartId` varchar(191) NOT NULL,
  `productId` varchar(191) DEFAULT NULL,
  `diamondId` varchar(191) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `metal` varchar(191) DEFAULT NULL,
  `goldColor` varchar(191) DEFAULT NULL,
  `size` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Category`;
CREATE TABLE `Category` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` longtext DEFAULT NULL,
  `bannerImage` longtext DEFAULT NULL,
  `image` longtext DEFAULT NULL,
  `link` longtext DEFAULT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `enableRingSize` tinyint(1) NOT NULL DEFAULT 1,
  `enableMetal` tinyint(1) NOT NULL DEFAULT 1,
  `enableDiamond` tinyint(1) NOT NULL DEFAULT 1,
  `enableDiamondShape` tinyint(1) NOT NULL DEFAULT 1,
  `enableDiamondCert` tinyint(1) NOT NULL DEFAULT 1,
  `enableEngraving` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Category_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Collection`;
CREATE TABLE `Collection` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` longtext DEFAULT NULL,
  `bannerImage` longtext DEFAULT NULL,
  `thumbnailImage` longtext DEFAULT NULL,
  `isFeatured` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Collection_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Coupon`;
CREATE TABLE `Coupon` (
  `id` varchar(191) NOT NULL,
  `code` varchar(191) NOT NULL,
  `discountType` varchar(191) NOT NULL DEFAULT 'PERCENTAGE',
  `discountValue` double NOT NULL,
  `minOrderAmount` double DEFAULT NULL,
  `startDate` datetime(3) DEFAULT NULL,
  `endDate` datetime(3) DEFAULT NULL,
  `usageLimit` int(11) DEFAULT NULL,
  `usedCount` int(11) NOT NULL DEFAULT 0,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Coupon_code_key` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `CustomRequest`;
CREATE TABLE `CustomRequest` (
  `id` varchar(191) NOT NULL,
  `requestNumber` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `whatsapp` varchar(191) NOT NULL,
  `jewelleryType` varchar(191) NOT NULL,
  `metal` varchar(191) DEFAULT NULL,
  `diamondPreference` varchar(191) DEFAULT NULL,
  `budget` varchar(191) DEFAULT NULL,
  `deadline` varchar(191) DEFAULT NULL,
  `description` longtext NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'NEW',
  `cadFileUrl` longtext DEFAULT NULL,
  `adminNotes` longtext DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `CustomRequest_requestNumber_key` (`requestNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `CustomRequestFile`;
CREATE TABLE `CustomRequestFile` (
  `id` varchar(191) NOT NULL,
  `customRequestId` varchar(191) NOT NULL,
  `fileUrl` longtext NOT NULL,
  `fileType` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `CustomTimelineItem`;
CREATE TABLE `CustomTimelineItem` (
  `id` varchar(191) NOT NULL,
  `customRequestId` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL,
  `note` longtext DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Customer`;
CREATE TABLE `Customer` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `country` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Customer_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `CustomerSpecificPrice`;
CREATE TABLE `CustomerSpecificPrice` (
  `id` varchar(191) NOT NULL,
  `customerId` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `specialPrice` double DEFAULT NULL,
  `priceAdjustment` double DEFAULT 0,
  `metalsPriceAdjustments` longtext DEFAULT NULL,
  `diamondsPriceAdjustments` longtext DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `CustomerSpecificPrice_customerId_productId_key` (`customerId`,`productId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Diamond`;
CREATE TABLE `Diamond` (
  `id` varchar(191) NOT NULL,
  `diamondId` varchar(191) NOT NULL,
  `stockId` varchar(191) DEFAULT NULL,
  `sku` varchar(191) DEFAULT NULL,
  `diamondType` varchar(191) NOT NULL DEFAULT 'NATURAL',
  `growthType` varchar(191) DEFAULT NULL,
  `shape` varchar(191) NOT NULL,
  `carat` double NOT NULL,
  `color` varchar(191) NOT NULL,
  `clarity` varchar(191) NOT NULL,
  `cut` varchar(191) DEFAULT NULL,
  `polish` varchar(191) DEFAULT NULL,
  `symmetry` varchar(191) DEFAULT NULL,
  `fluorescence` varchar(191) DEFAULT NULL,
  `length` double DEFAULT NULL,
  `width` double DEFAULT NULL,
  `depth` double DEFAULT NULL,
  `ratio` double DEFAULT NULL,
  `tablePercent` double DEFAULT NULL,
  `depthPercent` double DEFAULT NULL,
  `crownAngle` double DEFAULT NULL,
  `pavilionAngle` double DEFAULT NULL,
  `girdle` varchar(191) DEFAULT NULL,
  `culet` varchar(191) DEFAULT NULL,
  `lab` varchar(191) DEFAULT NULL,
  `certificateNumber` varchar(191) DEFAULT NULL,
  `certificateUrl` longtext DEFAULT NULL,
  `price` double NOT NULL,
  `pricePerCarat` double DEFAULT NULL,
  `currency` varchar(191) NOT NULL DEFAULT 'USD',
  `status` varchar(191) NOT NULL DEFAULT 'AVAILABLE',
  `fancyColor` varchar(191) DEFAULT NULL,
  `fancyOvertone` varchar(191) DEFAULT NULL,
  `fancyIntensity` varchar(191) DEFAULT NULL,
  `imageUrl` longtext DEFAULT NULL,
  `videoUrl` longtext DEFAULT NULL,
  `video360Url` longtext DEFAULT NULL,
  `certificatePdfUrl` longtext DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Diamond_diamondId_key` (`diamondId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `DiamondFilterConfig`;
CREATE TABLE `DiamondFilterConfig` (
  `id` varchar(191) NOT NULL,
  `key` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `filterType` varchar(191) NOT NULL DEFAULT 'MULTISELECT',
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `isEnabled` tinyint(1) NOT NULL DEFAULT 1,
  `configJson` longtext DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `DiamondFilterConfig_key_key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `DiamondFilterOption`;
CREATE TABLE `DiamondFilterOption` (
  `id` varchar(191) NOT NULL,
  `configId` varchar(191) NOT NULL,
  `label` varchar(191) NOT NULL,
  `value` varchar(191) NOT NULL,
  `iconUrl` longtext DEFAULT NULL,
  `colorHex` varchar(191) DEFAULT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `isEnabled` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `DiamondImportHistory`;
CREATE TABLE `DiamondImportHistory` (
  `id` varchar(191) NOT NULL,
  `fileName` varchar(191) NOT NULL,
  `totalRows` int(11) NOT NULL,
  `importedCount` int(11) NOT NULL,
  `updatedCount` int(11) NOT NULL,
  `failedCount` int(11) NOT NULL,
  `errorReport` longtext DEFAULT NULL,
  `importedBy` varchar(191) NOT NULL DEFAULT 'Admin',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `FaqItem`;
CREATE TABLE `FaqItem` (
  `id` varchar(191) NOT NULL,
  `pageId` varchar(191) DEFAULT NULL,
  `question` longtext NOT NULL,
  `answer` longtext NOT NULL,
  `category` varchar(191) NOT NULL DEFAULT 'General',
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `isPublished` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `FilterGroup`;
CREATE TABLE `FilterGroup` (
  `id` varchar(191) NOT NULL,
  `key` varchar(191) NOT NULL,
  `label` varchar(191) NOT NULL,
  `categoryScope` varchar(191) NOT NULL DEFAULT 'ALL',
  `targetType` varchar(191) NOT NULL DEFAULT 'JEWELLERY',
  `filterType` varchar(191) NOT NULL DEFAULT 'MULTISELECT',
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `isEnabled` tinyint(1) NOT NULL DEFAULT 1,
  `isSystem` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `FilterGroup_key_categoryScope_key` (`key`,`categoryScope`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `FilterOption`;
CREATE TABLE `FilterOption` (
  `id` varchar(191) NOT NULL,
  `filterGroupId` varchar(191) NOT NULL,
  `label` varchar(191) NOT NULL,
  `value` varchar(191) NOT NULL,
  `icon` varchar(191) DEFAULT NULL,
  `iconUrl` longtext DEFAULT NULL,
  `colorHex` varchar(191) DEFAULT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `isEnabled` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `FinancialAuditLog`;
CREATE TABLE `FinancialAuditLog` (
  `id` varchar(191) NOT NULL,
  `adminUser` varchar(191) NOT NULL DEFAULT 'Admin',
  `action` varchar(191) NOT NULL,
  `entityType` varchar(191) NOT NULL,
  `entityId` varchar(191) NOT NULL,
  `oldValue` longtext DEFAULT NULL,
  `newValue` longtext DEFAULT NULL,
  `reason` longtext DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `HeroBanner`;
CREATE TABLE `HeroBanner` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `subtitle` varchar(191) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `primaryCtaText` varchar(191) DEFAULT NULL,
  `primaryCtaLink` varchar(191) DEFAULT NULL,
  `secondaryCtaText` varchar(191) DEFAULT NULL,
  `secondaryCtaLink` varchar(191) DEFAULT NULL,
  `productType` varchar(191) NOT NULL DEFAULT 'Engagement Ring',
  `imagePath` varchar(191) NOT NULL,
  `mobileImagePath` varchar(191) DEFAULT NULL,
  `imageAlt` varchar(191) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `displayOrder` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `HomepageReview`;
CREATE TABLE `HomepageReview` (
  `id` varchar(191) NOT NULL,
  `customerName` varchar(191) NOT NULL,
  `rating` int(11) NOT NULL DEFAULT 5,
  `reviewText` longtext NOT NULL,
  `customerImage` longtext DEFAULT NULL,
  `location` varchar(191) DEFAULT NULL,
  `reviewDate` varchar(191) DEFAULT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Inquiry`;
CREATE TABLE `Inquiry` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `country` varchar(191) DEFAULT NULL,
  `subject` varchar(191) DEFAULT NULL,
  `message` longtext NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'NEW',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Invoice`;
CREATE TABLE `Invoice` (
  `id` varchar(191) NOT NULL,
  `invoiceNumber` varchar(191) NOT NULL,
  `orderId` varchar(191) NOT NULL,
  `issuedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `pdfUrl` longtext DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Invoice_invoiceNumber_key` (`invoiceNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Media`;
CREATE TABLE `Media` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `url` longtext NOT NULL,
  `fileType` varchar(191) NOT NULL,
  `fileSize` int(11) NOT NULL,
  `altText` longtext DEFAULT NULL,
  `dimensions` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `MegaMenuCard`;
CREATE TABLE `MegaMenuCard` (
  `id` varchar(191) NOT NULL,
  `categorySlug` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `subtitle` longtext DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `imageUrl` longtext NOT NULL,
  `mobileImageUrl` longtext DEFAULT NULL,
  `targetUrl` longtext NOT NULL,
  `altText` longtext DEFAULT NULL,
  `isEnabled` tinyint(1) NOT NULL DEFAULT 1,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Menu`;
CREATE TABLE `Menu` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `location` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Menu_location_key` (`location`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `MenuItem`;
CREATE TABLE `MenuItem` (
  `id` varchar(191) NOT NULL,
  `menuId` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `url` longtext NOT NULL,
  `position` int(11) NOT NULL DEFAULT 0,
  `parentId` varchar(191) DEFAULT NULL,
  `megaMenu` longtext DEFAULT NULL,
  `isVisible` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Order`;
CREATE TABLE `Order` (
  `id` varchar(191) NOT NULL,
  `orderNumber` varchar(191) NOT NULL,
  `orderDate` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `customerId` varchar(191) DEFAULT NULL,
  `customerName` varchar(191) DEFAULT NULL,
  `customerEmail` varchar(191) DEFAULT NULL,
  `customerPhone` varchar(191) DEFAULT NULL,
  `billingAddress` longtext DEFAULT NULL,
  `shippingAddress` longtext DEFAULT NULL,
  `subtotal` double NOT NULL DEFAULT 0,
  `tax` double NOT NULL DEFAULT 0,
  `shippingFee` double NOT NULL DEFAULT 0,
  `discount` double NOT NULL DEFAULT 0,
  `totalAmount` double NOT NULL DEFAULT 0,
  `currency` varchar(191) NOT NULL DEFAULT 'USD',
  `orderStatus` varchar(191) NOT NULL DEFAULT 'CONFIRMED',
  `notes` longtext DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Order_orderNumber_key` (`orderNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `OrderItem`;
CREATE TABLE `OrderItem` (
  `id` varchar(191) NOT NULL,
  `orderId` varchar(191) NOT NULL,
  `productId` varchar(191) DEFAULT NULL,
  `diamondId` varchar(191) DEFAULT NULL,
  `productName` varchar(191) NOT NULL,
  `sku` varchar(191) DEFAULT NULL,
  `variantInfo` longtext DEFAULT NULL,
  `unitPrice` double NOT NULL DEFAULT 0,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `discount` double NOT NULL DEFAULT 0,
  `tax` double NOT NULL DEFAULT 0,
  `subtotal` double NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Page`;
CREATE TABLE `Page` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `content` longtext DEFAULT NULL,
  `draftContent` longtext DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'PUBLISHED',
  `lastPublishedAt` datetime(3) DEFAULT NULL,
  `publishedBy` varchar(191) DEFAULT NULL,
  `lastModifiedBy` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Page_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `PageRevision`;
CREATE TABLE `PageRevision` (
  `id` varchar(191) NOT NULL,
  `pageId` varchar(191) NOT NULL,
  `version` int(11) NOT NULL,
  `action` varchar(191) NOT NULL DEFAULT 'UPDATE',
  `adminUser` varchar(191) NOT NULL DEFAULT 'Admin',
  `content` longtext NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `PageSection`;
CREATE TABLE `PageSection` (
  `id` varchar(191) NOT NULL,
  `pageId` varchar(191) NOT NULL,
  `blockType` varchar(191) NOT NULL,
  `position` int(11) NOT NULL DEFAULT 0,
  `content` longtext NOT NULL,
  `isVisible` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Payment`;
CREATE TABLE `Payment` (
  `id` varchar(191) NOT NULL,
  `paymentNumber` varchar(191) DEFAULT NULL,
  `orderId` varchar(191) NOT NULL,
  `paymentDate` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `amount` double NOT NULL,
  `currency` varchar(191) NOT NULL DEFAULT 'USD',
  `paymentMethod` varchar(191) NOT NULL DEFAULT 'Bank Transfer',
  `provider` varchar(191) DEFAULT 'MANUAL',
  `transactionId` varchar(191) DEFAULT NULL,
  `referenceId` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'SUCCESS',
  `notes` longtext DEFAULT NULL,
  `recordedBy` varchar(191) DEFAULT 'Admin',
  `proofUrl` longtext DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Payment_paymentNumber_key` (`paymentNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `PaymentMethod`;
CREATE TABLE `PaymentMethod` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `code` varchar(191) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `description` longtext DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `PaymentMethod_code_key` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `PaymentReceipt`;
CREATE TABLE `PaymentReceipt` (
  `id` varchar(191) NOT NULL,
  `receiptNumber` varchar(191) NOT NULL,
  `paymentId` varchar(191) NOT NULL,
  `orderId` varchar(191) NOT NULL,
  `amount` double NOT NULL,
  `currency` varchar(191) NOT NULL DEFAULT 'USD',
  `issuedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `pdfUrl` longtext DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `PaymentReceipt_receiptNumber_key` (`receiptNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Product`;
CREATE TABLE `Product` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `sku` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `categoryId` varchar(191) DEFAULT NULL,
  `collectionId` varchar(191) DEFAULT NULL,
  `shortDescription` longtext DEFAULT NULL,
  `fullDescription` longtext DEFAULT NULL,
  `specifications` longtext DEFAULT NULL,
  `careInstructions` longtext DEFAULT NULL,
  `jewelleryType` varchar(191) DEFAULT NULL,
  `ringStyle` varchar(191) DEFAULT NULL,
  `ringSize` varchar(191) DEFAULT NULL,
  `ringWidth` varchar(191) DEFAULT NULL,
  `gender` varchar(191) DEFAULT 'Unisex',
  `metal` varchar(191) DEFAULT NULL,
  `metalColor` varchar(191) DEFAULT NULL,
  `goldPurity` varchar(191) DEFAULT NULL,
  `goldColor` varchar(191) DEFAULT NULL,
  `goldWeight` double DEFAULT NULL,
  `diamondType` varchar(191) DEFAULT NULL,
  `shape` varchar(191) DEFAULT NULL,
  `carat` double DEFAULT NULL,
  `color` varchar(191) DEFAULT NULL,
  `colorType` varchar(191) DEFAULT NULL,
  `fancyColor` varchar(191) DEFAULT NULL,
  `fancyIntensity` varchar(191) DEFAULT NULL,
  `fancyModifier` varchar(191) DEFAULT NULL,
  `clarity` varchar(191) DEFAULT NULL,
  `cut` varchar(191) DEFAULT NULL,
  `polish` varchar(191) DEFAULT NULL,
  `symmetry` varchar(191) DEFAULT NULL,
  `fluorescence` varchar(191) DEFAULT NULL,
  `certificateNo` varchar(191) DEFAULT NULL,
  `certification` varchar(191) DEFAULT NULL,
  `gemstone` varchar(191) DEFAULT NULL,
  `gemstoneColor` varchar(191) DEFAULT NULL,
  `pearlType` varchar(191) DEFAULT NULL,
  `birthstone` varchar(191) DEFAULT NULL,
  `plainMetal` tinyint(1) NOT NULL DEFAULT 0,
  `onSale` tinyint(1) NOT NULL DEFAULT 0,
  `engravable` tinyint(1) NOT NULL DEFAULT 0,
  `metaTitle` longtext DEFAULT NULL,
  `metaDescription` longtext DEFAULT NULL,
  `metaKeywords` longtext DEFAULT NULL,
  `price` double NOT NULL,
  `comparePrice` double DEFAULT NULL,
  `salePrice` double DEFAULT NULL,
  `currency` varchar(191) NOT NULL DEFAULT 'USD',
  `stockQuantity` int(11) NOT NULL DEFAULT 10,
  `status` varchar(191) NOT NULL DEFAULT 'ACTIVE',
  `mainImage` longtext NOT NULL,
  `secondaryImage` longtext DEFAULT NULL,
  `isFeatured` tinyint(1) NOT NULL DEFAULT 0,
  `isNewArrival` tinyint(1) NOT NULL DEFAULT 1,
  `isBestseller` tinyint(1) NOT NULL DEFAULT 0,
  `isSettingOnly` tinyint(1) NOT NULL DEFAULT 0,
  `pricingMode` varchar(191) NOT NULL DEFAULT 'BASE',
  `enableMetalSelection` tinyint(1) NOT NULL DEFAULT 1,
  `enableDiamondSelection` tinyint(1) NOT NULL DEFAULT 1,
  `enableDiamondShape` tinyint(1) NOT NULL DEFAULT 1,
  `enableCustomOptions` tinyint(1) NOT NULL DEFAULT 0,
  `variationsJson` longtext DEFAULT NULL,
  `customOptionsJson` longtext DEFAULT NULL,
  `shippingInfoJson` longtext DEFAULT NULL,
  `enableRingSize` tinyint(1) NOT NULL DEFAULT 0,
  `ringSizeMode` varchar(191) NOT NULL DEFAULT 'CUSTOMER_SELECTABLE',
  `fixedRingSize` varchar(191) DEFAULT '7',
  `availableRingSizes` longtext DEFAULT NULL,
  `isRingSizeRequired` tinyint(1) NOT NULL DEFAULT 1,
  `metalsConfig` longtext DEFAULT NULL,
  `diamondsConfig` longtext DEFAULT NULL,
  `benefitsConfig` longtext DEFAULT NULL,
  `accordionsConfig` longtext DEFAULT NULL,
  `pricingMatrix` longtext DEFAULT NULL,
  `draftData` longtext DEFAULT NULL,
  `ogImage` longtext DEFAULT NULL,
  `schemaInformation` longtext DEFAULT NULL,
  `title` longtext DEFAULT NULL,
  `masterPrice14k` double DEFAULT NULL,
  `masterPrice18k` double DEFAULT NULL,
  `masterPriceSilver` double DEFAULT NULL,
  `diamondDetailsJson` longtext DEFAULT NULL,
  `internalTagsJson` longtext DEFAULT NULL,
  `seoSocialJson` longtext DEFAULT NULL,
  `processingTimeDays` int(11) DEFAULT 3,
  `craftsmanshipHeading` longtext DEFAULT NULL,
  `craftsmanshipStory` longtext DEFAULT NULL,
  `editorialImage` longtext DEFAULT NULL,
  `recommendedProductIds` longtext DEFAULT NULL,
  `completeLookProductIds` longtext DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Product_sku_key` (`sku`),
  UNIQUE KEY `Product_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `ProductDetailItem`;
CREATE TABLE `ProductDetailItem` (
  `id` varchar(191) NOT NULL,
  `sectionId` varchar(191) NOT NULL,
  `title` longtext DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `value` longtext DEFAULT NULL,
  `imageUrl` longtext DEFAULT NULL,
  `icon` varchar(191) DEFAULT NULL,
  `displayOrder` int(11) NOT NULL DEFAULT 0,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `ProductDetailSection`;
CREATE TABLE `ProductDetailSection` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL DEFAULT 'CUSTOM',
  `description` longtext DEFAULT NULL,
  `displayOrder` int(11) NOT NULL DEFAULT 0,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `ProductFilterConfig`;
CREATE TABLE `ProductFilterConfig` (
  `id` varchar(191) NOT NULL,
  `key` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `customerLabel` varchar(191) NOT NULL,
  `filterType` varchar(191) NOT NULL DEFAULT 'Multi Select',
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `isEnabled` tinyint(1) NOT NULL DEFAULT 1,
  `applicableJewelleryTypes` varchar(191) NOT NULL DEFAULT 'All',
  `configJson` longtext DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductFilterConfig_key_key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `ProductFilterOption`;
CREATE TABLE `ProductFilterOption` (
  `id` varchar(191) NOT NULL,
  `filterId` varchar(191) NOT NULL,
  `label` varchar(191) NOT NULL,
  `value` varchar(191) NOT NULL,
  `iconUrl` longtext DEFAULT NULL,
  `colorHex` varchar(191) DEFAULT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `isEnabled` tinyint(1) NOT NULL DEFAULT 1,
  `applicableJewelleryTypes` varchar(191) NOT NULL DEFAULT 'All',
  `metadataJson` longtext DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `ProductImage`;
CREATE TABLE `ProductImage` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `url` longtext NOT NULL,
  `altText` longtext DEFAULT NULL,
  `title` longtext DEFAULT NULL,
  `imageType` varchar(191) DEFAULT NULL,
  `position` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `ProductPageContent`;
CREATE TABLE `ProductPageContent` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) DEFAULT NULL,
  `heroTitle` longtext DEFAULT NULL,
  `heroSubtitle` longtext DEFAULT NULL,
  `heroShortDescription` longtext DEFAULT NULL,
  `heroAnnouncement` longtext DEFAULT NULL,
  `heroBreadcrumbLabel` longtext DEFAULT NULL,
  `benefitsJson` longtext DEFAULT NULL,
  `accordionsJson` longtext DEFAULT NULL,
  `shippingInfoJson` longtext DEFAULT NULL,
  `craftsmanshipTitle` longtext DEFAULT NULL,
  `craftsmanshipDescription` longtext DEFAULT NULL,
  `sustainabilityInfo` longtext DEFAULT NULL,
  `manufacturingInfo` longtext DEFAULT NULL,
  `materialsInfo` longtext DEFAULT NULL,
  `certificationInfo` longtext DEFAULT NULL,
  `craftsmanshipImage` longtext DEFAULT NULL,
  `packagingHeading` longtext DEFAULT NULL,
  `packagingDescription` longtext DEFAULT NULL,
  `packagingItemsJson` longtext DEFAULT NULL,
  `packagingImageUrl` longtext DEFAULT NULL,
  `reviewsTitle` longtext DEFAULT NULL,
  `reviewsEnabled` tinyint(1) NOT NULL DEFAULT 1,
  `reviewsVerifiedBadge` tinyint(1) NOT NULL DEFAULT 1,
  `reviewsSubmissionEnabled` tinyint(1) NOT NULL DEFAULT 1,
  `reviewsDefaultSort` varchar(191) DEFAULT 'newest',
  `similarItemsTitle` longtext DEFAULT NULL,
  `similarProductsJson` longtext DEFAULT NULL,
  `similarItemsEnabled` tinyint(1) NOT NULL DEFAULT 1,
  `recentlyViewedTitle` longtext DEFAULT NULL,
  `recentlyViewedEnabled` tinyint(1) NOT NULL DEFAULT 1,
  `showBenefits` tinyint(1) NOT NULL DEFAULT 1,
  `showExperienceAccordion` tinyint(1) NOT NULL DEFAULT 1,
  `showSpecifications` tinyint(1) NOT NULL DEFAULT 1,
  `showCraftsmanshipSection` tinyint(1) NOT NULL DEFAULT 1,
  `showPackagingSection` tinyint(1) NOT NULL DEFAULT 1,
  `showReviews` tinyint(1) NOT NULL DEFAULT 1,
  `showSimilarItems` tinyint(1) NOT NULL DEFAULT 1,
  `showRecentlyViewed` tinyint(1) NOT NULL DEFAULT 1,
  `showBuyNowButton` tinyint(1) NOT NULL DEFAULT 1,
  `showStickyBar` tinyint(1) NOT NULL DEFAULT 1,
  `showQuantitySelector` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductPageContent_productId_key` (`productId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `ProductVariant`;
CREATE TABLE `ProductVariant` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `sku` varchar(191) NOT NULL,
  `metal` varchar(191) DEFAULT NULL,
  `goldColor` varchar(191) DEFAULT NULL,
  `size` varchar(191) DEFAULT NULL,
  `price` double NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 5,
  `weight` double DEFAULT NULL,
  `image` longtext DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductVariant_sku_key` (`sku`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `ProductVideo`;
CREATE TABLE `ProductVideo` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `url` longtext NOT NULL,
  `position` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Promotion`;
CREATE TABLE `Promotion` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL DEFAULT 'PROMO_BANNER',
  `heading` longtext DEFAULT NULL,
  `subheading` longtext DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `imageUrl` longtext DEFAULT NULL,
  `mobileImageUrl` longtext DEFAULT NULL,
  `videoUrl` longtext DEFAULT NULL,
  `buttonText` varchar(191) DEFAULT NULL,
  `buttonUrl` longtext DEFAULT NULL,
  `linkUrl` longtext DEFAULT NULL,
  `backgroundColor` varchar(191) DEFAULT NULL,
  `textColor` varchar(191) DEFAULT NULL,
  `startDate` datetime(3) DEFAULT NULL,
  `endDate` datetime(3) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Redirect`;
CREATE TABLE `Redirect` (
  `id` varchar(191) NOT NULL,
  `oldUrl` varchar(191) NOT NULL,
  `newUrl` longtext NOT NULL,
  `statusCode` int(11) NOT NULL DEFAULT 301,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Redirect_oldUrl_key` (`oldUrl`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Refund`;
CREATE TABLE `Refund` (
  `id` varchar(191) NOT NULL,
  `refundNumber` varchar(191) NOT NULL,
  `orderId` varchar(191) NOT NULL,
  `paymentId` varchar(191) DEFAULT NULL,
  `refundDate` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `amount` double NOT NULL,
  `refundMethod` varchar(191) NOT NULL DEFAULT 'Original Payment Method',
  `referenceId` varchar(191) DEFAULT NULL,
  `reason` longtext DEFAULT NULL,
  `notes` longtext DEFAULT NULL,
  `recordedBy` varchar(191) DEFAULT 'Admin',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Refund_refundNumber_key` (`refundNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Review`;
CREATE TABLE `Review` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `author` varchar(191) NOT NULL,
  `email` varchar(191) DEFAULT NULL,
  `rating` int(11) NOT NULL DEFAULT 5,
  `comment` longtext NOT NULL,
  `isApproved` tinyint(1) NOT NULL DEFAULT 0,
  `isFeatured` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `RingSizeGuide`;
CREATE TABLE `RingSizeGuide` (
  `id` varchar(191) NOT NULL DEFAULT 'main',
  `title` varchar(191) NOT NULL DEFAULT 'Ring Size Guide',
  `slug` varchar(191) NOT NULL DEFAULT 'find-your-ring-size',
  `status` varchar(191) NOT NULL DEFAULT 'PUBLISHED',
  `heroTitle` longtext DEFAULT NULL,
  `heroSubtitle` longtext DEFAULT NULL,
  `heroImage` longtext DEFAULT NULL,
  `heroImagePosition` varchar(191) DEFAULT 'center',
  `heroBg` varchar(191) DEFAULT '#19202A',
  `heroCtaText` varchar(191) DEFAULT NULL,
  `heroCtaUrl` longtext DEFAULT NULL,
  `introHeading` longtext DEFAULT NULL,
  `introParagraphs` longtext DEFAULT NULL,
  `introContent` longtext DEFAULT NULL,
  `infoHeading` longtext DEFAULT NULL,
  `infoDescription` longtext DEFAULT NULL,
  `chartImage` longtext DEFAULT NULL,
  `chartTitle` longtext DEFAULT NULL,
  `chartDescription` longtext DEFAULT NULL,
  `conversionsJson` longtext DEFAULT NULL,
  `sizerHeading` longtext DEFAULT NULL,
  `sizerDescription` longtext DEFAULT NULL,
  `sizerImage` longtext DEFAULT NULL,
  `sizerButtonText` varchar(191) DEFAULT NULL,
  `sizerButtonUrl` longtext DEFAULT NULL,
  `measureHeading` longtext DEFAULT NULL,
  `measureDescription` longtext DEFAULT NULL,
  `measureStepsJson` longtext DEFAULT NULL,
  `ctaHeading` longtext DEFAULT NULL,
  `ctaDescription` longtext DEFAULT NULL,
  `ctaButtonText` varchar(191) DEFAULT NULL,
  `ctaButtonUrl` longtext DEFAULT NULL,
  `ctaBg` varchar(191) DEFAULT NULL,
  `seoTitle` longtext DEFAULT NULL,
  `metaDescription` longtext DEFAULT NULL,
  `keywords` longtext DEFAULT NULL,
  `canonicalUrl` longtext DEFAULT NULL,
  `ogTitle` longtext DEFAULT NULL,
  `ogDescription` longtext DEFAULT NULL,
  `ogImage` longtext DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `SeoMetadata`;
CREATE TABLE `SeoMetadata` (
  `id` varchar(191) NOT NULL,
  `pageId` varchar(191) DEFAULT NULL,
  `entityType` varchar(191) DEFAULT NULL,
  `entityId` varchar(191) DEFAULT NULL,
  `seoTitle` longtext NOT NULL,
  `metaDescription` longtext NOT NULL,
  `canonicalUrl` longtext DEFAULT NULL,
  `robots` varchar(191) NOT NULL DEFAULT 'index, follow',
  `ogTitle` longtext DEFAULT NULL,
  `ogDescription` longtext DEFAULT NULL,
  `ogImage` longtext DEFAULT NULL,
  `twitterCard` varchar(191) DEFAULT 'summary_large_image',
  `twitterTitle` longtext DEFAULT NULL,
  `twitterDescription` longtext DEFAULT NULL,
  `twitterImage` longtext DEFAULT NULL,
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `SeoMetadata_pageId_key` (`pageId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Shipment`;
CREATE TABLE `Shipment` (
  `id` varchar(191) NOT NULL,
  `orderId` varchar(191) NOT NULL,
  `carrier` varchar(191) NOT NULL,
  `trackingNumber` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'SHIPPED',
  `shippedAt` datetime(3) DEFAULT NULL,
  `deliveredAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `SiteSetting`;
CREATE TABLE `SiteSetting` (
  `id` varchar(191) NOT NULL,
  `key` varchar(191) NOT NULL,
  `value` longtext NOT NULL,
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `SiteSetting_key_key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Statement`;
CREATE TABLE `Statement` (
  `id` varchar(191) NOT NULL,
  `statementNumber` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `customerId` varchar(191) DEFAULT NULL,
  `orderId` varchar(191) DEFAULT NULL,
  `fromDate` datetime(3) DEFAULT NULL,
  `toDate` datetime(3) DEFAULT NULL,
  `month` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `pdfUrl` longtext DEFAULT NULL,
  `generatedBy` varchar(191) NOT NULL DEFAULT 'Admin',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Statement_statementNumber_key` (`statementNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `passwordHash` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL DEFAULT 'CUSTOMER',
  `avatar` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Wishlist`;
CREATE TABLE `Wishlist` (
  `id` varchar(191) NOT NULL,
  `customerId` varchar(191) DEFAULT NULL,
  `sessionId` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `WishlistItem`;
CREATE TABLE `WishlistItem` (
  `id` varchar(191) NOT NULL,
  `wishlistId` varchar(191) NOT NULL,
  `productId` varchar(191) DEFAULT NULL,
  `diamondId` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
