import { Response } from 'express';
import XLSX from 'xlsx';
import JSZip from 'jszip';
import { AuthRequest } from '../middleware/auth';
import prisma from '../prisma';

export const downloadExcelTemplate = (req: AuthRequest, res: Response) => {
  try {
    const headers = [
      'Diamond ID',
      'Stock ID',
      'SKU',
      'Diamond Type',
      'Shape',
      'Carat',
      'Color',
      'Clarity',
      'Cut',
      'Polish',
      'Symmetry',
      'Fluorescence',
      'Length',
      'Width',
      'Depth',
      'Table %',
      'Depth %',
      'Crown',
      'Pavilion',
      'Girdle',
      'Culet',
      'Lab',
      'Certificate Number',
      'Certificate URL',
      'Price',
      'Currency',
      'Image URL',
      'Video URL',
      'Certificate PDF URL',
      'Status',
    ];

    const sampleRow = [
      'D10099',
      'STK-10099',
      'SKU-10099',
      'NATURAL',
      'Round',
      1.25,
      'E',
      'VS1',
      'Excellent',
      'Excellent',
      'Excellent',
      'None',
      6.85,
      6.88,
      4.22,
      57,
      61.5,
      34.5,
      40.8,
      'Medium',
      'None',
      'GIA',
      'GIA-22019948',
      'https://www.gia.edu',
      4200,
      'USD',
      '/assets/floksy_diamonds_cat.png',
      '',
      '',
      'AVAILABLE',
    ];

    const ws = XLSX.utils.aoa_to_sheet([headers, sampleRow]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Diamonds');

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="Floksy_Jewel_Diamond_Import_Template.xlsx"');
    res.send(buffer);
  } catch (error) {
    console.error('Template download error:', error);
    res.status(500).json({ message: 'Error generating Excel template' });
  }
};

export const parseAndValidateExcel = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rawRows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: '' });

    if (rawRows.length === 0) {
      return res.status(400).json({ message: 'Excel file is empty' });
    }

    const validColors = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
    const validClarities = ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1'];

    const validRows: any[] = [];
    const errors: { row: number; diamondId: string; errors: string[] }[] = [];
    const seenIds = new Set<string>();

    const FANCY_COLOR_NAMES = ['YELLOW', 'GREEN', 'PINK', 'BLUE', 'ORANGE', 'BROWN', 'PURPLE', 'RED', 'BLACK'];

    for (let i = 0; i < rawRows.length; i++) {
      const rawR = rawRows[i];
      const rowNum = i + 2;
      const rowErrors: string[] = [];

      // Clean keys (strip surrounding whitespace from key names)
      const cleanRow: Record<string, any> = {};
      Object.keys(rawR).forEach((k) => {
        cleanRow[k.trim()] = rawR[k];
      });

      const getValue = (...keys: string[]) => {
        for (const key of keys) {
          if (cleanRow[key] !== undefined && cleanRow[key] !== null && String(cleanRow[key]).trim() !== '') {
            return String(cleanRow[key]).trim();
          }
        }
        return '';
      };

      const stockId = getValue('STOCK ID', 'Stock ID', 'stockId', 'STOCK_ID', 'ID');
      const certificateNum = getValue('Certificate', 'Certificate Number', 'certificateNumber', 'Cert #');
      const diamondId = getValue('Diamond ID', 'diamondId') || stockId || (certificateNum ? `CERT-${certificateNum}` : `FL-${Date.now()}-${i}`);

      const shapeRaw = getValue('SHAPE', 'Shape', 'shape');
      const shape = shapeRaw ? shapeRaw.charAt(0).toUpperCase() + shapeRaw.slice(1).toLowerCase() : 'Round';

      const weightRaw = getValue('Weight', 'Carat', 'carat', 'WEIGHT');
      const carat = parseFloat(weightRaw) || 0;

      const pCtRaw = getValue('P/CT', 'P_CT', 'Price/Carat', 'PRICE_CARAT');
      const pricePerCarat = parseFloat(pCtRaw) || null;

      const totalRaw = getValue('Total', 'TOTAL $', 'Total Price', 'Price', 'price', 'TOTAL');
      let price = parseFloat(totalRaw) || 0;
      if (price === 0 && pricePerCarat && carat > 0) {
        price = parseFloat((pricePerCarat * carat).toFixed(2));
      }

      const colorRaw = getValue('Color', 'color');
      const fancyColorRaw = getValue('Fancy Color', 'fancyColor');
      const fancyIntensity = getValue('Fancy Color Intensity', 'fancyIntensity', 'Intensity') || null;

      let color = (colorRaw || 'D').toUpperCase();
      let fancyColor = fancyColorRaw || null;

      if (!fancyColor && FANCY_COLOR_NAMES.includes(color)) {
        fancyColor = color;
        color = 'FANCY';
      } else if (fancyColor && (!color || color === 'FANCY')) {
        color = 'FANCY';
      }

      const clarity = (getValue('Clarity', 'clarity') || 'VS1').toUpperCase();
      const cvdHpht = getValue('CVD/HPHT', 'CVD_HPHT', 'Growth Type', 'Growth', 'Diamond Type', 'diamondType').toUpperCase();
      const growthType = cvdHpht.includes('CVD') ? 'CVD' : cvdHpht.includes('HPHT') ? 'HPHT' : (cvdHpht || 'HPHT');
      const diamondType = (growthType === 'CVD' || growthType === 'HPHT') ? 'LAB_GROWN' : 'NATURAL';

      const lab = getValue('LAB', 'Lab', 'lab') || 'IGI';
      const certUrl = getValue('Cerificate Link', 'Certificate Link', 'Certificate URL', 'certificateUrl', 'Cert Link');
      const imageUrl = getValue('ImageURL', 'Image URL', 'imageUrl', 'IMAGE_URL');
      const videoUrl = getValue('Diamond Video', 'Video URL', 'videoUrl', '360 Video');

      // Measurement & Ratio
      const measurement = getValue('Measurement', 'measurement');
      let length: number | null = parseFloat(getValue('Length', 'length')) || null;
      let width: number | null = parseFloat(getValue('Width', 'width')) || null;
      let depth: number | null = parseFloat(getValue('Depth', 'depth')) || null;

      if (measurement && (!length || !width || !depth)) {
        const parts = measurement.split(/x|\*/i).map((p) => parseFloat(p.trim())).filter((n) => !isNaN(n));
        if (parts.length >= 2) {
          if (!length) length = parts[0];
          if (!width) width = parts[1];
          if (parts.length >= 3 && !depth) depth = parts[2];
        }
      }

      let ratio: number | null = parseFloat(getValue('RATIO', 'Ratio', 'ratio')) || null;
      if (!ratio && length && width && width > 0) {
        ratio = parseFloat((length / width).toFixed(2));
      }

      const depthPercent = parseFloat(getValue('Depth %', 'DepthPercent', 'depthPercent')) || null;
      const tablePercent = parseFloat(getValue('Table %', 'TablePercent', 'tablePercent')) || null;
      const fluorescence = getValue('FLUORESCENCE', 'Fluorescence', 'fluorescence') || 'None';
      const girdle = getValue('GIRDLE', 'Girdle', 'girdle') || null;
      const culet = getValue('CULET', 'Culet', 'culet') || null;
      const cut = getValue('cut', 'Cut') || 'Excellent';
      const polish = getValue('Polish', 'polish') || 'Excellent';
      const symmetry = getValue('Symmetry', 'symmetry') || 'Excellent';

      if (!diamondId) rowErrors.push('Missing Diamond ID');
      if (seenIds.has(diamondId)) rowErrors.push(`Duplicate Diamond ID "${diamondId}" in file`);
      if (diamondId) seenIds.add(diamondId);

      if (!shape) rowErrors.push('Missing Shape');
      if (isNaN(carat) || carat <= 0) rowErrors.push('Invalid Carat (must be > 0)');
      if (isNaN(price) || price <= 0) rowErrors.push('Invalid Price (must be > 0)');

      if (rowErrors.length > 0) {
        errors.push({ row: rowNum, diamondId: diamondId || 'N/A', errors: rowErrors });
      } else {
        validRows.push({
          diamondId,
          stockId: stockId || null,
          sku: getValue('SKU', 'sku') || stockId || null,
          diamondType,
          growthType,
          shape,
          carat,
          color,
          clarity,
          cut,
          polish,
          symmetry,
          fluorescence,
          length,
          width,
          depth,
          ratio,
          tablePercent,
          depthPercent,
          girdle,
          culet,
          lab,
          certificateNumber: certificateNum || null,
          certificateUrl: certUrl || null,
          price,
          pricePerCarat,
          currency: getValue('Currency', 'currency') || 'USD',
          status: (getValue('Status', 'status') || 'AVAILABLE').toUpperCase(),
          fancyColor,
          fancyIntensity,
          imageUrl: imageUrl || null,
          videoUrl: videoUrl || null,
        });
      }
    }

    res.json({
      totalRows: rawRows.length,
      validCount: validRows.length,
      failedCount: errors.length,
      validRowsPreview: validRows.slice(0, 10),
      errors,
      validatedPayload: validRows,
    });
  } catch (error) {
    console.error('Excel parse error:', error);
    res.status(500).json({ message: 'Error processing Excel file' });
  }
};

export const executeDiamondImport = async (req: AuthRequest, res: Response) => {
  try {
    const { diamonds, mode = 'UPSERT' } = req.body;

    if (!Array.isArray(diamonds) || diamonds.length === 0) {
      return res.status(400).json({ message: 'No valid diamond records provided' });
    }

    let importedCount = 0;
    let updatedCount = 0;
    let failedCount = 0;

    for (const d of diamonds) {
      try {
        const existing = await prisma.diamond.findUnique({ where: { diamondId: d.diamondId } });

        if (existing) {
          if (mode === 'ADD_ONLY') {
            failedCount++;
            continue;
          }
          await prisma.diamond.update({
            where: { diamondId: d.diamondId },
            data: d,
          });
          updatedCount++;
        } else {
          if (mode === 'UPDATE_ONLY') {
            failedCount++;
            continue;
          }
          await prisma.diamond.create({ data: d });
          importedCount++;
        }
      } catch (err) {
        failedCount++;
      }
    }

    await prisma.diamondImportHistory.create({
      data: {
        fileName: req.body.fileName || 'Excel_Import.xlsx',
        totalRows: diamonds.length,
        importedCount,
        updatedCount,
        failedCount,
        importedBy: req.user?.email || 'Admin',
      },
    });

    res.json({
      message: 'Diamond import executed successfully',
      summary: {
        total: diamonds.length,
        importedCount,
        updatedCount,
        failedCount,
      },
    });
  } catch (error) {
    console.error('executeDiamondImport error:', error);
    res.status(500).json({ message: 'Error executing diamond import' });
  }
};

export const extractAndMatchZipImages = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No ZIP file uploaded' });
    }

    const zip = new JSZip();
    const contents = await zip.loadAsync(req.file.buffer);

    let matchedCount = 0;
    const matches: { diamondId: string; filename: string }[] = [];

    for (const filename of Object.keys(contents.files)) {
      if (contents.files[filename].dir) continue;

      const baseName = filename.split('/').pop() || '';
      const dIdMatch = baseName.match(/^(D\d+|[A-Z0-9_-]+)\.(jpg|jpeg|png|webp|gif)/i);

      if (dIdMatch) {
        const diamondId = dIdMatch[1];
        const existing = await prisma.diamond.findUnique({ where: { diamondId } });

        if (existing) {
          const simulatedUrl = `/assets/floksy_diamonds_cat.png&matched=${diamondId}`;
          await prisma.diamond.update({
            where: { diamondId },
            data: { imageUrl: simulatedUrl },
          });
          matchedCount++;
          matches.push({ diamondId, filename });
        }
      }
    }

    res.json({
      message: `Extracted and matched ${matchedCount} images from ZIP`,
      matchedCount,
      matches,
    });
  } catch (error) {
    console.error('ZIP extraction error:', error);
    res.status(500).json({ message: 'Error processing ZIP file' });
  }
};

export const getImportHistory = async (req: AuthRequest, res: Response) => {
  try {
    const history = await prisma.diamondImportHistory.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching import history' });
  }
};
