"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportOrdersToExcel = exportOrdersToExcel;
exports.exportPaymentsToExcel = exportPaymentsToExcel;
exports.exportOrdersToCsv = exportOrdersToCsv;
const xlsx_1 = __importDefault(require("xlsx"));
function exportOrdersToExcel(orders, res) {
    const data = orders.map((o) => {
        const successfulPayments = (o.payments || []).filter((p) => p.status === 'SUCCESS');
        const totalPaid = successfulPayments.reduce((acc, p) => acc + p.amount, 0);
        const totalRefunds = (o.refunds || []).reduce((acc, r) => acc + r.amount, 0);
        const netPaid = totalPaid - totalRefunds;
        const balanceDue = Math.max(0, o.totalAmount - netPaid);
        return {
            'Order ID': o.orderNumber,
            'Order Date': new Date(o.orderDate).toISOString().split('T')[0],
            'Customer Name': o.customerName || 'Guest',
            'Customer Email': o.customerEmail || '',
            'Customer Phone': o.customerPhone || '',
            'Items Count': o.items ? o.items.length : 0,
            Subtotal: o.subtotal,
            Discount: o.discount,
            Tax: o.tax,
            Shipping: o.shippingFee,
            'Total Amount': o.totalAmount,
            Currency: o.currency,
            'Amount Paid': totalPaid,
            'Refunds Total': totalRefunds,
            'Balance Due': balanceDue,
            'Payment Status': o.calculatedStatus || 'UNPAID',
            'Order Status': o.orderStatus,
            'Last Payment Date': successfulPayments.length > 0 ? new Date(successfulPayments[successfulPayments.length - 1].paymentDate).toISOString().split('T')[0] : 'N/A',
        };
    });
    const worksheet = xlsx_1.default.utils.json_to_sheet(data);
    const workbook = xlsx_1.default.utils.book_new();
    xlsx_1.default.utils.book_append_sheet(workbook, worksheet, 'Orders');
    const buffer = xlsx_1.default.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="Aura_Atelier_Orders_${new Date().toISOString().split('T')[0]}.xlsx"`);
    res.send(buffer);
}
function exportPaymentsToExcel(payments, res) {
    const data = payments.map((p) => ({
        'Payment ID': p.paymentNumber || p.id,
        'Payment Date': new Date(p.paymentDate).toISOString().split('T')[0],
        'Order ID': p.order ? p.order.orderNumber : p.orderId,
        Customer: p.order ? p.order.customerName : 'N/A',
        Amount: p.amount,
        Currency: p.currency,
        'Payment Method': p.paymentMethod,
        'Transaction / Reference ID': p.referenceId || 'N/A',
        Status: p.status,
        'Recorded By': p.recordedBy || 'Admin',
        Notes: p.notes || '',
    }));
    const worksheet = xlsx_1.default.utils.json_to_sheet(data);
    const workbook = xlsx_1.default.utils.book_new();
    xlsx_1.default.utils.book_append_sheet(workbook, worksheet, 'Payments');
    const buffer = xlsx_1.default.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="Aura_Atelier_Payments_${new Date().toISOString().split('T')[0]}.xlsx"`);
    res.send(buffer);
}
function exportOrdersToCsv(orders, res) {
    const data = orders.map((o) => {
        const successfulPayments = (o.payments || []).filter((p) => p.status === 'SUCCESS');
        const totalPaid = successfulPayments.reduce((acc, p) => acc + p.amount, 0);
        const totalRefunds = (o.refunds || []).reduce((acc, r) => acc + r.amount, 0);
        const netPaid = totalPaid - totalRefunds;
        const balanceDue = Math.max(0, o.totalAmount - netPaid);
        return {
            'Order ID': o.orderNumber,
            'Order Date': new Date(o.orderDate).toISOString().split('T')[0],
            'Customer Name': o.customerName || 'Guest',
            'Customer Email': o.customerEmail || '',
            'Total Amount': o.totalAmount,
            Currency: o.currency,
            'Amount Paid': totalPaid,
            'Balance Due': balanceDue,
            'Payment Status': o.calculatedStatus || 'UNPAID',
            'Order Status': o.orderStatus,
        };
    });
    const worksheet = xlsx_1.default.utils.json_to_sheet(data);
    const csv = xlsx_1.default.utils.sheet_to_csv(worksheet);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="Aura_Atelier_Orders_${new Date().toISOString().split('T')[0]}.csv"`);
    res.send(csv);
}
