"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImportHistory = exports.extractAndMatchZipImages = exports.executeDiamondImport = exports.parseAndValidateExcel = exports.downloadExcelTemplate = void 0;
const xlsx_1 = __importDefault(require("xlsx"));
const jszip_1 = __importDefault(require("jszip"));
const prisma_1 = __importDefault(require("../prisma"));
const downloadExcelTemplate = (req, res) => {
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
            '/assets/gem_diamonds_cat.png',
            '',
            '',
            'AVAILABLE',
        ];
        const ws = xlsx_1.default.utils.aoa_to_sheet([headers, sampleRow]);
        const wb = xlsx_1.default.utils.book_new();
        xlsx_1.default.utils.book_append_sheet(wb, ws, 'Diamonds');
        const buffer = xlsx_1.default.write(wb, { type: 'buffer', bookType: 'xlsx' });
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="Aura_Diamond_Import_Template.xlsx"');
        res.send(buffer);
    }
    catch (error) {
        console.error('Template download error:', error);
        res.status(500).json({ message: 'Error generating Excel template' });
    }
};
exports.downloadExcelTemplate = downloadExcelTemplate;
const parseAndValidateExcel = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const workbook = xlsx_1.default.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rawRows = xlsx_1.default.utils.sheet_to_json(sheet, { defval: '' });
        if (rawRows.length === 0) {
            return res.status(400).json({ message: 'Excel file is empty' });
        }
        const validColors = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
        const validClarities = ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1'];
        const validRows = [];
        const errors = [];
        const seenIds = new Set();
        const FANCY_COLOR_NAMES = ['YELLOW', 'GREEN', 'PINK', 'BLUE', 'ORANGE', 'BROWN', 'PURPLE', 'RED', 'BLACK'];
        for (let i = 0; i < rawRows.length; i++) {
            const rawR = rawRows[i];
            const rowNum = i + 2;
            const rowErrors = [];
            // Clean keys (strip surrounding whitespace from key names)
            const cleanRow = {};
            Object.keys(rawR).forEach((k) => {
                cleanRow[k.trim()] = rawR[k];
            });
            const getValue = (...keys) => {
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
            }
            else if (fancyColor && (!color || color === 'FANCY')) {
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
            let length = parseFloat(getValue('Length', 'length')) || null;
            let width = parseFloat(getValue('Width', 'width')) || null;
            let depth = parseFloat(getValue('Depth', 'depth')) || null;
            if (measurement && (!length || !width || !depth)) {
                const parts = measurement.split(/x|\*/i).map((p) => parseFloat(p.trim())).filter((n) => !isNaN(n));
                if (parts.length >= 2) {
                    if (!length)
                        length = parts[0];
                    if (!width)
                        width = parts[1];
                    if (parts.length >= 3 && !depth)
                        depth = parts[2];
                }
            }
            let ratio = parseFloat(getValue('RATIO', 'Ratio', 'ratio')) || null;
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
            if (!diamondId)
                rowErrors.push('Missing Diamond ID');
            if (seenIds.has(diamondId))
                rowErrors.push(`Duplicate Diamond ID "${diamondId}" in file`);
            if (diamondId)
                seenIds.add(diamondId);
            if (!shape)
                rowErrors.push('Missing Shape');
            if (isNaN(carat) || carat <= 0)
                rowErrors.push('Invalid Carat (must be > 0)');
            if (isNaN(price) || price <= 0)
                rowErrors.push('Invalid Price (must be > 0)');
            if (rowErrors.length > 0) {
                errors.push({ row: rowNum, diamondId: diamondId || 'N/A', errors: rowErrors });
            }
            else {
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
    }
    catch (error) {
        console.error('Excel parse error:', error);
        res.status(500).json({ message: 'Error processing Excel file' });
    }
};
exports.parseAndValidateExcel = parseAndValidateExcel;
const executeDiamondImport = async (req, res) => {
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
                const existing = await prisma_1.default.diamond.findUnique({ where: { diamondId: d.diamondId } });
                if (existing) {
                    if (mode === 'ADD_ONLY') {
                        failedCount++;
                        continue;
                    }
                    await prisma_1.default.diamond.update({
                        where: { diamondId: d.diamondId },
                        data: d,
                    });
                    updatedCount++;
                }
                else {
                    if (mode === 'UPDATE_ONLY') {
                        failedCount++;
                        continue;
                    }
                    await prisma_1.default.diamond.create({ data: d });
                    importedCount++;
                }
            }
            catch (err) {
                failedCount++;
            }
        }
        await prisma_1.default.diamondImportHistory.create({
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
    }
    catch (error) {
        console.error('executeDiamondImport error:', error);
        res.status(500).json({ message: 'Error executing diamond import' });
    }
};
exports.executeDiamondImport = executeDiamondImport;
const extractAndMatchZipImages = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No ZIP file uploaded' });
        }
        const zip = new jszip_1.default();
        const contents = await zip.loadAsync(req.file.buffer);
        let matchedCount = 0;
        const matches = [];
        for (const filename of Object.keys(contents.files)) {
            if (contents.files[filename].dir)
                continue;
            const baseName = filename.split('/').pop() || '';
            const dIdMatch = baseName.match(/^(D\d+|[A-Z0-9_-]+)\.(jpg|jpeg|png|webp|gif)/i);
            if (dIdMatch) {
                const diamondId = dIdMatch[1];
                const existing = await prisma_1.default.diamond.findUnique({ where: { diamondId } });
                if (existing) {
                    const simulatedUrl = `/assets/gem_diamonds_cat.png&matched=${diamondId}`;
                    await prisma_1.default.diamond.update({
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
    }
    catch (error) {
        console.error('ZIP extraction error:', error);
        res.status(500).json({ message: 'Error processing ZIP file' });
    }
};
exports.extractAndMatchZipImages = extractAndMatchZipImages;
const getImportHistory = async (req, res) => {
    try {
        const history = await prisma_1.default.diamondImportHistory.findMany({
            orderBy: { createdAt: 'desc' },
            take: 20,
        });
        res.json(history);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching import history' });
    }
};
exports.getImportHistory = getImportHistory;
