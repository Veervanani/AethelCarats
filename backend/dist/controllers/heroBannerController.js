"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadHeroBannerImage = exports.reorderHeroBanners = exports.deleteHeroBanner = exports.updateHeroBanner = exports.createHeroBanner = exports.getAdminHeroBanners = exports.getPublicHeroBanners = exports.ensureHeroBannerTableExists = void 0;
const prisma_1 = __importStar(require("../prisma"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getCandidateHeroDirs = () => [
    path_1.default.join(process.cwd(), 'uploads', 'hero-banners'),
    path_1.default.join(process.cwd(), 'backend', 'uploads', 'hero-banners'),
    path_1.default.join(process.cwd(), 'frontend', 'public', 'uploads', 'hero-banners'),
    path_1.default.join(process.cwd(), 'frontend', 'dist', 'uploads', 'hero-banners'),
    path_1.default.join(__dirname, '..', '..', 'uploads', 'hero-banners'),
    path_1.default.join(__dirname, '..', '..', 'frontend', 'dist', 'uploads', 'hero-banners'),
];
const ensureUploadDirsExist = () => {
    for (const dir of getCandidateHeroDirs()) {
        try {
            if (!fs_1.default.existsSync(dir))
                fs_1.default.mkdirSync(dir, { recursive: true });
        }
        catch (e) { }
    }
};
const saveUploadedFile = (file, prefix = 'hero') => {
    ensureUploadDirsExist();
    // Validate MIME type & file extension
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const ext = path_1.default.extname(file.originalname).toLowerCase();
    const allowedExts = ['.jpg', '.jpeg', '.png', '.webp'];
    if (!allowedMimeTypes.includes(file.mimetype) && !allowedExts.includes(ext)) {
        throw new Error('Invalid file format. Only JPG, JPEG, PNG, and WEBP formats are supported.');
    }
    // Max 25MB check
    if (file.size > 25 * 1024 * 1024) {
        throw new Error('File size exceeds the 25MB limit.');
    }
    const safeName = `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext || '.jpg'}`;
    for (const dir of getCandidateHeroDirs()) {
        try {
            if (!fs_1.default.existsSync(dir))
                fs_1.default.mkdirSync(dir, { recursive: true });
            fs_1.default.writeFileSync(path_1.default.join(dir, safeName), file.buffer);
        }
        catch (e) { }
    }
    const fileUrl = `/uploads/hero-banners/${safeName}`;
    // Persist to MySQL Media table with LONGBLOB data for multi-device sync
    prisma_1.default.media.create({
        data: {
            name: file.originalname,
            url: fileUrl,
            fileType: file.mimetype || 'image/jpeg',
            fileSize: file.size || file.buffer?.length || 0,
            altText: path_1.default.basename(file.originalname, ext),
            dimensions: '1920x1080',
            data: file.buffer,
        },
    }).catch((err) => console.warn('Hero media db save notice:', err));
    prisma_1.mysqlPool.query('UPDATE `Media` SET `data` = ? WHERE `url` = ?', [file.buffer, fileUrl]).catch(() => { });
    return fileUrl;
};
const extractFile = (req, fieldName, altFieldNames = []) => {
    if (req.file && (req.file.fieldname === fieldName || altFieldNames.includes(req.file.fieldname))) {
        return req.file;
    }
    if (Array.isArray(req.files)) {
        const match = req.files.find((f) => f.fieldname === fieldName || altFieldNames.includes(f.fieldname));
        if (match)
            return match;
        if (fieldName === 'desktopImage' && req.files.length > 0)
            return req.files[0];
    }
    else if (req.files && typeof req.files === 'object') {
        const fileMap = req.files;
        if (fileMap[fieldName] && fileMap[fieldName][0])
            return fileMap[fieldName][0];
        for (const alt of altFieldNames) {
            if (fileMap[alt] && fileMap[alt][0])
                return fileMap[alt][0];
        }
    }
    return undefined;
};
const deleteFileIfUnreferenced = async (imagePath) => {
    if (!imagePath || !imagePath.startsWith('/uploads/hero-banners/'))
        return;
    try {
        const filename = path_1.default.basename(imagePath);
        // Check if another HeroBanner uses this same image
        const count = await prisma_1.default.heroBanner.count({
            where: {
                OR: [{ imagePath }, { mobileImagePath: imagePath }],
            },
        });
        if (count <= 1) {
            for (const dir of getCandidateHeroDirs()) {
                const p = path_1.default.join(dir, filename);
                if (fs_1.default.existsSync(p)) {
                    try {
                        fs_1.default.unlinkSync(p);
                    }
                    catch (e) { }
                }
            }
        }
    }
    catch (err) {
        console.error('Error cleaning up hero image file:', err);
    }
};
const DEFAULT_SLIDES = [
    {
        id: 'hero_default_1',
        title: "Handcrafted\nElegance &\nExceptional\nDiamonds",
        subtitle: 'THE SIGNATURE COLLECTION 2026',
        description: 'Immerse yourself in world-class craftsmanship, ethically sourced diamonds, and timeless bespoke creations.',
        primaryCtaText: 'EXPLORE RINGS',
        primaryCtaLink: '/rings',
        secondaryCtaText: 'THE DIAMOND VAULT →',
        secondaryCtaLink: '/diamonds',
        productType: 'Engagement Ring',
        imagePath: '',
        mobileImagePath: '',
        imageAlt: 'Handcrafted Solitaire Diamond Engagement Ring',
        isActive: true,
        displayOrder: 1,
    },
    {
        id: 'hero_default_2',
        title: "Timeless\nDiamonds,\nRefined\nForever",
        subtitle: 'THE ART OF HIGH JEWELRY',
        description: 'Discover exquisite diamond necklaces crafted with precision, elegance, and an uncompromising eye for detail.',
        primaryCtaText: 'EXPLORE NECKLACES',
        primaryCtaLink: '/necklaces',
        secondaryCtaText: 'VIEW COLLECTION →',
        secondaryCtaLink: '/collections/signature-collection',
        productType: 'Necklace',
        imagePath: '',
        mobileImagePath: '',
        imageAlt: 'Haute Joaillerie Diamond Necklace',
        isActive: true,
        displayOrder: 2,
    },
    {
        id: 'hero_default_3',
        title: "Brilliance\nDesigned to\nBe Remembered",
        subtitle: 'THE SIGNATURE COLLECTION',
        description: 'Exceptional diamond earrings, thoughtfully crafted to bring understated brilliance to every occasion.',
        primaryCtaText: 'EXPLORE EARRINGS',
        primaryCtaLink: '/earrings',
        secondaryCtaText: 'DISCOVER DIAMONDS →',
        secondaryCtaLink: '/diamonds',
        productType: 'Earrings',
        imagePath: '',
        mobileImagePath: '',
        imageAlt: 'Brilliant Diamond Earrings',
        isActive: true,
        displayOrder: 3,
    },
    {
        id: 'hero_default_4',
        title: "Exceptional\nCraftsmanship,\nWorn Forever",
        subtitle: 'BESPOKE DIAMOND JEWELRY',
        description: 'Discover refined diamond bracelets created with precision, timeless design, and exceptional craftsmanship.',
        primaryCtaText: 'EXPLORE BRACELETS',
        primaryCtaLink: '/bracelets',
        secondaryCtaText: 'CREATE YOUR OWN →',
        secondaryCtaLink: '/custom-jewellery',
        productType: 'Bracelet',
        imagePath: '',
        mobileImagePath: '',
        imageAlt: 'Bespoke Diamond Bracelet',
        isActive: true,
        displayOrder: 4,
    },
];
let heroTableChecked = false;
const ensureHeroBannerTableExists = async () => {
    if (heroTableChecked)
        return;
    try {
        await prisma_1.default.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS \`HeroBanner\` (
        \`id\` VARCHAR(191) NOT NULL,
        \`title\` VARCHAR(191) NOT NULL,
        \`subtitle\` VARCHAR(191) NULL,
        \`description\` LONGTEXT NULL,
        \`primaryCtaText\` VARCHAR(191) NULL,
        \`primaryCtaLink\` VARCHAR(191) NULL,
        \`secondaryCtaText\` VARCHAR(191) NULL,
        \`secondaryCtaLink\` VARCHAR(191) NULL,
        \`productType\` VARCHAR(191) NOT NULL DEFAULT 'Engagement Ring',
        \`imagePath\` VARCHAR(191) NOT NULL,
        \`mobileImagePath\` VARCHAR(191) NULL,
        \`imageAlt\` VARCHAR(191) NULL,
        \`isActive\` TINYINT(1) NOT NULL DEFAULT 1,
        \`displayOrder\` INT NOT NULL DEFAULT 0,
        \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        \`updatedAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
        heroTableChecked = true;
    }
    catch (e) {
        console.warn('HeroBanner table auto-creation notice:', e?.message || e);
    }
};
exports.ensureHeroBannerTableExists = ensureHeroBannerTableExists;
const getPublicHeroBanners = async (req, res) => {
    try {
        await (0, exports.ensureHeroBannerTableExists)();
        const banners = await prisma_1.default.heroBanner.findMany({
            where: { isActive: true },
            orderBy: { displayOrder: 'asc' },
        });
        return res.json(banners || []);
    }
    catch (error) {
        console.error('getPublicHeroBanners error:', error);
        return res.json([]);
    }
};
exports.getPublicHeroBanners = getPublicHeroBanners;
const getAdminHeroBanners = async (req, res) => {
    try {
        await (0, exports.ensureHeroBannerTableExists)();
        const banners = await prisma_1.default.heroBanner.findMany({
            orderBy: { displayOrder: 'asc' },
        });
        return res.json(banners || []);
    }
    catch (error) {
        console.error('getAdminHeroBanners error:', error);
        return res.json([]);
    }
};
exports.getAdminHeroBanners = getAdminHeroBanners;
const createHeroBanner = async (req, res) => {
    try {
        await (0, exports.ensureHeroBannerTableExists)();
        const { title, subtitle, description, primaryCtaText, primaryCtaLink, secondaryCtaText, secondaryCtaLink, productType, imageAlt, isActive, displayOrder, } = req.body;
        let imagePath = req.body.imagePath || '';
        let mobileImagePath = req.body.mobileImagePath || '';
        const desktopImg = extractFile(req, 'desktopImage', ['file', 'files', 'image']);
        if (desktopImg) {
            imagePath = saveUploadedFile(desktopImg, 'desktop');
        }
        const mobileImg = extractFile(req, 'mobileImage', ['mobileFile', 'mobile']);
        if (mobileImg) {
            mobileImagePath = saveUploadedFile(mobileImg, 'mobile');
        }
        if (!imagePath) {
            return res.status(400).json({ message: 'Hero desktop image file is required' });
        }
        const nextOrder = displayOrder !== undefined ? Number(displayOrder) : ((await prisma_1.default.heroBanner.count()) + 1);
        const banner = await prisma_1.default.heroBanner.create({
            data: {
                title: title || 'Timeless Luxury Fine Jewellery',
                subtitle: subtitle || 'AURA DIAMOND ATELIER',
                description: description || '',
                primaryCtaText: primaryCtaText || 'EXPLORE COLLECTION',
                primaryCtaLink: primaryCtaLink || '/rings',
                secondaryCtaText: secondaryCtaText || '',
                secondaryCtaLink: secondaryCtaLink || '',
                productType: productType || 'Engagement Ring',
                imagePath,
                mobileImagePath: mobileImagePath || null,
                imageAlt: imageAlt || title || 'Aura Diamond Atelier High Jewellery',
                isActive: isActive === undefined ? true : String(isActive) === 'true' || isActive === true,
                displayOrder: nextOrder,
            },
        });
        res.status(201).json(banner);
    }
    catch (error) {
        console.error('createHeroBanner error:', error);
        res.status(500).json({ message: error.message || 'Error creating hero banner' });
    }
};
exports.createHeroBanner = createHeroBanner;
const updateHeroBanner = async (req, res) => {
    try {
        await (0, exports.ensureHeroBannerTableExists)();
        const { id } = req.params;
        const existing = await prisma_1.default.heroBanner.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ message: 'Hero banner not found' });
        }
        const { title, subtitle, description, primaryCtaText, primaryCtaLink, secondaryCtaText, secondaryCtaLink, productType, imageAlt, isActive, displayOrder, } = req.body;
        let imagePath = existing.imagePath;
        let mobileImagePath = existing.mobileImagePath;
        const desktopImg = extractFile(req, 'desktopImage', ['file', 'files', 'image']);
        if (desktopImg) {
            const newPath = saveUploadedFile(desktopImg, 'desktop');
            await deleteFileIfUnreferenced(existing.imagePath);
            imagePath = newPath;
        }
        else if (req.body.imagePath && req.body.imagePath !== existing.imagePath) {
            imagePath = req.body.imagePath;
        }
        const mobileImg = extractFile(req, 'mobileImage', ['mobileFile', 'mobile']);
        if (mobileImg) {
            const newMobilePath = saveUploadedFile(mobileImg, 'mobile');
            await deleteFileIfUnreferenced(existing.mobileImagePath);
            mobileImagePath = newMobilePath;
        }
        else if (req.body.mobileImagePath !== undefined) {
            mobileImagePath = req.body.mobileImagePath;
        }
        const updated = await prisma_1.default.heroBanner.update({
            where: { id },
            data: {
                title: title !== undefined ? title : existing.title,
                subtitle: subtitle !== undefined ? subtitle : existing.subtitle,
                description: description !== undefined ? description : existing.description,
                primaryCtaText: primaryCtaText !== undefined ? primaryCtaText : existing.primaryCtaText,
                primaryCtaLink: primaryCtaLink !== undefined ? primaryCtaLink : existing.primaryCtaLink,
                secondaryCtaText: secondaryCtaText !== undefined ? secondaryCtaText : existing.secondaryCtaText,
                secondaryCtaLink: secondaryCtaLink !== undefined ? secondaryCtaLink : existing.secondaryCtaLink,
                productType: productType !== undefined ? productType : existing.productType,
                imagePath,
                mobileImagePath,
                imageAlt: imageAlt !== undefined ? imageAlt : existing.imageAlt,
                isActive: isActive !== undefined ? (String(isActive) === 'true' || isActive === true) : existing.isActive,
                displayOrder: displayOrder !== undefined ? Number(displayOrder) : existing.displayOrder,
            },
        });
        res.json(updated);
    }
    catch (error) {
        console.error('updateHeroBanner error:', error);
        res.status(500).json({ message: error.message || 'Error updating hero banner' });
    }
};
exports.updateHeroBanner = updateHeroBanner;
const deleteHeroBanner = async (req, res) => {
    try {
        await (0, exports.ensureHeroBannerTableExists)();
        const { id } = req.params;
        const banner = await prisma_1.default.heroBanner.findUnique({ where: { id } });
        if (!banner) {
            return res.status(404).json({ message: 'Hero banner not found' });
        }
        await prisma_1.default.heroBanner.delete({ where: { id } });
        await deleteFileIfUnreferenced(banner.imagePath);
        await deleteFileIfUnreferenced(banner.mobileImagePath);
        res.json({ message: 'Hero banner deleted successfully' });
    }
    catch (error) {
        console.error('deleteHeroBanner error:', error);
        res.status(500).json({ message: 'Error deleting hero banner' });
    }
};
exports.deleteHeroBanner = deleteHeroBanner;
const reorderHeroBanners = async (req, res) => {
    try {
        await (0, exports.ensureHeroBannerTableExists)();
        const { orderedIds } = req.body;
        if (!Array.isArray(orderedIds)) {
            return res.status(400).json({ message: 'orderedIds array is required' });
        }
        for (let i = 0; i < orderedIds.length; i++) {
            await prisma_1.default.heroBanner.update({
                where: { id: orderedIds[i] },
                data: { displayOrder: i + 1 },
            });
        }
        res.json({ message: 'Hero banners reordered successfully' });
    }
    catch (error) {
        console.error('reorderHeroBanners error:', error);
        res.status(500).json({ message: 'Error reordering hero banners' });
    }
};
exports.reorderHeroBanners = reorderHeroBanners;
const uploadHeroBannerImage = async (req, res) => {
    try {
        const file = extractFile(req, 'file', ['files', 'image', 'desktopImage', 'mobileImage']);
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const relativePath = saveUploadedFile(file, 'hero_img');
        res.json({ url: relativePath, path: relativePath });
    }
    catch (error) {
        console.error('uploadHeroBannerImage error:', error);
        res.status(400).json({ message: error.message || 'Error uploading hero image' });
    }
};
exports.uploadHeroBannerImage = uploadHeroBannerImage;
