"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seedService_1 = require("./services/seedService");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting AethelCarats Fine Jewellery database seeding...');
    // 1. Admin User Seeding (Idempotent, Hashed Password, Environment Secret Support)
    const initialUsername = process.env.ADMIN_INITIAL_USERNAME || 'admin@aethelcarats.com';
    const initialPassword = process.env.ADMIN_INITIAL_PASSWORD || 'AethelCarats@2026!';
    const passwordHash = await bcryptjs_1.default.hash(initialPassword, 10);
    const adminUser = await prisma.user.upsert({
        where: { email: initialUsername },
        update: {
            passwordHash,
            role: 'SUPER_ADMIN',
            name: 'AethelCarats Administrator',
        },
        create: {
            email: initialUsername,
            name: 'AethelCarats Administrator',
            passwordHash,
            role: 'SUPER_ADMIN',
        },
    });
    console.log('👤 Admin user seeded/updated:', adminUser.email);
    // 2. Categories
    const categoriesData = [
        { name: 'Rings', slug: 'rings', description: 'Timeless engagement, solitaire, and eternity rings.', bannerImage: '/assets/gem_rings_cat.png' },
        { name: 'Earrings', slug: 'earrings', description: 'Exquisite diamond studs, drops, and hoops.', bannerImage: '/assets/gem_earrings_cat.png' },
        { name: 'Necklaces', slug: 'necklaces', description: 'Sophisticated riviere and solitaire diamond necklaces.', bannerImage: '/assets/gem_necklaces_cat.png' },
        { name: 'Bracelets', slug: 'bracelets', description: 'Tennis bracelets and sculpted gold cuffs.', bannerImage: '/assets/gem_bracelets_cat.png' },
        { name: 'Pendants', slug: 'pendants', description: 'Delicate gemstone and solitaire diamond pendants.', bannerImage: '/assets/gem_pendants_cat.png' },
    ];
    const categories = [];
    for (const cat of categoriesData) {
        const created = await prisma.category.upsert({
            where: { slug: cat.slug },
            update: cat,
            create: cat,
        });
        categories.push(created);
    }
    // 3. Collections
    const collectionsData = [
        { name: 'Signature Collection', slug: 'signature-collection', description: 'Our quintessential high jewellery designs.', bannerImage: '/assets/gem_rings_cat.png', isFeatured: true },
        { name: 'Solitaire Selection', slug: 'solitaire-selection', description: 'Pure brilliance centered on exceptional diamonds.', bannerImage: '/assets/gem_rings_cat.png', isFeatured: true },
        { name: 'High Jewellery 2026', slug: 'high-jewellery-2026', description: 'Handcrafted luxury pieces produced in limited atelier editions.', bannerImage: '/assets/editorial_banner.png', isFeatured: true },
    ];
    const collections = [];
    for (const col of collectionsData) {
        const created = await prisma.collection.upsert({
            where: { slug: col.slug },
            update: col,
            create: col,
        });
        collections.push(created);
    }
    // 4. Products
    const productsData = [
        {
            name: 'The Aurelia Solitaire Diamond Ring',
            sku: 'AD-RNG-001',
            slug: 'aurelia-solitaire-diamond-ring',
            categoryId: categories[0].id,
            collectionId: collections[0].id,
            shortDescription: 'A classic 1.50ct round brilliant diamond set in handcrafted 18K Yellow Gold.',
            fullDescription: 'The Aurelia Solitaire represents the pinnacle of minimal luxury. Featuring a six-prong setting designed to maximize light entering the center diamond, meticulously polished for unmatched brilliance.',
            jewelleryType: 'Rings',
            ringStyle: 'Solitaire',
            gender: 'Women',
            metal: '18K Yellow Gold',
            goldPurity: '750 Gold',
            goldColor: 'Yellow Gold',
            goldWeight: 4.8,
            carat: 1.50,
            shape: 'Round',
            color: 'F',
            clarity: 'VS1',
            cut: 'Excellent',
            price: 6850,
            comparePrice: 7500,
            mainImage: '/assets/gem_rings_cat.png',
            secondaryImage: '/assets/gem_rings_cat_2.png',
            isFeatured: true,
            isBestseller: true,
        },
        {
            name: 'Celestial Oval Diamond Halo Ring',
            sku: 'AD-RNG-002',
            slug: 'celestial-oval-diamond-halo-ring',
            categoryId: categories[0].id,
            collectionId: collections[1].id,
            shortDescription: 'An elegant 2.00ct oval diamond enveloped by a micropavé diamond halo in 18K White Gold.',
            fullDescription: 'Sculpted by master jewelers, the Celestial Oval features a cathedral shank adorned with micro-brilliants, amplifying the majestic presence of the center oval cut.',
            jewelleryType: 'Rings',
            ringStyle: 'Halo',
            gender: 'Women',
            metal: '18K White Gold',
            goldPurity: '750 Gold',
            goldColor: 'White Gold',
            goldWeight: 5.2,
            carat: 2.00,
            shape: 'Oval',
            color: 'E',
            clarity: 'VVS2',
            cut: 'Excellent',
            price: 11400,
            comparePrice: 12800,
            mainImage: '/assets/gem_rings_cat_2.png',
            secondaryImage: '/assets/gem_rings_cat.png',
            isFeatured: true,
        },
        {
            name: 'Eternity Pavé Diamond Band',
            sku: 'AD-RNG-003',
            slug: 'eternity-pave-diamond-band',
            categoryId: categories[0].id,
            collectionId: collections[0].id,
            shortDescription: 'A continuous line of 3.20ct brilliant round diamonds set in solid Platinum.',
            fullDescription: 'Unbroken radiance encircled in handcrafted platinum. Each diamond is selected for exceptional white color and fiery scintillation.',
            jewelleryType: 'Rings',
            ringStyle: 'Eternity',
            gender: 'Women',
            metal: 'Platinum',
            goldPurity: '950 Platinum',
            goldColor: 'Platinum',
            goldWeight: 6.8,
            carat: 3.20,
            shape: 'Round',
            color: 'F',
            clarity: 'VS1',
            cut: 'Excellent',
            price: 8900,
            comparePrice: 9800,
            mainImage: '/assets/gem_rings_cat.png',
            secondaryImage: '/assets/gem_rings_cat_2.png',
            isBestseller: true,
        },
        {
            name: 'The Monarch Emerald Cut Solitaire',
            sku: 'AD-RNG-004',
            slug: 'the-monarch-emerald-cut-solitaire',
            categoryId: categories[0].id,
            collectionId: collections[2].id,
            shortDescription: 'A majestic 2.50ct emerald cut diamond in an 18K Yellow Gold architectural basket setting.',
            fullDescription: 'The Monarch showcases step-cut faceting that creates a mesmerizing hall-of-mirrors optical phenomenon, held securely by corner claws.',
            jewelleryType: 'Rings',
            ringStyle: 'Solitaire',
            gender: 'Women',
            metal: '18K Yellow Gold',
            goldPurity: '750 Gold',
            goldColor: 'Yellow Gold',
            goldWeight: 5.9,
            carat: 2.50,
            shape: 'Emerald',
            color: 'D',
            clarity: 'VVS1',
            cut: 'Excellent',
            price: 14500,
            comparePrice: 16000,
            mainImage: '/assets/gem_rings_cat_2.png',
            secondaryImage: '/assets/gem_rings_cat.png',
            isFeatured: true,
        },
        {
            name: 'Seraphina Three-Stone Pear Diamond Ring',
            sku: 'AD-RNG-005',
            slug: 'seraphina-three-stone-pear-diamond-ring',
            categoryId: categories[0].id,
            collectionId: collections[0].id,
            shortDescription: 'A center pear cut diamond flanked by tapered baguette side stones in 18K Rose Gold.',
            fullDescription: 'Representing past, present, and future, the Seraphina presents timeless romantic symbolism coupled with master goldsmithing.',
            jewelleryType: 'Rings',
            ringStyle: 'Three-Stone',
            gender: 'Women',
            metal: '18K Rose Gold',
            goldPurity: '750 Gold',
            goldColor: 'Rose Gold',
            goldWeight: 4.6,
            carat: 2.10,
            shape: 'Pear',
            color: 'E',
            clarity: 'VVS2',
            cut: 'Excellent',
            price: 12800,
            comparePrice: 14200,
            mainImage: '/assets/gem_rings_cat.png',
            secondaryImage: '/assets/gem_rings_cat_2.png',
        },
        {
            name: 'Royal Cushion Cut Diamond Halo Ring',
            sku: 'AD-RNG-006',
            slug: 'royal-cushion-cut-diamond-halo-ring',
            categoryId: categories[0].id,
            collectionId: collections[1].id,
            shortDescription: 'A breathtaking 3.00ct cushion brilliant diamond surrounded by a double diamond halo.',
            fullDescription: 'Opulent and radiant, the Royal Cushion features pillow-like rounded corners surrounded by micro-set diamonds for unprecedented fire.',
            jewelleryType: 'Rings',
            ringStyle: 'Halo',
            gender: 'Women',
            metal: 'Platinum',
            goldPurity: '950 Platinum',
            goldColor: 'Platinum',
            goldWeight: 7.2,
            carat: 3.00,
            shape: 'Cushion',
            color: 'D',
            clarity: 'IF',
            cut: 'Excellent',
            price: 16200,
            comparePrice: 18000,
            mainImage: '/assets/gem_rings_cat.png',
            secondaryImage: '/assets/gem_rings_cat_2.png',
            isFeatured: true,
            isBestseller: true,
        },
        {
            name: 'Gentleman’s Brushed Gold & Diamond Band',
            sku: 'AD-RNG-007',
            slug: 'gentlemans-brushed-gold-diamond-band',
            categoryId: categories[0].id,
            collectionId: collections[0].id,
            shortDescription: 'Satiny satin-brushed 18K Yellow Gold 6mm band with a flush-set princess diamond.',
            fullDescription: 'Subtle strength and modern sophistication. A recessed channel holds a clean princess diamond within satin-finished gold.',
            jewelleryType: 'Rings',
            ringStyle: 'Band',
            gender: 'Men',
            metal: '18K Yellow Gold',
            goldPurity: '750 Gold',
            goldColor: 'Yellow Gold',
            goldWeight: 8.5,
            carat: 0.75,
            shape: 'Princess',
            color: 'G',
            clarity: 'VS1',
            cut: 'Very Good',
            price: 3450,
            comparePrice: 3900,
            mainImage: '/assets/gem_rings_cat.png',
            secondaryImage: '/assets/gem_rings_cat_2.png',
        },
        {
            name: 'Valiant Platinum Bevelled Men’s Ring',
            sku: 'AD-RNG-008',
            slug: 'valiant-platinum-bevelled-mens-ring',
            categoryId: categories[0].id,
            collectionId: collections[2].id,
            shortDescription: 'Heavy-gauge 7mm Platinum band with high-polish bevelled edges and solitaire accent.',
            fullDescription: 'Crafted for enduring weight and comfort, featuring precision-machined bevelled edges and a brilliant burnished diamond.',
            jewelleryType: 'Rings',
            ringStyle: 'Band',
            gender: 'Men',
            metal: 'Platinum',
            goldPurity: '950 Platinum',
            goldColor: 'Platinum',
            goldWeight: 12.0,
            carat: 0.90,
            shape: 'Round',
            color: 'F',
            clarity: 'VVS2',
            cut: 'Excellent',
            price: 4200,
            comparePrice: 4600,
            mainImage: '/assets/gem_rings_cat_2.png',
            secondaryImage: '/assets/gem_rings_cat.png',
        },
        {
            name: 'Eternity Pavé Diamond Drop Earrings',
            sku: 'AD-EAR-001',
            slug: 'eternity-pave-diamond-drop-earrings',
            categoryId: categories[1].id,
            collectionId: collections[0].id,
            shortDescription: 'Cascade of brilliant round diamonds in 18K Rose Gold.',
            fullDescription: 'Fluid motion and radiance unite in these drop earrings, designed to capture light from every angle with effortless grace.',
            jewelleryType: 'Earrings',
            metal: '18K Rose Gold',
            goldPurity: '750 Gold',
            goldColor: 'Rose Gold',
            goldWeight: 6.4,
            carat: 1.80,
            shape: 'Round',
            color: 'F',
            clarity: 'VS1',
            price: 4950,
            mainImage: '/assets/gem_earrings_cat.png',
            secondaryImage: '/assets/editorial_banner.png',
        },
        {
            name: 'Veritas Emerald Cut Tennis Bracelet',
            sku: 'AD-BRC-001',
            slug: 'veritas-emerald-cut-tennis-bracelet',
            categoryId: categories[3].id,
            collectionId: collections[2].id,
            shortDescription: 'Seamless line of matched emerald cut diamonds total 10.50ct in Platinum.',
            fullDescription: 'The Veritas bracelet showcases 38 perfectly matched emerald cut diamonds, each selected for superior clarity and rectangular geometry.',
            jewelleryType: 'Bracelets',
            metal: '18K White Gold',
            goldPurity: '750 Gold',
            goldColor: 'White Gold',
            goldWeight: 14.5,
            carat: 10.50,
            shape: 'Emerald',
            color: 'E',
            clarity: 'VVS1',
            price: 24500,
            mainImage: '/assets/gem_bracelets_cat.png',
            secondaryImage: '/assets/gem_bracelets_cat.png',
        },
        {
            name: 'Sovereign Pear Diamond Pendant',
            sku: 'AD-PND-001',
            slug: 'sovereign-pear-diamond-pendant',
            categoryId: categories[4].id,
            collectionId: collections[0].id,
            shortDescription: 'A dramatic 1.75ct pear shaped diamond suspended from an 18-inch gold chain.',
            fullDescription: 'A minimalist three-prong basket setting highlights the teardrop silhouette of this exceptional pear brilliant diamond.',
            jewelleryType: 'Pendants',
            metal: '18K Yellow Gold',
            goldPurity: '750 Gold',
            goldColor: 'Yellow Gold',
            goldWeight: 3.9,
            carat: 1.75,
            shape: 'Pear',
            color: 'D',
            clarity: 'VVS2',
            price: 8900,
            mainImage: '/assets/gem_pendants_cat.png',
            secondaryImage: '/assets/gem_necklaces_cat.png',
        },
    ];
    for (const prodData of productsData) {
        const prod = await prisma.product.upsert({
            where: { slug: prodData.slug },
            update: prodData,
            create: prodData,
        });
        await prisma.productVariant.deleteMany({ where: { productId: prod.id } });
        await prisma.productVariant.createMany({
            data: [
                { productId: prod.id, sku: `${prod.sku}-YG-7`, metal: '18K', goldColor: 'Yellow Gold', size: '7', price: prod.price, stock: 4 },
                { productId: prod.id, sku: `${prod.sku}-WG-7`, metal: '18K', goldColor: 'White Gold', size: '7', price: prod.price + 150, stock: 3 },
                { productId: prod.id, sku: `${prod.sku}-RG-7`, metal: '18K', goldColor: 'Rose Gold', size: '7', price: prod.price + 150, stock: 2 },
            ],
        });
        await prisma.productImage.deleteMany({ where: { productId: prod.id } });
        const imageRecords = [
            { productId: prod.id, url: prodData.mainImage, altText: `${prodData.name} - Front View`, position: 0 },
        ];
        if (prodData.secondaryImage) {
            imageRecords.push({ productId: prod.id, url: prodData.secondaryImage, altText: `${prodData.name} - Side View`, position: 1 });
        }
        imageRecords.push({ productId: prod.id, url: '/assets/gem_rings_cat.png', altText: `${prodData.name} - Atelier Craftsmanship`, position: 2 });
        await prisma.productImage.createMany({
            data: imageRecords,
        });
    }
    // 5. Diamonds Vault (Disabled sample auto-seeding so only imported diamonds appear)
    // Sample diamonds removed per owner request.
    // 6. Complete Header Seeding: RINGS to DIAMONDS have Mega Menus; CUSTOMISE is NULL (Normal Link Only)
    const headerMenu = await prisma.menu.upsert({
        where: { location: 'HEADER' },
        update: {},
        create: { name: 'Header Main Menu', location: 'HEADER' },
    });
    await prisma.menuItem.deleteMany({ where: { menuId: headerMenu.id } });
    const menuItems = [
        {
            title: 'RINGS',
            url: '/rings',
            position: 1,
            megaMenu: JSON.stringify({
                columns: [
                    {
                        sections: [
                            {
                                heading: 'WEDDING RINGS',
                                links: [
                                    { label: "Women's Wedding Rings", url: '/rings?type=womens-wedding' },
                                    { label: "Men's Wedding Bands", url: '/rings?type=mens-wedding' },
                                ]
                            },
                            {
                                heading: 'DIAMOND ESSENTIALS',
                                links: [
                                    { label: 'Eternity Rings', url: '/rings?type=eternity' },
                                    { label: 'Anniversary Rings', url: '/rings?type=anniversary' },
                                ]
                            },
                            {
                                heading: 'ENGAGEMENT RINGS',
                                links: [
                                    { label: 'Design Your Own Engagement Ring', url: '/custom-jewellery' },
                                    { label: 'Ready to Ship Engagement Rings', url: '/rings?type=solitaire' },
                                ]
                            },
                            {
                                heading: 'EDUCATION',
                                links: [
                                    { label: 'Rings Guide & Sizing', url: '/pages/ring-size-guide' },
                                ]
                            }
                        ]
                    },
                    {
                        sections: [
                            {
                                heading: 'SHOP ALL RINGS',
                                links: [
                                    { label: 'Best Selling Rings', url: '/rings?sort=best-selling' },
                                    { label: 'Diamond Rings', url: '/rings?type=diamond' },
                                    { label: 'Gemstone Rings', url: '/rings?type=gemstone' },
                                    { label: 'Emerald Rings', url: '/rings?type=emerald' },
                                    { label: 'Sapphire Rings', url: '/rings?type=sapphire' },
                                    { label: 'Pearl Rings', url: '/rings?type=pearl' },
                                    { label: 'Stackable Rings', url: '/rings?type=stackable' },
                                    { label: 'Fashion Rings', url: '/rings?type=fashion' },
                                    { label: 'Signet Rings', url: '/rings?type=signet' },
                                    { label: "Men's Rings", url: '/rings?type=mens' },
                                    { label: 'Infinity Rings', url: '/rings?type=infinity' },
                                ]
                            },
                            {
                                heading: 'NEW ARRIVALS',
                                links: [
                                    { label: 'Shop New Arrivals', url: '/rings?sort=new' },
                                    { label: 'See All New Rings', url: '/rings?sort=new' },
                                ]
                            }
                        ]
                    },
                    {
                        sections: [
                            {
                                heading: 'SHOP BY METAL',
                                links: [
                                    { label: '18K Yellow Gold', url: '/rings?metal=18k-yellow' },
                                    { label: '18K White Gold', url: '/rings?metal=18k-white' },
                                    { label: '18K Rose Gold', url: '/rings?metal=18k-rose' },
                                    { label: 'Platinum Editions', url: '/rings?metal=platinum' },
                                ]
                            },
                            {
                                heading: 'CURATED SELECTIONS',
                                links: [
                                    { label: 'Signature Collection', url: '/collections/signature-collection' },
                                    { label: 'Solitaire Selection', url: '/collections/solitaire-selection' },
                                ]
                            }
                        ]
                    },
                    {
                        promos: [
                            {
                                title: 'DIAMOND ESSENTIALS',
                                subtitle: '18K Atelier Edition',
                                image: '/assets/gem_rings_cat.png',
                                url: '/rings/aurelia-solitaire-diamond-ring'
                            },
                            {
                                title: 'FASHION RINGS',
                                subtitle: 'Sculpted Fine Bands',
                                image: '/assets/gem_rings_cat_2.png',
                                url: '/rings/celestial-oval-diamond-halo-ring'
                            }
                        ]
                    }
                ]
            })
        },
        {
            title: 'EARRINGS',
            url: '/earrings',
            position: 2,
            megaMenu: JSON.stringify({
                columns: [
                    {
                        sections: [
                            {
                                heading: 'SHOP ALL EARRINGS',
                                links: [
                                    { label: 'Best Selling Earrings', url: '/earrings?sort=best-selling' },
                                    { label: 'Diamond Earrings', url: '/earrings?type=diamond' },
                                    { label: 'Gemstone Earrings', url: '/earrings?type=gemstone' },
                                    { label: 'Pearl Earrings', url: '/earrings?type=pearl' },
                                    { label: 'Hoop Earrings', url: '/earrings?style=hoops' },
                                    { label: 'Drop Earrings', url: '/earrings?style=drops' },
                                    { label: 'Stud Earrings', url: '/earrings?style=studs' },
                                ]
                            },
                            {
                                heading: 'NEW ARRIVALS',
                                links: [
                                    { label: 'New Earrings', url: '/earrings?sort=new' },
                                    { label: 'See All Earrings', url: '/earrings' },
                                ]
                            }
                        ]
                    },
                    {
                        sections: [
                            {
                                heading: 'DIAMOND ESSENTIALS',
                                links: [
                                    { label: 'Diamond Stud Earrings', url: '/earrings?style=studs' },
                                    { label: 'Diamond Hoop Earrings', url: '/earrings?style=hoops' },
                                ]
                            },
                            {
                                heading: 'DESIGN YOUR OWN EARRINGS',
                                links: [
                                    { label: 'Start with a Setting', url: '/custom-jewellery' },
                                    { label: 'Start with Diamonds', url: '/diamonds' },
                                ]
                            },
                            {
                                heading: 'EDUCATION',
                                links: [
                                    { label: 'Studs Guide & Backings', url: '/pages/jewellery-care' },
                                ]
                            }
                        ]
                    },
                    {
                        sections: [
                            {
                                heading: 'SHOP BY METAL',
                                links: [
                                    { label: '18K Yellow Gold', url: '/earrings?metal=18k-yellow' },
                                    { label: '18K White Gold', url: '/earrings?metal=18k-white' },
                                    { label: '18K Rose Gold', url: '/earrings?metal=18k-rose' },
                                ]
                            }
                        ]
                    },
                    {
                        promos: [
                            {
                                title: 'DESIGN YOUR OWN EARRINGS',
                                subtitle: 'Pair Certified Diamonds',
                                image: '/assets/gem_earrings_cat.png',
                                url: '/custom-jewellery'
                            },
                            {
                                title: 'DIAMOND ESSENTIALS',
                                subtitle: 'Timeless Stud Collection',
                                image: '/assets/gem_earrings_cat.png',
                                url: '/earrings'
                            }
                        ]
                    }
                ]
            })
        },
        {
            title: 'NECKLACES',
            url: '/necklaces',
            position: 3,
            megaMenu: JSON.stringify({
                columns: [
                    {
                        sections: [
                            {
                                heading: 'SHOP ALL NECKLACES',
                                links: [
                                    { label: 'Diamond Necklaces', url: '/necklaces?type=diamond' },
                                    { label: 'Tennis Necklaces', url: '/necklaces?type=tennis' },
                                    { label: 'Pendant Necklaces', url: '/necklaces?type=pendant' },
                                    { label: 'Chain Necklaces', url: '/necklaces?type=chain' },
                                    { label: 'Gemstone Necklaces', url: '/necklaces?type=gemstone' },
                                    { label: 'Pearl Necklaces', url: '/necklaces?type=pearl' },
                                    { label: 'Layered Necklaces', url: '/necklaces?type=layered' },
                                ]
                            }
                        ]
                    },
                    {
                        sections: [
                            {
                                heading: 'SHOP BY STYLE',
                                links: [
                                    { label: 'Solitaire Necklaces', url: '/necklaces?style=solitaire' },
                                    { label: 'Halo Necklaces', url: '/necklaces?style=halo' },
                                    { label: 'Tennis Line Riviere', url: '/necklaces?style=tennis' },
                                    { label: 'Station Necklaces', url: '/necklaces?style=station' },
                                ]
                            },
                            {
                                heading: 'NEW ARRIVALS',
                                links: [
                                    { label: 'New Necklaces', url: '/necklaces?sort=new' },
                                    { label: 'Best Sellers', url: '/necklaces?sort=best-selling' },
                                ]
                            }
                        ]
                    },
                    {
                        sections: [
                            {
                                heading: 'EDUCATION',
                                links: [
                                    { label: 'Necklace Length Guide', url: '/pages/jewellery-care' },
                                ]
                            }
                        ]
                    },
                    {
                        promos: [
                            {
                                title: 'RIVIERE NECKLACES',
                                subtitle: 'Seamless Diamond Line',
                                image: '/assets/gem_necklaces_cat.png',
                                url: '/necklaces'
                            },
                            {
                                title: 'SOLITAIRE PENDANTS',
                                subtitle: 'High Brilliance Centers',
                                image: '/assets/gem_pendants_cat.png',
                                url: '/pendants'
                            }
                        ]
                    }
                ]
            })
        },
        {
            title: 'BRACELETS',
            url: '/bracelets',
            position: 4,
            megaMenu: JSON.stringify({
                columns: [
                    {
                        sections: [
                            {
                                heading: 'SHOP ALL BRACELETS',
                                links: [
                                    { label: 'Diamond Bracelets', url: '/bracelets?type=diamond' },
                                    { label: 'Tennis Bracelets', url: '/bracelets?type=tennis' },
                                    { label: 'Bangle Bracelets', url: '/bracelets?type=bangle' },
                                    { label: 'Chain Bracelets', url: '/bracelets?type=chain' },
                                    { label: 'Cuff Bracelets', url: '/bracelets?type=cuff' },
                                    { label: 'Gemstone Bracelets', url: '/bracelets?type=gemstone' },
                                ]
                            }
                        ]
                    },
                    {
                        sections: [
                            {
                                heading: 'SHOP BY STYLE',
                                links: [
                                    { label: 'Tennis Line', url: '/bracelets?style=tennis' },
                                    { label: 'Bangle Line', url: '/bracelets?style=bangle' },
                                    { label: 'Chain Line', url: '/bracelets?style=chain' },
                                    { label: 'Cuff Line', url: '/bracelets?style=cuff' },
                                ]
                            },
                            {
                                heading: 'NEW ARRIVALS',
                                links: [
                                    { label: 'Best Sellers', url: '/bracelets?sort=best-selling' },
                                    { label: 'New Bracelets', url: '/bracelets?sort=new' },
                                ]
                            }
                        ]
                    },
                    {
                        sections: [
                            {
                                heading: 'EDUCATION',
                                links: [
                                    { label: 'Bracelet Sizing Guide', url: '/pages/jewellery-care' },
                                ]
                            }
                        ]
                    },
                    {
                        promos: [
                            {
                                title: 'TENNIS BRACELETS',
                                subtitle: 'Emerald & Round Cuts',
                                image: '/assets/gem_bracelets_cat.png',
                                url: '/bracelets/veritas-emerald-cut-tennis-bracelet'
                            },
                            {
                                title: 'HIGH JEWELLERY CUFFS',
                                subtitle: 'Sculpted Gold Atelier',
                                image: '/assets/gem_bracelets_cat.png',
                                url: '/bracelets'
                            }
                        ]
                    }
                ]
            })
        },
        {
            title: 'PENDANTS',
            url: '/pendants',
            position: 5,
            megaMenu: JSON.stringify({
                columns: [
                    {
                        sections: [
                            {
                                heading: 'SHOP ALL PENDANTS',
                                links: [
                                    { label: 'Diamond Pendants', url: '/pendants?type=diamond' },
                                    { label: 'Solitaire Pendants', url: '/pendants?type=solitaire' },
                                    { label: 'Gemstone Pendants', url: '/pendants?type=gemstone' },
                                    { label: 'Cross Pendants', url: '/pendants?type=cross' },
                                    { label: 'Initial Pendants', url: '/pendants?type=initial' },
                                ]
                            }
                        ]
                    },
                    {
                        sections: [
                            {
                                heading: 'SHOP BY STYLE',
                                links: [
                                    { label: 'Solitaire Classic', url: '/pendants?style=solitaire' },
                                    { label: 'Halo Accent', url: '/pendants?style=halo' },
                                    { label: 'Three-Stone Journey', url: '/pendants?style=three-stone' },
                                    { label: 'Statement Atelier', url: '/pendants?style=statement' },
                                ]
                            },
                            {
                                heading: 'NEW ARRIVALS',
                                links: [
                                    { label: 'New Pendants', url: '/pendants?sort=new' },
                                    { label: 'Best Sellers', url: '/pendants?sort=best-selling' },
                                ]
                            }
                        ]
                    },
                    {
                        sections: [
                            {
                                heading: 'EDUCATION',
                                links: [
                                    { label: 'Pendant Chain Guide', url: '/pages/jewellery-care' },
                                ]
                            }
                        ]
                    },
                    {
                        promos: [
                            {
                                title: 'SOLITAIRE PENDANTS',
                                subtitle: '18K Basket Settings',
                                image: '/assets/gem_pendants_cat.png',
                                url: '/pendants/sovereign-pear-diamond-pendant'
                            },
                            {
                                title: 'PEAR CUT PENDANTS',
                                subtitle: 'Dramatic Teardrop',
                                image: '/assets/gem_necklaces_cat.png',
                                url: '/pendants'
                            }
                        ]
                    }
                ]
            })
        },
        {
            title: 'DIAMONDS',
            url: '/diamonds',
            position: 6,
            megaMenu: JSON.stringify({
                columns: [
                    {
                        sections: [
                            {
                                heading: 'DIAMOND VAULT',
                                links: [
                                    { label: 'All Certified Loose Diamonds', url: '/diamonds' },
                                    { label: 'Natural Diamonds', url: '/diamonds?type=NATURAL' },
                                    { label: 'Lab-Grown Diamonds', url: '/diamonds?type=LAB_GROWN' },
                                    { label: 'Diamond Finder Tool', url: '/diamonds' },
                                    { label: 'Shop All Diamonds', url: '/diamonds' },
                                ]
                            },
                            {
                                heading: 'EDUCATION',
                                links: [
                                    { label: 'Diamond Guide & 4Cs', url: '/pages/diamond-guide' },
                                    { label: 'GIA & IGI Certification', url: '/pages/certification' },
                                    { label: 'Natural vs Lab-Grown', url: '/pages/natural-vs-lab' },
                                ]
                            }
                        ]
                    },
                    {
                        sections: [
                            {
                                heading: 'SHOP BY SHAPE',
                                links: [
                                    { label: 'Round Brilliant', url: '/diamonds?shapes=Round' },
                                    { label: 'Oval Cut', url: '/diamonds?shapes=Oval' },
                                    { label: 'Cushion Cut', url: '/diamonds?shapes=Cushion' },
                                    { label: 'Emerald Cut', url: '/diamonds?shapes=Emerald' },
                                    { label: 'Pear Cut', url: '/diamonds?shapes=Pear' },
                                    { label: 'Princess Cut', url: '/diamonds?shapes=Princess' },
                                    { label: 'Radiant Cut', url: '/diamonds?shapes=Radiant' },
                                    { label: 'Heart Cut', url: '/diamonds?shapes=Heart' },
                                    { label: 'Marquise Cut', url: '/diamonds?shapes=Marquise' },
                                    { label: 'Asscher Cut', url: '/diamonds?shapes=Asscher' },
                                ]
                            }
                        ]
                    },
                    {
                        sections: [
                            {
                                heading: 'SHOP BY QUALITY',
                                links: [
                                    { label: 'Excellent Cut Grade', url: '/diamonds?cuts=Excellent' },
                                    { label: 'FL & IF Flawless', url: '/diamonds?clarities=FL,IF' },
                                    { label: 'VVS1 & VVS2 Clarity', url: '/diamonds?clarities=VVS1,VVS2' },
                                    { label: 'VS1 & VS2 Clarity', url: '/diamonds?clarities=VS1,VS2' },
                                    { label: 'Colorless (D-F)', url: '/diamonds?colors=D,E,F' },
                                ]
                            }
                        ]
                    },
                    {
                        promos: [
                            {
                                title: 'GIA & IGI LOOSE DIAMONDS',
                                subtitle: 'Direct Atelier Vault',
                                image: '/assets/gem_diamonds_cat.png',
                                url: '/diamonds'
                            },
                            {
                                title: 'NATURAL VS LAB-GROWN',
                                subtitle: 'Complete Sourcing Guide',
                                image: '/assets/gem_diamonds_cat.png',
                                url: '/diamonds?type=NATURAL'
                            }
                        ]
                    }
                ]
            })
        },
        {
            title: 'CUSTOMISE',
            url: '/custom-jewellery',
            position: 7,
            megaMenu: null,
        },
    ];
    for (const mi of menuItems) {
        await prisma.menuItem.create({
            data: {
                menuId: headerMenu.id,
                title: mi.title,
                url: mi.url,
                position: mi.position,
                megaMenu: mi.megaMenu || null,
            },
        });
    }
    console.log('📌 Header seeded: RINGS-DIAMONDS have mega menus; CUSTOMISE has NO mega menu.');
    // Seed Default Categories for Category Navigation Cards
    const defaultCategories = [
        {
            name: 'Rings',
            slug: 'rings',
            link: '/rings',
            image: '/assets/gem_rings_cat.png',
            sortOrder: 1,
            isActive: true,
            description: 'Explore AURA DIAMOND ATELIER’s signature collection of fine rings. Handcrafted by master goldsmiths using GIA certified diamonds, natural gemstones, and fine 18K yellow, white, and rose gold or 950 platinum. From solitaire engagement rings to diamond-encrusted eternity bands, each piece embodies timeless luxury.',
        },
        {
            name: 'Earrings',
            slug: 'earrings',
            link: '/earrings',
            image: '/assets/gem_earrings_cat.png',
            sortOrder: 2,
            isActive: true,
            description: 'Discover AURA DIAMOND ATELIER solitaire studs, drop earrings, and diamond huggies.',
        },
        {
            name: 'Bracelets',
            slug: 'bracelets',
            link: '/bracelets',
            image: '/assets/gem_bracelets_cat.png',
            sortOrder: 3,
            isActive: true,
            description: 'Exquisite diamond tennis bracelets and sculpted gold bangles.',
        },
        {
            name: 'Necklaces',
            slug: 'necklaces',
            link: '/necklaces',
            image: '/assets/gem_necklaces_cat.png',
            sortOrder: 4,
            isActive: true,
            description: 'Graduated diamond line rivieres and solitaire pendants.',
        },
        {
            name: 'Collections',
            slug: 'collections',
            link: '/collections',
            image: '/assets/gem_rings_cat_2.png',
            sortOrder: 5,
            isActive: true,
            description: 'Curated bespoke atelier collections.',
        },
        {
            name: 'Diamond Essentials',
            slug: 'diamond-essentials',
            link: '/diamonds',
            image: '/assets/gem_diamonds_cat.png',
            sortOrder: 6,
            isActive: true,
            description: 'Certified natural and lab-grown loose diamonds.',
        },
    ];
    for (const cat of defaultCategories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: cat,
            create: cat,
        });
    }
    console.log('📌 Default categories seeded with images and links.');
    const homePage = await prisma.page.upsert({
        where: { slug: 'home' },
        update: {},
        create: { title: 'Homepage', slug: 'home', status: 'PUBLISHED' },
    });
    await prisma.pageSection.deleteMany({ where: { pageId: homePage.id } });
    const sections = [
        {
            blockType: 'HERO',
            position: 1,
            content: JSON.stringify({
                eyebrow: 'THE SIGNATURE COLLECTION 2026',
                heading: 'Handcrafted Elegance & Exceptional Diamonds',
                description: 'Immerse yourself in world-class craftsmanship, ethically sourced diamonds, and timeless bespoke creations.',
                desktopImage: '/assets/gem_hero_desktop.png',
                button1Text: 'EXPLORE RINGS',
                button1Link: '/rings',
                button2Text: 'THE DIAMOND VAULT',
                button2Link: '/diamonds',
            }),
        },
        {
            blockType: 'FEATURED_COLLECTIONS',
            position: 2,
            content: JSON.stringify({
                heading: 'Curated Collections',
                subheading: 'Discover pieces crafted for life’s most precious moments.',
            }),
        },
        {
            blockType: 'CAMPAIGN_BANNER',
            position: 3,
            content: JSON.stringify({
                enableBanner: true,
                heading: 'A NEW EXPRESSION OF FINE JEWELLERY',
                description: 'Designed with intention. Crafted with precision. Made to be treasured for generations.',
                buttonText: 'EXPLORE THE COLLECTION',
                buttonLink: '/collections/signature-collection',
                desktopImage: '/uploads/media/img_1788886732901_gcs2t_file_000000006720821193f36b2fd1dcf0b0.png',
                mobileImage: '/uploads/media/img_1788886736846_pqkz5_file_000000006720821193f36b2fd1dcf0b0.png',
                image: '/uploads/media/img_1788886732901_gcs2t_file_000000006720821193f36b2fd1dcf0b0.png',
                objectPosition: 'center 35%',
                showOverlay: true,
                overlayOpacity: 0.45,
            }),
        },
        {
            blockType: 'DIAMOND_SHAPES',
            position: 4,
            content: JSON.stringify({
                eyebrow: 'AUTHENTICATED LOOSE DIAMONDS',
                heading: 'Discover Exceptional Diamond Shapes',
                description: 'Select your ideal cut from certified GIA & IGI diamonds, ethically sourced and precision-cut for maximum fire and brilliance.',
                leftImage: '/assets/gem_diamonds_cat.png',
                shapes: [
                    { name: 'ROUND', shape: 'round', url: '/diamonds?shape=round', svg: '/assets/diamonds/Round.svg', enabled: true, altText: 'Round Cut Diamond', desktopSize: '48px', tabletSize: '44px', mobileSize: '40px' },
                    { name: 'OVAL', shape: 'oval', url: '/diamonds?shape=oval', svg: '/assets/diamonds/Oval.svg', enabled: true, altText: 'Oval Cut Diamond', desktopSize: '48px', tabletSize: '44px', mobileSize: '40px' },
                    { name: 'EMERALD', shape: 'emerald', url: '/diamonds?shape=emerald', svg: '/assets/diamonds/Emerald.svg', enabled: true, altText: 'Emerald Cut Diamond', desktopSize: '48px', tabletSize: '44px', mobileSize: '40px' },
                    { name: 'PRINCESS', shape: 'princess', url: '/diamonds?shape=princess', svg: '/assets/diamonds/Princess.svg', enabled: true, altText: 'Princess Cut Diamond', desktopSize: '48px', tabletSize: '44px', mobileSize: '40px' },
                    { name: 'CUSHION', shape: 'cushion', url: '/diamonds?shape=cushion', svg: '/assets/diamonds/Cushion.svg', enabled: true, altText: 'Cushion Cut Diamond', desktopSize: '48px', tabletSize: '44px', mobileSize: '40px' },
                    { name: 'PEAR', shape: 'pear', url: '/diamonds?shape=pear', svg: '/assets/diamonds/Pear.svg', enabled: true, altText: 'Pear Cut Diamond', desktopSize: '48px', tabletSize: '44px', mobileSize: '40px' },
                    { name: 'RADIANT', shape: 'radiant', url: '/diamonds?shape=radiant', svg: '/assets/diamonds/Radiant.svg', enabled: true, altText: 'Radiant Cut Diamond', desktopSize: '48px', tabletSize: '44px', mobileSize: '40px' },
                    { name: 'MARQUISE', shape: 'marquise', url: '/diamonds?shape=marquise', svg: '/assets/diamonds/Marquise.svg', enabled: true, altText: 'Marquise Cut Diamond', desktopSize: '48px', tabletSize: '44px', mobileSize: '40px' },
                ],
            }),
        },
        {
            blockType: 'CRAFTSMANSHIP',
            position: 4,
            content: JSON.stringify({
                heading: 'Unrivalled Atelier Artistry',
                description: 'Every Aura Diamond Atelier creation undergoes meticulous hand-finishing, master CAD prototyping, and precision setting by master jewelers with decades of heritage.',
                image: '/assets/gem_rings_cat.png',
            }),
        },
        {
            blockType: 'TESTIMONIALS',
            position: 5,
            content: JSON.stringify({
                heading: 'Words from Our Clients',
                testimonials: [
                    { quote: 'The bespoke engagement ring exceeded all expectations. Aura Diamond Atelier made the entire process seamless from CAD design to final delivery.', author: 'Eleanor V., New York' },
                    { quote: 'The Diamond Vault gave us complete transparency and unmatched pricing on a GIA certified 2.50ct oval diamond.', author: 'Marcus & Sophia, Zurich' },
                ]
            }),
        },
    ];
    for (const s of sections) {
        await prisma.pageSection.create({
            data: {
                pageId: homePage.id,
                blockType: s.blockType,
                position: s.position,
                content: s.content,
                isVisible: true,
            },
        });
    }
    // 8. Custom Request
    await prisma.customRequest.upsert({
        where: { requestNumber: 'REQ-2026-001' },
        update: {},
        create: {
            requestNumber: 'REQ-2026-001',
            name: 'Victoria Sterling',
            email: 'victoria@example.com',
            whatsapp: '+91 79902 78892',
            jewelleryType: 'Custom Solitaire Ring',
            metal: '18K White Gold',
            diamondPreference: '2.00ct Cushion Cut Natural Diamond',
            budget: '$10,000 - $15,000',
            deadline: '2026-09-30',
            description: 'Looking for a vintage-inspired art deco cushion ring with sapphire side stones.',
            status: 'CAD_SENT',
            cadFileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        },
    });
    await (0, seedService_1.ensureStorefrontCmsSeeded)();
    console.log('🎉 Aura Diamond Atelier database seeding complete successfully!');
}
main()
    .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
