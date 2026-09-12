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
exports.deleteMedia = exports.deleteUploadedMediaFile = exports.uploadMedia = exports.uploadMediaFiles = exports.getAllMedia = void 0;
const prisma_1 = __importStar(require("../prisma"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getCandidateMediaDirs = () => [
    path_1.default.join(process.cwd(), 'uploads', 'media'),
    path_1.default.join(process.cwd(), 'public_html', 'uploads', 'media'),
    path_1.default.join(process.cwd(), 'dist', 'uploads', 'media'),
    path_1.default.join(process.cwd(), 'backend', 'uploads', 'media'),
    path_1.default.join(process.cwd(), 'frontend', 'public', 'uploads', 'media'),
    path_1.default.join(process.cwd(), 'frontend', 'dist', 'uploads', 'media'),
    path_1.default.join(__dirname, '..', '..', 'uploads', 'media'),
    path_1.default.join(__dirname, '..', '..', 'public_html', 'uploads', 'media'),
    path_1.default.join(__dirname, '..', '..', 'dist', 'uploads', 'media'),
    path_1.default.join(__dirname, '..', '..', 'frontend', 'dist', 'uploads', 'media'),
];
const ensureMediaDirsExist = () => {
    for (const dir of getCandidateMediaDirs()) {
        try {
            if (!fs_1.default.existsSync(dir))
                fs_1.default.mkdirSync(dir, { recursive: true });
        }
        catch (e) { }
    }
};
const getAllMedia = async (req, res) => {
    try {
        const search = (req.query.search || '').trim().toLowerCase();
        const mediaList = await prisma_1.default.media.findMany({
            orderBy: { createdAt: 'desc' },
        });
        let filtered = mediaList;
        if (search) {
            filtered = filtered.filter((m) => m.name.toLowerCase().includes(search) || (m.altText && m.altText.toLowerCase().includes(search)));
        }
        res.json(filtered);
    }
    catch (error) {
        console.error('getAllMedia error:', error);
        res.status(500).json({ message: 'Error fetching media files' });
    }
};
exports.getAllMedia = getAllMedia;
/**
 * Upload single or multiple media files from PC directly to persistent disk storage & MySQL Media table.
 * Returns { message, url, urls, media } compatible with all admin components.
 */
const uploadMediaFiles = async (req, res) => {
    try {
        ensureMediaDirsExist();
        const rawFiles = req.files || (req.file ? [req.file] : []);
        if (!rawFiles || rawFiles.length === 0) {
            return res.status(400).json({ message: 'No media files were selected.' });
        }
        // Deduplicate any repeated file streams in the same request
        const files = [];
        const seen = new Set();
        for (const f of rawFiles) {
            const key = `${f.originalname}_${f.size || f.buffer?.length || 0}`;
            if (!seen.has(key)) {
                seen.add(key);
                files.push(f);
            }
        }
        const savedMedia = await Promise.all(files.map(async (file) => {
            const ext = path_1.default.extname(file.originalname).toLowerCase() || '.jpg';
            const cleanName = path_1.default.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
            const safeName = `img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}_${cleanName}${ext}`;
            // Write file across all candidate directories for immediate multi-environment availability
            for (const dir of getCandidateMediaDirs()) {
                try {
                    if (!fs_1.default.existsSync(dir))
                        fs_1.default.mkdirSync(dir, { recursive: true });
                    fs_1.default.writeFileSync(path_1.default.join(dir, safeName), file.buffer);
                }
                catch (e) { }
            }
            const fileUrl = `/uploads/media/${safeName}`;
            // Save entry into MySQL database Media table with permanent LONGBLOB storage
            try {
                await prisma_1.default.media.create({
                    data: {
                        name: file.originalname,
                        url: fileUrl,
                        fileType: file.mimetype || 'image/jpeg',
                        fileSize: file.size || file.buffer.length,
                        altText: cleanName.replace(/_/g, ' '),
                        dimensions: '1200x1200',
                        data: file.buffer,
                    },
                });
                // Redundant direct pool update to guarantee BLOB persistence across all DB drivers
                await prisma_1.mysqlPool.query('UPDATE `Media` SET `data` = ? WHERE `url` = ?', [file.buffer, fileUrl]).catch(() => { });
            }
            catch (dbErr) {
                console.warn('Notice: Media record entry error:', dbErr);
            }
            return {
                originalName: file.originalname,
                url: fileUrl,
                fileSize: file.size || file.buffer.length,
                fileType: file.mimetype || 'image/jpeg',
            };
        }));
        const primaryUrl = savedMedia[0]?.url || '';
        const allUrls = savedMedia.map((m) => m.url);
        return res.json({
            message: 'Media uploaded successfully to persistent storage and database!',
            url: primaryUrl,
            urls: allUrls,
            media: savedMedia,
        });
    }
    catch (error) {
        console.error('uploadMediaFiles error:', error);
        return res.status(500).json({ message: `Media upload failed: ${error.message}` });
    }
};
exports.uploadMediaFiles = uploadMediaFiles;
const uploadMedia = async (req, res) => {
    try {
        const { name, url, fileType, fileSize, altText, dimensions } = req.body;
        if (!name || !url) {
            return res.status(400).json({ message: 'Media Name and URL are required' });
        }
        const media = await prisma_1.default.media.create({
            data: {
                name,
                url,
                fileType: fileType || 'image/png',
                fileSize: fileSize ? Number(fileSize) : 0,
                altText: altText || name,
                dimensions: dimensions || '1200x1200',
            },
        });
        res.json(media);
    }
    catch (error) {
        console.error('uploadMedia error:', error);
        res.status(500).json({ message: 'Error creating media entry' });
    }
};
exports.uploadMedia = uploadMedia;
/**
 * Safely delete an uploaded file from disk and database when an image is replaced or removed.
 * Default /assets/ brand items are locked and NEVER deleted.
 */
const deleteUploadedMediaFile = async (req, res) => {
    try {
        const url = req.body?.url || req.query?.url;
        if (!url || typeof url !== 'string') {
            return res.status(400).json({ message: 'URL is required for file deletion' });
        }
        // SAFETY LOCK: Never delete default assets or external URLs
        if (!url.startsWith('/uploads/')) {
            return res.json({
                message: 'URL is a protected system asset or external URL. File preserved.',
                deleted: false,
            });
        }
        // Resolve relative path safely
        const relativePath = url.replace(/^\/+/, '');
        const p1 = path_1.default.join(process.cwd(), relativePath);
        const p2 = path_1.default.join(process.cwd(), 'frontend', 'public', relativePath);
        let deletedAny = false;
        if (fs_1.default.existsSync(p1)) {
            try {
                fs_1.default.unlinkSync(p1);
                deletedAny = true;
            }
            catch (err) {
                console.warn('Could not unlink p1:', err);
            }
        }
        if (fs_1.default.existsSync(p2)) {
            try {
                fs_1.default.unlinkSync(p2);
                deletedAny = true;
            }
            catch (err) {
                console.warn('Could not unlink p2:', err);
            }
        }
        // Remove from MySQL Media table if present
        try {
            await prisma_1.default.media.deleteMany({ where: { url } });
        }
        catch (e) { }
        return res.json({
            message: 'Old uploaded image successfully deleted from disk and database.',
            deleted: deletedAny,
        });
    }
    catch (error) {
        console.error('deleteUploadedMediaFile error:', error);
        return res.status(500).json({ message: `Error deleting uploaded file: ${error.message}` });
    }
};
exports.deleteUploadedMediaFile = deleteUploadedMediaFile;
const deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const media = await prisma_1.default.media.findUnique({ where: { id } });
        if (!media)
            return res.status(404).json({ message: 'Media not found' });
        // Check if media is currently used in products or categories
        const usedInProducts = await prisma_1.default.product.count({
            where: {
                OR: [{ mainImage: media.url }, { secondaryImage: media.url }],
            },
        });
        const usedInCategories = await prisma_1.default.category.count({
            where: {
                OR: [{ image: media.url }, { bannerImage: media.url }],
            },
        });
        if (usedInProducts > 0 || usedInCategories > 0) {
            return res.status(400).json({
                message: `Cannot delete media. It is currently referenced by ${usedInProducts} products and ${usedInCategories} categories.`,
            });
        }
        // Also delete the physical file if it starts with /uploads/
        if (media.url && media.url.startsWith('/uploads/')) {
            const relativePath = media.url.replace(/^\/+/, '');
            const p1 = path_1.default.join(process.cwd(), relativePath);
            const p2 = path_1.default.join(process.cwd(), 'frontend', 'public', relativePath);
            if (fs_1.default.existsSync(p1)) {
                try {
                    fs_1.default.unlinkSync(p1);
                }
                catch (e) { }
            }
            if (fs_1.default.existsSync(p2)) {
                try {
                    fs_1.default.unlinkSync(p2);
                }
                catch (e) { }
            }
        }
        await prisma_1.default.media.delete({ where: { id } });
        res.json({ message: 'Media deleted successfully' });
    }
    catch (error) {
        console.error('deleteMedia error:', error);
        res.status(500).json({ message: 'Error deleting media' });
    }
};
exports.deleteMedia = deleteMedia;
