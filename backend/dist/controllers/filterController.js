"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFilterOption = exports.updateFilterOption = exports.createFilterOption = exports.deleteFilterConfig = exports.updateFilterConfig = exports.createFilterConfig = exports.getAdminFilters = exports.getPublicFilters = void 0;
const seedFilterConfigs_1 = require("../seedFilterConfigs");
const prisma_1 = __importDefault(require("../prisma"));
// GET /api/v1/filters (Public API)
const getPublicFilters = async (req, res) => {
    try {
        const { category, jewelleryType } = req.query;
        const activeCategory = (jewelleryType || category || 'All');
        let filterConfigs = await prisma_1.default.productFilterConfig.findMany({
            where: { isEnabled: true },
            include: {
                options: {
                    where: { isEnabled: true },
                    orderBy: { sortOrder: 'asc' },
                },
            },
            orderBy: { sortOrder: 'asc' },
        });
        if (filterConfigs.length < 12) {
            await (0, seedFilterConfigs_1.seedFilterConfigs)();
            filterConfigs = await prisma_1.default.productFilterConfig.findMany({
                where: { isEnabled: true },
                include: {
                    options: {
                        where: { isEnabled: true },
                        orderBy: { sortOrder: 'asc' },
                    },
                },
                orderBy: { sortOrder: 'asc' },
            });
        }
        const targetLower = activeCategory.toLowerCase();
        const relevantFilters = filterConfigs
            .filter((f) => {
            if (!f.applicableJewelleryTypes || f.applicableJewelleryTypes === 'All')
                return true;
            if (targetLower === 'all' || !targetLower)
                return true;
            const appTypes = f.applicableJewelleryTypes.toLowerCase();
            return appTypes.includes(targetLower) || (targetLower.includes('ring') && appTypes.includes('ring'));
        })
            .map((f) => {
            const relevantOptions = f.options.filter((opt) => {
                if (!opt.applicableJewelleryTypes || opt.applicableJewelleryTypes === 'All')
                    return true;
                if (targetLower === 'all' || !targetLower)
                    return true;
                const optTypes = opt.applicableJewelleryTypes.toLowerCase();
                return optTypes.includes(targetLower) || (targetLower.includes('ring') && optTypes.includes('ring'));
            });
            return {
                ...f,
                options: relevantOptions,
            };
        })
            .filter((f) => f.options.length > 0 || f.filterType === 'Price Range' || f.key === 'price');
        res.json({ filters: relevantFilters });
    }
    catch (error) {
        console.warn('getPublicFilters database warning (returning fallback empty filters):', error);
        res.json({ filters: [] });
    }
};
exports.getPublicFilters = getPublicFilters;
// GET /api/v1/admin/filters (Admin API)
const getAdminFilters = async (req, res) => {
    try {
        let filterConfigs = await prisma_1.default.productFilterConfig.findMany({
            include: {
                options: {
                    orderBy: { sortOrder: 'asc' },
                },
            },
            orderBy: { sortOrder: 'asc' },
        });
        if (filterConfigs.length < 12) {
            await (0, seedFilterConfigs_1.seedFilterConfigs)();
            filterConfigs = await prisma_1.default.productFilterConfig.findMany({
                include: {
                    options: {
                        orderBy: { sortOrder: 'asc' },
                    },
                },
                orderBy: { sortOrder: 'asc' },
            });
        }
        res.json({ filters: filterConfigs });
    }
    catch (error) {
        console.error('getAdminFilters error:', error);
        res.status(500).json({ message: 'Error retrieving admin filter configurations.' });
    }
};
exports.getAdminFilters = getAdminFilters;
// POST /api/v1/admin/filters
const createFilterConfig = async (req, res) => {
    try {
        const { key, name, customerLabel, filterType, sortOrder, isEnabled, applicableJewelleryTypes, configJson, options } = req.body;
        const filterKey = key || name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
        const createdFilter = await prisma_1.default.productFilterConfig.create({
            data: {
                key: filterKey,
                name,
                customerLabel: customerLabel || name,
                filterType: filterType || 'Multi Select',
                sortOrder: sortOrder || 0,
                isEnabled: isEnabled !== undefined ? Boolean(isEnabled) : true,
                applicableJewelleryTypes: applicableJewelleryTypes || 'All',
                configJson: typeof configJson === 'object' ? JSON.stringify(configJson) : configJson,
                options: {
                    create: (options || []).map((opt, idx) => ({
                        label: opt.label,
                        value: opt.value || opt.label,
                        iconUrl: opt.iconUrl || null,
                        colorHex: opt.colorHex || null,
                        applicableJewelleryTypes: opt.applicableJewelleryTypes || 'All',
                        sortOrder: opt.sortOrder !== undefined ? opt.sortOrder : idx,
                        isEnabled: opt.isEnabled !== undefined ? Boolean(opt.isEnabled) : true,
                    })),
                },
            },
            include: { options: true },
        });
        res.status(201).json(createdFilter);
    }
    catch (error) {
        console.error('createFilterConfig error:', error);
        res.status(400).json({ message: error.message || 'Error creating filter configuration.' });
    }
};
exports.createFilterConfig = createFilterConfig;
// PUT /api/v1/admin/filters/:id
const updateFilterConfig = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, customerLabel, filterType, sortOrder, isEnabled, applicableJewelleryTypes, configJson } = req.body;
        const updatedFilter = await prisma_1.default.productFilterConfig.update({
            where: { id },
            data: {
                ...(name !== undefined && { name }),
                ...(customerLabel !== undefined && { customerLabel }),
                ...(filterType !== undefined && { filterType }),
                ...(sortOrder !== undefined && { sortOrder: parseInt(sortOrder, 10) }),
                ...(isEnabled !== undefined && { isEnabled: Boolean(isEnabled) }),
                ...(applicableJewelleryTypes !== undefined && { applicableJewelleryTypes }),
                ...(configJson !== undefined && { configJson: typeof configJson === 'object' ? JSON.stringify(configJson) : configJson }),
            },
            include: { options: true },
        });
        res.json(updatedFilter);
    }
    catch (error) {
        console.error('updateFilterConfig error:', error);
        res.status(400).json({ message: error.message || 'Error updating filter configuration.' });
    }
};
exports.updateFilterConfig = updateFilterConfig;
// DELETE /api/v1/admin/filters/:id
const deleteFilterConfig = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.productFilterConfig.delete({ where: { id } });
        res.json({ message: 'Filter deleted successfully.' });
    }
    catch (error) {
        console.error('deleteFilterConfig error:', error);
        res.status(400).json({ message: error.message || 'Error deleting filter configuration.' });
    }
};
exports.deleteFilterConfig = deleteFilterConfig;
// POST /api/v1/admin/filters/:id/options
const createFilterOption = async (req, res) => {
    try {
        const { id } = req.params;
        const { label, value, iconUrl, colorHex, sortOrder, isEnabled, applicableJewelleryTypes } = req.body;
        const createdOption = await prisma_1.default.productFilterOption.create({
            data: {
                filterId: id,
                label,
                value: value || label,
                iconUrl: iconUrl || null,
                colorHex: colorHex || null,
                applicableJewelleryTypes: applicableJewelleryTypes || 'All',
                sortOrder: sortOrder || 0,
                isEnabled: isEnabled !== undefined ? Boolean(isEnabled) : true,
            },
        });
        res.status(201).json(createdOption);
    }
    catch (error) {
        console.error('createFilterOption error:', error);
        res.status(400).json({ message: error.message || 'Error creating filter option.' });
    }
};
exports.createFilterOption = createFilterOption;
// PUT /api/v1/admin/filters/options/:optionId
const updateFilterOption = async (req, res) => {
    try {
        const { optionId } = req.params;
        const { label, value, iconUrl, colorHex, sortOrder, isEnabled, applicableJewelleryTypes } = req.body;
        const updatedOption = await prisma_1.default.productFilterOption.update({
            where: { id: optionId },
            data: {
                ...(label !== undefined && { label }),
                ...(value !== undefined && { value }),
                ...(iconUrl !== undefined && { iconUrl }),
                ...(colorHex !== undefined && { colorHex }),
                ...(applicableJewelleryTypes !== undefined && { applicableJewelleryTypes }),
                ...(sortOrder !== undefined && { sortOrder: parseInt(sortOrder, 10) }),
                ...(isEnabled !== undefined && { isEnabled: Boolean(isEnabled) }),
            },
        });
        res.json(updatedOption);
    }
    catch (error) {
        console.error('updateFilterOption error:', error);
        res.status(400).json({ message: error.message || 'Error updating filter option.' });
    }
};
exports.updateFilterOption = updateFilterOption;
// DELETE /api/v1/admin/filters/options/:optionId
const deleteFilterOption = async (req, res) => {
    try {
        const { optionId } = req.params;
        await prisma_1.default.productFilterOption.delete({ where: { id: optionId } });
        res.json({ message: 'Option deleted successfully.' });
    }
    catch (error) {
        console.error('deleteFilterOption error:', error);
        res.status(400).json({ message: error.message || 'Error deleting filter option.' });
    }
};
exports.deleteFilterOption = deleteFilterOption;
