import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../prisma';

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

    await prisma.media.delete({ where: { id } });
    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.error('deleteMedia error:', error);
    res.status(500).json({ message: 'Error deleting media' });
  }
};
