"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSalesTarget = exports.createSalesTarget = exports.getSalesTargets = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const getSalesTargets = async (req, res) => {
    try {
        const employeeId = req.query.employeeId || '';
        const periodYear = req.query.year ? Number(req.query.year) : new Date().getFullYear();
        const where = {};
        if (employeeId && employeeId !== 'ALL') {
            where.employeeId = employeeId;
        }
        if (periodYear) {
            where.periodYear = periodYear;
        }
        const targets = await prisma_1.default.salesTarget.findMany({
            where,
            orderBy: { startDate: 'desc' },
            include: {
                employee: { select: { id: true, fullName: true, employeeCode: true, department: true } },
            },
        });
        // Calculate actual sales for each target period
        const targetsWithAchievement = await Promise.all(targets.map(async (t) => {
            const sales = await prisma_1.default.internalSale.aggregate({
                where: {
                    employeeId: t.employeeId,
                    saleDate: { gte: t.startDate, lte: t.endDate },
                },
                _sum: { finalSaleAmount: true },
                _count: { id: true },
            });
            const actualSales = sales._sum.finalSaleAmount || 0;
            const achievementPercent = t.targetAmount > 0 ? Number(((actualSales / t.targetAmount) * 100).toFixed(1)) : 0;
            return {
                ...t,
                actualSales,
                orderCount: sales._count.id || 0,
                achievementPercent,
                remaining: Math.max(0, t.targetAmount - actualSales),
            };
        }));
        return res.json(targetsWithAchievement);
    }
    catch (error) {
        console.error('getSalesTargets error:', error);
        return res.status(500).json({ message: 'Error fetching sales targets', error: error.message });
    }
};
exports.getSalesTargets = getSalesTargets;
const createSalesTarget = async (req, res) => {
    try {
        const { employeeId, periodType = 'MONTHLY', periodYear = new Date().getFullYear(), periodMonth, periodQuarter, targetAmount = 0, startDate, endDate, notes, } = req.body;
        if (!employeeId || !targetAmount) {
            return res.status(400).json({ message: 'Employee ID and Target amount are required.' });
        }
        let start = startDate ? new Date(startDate) : new Date();
        let end = endDate ? new Date(endDate) : new Date();
        if (!startDate || !endDate) {
            if (periodType === 'MONTHLY' && periodMonth) {
                start = new Date(Date.UTC(periodYear, periodMonth - 1, 1, 0, 0, 0));
                end = new Date(Date.UTC(periodYear, periodMonth, 0, 23, 59, 59, 999));
            }
            else if (periodType === 'YEARLY') {
                start = new Date(Date.UTC(periodYear, 0, 1, 0, 0, 0));
                end = new Date(Date.UTC(periodYear, 11, 31, 23, 59, 59, 999));
            }
        }
        const target = await prisma_1.default.salesTarget.create({
            data: {
                employeeId,
                periodType,
                periodYear: Number(periodYear),
                periodMonth: periodMonth ? Number(periodMonth) : null,
                periodQuarter: periodQuarter ? Number(periodQuarter) : null,
                targetAmount: Number(targetAmount),
                startDate: start,
                endDate: end,
                notes: notes ? notes.trim() : null,
            },
        });
        return res.status(201).json(target);
    }
    catch (error) {
        console.error('createSalesTarget error:', error);
        return res.status(500).json({ message: 'Failed to create sales target', error: error.message });
    }
};
exports.createSalesTarget = createSalesTarget;
const updateSalesTarget = async (req, res) => {
    try {
        const { id } = req.params;
        const { targetAmount, notes, status } = req.body;
        const updated = await prisma_1.default.salesTarget.update({
            where: { id },
            data: {
                targetAmount: targetAmount !== undefined ? Number(targetAmount) : undefined,
                notes: notes !== undefined ? notes : undefined,
                status: status || undefined,
            },
        });
        return res.json(updated);
    }
    catch (error) {
        console.error('updateSalesTarget error:', error);
        return res.status(500).json({ message: 'Failed to update sales target', error: error.message });
    }
};
exports.updateSalesTarget = updateSalesTarget;
