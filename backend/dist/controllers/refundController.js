"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefund = exports.getRefunds = void 0;
const orderController_1 = require("./orderController");
const prisma_1 = __importDefault(require("../prisma"));
const getRefunds = async (req, res) => {
    try {
        const { orderId, fromDate, toDate } = req.query;
        const where = {};
        if (orderId)
            where.orderId = String(orderId);
        if (fromDate || toDate) {
            where.refundDate = {};
            if (fromDate)
                where.refundDate.gte = new Date(String(fromDate));
            if (toDate)
                where.refundDate.lte = new Date(String(toDate) + 'T23:59:59.999Z');
        }
        const refunds = await prisma_1.default.refund.findMany({
            where,
            include: {
                order: true,
                payment: true,
            },
            orderBy: { refundDate: 'desc' },
        });
        return res.status(200).json(refunds);
    }
    catch (error) {
        console.error('getRefunds error:', error);
        return res.status(500).json({ message: 'Error retrieving refunds' });
    }
};
exports.getRefunds = getRefunds;
const createRefund = async (req, res) => {
    try {
        const { orderId, paymentId, amount, refundMethod = 'Original Payment Method', reason, notes, referenceId, } = req.body;
        if (!orderId || !amount || Number(amount) <= 0) {
            return res.status(400).json({ message: 'Order ID and valid Refund Amount are required' });
        }
        const order = await prisma_1.default.order.findUnique({
            where: { id: orderId },
            include: { payments: true, refunds: true },
        });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const year = new Date().getFullYear();
        const count = await prisma_1.default.refund.count();
        const numPadded = String(count + 1).padStart(5, '0');
        const refundNumber = `FJ-REF-${year}-${numPadded}`;
        const recordedBy = req.user?.email || 'Admin';
        const refund = await prisma_1.default.refund.create({
            data: {
                refundNumber,
                orderId,
                paymentId: paymentId || null,
                amount: Number(amount),
                refundMethod,
                reason,
                notes,
                referenceId,
                recordedBy,
            },
        });
        const updatedOrder = await prisma_1.default.order.findUnique({
            where: { id: orderId },
            include: { payments: true, refunds: true },
        });
        const fin = (0, orderController_1.computeOrderFinancials)(updatedOrder);
        // Audit log
        await prisma_1.default.financialAuditLog.create({
            data: {
                adminUser: recordedBy,
                action: 'CREATED_REFUND',
                entityType: 'REFUND',
                entityId: refund.id,
                newValue: `Issued refund ${refund.refundNumber} of $${amount} for Order #${order.orderNumber}`,
                reason: reason || 'Refund issued',
            },
        });
        return res.status(201).json({
            refund,
            orderFinancials: fin,
        });
    }
    catch (error) {
        console.error('createRefund error:', error);
        return res.status(500).json({ message: 'Error creating refund' });
    }
};
exports.createRefund = createRefund;
