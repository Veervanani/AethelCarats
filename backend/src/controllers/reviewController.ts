import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { ensureStorefrontCmsSeeded } from '../services/seedService';
import prisma from '../prisma';

export const getPublicReviews = async (req: Request, res: Response) => {
  try {
    await ensureStorefrontCmsSeeded();
    const reviews = await (prisma as any).homepageReview.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    res.json(reviews);
  } catch (error) {
    console.error('getPublicReviews error:', error);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};

export const getAdminReviews = async (req: AuthRequest, res: Response) => {
  try {
    await ensureStorefrontCmsSeeded();
    const reviews = await (prisma as any).homepageReview.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    res.json(reviews);
  } catch (error) {
    console.error('getAdminReviews error:', error);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};

export const createReview = async (req: AuthRequest, res: Response) => {
  try {
    const { customerName, rating, reviewText, customerImage, location, reviewDate, sortOrder, isActive } = req.body;
    if (!customerName || !reviewText) {
      return res.status(400).json({ message: 'Customer Name and Review Text are required' });
    }

    const review = await (prisma as any).homepageReview.create({
      data: {
        customerName,
        rating: rating || 5,
        reviewText,
        customerImage: customerImage || null,
        location: location || null,
        reviewDate: reviewDate || new Date().toISOString().split('T')[0],
        sortOrder: sortOrder || 0,
        isActive: isActive !== false,
      },
    });

    res.status(210).json(review);
  } catch (error) {
    console.error('createReview error:', error);
    res.status(500).json({ message: 'Error creating review' });
  }
};

export const updateReview = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { customerName, rating, reviewText, customerImage, location, reviewDate, sortOrder, isActive } = req.body;

    const review = await (prisma as any).homepageReview.update({
      where: { id },
      data: {
        customerName,
        rating,
        reviewText,
        customerImage,
        location,
        reviewDate,
        sortOrder,
        isActive,
      },
    });

    res.json(review);
  } catch (error) {
    console.error('updateReview error:', error);
    res.status(500).json({ message: 'Error updating review' });
  }
};

export const deleteReview = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await (prisma as any).homepageReview.delete({ where: { id } });
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('deleteReview error:', error);
    res.status(500).json({ message: 'Error deleting review' });
  }
};
