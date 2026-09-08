"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDiamondFilterOption = exports.updateDiamondFilterOption = exports.createDiamondFilterOption = exports.updateDiamondFilterGroup = exports.getDiamondFilters = void 0;
const seedService_1 = require("../services/seedService");
const prisma_1 = __importDefault(require("../prisma"));
const getDiamondFilters = async (req, res) => {
    try {
        await (0, seedService_1.ensureStorefrontCmsSeeded)();
        const includeDisabled = req.query.includeDisabled === 'true';
        const configs = await prisma_1.default.diamondFilterConfig.findMany({
            where: includeDisabled ? {} : { isEnabled: true },
            include: {
                options: {
                    where: includeDisabled ? {} : { isEnabled: true },
                    orderBy: { sortOrder: 'asc' },
                },
            },
            orderBy: { sortOrder: 'asc' },
        });
        res.json(configs);
    }
    catch (error) {
        console.error('getDiamondFilters error:', error);
        res.status(500).json({ message: 'Error fetching diamond filter configurations' });
    }
};
exports.getDiamondFilters = getDiamondFilters;
const updateDiamondFilterGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, sortOrder, isEnabled, configJson } = req.body;
        const group = await prisma_1.default.diamondFilterConfig.update({
            where: { id },
            data: {
                ...(title !== undefined ? { title } : {}),
                ...(sortOrder !== undefined ? { sortOrder: Number(sortOrder) } : {}),
                ...(isEnabled !== undefined ? { isEnabled: Boolean(isEnabled) } : {}),
                ...(configJson !== undefined ? { configJson: typeof configJson === 'object' ? JSON.stringify(configJson) : String(configJson) } : {}),
            },
            include: { options: { orderBy: { sortOrder: 'asc' } } },
        });
        res.json(group);
    }
    catch (error) {
        console.error('updateDiamondFilterGroup error:', error);
        res.status(500).json({ message: 'Error updating diamond filter group' });
    }
};
exports.updateDiamondFilterGroup = updateDiamondFilterGroup;
const createDiamondFilterOption = async (req, res) => {
    try {
        const { configId, label, value, iconUrl, colorHex, sortOrder, isEnabled } = req.body;
        if (!configId || !label || !value) {
            return res.status(400).json({ message: 'Config ID, Label, and Value are required' });
        }
        const option = await prisma_1.default.diamondFilterOption.create({
            data: {
                configId,
                label,
                value,
                iconUrl: iconUrl || null,
                colorHex: colorHex || null,
                sortOrder: sortOrder ? Number(sortOrder) : 0,
                isEnabled: isEnabled !== undefined ? Boolean(isEnabled) : true,
            },
        });
        res.json(option);
    }
    catch (error) {
        console.error('createDiamondFilterOption error:', error);
        res.status(500).json({ message: 'Error creating diamond filter option' });
    }
};
exports.createDiamondFilterOption = createDiamondFilterOption;
const updateDiamondFilterOption = async (req, res) => {
    try {
        const { id } = req.params;
        const { label, value, iconUrl, colorHex, sortOrder, isEnabled } = req.body;
        const option = await prisma_1.default.diamondFilterOption.update({
            where: { id },
            data: {
                ...(label !== undefined ? { label } : {}),
                ...(value !== undefined ? { value } : {}),
                ...(iconUrl !== undefined ? { iconUrl } : {}),
                ...(colorHex !== undefined ? { colorHex } : {}),
                ...(sortOrder !== undefined ? { sortOrder: Number(sortOrder) } : {}),
                ...(isEnabled !== undefined ? { isEnabled: Boolean(isEnabled) } : {}),
            },
        });
        res.json(option);
    }
    catch (error) {
        console.error('updateDiamondFilterOption error:', error);
        res.status(500).json({ message: 'Error updating diamond filter option' });
    }
};
exports.updateDiamondFilterOption = updateDiamondFilterOption;
const deleteDiamondFilterOption = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.diamondFilterOption.delete({ where: { id } });
        res.json({ message: 'Diamond filter option deleted successfully' });
    }
    catch (error) {
        console.error('deleteDiamondFilterOption error:', error);
        res.status(500).json({ message: 'Error deleting diamond filter option' });
    }
};
exports.deleteDiamondFilterOption = deleteDiamondFilterOption;
