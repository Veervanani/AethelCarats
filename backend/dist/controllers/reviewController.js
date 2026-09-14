"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllReviews = exports.deleteReview = exports.updateReview = exports.createReview = exports.getAdminReviews = exports.getPublicReviews = void 0;
const seedService_1 = require("../services/seedService");
const prisma_1 = __importDefault(require("../prisma"));
const getPublicReviews = async (req, res) => {
    try {
        const { productId } = req.query;
        if (productId) {
            const pQuery = String(productId).trim();
            let targetProductId = pQuery;
            const prod = await prisma_1.default.product.findFirst({
                where: { OR: [{ id: pQuery }, { slug: pQuery }, { sku: pQuery }] },
                select: { id: true, name: true, title: true }
            });
            if (prod) {
                targetProductId = prod.id;
            }
            const reviews = await prisma_1.default.review.findMany({
                where: { productId: targetProductId, isApproved: true },
                orderBy: { createdAt: 'desc' },
            });
            const mapped = reviews.map((r) => {
                const comment = r.comment || '';
                let title = '';
                let text = comment;
                if (comment.includes('\n\n')) {
                    const parts = comment.split('\n\n');
                    title = parts[0];
                    text = parts.slice(1).join('\n\n');
                }
                else if (comment.includes('\n')) {
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
            const siteSetting = await prisma_1.default.siteSetting.findUnique({
                where: { key: 'homepage_config' }
            });
            if (siteSetting && siteSetting.value) {
                const parsed = JSON.parse(siteSetting.value);
                const customRevs = parsed?.reviewsConfig?.customReviews || parsed?.customReviews;
                if (Array.isArray(customRevs) && customRevs.length > 0) {
                    return res.json(customRevs.map((r, idx) => ({
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
        }
        catch (e) { }
        await (0, seedService_1.ensureStorefrontCmsSeeded)();
        const reviews = await prisma_1.default.homepageReview.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
        });
        res.json(reviews);
    }
    catch (error) {
        console.error('getPublicReviews error:', error);
        res.status(500).json({ message: 'Error fetching reviews' });
    }
};
exports.getPublicReviews = getPublicReviews;
const getAdminReviews = async (req, res) => {
    try {
        const { productId } = req.query;
        const where = {};
        if (productId) {
            where.productId = String(productId).trim();
        }
        const reviews = await prisma_1.default.review.findMany({
            where,
            include: {
                product: {
                    select: { id: true, name: true, title: true, slug: true, mainImage: true }
                }
            },
            orderBy: { createdAt: 'desc' },
        });
        const formatted = reviews.map((r) => {
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
    }
    catch (error) {
        console.error('getAdminReviews error:', error);
        res.status(500).json({ message: 'Error fetching reviews' });
    }
};
exports.getAdminReviews = getAdminReviews;
const createReview = async (req, res) => {
    try {
        const { productId, author, customerName, rating, title, comment, reviewText, isApproved, isFeatured, email, } = req.body;
        if (productId) {
            const pQuery = String(productId).trim();
            let targetProductId = pQuery;
            const prod = await prisma_1.default.product.findFirst({
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
            const newReview = await prisma_1.default.review.create({
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
        const hpReview = await prisma_1.default.homepageReview.create({
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
    }
    catch (error) {
        console.error('createReview error:', error);
        res.status(500).json({ message: 'Error creating review' });
    }
};
exports.createReview = createReview;
const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { author, customerName, rating, title, comment, reviewText, isApproved, isFeatured, productId, customerImage, location, reviewDate, sortOrder, isActive, } = req.body;
        // Check if review exists in Review table
        const existingProdReview = await prisma_1.default.review.findUnique({ where: { id } });
        if (existingProdReview) {
            let fullComment = comment !== undefined ? String(comment).trim() : existingProdReview.comment;
            if (title && !fullComment.includes(title)) {
                fullComment = `${title}\n\n${fullComment}`;
            }
            const updated = await prisma_1.default.review.update({
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
        const updatedHp = await prisma_1.default.homepageReview.update({
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
    }
    catch (error) {
        console.error('updateReview error:', error);
        res.status(500).json({ message: 'Error updating review' });
    }
};
exports.updateReview = updateReview;
const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        try {
            await prisma_1.default.review.delete({ where: { id } });
            return res.json({ message: 'Review deleted successfully' });
        }
        catch (e) {
            // Try homepageReview
            await prisma_1.default.homepageReview.delete({ where: { id } });
            return res.json({ message: 'Homepage review deleted successfully' });
        }
    }
    catch (error) {
        console.error('deleteReview error:', error);
        res.status(500).json({ message: 'Error deleting review' });
    }
};
exports.deleteReview = deleteReview;
const deleteAllReviews = async (req, res) => {
    try {
        const result = await prisma_1.default.review.deleteMany({});
        res.json({ success: true, message: `All customer reviews deleted successfully! (${result.count} reviews removed)`, deletedCount: result.count });
    }
    catch (error) {
        console.error('deleteAllReviews error:', error);
        res.status(500).json({ message: 'Error deleting all reviews' });
    }
};
exports.deleteAllReviews = deleteAllReviews;
