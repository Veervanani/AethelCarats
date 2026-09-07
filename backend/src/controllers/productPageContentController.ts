import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../prisma';

// Default values for initial global product page content
export const DEFAULT_PRODUCT_PAGE_CONTENT = {
  heroTitle: 'Exquisite Fine Jewellery',
  heroSubtitle: 'Handcrafted luxury pieces designed for life\'s timeless moments.',
  heroShortDescription: 'Every creation is individually handcrafted in Surat by master jewelers using RJC-certified recycled precious metals and certified conflict-free diamonds.',
  heroAnnouncement: 'Complimentary Express Insured Worldwide Shipping & 30-Day Returns',
  heroBreadcrumbLabel: 'Fine Jewellery',

  benefitsJson: JSON.stringify([
    { id: 'b-1', title: 'Free Insured Delivery', description: 'Discreet packaging.', icon: 'Truck', sortOrder: 0, isActive: true },
    { id: 'b-2', title: 'Lifetime Service Warranty', description: 'Annual prong checking, sizing & professional cleaning.', icon: 'ShieldCheck', sortOrder: 1, isActive: true },
    { id: 'b-3', title: 'GIA / IGI Certification', description: 'Independently certified 100% conflict-free diamonds.', icon: 'Award', sortOrder: 2, isActive: true }
  ]),

  accordionsJson: JSON.stringify([
    {
      id: 'acc-1',
      title: 'YOUR AURA DIAMOND ATELIER EXPERIENCE',
      content: 'Experience white-glove service with direct access to master jewellers, custom CAD 3D photorealistic renderings, and 40x microscopic quality verification.',
      icon: 'Sparkles',
      sortOrder: 0,
      isActive: true
    },
    {
      id: 'acc-2',
      title: 'PRODUCT & DIAMOND SPECIFICATIONS',
      content: 'Detailed specifications will automatically display metal purity, diamond carat weight, cut grade, color, clarity, certificate number, and exact millimeter dimensions.',
      icon: 'Gem',
      sortOrder: 1,
      isActive: true
    },
    {
      id: 'acc-3',
      title: 'CRAFTSMANSHIP & SUSTAINABILITY',
      content: 'Crafted with 100% recycled 18K gold and fine silver certified by the Responsible Jewellery Council. Hand-set under microscopic precision with a lifetime guarantee.',
      icon: 'Award',
      sortOrder: 2,
      isActive: true
    },
    {
      id: 'acc-4',
      title: 'SHIPPING & DELIVERY',
      content: 'Production takes 7–10 working days. Dispatched via fully insured FedEx Priority Air in unbranded outer security boxes with signature required upon delivery.',
      icon: 'Truck',
      sortOrder: 3,
      isActive: true
    }
  ]),

  shippingInfoJson: JSON.stringify({
    processingTime: '1–2 working days',
    manufacturingTime: '7–10 working days',
    shippingTime: '2–4 working days',
    deliveryTime: '7–10 working days after production',
    shippingMethod: 'FedEx Priority Express (Fully Insured)',
    insuranceInfo: '100% covered from our Surat atelier until hand-delivered to recipient.',
    returnInfo: '30-Day Money Back Guarantee with complimentary return shipping.',
    internationalShippingInfo: 'Available worldwide with customs duties & taxes handled seamlessly.'
  }),

  craftsmanshipTitle: 'Craftsmanship & Sustainability',
  craftsmanshipDescription: 'We combine traditional goldsmithing heritage with sustainable innovation. Every piece is handcrafted by master artisans to ensure uncompromised elegance and enduring quality.',
  sustainabilityInfo: '100% Recycled Precious Metals certified by the Responsible Jewellery Council (RJC).',
  manufacturingInfo: 'Precision hand-setting under 40x microscopic magnification for optimal gem security.',
  materialsInfo: 'Solid 18K Gold (Yellow, White, Rose) or 950 Platinum, nickel-free and hypoallergenic.',
  certificationInfo: 'Independently graded by GIA or IGI with digital certificate verification.',
  craftsmanshipImage: '/assets/gem_rings_cat.png',

  packagingHeading: "We're committed to making your entire experience a pleasant one, from shopping to shipping.",
  packagingDescription: 'Every item arrives in signature Aura Diamond Atelier packaging. Engagement rings come in a velvet presentation box with appraisal certificate and GIA/IGI grading report.',
  packagingItemsJson: JSON.stringify([
    {
      id: 'pkg-1',
      title: 'Discreet Packaging',
      description: 'Every order is shipped in plain, unbranded outer security boxes. No mention of Aura Diamond Atelier or diamond jewelry on package exterior.',
      icon: 'Package',
      sortOrder: 0,
      isActive: true
    },
    {
      id: 'pkg-2',
      title: 'Secure and Convenient Pickup Option',
      description: 'Hold your order for pickup at thousands of secure FedEx locations or choose insured signature delivery directly to your door.',
      icon: 'ShieldCheck',
      sortOrder: 1,
      isActive: true
    },
    {
      id: 'pkg-3',
      title: 'Free Insured Shipping & Complimentary Returns',
      description: 'Enjoy free express delivery on every order, fully insured from our Surat atelier to your hands, backed by our 30-day money-back guarantee.',
      icon: 'Truck',
      sortOrder: 2,
      isActive: true
    }
  ]),
  packagingImageUrl: '/assets/gem_ring_box.png',

  reviewsTitle: 'Customer Reviews & Feedback',
  reviewsEnabled: true,
  reviewsVerifiedBadge: true,
  reviewsSubmissionEnabled: true,
  reviewsDefaultSort: 'newest',

  similarItemsTitle: 'You May Also Like',
  similarProductsJson: JSON.stringify([]),
  similarItemsEnabled: true,

  recentlyViewedTitle: 'Recently Viewed',
  recentlyViewedEnabled: true,

  showBenefits: true,
  showExperienceAccordion: true,
  showSpecifications: true,
  showCraftsmanshipSection: true,
  showPackagingSection: true,
  showReviews: true,
  showSimilarItems: true,
  showRecentlyViewed: true,
  showBuyNowButton: true,
  showStickyBar: true,
  showQuantitySelector: true
};

// Admin Endpoint: Get product page content for a specific product or global
export const getAdminProductPageContent = async (req: AuthRequest, res: Response) => {
  try {
    const productId = req.query.productId as string | undefined;

    let targetProductId: string | null = null;
    if (productId && productId !== 'global' && productId !== 'null' && productId.trim() !== '') {
      targetProductId = productId.trim();
    }

    // First find existing entry for targetProductId
    let content = await prisma.productPageContent.findFirst({
      where: { productId: targetProductId },
    });

    // If requesting product-specific content but none exists, fetch global default to prefill
    let globalContent = null;
    if (targetProductId) {
      globalContent = await prisma.productPageContent.findFirst({
        where: { productId: null },
      });
    }

    const fallbackSource = globalContent || DEFAULT_PRODUCT_PAGE_CONTENT;

    if (!content) {
      // If global requested and doesn't exist in DB, create initial global DB entry
      if (!targetProductId && !globalContent) {
        content = await prisma.productPageContent.create({
          data: {
            productId: null,
            ...DEFAULT_PRODUCT_PAGE_CONTENT
          }
        });
      } else {
        // Return fallback populated object with productId specified
        return res.json({
          content: {
            ...fallbackSource,
            id: undefined,
            productId: targetProductId,
            isCustomOverride: false,
          }
        });
      }
    }

    return res.json({
      content: {
        ...content,
        isCustomOverride: targetProductId ? true : false,
      }
    });
  } catch (error: any) {
    console.error('getAdminProductPageContent error:', error);
    return res.status(500).json({ message: error.message || 'Failed to fetch product page content' });
  }
};

// Admin Endpoint: Save product page content
export const saveAdminProductPageContent = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, ...contentData } = req.body;

    let targetProductId: string | null = null;
    if (productId && productId !== 'global' && productId !== 'null' && String(productId).trim() !== '') {
      targetProductId = String(productId).trim();

      // Verify product exists
      const product = await prisma.product.findUnique({ where: { id: targetProductId } });
      if (!product) {
        return res.status(404).json({ message: 'Target product not found' });
      }
    }

    // Filter valid fields
    const dataToSave = {
      heroTitle: contentData.heroTitle ?? null,
      heroSubtitle: contentData.heroSubtitle ?? null,
      heroShortDescription: contentData.heroShortDescription ?? null,
      heroAnnouncement: contentData.heroAnnouncement ?? null,
      heroBreadcrumbLabel: contentData.heroBreadcrumbLabel ?? null,

      benefitsJson: typeof contentData.benefitsJson === 'string' ? contentData.benefitsJson : JSON.stringify(contentData.benefitsJson || []),
      accordionsJson: typeof contentData.accordionsJson === 'string' ? contentData.accordionsJson : JSON.stringify(contentData.accordionsJson || []),
      shippingInfoJson: typeof contentData.shippingInfoJson === 'string' ? contentData.shippingInfoJson : JSON.stringify(contentData.shippingInfoJson || {}),

      craftsmanshipTitle: contentData.craftsmanshipTitle ?? null,
      craftsmanshipDescription: contentData.craftsmanshipDescription ?? null,
      sustainabilityInfo: contentData.sustainabilityInfo ?? null,
      manufacturingInfo: contentData.manufacturingInfo ?? null,
      materialsInfo: contentData.materialsInfo ?? null,
      certificationInfo: contentData.certificationInfo ?? null,
      craftsmanshipImage: contentData.craftsmanshipImage ?? null,

      packagingHeading: contentData.packagingHeading ?? null,
      packagingDescription: contentData.packagingDescription ?? null,
      packagingItemsJson: typeof contentData.packagingItemsJson === 'string' ? contentData.packagingItemsJson : JSON.stringify(contentData.packagingItemsJson || []),
      packagingImageUrl: contentData.packagingImageUrl ?? null,

      reviewsTitle: contentData.reviewsTitle ?? null,
      reviewsEnabled: contentData.reviewsEnabled !== undefined ? Boolean(contentData.reviewsEnabled) : true,
      reviewsVerifiedBadge: contentData.reviewsVerifiedBadge !== undefined ? Boolean(contentData.reviewsVerifiedBadge) : true,
      reviewsSubmissionEnabled: contentData.reviewsSubmissionEnabled !== undefined ? Boolean(contentData.reviewsSubmissionEnabled) : true,
      reviewsDefaultSort: contentData.reviewsDefaultSort ?? 'newest',

      similarItemsTitle: contentData.similarItemsTitle ?? null,
      similarProductsJson: typeof contentData.similarProductsJson === 'string' ? contentData.similarProductsJson : JSON.stringify(contentData.similarProductsJson || []),
      similarItemsEnabled: contentData.similarItemsEnabled !== undefined ? Boolean(contentData.similarItemsEnabled) : true,

      recentlyViewedTitle: contentData.recentlyViewedTitle ?? null,
      recentlyViewedEnabled: contentData.recentlyViewedEnabled !== undefined ? Boolean(contentData.recentlyViewedEnabled) : true,

      showBenefits: contentData.showBenefits !== undefined ? Boolean(contentData.showBenefits) : true,
      showExperienceAccordion: contentData.showExperienceAccordion !== undefined ? Boolean(contentData.showExperienceAccordion) : true,
      showSpecifications: contentData.showSpecifications !== undefined ? Boolean(contentData.showSpecifications) : true,
      showCraftsmanshipSection: contentData.showCraftsmanshipSection !== undefined ? Boolean(contentData.showCraftsmanshipSection) : true,
      showPackagingSection: contentData.showPackagingSection !== undefined ? Boolean(contentData.showPackagingSection) : true,
      showReviews: contentData.showReviews !== undefined ? Boolean(contentData.showReviews) : true,
      showSimilarItems: contentData.showSimilarItems !== undefined ? Boolean(contentData.showSimilarItems) : true,
      showRecentlyViewed: contentData.showRecentlyViewed !== undefined ? Boolean(contentData.showRecentlyViewed) : true,
      showBuyNowButton: contentData.showBuyNowButton !== undefined ? Boolean(contentData.showBuyNowButton) : true,
      showStickyBar: contentData.showStickyBar !== undefined ? Boolean(contentData.showStickyBar) : true,
      showQuantitySelector: contentData.showQuantitySelector !== undefined ? Boolean(contentData.showQuantitySelector) : true,
    };

    let existing = await prisma.productPageContent.findFirst({
      where: { productId: targetProductId },
    });

    let savedContent;
    if (existing) {
      savedContent = await prisma.productPageContent.update({
        where: { id: existing.id },
        data: dataToSave,
      });
    } else {
      savedContent = await prisma.productPageContent.create({
        data: {
          productId: targetProductId,
          ...dataToSave,
        },
      });
    }

    return res.json({
      message: targetProductId ? 'Product-specific content saved successfully!' : 'Global product page content saved successfully!',
      content: savedContent,
    });
  } catch (error: any) {
    console.error('saveAdminProductPageContent error:', error);
    return res.status(500).json({ message: error.message || 'Failed to save product page content' });
  }
};

// Storefront Endpoint: Get active merged product page content for PDP
export const getStorefrontProductPageContent = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    // Fetch product specific content if productId provided
    let customContent = null;
    if (productId && productId !== 'undefined' && productId !== 'null') {
      customContent = await prisma.productPageContent.findFirst({
        where: { productId },
      });
    }

    // Fetch global content
    let globalContent = await prisma.productPageContent.findFirst({
      where: { productId: null },
    });

    if (!globalContent) {
      globalContent = await prisma.productPageContent.create({
        data: {
          productId: null,
          ...DEFAULT_PRODUCT_PAGE_CONTENT
        }
      });
    }

    // Merge: custom fields override global fields if non-null and non-empty
    const merged = { ...globalContent };

    if (customContent) {
      Object.keys(customContent).forEach((key) => {
        const val = (customContent as any)[key];
        if (val !== null && val !== undefined && val !== '') {
          (merged as any)[key] = val;
        }
      });
    }

    return res.json({ content: merged });
  } catch (error: any) {
    console.error('getStorefrontProductPageContent error:', error);
    return res.status(500).json({ message: error.message || 'Failed to fetch storefront product page content' });
  }
};
