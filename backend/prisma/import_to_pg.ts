import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const dumpPath = path.join(__dirname, 'sqlite_dump.json');
const dumpData = JSON.parse(fs.readFileSync(dumpPath, 'utf-8'));

function parseBool(val: any): boolean {
  if (val === 1 || val === '1' || val === true || val === 'true') return true;
  return false;
}

function parseDate(val: any): Date | null {
  if (!val) return null;
  return new Date(val);
}

async function importAll() {
  console.log('🚀 STARTING IMPORT FROM SQLITE DUMP TO POSTGRESQL...');

  // 1. User
  if (dumpData.User?.length) {
    console.log(`Importing ${dumpData.User.length} User records...`);
    for (const r of dumpData.User) {
      await prisma.user.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          email: r.email,
          passwordHash: r.passwordHash,
          name: r.name,
          role: r.role,
          avatar: r.avatar || null,
          createdAt: parseDate(r.createdAt) || new Date(),
          updatedAt: parseDate(r.updatedAt) || new Date(),
        },
      });
    }
  }

  // 2. Category
  if (dumpData.Category?.length) {
    console.log(`Importing ${dumpData.Category.length} Category records...`);
    for (const r of dumpData.Category) {
      await prisma.category.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          name: r.name,
          slug: r.slug,
          description: r.description || null,
          bannerImage: r.bannerImage || null,
          image: r.image || null,
          link: r.link || null,
          sortOrder: Number(r.sortOrder || 0),
          isActive: parseBool(r.isActive),
          enableRingSize: parseBool(r.enableRingSize),
          enableMetal: parseBool(r.enableMetal),
          enableDiamond: parseBool(r.enableDiamond),
          enableDiamondShape: parseBool(r.enableDiamondShape),
          enableDiamondCert: parseBool(r.enableDiamondCert),
          enableEngraving: parseBool(r.enableEngraving),
          createdAt: parseDate(r.createdAt) || new Date(),
          updatedAt: parseDate(r.updatedAt) || new Date(),
        },
      });
    }
  }

  // 3. Collection
  if (dumpData.Collection?.length) {
    console.log(`Importing ${dumpData.Collection.length} Collection records...`);
    for (const r of dumpData.Collection) {
      await prisma.collection.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          name: r.name,
          slug: r.slug,
          description: r.description || null,
          bannerImage: r.bannerImage || null,
          thumbnailImage: r.thumbnailImage || null,
          isFeatured: parseBool(r.isFeatured),
          createdAt: parseDate(r.createdAt) || new Date(),
          updatedAt: parseDate(r.updatedAt) || new Date(),
        },
      });
    }
  }

  // 4. Product
  if (dumpData.Product?.length) {
    console.log(`Importing ${dumpData.Product.length} Product records...`);
    for (const r of dumpData.Product) {
      await prisma.product.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          name: r.name,
          sku: r.sku,
          slug: r.slug,
          categoryId: r.categoryId || null,
          collectionId: r.collectionId || null,
          shortDescription: r.shortDescription || null,
          fullDescription: r.fullDescription || null,
          specifications: r.specifications || null,
          careInstructions: r.careInstructions || null,
          jewelleryType: r.jewelleryType || null,
          ringStyle: r.ringStyle || null,
          ringSize: r.ringSize || null,
          ringWidth: r.ringWidth || null,
          gender: r.gender || 'Unisex',
          metal: r.metal || null,
          metalColor: r.metalColor || null,
          goldPurity: r.goldPurity || null,
          goldColor: r.goldColor || null,
          goldWeight: r.goldWeight ? Number(r.goldWeight) : null,
          diamondType: r.diamondType || null,
          shape: r.shape || null,
          carat: r.carat ? Number(r.carat) : null,
          color: r.color || null,
          colorType: r.colorType || null,
          fancyColor: r.fancyColor || null,
          fancyIntensity: r.fancyIntensity || null,
          fancyModifier: r.fancyModifier || null,
          clarity: r.clarity || null,
          cut: r.cut || null,
          polish: r.polish || null,
          symmetry: r.symmetry || null,
          fluorescence: r.fluorescence || null,
          certificateNo: r.certificateNo || null,
          certification: r.certification || null,
          gemstone: r.gemstone || null,
          gemstoneColor: r.gemstoneColor || null,
          pearlType: r.pearlType || null,
          birthstone: r.birthstone || null,
          plainMetal: parseBool(r.plainMetal),
          onSale: parseBool(r.onSale),
          engravable: parseBool(r.engravable),
          metaTitle: r.metaTitle || null,
          metaDescription: r.metaDescription || null,
          metaKeywords: r.metaKeywords || null,
          price: Number(r.price || 0),
          comparePrice: r.comparePrice ? Number(r.comparePrice) : null,
          salePrice: r.salePrice ? Number(r.salePrice) : null,
          currency: r.currency || 'USD',
          stockQuantity: Number(r.stockQuantity || 10),
          status: r.status || 'ACTIVE',
          mainImage: r.mainImage || '',
          secondaryImage: r.secondaryImage || null,
          isFeatured: parseBool(r.isFeatured),
          isNewArrival: parseBool(r.isNewArrival),
          isBestseller: parseBool(r.isBestseller),
          isSettingOnly: parseBool(r.isSettingOnly),
          pricingMode: r.pricingMode || 'BASE',
          enableMetalSelection: parseBool(r.enableMetalSelection),
          enableDiamondSelection: parseBool(r.enableDiamondSelection),
          enableDiamondShape: parseBool(r.enableDiamondShape),
          enableCustomOptions: parseBool(r.enableCustomOptions),
          variationsJson: r.variationsJson || null,
          customOptionsJson: r.customOptionsJson || null,
          shippingInfoJson: r.shippingInfoJson || null,
          enableRingSize: parseBool(r.enableRingSize),
          ringSizeMode: r.ringSizeMode || 'CUSTOMER_SELECTABLE',
          fixedRingSize: r.fixedRingSize || null,
          availableRingSizes: r.availableRingSizes || null,
          metalsConfig: r.metalsConfig || null,
          diamondsConfig: r.diamondsConfig || null,
          benefitsConfig: r.benefitsConfig || null,
          accordionsConfig: r.accordionsConfig || null,
          pricingMatrix: r.pricingMatrix || null,
          draftData: r.draftData || null,
          ogImage: r.ogImage || null,
          schemaInformation: r.schemaInformation || null,
          title: r.title || null,
          masterPrice14k: r.masterPrice14k ? Number(r.masterPrice14k) : null,
          masterPrice18k: r.masterPrice18k ? Number(r.masterPrice18k) : null,
          masterPriceSilver: r.masterPriceSilver ? Number(r.masterPriceSilver) : null,
          diamondDetailsJson: r.diamondDetailsJson || null,
          internalTagsJson: r.internalTagsJson || null,
          seoSocialJson: r.seoSocialJson || null,
          processingTimeDays: r.processingTimeDays ? Number(r.processingTimeDays) : 3,
          craftsmanshipHeading: r.craftsmanshipHeading || null,
          craftsmanshipStory: r.craftsmanshipStory || null,
          editorialImage: r.editorialImage || null,
          recommendedProductIds: r.recommendedProductIds || null,
          completeLookProductIds: r.completeLookProductIds || null,
          createdAt: parseDate(r.createdAt) || new Date(),
          updatedAt: parseDate(r.updatedAt) || new Date(),
        },
      });
    }
  }

  // 5. ProductVariant
  if (dumpData.ProductVariant?.length) {
    console.log(`Importing ${dumpData.ProductVariant.length} ProductVariant records...`);
    for (const r of dumpData.ProductVariant) {
      await prisma.productVariant.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          productId: r.productId,
          sku: r.sku,
          metal: r.metal || null,
          goldColor: r.goldColor || null,
          size: r.size || null,
          price: Number(r.price || 0),
          stock: Number(r.stock || 5),
          weight: r.weight ? Number(r.weight) : null,
          image: r.image || null,
          createdAt: parseDate(r.createdAt) || new Date(),
          updatedAt: parseDate(r.updatedAt) || new Date(),
        },
      });
    }
  }

  // 6. ProductImage
  if (dumpData.ProductImage?.length) {
    console.log(`Importing ${dumpData.ProductImage.length} ProductImage records...`);
    for (const r of dumpData.ProductImage) {
      await prisma.productImage.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          productId: r.productId,
          url: r.url,
          altText: r.altText || null,
          title: r.title || null,
          imageType: r.imageType || null,
          position: Number(r.position || 0),
          createdAt: parseDate(r.createdAt) || new Date(),
        },
      });
    }
  }

  // 7. ProductVideo
  if (dumpData.ProductVideo?.length) {
    console.log(`Importing ${dumpData.ProductVideo.length} ProductVideo records...`);
    for (const r of dumpData.ProductVideo) {
      await prisma.productVideo.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          productId: r.productId,
          url: r.url,
          position: Number(r.position || 0),
          createdAt: parseDate(r.createdAt) || new Date(),
        },
      });
    }
  }

  // 8. Review
  if (dumpData.Review?.length) {
    console.log(`Importing ${dumpData.Review.length} Review records...`);
    for (const r of dumpData.Review) {
      await prisma.review.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          productId: r.productId,
          author: r.author,
          email: r.email || null,
          rating: Number(r.rating || 5),
          comment: r.comment,
          isApproved: parseBool(r.isApproved),
          isFeatured: parseBool(r.isFeatured),
          createdAt: parseDate(r.createdAt) || new Date(),
        },
      });
    }
  }

  // 9. Diamond
  if (dumpData.Diamond?.length) {
    console.log(`Importing ${dumpData.Diamond.length} Diamond records...`);
    for (const r of dumpData.Diamond) {
      await prisma.diamond.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          diamondId: r.diamondId,
          stockId: r.stockId || null,
          sku: r.sku || null,
          diamondType: r.diamondType || 'NATURAL',
          shape: r.shape,
          carat: Number(r.carat),
          color: r.color,
          clarity: r.clarity,
          cut: r.cut || null,
          polish: r.polish || null,
          symmetry: r.symmetry || null,
          fluorescence: r.fluorescence || null,
          length: r.length ? Number(r.length) : null,
          width: r.width ? Number(r.width) : null,
          depth: r.depth ? Number(r.depth) : null,
          tablePercent: r.tablePercent ? Number(r.tablePercent) : null,
          depthPercent: r.depthPercent ? Number(r.depthPercent) : null,
          crownAngle: r.crownAngle ? Number(r.crownAngle) : null,
          pavilionAngle: r.pavilionAngle ? Number(r.pavilionAngle) : null,
          girdle: r.girdle || null,
          culet: r.culet || null,
          lab: r.lab || null,
          certificateNumber: r.certificateNumber || null,
          certificateUrl: r.certificateUrl || null,
          price: Number(r.price),
          currency: r.currency || 'USD',
          status: r.status || 'AVAILABLE',
          fancyColor: r.fancyColor || null,
          fancyOvertone: r.fancyOvertone || null,
          fancyIntensity: r.fancyIntensity || null,
          imageUrl: r.imageUrl || null,
          videoUrl: r.videoUrl || null,
          video360Url: r.video360Url || null,
          certificatePdfUrl: r.certificatePdfUrl || null,
          createdAt: parseDate(r.createdAt) || new Date(),
          updatedAt: parseDate(r.updatedAt) || new Date(),
        },
      });
    }
  }

  // 10. CustomRequest
  if (dumpData.CustomRequest?.length) {
    console.log(`Importing ${dumpData.CustomRequest.length} CustomRequest records...`);
    for (const r of dumpData.CustomRequest) {
      await prisma.customRequest.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          requestNumber: r.requestNumber,
          name: r.name,
          email: r.email,
          whatsapp: r.whatsapp,
          jewelleryType: r.jewelleryType,
          metal: r.metal || null,
          diamondPreference: r.diamondPreference || null,
          budget: r.budget || null,
          deadline: r.deadline || null,
          description: r.description,
          status: r.status || 'NEW',
          cadFileUrl: r.cadFileUrl || null,
          adminNotes: r.adminNotes || null,
          createdAt: parseDate(r.createdAt) || new Date(),
          updatedAt: parseDate(r.updatedAt) || new Date(),
        },
      });
    }
  }

  // 11. Customer
  if (dumpData.Customer?.length) {
    console.log(`Importing ${dumpData.Customer.length} Customer records...`);
    for (const r of dumpData.Customer) {
      await prisma.customer.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          email: r.email,
          name: r.name,
          phone: r.phone || null,
          country: r.country || null,
          createdAt: parseDate(r.createdAt) || new Date(),
          updatedAt: parseDate(r.updatedAt) || new Date(),
        },
      });
    }
  }

  // 12. Order
  if (dumpData.Order?.length) {
    console.log(`Importing ${dumpData.Order.length} Order records...`);
    for (const r of dumpData.Order) {
      await prisma.order.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          orderNumber: r.orderNumber,
          orderDate: parseDate(r.orderDate) || new Date(),
          customerId: r.customerId || null,
          customerName: r.customerName || null,
          customerEmail: r.customerEmail || null,
          customerPhone: r.customerPhone || null,
          billingAddress: r.billingAddress || null,
          shippingAddress: r.shippingAddress || null,
          subtotal: Number(r.subtotal || 0),
          tax: Number(r.tax || 0),
          shippingFee: Number(r.shippingFee || 0),
          discount: Number(r.discount || 0),
          totalAmount: Number(r.totalAmount || 0),
          currency: r.currency || 'USD',
          orderStatus: r.orderStatus || 'CONFIRMED',
          notes: r.notes || null,
          createdAt: parseDate(r.createdAt) || new Date(),
          updatedAt: parseDate(r.updatedAt) || new Date(),
        },
      });
    }
  }

  // 13. OrderItem
  if (dumpData.OrderItem?.length) {
    console.log(`Importing ${dumpData.OrderItem.length} OrderItem records...`);
    for (const r of dumpData.OrderItem) {
      await prisma.orderItem.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          orderId: r.orderId,
          productId: r.productId || null,
          diamondId: r.diamondId || null,
          productName: r.productName,
          sku: r.sku || null,
          variantInfo: r.variantInfo || null,
          unitPrice: Number(r.unitPrice || 0),
          quantity: Number(r.quantity || 1),
          discount: Number(r.discount || 0),
          tax: Number(r.tax || 0),
          subtotal: Number(r.subtotal || 0),
        },
      });
    }
  }

  // 14. Payment
  if (dumpData.Payment?.length) {
    console.log(`Importing ${dumpData.Payment.length} Payment records...`);
    for (const r of dumpData.Payment) {
      await prisma.payment.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          paymentNumber: r.paymentNumber || null,
          orderId: r.orderId,
          paymentDate: parseDate(r.paymentDate) || new Date(),
          amount: Number(r.amount),
          currency: r.currency || 'USD',
          paymentMethod: r.paymentMethod || 'Bank Transfer',
          provider: r.provider || 'MANUAL',
          transactionId: r.transactionId || null,
          referenceId: r.referenceId || null,
          status: r.status || 'SUCCESS',
          notes: r.notes || null,
          recordedBy: r.recordedBy || 'Admin',
          proofUrl: r.proofUrl || null,
          createdAt: parseDate(r.createdAt) || new Date(),
          updatedAt: parseDate(r.updatedAt) || new Date(),
        },
      });
    }
  }

  // 15. PaymentReceipt
  if (dumpData.PaymentReceipt?.length) {
    console.log(`Importing ${dumpData.PaymentReceipt.length} PaymentReceipt records...`);
    for (const r of dumpData.PaymentReceipt) {
      await prisma.paymentReceipt.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          receiptNumber: r.receiptNumber,
          paymentId: r.paymentId,
          orderId: r.orderId,
          amount: Number(r.amount),
          currency: r.currency || 'USD',
          issuedAt: parseDate(r.issuedAt) || new Date(),
          pdfUrl: r.pdfUrl || null,
          createdAt: parseDate(r.createdAt) || new Date(),
        },
      });
    }
  }

  // 16. Page
  if (dumpData.Page?.length) {
    console.log(`Importing ${dumpData.Page.length} Page records...`);
    for (const r of dumpData.Page) {
      await prisma.page.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          title: r.title,
          slug: r.slug,
          content: r.content || null,
          draftContent: r.draftContent || null,
          status: r.status || 'PUBLISHED',
          lastPublishedAt: parseDate(r.lastPublishedAt),
          publishedBy: r.publishedBy || null,
          lastModifiedBy: r.lastModifiedBy || null,
          createdAt: parseDate(r.createdAt) || new Date(),
          updatedAt: parseDate(r.updatedAt) || new Date(),
        },
      });
    }
  }

  // 17. PageSection
  if (dumpData.PageSection?.length) {
    console.log(`Importing ${dumpData.PageSection.length} PageSection records...`);
    for (const r of dumpData.PageSection) {
      await prisma.pageSection.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          pageId: r.pageId,
          blockType: r.blockType,
          position: Number(r.position || 0),
          content: r.content,
          isVisible: parseBool(r.isVisible),
        },
      });
    }
  }

  // 18. Menu
  if (dumpData.Menu?.length) {
    console.log(`Importing ${dumpData.Menu.length} Menu records...`);
    for (const r of dumpData.Menu) {
      await prisma.menu.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          name: r.name,
          location: r.location,
          createdAt: parseDate(r.createdAt) || new Date(),
          updatedAt: parseDate(r.updatedAt) || new Date(),
        },
      });
    }
  }

  // 19. MenuItem
  if (dumpData.MenuItem?.length) {
    console.log(`Importing ${dumpData.MenuItem.length} MenuItem records...`);
    for (const r of dumpData.MenuItem) {
      await prisma.menuItem.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          menuId: r.menuId,
          title: r.title,
          url: r.url,
          position: Number(r.position || 0),
          parentId: r.parentId || null,
          megaMenu: r.megaMenu || null,
          isVisible: parseBool(r.isVisible),
        },
      });
    }
  }

  // 20. FilterGroup
  if (dumpData.FilterGroup?.length) {
    console.log(`Importing ${dumpData.FilterGroup.length} FilterGroup records...`);
    for (const r of dumpData.FilterGroup) {
      await prisma.filterGroup.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          key: r.key,
          label: r.label,
          categoryScope: r.categoryScope || 'ALL',
          targetType: r.targetType || 'JEWELLERY',
          filterType: r.filterType || 'MULTISELECT',
          sortOrder: Number(r.sortOrder || 0),
          isEnabled: parseBool(r.isEnabled),
          isSystem: parseBool(r.isSystem),
          createdAt: parseDate(r.createdAt) || new Date(),
          updatedAt: parseDate(r.updatedAt) || new Date(),
        },
      });
    }
  }

  // 21. FilterOption
  if (dumpData.FilterOption?.length) {
    console.log(`Importing ${dumpData.FilterOption.length} FilterOption records...`);
    for (const r of dumpData.FilterOption) {
      await prisma.filterOption.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          filterGroupId: r.filterGroupId,
          label: r.label,
          value: r.value,
          icon: r.icon || null,
          iconUrl: r.iconUrl || null,
          colorHex: r.colorHex || null,
          sortOrder: Number(r.sortOrder || 0),
          isEnabled: parseBool(r.isEnabled),
          createdAt: parseDate(r.createdAt) || new Date(),
        },
      });
    }
  }

  // 22. Promotion
  if (dumpData.Promotion?.length) {
    console.log(`Importing ${dumpData.Promotion.length} Promotion records...`);
    for (const r of dumpData.Promotion) {
      await prisma.promotion.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          title: r.title,
          type: r.type || 'PROMO_BANNER',
          heading: r.heading || null,
          subheading: r.subheading || null,
          description: r.description || null,
          imageUrl: r.imageUrl || null,
          mobileImageUrl: r.mobileImageUrl || null,
          videoUrl: r.videoUrl || null,
          buttonText: r.buttonText || null,
          buttonUrl: r.buttonUrl || null,
          linkUrl: r.linkUrl || null,
          backgroundColor: r.backgroundColor || null,
          textColor: r.textColor || null,
          startDate: parseDate(r.startDate),
          endDate: parseDate(r.endDate),
          isActive: parseBool(r.isActive),
          sortOrder: Number(r.sortOrder || 0),
          createdAt: parseDate(r.createdAt) || new Date(),
          updatedAt: parseDate(r.updatedAt) || new Date(),
        },
      });
    }
  }

  // 23. SiteSetting
  if (dumpData.SiteSetting?.length) {
    console.log(`Importing ${dumpData.SiteSetting.length} SiteSetting records...`);
    for (const r of dumpData.SiteSetting) {
      await prisma.siteSetting.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          key: r.key,
          value: r.value,
          updatedAt: parseDate(r.updatedAt) || new Date(),
        },
      });
    }
  }

  // 24. DiamondFilterConfig
  if (dumpData.DiamondFilterConfig?.length) {
    console.log(`Importing ${dumpData.DiamondFilterConfig.length} DiamondFilterConfig records...`);
    for (const r of dumpData.DiamondFilterConfig) {
      await prisma.diamondFilterConfig.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          key: r.key,
          title: r.title,
          filterType: r.filterType || 'MULTISELECT',
          sortOrder: Number(r.sortOrder || 0),
          isEnabled: parseBool(r.isEnabled),
          configJson: r.configJson || null,
          createdAt: parseDate(r.createdAt) || new Date(),
          updatedAt: parseDate(r.updatedAt) || new Date(),
        },
      });
    }
  }

  // 25. DiamondFilterOption
  if (dumpData.DiamondFilterOption?.length) {
    console.log(`Importing ${dumpData.DiamondFilterOption.length} DiamondFilterOption records...`);
    for (const r of dumpData.DiamondFilterOption) {
      await prisma.diamondFilterOption.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          configId: r.configId,
          label: r.label,
          value: r.value,
          iconUrl: r.iconUrl || null,
          colorHex: r.colorHex || null,
          sortOrder: Number(r.sortOrder || 0),
          isEnabled: parseBool(r.isEnabled),
          createdAt: parseDate(r.createdAt) || new Date(),
        },
      });
    }
  }

  // 26. MegaMenuCard
  if (dumpData.MegaMenuCard?.length) {
    console.log(`Importing ${dumpData.MegaMenuCard.length} MegaMenuCard records...`);
    for (const r of dumpData.MegaMenuCard) {
      await prisma.megaMenuCard.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          categorySlug: r.categorySlug,
          title: r.title,
          subtitle: r.subtitle || null,
          description: r.description || null,
          imageUrl: r.imageUrl,
          mobileImageUrl: r.mobileImageUrl || null,
          targetUrl: r.targetUrl,
          altText: r.altText || null,
          isEnabled: parseBool(r.isEnabled),
          sortOrder: Number(r.sortOrder || 0),
          createdAt: parseDate(r.createdAt) || new Date(),
          updatedAt: parseDate(r.updatedAt) || new Date(),
        },
      });
    }
  }

  // 27. HomepageReview
  if (dumpData.HomepageReview?.length) {
    console.log(`Importing ${dumpData.HomepageReview.length} HomepageReview records...`);
    for (const r of dumpData.HomepageReview) {
      await prisma.homepageReview.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          customerName: r.customerName,
          rating: Number(r.rating || 5),
          reviewText: r.reviewText,
          customerImage: r.customerImage || null,
          location: r.location || null,
          reviewDate: r.reviewDate || null,
          sortOrder: Number(r.sortOrder || 0),
          isActive: parseBool(r.isActive),
          createdAt: parseDate(r.createdAt) || new Date(),
          updatedAt: parseDate(r.updatedAt) || new Date(),
        },
      });
    }
  }

  // 28. ProductFilterConfig
  if (dumpData.ProductFilterConfig?.length) {
    console.log(`Importing ${dumpData.ProductFilterConfig.length} ProductFilterConfig records...`);
    for (const r of dumpData.ProductFilterConfig) {
      await prisma.productFilterConfig.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          key: r.key,
          name: r.name,
          customerLabel: r.customerLabel,
          filterType: r.filterType || 'Multi Select',
          sortOrder: Number(r.sortOrder || 0),
          isEnabled: parseBool(r.isEnabled),
          applicableJewelleryTypes: r.applicableJewelleryTypes || 'All',
          configJson: r.configJson || null,
          createdAt: parseDate(r.createdAt) || new Date(),
          updatedAt: parseDate(r.updatedAt) || new Date(),
        },
      });
    }
  }

  // 29. ProductFilterOption
  if (dumpData.ProductFilterOption?.length) {
    console.log(`Importing ${dumpData.ProductFilterOption.length} ProductFilterOption records...`);
    for (const r of dumpData.ProductFilterOption) {
      await prisma.productFilterOption.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          filterId: r.filterId,
          label: r.label,
          value: r.value,
          iconUrl: r.iconUrl || null,
          colorHex: r.colorHex || null,
          sortOrder: Number(r.sortOrder || 0),
          isEnabled: parseBool(r.isEnabled),
          applicableJewelleryTypes: r.applicableJewelleryTypes || 'All',
          metadataJson: r.metadataJson || null,
          createdAt: parseDate(r.createdAt) || new Date(),
          updatedAt: parseDate(r.updatedAt) || new Date(),
        },
      });
    }
  }

  // 30. ActivityLog
  if (dumpData.ActivityLog?.length) {
    console.log(`Importing ${dumpData.ActivityLog.length} ActivityLog records...`);
    for (const r of dumpData.ActivityLog) {
      await prisma.activityLog.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          userId: r.userId,
          action: r.action,
          object: r.object,
          oldValue: r.oldValue || null,
          newValue: r.newValue || null,
          createdAt: parseDate(r.createdAt) || new Date(),
        },
      });
    }
  }

  console.log('✅ ALL SQLITE DATA IMPORTED SUCCESSFULLY INTO POSTGRESQL!');
}

importAll()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error('❌ Import failed:', err);
    prisma.$disconnect();
    process.exit(1);
  });
