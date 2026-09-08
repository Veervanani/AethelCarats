"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicPaymentMethods = exports.deletePaymentMethod = exports.updatePaymentMethod = exports.createPaymentMethod = exports.getPaymentMethods = exports.voidPayment = exports.updatePayment = exports.createPayment = exports.getPayments = void 0;
const orderController_1 = require("./orderController");
const prisma_1 = __importDefault(require("../prisma"));
const getPayments = async (req, res) => {
    try {
        const { search, method, status, fromDate, toDate, orderId, customerId } = req.query;
        const where = {};
        if (search) {
            const q = String(search).trim();
            where.OR = [
                { paymentNumber: { contains: q } },
                { referenceId: { contains: q } },
                { transactionId: { contains: q } },
                { order: { orderNumber: { contains: q } } },
                { order: { customerName: { contains: q } } },
                { order: { customerEmail: { contains: q } } },
            ];
        }
        if (method && method !== 'ALL') {
            where.paymentMethod = String(method);
        }
        if (status && status !== 'ALL') {
            where.status = String(status);
        }
        if (orderId) {
            where.orderId = String(orderId);
        }
        if (customerId) {
            where.order = { customerId: String(customerId) };
        }
        if (fromDate || toDate) {
            where.paymentDate = {};
            if (fromDate)
                where.paymentDate.gte = new Date(String(fromDate));
            if (toDate)
                where.paymentDate.lte = new Date(String(toDate) + 'T23:59:59.999Z');
        }
        const payments = await prisma_1.default.payment.findMany({
            where,
            include: {
                order: {
                    include: {
                        customer: true,
                    },
                },
                receipts: true,
            },
            orderBy: { paymentDate: 'desc' },
        });
        return res.status(200).json(payments);
    }
    catch (error) {
        console.error('getPayments error:', error);
        return res.status(500).json({ message: 'Error fetching payments' });
    }
};
exports.getPayments = getPayments;
const settingController_1 = require("./settingController");
const createPayment = async (req, res) => {
    try {
        const holiday = await (0, settingController_1.isHolidayModeActive)();
        if (holiday.active) {
            return res.status(403).json({
                message: holiday.message || 'Payments are temporarily unavailable while Holiday Mode is active.'
            });
        }
        const { orderId, amount, currency = 'USD', paymentMethod = 'Bank Transfer', referenceId, status = 'SUCCESS', notes, paymentDate, proofUrl, } = req.body;
        if (!orderId || !amount || Number(amount) <= 0) {
            return res.status(400).json({ message: 'Valid Order ID and Payment Amount are required' });
        }
        const order = await prisma_1.default.order.findUnique({
            where: { id: orderId },
            include: { payments: true, refunds: true },
        });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Auto-generate Payment Number: FJ-PAY-2026-00001
        const year = new Date().getFullYear();
        const count = await prisma_1.default.payment.count();
        const numPadded = String(count + 1).padStart(5, '0');
        const paymentNumber = `FJ-PAY-${year}-${numPadded}`;
        const recordedBy = req.user?.email || 'Admin';
        const payment = await prisma_1.default.payment.create({
            data: {
                paymentNumber,
                orderId,
                amount: Number(amount),
                currency,
                paymentMethod,
                referenceId,
                status,
                notes,
                recordedBy,
                proofUrl,
                paymentDate: paymentDate ? new Date(paymentDate) : new Date(),
            },
            include: {
                order: true,
            },
        });
        // Auto-create Payment Receipt Record
        const rcptCount = await prisma_1.default.paymentReceipt.count();
        const rcptNumPadded = String(rcptCount + 1).padStart(5, '0');
        const receiptNumber = `FJ-RCPT-${year}-${rcptNumPadded}`;
        await prisma_1.default.paymentReceipt.create({
            data: {
                receiptNumber,
                paymentId: payment.id,
                orderId,
                amount: Number(amount),
                currency,
            },
        });
        // Recalculate order financials
        const updatedOrder = await prisma_1.default.order.findUnique({
            where: { id: orderId },
            include: { payments: true, refunds: true },
        });
        const fin = (0, orderController_1.computeOrderFinancials)(updatedOrder);
        // Audit log
        await prisma_1.default.financialAuditLog.create({
            data: {
                adminUser: recordedBy,
                action: 'CREATED_PAYMENT',
                entityType: 'PAYMENT',
                entityId: payment.id,
                newValue: `Recorded payment ${payment.paymentNumber} of ${currency} $${amount} via ${paymentMethod} for Order #${order.orderNumber}`,
                reason: notes || 'Manual payment entry',
            },
        });
        return res.status(201).json({
            payment,
            orderFinancials: fin,
        });
    }
    catch (error) {
        console.error('createPayment error:', error);
        return res.status(500).json({ message: 'Error recording payment' });
    }
};
exports.createPayment = createPayment;
const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, paymentMethod, referenceId, notes, reason } = req.body;
        if (!reason) {
            return res.status(400).json({ message: 'Mandatory reason required for modifying payment records' });
        }
        const existingPayment = await prisma_1.default.payment.findUnique({
            where: { id },
            include: { order: true },
        });
        if (!existingPayment) {
            return res.status(404).json({ message: 'Payment record not found' });
        }
        const updatedPayment = await prisma_1.default.payment.update({
            where: { id },
            data: {
                ...(amount !== undefined && { amount: Number(amount) }),
                ...(paymentMethod !== undefined && { paymentMethod }),
                ...(referenceId !== undefined && { referenceId }),
                ...(notes !== undefined && { notes }),
            },
        });
        // Audit log
        const adminUser = req.user?.email || 'Admin';
        await prisma_1.default.financialAuditLog.create({
            data: {
                adminUser,
                action: 'UPDATED_PAYMENT',
                entityType: 'PAYMENT',
                entityId: id,
                oldValue: `Amount: $${existingPayment.amount}, Method: ${existingPayment.paymentMethod}, Ref: ${existingPayment.referenceId || 'N/A'}`,
                newValue: `Amount: $${updatedPayment.amount}, Method: ${updatedPayment.paymentMethod}, Ref: ${updatedPayment.referenceId || 'N/A'}`,
                reason,
            },
        });
        const updatedOrder = await prisma_1.default.order.findUnique({
            where: { id: existingPayment.orderId },
            include: { payments: true, refunds: true },
        });
        const fin = (0, orderController_1.computeOrderFinancials)(updatedOrder);
        return res.status(200).json({
            payment: updatedPayment,
            orderFinancials: fin,
        });
    }
    catch (error) {
        console.error('updatePayment error:', error);
        return res.status(500).json({ message: 'Error updating payment' });
    }
};
exports.updatePayment = updatePayment;
const voidPayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;
        if (!reason) {
            return res.status(400).json({ message: 'Mandatory reason required for voiding a payment' });
        }
        const payment = await prisma_1.default.payment.findUnique({
            where: { id },
            include: { order: true },
        });
        if (!payment) {
            return res.status(404).json({ message: 'Payment record not found' });
        }
        const voided = await prisma_1.default.payment.update({
            where: { id },
            data: { status: 'VOIDED' },
        });
        const adminUser = req.user?.email || 'Admin';
        await prisma_1.default.financialAuditLog.create({
            data: {
                adminUser,
                action: 'VOIDED_PAYMENT',
                entityType: 'PAYMENT',
                entityId: id,
                oldValue: `Status: ${payment.status}, Amount: $${payment.amount}`,
                newValue: 'Status: VOIDED',
                reason,
            },
        });
        const updatedOrder = await prisma_1.default.order.findUnique({
            where: { id: payment.orderId },
            include: { payments: true, refunds: true },
        });
        const fin = (0, orderController_1.computeOrderFinancials)(updatedOrder);
        return res.status(200).json({
            message: 'Payment voided successfully',
            payment: voided,
            orderFinancials: fin,
        });
    }
    catch (error) {
        console.error('voidPayment error:', error);
        return res.status(500).json({ message: 'Error voiding payment' });
    }
};
exports.voidPayment = voidPayment;
// Payment Methods Admin
const getPaymentMethods = async (req, res) => {
    try {
        let methods = await prisma_1.default.paymentMethod.findMany({
            orderBy: { sortOrder: 'asc' },
        });
        if (methods.length === 0) {
            // Seed default payment methods
            const defaults = [
                { name: 'Bank Transfer', code: 'bank_transfer', sortOrder: 1 },
                { name: 'Wire Transfer', code: 'wire_transfer', sortOrder: 2 },
                { name: 'Credit Card', code: 'credit_card', sortOrder: 3 },
                { name: 'Debit Card', code: 'debit_card', sortOrder: 4 },
                { name: 'PayPal', code: 'paypal', sortOrder: 5 },
                { name: 'Cash', code: 'cash', sortOrder: 6 },
                { name: 'Other', code: 'other', sortOrder: 7 },
            ];
            await prisma_1.default.paymentMethod.createMany({ data: defaults });
            methods = await prisma_1.default.paymentMethod.findMany({ orderBy: { sortOrder: 'asc' } });
        }
        return res.status(200).json(methods);
    }
    catch (error) {
        console.error('getPaymentMethods error:', error);
        return res.status(500).json({ message: 'Error retrieving payment methods' });
    }
};
exports.getPaymentMethods = getPaymentMethods;
const createPaymentMethod = async (req, res) => {
    try {
        const { name, code, description, sortOrder = 0 } = req.body;
        if (!name || !code) {
            return res.status(400).json({ message: 'Name and Code are required' });
        }
        const method = await prisma_1.default.paymentMethod.create({
            data: {
                name,
                code: String(code).toLowerCase().replace(/\s+/g, '_'),
                description,
                sortOrder: Number(sortOrder),
            },
        });
        return res.status(201).json(method);
    }
    catch (error) {
        console.error('createPaymentMethod error:', error);
        return res.status(500).json({ message: 'Error creating payment method' });
    }
};
exports.createPaymentMethod = createPaymentMethod;
const updatePaymentMethod = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, isActive, sortOrder } = req.body;
        const method = await prisma_1.default.paymentMethod.update({
            where: { id },
            data: {
                ...(name !== undefined && { name }),
                ...(description !== undefined && { description }),
                ...(isActive !== undefined && { isActive: Boolean(isActive) }),
                ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
            },
        });
        return res.status(200).json(method);
    }
    catch (error) {
        console.error('updatePaymentMethod error:', error);
        return res.status(500).json({ message: 'Error updating payment method' });
    }
};
exports.updatePaymentMethod = updatePaymentMethod;
const deletePaymentMethod = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Payment method ID is required' });
        }
        const existing = await prisma_1.default.paymentMethod.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ message: 'Payment method not found in database' });
        }
        await prisma_1.default.paymentMethod.delete({
            where: { id },
        });
        return res.status(200).json({
            success: true,
            message: `Payment method "${existing.name}" successfully deleted from database`,
            id,
        });
    }
    catch (error) {
        console.error('deletePaymentMethod error:', error);
        return res.status(500).json({ message: 'Error deleting payment method from database', error: error?.message });
    }
};
exports.deletePaymentMethod = deletePaymentMethod;
const getPublicPaymentMethods = async (req, res) => {
    try {
        const methods = await prisma_1.default.paymentMethod.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
        });
        return res.status(200).json(methods);
    }
    catch (error) {
        console.error('getPublicPaymentMethods error:', error);
        return res.status(500).json({ message: 'Error retrieving active payment methods', error: error?.message });
    }
};
exports.getPublicPaymentMethods = getPublicPaymentMethods;
