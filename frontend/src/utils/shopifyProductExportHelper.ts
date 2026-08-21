import * as XLSX from 'xlsx';
import { Product } from '../types';

export interface ExportShopifyOptions {
  fileName?: string;
  vendor?: string;
  siteUrl?: string;
}

export const SHOPIFY_HEADERS = [
  'Title',
  'URL handle',
  'Description',
  'Vendor',
  'Product category',
  'Type',
  'Tags',
  'Published on online store',
  'Status',
  'SKU',
  'Barcode',
  'Option1 name',
  'Option1 value',
  'Option1 Linked To',
  'Option2 name',
  'Option2 value',
  'Option2 Linked To',
  'Option3 name',
  'Option3 value',
  'Option3 Linked To',
  'Price',
  'Compare-at price',
  'Cost per item',
  'Charge tax',
  'Tax code',
  'Unit price total measure',
  'Unit price total measure unit',
  'Unit price base measure',
  'Unit price base measure unit',
  'Inventory tracker',
  'Inventory quantity',
  'Continue selling when out of stock',
  'Weight value (grams)',
  'Weight unit for display',
  'Requires shipping',
  'Fulfillment service',
  'Product image URL',
  'Image position',
  'Image alt text',
  'Variant image URL',
  'Gift card',
  'SEO title',
  'SEO description',
  'Color (product.metafields.shopify.color-pattern)',
  'Google Shopping / Google product category',
  'Google Shopping / Gender',
  'Google Shopping / Age group',
  'Google Shopping / Manufacturer part number (MPN)',
  'Google Shopping / Ad group name',
  'Google Shopping / Ads labels',
  'Google Shopping / Condition',
  'Google Shopping / Custom product',
  'Google Shopping / Custom label 0',
  'Google Shopping / Custom label 1',
  'Google Shopping / Custom label 2',
  'Google Shopping / Custom label 3',
  'Google Shopping / Custom label 4',
];

function getCategoryInfo(product: Product): { shopifyCategory: string; type: string; googleCategory: string } {
  const catName = (product.category?.name || product.category?.slug || product.jewelleryType || '').toLowerCase();
  const titleLower = (product.name || product.title || '').toLowerCase();

  if (catName.includes('ring') || titleLower.includes('ring')) {
    return {
      shopifyCategory: 'Apparel & Accessories > Jewelry > Rings',
      type: 'Rings',
      googleCategory: 'Apparel & Accessories > Jewelry > Rings',
    };
  }
  if (catName.includes('bracelet') || titleLower.includes('bracelet') || catName.includes('bangle')) {
    return {
      shopifyCategory: 'Apparel & Accessories > Jewelry > Bracelets',
      type: 'Bracelets',
      googleCategory: 'Apparel & Accessories > Jewelry > Bracelets',
    };
  }
  if (catName.includes('earring') || titleLower.includes('earring') || catName.includes('stud')) {
    return {
      shopifyCategory: 'Apparel & Accessories > Jewelry > Earrings',
      type: 'Earrings',
      googleCategory: 'Apparel & Accessories > Jewelry > Earrings',
    };
  }
  if (catName.includes('necklace') || titleLower.includes('necklace')) {
    return {
      shopifyCategory: 'Apparel & Accessories > Jewelry > Necklaces',
      type: 'Necklaces',
      googleCategory: 'Apparel & Accessories > Jewelry > Necklaces',
    };
  }
  if (catName.includes('pendant') || titleLower.includes('pendant')) {
    return {
      shopifyCategory: 'Apparel & Accessories > Jewelry > Pendants & Charms',
      type: 'Pendants',
      googleCategory: 'Apparel & Accessories > Jewelry > Pendants & Charms',
    };
  }

  return {
    shopifyCategory: 'Apparel & Accessories > Jewelry',
    type: 'Fine Jewelry',
    googleCategory: 'Apparel & Accessories > Jewelry',
  };
}

function getAllImageUrls(product: Product, siteUrl: string): string[] {
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

function cleanHtmlDescription(product: Product): string {
  const parts: string[] = [];
  if (product.fullDescription) {
    parts.push(product.fullDescription.trim());
  } else if (product.shortDescription) {
    parts.push(product.shortDescription.trim());
  }

  if (product.specifications) {
    parts.push('<p><strong>Specifications:</strong> ' + product.specifications.trim() + '</p>');
  }
  if (product.careInstructions) {
    parts.push('<p><strong>Care Instructions:</strong> ' + product.careInstructions.trim() + '</p>');
  }

  return parts.join('\n\n') || (product.name || 'Fine luxury jewellery piece handcrafted by Floksy Jewel.');
}

function generateTags(product: Product): string {
  const tags: string[] = ['Fine Jewelry', 'Floksy Jewel', 'Luxury'];

  if (product.category?.name) tags.push(product.category.name);
  if (product.jewelleryType) tags.push(product.jewelleryType);
  if (product.diamondType) tags.push(product.diamondType);
  if (product.metal) tags.push(product.metal);
  if (product.goldPurity) tags.push(product.goldPurity);
  if (product.shape) tags.push(product.shape + ' Cut');
  if (product.certification) tags.push(product.certification + ' Certified');
  if (product.ringStyle) tags.push(product.ringStyle);
  if (product.onSale || product.salePrice) tags.push('Sale');
  if (product.isNewArrival) tags.push('New Arrival');
  if (product.isBestseller) tags.push('Bestseller');

  if (Array.isArray(product.internalTags)) {
    tags.push(...product.internalTags);
  }

  return Array.from(new Set(tags.map(t => t.trim()).filter(Boolean))).join(', ');
}

export function buildShopifyExportRows(products: Product[], options: ExportShopifyOptions = {}): any[][] {
  const siteUrl = options.siteUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://floksyjewel.com');
  const vendor = options.vendor || 'Floksy Jewel';

  const rows: any[][] = [];

  for (const product of products) {
    const cat = getCategoryInfo(product);
    const title = product.name || product.title || 'Floksy Jewel Item';
    const handle = product.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const description = cleanHtmlDescription(product);
    const tags = generateTags(product);
    const status = product.status === 'ACTIVE' ? 'Active' : 'Draft';
    const images = getAllImageUrls(product, siteUrl);
    const seoTitle = (product as any).metaTitle || (product as any).seoSocial?.ogTitle || title;
    const seoDesc = (product as any).metaDescription || (product as any).seoSocial?.ogDescription || (product.shortDescription || '').replace(/<[^>]*>?/gm, '');

    // Get active variations
    let vars = Array.isArray(product.variations) ? product.variations : [];
    // Filter out silver from variations
    vars = vars.filter((v: any) => {
      const m = String(v.metal || '').toLowerCase();
      return !m.includes('silver') && !m.includes('ag');
    });

    const hasRingSizes = vars.some((v: any) => Boolean(v.ringSize));

    const defaultPrice = product.salePrice || product.price || 2500;
    const comparePrice = product.comparePrice || (product.salePrice ? product.price : '');
    const baseSku = product.sku || ('FJ-' + (product.id ? product.id.substring(0, 8).toUpperCase() : 'PROD'));

    // Color pattern metafield string
    const colorPattern = 'White Gold; Yellow Gold; Rose Gold';

    if (vars.length > 0) {
      // Multiple variations
      vars.forEach((v: any, vIdx: number) => {
        const isFirstRow = vIdx === 0;
        const varSku = v.sku || (baseSku + '-' + (vIdx + 1));
        const varPrice = v.price || defaultPrice;
        const metalVal = v.metal || '14K Yellow Gold';
        const sizeVal = v.ringSize || (hasRingSizes ? 'US 7' : '');

        const imgUrl = isFirstRow ? (images[0] || '') : (images[vIdx] || '');

        const row = [
          isFirstRow ? title : '',
          handle,
          isFirstRow ? description : '',
          isFirstRow ? vendor : '',
          isFirstRow ? cat.shopifyCategory : '',
          isFirstRow ? cat.type : '',
          isFirstRow ? tags : '',
          isFirstRow ? 'TRUE' : '',
          isFirstRow ? status : '',
          varSku,
          '', // Barcode
          isFirstRow ? 'Metal' : '',
          metalVal,
          '',
          isFirstRow ? (hasRingSizes ? 'Ring Size' : '') : '',
          hasRingSizes ? sizeVal : '',
          '',
          '', // Option3 name
          '', // Option3 value
          '',
          varPrice,
          comparePrice || '',
          '', // Cost per item
          'TRUE', // Charge tax
          '', // Tax code
          '', '', '', '', // Unit price measures
          'shopify', // Inventory tracker
          v.stockQuantity !== undefined ? v.stockQuantity : (product.stockQuantity || 10),
          'DENY', // Continue selling when out of stock
          5, // Weight value (grams)
          'g', // Weight unit
          'TRUE', // Requires shipping
          'manual', // Fulfillment service
          imgUrl,
          isFirstRow ? 1 : (imgUrl ? (vIdx + 1) : ''),
          isFirstRow ? title : '',
          imgUrl, // Variant image URL
          'FALSE', // Gift card
          isFirstRow ? seoTitle : '',
          isFirstRow ? seoDesc : '',
          isFirstRow ? colorPattern : '',
          isFirstRow ? cat.googleCategory : '',
          isFirstRow ? 'Unisex' : '',
          isFirstRow ? 'Adult (13+ years old)' : '',
          varSku, // MPN
          isFirstRow ? cat.type : '',
          isFirstRow ? 'Fine Jewelry, Lab Grown Diamond' : '',
          isFirstRow ? 'New' : '',
          isFirstRow ? 'FALSE' : '',
          isFirstRow ? 'Floksy Jewel Atelier' : '',
          '', '', '', '',
        ];

        rows.push(row);
      });

      // If there are more images than variations, add extra image rows
      if (images.length > vars.length) {
        for (let i = vars.length; i < images.length; i++) {
          const extraImgRow = new Array(57).fill('');
          extraImgRow[1] = handle; // URL handle
          extraImgRow[36] = images[i]; // Product image URL
          extraImgRow[37] = i + 1; // Image position
          extraImgRow[38] = title + ' - Photo ' + (i + 1); // Alt text
          rows.push(extraImgRow);
        }
      }
    } else {
      // Single product (no variations table rows)
      const row = [
        title,
        handle,
        description,
        vendor,
        cat.shopifyCategory,
        cat.type,
        tags,
        'TRUE',
        status,
        baseSku,
        '', // Barcode
        'Title', // Option1 name
        'Default Title', // Option1 value
        '',
        '', '', '', '', '', '', // Option2 & 3
        defaultPrice,
        comparePrice || '',
        '',
        'TRUE',
        '',
        '', '', '', '',
        'shopify',
        product.stockQuantity || 10,
        'DENY',
        5,
        'g',
        'TRUE',
        'manual',
        images[0] || '',
        1,
        title,
        images[0] || '',
        'FALSE',
        seoTitle,
        seoDesc,
        colorPattern,
        cat.googleCategory,
        'Unisex',
        'Adult (13+ years old)',
        baseSku,
        cat.type,
        'Fine Jewelry, Lab Grown Diamond',
        'New',
        'FALSE',
        'Floksy Jewel Atelier',
        '', '', '', '',
      ];
      rows.push(row);

      // Add extra gallery images as separate image rows
      for (let i = 1; i < images.length; i++) {
        const extraImgRow = new Array(57).fill('');
        extraImgRow[1] = handle;
        extraImgRow[36] = images[i];
        extraImgRow[37] = i + 1;
        extraImgRow[38] = title + ' - Photo ' + (i + 1);
        rows.push(extraImgRow);
      }
    }
  }

  return rows;
}

export function exportProductsToShopifyCsv(products: Product[], options: ExportShopifyOptions = {}) {
  const dataRows = buildShopifyExportRows(products, options);
  const dateStr = new Date().toISOString().split('T')[0];
  const outFileName = options.fileName || ('Shopify_Products_Export_' + dateStr + '.csv');

  const allRows = [SHOPIFY_HEADERS, ...dataRows];
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

export function exportProductsToShopifyExcel(products: Product[], options: ExportShopifyOptions = {}) {
  const dataRows = buildShopifyExportRows(products, options);
  const dateStr = new Date().toISOString().split('T')[0];
  const outFileName = options.fileName || ('Shopify_Products_Export_' + dateStr + '.xlsx');

  const allRows = [SHOPIFY_HEADERS, ...dataRows];
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(allRows);
  XLSX.utils.book_append_sheet(wb, ws, 'Products');

  XLSX.writeFile(wb, outFileName);
  return { success: true, count: products.length, fileName: outFileName, rowCount: dataRows.length };
}
