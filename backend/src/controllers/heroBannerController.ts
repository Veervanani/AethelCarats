import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../prisma';
import fs from 'fs';
import path from 'path';

const UPLOADS_DIR = path.join(process.cwd(), 'uploads', 'hero-banners');
const PUBLIC_UPLOADS_DIR = path.join(process.cwd(), 'frontend', 'public', 'uploads', 'hero-banners');

const ensureUploadDirsExist = () => {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
  if (!fs.existsSync(PUBLIC_UPLOADS_DIR)) {
    fs.mkdirSync(PUBLIC_UPLOADS_DIR, { recursive: true });
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
  const targetPath = path.join(UPLOADS_DIR, safeName);
  const publicTargetPath = path.join(PUBLIC_UPLOADS_DIR, safeName);

  fs.writeFileSync(targetPath, file.buffer);
  fs.writeFileSync(publicTargetPath, file.buffer);

  return `/uploads/hero-banners/${safeName}`;
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
      const p1 = path.join(UPLOADS_DIR, filename);
      const p2 = path.join(PUBLIC_UPLOADS_DIR, filename);
      if (fs.existsSync(p1)) fs.unlinkSync(p1);
      if (fs.existsSync(p2)) fs.unlinkSync(p2);
    }
  } catch (err) {
    console.error('Error cleaning up hero image file:', err);
  }
};

export const getPublicHeroBanners = async (req: Request, res: Response) => {
  try {
    let banners = await prisma.heroBanner.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
    });

    if (banners.length === 0) {
      const defaultSlides = [
        {
          title: "Handcrafted\nElegance &\nExceptional\nDiamonds",
          subtitle: 'THE SIGNATURE COLLECTION 2026',
          description: 'Immerse yourself in world-class craftsmanship, exceptional diamonds, and timeless bespoke creations.',
          primaryCtaText: 'EXPLORE RINGS',
          primaryCtaLink: '/rings',
          secondaryCtaText: 'THE DIAMOND VAULT →',
          secondaryCtaLink: '/diamonds',
          productType: 'Engagement Ring',
          imagePath: '/assets/Engagement Ring.png',
          mobileImagePath: '/assets/Engagement Ring Mobile.png',
          imageAlt: 'Handcrafted Solitaire Diamond Engagement Ring',
          isActive: true,
          displayOrder: 1,
        },
        {
          title: "Timeless\nDiamonds,\nRefined\nForever",
          subtitle: 'THE ART OF HIGH JEWELRY',
          description: 'Discover exquisite diamond necklaces crafted with precision, elegance, and an uncompromising eye for detail.',
          primaryCtaText: 'EXPLORE NECKLACES',
          primaryCtaLink: '/necklaces',
          secondaryCtaText: 'VIEW COLLECTION →',
          secondaryCtaLink: '/collections/signature-collection',
          productType: 'Necklace',
          imagePath: '/assets/Necklace.png',
          mobileImagePath: '/assets/Necklace Mobile.png',
          imageAlt: 'Haute Joaillerie Diamond Necklace',
          isActive: true,
          displayOrder: 2,
        },
        {
          title: "Brilliance\nDesigned to\nBe Remembered",
          subtitle: 'THE SIGNATURE COLLECTION',
          description: 'Exceptional diamond earrings, thoughtfully crafted to bring understated brilliance to every occasion.',
          primaryCtaText: 'EXPLORE EARRINGS',
          primaryCtaLink: '/earrings',
          secondaryCtaText: 'DISCOVER DIAMONDS →',
          secondaryCtaLink: '/diamonds',
          productType: 'Earrings',
          imagePath: '/assets/Earrings.png',
          mobileImagePath: '/assets/Earrings Mobile.png',
          imageAlt: 'Brilliant Diamond Earrings',
          isActive: true,
          displayOrder: 3,
        },
        {
          title: "Exceptional\nCraftsmanship,\nWorn Forever",
          subtitle: 'BESPOKE DIAMOND JEWELRY',
          description: 'Discover refined diamond bracelets created with precision, timeless design, and exceptional craftsmanship.',
          primaryCtaText: 'EXPLORE BRACELETS',
          primaryCtaLink: '/bracelets',
          secondaryCtaText: 'CREATE YOUR OWN →',
          secondaryCtaLink: '/custom-jewellery',
          productType: 'Bracelet',
          imagePath: '/assets/Bracelet.png',
          mobileImagePath: '/assets/Bracelet Mobile.png',
          imageAlt: 'Bespoke Diamond Bracelet',
          isActive: true,
          displayOrder: 4,
        },
      ];

      for (const slide of defaultSlides) {
        await prisma.heroBanner.create({ data: slide });
      }

      banners = await prisma.heroBanner.findMany({
        where: { isActive: true },
        orderBy: { displayOrder: 'asc' },
      });
    }

    res.json(banners);
  } catch (error) {
    console.error('getPublicHeroBanners error:', error);
    res.status(500).json({ message: 'Error fetching hero banners' });
  }
};

export const getAdminHeroBanners = async (req: Request, res: Response) => {
  try {
    const banners = await prisma.heroBanner.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    res.json(banners);
  } catch (error) {
    console.error('getAdminHeroBanners error:', error);
    res.status(500).json({ message: 'Error fetching hero banners' });
  }
};

export const createHeroBanner = async (req: AuthRequest, res: Response) => {
  try {
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

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    if (files && files['desktopImage'] && files['desktopImage'][0]) {
      imagePath = saveUploadedFile(files['desktopImage'][0], 'desktop');
    }
    if (files && files['mobileImage'] && files['mobileImage'][0]) {
      mobileImagePath = saveUploadedFile(files['mobileImage'][0], 'mobile');
    }

    if (!imagePath) {
      return res.status(400).json({ message: 'Hero desktop image file is required' });
    }

    const nextOrder = displayOrder !== undefined ? Number(displayOrder) : ((await prisma.heroBanner.count()) + 1);

    const banner = await prisma.heroBanner.create({
      data: {
        title: title || 'Timeless Luxury Fine Jewellery',
        subtitle: subtitle || 'FLOKSY JEWEL ATELIER',
        description: description || '',
        primaryCtaText: primaryCtaText || 'EXPLORE COLLECTION',
        primaryCtaLink: primaryCtaLink || '/rings',
        secondaryCtaText: secondaryCtaText || '',
        secondaryCtaLink: secondaryCtaLink || '',
        productType: productType || 'Engagement Ring',
        imagePath,
        mobileImagePath: mobileImagePath || null,
        imageAlt: imageAlt || title || 'Floksy Jewel High Jewellery',
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

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    if (files && files['desktopImage'] && files['desktopImage'][0]) {
      const newPath = saveUploadedFile(files['desktopImage'][0], 'desktop');
      await deleteFileIfUnreferenced(existing.imagePath);
      imagePath = newPath;
    } else if (req.body.imagePath && req.body.imagePath !== existing.imagePath) {
      imagePath = req.body.imagePath;
    }

    if (files && files['mobileImage'] && files['mobileImage'][0]) {
      const newMobilePath = saveUploadedFile(files['mobileImage'][0], 'mobile');
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
    const file = req.file;
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
