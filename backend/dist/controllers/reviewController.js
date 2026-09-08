"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.createReview = exports.getAdminReviews = exports.getPublicReviews = void 0;
const seedService_1 = require("../services/seedService");
const prisma_1 = __importDefault(require("../prisma"));
const getPublicReviews = async (req, res) => {
    try {
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
        await (0, seedService_1.ensureStorefrontCmsSeeded)();
        const reviews = await prisma_1.default.homepageReview.findMany({
            orderBy: { sortOrder: 'asc' },
        });
        res.json(reviews);
    }
    catch (error) {
        console.error('getAdminReviews error:', error);
        res.status(500).json({ message: 'Error fetching reviews' });
    }
};
exports.getAdminReviews = getAdminReviews;
const createReview = async (req, res) => {
    try {
        const { customerName, rating, reviewText, customerImage, location, reviewDate, sortOrder, isActive } = req.body;
        if (!customerName || !reviewText) {
            return res.status(400).json({ message: 'Customer Name and Review Text are required' });
        }
        const review = await prisma_1.default.homepageReview.create({
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
        const { customerName, rating, reviewText, customerImage, location, reviewDate, sortOrder, isActive } = req.body;
        const review = await prisma_1.default.homepageReview.update({
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
        await prisma_1.default.homepageReview.delete({ where: { id } });
        res.json({ message: 'Review deleted successfully' });
    }
    catch (error) {
        console.error('deleteReview error:', error);
        res.status(500).json({ message: 'Error deleting review' });
    }
};
exports.deleteReview = deleteReview;
