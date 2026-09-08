"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommissionPlan = exports.createCommissionPlan = exports.getCommissionPlans = exports.payCommission = exports.approveCommission = exports.getCommissionsList = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const getCommissionsList = async (req, res) => {
    try {
        const status = req.query.status || '';
        const employeeId = req.query.employeeId || '';
        const dateFrom = req.query.dateFrom || '';
        const dateTo = req.query.dateTo || '';
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.max(1, Math.min(100, Number(req.query.limit) || 25));
        const skip = (page - 1) * limit;
        const where = {};
        // If logged in as Sales Employee, restrict to own commissions
        if (req.user && req.user.role === 'SALES_EMPLOYEE') {
            const emp = await prisma_1.default.employee.findFirst({
                where: { OR: [{ userId: req.user.id }, { email: req.user.email }] },
            });
            if (emp) {
                where.employeeId = emp.id;
            }
        }
        else if (employeeId && employeeId !== 'ALL') {
            where.employeeId = employeeId;
        }
        if (status && status !== 'ALL') {
            where.status = status;
        }
        if (dateFrom || dateTo) {
            where.createdAt = {};
            if (dateFrom)
                where.createdAt.gte = new Date(dateFrom);
            if (dateTo) {
                const end = new Date(dateTo);
                end.setUTCHours(23, 59, 59, 999);
                where.createdAt.lte = end;
            }
        }
        const [total, commissions, aggregate] = await Promise.all([
            prisma_1.default.commission.count({ where }),
            prisma_1.default.commission.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    employee: { select: { id: true, fullName: true, employeeCode: true, department: true } },
                    sale: {
                        select: {
                            id: true,
                            invoiceNo: true,
                            customerName: true,
                            finalSaleAmount: true,
                            netProfit: true,
                            saleDate: true,
                            productType: true,
                        },
                    },
                },
            }),
            prisma_1.default.commission.groupBy({
                by: ['status'],
                where: employeeId && employeeId !== 'ALL' ? { employeeId } : {},
                _sum: { commissionAmount: true },
                _count: { id: true },
            }),
        ]);
        const stats = {
            pendingAmount: 0,
            pendingCount: 0,
            approvedAmount: 0,
            approvedCount: 0,
            paidAmount: 0,
            paidCount: 0,
            totalCommission: 0,
        };
        aggregate.forEach((item) => {
            const amt = item._sum.commissionAmount || 0;
            const cnt = item._count.id || 0;
            stats.totalCommission += amt;
            if (item.status === 'PENDING') {
                stats.pendingAmount += amt;
                stats.pendingCount += cnt;
            }
            else if (item.status === 'APPROVED') {
                stats.approvedAmount += amt;
                stats.approvedCount += cnt;
            }
            else if (item.status === 'PAID') {
                stats.paidAmount += amt;
                stats.paidCount += cnt;
            }
        });
        return res.json({
            commissions,
            stats,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    }
    catch (error) {
        console.error('getCommissionsList error:', error);
        return res.status(500).json({ message: 'Error fetching commissions', error: error.message });
    }
};
exports.getCommissionsList = getCommissionsList;
const approveCommission = async (req, res) => {
    try {
        const { id } = req.params;
        const existing = await prisma_1.default.commission.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ message: 'Commission record not found' });
        }
        const updated = await prisma_1.default.commission.update({
            where: { id },
            data: {
                status: 'APPROVED',
                approvedBy: req.user?.email || 'Admin',
                approvedAt: new Date(),
                notes: req.body.notes ? `${existing.notes || ''} | ${req.body.notes}` : existing.notes,
            },
        });
        await prisma_1.default.activityLog.create({
            data: {
                userId: req.user?.id || 'SYSTEM',
                action: 'APPROVE_COMMISSION',
                object: 'Commission System',
                newValue: `Approved commission ${id} ($${updated.commissionAmount}) by ${req.user?.email}`,
            },
        });
        return res.json({ message: 'Commission approved', commission: updated });
    }
    catch (error) {
        console.error('approveCommission error:', error);
        return res.status(500).json({ message: 'Failed to approve commission', error: error.message });
    }
};
exports.approveCommission = approveCommission;
const payCommission = async (req, res) => {
    try {
        const { id } = req.params;
        const { paymentReference, notes } = req.body;
        const existing = await prisma_1.default.commission.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ message: 'Commission record not found' });
        }
        const updated = await prisma_1.default.commission.update({
            where: { id },
            data: {
                status: 'PAID',
                paidBy: req.user?.email || 'Admin',
                paidAt: new Date(),
                paymentReference: paymentReference || 'Bank Transfer',
                notes: notes ? `${existing.notes || ''} | ${notes}` : existing.notes,
            },
        });
        await prisma_1.default.activityLog.create({
            data: {
                userId: req.user?.id || 'SYSTEM',
                action: 'PAY_COMMISSION',
                object: 'Commission System',
                newValue: `Paid commission ${id} ($${updated.commissionAmount}) with ref: ${paymentReference}`,
            },
        });
        return res.json({ message: 'Commission marked as paid', commission: updated });
    }
    catch (error) {
        console.error('payCommission error:', error);
        return res.status(500).json({ message: 'Failed to pay commission', error: error.message });
    }
};
exports.payCommission = payCommission;
const getCommissionPlans = async (req, res) => {
    try {
        const plans = await prisma_1.default.commissionPlan.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                rules: true,
                _count: { select: { employees: true } },
            },
        });
        return res.json(plans);
    }
    catch (error) {
        console.error('getCommissionPlans error:', error);
        return res.status(500).json({ message: 'Error fetching commission plans', error: error.message });
    }
};
exports.getCommissionPlans = getCommissionPlans;
const createCommissionPlan = async (req, res) => {
    try {
        const { name, description, isDefault = false, rules = [] } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Plan name is required.' });
        }
        const plan = await prisma_1.default.commissionPlan.create({
            data: {
                name: name.trim(),
                description: description ? description.trim() : null,
                isDefault: Boolean(isDefault),
                status: 'ACTIVE',
                rules: {
                    create: rules.map((r) => ({
                        productType: r.productType || 'ALL',
                        commissionBasis: r.commissionBasis || 'NET_PROFIT',
                        commissionRate: Number(r.commissionRate) || 0,
                        minAmount: r.minAmount !== undefined ? Number(r.minAmount) : null,
                        maxAmount: r.maxAmount !== undefined ? Number(r.maxAmount) : null,
                        status: 'ACTIVE',
                        notes: r.notes || null,
                    })),
                },
            },
            include: { rules: true },
        });
        return res.status(201).json(plan);
    }
    catch (error) {
        console.error('createCommissionPlan error:', error);
        return res.status(500).json({ message: 'Failed to create commission plan', error: error.message });
    }
};
exports.createCommissionPlan = createCommissionPlan;
const updateCommissionPlan = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, isDefault, status, rules } = req.body;
        const existing = await prisma_1.default.commissionPlan.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ message: 'Commission plan not found' });
        }
        // Update plan details
        const updated = await prisma_1.default.commissionPlan.update({
            where: { id },
            data: {
                name: name ? name.trim() : existing.name,
                description: description !== undefined ? description : existing.description,
                isDefault: isDefault !== undefined ? Boolean(isDefault) : existing.isDefault,
                status: status || existing.status,
            },
        });
        // If new rules are passed, recreate rules
        if (Array.isArray(rules)) {
            await prisma_1.default.commissionRule.deleteMany({ where: { planId: id } });
            await prisma_1.default.commissionRule.createMany({
                data: rules.map((r) => ({
                    planId: id,
                    productType: r.productType || 'ALL',
                    commissionBasis: r.commissionBasis || 'NET_PROFIT',
                    commissionRate: Number(r.commissionRate) || 0,
                    minAmount: r.minAmount !== undefined ? Number(r.minAmount) : null,
                    maxAmount: r.maxAmount !== undefined ? Number(r.maxAmount) : null,
                    status: 'ACTIVE',
                    notes: r.notes || null,
                })),
            });
        }
        const refreshed = await prisma_1.default.commissionPlan.findUnique({
            where: { id },
            include: { rules: true },
        });
        return res.json(refreshed);
    }
    catch (error) {
        console.error('updateCommissionPlan error:', error);
        return res.status(500).json({ message: 'Failed to update commission plan', error: error.message });
    }
};
exports.updateCommissionPlan = updateCommissionPlan;
