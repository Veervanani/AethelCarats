import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma, { mysqlPool } from '../prisma';
import fs from 'fs';
import path from 'path';

const getCandidateHeroDirs = () => [
  path.join(process.cwd(), 'uploads', 'hero-banners'),
  path.join(process.cwd(), 'backend', 'uploads', 'hero-banners'),
  path.join(process.cwd(), 'frontend', 'public', 'uploads', 'hero-banners'),
  path.join(process.cwd(), 'frontend', 'dist', 'uploads', 'hero-banners'),
  path.join(__dirname, '..', '..', 'uploads', 'hero-banners'),
  path.join(__dirname, '..', '..', 'frontend', 'dist', 'uploads', 'hero-banners'),
];

const ensureUploadDirsExist = () => {
  for (const dir of getCandidateHeroDirs()) {
    try {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    } catch (e) {}
  }
};

const saveUploadedFile = (file: Express.Multer.File, prefix: string = 'hero'): string => {
  ensureUploadDirsExist();

  // Validate MIME type & file extension
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const ext = path.extname(file.originalname).toLowerCase();
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
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, safeName), file.buffer);
    } catch (e) {}
  }

  const fileUrl = `/uploads/hero-banners/${safeName}`;

  // Persist to MySQL Media table with LONGBLOB data for multi-device sync
  prisma.media.create({
    data: {
      name: file.originalname,
      url: fileUrl,
      fileType: file.mimetype || 'image/jpeg',
      fileSize: file.size || file.buffer?.length || 0,
      altText: path.basename(file.originalname, ext),
      dimensions: '1920x1080',
      data: file.buffer,
    } as any,
  }).catch((err) => console.warn('Hero media db save notice:', err));

  mysqlPool.query('UPDATE `Media` SET `data` = ? WHERE `url` = ?', [file.buffer, fileUrl]).catch(() => {});

  return fileUrl;
};

const extractFile = (req: AuthRequest, fieldName: string, altFieldNames: string[] = []): Express.Multer.File | undefined => {
  if (req.file && (req.file.fieldname === fieldName || altFieldNames.includes(req.file.fieldname))) {
    return req.file;
  }
  if (Array.isArray(req.files)) {
    const match = req.files.find((f) => f.fieldname === fieldName || altFieldNames.includes(f.fieldname));
    if (match) return match;
    if (fieldName === 'desktopImage' && req.files.length > 0) return req.files[0];
  } else if (req.files && typeof req.files === 'object') {
    const fileMap = req.files as { [key: string]: Express.Multer.File[] };
    if (fileMap[fieldName] && fileMap[fieldName][0]) return fileMap[fieldName][0];
    for (const alt of altFieldNames) {
      if (fileMap[alt] && fileMap[alt][0]) return fileMap[alt][0];
    }
  }
  return undefined;
};

const deleteFileIfUnreferenced = async (imagePath: string | null | undefined) => {
  if (!imagePath || !imagePath.startsWith('/uploads/hero-banners/')) return;
  try {
    const filename = path.basename(imagePath);

    // Check if another HeroBanner uses this same image
    const count = await prisma.heroBanner.count({
      where: {
        OR: [{ imagePath }, { mobileImagePath: imagePath }],
      },
    });

    if (count <= 1) {
      for (const dir of getCandidateHeroDirs()) {
        const p = path.join(dir, filename);
        if (fs.existsSync(p)) {
          try { fs.unlinkSync(p); } catch (e) {}
        }
      }
    }
  } catch (err) {
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
    imagePath: '/uploads/media/img_1788886030804_trbi9_file_000000001bd482119e2764b12e244749.png',
    mobileImagePath: '/uploads/media/img_1788886034483_e2ys8_file_000000001bd482119e2764b12e244749.png',
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
    imagePath: '/uploads/media/img_1788886042844_cfzx3_file_00000000c39482119fa98f211a932497.png',
    mobileImagePath: '/uploads/media/img_1788886047183_k2jcg_file_00000000c39482119fa98f211a932497.png',
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
    imagePath: '/uploads/media/img_1788886055668_1hh6d_file_0000000012d88209b85476b65113440f.png',
    mobileImagePath: '/uploads/media/img_1788886059422_761fx_file_0000000012d88209b85476b65113440f.png',
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
    imagePath: '/uploads/media/img_1788886079173_88cm9_file_00000000760c821182703c9aa52b464e.png',
    mobileImagePath: '/uploads/media/img_1788886082540_2dfvi_file_00000000760c821182703c9aa52b464e.png',
    imageAlt: 'Bespoke Diamond Bracelet',
    isActive: true,
    displayOrder: 4,
  },
];

let heroTableChecked = false;
export const ensureHeroBannerTableExists = async () => {
  if (heroTableChecked) return;
  try {
    await prisma.$executeRawUnsafe(`
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
  } catch (e: any) {
    console.warn('HeroBanner table auto-creation notice:', e?.message || e);
  }
};

export const getPublicHeroBanners = async (req: Request, res: Response) => {
  try {
    await ensureHeroBannerTableExists();
    let banners = await prisma.heroBanner.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
    });

    if (!banners || banners.length === 0) {
      try {
        for (const slide of DEFAULT_SLIDES) {
          const { id, ...data } = slide;
          await prisma.heroBanner.create({ data });
        }
        banners = await prisma.heroBanner.findMany({
          where: { isActive: true },
          orderBy: { displayOrder: 'asc' },
        });
      } catch (seedErr) {
        console.warn('Could not seed default slides into DB, returning fallback:', seedErr);
        return res.json(DEFAULT_SLIDES);
      }
    }

    return res.json(banners && banners.length > 0 ? banners : DEFAULT_SLIDES);
  } catch (error) {
    console.error('getPublicHeroBanners fallback to defaults:', error);
    return res.json(DEFAULT_SLIDES);
  }
};

export const getAdminHeroBanners = async (req: Request, res: Response) => {
  try {
    await ensureHeroBannerTableExists();
    const banners = await prisma.heroBanner.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    if (!banners || banners.length === 0) {
      return res.json(DEFAULT_SLIDES);
    }
    return res.json(banners);
  } catch (error) {
    console.error('getAdminHeroBanners fallback to defaults:', error);
    return res.json(DEFAULT_SLIDES);
  }
};

export const createHeroBanner = async (req: AuthRequest, res: Response) => {
  try {
    await ensureHeroBannerTableExists();
    const {
      title,
      subtitle,
      description,
      primaryCtaText,
      primaryCtaLink,
      secondaryCtaText,
      secondaryCtaLink,
      productType,
      imageAlt,
      isActive,
      displayOrder,
    } = req.body;

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

    const nextOrder = displayOrder !== undefined ? Number(displayOrder) : ((await prisma.heroBanner.count()) + 1);

    const banner = await prisma.heroBanner.create({
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
  } catch (error: any) {
    console.error('createHeroBanner error:', error);
    res.status(500).json({ message: error.message || 'Error creating hero banner' });
  }
};

export const updateHeroBanner = async (req: AuthRequest, res: Response) => {
  try {
    await ensureHeroBannerTableExists();
    const { id } = req.params;
    const existing = await prisma.heroBanner.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Hero banner not found' });
    }

    const {
      title,
      subtitle,
      description,
      primaryCtaText,
      primaryCtaLink,
      secondaryCtaText,
      secondaryCtaLink,
      productType,
      imageAlt,
      isActive,
      displayOrder,
    } = req.body;

    let imagePath = existing.imagePath;
    let mobileImagePath = existing.mobileImagePath;

    const desktopImg = extractFile(req, 'desktopImage', ['file', 'files', 'image']);
    if (desktopImg) {
      const newPath = saveUploadedFile(desktopImg, 'desktop');
      await deleteFileIfUnreferenced(existing.imagePath);
      imagePath = newPath;
    } else if (req.body.imagePath && req.body.imagePath !== existing.imagePath) {
      imagePath = req.body.imagePath;
    }

    const mobileImg = extractFile(req, 'mobileImage', ['mobileFile', 'mobile']);
    if (mobileImg) {
      const newMobilePath = saveUploadedFile(mobileImg, 'mobile');
      await deleteFileIfUnreferenced(existing.mobileImagePath);
      mobileImagePath = newMobilePath;
    } else if (req.body.mobileImagePath !== undefined) {
      mobileImagePath = req.body.mobileImagePath;
    }

    const updated = await prisma.heroBanner.update({
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
  } catch (error: any) {
    console.error('updateHeroBanner error:', error);
    res.status(500).json({ message: error.message || 'Error updating hero banner' });
  }
};

export const deleteHeroBanner = async (req: AuthRequest, res: Response) => {
  try {
    await ensureHeroBannerTableExists();
    const { id } = req.params;
    const banner = await prisma.heroBanner.findUnique({ where: { id } });
    if (!banner) {
      return res.status(404).json({ message: 'Hero banner not found' });
    }

    await prisma.heroBanner.delete({ where: { id } });
    await deleteFileIfUnreferenced(banner.imagePath);
    await deleteFileIfUnreferenced(banner.mobileImagePath);

    res.json({ message: 'Hero banner deleted successfully' });
  } catch (error) {
    console.error('deleteHeroBanner error:', error);
    res.status(500).json({ message: 'Error deleting hero banner' });
  }
};

export const reorderHeroBanners = async (req: AuthRequest, res: Response) => {
  try {
    await ensureHeroBannerTableExists();
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ message: 'orderedIds array is required' });
    }

    for (let i = 0; i < orderedIds.length; i++) {
      await prisma.heroBanner.update({
        where: { id: orderedIds[i] },
        data: { displayOrder: i + 1 },
      });
    }

    res.json({ message: 'Hero banners reordered successfully' });
  } catch (error) {
    console.error('reorderHeroBanners error:', error);
    res.status(500).json({ message: 'Error reordering hero banners' });
  }
};

export const uploadHeroBannerImage = async (req: AuthRequest, res: Response) => {
  try {
    const file = extractFile(req, 'file', ['files', 'image', 'desktopImage', 'mobileImage']);
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const relativePath = saveUploadedFile(file, 'hero_img');
    res.json({ url: relativePath, path: relativePath });
  } catch (error: any) {
    console.error('uploadHeroBannerImage error:', error);
    res.status(400).json({ message: error.message || 'Error uploading hero image' });
  }
};
