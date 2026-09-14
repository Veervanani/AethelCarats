import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { ensureStorefrontCmsSeeded } from '../services/seedService';
import prisma from '../prisma';

export const getPublicReviews = async (req: Request, res: Response) => {
  try {
    const { productId } = req.query;

    if (productId) {
      const pQuery = String(productId).trim();
      let targetProductId = pQuery;
      const prod = await prisma.product.findFirst({
        where: { OR: [{ id: pQuery }, { slug: pQuery }, { sku: pQuery }] },
        select: { id: true, name: true, title: true }
      });
      if (prod) {
        targetProductId = prod.id;
      }

      const reviews = await prisma.review.findMany({
        where: { productId: targetProductId, isApproved: true },
        orderBy: { createdAt: 'desc' },
      });

      const mapped = reviews.map((r: any) => {
        const comment = r.comment || '';
        let title = '';
        let text = comment;
        if (comment.includes('\n\n')) {
          const parts = comment.split('\n\n');
          title = parts[0];
          text = parts.slice(1).join('\n\n');
        } else if (comment.includes('\n')) {
          const parts = comment.split('\n');
          title = parts[0];
          text = parts.slice(1).join('\n');
        }
        return {
          id: r.id,
          productId: r.productId,
          name: r.author,
          author: r.author,
          authorName: r.author,
          rating: r.rating,
          title: title || 'Exceeded Every Expectation!',
          text: text.trim() || comment,
          comment,
          verified: true,
          createdAt: r.createdAt,
          date: r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-US') : '18/08/2026',
          productReviewed: prod?.title || prod?.name || 'AethelCarats Atelier Creation',
          response: null,
        };
      });

      return res.json(mapped);
    }

    // Homepage reviews: check siteSetting first, then homepageReview table
    try {
      const siteSetting = await prisma.siteSetting.findUnique({
        where: { key: 'homepage_config' }
      });
      if (siteSetting && siteSetting.value) {
        const parsed = JSON.parse(siteSetting.value);
        const customRevs = parsed?.reviewsConfig?.customReviews || parsed?.customReviews;
        if (Array.isArray(customRevs) && customRevs.length > 0) {
          return res.json(customRevs.map((r: any, idx: number) => ({
            id: r.id || `hp_rev_${idx}`,
            name: r.author || 'Verified Client',
            author: r.author || 'Verified Client',
            authorName: r.author || 'Verified Client',
            rating: Number(r.rating) || 5,
            title: r.title || (r.text && r.text.length > 30 ? r.text.split('.')[0] : 'Exceeded Every Expectation!'),
            text: r.text || '',
            comment: r.text || '',
            verified: true,
            date: '18/08/2026',
            productReviewed: 'AethelCarats High Jewellery',
          })));
        }
      }
    } catch (e) {}

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
    const { productId } = req.query;

    const where: any = {};
    if (productId) {
      where.productId = String(productId).trim();
    }

    const reviews = await prisma.review.findMany({
      where,
      include: {
        product: {
          select: { id: true, name: true, title: true, slug: true, mainImage: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    });

    const formatted = reviews.map((r: any) => {
      const comment = r.comment || '';
      let title = '';
      let text = comment;
      if (comment.includes('\n\n')) {
        const parts = comment.split('\n\n');
        title = parts[0];
        text = parts.slice(1).join('\n\n');
      }
      return {
        id: r.id,
        productId: r.productId,
        productName: r.product?.title || r.product?.name || 'AethelCarats Creation',
        productSlug: r.product?.slug,
        productImage: r.product?.mainImage,
        author: r.author,
        name: r.author,
        rating: r.rating,
        title: title || 'Exceeded Every Expectation!',
        comment,
        text,
        isApproved: r.isApproved,
        isFeatured: r.isFeatured,
        createdAt: r.createdAt,
      };
    });

    res.json(formatted);
  } catch (error) {
    console.error('getAdminReviews error:', error);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const {
      productId,
      author,
      customerName,
      rating,
      title,
      comment,
      reviewText,
      isApproved,
      isFeatured,
      email,
    } = req.body;

    if (productId) {
      const pQuery = String(productId).trim();
      let targetProductId = pQuery;
      const prod = await prisma.product.findFirst({
        where: { OR: [{ id: pQuery }, { slug: pQuery }, { sku: pQuery }] },
        select: { id: true }
      });
      if (prod) {
        targetProductId = prod.id;
      }

      const authorName = (author || customerName || 'Verified Buyer').trim();
      let fullComment = (comment || reviewText || '').trim();
      if (title && !fullComment.includes(title)) {
        fullComment = `${title}\n\n${fullComment}`;
      }

      if (!authorName || !fullComment) {
        return res.status(400).json({ message: 'Author name and review comment are required' });
      }

      const newReview = await prisma.review.create({
        data: {
          productId: targetProductId,
          author: authorName,
          email: email || 'customer@aethelcarats.com',
          rating: Math.min(5, Math.max(1, Number(rating) || 5)),
          comment: fullComment,
          isApproved: isApproved !== false,
          isFeatured: Boolean(isFeatured),
        },
      });

      return res.status(201).json(newReview);
    }

    // Otherwise create homepage review
    const cName = customerName || author;
    const rText = reviewText || comment;
    if (!cName || !rText) {
      return res.status(400).json({ message: 'Customer Name and Review Text are required' });
    }

    const hpReview = await (prisma as any).homepageReview.create({
      data: {
        customerName: cName,
        rating: Math.min(5, Math.max(1, Number(rating) || 5)),
        reviewText: rText,
        customerImage: req.body.customerImage || null,
        location: req.body.location || null,
        reviewDate: req.body.reviewDate || new Date().toISOString().split('T')[0],
        sortOrder: Number(req.body.sortOrder) || 0,
        isActive: req.body.isActive !== false,
      },
    });

    res.status(201).json(hpReview);
  } catch (error) {
    console.error('createReview error:', error);
    res.status(500).json({ message: 'Error creating review' });
  }
};

export const updateReview = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const {
      author,
      customerName,
      rating,
      title,
      comment,
      reviewText,
      isApproved,
      isFeatured,
      productId,
      customerImage,
      location,
      reviewDate,
      sortOrder,
      isActive,
    } = req.body;

    // Check if review exists in Review table
    const existingProdReview = await prisma.review.findUnique({ where: { id } });
    if (existingProdReview) {
      let fullComment = comment !== undefined ? String(comment).trim() : existingProdReview.comment;
      if (title && !fullComment.includes(title)) {
        fullComment = `${title}\n\n${fullComment}`;
      }

      const updated = await prisma.review.update({
        where: { id },
        data: {
          author: author || customerName || existingProdReview.author,
          rating: rating !== undefined ? Math.min(5, Math.max(1, Number(rating))) : existingProdReview.rating,
          comment: fullComment,
          isApproved: isApproved !== undefined ? Boolean(isApproved) : existingProdReview.isApproved,
          isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : existingProdReview.isFeatured,
          ...(productId ? { productId: String(productId).trim() } : {}),
        },
      });
      return res.json(updated);
    }

    // Otherwise check homepageReview
    const updatedHp = await (prisma as any).homepageReview.update({
      where: { id },
      data: {
        customerName: customerName || author,
        rating: rating !== undefined ? Math.min(5, Math.max(1, Number(rating))) : undefined,
        reviewText: reviewText || comment,
        customerImage,
        location,
        reviewDate,
        sortOrder,
        isActive,
      },
    });

    res.json(updatedHp);
  } catch (error) {
    console.error('updateReview error:', error);
    res.status(500).json({ message: 'Error updating review' });
  }
};

export const deleteReview = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    try {
      await prisma.review.delete({ where: { id } });
      return res.json({ message: 'Review deleted successfully' });
    } catch (e) {
      // Try homepageReview
      await (prisma as any).homepageReview.delete({ where: { id } });
      return res.json({ message: 'Homepage review deleted successfully' });
    }
  } catch (error) {
    console.error('deleteReview error:', error);
    res.status(500).json({ message: 'Error deleting review' });
  }
};

export const deleteAllReviews = async (req: AuthRequest, res: Response) => {
  try {
    const result = await prisma.review.deleteMany({});
    res.json({ success: true, message: `All customer reviews deleted successfully! (${result.count} reviews removed)`, deletedCount: result.count });
  } catch (error) {
    console.error('deleteAllReviews error:', error);
    res.status(500).json({ message: 'Error deleting all reviews' });
  }
};
