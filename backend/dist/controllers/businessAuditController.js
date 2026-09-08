"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBusinessAuditLogs = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const getBusinessAuditLogs = async (req, res) => {
    try {
        const object = req.query.object || '';
        const action = req.query.action || '';
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.max(1, Math.min(100, Number(req.query.limit) || 50));
        const skip = (page - 1) * limit;
        const where = {};
        if (object && object !== 'ALL')
            where.object = { contains: object };
        if (action && action !== 'ALL')
            where.action = { contains: action };
        const [total, logs] = await Promise.all([
            prisma_1.default.activityLog.count({ where }),
            prisma_1.default.activityLog.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: { select: { id: true, name: true, email: true, role: true } },
                },
            }),
        ]);
        return res.json({
            logs,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    }
    catch (error) {
        console.error('getBusinessAuditLogs error:', error);
        return res.status(500).json({ message: 'Error fetching audit logs', error: error.message });
    }
};
exports.getBusinessAuditLogs = getBusinessAuditLogs;
