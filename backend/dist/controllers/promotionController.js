"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePromotion = exports.updatePromotion = exports.createPromotion = exports.getPromotions = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const getPromotions = async (req, res) => {
    try {
        const type = req.query.type; // ANNOUNCEMENT, HERO_SLIDE, PROMO_BANNER, POPUP
        const includeInactive = req.query.includeInactive === 'true';
        const whereClause = {};
        if (!includeInactive) {
            whereClause.isActive = true;
        }
        if (type && type !== 'ALL') {
            whereClause.type = type;
        }
        const promotions = await prisma_1.default.promotion.findMany({
            where: whereClause,
            orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
        });
        res.json(promotions);
    }
    catch (error) {
        console.error('getPromotions error:', error);
        res.status(500).json({ message: 'Error fetching promotions' });
    }
};
exports.getPromotions = getPromotions;
const createPromotion = async (req, res) => {
    try {
        const { title, type, heading, subheading, description, imageUrl, mobileImageUrl, videoUrl, buttonText, buttonUrl, linkUrl, backgroundColor, textColor, startDate, endDate, isActive, sortOrder, } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Promotion Title is required' });
        }
        const promotion = await prisma_1.default.promotion.create({
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
    }
    catch (error) {
        console.error('createPromotion error:', error);
        res.status(500).json({ message: 'Error creating promotion' });
    }
};
exports.createPromotion = createPromotion;
const updatePromotion = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, type, heading, subheading, description, imageUrl, mobileImageUrl, videoUrl, buttonText, buttonUrl, linkUrl, backgroundColor, textColor, startDate, endDate, isActive, sortOrder, } = req.body;
        const promotion = await prisma_1.default.promotion.update({
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
    }
    catch (error) {
        console.error('updatePromotion error:', error);
        res.status(500).json({ message: 'Error updating promotion' });
    }
};
exports.updatePromotion = updatePromotion;
const deletePromotion = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.promotion.delete({ where: { id } });
        res.json({ message: 'Promotion deleted successfully' });
    }
    catch (error) {
        console.error('deletePromotion error:', error);
        res.status(500).json({ message: 'Error deleting promotion' });
    }
};
exports.deletePromotion = deletePromotion;
