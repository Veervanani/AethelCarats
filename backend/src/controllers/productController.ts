import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../prisma';

const safeJsonParse = (val: any, fallback: any) => {
  if (!val) return fallback;
  if (typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
};

const mapProductResponse = (product: any, customerPriceRecord?: any) => {
  const sortedImages = (product.images && Array.isArray(product.images) && product.images.length > 0)
    ? [...product.images].sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0))
    : [];

  const primaryImage =
    (sortedImages.find((img: any) => img.imageType === 'primary' || img.imageType === 'hero')?.url) ||
    (sortedImages.length > 0 ? sortedImages[0].url : null) ||
    (product.mainImage && product.mainImage !== '/assets/gem_rings_cat.png' ? product.mainImage : null) ||
    product.mainImage ||
    '/assets/gem_rings_cat.png';

  const secondaryImage =
    (sortedImages.length > 1 ? sortedImages[1].url : null) ||
    (product.secondaryImage && product.secondaryImage !== '/assets/gem_rings_cat_2.png' ? product.secondaryImage : null) ||
    product.secondaryImage ||
    null;

  const availableRingSizes = safeJsonParse(product.availableRingSizes, [
    'US 4', 'US 4.5', 'US 5', 'US 5.5', 'US 6', 'US 6.5', 'US 7', 'US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 11.5', 'US 12'
  ]);

  const rawMetals = safeJsonParse(product.metalsConfig, [
    { label: '14K Yellow Gold', code: '14k', circleColor: '#E8C872', priceAdjustment: 0 },
    { label: '14K White Gold', code: '14k', circleColor: '#CBD5E1', priceAdjustment: 0 },
    { label: '14K Rose Gold', code: '14k', circleColor: '#E4A8A5', priceAdjustment: 0 },
    { label: '18K Yellow Gold', code: '18k', circleColor: '#E8C872', priceAdjustment: 250 },
    { label: '18K White Gold', code: '18k', circleColor: '#CBD5E1', priceAdjustment: 350 },
    { label: '18K Rose Gold', code: '18k', circleColor: '#E4A8A5', priceAdjustment: 350 },
    { label: 'Silver', code: 'Ag', circleColor: '#E2E8F0', priceAdjustment: 0 },
  ]);

  const metalsConfig = rawMetals.filter((m: any) => {
    const lbl = String(m.label || '').toLowerCase();
    return !lbl.includes('9k') && !lbl.includes('10k') && !lbl.includes('platinum');
  });

  const diamondsConfig = safeJsonParse(product.diamondsConfig, []);

  const benefitsConfig = safeJsonParse(product.benefitsConfig, [
    { icon: 'Truck', title: 'Free Insured Delivery' },
    { icon: 'ShieldCheck', title: 'Lifetime Service Warranty' },
    { icon: 'Award', title: 'GIA / IGI Certification' },
  ]);

  const accordionsConfig = safeJsonParse(product.accordionsConfig, [
    {
      id: 'experience',
      title: 'YOUR ATELIER EXPERIENCE',
      content: 'Every creation is handcrafted in our master atelier using certified conflict-free diamonds and 100% recycled precious metals.'
    },
    {
      id: 'details',
      title: 'PRODUCT & DIAMOND SPECIFICATIONS',
      content: 'Hand-set by master artisans under 40x microscopic precision.'
    },
    {
      id: 'craftsmanship',
      title: 'CRAFTSMANSHIP & SUSTAINABILITY',
      content: 'Hand-set under 40x microscopic precision with Kimberley process certified diamonds.'
    },
    {
      id: 'shipping',
      title: 'SHIPPING & DELIVERY',
      content: 'Dispatched via fully insured Priority Air in discreet unbranded security packaging.'
    }
  ]);

  const pricingMatrix = safeJsonParse(product.pricingMatrix, {});
  const rawVariations = safeJsonParse(product.variationsJson, []);
  const variationsConfig = rawVariations;

  const customOptionsConfig = safeJsonParse(product.customOptionsJson, []);
  const shippingInfoConfig = safeJsonParse(product.shippingInfoJson, {
    title: 'Shipping & Delivery',
    description: 'Dispatched via fully insured Priority Air in discreet unbranded outer security packaging.',
    returnsPolicy: 'Service Warranty Included',
  });
  const schemaInformation = safeJsonParse(product.schemaInformation, null);

  let effectivePrice = product.price;

  if (customerPriceRecord) {
    if (customerPriceRecord.specialPrice !== null && customerPriceRecord.specialPrice !== undefined) {
      effectivePrice = customerPriceRecord.specialPrice;
    } else if (customerPriceRecord.priceAdjustment) {
      effectivePrice = product.price + customerPriceRecord.priceAdjustment;
    }
  }

  const title = product.title || product.name || '';
  const diamondDetails = safeJsonParse(product.diamondDetailsJson, {
    shape: product.shape || 'Round',
    caratWeight: product.carat || 1.0,
    color: product.color || 'D',
    clarity: product.clarity || 'VS1',
    cut: product.cut || 'Excellent',
    polish: 'Excellent',
    symmetry: 'Excellent',
    fluorescence: 'None',
    certification: product.certification || 'IGI',
    certificateNumber: product.certificateNo || '',
    origin: product.diamondType === 'LAB_GROWN' ? 'Lab-Grown' : 'Natural',
    measurements: '',
  });

  const internalTags = safeJsonParse(product.internalTagsJson, []);
  const seoSocial = safeJsonParse(product.seoSocialJson, {
    keywords: product.metaKeywords || '',
    ogTitle: product.metaTitle || title || '',
    ogDescription: product.metaDescription || product.shortDescription || '',
    socialImage: product.ogImage || primaryImage,
    twitterTitle: product.metaTitle || title || '',
    twitterDescription: product.metaDescription || product.shortDescription || '',
    canonicalUrl: product.slug ? `https://auroradiamonds.com/product/${product.slug}` : '',
  });

  return {
    ...product,
    title,
    name: title,
    style: product.ringStyle || 'Solitaire',
    ringStyle: product.ringStyle || 'Solitaire',
    primaryImage,
    secondaryImage,
    price: effectivePrice,
    originalPublicPrice: product.price,
    hasCustomerSpecialPrice: Boolean(customerPriceRecord),
    pricingMode: product.pricingMode || 'BASE',
    enableMetalSelection: product.enableMetalSelection ?? true,
    enableDiamondSelection: false,
    enableDiamondShape: false,
    enableCustomOptions: product.enableCustomOptions ?? false,
    enableRingSize: product.enableRingSize ?? true,
    ringSizeMode: product.ringSizeMode || 'CUSTOMER_SELECTABLE',
    fixedRingSize: product.fixedRingSize || '7',
    masterPrice14k: product.masterPrice14k ?? 2500,
    masterPrice18k: product.masterPrice18k ?? 2750,
    masterPriceSilver: product.masterPriceSilver ?? 2000,
    availableRingSizes,
    isRingSizeRequired: product.isRingSizeRequired ?? true,
    metalsConfig,
    diamondsConfig: [],
    benefitsConfig,
    accordionsConfig,
    pricingMatrix,
    variations: variationsConfig,
    customOptions: customOptionsConfig,
    shippingInfo: shippingInfoConfig,
    schemaInformation,
    diamondDetails,
    internalTags,
    seoSocial,
  };
};

export const getProducts = async (req: AuthRequest, res: Response) => {
  try {
    const {
      category,
      collection,
      search,
      gender,
      metal,
      shape,
      style,
      ringSize,
      ringWidth,
      diamondType,
      gemstone,
      pearlType,
      birthstone,
      minCarat,
      clarity,
      color,
      cut,
      certification,
      plainMetal,
      onSale,
      newArrivals,
      engravable,
      minPrice,
      maxPrice,
      sort,
      page = '1',
      limit = '100',
    } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (req.query.id) {
      where.id = String(req.query.id);
    } else if (req.query.status && req.query.status !== 'ALL') {
      where.status = String(req.query.status);
    } else if (req.query.status === 'ALL' || req.query.includeDrafts === 'true' || req.query.admin === 'true') {
      // Show all status types including DRAFT
    } else {
      where.status = 'ACTIVE';
    }

    if (category && category !== 'All' && category !== 'all') {
      const catStr = String(category).trim();
      const catLower = catStr.toLowerCase();
      const catCap = catStr.charAt(0).toUpperCase() + catStr.slice(1).toLowerCase();
      const catClean = catLower.replace(/-/g, ' ');

      where.AND = where.AND || [];
      where.AND.push({
        OR: [
          { category: { slug: catLower } },
          { category: { name: { contains: catStr } } },
          { category: { name: { contains: catCap } } },
          { jewelleryType: { contains: catStr } },
          { jewelleryType: { contains: catCap } },
          { jewelleryType: { contains: catLower } },
          { jewelleryType: { contains: catClean } },
          { internalTagsJson: { contains: catStr } },
          { internalTagsJson: { contains: catLower } },
          { internalTagsJson: { contains: catClean } },
          { title: { contains: catClean } },
          { title: { contains: catStr } },
          { shortDescription: { contains: catClean } },
          { ringStyle: { contains: catClean } },
        ],
      });
    }

    if (collection && collection !== 'All' && collection !== 'all') {
      const colStr = String(collection).trim();
      const colLower = colStr.toLowerCase();
      const colClean = colLower.replace(/-/g, ' ');

      where.AND = where.AND || [];
      where.AND.push({
        OR: [
          { collection: { slug: colLower } },
          { collection: { name: { contains: colStr } } },
          { internalTagsJson: { contains: colStr } },
          { internalTagsJson: { contains: colLower } },
          { internalTagsJson: { contains: colClean } },
          { title: { contains: colClean } },
        ],
      });
    }

    if (gender && gender !== 'All') {
      const genderValues = String(gender).split(',');
      where.AND = where.AND || [];
      where.AND.push({
        OR: genderValues.map((g) => ({ gender: { contains: g.trim() } })),
      });
    }

    if (metal && metal !== 'All') {
      const metalTerms = String(metal).split(',');
      where.AND = where.AND || [];
      const metalOrConditions: any[] = [];
      metalTerms.forEach((mTerm) => {
        const clean = mTerm.trim().toLowerCase();
        if (clean === 'all' || clean === 'any') return;

        if (clean.includes('9k')) {
          metalOrConditions.push(
            { metal: { contains: '9K' } },
            { goldPurity: { contains: '9K' } },
            { metalsConfig: { contains: '9K' } },
            { variationsJson: { contains: '9K' } }
          );
        }
        if (clean.includes('10k')) {
          metalOrConditions.push(
            { metal: { contains: '10K' } },
            { goldPurity: { contains: '10K' } },
            { metalsConfig: { contains: '10K' } },
            { variationsJson: { contains: '10K' } }
          );
        }
        if (clean.includes('14k')) {
          metalOrConditions.push(
            { metal: { contains: '14K' } },
            { goldPurity: { contains: '14K' } },
            { metalsConfig: { contains: '14K' } },
            { variationsJson: { contains: '14K' } }
          );
        }
        if (clean.includes('18k')) {
          metalOrConditions.push(
            { metal: { contains: '18K' } },
            { goldPurity: { contains: '18K' } },
            { metalsConfig: { contains: '18K' } },
            { variationsJson: { contains: '18K' } }
          );
        }
        if (clean.includes('silver')) {
          metalOrConditions.push(
            { metal: { contains: 'Silver' } },
            { metal: { contains: '925' } },
            { goldPurity: { contains: 'Silver' } },
            { metalsConfig: { contains: 'Silver' } },
            { variationsJson: { contains: 'Silver' } }
          );
        }
        if (clean.includes('yellow')) {
          metalOrConditions.push(
            { metal: { contains: 'Yellow' } },
            { goldColor: { contains: 'Yellow' } },
            { metalsConfig: { contains: 'Yellow' } },
            { variationsJson: { contains: 'Yellow' } }
          );
        }
        if (clean.includes('white')) {
          metalOrConditions.push(
            { metal: { contains: 'White' } },
            { goldColor: { contains: 'White' } },
            { metalsConfig: { contains: 'White' } },
            { variationsJson: { contains: 'White' } }
          );
        }
        if (clean.includes('rose')) {
          metalOrConditions.push(
            { metal: { contains: 'Rose' } },
            { goldColor: { contains: 'Rose' } },
            { metalsConfig: { contains: 'Rose' } },
            { variationsJson: { contains: 'Rose' } }
          );
        }
        if (clean.includes('platinum')) {
          metalOrConditions.push(
            { metal: { contains: 'Platinum' } },
            { metalsConfig: { contains: 'Platinum' } },
            { variationsJson: { contains: 'Platinum' } }
          );
        }
        metalOrConditions.push(
          { metal: { contains: mTerm.trim() } },
          { metalsConfig: { contains: mTerm.trim() } },
          { variationsJson: { contains: mTerm.trim() } }
        );
      });
      if (metalOrConditions.length > 0) {
        where.AND.push({ OR: metalOrConditions });
      }
    }

    if (shape && shape !== 'All') {
      const shapeTerms = String(shape).split(',');
      where.AND = where.AND || [];
      where.AND.push({
        OR: shapeTerms.map((s) => ({ shape: { contains: s.trim() } })),
      });
    }

    if (style && style !== 'All' && style !== 'ALL') {
      const styleTerms = String(style).split(',');
      where.AND = where.AND || [];
      where.AND.push({
        OR: styleTerms.flatMap((st) => {
          const clean = st.trim();
          if (clean === 'ALL' || clean === 'All' || !clean) return [];
          return [
            { ringStyle: { contains: clean } },
            { specifications: { contains: clean } },
            { shortDescription: { contains: clean } },
            { fullDescription: { contains: clean } },
            { internalTagsJson: { contains: clean } },
            { name: { contains: clean } },
            { title: { contains: clean } },
          ];
        }),
      });
    }

    if (ringSize && ringSize !== 'All') {
      const cleanSize = String(ringSize).trim();
      where.AND = where.AND || [];
      where.AND.push({
        OR: [
          { ringSize: { contains: cleanSize } },
          { availableRingSizes: { contains: cleanSize } },
          { variationsJson: { contains: cleanSize } },
        ],
      });
    }

    if (ringWidth && ringWidth !== 'All') {
      where.ringWidth = { contains: ringWidth as string };
    }

    if (diamondType && diamondType !== 'All') {
      const dVal = String(diamondType).toLowerCase();
      where.AND = where.AND || [];
      if (dVal.includes('lab')) {
        where.AND.push({
          OR: [
            { diamondType: { contains: 'LAB' } },
            { diamondType: { contains: 'Lab' } },
            { diamondDetailsJson: { contains: 'Lab' } },
          ],
        });
      } else if (dVal.includes('natural')) {
        where.AND.push({
          OR: [
            { diamondType: { contains: 'NATURAL' } },
            { diamondType: { contains: 'Natural' } },
            { diamondDetailsJson: { contains: 'Natural' } },
          ],
        });
      } else {
        where.diamondType = { contains: diamondType as string };
      }
    }

    if (gemstone && gemstone !== 'All') {
      where.gemstone = { contains: gemstone as string };
    }

    if (pearlType && pearlType !== 'All') {
      where.pearlType = { contains: pearlType as string };
    }

    if (birthstone && birthstone !== 'All') {
      where.birthstone = { contains: birthstone as string };
    }

    if (minCarat && minCarat !== 'All') {
      const caratVal = parseFloat(minCarat as string) || 0;
      where.AND = where.AND || [];
      where.AND.push({
        OR: [
          { carat: { gte: caratVal } },
          { diamondDetailsJson: { contains: String(caratVal) } },
        ],
      });
    }

    if (clarity && clarity !== 'Any' && clarity !== 'All') {
      const cleanClarity = String(clarity).trim();
      where.AND = where.AND || [];
      where.AND.push({
        OR: [
          { clarity: { contains: cleanClarity } },
          { diamondDetailsJson: { contains: cleanClarity } },
        ],
      });
    }

    if (color && color !== 'Any' && color !== 'All') {
      const colorVal = String(color).toLowerCase();
      where.AND = where.AND || [];
      if (colorVal.startsWith('fancy')) {
        const fancyColorName = colorVal.replace('fancy-', '').replace('fancy ', '').trim();
        where.AND.push({
          OR: [
            { color: { contains: colorVal } },
            { color: { contains: fancyColorName } },
            { diamondDetailsJson: { contains: colorVal } },
            { diamondDetailsJson: { contains: fancyColorName } },
          ],
        });
      } else {
        where.AND.push({
          OR: [
            { color: { contains: color as string } },
            { diamondDetailsJson: { contains: color as string } },
          ],
        });
      }
    }

    if (cut && cut !== 'Any' && cut !== 'All') {
      const cleanCut = String(cut).trim();
      where.AND = where.AND || [];
      where.AND.push({
        OR: [
          { cut: { contains: cleanCut } },
          { diamondDetailsJson: { contains: cleanCut } },
        ],
      });
    }

    if (certification && certification !== 'Any' && certification !== 'All') {
      const cleanCert = String(certification).trim();
      where.AND = where.AND || [];
      where.AND.push({
        OR: [
          { certification: { contains: cleanCert } },
          { diamondDetailsJson: { contains: cleanCert } },
        ],
      });
    }

    if (plainMetal === 'true') {
      where.plainMetal = true;
    }

    if (onSale === 'true') {
      where.AND = where.AND || [];
      where.AND.push({
        OR: [
          { onSale: true },
          { comparePrice: { gt: 0 } },
        ],
      });
    }

    if (newArrivals === 'true') {
      where.isNewArrival = true;
    }

    if (engravable === 'true') {
      where.engravable = true;
    }

    if (search) {
      where.AND = where.AND || [];
      where.AND.push({
        OR: [
          { name: { contains: search as string } },
          { sku: { contains: search as string } },
          { shortDescription: { contains: search as string } },
        ],
      });
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice as string);
      if (maxPrice) where.price.lte = parseFloat(maxPrice as string);
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price-low') orderBy = { price: 'asc' };
    if (sort === 'price-high') orderBy = { price: 'desc' };
    if (sort === 'name') orderBy = { name: 'asc' };
    if (sort === 'bestsellers') orderBy = { isBestseller: 'desc' };
    if (sort === 'featured') orderBy = { isFeatured: 'desc' };
    if (sort === 'newest') orderBy = { isNewArrival: 'desc' };

    const [rawProducts, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limitNum,
        orderBy,
        include: {
          images: { orderBy: { position: 'asc' } },
          category: true,
          collection: true,
        },
      }),
      prisma.product.count({ where }),
    ]);

    const mapped = rawProducts.map(mapProductResponse);

    res.json({
      products: mapped,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.warn('getProducts database warning (returning fallback empty payload):', error);
    const pageNum = parseInt(req.query.page as string, 10) || 1;
    const limitNum = parseInt(req.query.limit as string, 10) || 100;
    res.json({
      products: [],
      pagination: {
        total: 0,
        page: pageNum,
        limit: limitNum,
        totalPages: 0,
      },
    });
  }
};

export const getProductBySlug = async (req: AuthRequest, res: Response) => {
  try {
    const { slug } = req.params;
    const customerId = (req.query.customerId as string) || (req.user?.role === 'CUSTOMER' ? req.user.id : undefined);

    let product: any = null;
    try {
      product = await prisma.product.findUnique({
        where: { slug },
        include: {
          images: { orderBy: { position: 'asc' } },
          variants: true,
          category: true,
          collection: true,
          detailSections: {
            where: { isActive: true },
            include: {
              items: {
                where: { isActive: true },
                orderBy: { displayOrder: 'asc' }
              }
            },
            orderBy: { displayOrder: 'asc' }
          }
        },
      });
    } catch (dbErr) {
      console.warn('getProductBySlug include detailSections failed, falling back to base include:', dbErr);
      product = await prisma.product.findUnique({
        where: { slug },
        include: {
          images: { orderBy: { position: 'asc' } },
          variants: true,
          category: true,
          collection: true,
        },
      });
    }

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product && (!product.detailSections || product.detailSections.length === 0)) {
      try {
        const DEFAULT_PRODUCT_SECTIONS = [
          {
            type: 'EXPERIENCE',
            title: 'YOUR ATELIER EXPERIENCE',
            description: 'Every creation is handcrafted in our master atelier using certified conflict-free diamonds and 100% recycled precious metals.',
            displayOrder: 0,
            items: [
              { title: 'Expert Guidance', description: 'Consult directly with atelier diamond specialists for sizing and diamond guidance.', icon: 'UserCheck', displayOrder: 0 },
              { title: 'Bespoke Craftsmanship', description: 'Custom CAD 3D photorealistic rendering and master goldsmithing.', icon: 'Sparkles', displayOrder: 1 },
              { title: 'Quality Assurance', description: 'Independently certified by GIA / IGI with 40x microscopic quality control.', icon: 'ShieldCheck', displayOrder: 2 },
              { title: 'Lifetime Service', description: 'Includes complimentary annual prong checking, sizing, and professional cleaning.', icon: 'Award', displayOrder: 3 }
            ]
          },
          {
            type: 'SPECIFICATIONS',
            title: 'PRODUCT & DIAMOND SPECIFICATIONS',
            description: 'Technical diamond and metal specification breakdown.',
            displayOrder: 1,
            items: [
              { title: 'Product Type', value: product.jewelleryType || 'Solitaire Ring', displayOrder: 0 },
              { title: 'Metal & Purity', value: product.metal || '18K Yellow Gold', displayOrder: 1 },
              { title: 'Diamond Shape', value: product.shape || 'Round Brilliant', displayOrder: 2 },
              { title: 'Diamond Type', value: 'Lab-Grown / Natural', displayOrder: 3 },
              { title: 'Certification', value: 'IGI / GIA Certified', displayOrder: 4 },
              { title: 'Country of Origin', value: 'India (Surat Atelier)', displayOrder: 5 }
            ]
          },
          {
            type: 'CRAFTSMANSHIP',
            title: 'CRAFTSMANSHIP & SUSTAINABILITY',
            description: 'Hand-set under 40x microscopic precision with Kimberley process certified diamonds.',
            displayOrder: 2,
            items: [
              { title: '100% Recycled Precious Metals', description: 'Sustainably refined 18K gold and fine silver certified by RJC.', icon: 'Award', displayOrder: 0 },
              { title: 'Surat Goldsmith Heritage', description: 'Crafted individually by master jewelers with lifetime guarantee.', icon: 'Sparkles', displayOrder: 1 }
            ]
          },
          {
            type: 'SHIPPING',
            title: 'SHIPPING & DELIVERY',
            description: 'Dispatched via fully insured Priority Air in discreet unbranded security packaging.',
            displayOrder: 3,
            items: [
              { title: 'Free Insured Delivery', description: 'Dispatched via fully insured Priority Air in unbranded security packaging.', icon: 'Truck', displayOrder: 0 },
              { title: '30-Day Money Back Guarantee', description: 'Complimentary returns and size adjustments within 30 days of receipt.', icon: 'ShieldCheck', displayOrder: 1 }
            ]
          }
        ];

        for (let i = 0; i < DEFAULT_PRODUCT_SECTIONS.length; i++) {
          const sec = DEFAULT_PRODUCT_SECTIONS[i];
          const createdSec = await prisma.productDetailSection.create({
            data: {
              productId: product.id,
              title: sec.title,
              type: sec.type,
              description: sec.description,
              displayOrder: sec.displayOrder,
              isActive: true,
            }
          });

          if (sec.items && sec.items.length > 0) {
            const itemData = sec.items.map((item: any) => ({
              sectionId: createdSec.id,
              title: item.title || null,
              description: item.description || null,
              value: item.value || null,
              icon: item.icon || null,
              displayOrder: item.displayOrder,
              isActive: true,
            }));
            await prisma.productDetailItem.createMany({ data: itemData });
          }
        }

        product.detailSections = await prisma.productDetailSection.findMany({
          where: { productId: product.id, isActive: true },
          include: {
            items: {
              where: { isActive: true },
              orderBy: { displayOrder: 'asc' }
            }
          },
          orderBy: { displayOrder: 'asc' }
        });
      } catch (e) {
        console.warn('Auto-seed detailSections error:', e);
      }
    }

    let customerPriceRecord = null;
    if (customerId) {
      try {
        customerPriceRecord = await prisma.customerSpecificPrice.findUnique({
          where: {
            customerId_productId: {
              customerId,
              productId: product.id,
            },
          },
        });
      } catch (e) {}
    }

    let relatedProducts: any[] = [];
    try {
      relatedProducts = await prisma.product.findMany({
        where: {
          categoryId: product.categoryId,
          id: { not: product.id },
          status: 'ACTIVE',
        },
        take: 4,
        include: {
          images: { orderBy: { position: 'asc' } },
          category: true,
        },
      });
    } catch (e) {}

    return res.json({
      product: mapProductResponse(product, customerPriceRecord),
      relatedProducts: relatedProducts.map((p) => mapProductResponse(p)),
    });
  } catch (error: any) {
    console.error('getProductBySlug error:', error);
    return res.status(500).json({ message: `Error fetching product: ${error.message || 'Unknown error'}` });
  }
};

export const getProductById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { position: 'asc' } },
        variants: true,
        category: true,
        collection: true,
      },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(mapProductResponse(product));
  } catch (error) {
    console.error('getProductById error:', error);
    res.status(500).json({ message: 'Error fetching product by ID' });
  }
};

export const getCategories = async (req: AuthRequest, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { _count: { select: { products: true } } },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
};

export const getCollections = async (req: AuthRequest, res: Response) => {
  try {
    const collections = await prisma.collection.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { products: true } } },
    });
    res.json(collections);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching collections' });
  }
};

// Admin Endpoints
export const createCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { name, slug, description, bannerImage, image, link, sortOrder, isActive } = req.body;
    const catSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const category = await prisma.category.create({
      data: {
        name,
        slug: catSlug,
        description,
        bannerImage,
        image: image || '/assets/gem_rings_cat.png',
        link: link || `/${catSlug}`,
        sortOrder: sortOrder !== undefined ? parseInt(sortOrder, 10) : 0,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
    });

    if (req.user) {
      await prisma.activityLog.create({
        data: {
          userId: req.user.id,
          action: 'CREATE_CATEGORY',
          object: `Category ${category.name}`,
        },
      });
    }

    res.status(201).json(category);
  } catch (error) {
    console.error('createCategory error:', error);
    res.status(500).json({ message: 'Error creating category' });
  }
};

export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    const prodTitle = data.title || data.name || 'Untitled Product';
    const slug = data.slug || prodTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const mainImage = data.mainImage || data.primaryImage || '/assets/gem_rings_cat.png';
    const secondaryImage = data.secondaryImage || null;

    const product = await prisma.product.create({
      data: {
        name: prodTitle,
        title: prodTitle,
        sku: data.sku,
        slug,
        masterPrice14k: data.masterPrice14k ? parseFloat(data.masterPrice14k) : 2500,
        masterPrice18k: data.masterPrice18k ? parseFloat(data.masterPrice18k) : 2750,
        masterPriceSilver: data.masterPriceSilver ? parseFloat(data.masterPriceSilver) : 2000,
        diamondDetailsJson: typeof data.diamondDetails === 'object' ? JSON.stringify(data.diamondDetails) : data.diamondDetailsJson,
        internalTagsJson: typeof data.internalTags === 'object' ? JSON.stringify(data.internalTags) : data.internalTagsJson,
        seoSocialJson: typeof data.seoSocial === 'object' ? JSON.stringify(data.seoSocial) : data.seoSocialJson,
        ...(data.categoryId ? { category: { connect: { id: data.categoryId } } } : {}),
        ...(data.collectionId ? { collection: { connect: { id: data.collectionId } } } : {}),
        shortDescription: data.shortDescription,
        fullDescription: data.fullDescription,
        specifications: data.specifications,
        careInstructions: data.careInstructions,
        jewelleryType: data.jewelleryType || 'Rings',
        ringStyle: data.style || data.ringStyle || null,
        ringSize: data.ringSize || null,
        ringWidth: data.ringWidth || null,
        gender: data.gender || 'Unisex',
        metal: data.metal || null,
        metalColor: data.metalColor || null,
        goldPurity: data.goldPurity || null,
        goldColor: data.goldColor || null,
        goldWeight: data.goldWeight ? parseFloat(data.goldWeight) : null,
        diamondType: data.diamondType || null,
        shape: data.shape || null,
        carat: data.carat ? parseFloat(data.carat) : null,
        color: data.color || null,
        clarity: data.clarity || null,
        cut: data.cut || null,
        certificateNo: data.certificateNo || null,
        certification: data.certification || null,
        gemstone: data.gemstone || null,
        gemstoneColor: data.gemstoneColor || null,
        pearlType: data.pearlType || null,
        birthstone: data.birthstone || null,
        plainMetal: Boolean(data.plainMetal),
        onSale: Boolean(data.onSale),
        engravable: Boolean(data.engravable),
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        metaKeywords: data.metaKeywords || null,
        price: parseFloat(data.price),
        comparePrice: data.comparePrice ? parseFloat(data.comparePrice) : null,
        salePrice: data.salePrice ? parseFloat(data.salePrice) : null,
        stockQuantity: data.stockQuantity ? parseInt(data.stockQuantity, 10) : 10,
        mainImage,
        secondaryImage,
        status: data.status || 'ACTIVE',
        isFeatured: Boolean(data.isFeatured),
        isBestseller: Boolean(data.isBestseller),
        isNewArrival: data.isNewArrival !== undefined ? Boolean(data.isNewArrival) : true,
        isSettingOnly: Boolean(data.isSettingOnly),
        pricingMode: data.pricingMode || 'BASE',
        enableMetalSelection: data.enableMetalSelection !== undefined ? Boolean(data.enableMetalSelection) : true,
        enableDiamondSelection: data.enableDiamondSelection !== undefined ? Boolean(data.enableDiamondSelection) : true,
        enableDiamondShape: data.enableDiamondShape !== undefined ? Boolean(data.enableDiamondShape) : true,
        enableCustomOptions: data.enableCustomOptions !== undefined ? Boolean(data.enableCustomOptions) : false,
        variationsJson: typeof data.variationsJson === 'object' ? JSON.stringify(data.variationsJson) : (data.variations ? JSON.stringify(data.variations) : data.variationsJson),
        customOptionsJson: typeof data.customOptionsJson === 'object' ? JSON.stringify(data.customOptionsJson) : (data.customOptions ? JSON.stringify(data.customOptions) : data.customOptionsJson),
        shippingInfoJson: typeof data.shippingInfoJson === 'object' ? JSON.stringify(data.shippingInfoJson) : (data.shippingInfo ? JSON.stringify(data.shippingInfo) : data.shippingInfoJson),
        enableRingSize: data.enableRingSize !== undefined ? Boolean(data.enableRingSize) : false,
        ringSizeMode: data.ringSizeMode || 'CUSTOMER_SELECTABLE',
        fixedRingSize: data.fixedRingSize || '7',
        availableRingSizes: typeof data.availableRingSizes === 'object' ? JSON.stringify(data.availableRingSizes) : data.availableRingSizes,
        isRingSizeRequired: data.isRingSizeRequired !== undefined ? Boolean(data.isRingSizeRequired) : true,
        metalsConfig: typeof data.metalsConfig === 'object' ? JSON.stringify(data.metalsConfig) : data.metalsConfig,
        diamondsConfig: typeof data.diamondsConfig === 'object' ? JSON.stringify(data.diamondsConfig) : data.diamondsConfig,
        benefitsConfig: typeof data.benefitsConfig === 'object' ? JSON.stringify(data.benefitsConfig) : data.benefitsConfig,
        accordionsConfig: typeof data.accordionsConfig === 'object' ? JSON.stringify(data.accordionsConfig) : data.accordionsConfig,
        pricingMatrix: typeof data.pricingMatrix === 'object' ? JSON.stringify(data.pricingMatrix) : data.pricingMatrix,
        draftData: typeof data.draftData === 'object' ? JSON.stringify(data.draftData) : data.draftData,
        ogImage: data.ogImage || null,
        schemaInformation: typeof data.schemaInformation === 'object' ? JSON.stringify(data.schemaInformation) : data.schemaInformation,
        craftsmanshipHeading: data.craftsmanshipHeading || null,
        craftsmanshipStory: data.craftsmanshipStory || null,
        editorialImage: data.editorialImage || null,
        recommendedProductIds: data.recommendedProductIds || null,
        completeLookProductIds: data.completeLookProductIds || null,
        images: {
          create: (data.images && data.images.length > 0
            ? data.images.map((img: any, idx: number) => ({
                url: typeof img === 'string' ? img : img.url,
                altText: (typeof img === 'object' && img.altText) ? img.altText : data.name,
                title: (typeof img === 'object' && img.title) ? img.title : null,
                imageType: (typeof img === 'object' && img.imageType) ? img.imageType : 'hero',
                position: idx,
              }))
            : [
                { url: mainImage, altText: `${data.name} - Primary`, imageType: 'hero', position: 0 },
                ...(secondaryImage ? [{ url: secondaryImage, altText: `${data.name} - Secondary`, imageType: 'angle', position: 1 }] : []),
              ]),
        },
      },
      include: { images: true, category: true },
    });

    if (req.user) {
      await prisma.activityLog.create({
        data: {
          userId: req.user.id,
          action: 'CREATE_PRODUCT',
          object: `Product ${product.name} (${product.sku})`,
        },
      });
    }

    res.status(201).json(mapProductResponse(product));
  } catch (error: any) {
    console.error('createProduct error:', error);
    let errorMsg = error.message || 'Error creating product';
    if (error.code === 'P2002') {
      errorMsg = `Product or variation could not be created because SKU or Slug already exists. (${error.meta?.target || 'Duplicate entry'})`;
    }
    res.status(400).json({ message: errorMsg });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const mainImage = data.mainImage || data.primaryImage;
    const secondaryImage = data.secondaryImage;

    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updateData: any = {
      ...((data.title || data.name) && { title: data.title || data.name, name: data.title || data.name }),
      ...(data.masterPrice14k !== undefined && { masterPrice14k: parseFloat(data.masterPrice14k) || 0 }),
      ...(data.masterPrice18k !== undefined && { masterPrice18k: parseFloat(data.masterPrice18k) || 0 }),
      ...(data.masterPriceSilver !== undefined && { masterPriceSilver: parseFloat(data.masterPriceSilver) || 0 }),
      ...(data.diamondDetailsJson !== undefined && { diamondDetailsJson: typeof data.diamondDetailsJson === 'object' ? JSON.stringify(data.diamondDetailsJson) : data.diamondDetailsJson }),
      ...(data.diamondDetails !== undefined && { diamondDetailsJson: typeof data.diamondDetails === 'object' ? JSON.stringify(data.diamondDetails) : data.diamondDetails }),
      ...(data.internalTagsJson !== undefined && { internalTagsJson: typeof data.internalTagsJson === 'object' ? JSON.stringify(data.internalTagsJson) : data.internalTagsJson }),
      ...(data.internalTags !== undefined && { internalTagsJson: typeof data.internalTags === 'object' ? JSON.stringify(data.internalTags) : data.internalTags }),
      ...(data.seoSocialJson !== undefined && { seoSocialJson: typeof data.seoSocialJson === 'object' ? JSON.stringify(data.seoSocialJson) : data.seoSocialJson }),
      ...(data.seoSocial !== undefined && { seoSocialJson: typeof data.seoSocial === 'object' ? JSON.stringify(data.seoSocial) : data.seoSocial }),
      ...(data.sku && { sku: data.sku }),
      ...(data.slug && { slug: data.slug }),
      ...(data.categoryId !== undefined && { categoryId: data.categoryId || null }),
      ...(data.collectionId !== undefined && { collectionId: data.collectionId || null }),
      ...(data.shortDescription !== undefined && { shortDescription: data.shortDescription }),
      ...(data.fullDescription !== undefined && { fullDescription: data.fullDescription }),
      ...(data.specifications !== undefined && { specifications: data.specifications }),
      ...(data.careInstructions !== undefined && { careInstructions: data.careInstructions }),
      ...(data.jewelleryType !== undefined && { jewelleryType: data.jewelleryType }),
      ...((data.style !== undefined || data.ringStyle !== undefined) && {
        ringStyle: data.style !== undefined ? data.style : data.ringStyle,
      }),
      ...(data.ringSize !== undefined && { ringSize: data.ringSize }),
      ...(data.ringWidth !== undefined && { ringWidth: data.ringWidth }),
      ...(data.gender !== undefined && { gender: data.gender }),
      ...(data.metal !== undefined && { metal: data.metal }),
      ...(data.metalColor !== undefined && { metalColor: data.metalColor }),
      ...(data.goldPurity !== undefined && { goldPurity: data.goldPurity }),
      ...(data.goldColor !== undefined && { goldColor: data.goldColor }),
      ...(data.goldWeight !== undefined && { goldWeight: data.goldWeight ? parseFloat(data.goldWeight) : null }),
      ...(data.diamondType !== undefined && { diamondType: data.diamondType }),
      ...(data.carat !== undefined && { carat: data.carat ? parseFloat(data.carat) : null }),
      ...(data.shape !== undefined && { shape: data.shape }),
      ...(data.color !== undefined && { color: data.color }),
      ...(data.clarity !== undefined && { clarity: data.clarity }),
      ...(data.cut !== undefined && { cut: data.cut }),
      ...(data.certificateNo !== undefined && { certificateNo: data.certificateNo }),
      ...(data.certification !== undefined && { certification: data.certification }),
      ...(data.gemstone !== undefined && { gemstone: data.gemstone }),
      ...(data.gemstoneColor !== undefined && { gemstoneColor: data.gemstoneColor }),
      ...(data.pearlType !== undefined && { pearlType: data.pearlType }),
      ...(data.birthstone !== undefined && { birthstone: data.birthstone }),
      ...(data.plainMetal !== undefined && { plainMetal: Boolean(data.plainMetal) }),
      ...(data.onSale !== undefined && { onSale: Boolean(data.onSale) }),
      ...(data.engravable !== undefined && { engravable: Boolean(data.engravable) }),
      ...(data.metaTitle !== undefined && { metaTitle: data.metaTitle }),
      ...(data.metaDescription !== undefined && { metaDescription: data.metaDescription }),
      ...(data.metaKeywords !== undefined && { metaKeywords: data.metaKeywords }),
      ...(data.price !== undefined && { price: parseFloat(data.price) }),
      ...(data.comparePrice !== undefined && { comparePrice: data.comparePrice ? parseFloat(data.comparePrice) : null }),
      ...(data.salePrice !== undefined && { salePrice: data.salePrice ? parseFloat(data.salePrice) : null }),
      ...(data.stockQuantity !== undefined && { stockQuantity: parseInt(data.stockQuantity, 10) }),
      ...(data.isSettingOnly !== undefined && { isSettingOnly: Boolean(data.isSettingOnly) }),
      ...(data.pricingMode !== undefined && { pricingMode: data.pricingMode }),
      ...(data.enableMetalSelection !== undefined && { enableMetalSelection: Boolean(data.enableMetalSelection) }),
      ...(data.enableDiamondSelection !== undefined && { enableDiamondSelection: Boolean(data.enableDiamondSelection) }),
      ...(data.enableDiamondShape !== undefined && { enableDiamondShape: Boolean(data.enableDiamondShape) }),
      ...(data.enableCustomOptions !== undefined && { enableCustomOptions: Boolean(data.enableCustomOptions) }),
      ...(data.variationsJson !== undefined && { variationsJson: typeof data.variationsJson === 'object' ? JSON.stringify(data.variationsJson) : data.variationsJson }),
      ...(data.variations !== undefined && { variationsJson: typeof data.variations === 'object' ? JSON.stringify(data.variations) : data.variations }),
      ...(data.customOptionsJson !== undefined && { customOptionsJson: typeof data.customOptionsJson === 'object' ? JSON.stringify(data.customOptionsJson) : data.customOptionsJson }),
      ...(data.customOptions !== undefined && { customOptionsJson: typeof data.customOptions === 'object' ? JSON.stringify(data.customOptions) : data.customOptions }),
      ...(data.shippingInfoJson !== undefined && { shippingInfoJson: typeof data.shippingInfoJson === 'object' ? JSON.stringify(data.shippingInfoJson) : data.shippingInfoJson }),
      ...(data.shippingInfo !== undefined && { shippingInfoJson: typeof data.shippingInfo === 'object' ? JSON.stringify(data.shippingInfo) : data.shippingInfo }),
      ...(data.enableRingSize !== undefined && { enableRingSize: Boolean(data.enableRingSize) }),
      ...(data.ringSizeMode !== undefined && { ringSizeMode: data.ringSizeMode }),
      ...(data.fixedRingSize !== undefined && { fixedRingSize: data.fixedRingSize }),
      ...(data.availableRingSizes !== undefined && { availableRingSizes: typeof data.availableRingSizes === 'object' ? JSON.stringify(data.availableRingSizes) : data.availableRingSizes }),
      ...(data.isRingSizeRequired !== undefined && { isRingSizeRequired: Boolean(data.isRingSizeRequired) }),
      ...(data.metalsConfig !== undefined && { metalsConfig: typeof data.metalsConfig === 'object' ? JSON.stringify(data.metalsConfig) : data.metalsConfig }),
      ...(data.diamondsConfig !== undefined && { diamondsConfig: typeof data.diamondsConfig === 'object' ? JSON.stringify(data.diamondsConfig) : data.diamondsConfig }),
      ...(data.benefitsConfig !== undefined && { benefitsConfig: typeof data.benefitsConfig === 'object' ? JSON.stringify(data.benefitsConfig) : data.benefitsConfig }),
      ...(data.accordionsConfig !== undefined && { accordionsConfig: typeof data.accordionsConfig === 'object' ? JSON.stringify(data.accordionsConfig) : data.accordionsConfig }),
      ...(data.pricingMatrix !== undefined && { pricingMatrix: typeof data.pricingMatrix === 'object' ? JSON.stringify(data.pricingMatrix) : data.pricingMatrix }),
      ...(data.draftData !== undefined && { draftData: typeof data.draftData === 'object' ? JSON.stringify(data.draftData) : data.draftData }),
      ...(data.ogImage !== undefined && { ogImage: data.ogImage }),
      ...(data.schemaInformation !== undefined && { schemaInformation: typeof data.schemaInformation === 'object' ? JSON.stringify(data.schemaInformation) : data.schemaInformation }),
      ...(data.craftsmanshipHeading !== undefined && { craftsmanshipHeading: data.craftsmanshipHeading }),
      ...(data.craftsmanshipStory !== undefined && { craftsmanshipStory: data.craftsmanshipStory }),
      ...(data.editorialImage !== undefined && { editorialImage: data.editorialImage }),
      ...(data.recommendedProductIds !== undefined && { recommendedProductIds: data.recommendedProductIds }),
      ...(data.completeLookProductIds !== undefined && { completeLookProductIds: data.completeLookProductIds }),
      ...(mainImage && { mainImage }),
      ...(secondaryImage !== undefined && { secondaryImage }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.isFeatured !== undefined && { isFeatured: Boolean(data.isFeatured) }),
      ...(data.isBestseller !== undefined && { isBestseller: Boolean(data.isBestseller) }),
      ...(data.isNewArrival !== undefined && { isNewArrival: Boolean(data.isNewArrival) }),
    };

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData,
      include: { images: true, category: true },
    });

    if (data.images && Array.isArray(data.images)) {
      await prisma.productImage.deleteMany({ where: { productId: id } });
      const newImages = data.images.map((img: any, idx: number) => ({
        productId: id,
        url: typeof img === 'string' ? img : img.url,
        altText: (typeof img === 'object' && img.altText) ? img.altText : updatedProduct.name,
        position: idx,
      }));
      await prisma.productImage.createMany({ data: newImages });

      if (newImages.length > 0) {
        await prisma.product.update({
          where: { id },
          data: {
            mainImage: newImages[0].url,
            secondaryImage: newImages[1]?.url || newImages[0].url,
          },
        });
      }
    }

    const finalProduct = await prisma.product.findUnique({
      where: { id },
      include: { images: { orderBy: { position: 'asc' } }, category: true },
    });

    if (req.user) {
      await prisma.activityLog.create({
        data: {
          userId: req.user.id,
          action: 'UPDATE_PRODUCT',
          object: `Product ${finalProduct?.name} (${finalProduct?.sku})`,
          newValue: JSON.stringify(finalProduct),
        },
      });
    }

    res.json(mapProductResponse(finalProduct));
  } catch (error: any) {
    console.error('updateProduct error:', error);
    let errorMsg = error.message || 'Error updating product';
    if (error.code === 'P2002') {
      errorMsg = `Product or variation could not be updated because SKU or Slug already exists. (${error.meta?.target || 'Duplicate entry'})`;
    }
    res.status(500).json({ message: errorMsg });
  }
};

export const duplicateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const original = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });

    if (!original) {
      return res.status(404).json({ message: 'Original product not found' });
    }

    // Generate unique SKU
    let newSku = `${original.sku}-COPY`;
    let counter = 1;
    while (await prisma.product.findUnique({ where: { sku: newSku } })) {
      counter++;
      newSku = `${original.sku}-COPY-${counter}`;
    }

    // Generate unique Slug
    let newSlug = `${original.slug}-copy`;
    let slugCounter = 1;
    while (await prisma.product.findUnique({ where: { slug: newSlug } })) {
      slugCounter++;
      newSlug = `${original.slug}-copy-${slugCounter}`;
    }

    const newName = `${original.name} - Copy`;

    // Create independent duplicate product
    const duplicated = await prisma.product.create({
      data: {
        name: newName,
        sku: newSku,
        slug: newSlug,
        categoryId: original.categoryId,
        collectionId: original.collectionId,
        shortDescription: original.shortDescription,
        fullDescription: original.fullDescription,
        specifications: original.specifications,
        careInstructions: original.careInstructions,
        jewelleryType: original.jewelleryType,
        ringStyle: original.ringStyle || null,
        ringSize: original.ringSize,
        ringWidth: original.ringWidth,
        gender: original.gender,
        metal: original.metal,
        metalColor: original.metalColor,
        goldPurity: original.goldPurity,
        goldColor: original.goldColor,
        goldWeight: original.goldWeight,
        diamondType: original.diamondType,
        shape: original.shape,
        carat: original.carat,
        color: original.color,
        clarity: original.clarity,
        cut: original.cut,
        certificateNo: original.certificateNo,
        certification: original.certification,
        gemstone: original.gemstone,
        gemstoneColor: original.gemstoneColor,
        pearlType: original.pearlType,
        birthstone: original.birthstone,
        plainMetal: original.plainMetal,
        onSale: original.onSale,
        engravable: original.engravable,
        metaTitle: original.metaTitle,
        metaDescription: original.metaDescription,
        metaKeywords: original.metaKeywords,
        price: original.price,
        comparePrice: original.comparePrice,
        salePrice: original.salePrice,
        stockQuantity: original.stockQuantity,
        mainImage: original.mainImage,
        secondaryImage: original.secondaryImage,
        status: 'DRAFT', // Always starts as Draft!
        isFeatured: original.isFeatured,
        isBestseller: original.isBestseller,
        isNewArrival: original.isNewArrival,
        isSettingOnly: original.isSettingOnly,
        pricingMode: original.pricingMode,
        enableMetalSelection: original.enableMetalSelection,
        enableDiamondSelection: original.enableDiamondSelection,
        enableDiamondShape: original.enableDiamondShape,
        enableCustomOptions: original.enableCustomOptions,
        variationsJson: original.variationsJson,
        customOptionsJson: original.customOptionsJson,
        shippingInfoJson: original.shippingInfoJson,
        enableRingSize: original.enableRingSize,
        ringSizeMode: original.ringSizeMode,
        fixedRingSize: original.fixedRingSize,
        availableRingSizes: original.availableRingSizes,
        metalsConfig: original.metalsConfig,
        diamondsConfig: original.diamondsConfig,
        benefitsConfig: original.benefitsConfig,
        accordionsConfig: original.accordionsConfig,
        pricingMatrix: original.pricingMatrix,
        ogImage: original.ogImage,
      },
    });

    // Copy ProductImages by reference
    if (original.images && original.images.length > 0) {
      for (const img of original.images) {
        await prisma.productImage.create({
          data: {
            productId: duplicated.id,
            url: img.url,
            altText: img.altText,
            title: img.title,
            imageType: img.imageType,
            position: img.position,
          },
        });
      }
    }

    if (req.user) {
      await prisma.activityLog.create({
        data: {
          userId: req.user.id,
          action: 'DUPLICATE_PRODUCT',
          object: `Product ${duplicated.name} (${duplicated.sku})`,
        },
      });
    }

    res.status(201).json(mapProductResponse(duplicated));
  } catch (error: any) {
    console.error('duplicateProduct error:', error);
    res.status(500).json({ message: error.message || 'Error duplicating product' });
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.product.delete({ where: { id } });

    if (req.user) {
      await prisma.activityLog.create({
        data: {
          userId: req.user.id,
          action: 'DELETE_PRODUCT',
          object: `Product ${deleted.name} (${deleted.sku})`,
        },
      });
    }

    res.json({ message: 'Product deleted successfully', deletedId: id });
  } catch (error) {
    console.error('deleteProduct error:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};

export const updateCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug, description, bannerImage, image, link, sortOrder, isActive } = req.body;

    const category = await prisma.category.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(slug && { slug }),
        ...(description !== undefined && { description }),
        ...(bannerImage !== undefined && { bannerImage }),
        ...(image !== undefined && { image }),
        ...(link !== undefined && { link }),
        ...(sortOrder !== undefined && { sortOrder: parseInt(sortOrder, 10) }),
        ...(isActive !== undefined && { isActive: Boolean(isActive) }),
      },
    });

    if (req.user) {
      await prisma.activityLog.create({
        data: {
          userId: req.user.id,
          action: 'UPDATE_CATEGORY',
          object: `Category ${category.name}`,
        },
      });
    }

    res.json(category);
  } catch (error) {
    console.error('updateCategory error:', error);
    res.status(500).json({ message: 'Error updating category' });
  }
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.category.delete({ where: { id } });

    if (req.user) {
      await prisma.activityLog.create({
        data: {
          userId: req.user.id,
          action: 'DELETE_CATEGORY',
          object: `Category ${deleted.name}`,
        },
      });
    }

    res.json({ message: 'Category deleted successfully', deletedId: id });
  } catch (error) {
    console.error('deleteCategory error:', error);
    res.status(500).json({ message: 'Error deleting category' });
  }
};

// ============================================================
// RING SIZE GUIDE CMS ENDPOINTS
// ============================================================
export const getRingSizeGuide = async (req: AuthRequest, res: Response) => {
  try {
    let guide = await prisma.ringSizeGuide.findUnique({ where: { id: 'main' } });
    if (!guide) {
      guide = await prisma.ringSizeGuide.create({
        data: {
          id: 'main',
          title: 'Ring Size Guide',
          slug: 'find-your-ring-size',
          status: 'PUBLISHED',
          heroTitle: 'FIND YOUR PERFECT RING SIZE',
          heroSubtitle: 'Comprehensive Diamond Sizing Guide',
          heroBg: '#19202A',
          introHeading: "Precision Sizing for Life's Timeless Moments",
          infoHeading: 'International Ring Size Conversion',
          infoDescription: 'Measure your finger diameter or convert existing ring sizes using our standardized international chart.',
          sizerHeading: 'COMPLIMENTARY PRECISION RING SIZER',
          sizerDescription: 'Receive our reusable precision ring sizer delivered directly to your door.',
          measureHeading: 'HOW TO MEASURE AT HOME',
          measureDescription: 'Follow these three simple steps using a strip of paper or string.',
          ctaHeading: 'NEED EXPERT SIZING ASSISTANCE?',
          ctaDescription: 'Our master jewellers are available 7 days a week.',
        },
      });
    }
    res.json(guide);
  } catch (error) {
    console.error('getRingSizeGuide error:', error);
    res.status(500).json({ message: 'Error fetching ring size guide' });
  }
};

export const updateRingSizeGuide = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    const guide = await prisma.ringSizeGuide.upsert({
      where: { id: 'main' },
      update: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.slug !== undefined && { slug: data.slug }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.heroTitle !== undefined && { heroTitle: data.heroTitle }),
        ...(data.heroSubtitle !== undefined && { heroSubtitle: data.heroSubtitle }),
        ...(data.heroImage !== undefined && { heroImage: data.heroImage }),
        ...(data.heroImagePosition !== undefined && { heroImagePosition: data.heroImagePosition }),
        ...(data.heroBg !== undefined && { heroBg: data.heroBg }),
        ...(data.heroCtaText !== undefined && { heroCtaText: data.heroCtaText }),
        ...(data.heroCtaUrl !== undefined && { heroCtaUrl: data.heroCtaUrl }),
        ...(data.introHeading !== undefined && { introHeading: data.introHeading }),
        ...(data.introParagraphs !== undefined && { introParagraphs: data.introParagraphs }),
        ...(data.introContent !== undefined && { introContent: data.introContent }),
        ...(data.infoHeading !== undefined && { infoHeading: data.infoHeading }),
        ...(data.infoDescription !== undefined && { infoDescription: data.infoDescription }),
        ...(data.chartImage !== undefined && { chartImage: data.chartImage }),
        ...(data.chartTitle !== undefined && { chartTitle: data.chartTitle }),
        ...(data.chartDescription !== undefined && { chartDescription: data.chartDescription }),
        ...(data.conversionsJson !== undefined && { conversionsJson: typeof data.conversionsJson === 'object' ? JSON.stringify(data.conversionsJson) : data.conversionsJson }),
        ...(data.sizerHeading !== undefined && { sizerHeading: data.sizerHeading }),
        ...(data.sizerDescription !== undefined && { sizerDescription: data.sizerDescription }),
        ...(data.sizerImage !== undefined && { sizerImage: data.sizerImage }),
        ...(data.sizerButtonText !== undefined && { sizerButtonText: data.sizerButtonText }),
        ...(data.sizerButtonUrl !== undefined && { sizerButtonUrl: data.sizerButtonUrl }),
        ...(data.measureHeading !== undefined && { measureHeading: data.measureHeading }),
        ...(data.measureDescription !== undefined && { measureDescription: data.measureDescription }),
        ...(data.measureStepsJson !== undefined && { measureStepsJson: typeof data.measureStepsJson === 'object' ? JSON.stringify(data.measureStepsJson) : data.measureStepsJson }),
        ...(data.ctaHeading !== undefined && { ctaHeading: data.ctaHeading }),
        ...(data.ctaDescription !== undefined && { ctaDescription: data.ctaDescription }),
        ...(data.ctaButtonText !== undefined && { ctaButtonText: data.ctaButtonText }),
        ...(data.ctaButtonUrl !== undefined && { ctaButtonUrl: data.ctaButtonUrl }),
        ...(data.ctaBg !== undefined && { ctaBg: data.ctaBg }),
        ...(data.seoTitle !== undefined && { seoTitle: data.seoTitle }),
        ...(data.metaDescription !== undefined && { metaDescription: data.metaDescription }),
        ...(data.keywords !== undefined && { keywords: data.keywords }),
        ...(data.canonicalUrl !== undefined && { canonicalUrl: data.canonicalUrl }),
        ...(data.ogTitle !== undefined && { ogTitle: data.ogTitle }),
        ...(data.ogDescription !== undefined && { ogDescription: data.ogDescription }),
        ...(data.ogImage !== undefined && { ogImage: data.ogImage }),
      },
      create: {
        id: 'main',
        ...data,
      },
    });

    if (req.user) {
      await prisma.activityLog.create({
        data: {
          userId: req.user.id,
          action: 'UPDATE_RING_SIZE_GUIDE',
          object: 'Ring Size Guide CMS Page',
        },
      });
    }

    res.json(guide);
  } catch (error) {
    console.error('updateRingSizeGuide error:', error);
    res.status(500).json({ message: 'Error updating ring size guide' });
  }
};

// ============================================================
// CUSTOMER-SPECIFIC PRICING ENDPOINTS
// ============================================================
export const getCustomerPrices = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, customerId } = req.query;
    const where: any = {};
    if (productId) where.productId = productId as string;
    if (customerId) where.customerId = customerId as string;

    const prices = await prisma.customerSpecificPrice.findMany({
      where,
      include: {
        customer: true,
        product: { select: { id: true, name: true, sku: true, price: true } },
      },
      orderBy: { updatedAt: 'desc' },
    });

    res.json(prices);
  } catch (error) {
    console.error('getCustomerPrices error:', error);
    res.status(500).json({ message: 'Error fetching customer prices' });
  }
};

export const upsertCustomerSpecificPrice = async (req: AuthRequest, res: Response) => {
  try {
    const { customerId, productId, specialPrice, priceAdjustment, metalsPriceAdjustments, diamondsPriceAdjustments } = req.body;

    if (!customerId || !productId) {
      return res.status(400).json({ message: 'customerId and productId are required' });
    }

    const priceRecord = await prisma.customerSpecificPrice.upsert({
      where: {
        customerId_productId: { customerId, productId },
      },
      update: {
        specialPrice: specialPrice !== undefined ? (specialPrice === null ? null : parseFloat(specialPrice)) : undefined,
        priceAdjustment: priceAdjustment !== undefined ? parseFloat(priceAdjustment) : undefined,
        metalsPriceAdjustments: typeof metalsPriceAdjustments === 'object' ? JSON.stringify(metalsPriceAdjustments) : metalsPriceAdjustments,
        diamondsPriceAdjustments: typeof diamondsPriceAdjustments === 'object' ? JSON.stringify(diamondsPriceAdjustments) : diamondsPriceAdjustments,
      },
      create: {
        customerId,
        productId,
        specialPrice: specialPrice !== undefined && specialPrice !== null ? parseFloat(specialPrice) : null,
        priceAdjustment: priceAdjustment ? parseFloat(priceAdjustment) : 0,
        metalsPriceAdjustments: typeof metalsPriceAdjustments === 'object' ? JSON.stringify(metalsPriceAdjustments) : metalsPriceAdjustments,
        diamondsPriceAdjustments: typeof diamondsPriceAdjustments === 'object' ? JSON.stringify(diamondsPriceAdjustments) : diamondsPriceAdjustments,
      },
      include: { customer: true, product: true },
    });

    if (req.user) {
      await prisma.activityLog.create({
        data: {
          userId: req.user.id,
          action: 'UPSERT_CUSTOMER_PRICE',
          object: `Customer Price for ${priceRecord.customer.name} on ${priceRecord.product.name}`,
        },
      });
    }

    res.json(priceRecord);
  } catch (error) {
    console.error('upsertCustomerSpecificPrice error:', error);
    res.status(500).json({ message: 'Error saving customer specific price' });
  }
};

export const deleteCustomerSpecificPrice = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.customerSpecificPrice.delete({ where: { id } });
    res.json({ message: 'Customer price record deleted successfully' });
  } catch (error) {
    console.error('deleteCustomerSpecificPrice error:', error);
    res.status(500).json({ message: 'Error deleting customer price' });
  }
};

// ============================================================
// SERVER-SIDE PRICE CALCULATION (SECURITY ENFORCED)
// ============================================================
export const calculateServerSidePrice = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;
    const { metalLabel, diamondId, ringSize, quantity = 1 } = req.body;

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const customerId = req.user?.role === 'CUSTOMER' ? req.user.id : (req.body.customerId as string);

    let customerPriceRecord = null;
    if (customerId) {
      customerPriceRecord = await prisma.customerSpecificPrice.findUnique({
        where: { customerId_productId: { customerId, productId } },
      });
    }

    let basePrice = product.price;
    if (customerPriceRecord?.specialPrice !== null && customerPriceRecord?.specialPrice !== undefined) {
      basePrice = customerPriceRecord.specialPrice;
    } else if (customerPriceRecord?.priceAdjustment) {
      basePrice += customerPriceRecord.priceAdjustment;
    }

    let metalAdjustment = 0;
    const metalsConfig = safeJsonParse(product.metalsConfig, []);
    if (metalLabel) {
      const customMetalRules = customerPriceRecord?.metalsPriceAdjustments ? safeJsonParse(customerPriceRecord.metalsPriceAdjustments, {}) : {};
      if (customMetalRules[metalLabel] !== undefined) {
        metalAdjustment = parseFloat(customMetalRules[metalLabel]);
      } else {
        const foundMetal = metalsConfig.find((m: any) => m.label === metalLabel);
        if (foundMetal) {
          metalAdjustment = foundMetal.priceAdjustment || 0;
        }
      }
    }

    let diamondPrice = 0;
    if (diamondId) {
      const customDiamondRules = customerPriceRecord?.diamondsPriceAdjustments ? safeJsonParse(customerPriceRecord.diamondsPriceAdjustments, {}) : {};
      if (customDiamondRules[diamondId] !== undefined) {
        diamondPrice = parseFloat(customDiamondRules[diamondId]);
      } else {
        const dbDiamond = await prisma.diamond.findUnique({ where: { id: diamondId } });
        if (dbDiamond) {
          diamondPrice = dbDiamond.price;
        } else {
          const diamondsConfig = safeJsonParse(product.diamondsConfig, []);
          const foundDiamond = diamondsConfig.find((d: any) => d.id === diamondId);
          if (foundDiamond) {
            diamondPrice = foundDiamond.price || 0;
          }
        }
      }
    }

    const unitPrice = basePrice + metalAdjustment + diamondPrice;
    const totalAmount = unitPrice * (parseInt(String(quantity), 10) || 1);

    res.json({
      productId: product.id,
      productName: product.name,
      basePrice,
      metalAdjustment,
      diamondPrice,
      unitPrice,
      quantity,
      totalAmount,
      currency: 'USD',
      isCustomerCustomPrice: Boolean(customerPriceRecord),
    });
  } catch (error) {
    console.error('calculateServerSidePrice error:', error);
    res.status(500).json({ message: 'Error calculating price' });
  }
};

// INITIAL DEMO PRODUCT SEEDER (NON-DESTRUCTIVE: ONLY SEEDS IF PRODUCT COUNT IS ZERO)
export const ensureSingleDemoProductEnforced = async () => {
  try {
    const productCount = await prisma.product.count();
    if (productCount === 0) {
      console.log('🌱 Seeding initial demo product for empty database...');
      let ringsCategory = await prisma.category.findFirst({
        where: { OR: [{ slug: 'rings' }, { name: 'Rings' }] },
      });
      if (!ringsCategory) {
        ringsCategory = await prisma.category.create({
          data: {
            name: 'Rings',
            slug: 'rings',
            description: 'Luxury Diamond Atelier Rings',
            image: '/assets/gem_rings_cat.png',
            bannerImage: '/assets/gem_rings_cat.png',
            link: '/rings',
            isActive: true,
          },
        });
      }

      const metalsConfig = [
        { label: '14K Yellow Gold', code: '14k', circleColor: '#E8C872', priceAdjustment: 0 },
        { label: '14K White Gold', code: '14k', circleColor: '#CBD5E1', priceAdjustment: 100 },
        { label: '14K Rose Gold', code: '14k', circleColor: '#E4A8A5', priceAdjustment: 100 },
        { label: '18K Yellow Gold', code: '18k', circleColor: '#E8C872', priceAdjustment: 500 },
        { label: '18K White Gold', code: '18k', circleColor: '#CBD5E1', priceAdjustment: 600 },
        { label: '18K Rose Gold', code: '18k', circleColor: '#E4A8A5', priceAdjustment: 600 },
        { label: 'Silver', code: 'Ag', circleColor: '#E2E8F0', priceAdjustment: 0 },
      ];

      const shapesData = [
        { name: 'Round', mult: 1.0 },
        { name: 'Oval', mult: 1.05 },
        { name: 'Emerald', mult: 1.1 },
        { name: 'Pear', mult: 1.03 },
        { name: 'Radiant', mult: 1.05 },
        { name: 'Princess', mult: 1.02 },
        { name: 'Cushion', mult: 1.06 },
        { name: 'Marquise', mult: 1.04 },
        { name: 'Asscher', mult: 1.08 },
        { name: 'Heart', mult: 1.03 },
        { name: 'Baguette', mult: 0.9 },
      ];

      const baseCaratPrices: Record<number, number> = {
        1.0: 5000, 2.0: 7000, 3.0: 9500, 4.0: 12500, 5.0: 16000,
        6.0: 20000, 7.0: 25000, 8.0: 30000, 9.0: 36000, 10.0: 42000,
      };

      const diamondsConfig = shapesData.map((shp) => {
        const carats = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0].map((c) => {
          const baseRoundPrice = baseCaratPrices[c] || 5000;
          const basePrice = Math.round(baseRoundPrice * shp.mult);
          return {
            carat: c,
            price: basePrice,
            metalPrices: {
              '14K Yellow Gold': basePrice,
              '14K White Gold': basePrice + 100,
              '14K Rose Gold': basePrice + 100,
              '18K Yellow Gold': basePrice + 500,
              '18K White Gold': basePrice + 600,
              '18K Rose Gold': basePrice + 600,
              Silver: basePrice + 0,
            },
            color: 'E', clarity: 'VS1', lab: 'IGI', cut: 'Excellent', polish: 'Excellent', symmetry: 'Excellent', fluorescence: 'None',
          };
        });
        return { shape: shp.name, carats };
      });

      const availableRingSizes = [
        'US 4', 'US 4.5', 'US 5', 'US 5.5', 'US 6', 'US 6.5', 'US 7', 'US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 11.5', 'US 12'
      ];

      const customOptions = [
        {
          id: 'opt_initials',
          label: 'Initials',
          fieldType: 'Dropdown',
          required: false,
          placeholder: 'Select Initials',
          values: [
            { label: 'V', value: 'V', priceAdjustment: 0 },
            { label: 'R', value: 'R', priceAdjustment: 0 },
            { label: 'Z', value: 'Z', priceAdjustment: 25 },
          ],
        },
        {
          id: 'opt_engraving',
          label: 'Engraving',
          fieldType: 'Text Input',
          required: false,
          placeholder: 'Enter your engraving',
          priceAdjustment: 50,
          values: [],
        },
        {
          id: 'opt_packaging',
          label: 'Gift Packaging',
          fieldType: 'Single Checkbox',
          required: false,
          priceAdjustment: 35,
          values: [{ label: 'Luxury Gift Packaging', value: 'Yes', priceAdjustment: 35 }],
        },
      ];

      const accordionsConfig = [
        { id: 'exp', title: 'YOUR ATELIER EXPERIENCE', content: 'Every creation is handcrafted in our master atelier using certified conflict-free diamonds.' },
        { id: 'spec', title: 'PRODUCT & DIAMOND SPECIFICATIONS', content: 'Hand-set by master artisans under 40x microscopic precision.' },
        { id: 'craft', title: 'CRAFTSMANSHIP & SUSTAINABILITY', content: 'Sustainably crafted with 100% recycled 18K gold and Platinum.' },
        { id: 'ship', title: 'SHIPPING & RETURNS', content: 'Dispatched via fully insured FedEx Priority Air.' },
      ];

      // Build Metal x Ring Size Variations (No Diamond in Variations Matrix)
      const demoVariations: any[] = [];
      const baseSku = 'AD-DEMO-RING-001';
      for (const m of metalsConfig) {
        for (const sz of availableRingSizes) {
          const price = 5000 + m.priceAdjustment;
          const metalCode = m.label.replace(/[^a-zA-Z0-9]/g, '').substring(0, 4).toUpperCase();
          const sizeCode = sz.replace(/[^a-zA-Z0-9]/g, '');
          demoVariations.push({
            metal: m.label,
            ringSize: sz,
            price,
            sku: `${baseSku}-${metalCode}-${sizeCode}`,
            status: 'ACTIVE',
          });
        }
      }

      await prisma.product.create({
        data: {
          name: 'Aura Signature Solitaire Ring',
          sku: 'AD-DEMO-RING-001',
          slug: 'aura-signature-solitaire-ring',
          categoryId: ringsCategory.id,
          jewelleryType: 'Ring',
          status: 'DRAFT',
          shortDescription: 'A luxury solitaire engagement ring designed to showcase multiple diamond shapes and carat options.',
          fullDescription: 'A luxury solitaire engagement ring designed to showcase multiple diamond shapes and carat options with a premium customizable configuration.',
          price: 5500,
          metal: '18K Yellow Gold',
          shape: 'Round',
          carat: 1.0,
          enableRingSize: true,
          enableMetalSelection: true,
          enableDiamondSelection: true,
          enableDiamondShape: true,
          enableCustomOptions: true,
          metalsConfig: JSON.stringify(metalsConfig),
          diamondsConfig: JSON.stringify(diamondsConfig),
          availableRingSizes: JSON.stringify(availableRingSizes),
          customOptionsJson: JSON.stringify(customOptions),
          accordionsConfig: JSON.stringify(accordionsConfig),
          variationsJson: JSON.stringify(demoVariations),
          metaTitle: 'Aura Signature Solitaire Ring | Luxury Diamond Ring',
          metaDescription: 'Explore the Aura Signature Solitaire Ring with customizable diamond shapes, 1–10 carat options, premium metals, and personalized details.',
          mainImage: '',
          secondaryImage: null,
        },
      });
      console.log('✅ Single Demo Product Enforced with Metal x Ring Size variations (TOTAL PRODUCTS = 1).');
    }
  } catch (err) {
    console.error('Error enforcing single demo product:', err);
  }
};

export const resetDatabaseToSingleDemoProduct = async (req: AuthRequest, res: Response) => {
  try {
    await prisma.review.deleteMany({});
    await prisma.cartItem.deleteMany({});
    await prisma.wishlistItem.deleteMany({});
    await prisma.customerSpecificPrice.deleteMany({});
    await prisma.productImage.deleteMany({});
    await prisma.productVideo.deleteMany({});
    await prisma.productVariant.deleteMany({});

    const deleteResult = await prisma.product.deleteMany({});

    await ensureSingleDemoProductEnforced();

    const count = await prisma.product.count();
    const demo = await prisma.product.findUnique({ where: { sku: 'FJ-DEMO-RING-001' } });

    res.json({
      success: true,
      message: `Database cleaned! Total Products: ${count}. Single Demo Product: ${demo?.name} (${demo?.sku}).`,
      deletedCount: deleteResult.count,
      product: demo,
    });
  } catch (error: any) {
    console.error('resetDatabaseToSingleDemoProduct error:', error);
    res.status(500).json({ message: `Database reset failed: ${error.message}` });
  }
};
