import { Response } from 'express';
import XLSX from 'xlsx';
import JSZip from 'jszip';
import path from 'path';
import fs from 'fs';
import { AuthRequest } from '../middleware/auth';
import prisma from '../prisma';

const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// 1. DOWNLOAD SAMPLE 7-SHEET EXCEL TEMPLATE
export const downloadProductImportTemplate = (req: AuthRequest, res: Response) => {
  try {
    const wb = XLSX.utils.book_new();

    // Sheet 1: Products
    const productsHeaders = [
      'product_name',
      'sku',
      'slug',
      'jewelry_type',
      'category',
      'status',
      'description',
      'seo_title',
      'meta_description',
    ];
    const productsSample = [
      'Aura Signature Solitaire Ring',
      'AD-DEMO-001',
      'aura-signature-solitaire-ring',
      'Ring',
      'Rings',
      'Draft',
      'A luxury Aura Diamond Atelier solitaire engagement ring designed with customizable options.',
      'Aura Signature Solitaire Ring | Luxury Diamond Ring',
      'Luxury customizable solitaire diamond ring.',
    ];
    const wsProducts = XLSX.utils.aoa_to_sheet([productsHeaders, productsSample]);

    // Sheet 2: Diamond Options
    const diamondsHeaders = [
      'sku',
      'shape',
      'carat',
      'color',
      'clarity',
      'lab',
      'cut',
      'polish',
      'symmetry',
      'fluorescence',
    ];
    const diamondsSamples = [
      ['AD-DEMO-001', 'Round', 1.0, 'E', 'VS1', 'IGI', 'Excellent', 'Excellent', 'Excellent', 'None'],
      ['AD-DEMO-001', 'Oval', 2.0, 'E', 'VS1', 'IGI', 'Excellent', 'Excellent', 'Excellent', 'None'],
      ['AD-DEMO-001', 'Emerald', 4.0, 'D', 'VVS1', 'GIA', 'Excellent', 'Excellent', 'Excellent', 'None'],
    ];
    const wsDiamonds = XLSX.utils.aoa_to_sheet([diamondsHeaders, ...diamondsSamples]);

    // Sheet 3: Metal Options
    const metalsHeaders = ['sku', 'metal_name', 'metal_code', 'price_adjustment'];
    const metalsSamples = [
      ['AD-DEMO-001', '14K Yellow Gold', '14KY', 0],
      ['AD-DEMO-001', '14K White Gold', '14KW', 100],
      ['AD-DEMO-001', '14K Rose Gold', '14KR', 100],
      ['AD-DEMO-001', '18K Yellow Gold', '18KY', 500],
      ['AD-DEMO-001', '18K White Gold', '18KW', 600],
      ['AD-DEMO-001', '18K Rose Gold', '18KR', 600],
      ['AD-DEMO-001', 'Silver', 'Ag', 0],
    ];
    const wsMetals = XLSX.utils.aoa_to_sheet([metalsHeaders, ...metalsSamples]);

    // Sheet 4: Ring Sizes
    const sizesHeaders = ['sku', 'ring_size', 'price_adjustment'];
    const sizesSamples = [
      ['AD-DEMO-001', 'US 4', 0],
      ['AD-DEMO-001', 'US 5', 0],
      ['AD-DEMO-001', 'US 6', 0],
      ['AD-DEMO-001', 'US 7', 0],
      ['AD-DEMO-001', 'US 8', 0],
      ['AD-DEMO-001', 'US 9', 0],
    ];
    const wsSizes = XLSX.utils.aoa_to_sheet([sizesHeaders, ...sizesSamples]);

    // Sheet 5: Custom Options
    const customHeaders = [
      'sku',
      'option_label',
      'field_type',
      'required',
      'choice_label',
      'price_adjustment',
      'placeholder',
    ];
    const customSamples = [
      ['AD-DEMO-001', 'Initials', 'Dropdown', 'No', 'V', 0, ''],
      ['AD-DEMO-001', 'Initials', 'Dropdown', 'No', 'R', 0, ''],
      ['AD-DEMO-001', 'Initials', 'Dropdown', 'No', 'Z', 25, ''],
      ['AD-DEMO-001', 'Engraving', 'Text Input', 'No', '', 50, 'Enter your engraving'],
      ['AD-DEMO-001', 'Gift Packaging', 'Checkbox', 'No', 'Luxury Box', 35, ''],
    ];
    const wsCustom = XLSX.utils.aoa_to_sheet([customHeaders, ...customSamples]);

    // Sheet 6: Accordions
    const accordionsHeaders = ['sku', 'section_title', 'content', 'display_order'];
    const accordionsSamples = [
      ['AD-DEMO-001', 'YOUR ATELIER EXPERIENCE', 'Every creation is handcrafted in our master atelier using certified conflict-free diamonds.', 1],
      ['AD-DEMO-001', 'PRODUCT & DIAMOND SPECIFICATIONS', 'Hand-set by master artisans under 40x microscopic precision.', 2],
      ['AD-DEMO-001', 'CRAFTSMANSHIP & SUSTAINABILITY', 'Sustainably crafted with 100% recycled 18K gold and Silver.', 3],
      ['AD-DEMO-001', 'SHIPPING & RETURNS', 'Dispatched via fully insured FedEx Priority Air.', 4],
    ];
    const wsAccordions = XLSX.utils.aoa_to_sheet([accordionsHeaders, ...accordionsSamples]);

    // Sheet 7: Instructions
    const instructions = [
      ['AURA DIAMOND ATELIER — BULK PRODUCT IMPORT INSTRUCTIONS'],
      [''],
      ['1. Products Sheet:', 'Define basic product details (product_name, sku, category, jewelry_type, status, etc.).'],
      ['2. Diamond Options Sheet:', 'Define diamond options by SKU (shape, carat, color, clarity, cut, lab). Unlimited carats allowed.'],
      ['3. Metal Options Sheet:', 'Define metal options by SKU (metal_name, metal_code, price_adjustment).'],
      ['4. Ring Sizes Sheet:', 'Define available ring sizes by SKU. Applicable ONLY when jewelry_type is Ring!'],
      ['5. Custom Options Sheet:', 'Define personalization choices (Initials, Engraving, Gift Packaging) with field types & price adjustments.'],
      ['6. Accordions Sheet:', 'Define collapsible information tabs by SKU.'],
      ['7. Media Uploads:', 'Images do NOT need to be in Excel. Upload images via Admin -> Edit Product -> Media or Media ZIP file.'],
    ];
    const wsInstructions = XLSX.utils.aoa_to_sheet(instructions);

    XLSX.utils.book_append_sheet(wb, wsProducts, 'Products');
    XLSX.utils.book_append_sheet(wb, wsDiamonds, 'Diamond Options');
    XLSX.utils.book_append_sheet(wb, wsMetals, 'Metal Options');
    XLSX.utils.book_append_sheet(wb, wsSizes, 'Ring Sizes');
    XLSX.utils.book_append_sheet(wb, wsCustom, 'Custom Options');
    XLSX.utils.book_append_sheet(wb, wsAccordions, 'Accordions');
    XLSX.utils.book_append_sheet(wb, wsInstructions, 'Instructions');

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="aura-product-import-template.xlsx"');
    res.send(buffer);
  } catch (error: any) {
    console.error('downloadProductImportTemplate error:', error);
    res.status(500).json({ message: `Excel template generation failed: ${error.message}` });
  }
};

// Helper: Parse Zip Media Files
const parseMediaZip = async (zipBuffer: Buffer): Promise<Map<string, { filename: string; buffer: Buffer }>> => {
  const mediaMap = new Map<string, { filename: string; buffer: Buffer }>();
  if (!zipBuffer || zipBuffer.length === 0) return mediaMap;

  const zip = await JSZip.loadAsync(zipBuffer);
  for (const relativePath of Object.keys(zip.files)) {
    const file = zip.files[relativePath];
    if (file.dir) continue;
    const baseName = path.basename(relativePath);
    if (baseName.startsWith('.') || baseName.startsWith('__MACOSX')) continue;
    const fileBuffer = await file.async('nodebuffer');
    mediaMap.set(baseName.toLowerCase(), { filename: baseName, buffer: fileBuffer });
  }
  return mediaMap;
};

// Helper: Metal option builder from string
const mapMetalStringToConfig = (metalStr: string) => {
  const s = metalStr.trim();
  if (s.includes('14K Yellow')) return { label: s, code: '14KY', priceAdjustment: 100 };
  if (s.includes('14K White')) return { label: s, code: '14KW', priceAdjustment: 100 };
  if (s.includes('14K Rose')) return { label: s, code: '14KR', priceAdjustment: 100 };
  if (s.includes('18K Yellow')) return { label: s, code: '18KY', priceAdjustment: 300 };
  if (s.includes('18K White')) return { label: s, code: '18KW', priceAdjustment: 300 };
  if (s.includes('18K Rose')) return { label: s, code: '18KR', priceAdjustment: 300 };
  if (s.includes('10K')) return { label: s, code: '10K', priceAdjustment: 0 };
  if (s.includes('Silver') || s.includes('925')) return { label: s, code: 'Ag', priceAdjustment: 0 };
  if (s.includes('Platinum')) return { label: s, code: 'Pt', priceAdjustment: 500 };
  return { label: s, code: s.substring(0, 6), priceAdjustment: 0 };
};

// Helper: Infer Category & Jewellery Type from Title
const inferCategoryFromTitle = (title: string): { categoryName: string; jewelryType: string } => {
  const t = title.toLowerCase();
  if (t.includes('wedding band') || t.includes('wedding ring')) return { categoryName: 'Wedding Bands', jewelryType: 'Ring' };
  if (t.includes('engagement ring') || t.includes('solitaire') || t.includes('bridal')) return { categoryName: 'Engagement Rings', jewelryType: 'Ring' };
  if (t.includes('earring') || t.includes('stud')) return { categoryName: 'Earrings', jewelryType: 'Earrings' };
  if (t.includes('necklace') || t.includes('pendant') || t.includes('chain')) return { categoryName: 'Necklaces', jewelryType: 'Necklace' };
  if (t.includes('bangle') || t.includes('bracelet')) return { categoryName: 'Bracelets', jewelryType: 'Bracelet' };
  if (t.includes('ring')) return { categoryName: 'Rings', jewelryType: 'Ring' };
  return { categoryName: 'Rings', jewelryType: 'Ring' };
};

// Universal Parser for Excel 7-Sheet vs Etsy CSV / Single-Sheet CSV
const parseUploadedProductWorkbook = async (buffer: Buffer, mode: string, zipBuffer?: Buffer) => {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  let mediaMap = new Map<string, any>();
  if (zipBuffer) {
    mediaMap = await parseMediaZip(zipBuffer);
  }

  const getSheetData = (name: string) => {
    const sheetName = workbook.SheetNames.find((s) => s.toLowerCase() === name.toLowerCase());
    if (!sheetName) return [];
    return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });
  };

  const rawProducts = getSheetData('Products');
  const rawDiamonds = getSheetData('Diamond Options');
  const rawMetals = getSheetData('Metal Options');
  const rawSizes = getSheetData('Ring Sizes');
  const rawCustom = getSheetData('Custom Options');
  const rawAccordions = getSheetData('Accordions');

  const products: any[] = [];
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Check if 7-Sheet Excel format
  if (rawProducts.length > 0) {
    for (let i = 0; i < rawProducts.length; i++) {
      const row: any = rawProducts[i];
      const rowNum = i + 2;
      const name = String(row.product_name || row['Product Name'] || '').trim();
      const sku = String(row.sku || row['SKU'] || '').trim();
      if (!name || !sku) {
        errors.push(`Row ${rowNum}: Product Name and SKU are required.`);
        continue;
      }
      const existingProduct = await prisma.product.findUnique({ where: { sku } });
      let isValid = true;
      const rowErrors: string[] = [];
      if (mode === 'CREATE_NEW' && existingProduct) {
        isValid = false;
        rowErrors.push(`Product with SKU "${sku}" already exists.`);
        errors.push(`Row ${rowNum}: SKU "${sku}" already exists.`);
      }

      const productDiamonds = rawDiamonds.filter((d: any) => String(d.sku || d.SKU || '').trim().toLowerCase() === sku.toLowerCase());
      const productMetals = rawMetals.filter((m: any) => String(m.sku || m.SKU || '').trim().toLowerCase() === sku.toLowerCase());
      const productSizes = rawSizes.filter((s: any) => String(s.sku || s.SKU || '').trim().toLowerCase() === sku.toLowerCase());

      products.push({
        rowNum,
        name,
        sku,
        slug: String(row.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')),
        categoryName: String(row.category || row['Category'] || 'Rings').trim(),
        jewelryType: String(row.jewelry_type || row['Jewelry Type'] || 'Ring').trim(),
        status: String(row.status || row['Status'] || 'DRAFT').toUpperCase(),
        shortDescription: String(row.description || ''),
        fullDescription: String(row.description || ''),
        price: parseFloat(row.price || 5000),
        currency: 'USD',
        stockQuantity: 10,
        seoTitle: String(row.seo_title || `${name} | Aura Diamond Atelier`),
        metaDescription: String(row.meta_description || ''),
        metaKeywords: '',
        mainImage: '',
        secondaryImage: null,
        images: [],
        enableRingSize: productSizes.length > 0,
        availableRingSizes: productSizes.map((s: any) => String(s.ring_size || '')),
        enableMetalSelection: productMetals.length > 0,
        metalsConfig: productMetals.map((m: any) => ({
          label: m.metal_name || '18K Yellow Gold',
          code: m.metal_code || '18k',
          priceAdjustment: parseFloat(m.price_adjustment || 0),
        })),
        enableCustomOptions: false,
        customOptionsJson: [],
        diamondsConfig: [],
        accordionsConfig: [],
        isValid,
        errors: rowErrors,
        warnings: [],
      });
    }
  } else {
    // 2. Parse Single Sheet (Etsy Listing Download CSV or Single-Sheet Product File)
    const firstSheetName = workbook.SheetNames[0];
    if (!firstSheetName) {
      throw new Error('The uploaded CSV/Excel file is completely empty.');
    }

    const firstSheetData: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], { defval: '' });
    if (firstSheetData.length === 0) {
      throw new Error('No data rows found in the CSV/Excel sheet.');
    }

    for (let i = 0; i < firstSheetData.length; i++) {
      const row: any = firstSheetData[i];
      const rowNum = i + 2;

      // Detect fields (Etsy headers vs standard CSV)
      const title = String(row.TITLE || row.Title || row.product_name || row['Product Name'] || row.name || '').trim();
      let sku = String(row.SKU || row.sku || row['Stock ID'] || '').trim();
      const rawPrice = String(row.PRICE || row.Price || row.price || '5000').trim();
      const price = parseFloat(rawPrice) || 5000;
      const currency = String(row.CURRENCY_CODE || row['Currency Code'] || 'USD').trim();
      const quantity = parseInt(String(row.QUANTITY || row.Quantity || '10'), 10) || 10;
      const description = String(row.DESCRIPTION || row.Description || row.description || '').trim();
      const tags = String(row.TAGS || row.Tags || row.tags || '').trim();
      const materialsStr = String(row.MATERIALS || row.Materials || row.materials || '').trim();

      if (!title) {
        errors.push(`Row ${rowNum}: TITLE / Product Name is required.`);
        continue;
      }
      if (!sku) {
        sku = `FJ-ETSY-${Date.now()}-${i + 1}`;
      }

      // Check existing SKU
      const existingProduct = await prisma.product.findUnique({ where: { sku } });
      let isValid = true;
      const rowErrors: string[] = [];
      const rowWarnings: string[] = [];

      if (mode === 'CREATE_NEW' && existingProduct) {
        isValid = false;
        rowErrors.push(`Product with SKU "${sku}" already exists in database.`);
        errors.push(`Row ${rowNum}: SKU "${sku}" already exists.`);
      }

      // Collect Images (IMAGE1 .. IMAGE10)
      const images: string[] = [];
      for (let imgIdx = 1; imgIdx <= 10; imgIdx++) {
        const imgKey = `IMAGE${imgIdx}`;
        const imgVal = String(row[imgKey] || row[imgKey.toLowerCase()] || row[`Image ${imgIdx}`] || '').trim();
        if (imgVal) {
          images.push(imgVal);
        }
      }

      // Match images from ZIP if provided
      if (mediaMap.size > 0) {
        for (const [key, media] of mediaMap.entries()) {
          if (key.includes(sku.toLowerCase())) {
            const ext = path.extname(media.filename);
            const savedName = `bulk_${sku}_${Date.now()}_${Math.floor(Math.random() * 1000)}${ext}`;
            const targetPath = path.join(UPLOADS_DIR, savedName);
            fs.writeFileSync(targetPath, media.buffer);
            images.push(`/uploads/${savedName}`);
          }
        }
      }

      const mainImage = images[0] || '/assets/gem_diamonds_cat.png';
      const secondaryImage = images[1] || null;

      // Extract Variations (VARIATION 1 & VARIATION 2)
      let enableRingSize = false;
      let availableRingSizes: string[] = [];
      let enableMetalSelection = false;
      let metalsConfig: any[] = [];
      let enableCustomOptions = false;
      const customOptionsJson: any[] = [];

      const v1Type = String(row['VARIATION 1 TYPE'] || row['Variation 1 Type'] || '').trim();
      const v1Name = String(row['VARIATION 1 NAME'] || row['Variation 1 Name'] || '').trim();
      const v1ValsStr = String(row['VARIATION 1 VALUES'] || row['Variation 1 Values'] || '').trim();

      const v2Type = String(row['VARIATION 2 TYPE'] || row['Variation 2 Type'] || '').trim();
      const v2Name = String(row['VARIATION 2 NAME'] || row['Variation 2 Name'] || '').trim();
      const v2ValsStr = String(row['VARIATION 2 VALUES'] || row['Variation 2 Values'] || '').trim();

      const variationBlocks = [
        { name: v1Name || v1Type, vals: v1ValsStr.split(',').map((v) => v.trim()).filter(Boolean) },
        { name: v2Name || v2Type, vals: v2ValsStr.split(',').map((v) => v.trim()).filter(Boolean) },
      ];

      for (const block of variationBlocks) {
        if (!block.name || block.vals.length === 0) continue;
        const bNameLower = block.name.toLowerCase();

        if (bNameLower.includes('size') || bNameLower.includes('ring')) {
          enableRingSize = true;
          availableRingSizes = Array.from(new Set([...availableRingSizes, ...block.vals]));
        } else if (bNameLower.includes('metal') || bNameLower.includes('color') || bNameLower.includes('gold') || bNameLower.includes('silver')) {
          enableMetalSelection = true;
          const mappedMetals = block.vals.map(mapMetalStringToConfig);
          metalsConfig = Array.from(new Set([...metalsConfig, ...mappedMetals]));
        } else {
          enableCustomOptions = true;
          customOptionsJson.push({
            id: `opt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            label: block.name,
            fieldType: 'Dropdown',
            required: false,
            placeholder: `Select ${block.name}`,
            priceAdjustment: 0,
            values: block.vals.map((v) => ({ label: v, value: v, priceAdjustment: 0 })),
          });
        }
      }

      // Default Ring Sizes if Ring and none found
      const inferred = inferCategoryFromTitle(title);
      if (inferred.jewelryType === 'Ring' && availableRingSizes.length === 0) {
        enableRingSize = true;
        availableRingSizes = ['US 3', 'US 4', 'US 5', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'];
      }

      // Default Metals if none found
      if (metalsConfig.length === 0) {
        enableMetalSelection = true;
        metalsConfig = [
          { label: '925 Sterling Silver', code: 'Ag', priceAdjustment: 0 },
          { label: '10K Yellow Gold', code: '10KY', priceAdjustment: 0 },
          { label: '14K Yellow Gold', code: '14KY', priceAdjustment: 100 },
          { label: '18K Yellow Gold', code: '18KY', priceAdjustment: 300 },
        ];
      }

      products.push({
        rowNum,
        name: title,
        sku,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
        categoryName: inferred.categoryName,
        jewelryType: inferred.jewelryType,
        status: 'ACTIVE',
        shortDescription: description,
        fullDescription: description,
        price,
        currency,
        stockQuantity: quantity,
        seoTitle: `${title} | Aura Diamond Atelier`,
        metaDescription: description.substring(0, 160),
        metaKeywords: tags || materialsStr,
        mainImage,
        secondaryImage,
        images,
        enableRingSize,
        availableRingSizes,
        enableMetalSelection,
        metalsConfig,
        enableCustomOptions,
        customOptionsJson,
        diamondsConfig: [],
        accordionsConfig: [
          { id: 'exp', title: 'YOUR ATELIER EXPERIENCE', content: 'Every creation is handcrafted in our master atelier using certified conflict-free diamonds.' },
          { id: 'ship', title: 'SHIPPING & RETURNS', content: 'Dispatched via fully insured FedEx Priority Air.' },
        ],
        isValid,
        errors: rowErrors,
        warnings: rowWarnings,
      });
    }
  }

  return {
    products,
    summary: {
      totalProducts: products.length,
      mediaFilesFound: mediaMap.size,
    },
    errors,
    warnings,
  };
};

// 2. VALIDATE EXCEL / CSV WORKBOOK & MEDIA PACKAGE
export const validateProductBulkUpload = async (req: AuthRequest, res: Response) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const excelFile = files?.['excel']?.[0] || files?.['file']?.[0] || files?.['excelFile']?.[0];
    const zipFile = files?.['mediaZip']?.[0] || files?.['zip']?.[0];
    const mode = req.body?.mode || req.body?.importMode || 'CREATE_NEW';

    if (!excelFile) {
      return res.status(400).json({ message: 'No Excel (.xlsx) or CSV file uploaded.' });
    }

    const { products, summary, errors, warnings } = await parseUploadedProductWorkbook(excelFile.buffer, mode, zipFile?.buffer);

    res.json({
      isValid: errors.length === 0,
      totalRows: products.length,
      validRows: products.filter((p) => p.isValid).length,
      errorRows: products.filter((p) => !p.isValid).length,
      warningRows: products.filter((p) => p.warnings.length > 0).length,
      summary,
      errors,
      warnings,
      products,
      preview: products.map((p) => ({
        rowNum: p.rowNum,
        name: p.name,
        sku: p.sku,
        category: p.categoryName,
        jewelleryType: p.jewelryType,
        metal: p.metalsConfig?.map((m: any) => m.label || m).slice(0, 2).join(', ') || 'Standard',
        shape: 'Round/Custom',
        carat: 1.0,
        price: p.price,
        status: p.status,
        isValid: p.isValid,
        errors: p.errors,
        warnings: p.warnings,
      })),
    });
  } catch (error: any) {
    console.error('validateProductBulkUpload error:', error);
    res.status(500).json({ message: `Validation failed: ${error.message}` });
  }
};

// 3. EXECUTE BULK IMPORT TO DATABASE
export const executeProductBulkUpload = async (req: AuthRequest, res: Response) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const excelFile = files?.['excel']?.[0] || files?.['file']?.[0] || files?.['excelFile']?.[0];
    const zipFile = files?.['mediaZip']?.[0] || files?.['zip']?.[0];
    const mode = req.body?.mode || req.body?.importMode || 'CREATE_NEW';

    if (!excelFile) {
      return res.status(400).json({ message: 'No Excel (.xlsx) or CSV file uploaded for import.' });
    }

    const { products } = await parseUploadedProductWorkbook(excelFile.buffer, mode, zipFile?.buffer);

    let createdCount = 0;
    let updatedCount = 0;
    let failedCount = 0;
    let imagesUploaded = 0;

    for (const p of products) {
      if (!p.isValid) {
        failedCount++;
        continue;
      }

      // Ensure Category exists
      let cat = await prisma.category.findFirst({
        where: { OR: [{ slug: p.categoryName.toLowerCase() }, { name: p.categoryName }] },
      });
      if (!cat) {
        cat = await prisma.category.create({
          data: {
            name: p.categoryName,
            slug: p.categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            description: `${p.categoryName} Collection`,
          },
        });
      }

      const productPayload: any = {
        name: p.name,
        sku: p.sku,
        slug: p.slug,
        categoryId: cat.id,
        jewelleryType: p.jewelryType,
        status: p.status,
        shortDescription: p.shortDescription,
        fullDescription: p.fullDescription,
        price: p.price,
        currency: p.currency,
        stockQuantity: p.stockQuantity,
        enableRingSize: p.enableRingSize,
        availableRingSizes: JSON.stringify(p.availableRingSizes),
        enableMetalSelection: p.enableMetalSelection,
        metalsConfig: JSON.stringify(p.metalsConfig),
        enableDiamondSelection: p.diamondsConfig.length > 0,
        enableDiamondShape: p.diamondsConfig.length > 0,
        diamondsConfig: JSON.stringify(p.diamondsConfig),
        enableCustomOptions: p.enableCustomOptions,
        customOptionsJson: JSON.stringify(p.customOptionsJson),
        accordionsConfig: JSON.stringify(p.accordionsConfig),
        metaTitle: p.seoTitle,
        metaDescription: p.metaDescription,
        metaKeywords: p.metaKeywords,
        mainImage: p.mainImage,
        secondaryImage: p.secondaryImage,
      };

      const existing = await prisma.product.findUnique({ where: { sku: p.sku } });
      let savedProdId: string;

      if (existing) {
        const updated = await prisma.product.update({
          where: { id: existing.id },
          data: productPayload,
        });
        savedProdId = updated.id;
        updatedCount++;
      } else {
        const newProduct = await prisma.product.create({
          data: productPayload,
        });
        savedProdId = newProduct.id;
        createdCount++;
      }

      // Attach Product Gallery Images
      if (p.images && p.images.length > 0) {
        await prisma.productImage.deleteMany({ where: { productId: savedProdId } });
        await prisma.productImage.createMany({
          data: p.images.map((url: string, pos: number) => ({
            productId: savedProdId,
            url,
            position: pos + 1,
          })),
        });
        imagesUploaded += p.images.length;
      }
    }

    res.json({
      success: true,
      message: `Bulk import transaction complete! Processed: ${products.length}, Created: ${createdCount}, Updated: ${updatedCount}, Failed: ${failedCount}.`,
      processed: products.length,
      created: createdCount,
      updated: updatedCount,
      skipped: 0,
      failed: failedCount,
      imagesUploaded,
      videosUploaded: 0,
    });
  } catch (error: any) {
    console.error('executeProductBulkUpload error:', error);
    res.status(500).json({ message: `Import failed: ${error.message}` });
  }
};

export const downloadBulkImportErrorReport = (req: AuthRequest, res: Response) => {
  res.status(404).json({ message: 'No import errors reported.' });
};

import { uploadMediaFiles } from './mediaController';
export const uploadMediaFromPc = uploadMediaFiles;

