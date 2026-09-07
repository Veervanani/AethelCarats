import * as XLSX from 'xlsx';
import { Product } from '../types';

export interface ExportEbayOptions {
  fileName?: string;
  defaultBrand?: string;
  defaultShippingProfile?: string;
  defaultReturnProfile?: string;
  defaultPaymentProfile?: string;
  siteUrl?: string;
}

const EBAY_HEADERS = [
  '*Action(SiteID=US|Country=US|Currency=USD|Version=1193)',
  'Custom label (SKU)',
  'Category ID',
  'Category name',
  'Title',
  'Relationship',
  'Relationship details',
  'Schedule Time',
  'P:EPID',
  'Start price',
  'Quantity',
  'Item photo URL',
  'VideoID',
  'Condition ID',
  'Description',
  'Format',
  'Duration',
  'Buy It Now price',
  'Best Offer Enabled',
  'Best Offer Auto Accept Price',
  'Minimum Best Offer Price',
  'Immediate pay required',
  'Location',
  'Shipping service 1 option',
  'Shipping service 1 cost',
  'Shipping service 1 priority',
  'Shipping service 2 option',
  'Shipping service 2 cost',
  'Shipping service 2 priority',
  'Max dispatch time',
  'Returns accepted option',
  'Returns within option',
  'Refund option',
  'Return shipping cost paid by',
  'Shipping profile name',
  'Return profile name',
  'Payment profile name',
  'ProductCompliancePolicyID',
  'Regional ProductCompliancePolicies',
  'C:Brand',
  'C:Main Stone',
  'C:Metal',
  'C:Metal Purity',
  'C:Ring Size',
  'C:Main Stone Color',
  'C:Secondary Stone',
  'C:Type',
  'C:Color',
  'C:Base Metal',
  'C:Number of Diamonds',
  'C:Main Stone Shape',
  'C:Style',
  'C:Main Stone Creation',
  'C:Setting Style',
  'C:Material',
  'C:Diamond Color Grade',
  'C:Materials sourced from',
  'C:Total Carat Weight',
  'C:Main Stone Treatment',
  'C:Colored Diamond Intensity',
  'C:Certification',
  'C:Band Width',
  'C:Diamond Clarity Grade',
  'C:Cut Grade',
  'C:Chain Type',
  'C:Item Length',
  'C:Ear Area',
  'C:Pendant Shape',
  'C:Necklace Length',
  'Product Safety Pictograms',
  'Product Safety Statements',
  'Product Safety Component',
  'Regulatory Document Ids',
  'Manufacturer Name',
  'Manufacturer AddressLine1',
  'Manufacturer AddressLine2',
  'Manufacturer City',
  'Manufacturer Country',
  'Manufacturer PostalCode',
  'Manufacturer StateOrProvince',
  'Manufacturer Phone',
  'Manufacturer Email',
  'Manufacturer ContactURL',
  'Responsible Person 1',
  'Responsible Person 1 Type',
  'Responsible Person 1 AddressLine1',
  'Responsible Person 1 AddressLine2',
  'Responsible Person 1 City',
  'Responsible Person 1 Country',
  'Responsible Person 1 PostalCode',
  'Responsible Person 1 StateOrProvince',
  'Responsible Person 1 Phone',
  'Responsible Person 1 Email',
  'Responsible Person 1 ContactURL',
];

const CATEGORY_MAP: Record<string, { id: string; name: string }> = {
  ring: { id: '261994', name: '/Jewelry & Watches/Fine Jewelry/Rings' },
  rings: { id: '261994', name: '/Jewelry & Watches/Fine Jewelry/Rings' },
  engagement: { id: '261994', name: '/Jewelry & Watches/Fine Jewelry/Rings' },
  band: { id: '261994', name: '/Jewelry & Watches/Fine Jewelry/Rings' },
  bracelet: { id: '261988', name: '/Jewelry & Watches/Fine Jewelry/Bracelets & Charms' },
  bracelets: { id: '261988', name: '/Jewelry & Watches/Fine Jewelry/Bracelets & Charms' },
  bangle: { id: '261988', name: '/Jewelry & Watches/Fine Jewelry/Bracelets & Charms' },
  charm: { id: '261988', name: '/Jewelry & Watches/Fine Jewelry/Bracelets & Charms' },
  earring: { id: '261990', name: '/Jewelry & Watches/Fine Jewelry/Earrings' },
  earrings: { id: '261990', name: '/Jewelry & Watches/Fine Jewelry/Earrings' },
  stud: { id: '261990', name: '/Jewelry & Watches/Fine Jewelry/Earrings' },
  hoop: { id: '261990', name: '/Jewelry & Watches/Fine Jewelry/Earrings' },
  necklace: { id: '261993', name: '/Jewelry & Watches/Fine Jewelry/Necklaces & Pendants' },
  necklaces: { id: '261993', name: '/Jewelry & Watches/Fine Jewelry/Necklaces & Pendants' },
  pendant: { id: '261993', name: '/Jewelry & Watches/Fine Jewelry/Necklaces & Pendants' },
  pendants: { id: '261993', name: '/Jewelry & Watches/Fine Jewelry/Necklaces & Pendants' },
  toering: { id: '261995', name: '/Jewelry & Watches/Fine Jewelry/Toe Rings' },
  toerings: { id: '261995', name: '/Jewelry & Watches/Fine Jewelry/Toe Rings' },
};

function getCategoryInfo(product: Product): { id: string; name: string } {
  const catName = (product.category?.name || product.category?.slug || product.jewelleryType || '').toLowerCase();
  const titleLower = (product.name || product.title || '').toLowerCase();

  for (const [key, mapping] of Object.entries(CATEGORY_MAP)) {
    if (catName.includes(key) || titleLower.includes(key)) {
      return mapping;
    }
  }

  return { id: '261994', name: '/Jewelry & Watches/Fine Jewelry/Rings' };
}

function getPhotoUrls(product: Product, siteUrl: string): string {
  const urls: string[] = [];

  const addUrl = (url?: string) => {
    if (!url) return;
    let fullUrl = url.trim();
    if (fullUrl.startsWith('/')) {
      fullUrl = siteUrl + fullUrl;
    }
    if (!urls.includes(fullUrl)) {
      urls.push(fullUrl);
    }
  };

  addUrl(product.mainImage);
  addUrl(product.primaryImage);
  addUrl(product.secondaryImage);

  if (Array.isArray(product.images)) {
    product.images.forEach((img) => addUrl(img?.url));
  }

  return urls.slice(0, 12).join('|');
}

function cleanDescription(product: Product): string {
  const parts: string[] = [];
  if (product.shortDescription) parts.push(product.shortDescription.trim());
  if (product.fullDescription) parts.push(product.fullDescription.trim());
  if (product.specifications) parts.push('Specifications: ' + product.specifications.trim());
  if (product.careInstructions) parts.push('Care Instructions: ' + product.careInstructions.trim());

  const combined = parts.join('\n\n') || product.name || 'Fine luxury jewellery item crafted by Aura Diamond Atelier.';
  return combined.replace(/<[^>]*>?/gm, ' ').replace(/\s\s+/g, ' ').trim();
}

function formatEbayTitle(title: string): string {
  const clean = title.replace(/\s+/g, ' ').trim();
  return clean.length > 80 ? clean.substring(0, 77) + '...' : clean;
}

function buildProductRows(products: Product[], options: ExportEbayOptions = {}): any[][] {
  const siteUrl = options.siteUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://auroradiamonds.com');
  const brand = options.defaultBrand || 'Aura Diamond Atelier';
  const shippingProfile = options.defaultShippingProfile || 'shipping1 - (ID: 276534078018)';
  const returnProfile = options.defaultReturnProfile || 'free 30 days money back - International free 3 (258806232018) - (ID: 258806232018)';
  const paymentProfile = options.defaultPaymentProfile || 'eBay Managed Payments (258806234018) - (ID: 258806234018)';

  return products.map((p) => {
    const cat = getCategoryInfo(p);
    const price = p.salePrice || p.price || 1500;
    const sku = p.sku || ('FJ-' + (p.id ? p.id.substring(0, 8).toUpperCase() : 'PROD'));
    const photos = getPhotoUrls(p, siteUrl);
    const description = cleanDescription(p);
    const diamondDetails = p.diamondDetails || {};

    const metalPurity = p.goldPurity || '14k';
    const metalType = p.metal || 'Gold';
    const mainStone = p.diamondType || p.gemstone || 'Lab-Created Diamond';
    const diamondColor = p.color || diamondDetails.color || 'D';
    const diamondClarity = p.clarity || diamondDetails.clarity || 'VVS1';
    const diamondCut = p.cut || diamondDetails.cut || 'Excellent';
    const diamondCarat = p.carat || diamondDetails.caratWeight || 1.0;
    const ringSize = p.ringSize || p.fixedRingSize || '7';
    const shape = p.shape || diamondDetails.shape || 'Round';
    const ringStyle = p.ringStyle || 'Solitaire';
    const isLab = mainStone.toLowerCase().includes('lab') || (p.diamondType || '').toLowerCase().includes('lab');

    return [
      'Add',
      sku,
      cat.id,
      cat.name,
      formatEbayTitle(p.name || p.title || 'Aura Diamond Atelier Fine Jewellery'),
      '',
      '',
      '',
      '',
      price,
      p.stockQuantity && p.stockQuantity > 0 ? p.stockQuantity : 10,
      photos,
      '',
      '1000',
      description,
      'FixedPrice',
      'GTC',
      price,
      '0',
      '',
      '',
      '1',
      'London, United Kingdom',
      'USPSPriority',
      0.0,
      1,
      '',
      '',
      '',
      p.processingTimeDays || 3,
      'ReturnsAccepted',
      'Days_30',
      'MoneyBack',
      'Seller',
      shippingProfile,
      returnProfile,
      paymentProfile,
      '',
      '',
      brand,
      mainStone,
      metalType,
      metalPurity,
      cat.id === '261994' ? ringSize : '',
      diamondColor,
      p.gemstone || '',
      p.jewelleryType || (cat.id === '261994' ? 'Ring' : cat.id === '261990' ? 'Earrings' : 'Fine Jewellery'),
      p.goldColor || p.metalColor || 'White',
      metalType,
      p.internalTags?.includes('solitaire') ? 1 : 1,
      shape,
      ringStyle,
      isLab ? 'Lab-Created' : 'Natural',
      'Prong',
      metalType,
      diamondColor,
      'Ethically Sourced',
      diamondCarat,
      'Not Enhanced',
      '',
      p.certification || diamondDetails.certification || 'IGI',
      p.ringWidth || '1.8 mm',
      diamondClarity,
      diamondCut,
      p.jewelleryType === 'Necklace' ? 'Cable' : '',
      '',
      p.jewelleryType === 'Earring' ? 'Lobe' : '',
      cat.id === '261993' ? shape : '',
      p.jewelleryType === 'Necklace' ? '18 in' : '',
      '',
      '',
      '',
      '',
      'Aura Diamond Atelier',
      'Suite 404, Diamond Quarter',
      'Hatton Garden',
      'London',
      'GB',
      'EC1N 8LE',
      'Greater London',
      '+44 7900 123456',
      'concierge@auroradiamonds.com',
      siteUrl,
      'Aura Diamond Atelier Compliance',
      'EUResponsiblePerson',
      'Suite 404, Diamond Quarter',
      'Hatton Garden',
      'London',
      'GB',
      'EC1N 8LE',
      'Greater London',
      '+44 7900 123456',
      'compliance@auroradiamonds.com',
      siteUrl,
    ];
  });
}

export async function exportProductsToEbayExcel(products: Product[], options: ExportEbayOptions = {}) {
  const rows = buildProductRows(products, options);
  const dateStr = new Date().toISOString().split('T')[0];
  const outFileName = options.fileName || ('Aura_Jewel_eBay_Listings_' + dateStr + '.xlsx');

  try {
    const response = await fetch('/ebay-template.xlsx');
    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const wb = XLSX.read(arrayBuffer, { type: 'array' });
      const ws = wb.Sheets['Listings'];
      if (ws) {
        XLSX.utils.sheet_add_aoa(ws, rows, { origin: -1 });
        XLSX.writeFile(wb, outFileName);
        return { success: true, count: products.length, fileName: outFileName };
      }
    }
  } catch (e) {
    console.warn('Could not load /ebay-template.xlsx, generating fallback workbook:', e);
  }

  const listingsData: any[][] = [
    ['#INFO', 'Created=' + Date.now(), '', '', '', '', ' Indicates missing required fields', '', '', '', '', ' Indicates missing field that will be required soon'],
    ['#INFO', 'Version=1.0', '', 'Template=fx_category_template_EBAY_US', '', '', ' Indicates missing recommended field', '', '', '', '', ' Indicates field does not apply to this item/category'],
    ['#INFO'],
    EBAY_HEADERS,
    ...rows,
  ];

  const workbook = XLSX.utils.book_new();
  const wsListings = XLSX.utils.aoa_to_sheet(listingsData);
  XLSX.utils.book_append_sheet(workbook, wsListings, 'Listings');
  XLSX.writeFile(workbook, outFileName);
  return { success: true, count: products.length, fileName: outFileName };
}

export function exportProductsToEbayCsv(products: Product[], options: ExportEbayOptions = {}) {
  const rows = buildProductRows(products, options);
  const dateStr = new Date().toISOString().split('T')[0];
  const outFileName = options.fileName || ('Aura_Jewel_eBay_Listings_' + dateStr + '.csv');

  const listingsData: any[][] = [
    ['#INFO', 'Created=' + Date.now(), '', '', '', '', ' Indicates missing required fields', '', '', '', '', ' Indicates missing field that will be required soon'],
    ['#INFO', 'Version=1.0', '', 'Template=fx_category_template_EBAY_US', '', '', ' Indicates missing recommended field', '', '', '', '', ' Indicates field does not apply to this item/category'],
    ['#INFO'],
    EBAY_HEADERS,
    ...rows,
  ];

  const ws = XLSX.utils.aoa_to_sheet(listingsData);
  const csv = XLSX.utils.sheet_to_csv(ws);

  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', outFileName);
  document.body.appendChild(link);
  link.click();
  link.remove();

  return { success: true, count: products.length, fileName: outFileName };
}