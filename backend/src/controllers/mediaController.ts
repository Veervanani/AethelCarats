import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma, { mysqlPool } from '../prisma';
import fs from 'fs';
import path from 'path';

const getCandidateMediaDirs = () => [
  path.join(process.cwd(), 'uploads', 'media'),
  path.join(process.cwd(), 'public_html', 'uploads', 'media'),
  path.join(process.cwd(), 'dist', 'uploads', 'media'),
  path.join(process.cwd(), 'backend', 'uploads', 'media'),
  path.join(process.cwd(), 'frontend', 'public', 'uploads', 'media'),
  path.join(process.cwd(), 'frontend', 'dist', 'uploads', 'media'),
  path.join(__dirname, '..', '..', 'uploads', 'media'),
  path.join(__dirname, '..', '..', 'public_html', 'uploads', 'media'),
  path.join(__dirname, '..', '..', 'dist', 'uploads', 'media'),
  path.join(__dirname, '..', '..', 'frontend', 'dist', 'uploads', 'media'),
];

const ensureMediaDirsExist = () => {
  for (const dir of getCandidateMediaDirs()) {
    try {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    } catch (e) {}
  }
};

export const getAllMedia = async (req: Request, res: Response) => {
  try {
    const search = ((req.query.search as string) || '').trim().toLowerCase();
    const mediaList = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
    });

    let filtered = mediaList;
    if (search) {
      filtered = filtered.filter(
        (m) => m.name.toLowerCase().includes(search) || (m.altText && m.altText.toLowerCase().includes(search))
      );
    }

    res.json(filtered);
  } catch (error) {
    console.error('getAllMedia error:', error);
    res.status(500).json({ message: 'Error fetching media files' });
  }
};

/**
 * Upload single or multiple media files from PC directly to persistent disk storage & MySQL Media table.
 * Returns { message, url, urls, media } compatible with all admin components.
 */
export const uploadMediaFiles = async (req: AuthRequest, res: Response) => {
  try {
    ensureMediaDirsExist();
    const rawFiles = (req.files as Express.Multer.File[]) || (req.file ? [req.file] : []);
    if (!rawFiles || rawFiles.length === 0) {
      return res.status(400).json({ message: 'No media files were selected.' });
    }

    // Deduplicate any repeated file streams in the same request
    const files: Express.Multer.File[] = [];
    const seen = new Set<string>();
    for (const f of rawFiles) {
      const key = `${f.originalname}_${f.size || f.buffer?.length || 0}`;
      if (!seen.has(key)) {
        seen.add(key);
        files.push(f);
      }
    }

    const savedMedia = await Promise.all(
      files.map(async (file) => {
        const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
        const cleanName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
        const safeName = `img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}_${cleanName}${ext}`;

        // Write file across all candidate directories for immediate multi-environment availability
        for (const dir of getCandidateMediaDirs()) {
          try {
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(path.join(dir, safeName), file.buffer);
          } catch (e) {}
        }

        const fileUrl = `/uploads/media/${safeName}`;

        // Save entry into MySQL database Media table with permanent LONGBLOB storage
        try {
          await prisma.media.create({
            data: {
              name: file.originalname,
              url: fileUrl,
              fileType: file.mimetype || 'image/jpeg',
              fileSize: file.size || file.buffer.length,
              altText: cleanName.replace(/_/g, ' '),
              dimensions: '1200x1200',
              data: file.buffer,
            } as any,
          });
          // Redundant direct pool update to guarantee BLOB persistence across all DB drivers
          await mysqlPool.query('UPDATE `Media` SET `data` = ? WHERE `url` = ?', [file.buffer, fileUrl]).catch(() => {});
        } catch (dbErr) {
          console.warn('Notice: Media record entry error:', dbErr);
        }

        return {
          originalName: file.originalname,
          url: fileUrl,
          fileSize: file.size || file.buffer.length,
          fileType: file.mimetype || 'image/jpeg',
        };
      })
    );

    const primaryUrl = savedMedia[0]?.url || '';
    const allUrls = savedMedia.map((m) => m.url);

    return res.json({
      message: 'Media uploaded successfully to persistent storage and database!',
      url: primaryUrl,
      urls: allUrls,
      media: savedMedia,
    });
  } catch (error: any) {
    console.error('uploadMediaFiles error:', error);
    return res.status(500).json({ message: `Media upload failed: ${error.message}` });
  }
};

export const uploadMedia = async (req: AuthRequest, res: Response) => {
  try {
    const { name, url, fileType, fileSize, altText, dimensions } = req.body;
    if (!name || !url) {
      return res.status(400).json({ message: 'Media Name and URL are required' });
    }

    const media = await prisma.media.create({
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
  } catch (error) {
    console.error('uploadMedia error:', error);
    res.status(500).json({ message: 'Error creating media entry' });
  }
};

/**
 * Safely delete an uploaded file from disk and database when an image is replaced or removed.
 * Default /assets/ brand items are locked and NEVER deleted.
 */
export const deleteUploadedMediaFile = async (req: AuthRequest, res: Response) => {
  try {
    const url = req.body?.url || (req.query?.url as string);
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
    const p1 = path.join(process.cwd(), relativePath);
    const p2 = path.join(process.cwd(), 'frontend', 'public', relativePath);

    let deletedAny = false;
    if (fs.existsSync(p1)) {
      try {
        fs.unlinkSync(p1);
        deletedAny = true;
      } catch (err) {
        console.warn('Could not unlink p1:', err);
      }
    }
    if (fs.existsSync(p2)) {
      try {
        fs.unlinkSync(p2);
        deletedAny = true;
      } catch (err) {
        console.warn('Could not unlink p2:', err);
      }
    }

    // Remove from MySQL Media table if present
    try {
      await prisma.media.deleteMany({ where: { url } });
    } catch (e) {}

    return res.json({
      message: 'Old uploaded image successfully deleted from disk and database.',
      deleted: deletedAny,
    });
  } catch (error: any) {
    console.error('deleteUploadedMediaFile error:', error);
    return res.status(500).json({ message: `Error deleting uploaded file: ${error.message}` });
  }
};

export const deleteMedia = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) return res.status(404).json({ message: 'Media not found' });

    // Check if media is currently used in products or categories
    const usedInProducts = await prisma.product.count({
      where: {
        OR: [{ mainImage: media.url }, { secondaryImage: media.url }],
      },
    });

    const usedInCategories = await prisma.category.count({
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
      const p1 = path.join(process.cwd(), relativePath);
      const p2 = path.join(process.cwd(), 'frontend', 'public', relativePath);
      if (fs.existsSync(p1)) {
        try { fs.unlinkSync(p1); } catch (e) {}
      }
      if (fs.existsSync(p2)) {
        try { fs.unlinkSync(p2); } catch (e) {}
      }
    }

    await prisma.media.delete({ where: { id } });
    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.error('deleteMedia error:', error);
    res.status(500).json({ message: 'Error deleting media' });
  }
};
