import prisma from './prisma';

export interface SeedFilterOptionItem {
  label: string;
  value: string;
  colorHex?: string;
  iconUrl?: string;
  sortOrder?: number;
  applicableJewelleryTypes?: string;
}

export interface SeedFilterConfigItem {
  key: string;
  name: string;
  customerLabel: string;
  filterType: string;
  sortOrder: number;
  isEnabled: boolean;
  applicableJewelleryTypes: string;
  configJson?: string;
  options: SeedFilterOptionItem[];
}

export async function seedFilterConfigs() {
  console.log('--- SEEDING GLOBAL PRODUCT FILTER CONFIGURATIONS ---');

  const defaultFilters: SeedFilterConfigItem[] = [
    {
      key: 'gender',
      name: 'Gender',
      customerLabel: 'Gender',
      filterType: 'Select',
      sortOrder: 1,
      isEnabled: true,
      applicableJewelleryTypes: 'All',
      configJson: JSON.stringify({ icon: '👤' }),
      options: [
        { label: 'All', value: 'All', sortOrder: 0, applicableJewelleryTypes: 'All' },
        { label: 'Women', value: 'Women', sortOrder: 1, applicableJewelleryTypes: 'All' },
        { label: 'Men', value: 'Men', sortOrder: 2, applicableJewelleryTypes: 'All' },
        { label: 'Unisex', value: 'Unisex', sortOrder: 3, applicableJewelleryTypes: 'All' },
      ],
    },
    {
      key: 'style',
      name: 'Style',
      customerLabel: 'Style',
      filterType: 'Select',
      sortOrder: 2,
      isEnabled: true,
      applicableJewelleryTypes: 'All',
      configJson: JSON.stringify({ icon: '✨' }),
      options: [
        // Rings Styles
        { label: 'Solitaire', value: 'Solitaire', sortOrder: 1, applicableJewelleryTypes: 'Rings,Pendants' },
        { label: 'Halo', value: 'Halo', sortOrder: 2, applicableJewelleryTypes: 'Rings,Pendants' },
        { label: 'Three Stone', value: 'Three Stone', sortOrder: 3, applicableJewelleryTypes: 'Rings' },
        { label: 'Hidden Halo', value: 'Hidden Halo', sortOrder: 4, applicableJewelleryTypes: 'Rings' },
        { label: 'Pavé', value: 'Pavé', sortOrder: 5, applicableJewelleryTypes: 'Rings' },
        { label: 'Side Stone', value: 'Side Stone', sortOrder: 6, applicableJewelleryTypes: 'Rings' },
        { label: 'Vintage', value: 'Vintage', sortOrder: 7, applicableJewelleryTypes: 'Rings,Collections' },
        { label: 'Modern', value: 'Modern', sortOrder: 8, applicableJewelleryTypes: 'Rings,Collections' },
        // Earrings Styles
        { label: 'Stud', value: 'Stud', sortOrder: 9, applicableJewelleryTypes: 'Earrings' },
        { label: 'Hoop', value: 'Hoop', sortOrder: 10, applicableJewelleryTypes: 'Earrings' },
        { label: 'Huggie', value: 'Huggie', sortOrder: 11, applicableJewelleryTypes: 'Earrings' },
        { label: 'Drop', value: 'Drop', sortOrder: 12, applicableJewelleryTypes: 'Earrings,Pendants' },
        { label: 'Dangle', value: 'Dangle', sortOrder: 13, applicableJewelleryTypes: 'Earrings' },
        { label: 'Chandelier', value: 'Chandelier', sortOrder: 14, applicableJewelleryTypes: 'Earrings' },
        { label: 'Cluster', value: 'Cluster', sortOrder: 15, applicableJewelleryTypes: 'Earrings,Pendants' },
        // Necklaces & Bracelets Styles
        { label: 'Pendant', value: 'Pendant', sortOrder: 16, applicableJewelleryTypes: 'Necklaces' },
        { label: 'Tennis', value: 'Tennis', sortOrder: 17, applicableJewelleryTypes: 'Necklaces,Bracelets' },
        { label: 'Chain', value: 'Chain', sortOrder: 18, applicableJewelleryTypes: 'Necklaces,Bracelets' },
        { label: 'Choker', value: 'Choker', sortOrder: 19, applicableJewelleryTypes: 'Necklaces' },
        { label: 'Lariat', value: 'Lariat', sortOrder: 20, applicableJewelleryTypes: 'Necklaces' },
        { label: 'Station', value: 'Station', sortOrder: 21, applicableJewelleryTypes: 'Necklaces' },
        { label: 'Statement', value: 'Statement', sortOrder: 22, applicableJewelleryTypes: 'Necklaces,Bracelets,Pendants,Collections' },
        { label: 'Bangle', value: 'Bangle', sortOrder: 23, applicableJewelleryTypes: 'Bracelets' },
        { label: 'Cuff', value: 'Cuff', sortOrder: 24, applicableJewelleryTypes: 'Bracelets' },
        { label: 'Link', value: 'Link', sortOrder: 25, applicableJewelleryTypes: 'Bracelets' },
        { label: 'Charm', value: 'Charm', sortOrder: 26, applicableJewelleryTypes: 'Bracelets' },
        // Pendants Specific
        { label: 'Heart', value: 'Heart', sortOrder: 27, applicableJewelleryTypes: 'Pendants' },
        { label: 'Cross', value: 'Cross', sortOrder: 28, applicableJewelleryTypes: 'Pendants' },
        // Collections Specific
        { label: 'Bridal', value: 'Bridal', sortOrder: 29, applicableJewelleryTypes: 'Collections' },
        { label: 'Engagement', value: 'Engagement', sortOrder: 30, applicableJewelleryTypes: 'Collections' },
        { label: 'Wedding', value: 'Wedding', sortOrder: 31, applicableJewelleryTypes: 'Collections' },
        { label: 'Anniversary', value: 'Anniversary', sortOrder: 32, applicableJewelleryTypes: 'Collections' },
        { label: 'Everyday', value: 'Everyday', sortOrder: 33, applicableJewelleryTypes: 'Collections' },
      ],
    },
    {
      key: 'metal',
      name: 'Metal',
      customerLabel: 'Metal',
      filterType: 'Swatch/List',
      sortOrder: 3,
      isEnabled: true,
      applicableJewelleryTypes: 'All',
      configJson: JSON.stringify({ icon: '💍' }),
      options: [
        { label: '14K Yellow Gold', value: '14k-yellow-gold', colorHex: '#E8C872', sortOrder: 1 },
        { label: '14K White Gold', value: '14k-white-gold', colorHex: '#CBD5E1', sortOrder: 2 },
        { label: '14K Rose Gold', value: '14k-rose-gold', colorHex: '#E4A8A5', sortOrder: 3 },
        { label: '18K Yellow Gold', value: '18k-yellow-gold', colorHex: '#E8C872', sortOrder: 4 },
        { label: '18K White Gold', value: '18k-white-gold', colorHex: '#CBD5E1', sortOrder: 5 },
        { label: '18K Rose Gold', value: '18k-rose-gold', colorHex: '#E4A8A5', sortOrder: 6 },
        { label: 'Silver', value: 'silver', colorHex: '#E2E8F0', sortOrder: 7 },
      ],
    },
    {
      key: 'stone_shape',
      name: 'Stone Shape',
      customerLabel: 'Stone Shape',
      filterType: 'Shape Grid',
      sortOrder: 4,
      isEnabled: true,
      applicableJewelleryTypes: 'All',
      configJson: JSON.stringify({ icon: '◯' }),
      options: [
        { label: 'Round', value: 'round', iconUrl: '/assets/shapes/round.svg', sortOrder: 1 },
        { label: 'Oval', value: 'oval', iconUrl: '/assets/shapes/oval.svg', sortOrder: 2 },
        { label: 'Cushion', value: 'cushion', iconUrl: '/assets/shapes/cushion.svg', sortOrder: 3 },
        { label: 'Emerald', value: 'emerald', iconUrl: '/assets/shapes/emerald.svg', sortOrder: 4 },
        { label: 'Princess', value: 'princess', iconUrl: '/assets/shapes/princess.svg', sortOrder: 5 },
        { label: 'Radiant', value: 'radiant', iconUrl: '/assets/shapes/radiant.svg', sortOrder: 6 },
        { label: 'Pear', value: 'pear', iconUrl: '/assets/shapes/pear.svg', sortOrder: 7 },
        { label: 'Heart', value: 'heart', iconUrl: '/assets/shapes/heart.svg', sortOrder: 8 },
        { label: 'Marquise', value: 'marquise', iconUrl: '/assets/shapes/marquise.svg', sortOrder: 9 },
        { label: 'Asscher', value: 'asscher', iconUrl: '/assets/shapes/asscher.svg', sortOrder: 10 },
        { label: 'Baguette', value: 'baguette', sortOrder: 11 },
        { label: 'Tapered Baguette', value: 'tapered-baguette', sortOrder: 12 },
        { label: 'Trillion', value: 'trillion', sortOrder: 13 },
        { label: 'Other', value: 'other', sortOrder: 14 },
      ],
    },
    {
      key: 'diamond',
      name: 'Diamond',
      customerLabel: 'Diamond',
      filterType: 'Icon + Select',
      sortOrder: 5,
      isEnabled: true,
      applicableJewelleryTypes: 'Diamonds/Jewelry',
      configJson: JSON.stringify({ icon: '💎' }),
      options: [
        { label: 'All', value: 'All', sortOrder: 0 },
        { label: 'Natural', value: 'natural', sortOrder: 1 },
        { label: 'Lab Grown', value: 'lab-grown', sortOrder: 2 },
      ],
    },
    {
      key: 'price',
      name: 'Price',
      customerLabel: 'Price',
      filterType: 'Price Range',
      sortOrder: 6,
      isEnabled: true,
      applicableJewelleryTypes: 'All',
      configJson: JSON.stringify({ icon: '$', min: 0, max: 50000 }),
      options: [
        { label: '$0 - $1,000', value: '0-1000', sortOrder: 1 },
        { label: '$1,000 - $2,500', value: '1000-2500', sortOrder: 2 },
        { label: '$2,500 - $5,000', value: '2500-5000', sortOrder: 3 },
        { label: '$5,000+', value: '5000-999999', sortOrder: 4 },
      ],
    },
    {
      key: 'ring_size',
      name: 'Ring Size',
      customerLabel: 'Ring Size',
      filterType: 'Select',
      sortOrder: 7,
      isEnabled: true,
      applicableJewelleryTypes: 'Rings',
      configJson: JSON.stringify({ icon: '◯' }),
      options: [
        { label: 'All Sizes', value: 'All', sortOrder: 0 },
        { label: 'US 3', value: 'US 3', sortOrder: 1 },
        { label: 'US 3.5', value: 'US 3.5', sortOrder: 2 },
        { label: 'US 4', value: 'US 4', sortOrder: 3 },
        { label: 'US 4.5', value: 'US 4.5', sortOrder: 4 },
        { label: 'US 5', value: 'US 5', sortOrder: 5 },
        { label: 'US 5.5', value: 'US 5.5', sortOrder: 6 },
        { label: 'US 6', value: 'US 6', sortOrder: 7 },
        { label: 'US 6.5', value: 'US 6.5', sortOrder: 8 },
        { label: 'US 7', value: 'US 7', sortOrder: 9 },
        { label: 'US 7.5', value: 'US 7.5', sortOrder: 10 },
        { label: 'US 8', value: 'US 8', sortOrder: 11 },
        { label: 'US 8.5', value: 'US 8.5', sortOrder: 12 },
        { label: 'US 9', value: 'US 9', sortOrder: 13 },
        { label: 'US 9.5', value: 'US 9.5', sortOrder: 14 },
        { label: 'US 10', value: 'US 10', sortOrder: 15 },
        { label: 'US 10.5', value: 'US 10.5', sortOrder: 16 },
        { label: 'US 11', value: 'US 11', sortOrder: 17 },
        { label: 'US 11.5', value: 'US 11.5', sortOrder: 18 },
        { label: 'US 12', value: 'US 12', sortOrder: 19 },
      ],
    },
    {
      key: 'carat_weight',
      name: 'Carat Weight',
      customerLabel: 'Carat Weight',
      filterType: 'Select',
      sortOrder: 8,
      isEnabled: true,
      applicableJewelleryTypes: 'Diamonds/Jewelry',
      configJson: JSON.stringify({ icon: '✦' }),
      options: [
        { label: 'Under 0.50 ct', value: '0-0.49', sortOrder: 1 },
        { label: '0.50–0.99 ct', value: '0.5-0.99', sortOrder: 2 },
        { label: '1.00–1.49 ct', value: '1.0-1.49', sortOrder: 3 },
        { label: '1.50–1.99 ct', value: '1.5-1.99', sortOrder: 4 },
        { label: '2.00–2.99 ct', value: '2.0-2.99', sortOrder: 5 },
        { label: '3.00–3.99 ct', value: '3.0-3.99', sortOrder: 6 },
        { label: '4.00 ct+', value: '4.0-99', sortOrder: 7 },
      ],
    },
    {
      key: 'clarity',
      name: 'Clarity',
      customerLabel: 'Clarity',
      filterType: 'Select',
      sortOrder: 9,
      isEnabled: true,
      applicableJewelleryTypes: 'Diamonds',
      configJson: JSON.stringify({ icon: '◇' }),
      options: [
        { label: 'FL', value: 'FL', sortOrder: 1 },
        { label: 'IF', value: 'IF', sortOrder: 2 },
        { label: 'VVS1', value: 'VVS1', sortOrder: 3 },
        { label: 'VVS2', value: 'VVS2', sortOrder: 4 },
        { label: 'VS1', value: 'VS1', sortOrder: 5 },
        { label: 'VS2', value: 'VS2', sortOrder: 6 },
        { label: 'SI1', value: 'SI1', sortOrder: 7 },
        { label: 'SI2', value: 'SI2', sortOrder: 8 },
        { label: 'I1', value: 'I1', sortOrder: 9 },
        { label: 'I2', value: 'I2', sortOrder: 10 },
        { label: 'I3', value: 'I3', sortOrder: 11 },
      ],
    },
    {
      key: 'color',
      name: 'Color',
      customerLabel: 'Color',
      filterType: 'Select',
      sortOrder: 10,
      isEnabled: true,
      applicableJewelleryTypes: 'Diamonds',
      configJson: JSON.stringify({ icon: '🎨' }),
      options: [
        { label: 'Any Color', value: 'Any Color', sortOrder: 0 },
        // Standard D-M
        { label: 'D Grade', value: 'D', sortOrder: 1 },
        { label: 'E Grade', value: 'E', sortOrder: 2 },
        { label: 'F Grade', value: 'F', sortOrder: 3 },
        { label: 'G Grade', value: 'G', sortOrder: 4 },
        { label: 'H Grade', value: 'H', sortOrder: 5 },
        { label: 'I Grade', value: 'I', sortOrder: 6 },
        { label: 'J Grade', value: 'J', sortOrder: 7 },
        { label: 'K Grade', value: 'K', sortOrder: 8 },
        { label: 'L Grade', value: 'L', sortOrder: 9 },
        { label: 'M Grade', value: 'M', sortOrder: 10 },
        // Fancy Colors
        { label: 'Fancy Yellow', value: 'fancy-yellow', colorHex: '#FACC15', sortOrder: 11 },
        { label: 'Fancy Pink', value: 'fancy-pink', colorHex: '#F472B6', sortOrder: 12 },
        { label: 'Fancy Blue', value: 'fancy-blue', colorHex: '#60A5FA', sortOrder: 13 },
        { label: 'Fancy Green', value: 'fancy-green', colorHex: '#4ADE80', sortOrder: 14 },
        { label: 'Fancy Orange', value: 'fancy-orange', colorHex: '#FB923C', sortOrder: 15 },
        { label: 'Fancy Red', value: 'fancy-red', colorHex: '#EF4444', sortOrder: 16 },
        { label: 'Fancy Purple', value: 'fancy-purple', colorHex: '#A855F7', sortOrder: 17 },
        { label: 'Fancy Brown', value: 'fancy-brown', colorHex: '#78350F', sortOrder: 18 },
        { label: 'Fancy Black', value: 'fancy-black', colorHex: '#18181B', sortOrder: 19 },
        { label: 'Other Fancy Color', value: 'fancy-other', colorHex: '#E2E8F0', sortOrder: 20 },
      ],
    },
    {
      key: 'cut',
      name: 'Cut Grade',
      customerLabel: 'Cut',
      filterType: 'Select',
      sortOrder: 11,
      isEnabled: true,
      applicableJewelleryTypes: 'Diamonds',
      configJson: JSON.stringify({ icon: '✦' }),
      options: [
        { label: 'All', value: 'All', sortOrder: 0 },
        { label: 'Excellent', value: 'Excellent', sortOrder: 1 },
        { label: 'Very Good', value: 'Very Good', sortOrder: 2 },
        { label: 'Good', value: 'Good', sortOrder: 3 },
        { label: 'Fair', value: 'Fair', sortOrder: 4 },
        { label: 'Poor', value: 'Poor', sortOrder: 5 },
      ],
    },
    {
      key: 'certification',
      name: 'Certification',
      customerLabel: 'Certification',
      filterType: 'Select',
      sortOrder: 12,
      isEnabled: true,
      applicableJewelleryTypes: 'Diamonds',
      configJson: JSON.stringify({ icon: '📜' }),
      options: [
        { label: 'All', value: 'All', sortOrder: 0 },
        { label: 'GIA', value: 'GIA', sortOrder: 1 },
        { label: 'IGI', value: 'IGI', sortOrder: 2 },
        { label: 'HRD', value: 'HRD', sortOrder: 3 },
        { label: 'GCAL', value: 'GCAL', sortOrder: 4 },
        { label: 'Other', value: 'Other', sortOrder: 5 },
      ],
    },
  ];

  for (const fData of defaultFilters) {
    const { options, ...configData } = fData;
    let existing = await prisma.productFilterConfig.findUnique({
      where: { key: configData.key },
    });

    if (!existing) {
      existing = await prisma.productFilterConfig.create({
        data: configData,
      });
    }

    if (existing?.id) {
      for (const opt of options) {
        const optExist = await prisma.productFilterOption.findFirst({
          where: { filterId: existing.id, value: opt.value },
        });

        if (!optExist) {
          await prisma.productFilterOption.create({
            data: {
              filterId: existing.id,
              label: opt.label,
              value: opt.value,
              colorHex: opt.colorHex || null,
              iconUrl: opt.iconUrl || null,
              sortOrder: opt.sortOrder || 0,
              isEnabled: true,
              applicableJewelleryTypes: opt.applicableJewelleryTypes || 'All',
            },
          });
        }
      }
    }
  }

  console.log('✅ GLOBAL PRODUCT FILTER CONFIGURATIONS SEEDED SUCCESSFULLY!');
}

if (require.main === module) {
  seedFilterConfigs()
    .then(() => {
      prisma.$disconnect();
    })
    .catch((err) => {
      console.error(err);
      prisma.$disconnect();
      process.exit(1);
    });
}
