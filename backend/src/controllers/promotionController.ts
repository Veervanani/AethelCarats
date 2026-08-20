import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../prisma';

export const getPromotions = async (req: Request, res: Response) => {
  try {
    const type = req.query.type as string; // ANNOUNCEMENT, HERO_SLIDE, PROMO_BANNER, POPUP
    const includeInactive = req.query.includeInactive === 'true';

    const whereClause: any = {};
    if (!includeInactive) {
      whereClause.isActive = true;
    }
    if (type && type !== 'ALL') {
      whereClause.type = type;
    }

    const promotions = await prisma.promotion.findMany({
      where: whereClause,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });

    res.json(promotions);
  } catch (error) {
    console.error('getPromotions error:', error);
    res.status(500).json({ message: 'Error fetching promotions' });
  }
};

export const createPromotion = async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      type,
      heading,
      subheading,
      description,
      imageUrl,
      mobileImageUrl,
      videoUrl,
      buttonText,
      buttonUrl,
      linkUrl,
      backgroundColor,
      textColor,
      startDate,
      endDate,
      isActive,
      sortOrder,
    } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Promotion Title is required' });
    }

    const promotion = await prisma.promotion.create({
      data: {
        title,
        type: type || 'PROMO_BANNER',
        heading: heading || null,
        subheading: subheading || null,
        description: description || null,
        imageUrl: imageUrl || null,
        mobileImageUrl: mobileImageUrl || null,
        videoUrl: videoUrl || null,
        buttonText: buttonText || null,
        buttonUrl: buttonUrl || null,
        linkUrl: linkUrl || null,
        backgroundColor: backgroundColor || null,
        textColor: textColor || null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
        sortOrder: sortOrder ? Number(sortOrder) : 0,
      },
    });

    res.json(promotion);
  } catch (error) {
    console.error('createPromotion error:', error);
    res.status(500).json({ message: 'Error creating promotion' });
  }
};

export const updatePromotion = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      type,
      heading,
      subheading,
      description,
      imageUrl,
      mobileImageUrl,
      videoUrl,
      buttonText,
      buttonUrl,
      linkUrl,
      backgroundColor,
      textColor,
      startDate,
      endDate,
      isActive,
      sortOrder,
    } = req.body;

    const promotion = await prisma.promotion.update({
      where: { id },
      data: {
        ...(title ? { title } : {}),
        ...(type ? { type } : {}),
        ...(heading !== undefined ? { heading } : {}),
        ...(subheading !== undefined ? { subheading } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(imageUrl !== undefined ? { imageUrl } : {}),
        ...(mobileImageUrl !== undefined ? { mobileImageUrl } : {}),
        ...(videoUrl !== undefined ? { videoUrl } : {}),
        ...(buttonText !== undefined ? { buttonText } : {}),
        ...(buttonUrl !== undefined ? { buttonUrl } : {}),
        ...(linkUrl !== undefined ? { linkUrl } : {}),
        ...(backgroundColor !== undefined ? { backgroundColor } : {}),
        ...(textColor !== undefined ? { textColor } : {}),
        ...(startDate !== undefined ? { startDate: startDate ? new Date(startDate) : null } : {}),
        ...(endDate !== undefined ? { endDate: endDate ? new Date(endDate) : null } : {}),
        ...(isActive !== undefined ? { isActive: Boolean(isActive) } : {}),
        ...(sortOrder !== undefined ? { sortOrder: Number(sortOrder) } : {}),
      },
    });

    res.json(promotion);
  } catch (error) {
    console.error('updatePromotion error:', error);
    res.status(500).json({ message: 'Error updating promotion' });
  }
};

export const deletePromotion = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.promotion.delete({ where: { id } });
    res.json({ message: 'Promotion deleted successfully' });
  } catch (error) {
    console.error('deletePromotion error:', error);
    res.status(500).json({ message: 'Error deleting promotion' });
  }
};
