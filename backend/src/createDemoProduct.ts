import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createDemoProduct() {
  console.log('--- FLOKSY JEWEL DEMO PRODUCT GENERATOR ---');

  // 1. DELETE ALL EXISTING PRODUCTS TO START FRESH
  console.log('Deleting all existing product records...');
  await prisma.review.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.wishlistItem.deleteMany({});
  await prisma.customerSpecificPrice.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.productVideo.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});

  // 2. ENSURE RINGS CATEGORY EXISTS
  let ringsCategory = await prisma.category.findFirst({
    where: { OR: [{ slug: 'rings' }, { name: 'Rings' }] },
  });

  if (!ringsCategory) {
    ringsCategory = await prisma.category.create({
      data: {
        name: 'Rings',
        slug: 'rings',
        description: 'Luxury Fine Jewelry Rings',
        image: '/assets/floksy_rings_cat.png',
        bannerImage: '/assets/floksy_rings_cat.png',
        link: '/rings',
        isActive: true,
      },
    });
  }

  // 3. EXACT 7 APPROVED METALS CONFIGURATION
  const metalsConfig = [
    { label: '14K Yellow Gold', code: '14k', circleColor: '#E8C872', priceAdjustment: 0 },
    { label: '14K White Gold', code: '14k', circleColor: '#CBD5E1', priceAdjustment: 0 },
    { label: '14K Rose Gold', code: '14k', circleColor: '#E4A8A5', priceAdjustment: 0 },
    { label: '18K Yellow Gold', code: '18k', circleColor: '#E8C872', priceAdjustment: 250 },
    { label: '18K White Gold', code: '18k', circleColor: '#CBD5E1', priceAdjustment: 350 },
    { label: '18K Rose Gold', code: '18k', circleColor: '#E4A8A5', priceAdjustment: 350 },
    { label: 'Silver', code: 'Ag', circleColor: '#E2E8F0', priceAdjustment: 0 },
  ];

  // 4. RING SIZES (US 4 to US 12)
  const availableRingSizes = [
    'US 4',
    'US 4.5',
    'US 5',
    'US 5.5',
    'US 6',
    'US 6.5',
    'US 7',
    'US 7.5',
    'US 8',
    'US 8.5',
    'US 9',
    'US 9.5',
    'US 10',
    'US 10.5',
    'US 11',
    'US 11.5',
    'US 12',
  ];

  // 5. CUSTOM PRODUCT OPTIONS
  const customOptions = [
    {
      id: 'opt_initials',
      title: 'Initials',
      inputType: 'Text',
      required: true,
      placeholder: 'e.g. V.R.',
      maxLength: 10,
    },
    {
      id: 'opt_engraving',
      title: 'Laser Engraving',
      inputType: 'Textarea',
      required: false,
      placeholder: 'Enter custom laser text (max 25 chars)',
      maxLength: 25,
    },
  ];

  // 6. ACCORDION SECTIONS
  const accordionsConfig = [
    {
      id: 'experience',
      title: 'YOUR FLOKSY JEWEL EXPERIENCE',
      content: 'Every creation is handcrafted in our Surat atelier using certified conflict-free materials and 100% recycled precious metals.',
      enabled: true,
      defaultOpen: true,
    },
    {
      id: 'specifications',
      title: 'PRODUCT & DIAMOND SPECIFICATIONS',
      content: 'Hand-set by master artisans under 40x microscopic precision.',
      enabled: true,
      defaultOpen: false,
    },
    {
      id: 'craftsmanship',
      title: 'CRAFTSMANSHIP & SUSTAINABILITY',
      content: 'Sustainably crafted with 100% recycled 18K gold and fine silver.',
      enabled: true,
      defaultOpen: false,
    },
    {
      id: 'shipping',
      title: 'SHIPPING & COMPLIMENTARY RETURNS',
      content: 'Dispatched via fully insured FedEx Priority Air in discreet unbranded security packaging. 30-day return policy.',
      enabled: true,
      defaultOpen: false,
    },
  ];

  const diamondDetails = {
    shape: 'Round',
    caratWeight: 1.0,
    color: 'D',
    clarity: 'VS1',
    cut: 'Excellent',
    polish: 'Excellent',
    symmetry: 'Excellent',
    fluorescence: 'None',
    certification: 'IGI',
    certificateNumber: 'LG620491823',
    origin: 'Lab-Grown',
    measurements: '6.50 × 6.50 × 3.95 mm',
  };

  const internalTags = ['bestseller-candidate', 'yellow-gold', 'lab-grown', 'campaign-2026'];
  const seoSocial = {
    keywords: 'solitaire ring, lab grown diamond, 14k white gold ring, fine jewelry',
    ogTitle: 'Floksy Jewel Signature Solitaire Ring | Fine Jewelry',
    ogDescription: 'Explore the Floksy Jewel Signature Solitaire Ring with 7 precious metal options.',
    socialImage: '/assets/floksy_rings_cat.png',
    twitterTitle: 'Floksy Jewel Signature Solitaire Ring',
    twitterDescription: 'Handcrafted in Surat with 100% recycled precious metals.',
    canonicalUrl: 'https://floksyjewel.com/product/floksy-jewel-signature-solitaire-ring',
  };

  // 7. CREATE THE SINGLE CANONICAL DEMO PRODUCT
  const demoProduct = await prisma.product.create({
    data: {
      name: 'Floksy Jewel Signature Solitaire Ring',
      title: 'Floksy Jewel Signature Solitaire Ring',
      sku: 'FJ-DEMO-RING-001',
      slug: 'floksy-jewel-signature-solitaire-ring',
      categoryId: ringsCategory.id,
      jewelleryType: 'Rings',
      status: 'ACTIVE',
      shortDescription: 'A luxury Floksy Jewel solitaire ring with customizable metal options and ring sizes.',
      fullDescription: 'A luxury Floksy Jewel solitaire ring handcrafted in Surat, featuring 7 precious metal options and customizable sizing.',
      price: 2500,
      comparePrice: 3000,
      masterPrice14k: 2500,
      masterPrice18k: 2750,
      masterPriceSilver: 2000,
      metal: '18K Yellow Gold',
      enableRingSize: true,
      enableMetalSelection: true,
      enableCustomOptions: true,
      metalsConfig: JSON.stringify(metalsConfig),
      availableRingSizes: JSON.stringify(availableRingSizes),
      customOptionsJson: JSON.stringify(customOptions),
      accordionsConfig: JSON.stringify(accordionsConfig),
      diamondDetailsJson: JSON.stringify(diamondDetails),
      internalTagsJson: JSON.stringify(internalTags),
      seoSocialJson: JSON.stringify(seoSocial),
      metaTitle: 'Floksy Jewel Signature Solitaire Ring | Luxury Fine Jewelry',
      metaDescription: 'Explore the Floksy Jewel Signature Solitaire Ring with customizable 7 precious metal options and personalized details.',
      mainImage: '/assets/floksy_rings_cat.png',
      secondaryImage: '/assets/floksy_rings_cat_2.png',
    },
  });

  console.log('✅ CANONICAL DEMO PRODUCT CREATED SUCCESSFULLY!');
  console.log(`Product ID: ${demoProduct.id}`);
  console.log(`Product Title: ${demoProduct.title}`);
  console.log(`SKU: ${demoProduct.sku}`);
  console.log(`Slug: ${demoProduct.slug}`);
  console.log(`Metals Count: ${metalsConfig.length}`);

  await prisma.$disconnect();
}

createDemoProduct().catch((err) => {
  console.error('Error creating demo product:', err);
  prisma.$disconnect();
  process.exit(1);
});
