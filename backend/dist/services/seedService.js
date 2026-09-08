"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureStorefrontCmsSeeded = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const ensureStorefrontCmsSeeded = async () => {
    try {
        // 1. SEED MEGA MENU CARDS IF EMPTY
        const cardCount = await prisma_1.default.megaMenuCard.count();
        if (cardCount === 0) {
            console.log('Seeding initial storefront Mega Menu promotional cards...');
            await prisma_1.default.megaMenuCard.createMany({
                data: [
                    {
                        categorySlug: 'rings',
                        title: 'DIAMOND ESSENTIALS',
                        subtitle: 'Solitaire & Halo Designs',
                        description: 'Handcrafted in 18K gold and silver',
                        imageUrl: '/assets/gem_rings_cat.png',
                        targetUrl: '/rings?category=engagement',
                        sortOrder: 1,
                        isEnabled: true,
                    },
                    {
                        categorySlug: 'rings',
                        title: 'FASHION RINGS',
                        subtitle: 'Eternity & Stacking Bands',
                        description: 'Modern silhouettes for everyday luxury',
                        imageUrl: '/assets/gem_rings_cat_2.png',
                        targetUrl: '/rings?category=eternity',
                        sortOrder: 2,
                        isEnabled: true,
                    },
                    {
                        categorySlug: 'earrings',
                        title: 'SOLITAIRE STUDS',
                        subtitle: 'Timeless Diamond Earrings',
                        description: '4-Prong & Bezel settings',
                        imageUrl: '/assets/gem_earrings_cat.png',
                        targetUrl: '/earrings?category=studs',
                        sortOrder: 1,
                        isEnabled: true,
                    },
                    {
                        categorySlug: 'necklaces',
                        title: 'TENNIS NECKLACES',
                        subtitle: 'Continuous Diamond Line',
                        description: 'Graduated & Uniform layouts',
                        imageUrl: '/assets/gem_necklaces_cat.png',
                        targetUrl: '/necklaces?category=tennis',
                        sortOrder: 1,
                        isEnabled: true,
                    },
                    {
                        categorySlug: 'bracelets',
                        title: 'EMERALD TENNIS BRACELET',
                        subtitle: 'Bezel & Prong Settings',
                        description: 'Exceptional brilliance and fluidity',
                        imageUrl: '/assets/gem_bracelets_cat.png',
                        targetUrl: '/bracelets?category=tennis',
                        sortOrder: 1,
                        isEnabled: true,
                    },
                    {
                        categorySlug: 'pendants',
                        title: 'SOLITAIRE PENDANTS',
                        subtitle: 'Classic Solitaire Drops',
                        description: 'Suspended from delicate chains',
                        imageUrl: '/assets/gem_pendants_cat.png',
                        targetUrl: '/pendants?category=solitaire',
                        sortOrder: 1,
                        isEnabled: true,
                    },
                    {
                        categorySlug: 'diamonds',
                        title: 'LOOSE DIAMOND VAULT',
                        subtitle: 'GIA & IGI Certified Diamonds',
                        description: 'Filter by shape, carat, color & clarity',
                        imageUrl: '/assets/gem_diamonds_cat.png',
                        targetUrl: '/diamonds',
                        sortOrder: 1,
                        isEnabled: true,
                    },
                ],
            });
        }
        // 2. SEED JEWELLERY FILTER GROUPS & OPTIONS IF EMPTY
        const fgCount = await prisma_1.default.filterGroup.count();
        if (fgCount === 0) {
            console.log('Seeding initial Jewellery Filter Groups & Options...');
            // GENDER
            const genderGroup = await prisma_1.default.filterGroup.create({
                data: {
                    key: 'gender',
                    label: 'Gender',
                    targetType: 'JEWELLERY',
                    filterType: 'SELECT',
                    sortOrder: 1,
                    isEnabled: true,
                },
            });
            await prisma_1.default.filterOption.createMany({
                data: [
                    { filterGroupId: genderGroup.id, label: 'All', value: 'ALL', sortOrder: 1, isEnabled: true },
                    { filterGroupId: genderGroup.id, label: 'Women', value: 'Women', sortOrder: 2, isEnabled: true },
                    { filterGroupId: genderGroup.id, label: 'Men', value: 'Men', sortOrder: 3, isEnabled: true },
                    { filterGroupId: genderGroup.id, label: 'Unisex', value: 'Unisex', sortOrder: 4, isEnabled: true },
                ],
            });
            // CATEGORY SCOPED STYLES
            const categoryStyleConfigs = [
                {
                    scope: 'rings',
                    label: 'Style',
                    key: 'style',
                    options: [
                        { label: 'All', value: 'ALL', sortOrder: 1 },
                        { label: 'Solitaire', value: 'Solitaire', sortOrder: 2 },
                        { label: 'Halo', value: 'Halo', sortOrder: 3 },
                        { label: 'Three Stone', value: 'Three Stone', sortOrder: 4 },
                        { label: 'Vintage', value: 'Vintage', sortOrder: 5 },
                        { label: 'Modern', value: 'Modern', sortOrder: 6 },
                    ],
                },
                {
                    scope: 'earrings',
                    label: 'Style',
                    key: 'style',
                    options: [
                        { label: 'All', value: 'ALL', sortOrder: 1 },
                        { label: 'Stud', value: 'Stud', sortOrder: 2 },
                        { label: 'Hoop', value: 'Hoop', sortOrder: 3 },
                        { label: 'Huggie', value: 'Huggie', sortOrder: 4 },
                        { label: 'Drop', value: 'Drop', sortOrder: 5 },
                        { label: 'Dangle', value: 'Dangle', sortOrder: 6 },
                        { label: 'Cluster', value: 'Cluster', sortOrder: 7 },
                        { label: 'Chandelier', value: 'Chandelier', sortOrder: 8 },
                        { label: 'Jacket', value: 'Jacket', sortOrder: 9 },
                    ],
                },
                {
                    scope: 'necklaces',
                    label: 'Style',
                    key: 'style',
                    options: [
                        { label: 'All', value: 'ALL', sortOrder: 1 },
                        { label: 'Pendant', value: 'Pendant', sortOrder: 2 },
                        { label: 'Tennis', value: 'Tennis', sortOrder: 3 },
                        { label: 'Chain', value: 'Chain', sortOrder: 4 },
                        { label: 'Choker', value: 'Choker', sortOrder: 5 },
                        { label: 'Layered', value: 'Layered', sortOrder: 6 },
                        { label: 'Station', value: 'Station', sortOrder: 7 },
                        { label: 'Lariat', value: 'Lariat', sortOrder: 8 },
                    ],
                },
                {
                    scope: 'bracelets',
                    label: 'Style',
                    key: 'style',
                    options: [
                        { label: 'All', value: 'ALL', sortOrder: 1 },
                        { label: 'Tennis', value: 'Tennis', sortOrder: 2 },
                        { label: 'Chain', value: 'Chain', sortOrder: 3 },
                        { label: 'Bangle', value: 'Bangle', sortOrder: 4 },
                        { label: 'Cuff', value: 'Cuff', sortOrder: 5 },
                        { label: 'Charm', value: 'Charm', sortOrder: 6 },
                        { label: 'Link', value: 'Link', sortOrder: 7 },
                        { label: 'Beaded', value: 'Beaded', sortOrder: 8 },
                    ],
                },
                {
                    scope: 'pendants',
                    label: 'Style',
                    key: 'style',
                    options: [
                        { label: 'All', value: 'ALL', sortOrder: 1 },
                        { label: 'Solitaire', value: 'Solitaire', sortOrder: 2 },
                        { label: 'Halo', value: 'Halo', sortOrder: 3 },
                        { label: 'Cluster', value: 'Cluster', sortOrder: 4 },
                        { label: 'Heart', value: 'Heart', sortOrder: 5 },
                        { label: 'Cross', value: 'Cross', sortOrder: 6 },
                        { label: 'Initial', value: 'Initial', sortOrder: 7 },
                        { label: 'Symbol', value: 'Symbol', sortOrder: 8 },
                    ],
                },
            ];
            for (const styleCfg of categoryStyleConfigs) {
                const sg = await prisma_1.default.filterGroup.create({
                    data: {
                        key: styleCfg.key,
                        label: styleCfg.label,
                        categoryScope: styleCfg.scope,
                        targetType: 'JEWELLERY',
                        filterType: 'SELECT',
                        sortOrder: 2,
                        isEnabled: true,
                    },
                });
                await prisma_1.default.filterOption.createMany({
                    data: styleCfg.options.map((opt) => ({
                        filterGroupId: sg.id,
                        label: opt.label,
                        value: opt.value,
                        sortOrder: opt.sortOrder,
                        isEnabled: true,
                    })),
                });
            }
            // METAL
            const metalGroup = await prisma_1.default.filterGroup.create({
                data: {
                    key: 'metal',
                    label: 'Metal & Purity',
                    targetType: 'JEWELLERY',
                    filterType: 'SELECT',
                    sortOrder: 3,
                    isEnabled: true,
                },
            });
            await prisma_1.default.filterOption.createMany({
                data: [
                    { filterGroupId: metalGroup.id, label: 'All Metals', value: 'ALL', sortOrder: 1, isEnabled: true },
                    { filterGroupId: metalGroup.id, label: '18K Yellow Gold', value: '18K Yellow Gold', sortOrder: 2, isEnabled: true },
                    { filterGroupId: metalGroup.id, label: '18K White Gold', value: '18K White Gold', sortOrder: 3, isEnabled: true },
                    { filterGroupId: metalGroup.id, label: '18K Rose Gold', value: '18K Rose Gold', sortOrder: 4, isEnabled: true },
                    { filterGroupId: metalGroup.id, label: 'Silver', value: 'Silver', sortOrder: 5, isEnabled: true },
                    { filterGroupId: metalGroup.id, label: '14K Yellow Gold', value: '14K Yellow Gold', sortOrder: 6, isEnabled: true },
                ],
            });
            // STONE SHAPE
            const shapeGroup = await prisma_1.default.filterGroup.create({
                data: {
                    key: 'shape',
                    label: 'Stone Shape',
                    targetType: 'JEWELLERY',
                    filterType: 'SHAPE',
                    sortOrder: 4,
                    isEnabled: true,
                },
            });
            const shapes = [
                { label: 'Round', value: 'Round', icon: '/assets/diamonds/Round.svg', iconUrl: '/assets/diamonds/Round.svg', sortOrder: 1 },
                { label: 'Oval', value: 'Oval', icon: '/assets/diamonds/Oval.svg', iconUrl: '/assets/diamonds/Oval.svg', sortOrder: 2 },
                { label: 'Cushion', value: 'Cushion', icon: '/assets/diamonds/Cushion.svg', iconUrl: '/assets/diamonds/Cushion.svg', sortOrder: 3 },
                { label: 'Emerald', value: 'Emerald', icon: '/assets/diamonds/Emerald.svg', iconUrl: '/assets/diamonds/Emerald.svg', sortOrder: 4 },
                { label: 'Pear', value: 'Pear', icon: '/assets/diamonds/Pear.svg', iconUrl: '/assets/diamonds/Pear.svg', sortOrder: 5 },
                { label: 'Princess', value: 'Princess', icon: '/assets/diamonds/Princess.svg', iconUrl: '/assets/diamonds/Princess.svg', sortOrder: 6 },
                { label: 'Radiant', value: 'Radiant', icon: '/assets/diamonds/Radiant.svg', iconUrl: '/assets/diamonds/Radiant.svg', sortOrder: 7 },
                { label: 'Heart', value: 'Heart', icon: '/assets/diamonds/Heart.svg', iconUrl: '/assets/diamonds/Heart.svg', sortOrder: 8 },
                { label: 'Marquise', value: 'Marquise', icon: '/assets/diamonds/Marquise.svg', iconUrl: '/assets/diamonds/Marquise.svg', sortOrder: 9 },
                { label: 'Asscher', value: 'Asscher', icon: '/assets/diamonds/Asscher.svg', iconUrl: '/assets/diamonds/Asscher.svg', sortOrder: 10 },
                { label: 'Trillion', value: 'Trillion', icon: '/assets/diamonds/Trillion.svg', iconUrl: '/assets/diamonds/Trillion.svg', sortOrder: 11 },
            ];
            await prisma_1.default.filterOption.createMany({
                data: shapes.map((s) => ({
                    filterGroupId: shapeGroup.id,
                    label: s.label,
                    value: s.value,
                    icon: s.icon,
                    iconUrl: s.iconUrl,
                    sortOrder: s.sortOrder,
                    isEnabled: true,
                })),
            });
            // DIAMOND ORIGIN
            const diamondGroup = await prisma_1.default.filterGroup.create({
                data: {
                    key: 'diamondType',
                    label: 'Diamond Origin',
                    targetType: 'JEWELLERY',
                    filterType: 'SELECT',
                    sortOrder: 5,
                    isEnabled: true,
                },
            });
            await prisma_1.default.filterOption.createMany({
                data: [
                    { filterGroupId: diamondGroup.id, label: 'All Diamonds', value: 'ALL', sortOrder: 1, isEnabled: true },
                    { filterGroupId: diamondGroup.id, label: 'Natural Diamond', value: 'NATURAL', sortOrder: 2, isEnabled: true },
                    { filterGroupId: diamondGroup.id, label: 'Lab Grown Diamond', value: 'LAB_GROWN', sortOrder: 3, isEnabled: true },
                ],
            });
        }
        // 2b. RECONCILE JEWELLERY SHAPES IF MISSING (ensure all 11 exist for shape and stone_shape)
        const shapeGroups = await prisma_1.default.filterGroup.findMany({
            where: {
                OR: [{ key: 'shape' }, { key: 'stone_shape' }, { filterType: 'SHAPE' }],
            },
        });
        const all11Shapes = [
            { label: 'Round', value: 'Round', icon: '/assets/diamonds/Round.svg', sortOrder: 1 },
            { label: 'Oval', value: 'Oval', icon: '/assets/diamonds/Oval.svg', sortOrder: 2 },
            { label: 'Cushion', value: 'Cushion', icon: '/assets/diamonds/Cushion.svg', sortOrder: 3 },
            { label: 'Emerald', value: 'Emerald', icon: '/assets/diamonds/Emerald.svg', sortOrder: 4 },
            { label: 'Pear', value: 'Pear', icon: '/assets/diamonds/Pear.svg', sortOrder: 5 },
            { label: 'Princess', value: 'Princess', icon: '/assets/diamonds/Princess.svg', sortOrder: 6 },
            { label: 'Radiant', value: 'Radiant', icon: '/assets/diamonds/Radiant.svg', sortOrder: 7 },
            { label: 'Heart', value: 'Heart', icon: '/assets/diamonds/Heart.svg', sortOrder: 8 },
            { label: 'Marquise', value: 'Marquise', icon: '/assets/diamonds/Marquise.svg', sortOrder: 9 },
            { label: 'Asscher', value: 'Asscher', icon: '/assets/diamonds/Asscher.svg', sortOrder: 10 },
            { label: 'Trillion', value: 'Trillion', icon: '/assets/diamonds/Trillion.svg', sortOrder: 11 },
        ];
        for (const sg of shapeGroups) {
            const existingOptions = await prisma_1.default.filterOption.findMany({ where: { filterGroupId: sg.id } });
            const existingValues = new Set(existingOptions.map((o) => o.value.toLowerCase()));
            for (const shapeObj of all11Shapes) {
                if (!existingValues.has(shapeObj.value.toLowerCase())) {
                    console.log(`Reconciling missing shape option "${shapeObj.label}" into FilterGroup ${sg.id} (${sg.key})`);
                    await prisma_1.default.filterOption.create({
                        data: {
                            filterGroupId: sg.id,
                            label: shapeObj.label,
                            value: shapeObj.value,
                            icon: shapeObj.icon,
                            iconUrl: shapeObj.icon,
                            sortOrder: shapeObj.sortOrder,
                            isEnabled: true,
                        },
                    });
                }
            }
        }
        // 2c. RECONCILE CATEGORY SCOPED STYLES IF MISSING
        // Remove or isolate old un-scoped global style group if it exists
        await prisma_1.default.filterGroup.updateMany({
            where: { key: 'style', categoryScope: 'ALL' },
            data: { categoryScope: 'rings' },
        });
        const categoryStyleConfigs = [
            {
                scope: 'rings',
                label: 'Style',
                key: 'style',
                options: [
                    { label: 'All', value: 'ALL', sortOrder: 1 },
                    { label: 'Solitaire', value: 'Solitaire', sortOrder: 2 },
                    { label: 'Halo', value: 'Halo', sortOrder: 3 },
                    { label: 'Three Stone', value: 'Three Stone', sortOrder: 4 },
                    { label: 'Vintage', value: 'Vintage', sortOrder: 5 },
                    { label: 'Modern', value: 'Modern', sortOrder: 6 },
                ],
            },
            {
                scope: 'earrings',
                label: 'Style',
                key: 'style',
                options: [
                    { label: 'All', value: 'ALL', sortOrder: 1 },
                    { label: 'Stud', value: 'Stud', sortOrder: 2 },
                    { label: 'Hoop', value: 'Hoop', sortOrder: 3 },
                    { label: 'Huggie', value: 'Huggie', sortOrder: 4 },
                    { label: 'Drop', value: 'Drop', sortOrder: 5 },
                    { label: 'Dangle', value: 'Dangle', sortOrder: 6 },
                    { label: 'Cluster', value: 'Cluster', sortOrder: 7 },
                    { label: 'Chandelier', value: 'Chandelier', sortOrder: 8 },
                    { label: 'Jacket', value: 'Jacket', sortOrder: 9 },
                ],
            },
            {
                scope: 'necklaces',
                label: 'Style',
                key: 'style',
                options: [
                    { label: 'All', value: 'ALL', sortOrder: 1 },
                    { label: 'Pendant', value: 'Pendant', sortOrder: 2 },
                    { label: 'Tennis', value: 'Tennis', sortOrder: 3 },
                    { label: 'Chain', value: 'Chain', sortOrder: 4 },
                    { label: 'Choker', value: 'Choker', sortOrder: 5 },
                    { label: 'Layered', value: 'Layered', sortOrder: 6 },
                    { label: 'Station', value: 'Station', sortOrder: 7 },
                    { label: 'Lariat', value: 'Lariat', sortOrder: 8 },
                ],
            },
            {
                scope: 'bracelets',
                label: 'Style',
                key: 'style',
                options: [
                    { label: 'All', value: 'ALL', sortOrder: 1 },
                    { label: 'Tennis', value: 'Tennis', sortOrder: 2 },
                    { label: 'Chain', value: 'Chain', sortOrder: 3 },
                    { label: 'Bangle', value: 'Bangle', sortOrder: 4 },
                    { label: 'Cuff', value: 'Cuff', sortOrder: 5 },
                    { label: 'Charm', value: 'Charm', sortOrder: 6 },
                    { label: 'Link', value: 'Link', sortOrder: 7 },
                    { label: 'Beaded', value: 'Beaded', sortOrder: 8 },
                ],
            },
            {
                scope: 'pendants',
                label: 'Style',
                key: 'style',
                options: [
                    { label: 'All', value: 'ALL', sortOrder: 1 },
                    { label: 'Solitaire', value: 'Solitaire', sortOrder: 2 },
                    { label: 'Halo', value: 'Halo', sortOrder: 3 },
                    { label: 'Cluster', value: 'Cluster', sortOrder: 4 },
                    { label: 'Heart', value: 'Heart', sortOrder: 5 },
                    { label: 'Cross', value: 'Cross', sortOrder: 6 },
                    { label: 'Initial', value: 'Initial', sortOrder: 7 },
                    { label: 'Symbol', value: 'Symbol', sortOrder: 8 },
                ],
            },
        ];
        for (const styleCfg of categoryStyleConfigs) {
            let sg = await prisma_1.default.filterGroup.findFirst({
                where: {
                    key: styleCfg.key,
                    categoryScope: styleCfg.scope,
                },
            });
            if (!sg) {
                console.log(`Creating category-scoped style FilterGroup for "${styleCfg.scope}"`);
                sg = await prisma_1.default.filterGroup.create({
                    data: {
                        key: styleCfg.key,
                        label: styleCfg.label,
                        categoryScope: styleCfg.scope,
                        targetType: 'JEWELLERY',
                        filterType: 'SELECT',
                        sortOrder: 2,
                        isEnabled: true,
                    },
                });
            }
            const existingOptions = await prisma_1.default.filterOption.findMany({ where: { filterGroupId: sg.id } });
            const existingValues = new Set(existingOptions.map((o) => o.value.toLowerCase()));
            for (const opt of styleCfg.options) {
                if (!existingValues.has(opt.value.toLowerCase())) {
                    await prisma_1.default.filterOption.create({
                        data: {
                            filterGroupId: sg.id,
                            label: opt.label,
                            value: opt.value,
                            sortOrder: opt.sortOrder,
                            isEnabled: true,
                        },
                    });
                }
            }
        }
        // 3. SEED DIAMOND FILTER CONFIGS & OPTIONS IF EMPTY
        const filterConfigCount = await prisma_1.default.diamondFilterConfig.count();
        if (filterConfigCount === 0) {
            console.log('Seeding initial Diamond Vault Filter configurations and options...');
            // TYPE
            const typeConfig = await prisma_1.default.diamondFilterConfig.create({
                data: {
                    key: 'type',
                    title: 'Diamond Origin',
                    filterType: 'TYPE',
                    sortOrder: 1,
                    isEnabled: true,
                },
            });
            await prisma_1.default.diamondFilterOption.createMany({
                data: [
                    { configId: typeConfig.id, label: 'ALL DIAMONDS', value: 'ALL', sortOrder: 1, isEnabled: true },
                    { configId: typeConfig.id, label: 'NATURAL DIAMONDS', value: 'NATURAL', sortOrder: 2, isEnabled: true },
                    { configId: typeConfig.id, label: 'LAB-GROWN', value: 'LAB_GROWN', sortOrder: 3, isEnabled: true },
                ],
            });
            // CLASSIFICATION
            const classConfig = await prisma_1.default.diamondFilterConfig.create({
                data: {
                    key: 'classification',
                    title: 'Classification',
                    filterType: 'CLASSIFICATION',
                    sortOrder: 2,
                    isEnabled: true,
                },
            });
            await prisma_1.default.diamondFilterOption.createMany({
                data: [
                    { configId: classConfig.id, label: 'WHITE DIAMONDS', value: 'WHITE', sortOrder: 1, isEnabled: true },
                    { configId: classConfig.id, label: 'FANCY COLOR DIAMONDS', value: 'FANCY', sortOrder: 2, isEnabled: true },
                ],
            });
            // SHAPES
            const shapeConfig = await prisma_1.default.diamondFilterConfig.create({
                data: {
                    key: 'shape',
                    title: 'Stone Shape',
                    filterType: 'SHAPE',
                    sortOrder: 3,
                    isEnabled: true,
                },
            });
            const shapes = [
                { label: 'Round', value: 'Round', iconUrl: '/assets/diamonds/Round.svg', sortOrder: 1 },
                { label: 'Oval', value: 'Oval', iconUrl: '/assets/diamonds/Oval.svg', sortOrder: 2 },
                { label: 'Cushion', value: 'Cushion', iconUrl: '/assets/diamonds/Cushion.svg', sortOrder: 3 },
                { label: 'Emerald', value: 'Emerald', iconUrl: '/assets/diamonds/Emerald.svg', sortOrder: 4 },
                { label: 'Pear', value: 'Pear', iconUrl: '/assets/diamonds/Pear.svg', sortOrder: 5 },
                { label: 'Princess', value: 'Princess', iconUrl: '/assets/diamonds/Princess.svg', sortOrder: 6 },
                { label: 'Radiant', value: 'Radiant', iconUrl: '/assets/diamonds/Radiant.svg', sortOrder: 7 },
                { label: 'Heart', value: 'Heart', iconUrl: '/assets/diamonds/Heart.svg', sortOrder: 8 },
                { label: 'Marquise', value: 'Marquise', iconUrl: '/assets/diamonds/Marquise.svg', sortOrder: 9 },
                { label: 'Asscher', value: 'Asscher', iconUrl: '/assets/diamonds/Asscher.svg', sortOrder: 10 },
                { label: 'Trillion', value: 'Trillion', iconUrl: '/assets/diamonds/Trillion.svg', sortOrder: 11 },
            ];
            await prisma_1.default.diamondFilterOption.createMany({
                data: shapes.map((s) => ({
                    configId: shapeConfig.id,
                    label: s.label,
                    value: s.value,
                    iconUrl: s.iconUrl,
                    sortOrder: s.sortOrder,
                    isEnabled: true,
                })),
            });
            // CARAT WEIGHT BOUNDS
            await prisma_1.default.diamondFilterConfig.create({
                data: {
                    key: 'carat',
                    title: 'Carat Weight',
                    filterType: 'RANGE',
                    sortOrder: 4,
                    isEnabled: true,
                    configJson: JSON.stringify({ min: 0.3, max: 10.0, step: 0.01, precision: 2 }),
                },
            });
            // COLOR GRADE
            const colorConfig = await prisma_1.default.diamondFilterConfig.create({
                data: {
                    key: 'color',
                    title: 'Color Grade',
                    filterType: 'COLOR',
                    sortOrder: 5,
                    isEnabled: true,
                },
            });
            const whiteColors = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];
            await prisma_1.default.diamondFilterOption.createMany({
                data: whiteColors.map((c, i) => ({
                    configId: colorConfig.id,
                    label: c,
                    value: c,
                    sortOrder: i + 1,
                    isEnabled: true,
                })),
            });
            // CLARITY
            const clarityConfig = await prisma_1.default.diamondFilterConfig.create({
                data: {
                    key: 'clarity',
                    title: 'Clarity Grade',
                    filterType: 'CLARITY',
                    sortOrder: 6,
                    isEnabled: true,
                },
            });
            const clarities = ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'I2'];
            await prisma_1.default.diamondFilterOption.createMany({
                data: clarities.map((cl, i) => ({
                    configId: clarityConfig.id,
                    label: cl,
                    value: cl,
                    sortOrder: i + 1,
                    isEnabled: true,
                })),
            });
            // CERTIFICATION
            const certConfig = await prisma_1.default.diamondFilterConfig.create({
                data: {
                    key: 'certification',
                    title: 'Certification Lab',
                    filterType: 'CERTIFICATION',
                    sortOrder: 7,
                    isEnabled: true,
                },
            });
            const certs = ['GIA', 'IGI', 'GCAL', 'HRD', 'AGS', 'OTHER'];
            await prisma_1.default.diamondFilterOption.createMany({
                data: certs.map((ct, i) => ({
                    configId: certConfig.id,
                    label: ct,
                    value: ct,
                    sortOrder: i + 1,
                    isEnabled: true,
                })),
            });
            // PRICE RANGE BOUNDS
            await prisma_1.default.diamondFilterConfig.create({
                data: {
                    key: 'price',
                    title: 'Price Range ($)',
                    filterType: 'RANGE',
                    sortOrder: 8,
                    isEnabled: true,
                    configJson: JSON.stringify({ min: 500, max: 100000, step: 100, currency: '$' }),
                },
            });
        }
        // 4. SEED HOMEPAGE REVIEWS IF EMPTY
        const reviewCount = await prisma_1.default.homepageReview.count();
        if (reviewCount === 0) {
            console.log('Seeding initial Homepage Customer Reviews...');
            await prisma_1.default.homepageReview.createMany({
                data: [
                    {
                        customerName: 'Ryan K.',
                        rating: 5,
                        reviewText: 'Amazing selection at incredible prices!',
                        location: 'New York, NY',
                        reviewDate: '2026-02-14',
                        sortOrder: 1,
                        isActive: true,
                    },
                    {
                        customerName: 'Melissa S.',
                        rating: 5,
                        reviewText: 'Our wedding bands are perfect. Simple. High quality. Easy. Comfortable.',
                        location: 'Los Angeles, CA',
                        reviewDate: '2026-03-01',
                        sortOrder: 2,
                        isActive: true,
                    },
                    {
                        customerName: 'Carolyn M.',
                        rating: 5,
                        reviewText: 'Beautiful and great price',
                        location: 'Mumbai, India',
                        reviewDate: '2026-03-20',
                        sortOrder: 3,
                        isActive: true,
                    },
                    {
                        customerName: 'Scott C.',
                        rating: 5,
                        reviewText: 'Exactly as depicted. Beautiful ring, Excellent service.',
                        location: 'Toronto, CA',
                        reviewDate: '2026-04-05',
                        sortOrder: 4,
                        isActive: true,
                    },
                ],
            });
        }
        // 5. SEED INITIAL REALISTIC ORDERS & PAYMENTS (DISABLED SO USER HAS 0 ORDERS)
        // Orders will only be created when live clients or admin place real orders.
        return;
        console.log('Storefront CMS data and Orders/Financial seeds verified.');
    }
    catch (error) {
        console.error('Error in ensureStorefrontCmsSeeded:', error);
    }
};
exports.ensureStorefrontCmsSeeded = ensureStorefrontCmsSeeded;
