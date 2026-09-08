"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderSummaryMetrics = exports.getOrdersByCustomerEmail = exports.trackPublicOrder = exports.wipeAllOrders = exports.deleteOrder = exports.updateOrder = exports.createPublicOrder = exports.createOrder = exports.getOrderById = exports.getOrders = void 0;
exports.computeOrderFinancials = computeOrderFinancials;
const prisma_1 = __importDefault(require("../prisma"));
// Utility to calculate financial status for an order
function computeOrderFinancials(order) {
    const subtotal = order.subtotal || 0;
    const tax = order.tax || 0;
    const shippingFee = order.shippingFee || 0;
    const discount = order.discount || 0;
    const finalOrderTotal = subtotal + tax + shippingFee - discount;
    const successfulPayments = (order.payments || []).filter((p) => p.status === 'SUCCESS');
    const paidAmount = successfulPayments.reduce((acc, p) => acc + (p.amount || 0), 0);
    const refunds = order.refunds || [];
    const refundedAmount = refunds.reduce((acc, r) => acc + (r.amount || 0), 0);
    const netPaid = paidAmount - refundedAmount;
    const balanceDue = Math.max(0, finalOrderTotal - netPaid);
    let calculatedStatus = 'UNPAID';
    if (refundedAmount >= finalOrderTotal && paidAmount <= refundedAmount && finalOrderTotal > 0) {
        calculatedStatus = 'REFUNDED';
    }
    else if (refundedAmount > 0) {
        calculatedStatus = 'PARTIALLY REFUNDED';
    }
    else if (paidAmount <= 0) {
        calculatedStatus = 'UNPAID';
    }
    else if (paidAmount < finalOrderTotal - 0.01) {
        calculatedStatus = 'PARTIALLY PAID';
    }
    else if (Math.abs(paidAmount - finalOrderTotal) <= 0.01) {
        calculatedStatus = 'PAID';
    }
    else if (paidAmount > finalOrderTotal + 0.01) {
        calculatedStatus = 'OVERPAID';
    }
    const lastPayment = successfulPayments.length > 0 ? successfulPayments[successfulPayments.length - 1] : null;
    return {
        finalOrderTotal,
        paidAmount,
        refundedAmount,
        netPaid,
        balanceDue,
        calculatedStatus,
        lastPaymentDate: lastPayment ? lastPayment.paymentDate : null,
        lastPaymentAmount: lastPayment ? lastPayment.amount : null,
    };
}
const getOrders = async (req, res) => {
    try {
        const { search, orderStatus, paymentStatus, fromDate, toDate, customerId } = req.query;
        const where = {};
        if (search) {
            const q = String(search).trim();
            where.OR = [
                { orderNumber: { contains: q } },
                { customerName: { contains: q } },
                { customerEmail: { contains: q } },
                { customerPhone: { contains: q } },
                { payments: { some: { referenceId: { contains: q } } } },
            ];
        }
        if (orderStatus && orderStatus !== 'ALL') {
            where.orderStatus = String(orderStatus);
        }
        if (customerId) {
            where.customerId = String(customerId);
        }
        if (fromDate || toDate) {
            where.orderDate = {};
            if (fromDate)
                where.orderDate.gte = new Date(String(fromDate));
            if (toDate)
                where.orderDate.lte = new Date(String(toDate) + 'T23:59:59.999Z');
        }
        const orders = await prisma_1.default.order.findMany({
            where,
            include: {
                items: true,
                payments: true,
                refunds: true,
                customer: true,
                shipments: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        const enrichedOrders = orders
            .map((o) => {
            const fin = computeOrderFinancials(o);
            return {
                ...o,
                ...fin,
            };
        })
            .filter((o) => {
            if (!paymentStatus || paymentStatus === 'ALL')
                return true;
            return o.calculatedStatus === String(paymentStatus);
        });
        return res.status(200).json(enrichedOrders);
    }
    catch (error) {
        console.error('getOrders error:', error);
        return res.status(500).json({ message: 'Error retrieving orders' });
    }
};
exports.getOrders = getOrders;
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await prisma_1.default.order.findFirst({
            where: {
                OR: [{ id }, { orderNumber: id }],
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
                payments: {
                    orderBy: { paymentDate: 'desc' },
                },
                refunds: {
                    orderBy: { refundDate: 'desc' },
                },
                customer: true,
                shipments: true,
            },
        });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const financials = computeOrderFinancials(order);
        const auditLogs = await prisma_1.default.financialAuditLog.findMany({
            where: {
                entityType: 'ORDER',
                entityId: order.id,
            },
            orderBy: { createdAt: 'desc' },
        });
        return res.status(200).json({
            ...order,
            ...financials,
            auditLogs,
        });
    }
    catch (error) {
        console.error('getOrderById error:', error);
        return res.status(500).json({ message: 'Error retrieving order detail' });
    }
};
exports.getOrderById = getOrderById;
const settingController_1 = require("./settingController");
const createOrder = async (req, res) => {
    try {
        const holiday = await (0, settingController_1.isHolidayModeActive)();
        if (holiday.active) {
            return res.status(403).json({
                message: holiday.message || 'Orders are temporarily unavailable while Holiday Mode is active.'
            });
        }
        const { customerName, customerEmail, customerPhone, billingAddress, shippingAddress, items, subtotal, tax = 0, shippingFee = 0, discount = 0, currency = 'USD', notes, } = req.body;
        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'Order must contain at least one item' });
        }
        // Auto generate unique order number (e.g. FJ-10026)
        const count = await prisma_1.default.order.count();
        const nextNum = 10001 + count;
        const orderNumber = `FJ-${nextNum}`;
        let customerId = null;
        if (customerEmail) {
            let customer = await prisma_1.default.customer.findUnique({ where: { email: customerEmail } });
            if (!customer) {
                customer = await prisma_1.default.customer.create({
                    data: {
                        email: customerEmail,
                        name: customerName || 'Valued Client',
                        phone: customerPhone,
                    },
                });
            }
            customerId = customer.id;
        }
        const calculatedSubtotal = items.reduce((acc, item) => acc + (item.unitPrice * item.quantity - (item.discount || 0)), 0);
        const finalTotal = (subtotal || calculatedSubtotal) + Number(tax) + Number(shippingFee) - Number(discount);
        const order = await prisma_1.default.order.create({
            data: {
                orderNumber,
                customerId,
                customerName,
                customerEmail,
                customerPhone,
                billingAddress,
                shippingAddress,
                subtotal: subtotal || calculatedSubtotal,
                tax: Number(tax),
                shippingFee: Number(shippingFee),
                discount: Number(discount),
                totalAmount: finalTotal,
                currency,
                orderStatus: 'PENDING',
                notes,
                items: {
                    create: items.map((i) => ({
                        productId: i.productId || null,
                        diamondId: i.diamondId || null,
                        productName: i.productName,
                        sku: i.sku || 'N/A',
                        variantInfo: i.variantInfo || null,
                        unitPrice: Number(i.unitPrice),
                        quantity: Number(i.quantity),
                        discount: Number(i.discount || 0),
                        subtotal: Number(i.unitPrice) * Number(i.quantity) - Number(i.discount || 0),
                    })),
                },
            },
            include: {
                items: true,
                payments: true,
                refunds: true,
            },
        });
        // Audit log
        await prisma_1.default.financialAuditLog.create({
            data: {
                adminUser: req.user?.email || 'Admin',
                action: 'CREATED_ORDER',
                entityType: 'ORDER',
                entityId: order.id,
                newValue: `Order #${order.orderNumber} created for $${finalTotal.toFixed(2)}`,
                reason: 'New order registered',
            },
        });
        const fin = computeOrderFinancials(order);
        return res.status(201).json({
            ...order,
            ...fin,
        });
    }
    catch (error) {
        console.error('createOrder error:', error);
        return res.status(500).json({ message: 'Error creating order' });
    }
};
exports.createOrder = createOrder;
const createPublicOrder = async (req, res) => {
    try {
        const { customerName, customerEmail, customerPhone, billingAddress, shippingAddress, items, subtotal, tax = 0, shippingFee = 0, discount = 0, currency = 'USD', notes, } = req.body;
        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'Order must contain at least one item' });
        }
        // Auto generate unique order number (e.g. FJ-10028)
        const count = await prisma_1.default.order.count();
        const nextNum = 10001 + count;
        const orderNumber = `FJ-${nextNum}`;
        let customerId = null;
        if (customerEmail) {
            let customer = await prisma_1.default.customer.findUnique({ where: { email: customerEmail } });
            if (!customer) {
                customer = await prisma_1.default.customer.create({
                    data: {
                        email: customerEmail,
                        name: customerName || 'Valued Client',
                        phone: customerPhone || null,
                    },
                });
            }
            customerId = customer.id;
        }
        const calculatedSubtotal = items.reduce((acc, item) => acc + (Number(item.unitPrice || 0) * Number(item.quantity || 1) - Number(item.discount || 0)), 0);
        const finalTotal = (subtotal || calculatedSubtotal) + Number(tax) + Number(shippingFee) - Number(discount);
        const order = await prisma_1.default.order.create({
            data: {
                orderNumber,
                customerId,
                customerName: customerName || 'Valued Client',
                customerEmail: customerEmail || 'client@example.com',
                customerPhone: customerPhone || null,
                billingAddress: typeof billingAddress === 'string' ? billingAddress : JSON.stringify(billingAddress || {}),
                shippingAddress: typeof shippingAddress === 'string' ? shippingAddress : JSON.stringify(shippingAddress || {}),
                subtotal: subtotal || calculatedSubtotal,
                tax: Number(tax),
                shippingFee: Number(shippingFee),
                discount: Number(discount),
                totalAmount: finalTotal,
                currency,
                orderStatus: 'PENDING',
                notes: notes || null,
                items: {
                    create: items.map((i) => ({
                        productId: i.productId || null,
                        diamondId: i.diamondId || null,
                        productName: i.productName || 'Jewellery Item',
                        sku: i.sku || 'FJ-PIECE',
                        variantInfo: i.variantInfo || null,
                        unitPrice: Number(i.unitPrice || 0),
                        quantity: Number(i.quantity || 1),
                        discount: Number(i.discount || 0),
                        subtotal: Number(i.unitPrice || 0) * Number(i.quantity || 1) - Number(i.discount || 0),
                    })),
                },
            },
            include: {
                items: true,
                payments: true,
                refunds: true,
            },
        });
        return res.status(201).json(order);
    }
    catch (error) {
        console.error('createPublicOrder error:', error);
        return res.status(500).json({ message: error.message || 'Failed to place order' });
    }
};
exports.createPublicOrder = createPublicOrder;
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderStatus, customerName, customerEmail, customerPhone, subtotal, tax, shippingFee, discount, totalAmount, notes, billingAddress, shippingAddress, reason, courierCompany, trackingNumber, } = req.body;
        const existingOrder = await prisma_1.default.order.findUnique({ where: { id } });
        if (!existingOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        if (courierCompany || trackingNumber) {
            await prisma_1.default.shipment.create({
                data: {
                    orderId: id,
                    carrier: courierCompany || 'Insured Express Courier',
                    trackingNumber: trackingNumber || 'N/A',
                    status: 'DISPATCHED',
                },
            });
        }
        const newSubtotal = subtotal !== undefined ? Number(subtotal) : existingOrder.subtotal;
        const newTax = tax !== undefined ? Number(tax) : existingOrder.tax;
        const newShipping = shippingFee !== undefined ? Number(shippingFee) : existingOrder.shippingFee;
        const newDiscount = discount !== undefined ? Number(discount) : existingOrder.discount;
        const newTotal = totalAmount !== undefined ? Number(totalAmount) : (newSubtotal + newTax + newShipping - newDiscount);
        const updated = await prisma_1.default.order.update({
            where: { id },
            data: {
                ...(orderStatus !== undefined && { orderStatus }),
                ...(customerName !== undefined && { customerName }),
                ...(customerEmail !== undefined && { customerEmail }),
                ...(customerPhone !== undefined && { customerPhone }),
                ...(subtotal !== undefined && { subtotal: newSubtotal }),
                ...(tax !== undefined && { tax: newTax }),
                ...(shippingFee !== undefined && { shippingFee: newShipping }),
                ...(discount !== undefined && { discount: newDiscount }),
                totalAmount: newTotal,
                ...(notes !== undefined && { notes }),
                ...(billingAddress !== undefined && { billingAddress }),
                ...(shippingAddress !== undefined && { shippingAddress }),
            },
            include: {
                items: true,
                payments: true,
                refunds: true,
                shipments: true,
            },
        });
        // Audit log
        await prisma_1.default.financialAuditLog.create({
            data: {
                adminUser: req.user?.email || 'Admin',
                action: 'UPDATED_ORDER',
                entityType: 'ORDER',
                entityId: id,
                oldValue: `Status: ${existingOrder.orderStatus}`,
                newValue: `Status: ${updated.orderStatus} | Courier: ${courierCompany || 'N/A'} | Tracking: ${trackingNumber || 'N/A'}`,
                reason: reason || 'Order updated',
            },
        });
        const fin = computeOrderFinancials(updated);
        return res.status(200).json({
            ...updated,
            ...fin,
        });
    }
    catch (error) {
        console.error('updateOrder error:', error);
        return res.status(500).json({ message: 'Error updating order' });
    }
};
exports.updateOrder = updateOrder;
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const existingOrder = await prisma_1.default.order.findUnique({ where: { id } });
        if (!existingOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await prisma_1.default.orderItem.deleteMany({ where: { orderId: id } });
        await prisma_1.default.payment.deleteMany({ where: { orderId: id } });
        await prisma_1.default.refund.deleteMany({ where: { orderId: id } });
        await prisma_1.default.shipment.deleteMany({ where: { orderId: id } });
        await prisma_1.default.order.delete({ where: { id } });
        await prisma_1.default.financialAuditLog.create({
            data: {
                adminUser: req.user?.email || 'Admin',
                action: 'DELETED_ORDER',
                entityType: 'ORDER',
                entityId: id,
                oldValue: `Order #${existingOrder.orderNumber} ($${existingOrder.totalAmount})`,
                newValue: 'DELETED',
                reason: 'Admin deleted order',
            },
        });
        return res.status(200).json({ message: 'Order deleted successfully' });
    }
    catch (error) {
        console.error('deleteOrder error:', error);
        return res.status(500).json({ message: error.message || 'Failed to delete order' });
    }
};
exports.deleteOrder = deleteOrder;
const wipeAllOrders = async (req, res) => {
    try {
        await prisma_1.default.orderItem.deleteMany({});
        await prisma_1.default.payment.deleteMany({});
        await prisma_1.default.refund.deleteMany({});
        await prisma_1.default.shipment.deleteMany({});
        await prisma_1.default.financialAuditLog.deleteMany({});
        await prisma_1.default.order.deleteMany({});
        return res.status(200).json({ message: 'All orders wiped to 0 successfully.' });
    }
    catch (error) {
        console.error('wipeAllOrders error:', error);
        return res.status(500).json({ message: error.message || 'Failed to wipe orders' });
    }
};
exports.wipeAllOrders = wipeAllOrders;
const trackPublicOrder = async (req, res) => {
    try {
        const { orderNumber, email } = req.query;
        if (!orderNumber) {
            return res.status(400).json({ message: 'Order number is required' });
        }
        const rawQ = String(orderNumber).trim().replace(/^#/, '');
        // Match exact orderNumber, or containing number, or FJ- prefixed number
        let order = await prisma_1.default.order.findFirst({
            where: {
                OR: [
                    { orderNumber: { equals: rawQ } },
                    { orderNumber: { contains: rawQ } },
                    { orderNumber: { equals: `FJ-${rawQ}` } },
                ],
            },
            include: {
                items: true,
                payments: true,
                shipments: true,
            },
        });
        // If order not found by orderNumber and email provided, fallback to customerEmail
        if (!order && email) {
            order = await prisma_1.default.order.findFirst({
                where: {
                    customerEmail: { equals: String(email).trim() },
                },
                include: {
                    items: true,
                    payments: true,
                    shipments: true,
                },
            });
        }
        if (!order) {
            return res.status(404).json({ message: 'Order not found. Please check your order number.' });
        }
        const fin = computeOrderFinancials(order);
        return res.json({
            ...order,
            ...fin,
        });
    }
    catch (error) {
        console.error('trackPublicOrder error:', error);
        return res.status(500).json({ message: 'Error retrieving order status' });
    }
};
exports.trackPublicOrder = trackPublicOrder;
const getOrdersByCustomerEmail = async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.json([]);
        }
        const orders = await prisma_1.default.order.findMany({
            where: {
                customerEmail: { equals: String(email).trim() },
            },
            include: {
                items: true,
                payments: true,
                shipments: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        const enriched = orders.map((o) => ({
            ...o,
            ...computeOrderFinancials(o),
        }));
        return res.json(enriched);
    }
    catch (error) {
        console.error('getOrdersByCustomerEmail error:', error);
        return res.status(500).json({ message: 'Error loading client orders' });
    }
};
exports.getOrdersByCustomerEmail = getOrdersByCustomerEmail;
const getOrderSummaryMetrics = async (req, res) => {
    try {
        const { period, fromDate, toDate } = req.query;
        const now = new Date();
        let startDate = null;
        let endDate = null;
        if (period === 'today') {
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        }
        else if (period === 'yesterday') {
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
            endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, -1);
        }
        else if (period === 'this_week') {
            const day = now.getDay();
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day);
        }
        else if (period === 'this_month') {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        }
        else if (period === 'last_month') {
            startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            endDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
        }
        else if (period === 'this_year') {
            startDate = new Date(now.getFullYear(), 0, 1);
        }
        else if (fromDate || toDate) {
            if (fromDate)
                startDate = new Date(String(fromDate));
            if (toDate)
                endDate = new Date(String(toDate) + 'T23:59:59.999Z');
        }
        const where = {};
        if (startDate || endDate) {
            where.orderDate = {};
            if (startDate)
                where.orderDate.gte = startDate;
            if (endDate)
                where.orderDate.lte = endDate;
        }
        const orders = await prisma_1.default.order.findMany({
            where,
            include: {
                payments: true,
                refunds: true,
            },
        });
        let totalOrders = orders.length;
        let totalOrderValue = 0;
        let paymentsReceived = 0;
        let totalRefunds = 0;
        let outstandingBalance = 0;
        orders.forEach((o) => {
            const fin = computeOrderFinancials(o);
            totalOrderValue += fin.finalOrderTotal;
            paymentsReceived += fin.paidAmount;
            totalRefunds += fin.refundedAmount;
            outstandingBalance += fin.balanceDue;
        });
        const pendingPaymentsCount = orders.filter((o) => {
            const fin = computeOrderFinancials(o);
            return fin.balanceDue > 0;
        }).length;
        return res.status(200).json({
            totalOrders,
            totalOrderValue,
            paymentsReceived,
            paymentsPending: pendingPaymentsCount,
            totalRefunds,
            outstandingBalance,
            netRevenue: paymentsReceived - totalRefunds,
        });
    }
    catch (error) {
        console.error('getOrderSummaryMetrics error:', error);
        return res.status(500).json({ message: 'Error computing order metrics' });
    }
};
exports.getOrderSummaryMetrics = getOrderSummaryMetrics;
