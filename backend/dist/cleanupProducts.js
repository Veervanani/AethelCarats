"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function cleanupAndKeepSingleDemoProduct() {
    console.log('==================================================');
    console.log('AURA DIAMOND ATELIER DATABASE CLEANUP — SINGLE DEMO PRODUCT');
    console.log('==================================================');
    // 1. DELETE ALL PRODUCT-SPECIFIC CHILD RECORDS
    console.log('1. Deleting product-specific child records...');
    await prisma.review.deleteMany({});
    await prisma.cartItem.deleteMany({});
    await prisma.wishlistItem.deleteMany({});
    await prisma.customerSpecificPrice.deleteMany({});
    await prisma.productImage.deleteMany({});
    await prisma.productVideo.deleteMany({});
    await prisma.productVariant.deleteMany({});
    // 2. DELETE ALL PRODUCTS FROM DATABASE
    console.log('2. Deleting all existing products from database...');
    const deleteResult = await prisma.product.deleteMany({});
    console.log(`Deleted ${deleteResult.count} old products.`);
    // 3. ENSURE RINGS CATEGORY EXISTS
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
    // 4. PREPARE THE SINGLE DEMO PRODUCT CONFIGURATION
    // A. Metals (Exactly 7 Precious Metals - No 9K, No 10K)
    const metalsConfig = [
        { label: '14K Yellow Gold', code: '14k', circleColor: '#E8C872', priceAdjustment: 0 },
        { label: '14K White Gold', code: '14k', circleColor: '#CBD5E1', priceAdjustment: 100 },
        { label: '14K Rose Gold', code: '14k', circleColor: '#E4A8A5', priceAdjustment: 100 },
        { label: '18K Yellow Gold', code: '18k', circleColor: '#E8C872', priceAdjustment: 500 },
        { label: '18K White Gold', code: '18k', circleColor: '#CBD5E1', priceAdjustment: 600 },
        { label: '18K Rose Gold', code: '18k', circleColor: '#E4A8A5', priceAdjustment: 600 },
        { label: 'Silver', code: 'Ag', circleColor: '#E2E8F0', priceAdjustment: 0 },
    ];
    // B. 11 Diamond Shapes with Multipliers
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
    // Base Round Carat Prices (1.00ct - 10.00ct)
    const baseCaratPrices = {
        1.0: 5000,
        2.0: 7000,
        3.0: 9500,
        4.0: 12500,
        5.0: 16000,
        6.0: 20000,
        7.0: 25000,
        8.0: 30000,
        9.0: 36000,
        10.0: 42000,
    };
    // Build 110 Shape + Carat Combinations
    const diamondsConfig = shapesData.map((shp) => {
        const carats = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0].map((c) => {
            const baseRoundPrice = baseCaratPrices[c] || 5000;
            const basePrice = Math.round(baseRoundPrice * shp.mult);
            const metalPrices = {
                '14K Yellow Gold': basePrice + 0,
                '14K White Gold': basePrice + 100,
                '14K Rose Gold': basePrice + 100,
                '18K Yellow Gold': basePrice + 500,
                '18K White Gold': basePrice + 600,
                '18K Rose Gold': basePrice + 600,
                Silver: basePrice + 0,
            };
            return {
                carat: c,
                price: basePrice,
                metalPrices,
                color: 'E',
                clarity: 'VS1',
                lab: 'IGI',
                cut: 'Excellent',
                polish: 'Excellent',
                symmetry: 'Excellent',
                fluorescence: 'None',
            };
        });
        return {
            shape: shp.name,
            carats,
        };
    });
    // C. Ring Sizes (US 4 to US 12)
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
    // D. Custom Personalization Options (Initials, Engraving, Gift Packaging)
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
            values: [
                { label: 'Luxury Gift Packaging', value: 'Yes', priceAdjustment: 35 },
            ],
        },
    ];
    // E. Accordions Config
    const accordionsConfig = [
        {
            id: 'experience',
            title: 'YOUR ATELIER EXPERIENCE',
            content: 'Every creation is handcrafted in our master atelier using certified conflict-free diamonds and 100% recycled precious metals.',
        },
        {
            id: 'specifications',
            title: 'PRODUCT & DIAMOND SPECIFICATIONS',
            content: 'Hand-set by master artisans under 40x microscopic precision with Kimberley process certified diamonds.',
        },
        {
            id: 'craftsmanship',
            title: 'CRAFTSMANSHIP & SUSTAINABILITY',
            content: 'Sustainably crafted with 100% recycled 18K gold and Silver.',
        },
        {
            id: 'shipping',
            title: 'SHIPPING & RETURNS',
            content: 'Dispatched via fully insured FedEx Priority Air in discreet unbranded security packaging.',
        },
    ];
    // F. Build Metal x Ring Size Variations (No Diamond in Variations Matrix)
    const demoVariations = [];
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
    // 5. CREATE EXACTLY ONE DEMO PRODUCT
    console.log('3. Inserting the single official demo product into database...');
    const demoProduct = await prisma.product.create({
        data: {
            name: 'Aura Signature Solitaire Ring',
            sku: 'AD-DEMO-RING-001',
            slug: 'aura-signature-solitaire-ring',
            categoryId: ringsCategory.id,
            jewelleryType: 'Ring',
            status: 'DRAFT',
            shortDescription: 'A luxury solitaire engagement ring created as a demonstration product for testing the Metal, Ring Size, Diamond Selection, Custom Options, and dynamic pricing systems.',
            fullDescription: 'A luxury solitaire engagement ring created as a demonstration product for testing the Metal, Ring Size, Diamond Selection, Custom Options, and dynamic pricing systems.',
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
            metaDescription: 'Explore the Aura Signature Solitaire Ring with customizable diamond selection, premium metals, ring sizes, and personalized details.',
            mainImage: '',
            secondaryImage: null,
        },
    });
    // 6. VERIFY FINAL DATABASE STATE
    const totalProducts = await prisma.product.count();
    console.log('\n==================================================');
    console.log('✅ DATABASE CLEANUP COMPLETE!');
    console.log(`Total Products in DB: ${totalProducts}`);
    console.log(`Single Demo Product Name: ${demoProduct.name}`);
    console.log(`SKU: ${demoProduct.sku}`);
    console.log(`Status: ${demoProduct.status}`);
    console.log(`Category: ${ringsCategory.name}`);
    console.log('==================================================');
    await prisma.$disconnect();
}
cleanupAndKeepSingleDemoProduct().catch((err) => {
    console.error('Error during database cleanup:', err);
    prisma.$disconnect();
    process.exit(1);
});
