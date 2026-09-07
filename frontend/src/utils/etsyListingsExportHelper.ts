import * as XLSX from 'xlsx';
import { Product } from '../types';

export interface ExportEtsyOptions {
  fileName?: string;
  currencyCode?: string;
  siteUrl?: string;
}

export const ETSY_HEADERS = [
  'TITLE',
  'DESCRIPTION',
  'PRICE',
  'CURRENCY_CODE',
  'QUANTITY',
  'TAGS',
  'MATERIALS',
  'IMAGE1',
  'IMAGE2',
  'IMAGE3',
  'IMAGE4',
  'IMAGE5',
  'IMAGE6',
  'IMAGE7',
  'IMAGE8',
  'IMAGE9',
  'IMAGE10',
  'VARIATION 1 TYPE',
  'VARIATION 1 NAME',
  'VARIATION 1 VALUES',
  'VARIATION 2 TYPE',
  'VARIATION 2 NAME',
  'VARIATION 2 VALUES',
  'SKU',
];

function getAllImages(product: Product, siteUrl: string): string[] {
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

  return urls;
}

function sanitizeEtsyDescription(product: Product): string {
  let raw = product.fullDescription || product.shortDescription || '';

  // Sanitize silver & obsolete mentions
  raw = raw.replace(/Silver Option:\s*935 Argentium Silver/gi, '');
  raw = raw.replace(/Silver Option:\s*925 Sterling Silver/gi, '');
  raw = raw.replace(/935 Argentium Silver/gi, '');
  raw = raw.replace(/925 Sterling Silver/gi, '');
  raw = raw.replace(/Argentium Silver/gi, '');
  raw = raw.replace(/10K Solid Gold\s*\|\s*/gi, '');
  raw = raw.replace(/10K Solid Gold/gi, '');
  raw = raw.replace(/10K Gold\s*\|\s*/gi, '');
  raw = raw.replace(/10k\s*\|\s*/gi, '');
  raw = raw.replace(/\|\s*\|\s*/g, '| ');
  raw = raw.replace(/\|\s*$/gm, '');

  if (!raw.trim()) {
    raw = `${product.name || 'Fine luxury jewellery'}\n\nHandcrafted in solid 14K / 18K gold by Aura Diamond Atelier. Certified conflict-free lab-grown diamonds with optical precision cut.`;
  }

  return raw.trim();
}

function generateEtsyTags(product: Product): string {
  const rawTags = [
    'Engagement_Ring',
    'Wedding_Ring',
    'Anniversary_Gift',
    'Lab_Grown_Diamond',
    'Free_Engraving',
    'Handmade_Jewelry',
    '14K_Gold',
    '18K_Gold',
    'Fine_Jewelry',
    'IGI_Certified',
    'Solitaire_Ring',
    'Eternity_band',
    'Stackable_Ring',
  ];

  if (product.shape) rawTags.push(`${product.shape}_Diamond`);
  if (product.category?.name) rawTags.push(product.category.name.replace(/\s+/g, '_'));
  if (product.jewelleryType) rawTags.push(product.jewelleryType.replace(/\s+/g, '_'));

  // Etsy max 13 tags, each max 20 chars
  return rawTags
    .slice(0, 13)
    .map((t) => t.replace(/[^a-zA-Z0-9_]/g, '').substring(0, 20))
    .join(',');
}

export function buildEtsyExportRows(products: Product[], options: ExportEtsyOptions = {}): any[][] {
  const siteUrl = options.siteUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://auroradiamonds.com');
  const currencyCode = options.currencyCode || 'USD';

  const standardRingSizes = '3,3 1/2,4,4 1/2,5,5 1/2,6,6 1/2,7,7 1/2,8,8 1/2,9,9 1/2,10,10 1/2,11,11 1/2,12,12 1/2,13,13 1/2,14';
  const standardGoldMetals = '14K Yellow Gold,14K White Gold,14K Rose Gold,18K Yellow Gold,18K White Gold,18K Rose Gold';

  const rows: any[][] = [];

  for (const product of products) {
    const title = product.name || product.title || 'Aura Diamond Atelier Fine Jewelry';
    const description = sanitizeEtsyDescription(product);
    const price = product.salePrice || product.price || 2500;
    const quantity = product.stockQuantity || 10;
    const tags = generateEtsyTags(product);
    const materials = '14k,18k,Solid gold,Yellow gold,Rose gold,White gold,Lab-Grown Diamond';
    const images = getAllImages(product, siteUrl);
    const sku = product.sku || ('FJ-' + (product.id ? product.id.substring(0, 8).toUpperCase() : 'JW'));

    const isRing = (product.jewelleryType || '').toLowerCase().includes('ring') ||
                   (product.category?.name || '').toLowerCase().includes('ring') ||
                   title.toLowerCase().includes('ring') ||
                   title.toLowerCase().includes('band');

    // Get active variations from product if available
    let varList = Array.isArray(product.variations) ? product.variations : [];
    varList = varList.filter((v: any) => {
      const m = String(v.metal || '').toLowerCase();
      return !m.includes('silver') && !m.includes('ag') && !m.includes('10k') && !m.includes('9k');
    });

    let ringSizesVal = standardRingSizes;
    let metalsVal = standardGoldMetals;

    if (varList.length > 0) {
      const customSizes = Array.from(new Set(varList.map((v: any) => v.ringSize).filter(Boolean))) as string[];
      if (customSizes.length > 0) {
        ringSizesVal = customSizes.map((s) => s.replace(/^US\s*/i, '')).join(',');
      }

      const customMetals = Array.from(new Set(varList.map((v: any) => v.metal).filter(Boolean))) as string[];
      if (customMetals.length > 0) {
        metalsVal = customMetals.join(',');
      }
    }

    const row = [
      title,
      description,
      price,
      currencyCode,
      quantity,
      tags,
      materials,
      images[0] || '',
      images[1] || '',
      images[2] || '',
      images[3] || '',
      images[4] || '',
      images[5] || '',
      images[6] || '',
      images[7] || '',
      images[8] || '',
      images[9] || '',
      isRing ? 'Ring size' : 'Primary color',
      isRing ? 'Ring size' : 'Primary color',
      isRing ? ringSizesVal : '14K Yellow Gold,14K White Gold,14K Rose Gold',
      'Custom Property',
      'Metal',
      metalsVal,
      sku,
    ];

    rows.push(row);
  }

  return rows;
}

export function exportProductsToEtsyCsv(products: Product[], options: ExportEtsyOptions = {}) {
  const dataRows = buildEtsyExportRows(products, options);
  const outFileName = options.fileName || 'EtsyListingsDownload.csv';

  const allRows = [ETSY_HEADERS, ...dataRows];
  const ws = XLSX.utils.aoa_to_sheet(allRows);
  const csv = XLSX.utils.sheet_to_csv(ws);

  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', outFileName);
  document.body.appendChild(link);
  link.click();
  link.remove();

  return { success: true, count: products.length, fileName: outFileName, rowCount: dataRows.length };
}

export function exportProductsToEtsyExcel(products: Product[], options: ExportEtsyOptions = {}) {
  const dataRows = buildEtsyExportRows(products, options);
  const outFileName = options.fileName || 'EtsyListingsDownload.xlsx';

  const allRows = [ETSY_HEADERS, ...dataRows];
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(allRows);
  XLSX.utils.book_append_sheet(wb, ws, 'EtsyListingsDownload');

  XLSX.writeFile(wb, outFileName);
  return { success: true, count: products.length, fileName: outFileName, rowCount: dataRows.length };
}
