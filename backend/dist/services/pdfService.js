"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCurrency = formatCurrency;
exports.drawHeader = drawHeader;
exports.drawFooter = drawFooter;
exports.generateOrderStatementPdf = generateOrderStatementPdf;
exports.generatePaymentReceiptPdf = generatePaymentReceiptPdf;
exports.generateCustomerStatementPdf = generateCustomerStatementPdf;
exports.generateFinancialStatementPdf = generateFinancialStatementPdf;
exports.generateOrderInvoicePdf = generateOrderInvoicePdf;
const pdfkit_1 = __importDefault(require("pdfkit"));
const DEFAULT_COMPANY = {
    name: 'AURA DIAMOND ATELIER',
    tagline: 'Fine Jewellery & Loose Diamond Vault',
    address: '740 Fifth Avenue, Suite 1800, New York, NY 10019',
    email: 'concierge@auroradiamonds.com',
    phone: '+1 (800) 555-2872',
    taxId: 'US-TAX-88492019',
};
const GOLD = '#C9A45C';
const DARK = '#1A1918';
const GREY = '#666666';
const LIGHT_BG = '#F9F8F5';
const BORDER_COLOR = '#E0DACB';
function formatCurrency(amount, currency = 'USD') {
    const formatted = Math.abs(amount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    const prefix = amount < 0 ? '-' : '';
    return `${prefix}${currency} $${formatted}`;
}
function drawHeader(doc, options) {
    // Brand Header
    doc
        .rect(0, 0, doc.page.width, 100)
        .fill(DARK);
    doc
        .fillColor(GOLD)
        .font('Helvetica-Bold')
        .fontSize(22)
        .text('AURA DIAMOND ATELIER', 40, 25);
    doc
        .fillColor('#CCCCCC')
        .font('Helvetica')
        .fontSize(8)
        .text(DEFAULT_COMPANY.tagline.toUpperCase(), 40, 52);
    doc
        .fillColor('#FFFFFF')
        .font('Helvetica-Bold')
        .fontSize(14)
        .text(options.docTitle.toUpperCase(), doc.page.width - 240, 25, { width: 200, align: 'right' });
    doc
        .fillColor(GOLD)
        .font('Helvetica')
        .fontSize(9)
        .text(`# ${options.documentNumber}`, doc.page.width - 240, 45, { width: 200, align: 'right' });
    doc
        .fillColor('#CCCCCC')
        .fontSize(8)
        .text(`Date: ${options.dateStr}`, doc.page.width - 240, 60, { width: 200, align: 'right' });
    // Reset y position below header bar
    doc.y = 120;
}
function drawFooter(doc, currentPage, totalPages) {
    const bottom = doc.page.height - 40;
    doc
        .strokeColor(BORDER_COLOR)
        .lineWidth(0.5)
        .moveTo(40, bottom - 10)
        .lineTo(doc.page.width - 40, bottom - 10)
        .stroke();
    doc
        .fillColor(GREY)
        .font('Helvetica')
        .fontSize(8)
        .text('Aura Diamond Atelier • Confidential Luxury Document • www.auroradiamonds.com', 40, bottom, {
        width: doc.page.width - 80,
        align: 'left',
    });
    doc
        .fillColor(GREY)
        .font('Helvetica')
        .fontSize(8)
        .text(`Page ${currentPage} of ${totalPages}`, 40, bottom, {
        width: doc.page.width - 80,
        align: 'right',
    });
}
// 1. ORDER STATEMENT PDF
async function generateOrderStatementPdf(order, res) {
    const doc = new pdfkit_1.default({ size: 'A4', margin: 40 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="Order_Statement_${order.orderNumber}.pdf"`);
    doc.pipe(res);
    drawHeader(doc, {
        docTitle: 'Order Statement',
        documentNumber: order.orderNumber,
        dateStr: new Date(order.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    });
    // Customer & Atelier Metadata Box
    doc.y = 120;
    const startY = doc.y;
    // Left Box: Atelier Info
    doc.fillColor(DARK).font('Helvetica-Bold').fontSize(10).text('ISSUED BY:', 40, startY);
    doc.fillColor(GREY).font('Helvetica').fontSize(9).text(DEFAULT_COMPANY.name, 40, startY + 15);
    doc.text(DEFAULT_COMPANY.address, 40, startY + 28, { width: 220 });
    doc.text(`Email: ${DEFAULT_COMPANY.email}`, 40, startY + 54);
    doc.text(`Phone: ${DEFAULT_COMPANY.phone}`, 40, startY + 67);
    // Right Box: Customer Info
    doc.fillColor(DARK).font('Helvetica-Bold').fontSize(10).text('CLIENT DETAILS:', 320, startY);
    doc.fillColor(DARK).font('Helvetica-Bold').fontSize(9.5).text(order.customerName || 'Valued Client', 320, startY + 15);
    doc.fillColor(GREY).font('Helvetica').fontSize(9).text(`Email: ${order.customerEmail || 'N/A'}`, 320, startY + 30);
    doc.text(`Phone: ${order.customerPhone || 'N/A'}`, 320, startY + 43);
    doc.text(`Billing: ${order.billingAddress || 'N/A'}`, 320, startY + 56, { width: 230 });
    doc.text(`Shipping: ${order.shippingAddress || 'N/A'}`, 320, startY + 80, { width: 230 });
    doc.y = startY + 115;
    doc.strokeColor(BORDER_COLOR).lineWidth(0.5).moveTo(40, doc.y).lineTo(555, doc.y).stroke();
    doc.y += 15;
    // Order Summary Line
    doc.fillColor(DARK).font('Helvetica-Bold').fontSize(11).text('ORDER ITEMS & SPECIFICATIONS', 40, doc.y);
    doc.y += 15;
    // Items Table Header
    const tableTop = doc.y;
    doc.rect(40, tableTop, 515, 22).fill(DARK);
    doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(8.5);
    doc.text('ITEM & DESCRIPTION', 50, tableTop + 6);
    doc.text('SKU', 250, tableTop + 6);
    doc.text('QTY', 330, tableTop + 6, { width: 40, align: 'center' });
    doc.text('PRICE', 380, tableTop + 6, { width: 80, align: 'right' });
    doc.text('TOTAL', 470, tableTop + 6, { width: 75, align: 'right' });
    let y = tableTop + 24;
    let isRowEven = false;
    (order.items || []).forEach((item) => {
        if (isRowEven) {
            doc.rect(40, y - 2, 515, 22).fill(LIGHT_BG);
        }
        doc.fillColor(DARK).font('Helvetica').fontSize(9);
        doc.text(item.productName, 50, y, { width: 195 });
        doc.fillColor(GREY).fontSize(8).text(item.sku || 'N/A', 250, y);
        doc.fillColor(DARK).fontSize(9).text(item.quantity.toString(), 330, y, { width: 40, align: 'center' });
        doc.text(formatCurrency(item.unitPrice, order.currency), 380, y, { width: 80, align: 'right' });
        doc.font('Helvetica-Bold').text(formatCurrency(item.subtotal, order.currency), 470, y, { width: 75, align: 'right' });
        y += 22;
        isRowEven = !isRowEven;
    });
    doc.y = y + 10;
    doc.strokeColor(BORDER_COLOR).lineWidth(0.5).moveTo(40, doc.y).lineTo(555, doc.y).stroke();
    doc.y += 15;
    // Payments Received Table
    doc.fillColor(DARK).font('Helvetica-Bold').fontSize(11).text('PAYMENT TRANSACTIONS RECORDED', 40, doc.y);
    doc.y += 15;
    const payTableTop = doc.y;
    doc.rect(40, payTableTop, 515, 22).fill('#383531');
    doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(8.5);
    doc.text('DATE', 50, payTableTop + 6);
    doc.text('PAYMENT ID', 140, payTableTop + 6);
    doc.text('METHOD', 250, payTableTop + 6);
    doc.text('REFERENCE ID', 350, payTableTop + 6);
    doc.text('AMOUNT', 470, payTableTop + 6, { width: 75, align: 'right' });
    y = payTableTop + 24;
    isRowEven = false;
    const successfulPayments = (order.payments || []).filter((p) => p.status === 'SUCCESS');
    if (successfulPayments.length === 0) {
        doc.fillColor(GREY).font('Helvetica-Oblique').fontSize(9).text('No payments recorded for this order yet.', 50, y);
        y += 20;
    }
    else {
        successfulPayments.forEach((pay) => {
            if (isRowEven) {
                doc.rect(40, y - 2, 515, 20).fill(LIGHT_BG);
            }
            doc.fillColor(DARK).font('Helvetica').fontSize(8.5);
            doc.text(new Date(pay.paymentDate).toLocaleDateString(), 50, y);
            doc.text(pay.paymentNumber || pay.id.substring(0, 8), 140, y);
            doc.text(pay.paymentMethod, 250, y);
            doc.fillColor(GREY).text(pay.referenceId || 'N/A', 350, y);
            doc.fillColor(DARK).font('Helvetica-Bold').text(formatCurrency(pay.amount, order.currency), 470, y, { width: 75, align: 'right' });
            y += 20;
            isRowEven = !isRowEven;
        });
    }
    doc.y = y + 10;
    // Financial Breakdown Box
    const summaryBoxY = doc.y;
    doc.rect(300, summaryBoxY, 255, 140).fillAndStroke(LIGHT_BG, BORDER_COLOR);
    let sysY = summaryBoxY + 12;
    const drawSummaryLine = (label, value, isBold = false) => {
        doc.fillColor(isBold ? DARK : GREY).font(isBold ? 'Helvetica-Bold' : 'Helvetica').fontSize(9);
        doc.text(label, 315, sysY);
        doc.text(value, 420, sysY, { width: 120, align: 'right' });
        sysY += 16;
    };
    const totalPaid = successfulPayments.reduce((acc, p) => acc + p.amount, 0);
    const totalRefunded = (order.refunds || []).reduce((acc, r) => acc + r.amount, 0);
    const netPaid = totalPaid - totalRefunded;
    const balanceDue = Math.max(0, order.totalAmount - netPaid);
    drawSummaryLine('Subtotal:', formatCurrency(order.subtotal, order.currency));
    if (order.discount > 0)
        drawSummaryLine('Discount:', `-${formatCurrency(order.discount, order.currency)}`);
    if (order.tax > 0)
        drawSummaryLine('Tax:', formatCurrency(order.tax, order.currency));
    if (order.shippingFee > 0)
        drawSummaryLine('Shipping Fee:', formatCurrency(order.shippingFee, order.currency));
    drawSummaryLine('Final Order Total:', formatCurrency(order.totalAmount, order.currency), true);
    drawSummaryLine('Total Payments Received:', formatCurrency(netPaid, order.currency));
    if (totalRefunded > 0)
        drawSummaryLine('Total Refunded:', `-${formatCurrency(totalRefunded, order.currency)}`);
    doc.strokeColor(GOLD).lineWidth(1).moveTo(315, sysY - 4).lineTo(540, sysY - 4).stroke();
    sysY += 4;
    doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(11);
    doc.text('OUTSTANDING BALANCE:', 315, sysY);
    doc.text(formatCurrency(balanceDue, order.currency), 420, sysY, { width: 120, align: 'right' });
    // Payment Status Stamp
    doc.rect(40, summaryBoxY, 240, 60).fill(GOLD);
    doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(12);
    doc.text('PAYMENT STATUS', 55, summaryBoxY + 14);
    doc.fontSize(16).text(order.calculatedStatus || 'PARTIALLY PAID', 55, summaryBoxY + 32);
    drawFooter(doc, 1, 1);
    doc.end();
}
// 2. PAYMENT RECEIPT PDF
async function generatePaymentReceiptPdf(payment, order, res) {
    const doc = new pdfkit_1.default({ size: 'A4', margin: 40 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="Payment_Receipt_${payment.paymentNumber || payment.id}.pdf"`);
    doc.pipe(res);
    drawHeader(doc, {
        docTitle: 'Official Payment Receipt',
        documentNumber: payment.paymentNumber || `PAY-${payment.id.substring(0, 8).toUpperCase()}`,
        dateStr: new Date(payment.paymentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    });
    const startY = 125;
    doc.rect(40, startY, 515, 75).fillAndStroke(LIGHT_BG, BORDER_COLOR);
    doc.fillColor(DARK).font('Helvetica-Bold').fontSize(11).text('RECEIPT CONFIRMATION', 55, startY + 12);
    doc.fillColor(GREY).font('Helvetica').fontSize(9).text(`Order Number: #${order.orderNumber}`, 55, startY + 30);
    doc.text(`Customer Name: ${order.customerName || 'Valued Customer'}`, 55, startY + 45);
    doc.text(`Email: ${order.customerEmail || 'N/A'}`, 55, startY + 58);
    doc.fillColor(DARK).font('Helvetica-Bold').fontSize(10).text('AMOUNT RECEIVED', 360, startY + 12, { width: 180, align: 'right' });
    doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(18).text(formatCurrency(payment.amount, payment.currency), 360, startY + 30, { width: 180, align: 'right' });
    // Payment Details Table
    doc.y = startY + 95;
    doc.fillColor(DARK).font('Helvetica-Bold').fontSize(11).text('TRANSACTION SPECIFICATIONS', 40, doc.y);
    doc.y += 15;
    const tableTop = doc.y;
    doc.rect(40, tableTop, 515, 22).fill(DARK);
    doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(8.5);
    doc.text('FIELD', 55, tableTop + 6);
    doc.text('VALUE / DETAILS', 200, tableTop + 6);
    let y = tableTop + 24;
    const rows = [
        { field: 'Payment Receipt ID', value: payment.paymentNumber || payment.id },
        { field: 'Associated Order ID', value: order.orderNumber },
        { field: 'Payment Date', value: new Date(payment.paymentDate).toLocaleString() },
        { field: 'Payment Method', value: payment.paymentMethod },
        { field: 'Transaction / Reference ID', value: payment.referenceId || 'N/A' },
        { field: 'Recorded By', value: payment.recordedBy || 'Atelier Finance Administrator' },
        { field: 'Payment Status', value: payment.status },
        { field: 'Notes / Remarks', value: payment.notes || 'None' },
    ];
    rows.forEach((r, idx) => {
        if (idx % 2 === 1)
            doc.rect(40, y - 2, 515, 20).fill(LIGHT_BG);
        doc.fillColor(DARK).font('Helvetica-Bold').fontSize(9).text(r.field, 55, y);
        doc.fillColor(GREY).font('Helvetica').fontSize(9).text(r.value, 200, y, { width: 340 });
        y += 20;
    });
    // Account Ledger After Payment
    doc.y = y + 20;
    doc.rect(40, doc.y, 515, 80).fillAndStroke('#383531', DARK);
    const ledgerY = doc.y + 14;
    doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(10).text('ORDER LEDGER SNAPSHOT', 55, ledgerY);
    const totalPaid = (order.payments || [])
        .filter((p) => p.status === 'SUCCESS')
        .reduce((acc, p) => acc + p.amount, 0);
    const balanceRemaining = Math.max(0, order.totalAmount - totalPaid);
    doc.fillColor('#FFFFFF').font('Helvetica').fontSize(9);
    doc.text(`Final Order Total: ${formatCurrency(order.totalAmount, order.currency)}`, 55, ledgerY + 20);
    doc.text(`Total Paid To Date: ${formatCurrency(totalPaid, order.currency)}`, 55, ledgerY + 36);
    doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(11).text(`Remaining Order Balance: ${formatCurrency(balanceRemaining, order.currency)}`, 55, ledgerY + 52);
    drawFooter(doc, 1, 1);
    doc.end();
}
// 3. CUSTOMER ACCOUNT STATEMENT PDF
async function generateCustomerStatementPdf(customer, orders, fromDate, toDate, res) {
    const doc = new pdfkit_1.default({ size: 'A4', margin: 40 });
    if (res) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="Customer_Statement_${customer.name.replace(/\s+/g, '_')}.pdf"`);
        doc.pipe(res);
    }
    const dateRangeStr = fromDate && toDate ? `${fromDate} to ${toDate}` : 'All Time';
    drawHeader(doc, {
        docTitle: 'Customer Statement',
        documentNumber: `CUST-STAT-${customer.id.substring(0, 6).toUpperCase()}`,
        dateStr: new Date().toLocaleDateString(),
    });
    doc.y = 120;
    doc.fillColor(DARK).font('Helvetica-Bold').fontSize(11).text('CLIENT ACCOUNT SUMMARY', 40, doc.y);
    doc.fillColor(GREY).font('Helvetica').fontSize(9).text(`Client Name: ${customer.name}`, 40, doc.y + 15);
    doc.text(`Email: ${customer.email}`, 40, doc.y + 28);
    doc.text(`Phone: ${customer.phone || 'N/A'}`, 40, doc.y + 41);
    doc.text(`Statement Period: ${dateRangeStr}`, 40, doc.y + 54);
    let totalBilled = 0;
    let totalPaid = 0;
    orders.forEach((o) => {
        totalBilled += o.totalAmount;
        const paid = (o.payments || []).filter((p) => p.status === 'SUCCESS').reduce((a, p) => a + p.amount, 0);
        totalPaid += paid;
    });
    const totalOutstanding = Math.max(0, totalBilled - totalPaid);
    doc.rect(320, 120, 235, 65).fillAndStroke(LIGHT_BG, BORDER_COLOR);
    doc.fillColor(GREY).font('Helvetica').fontSize(8.5).text('Total Invoiced:', 330, 128);
    doc.fillColor(DARK).font('Helvetica-Bold').text(formatCurrency(totalBilled), 440, 128, { width: 105, align: 'right' });
    doc.fillColor(GREY).font('Helvetica').text('Total Payments:', 330, 143);
    doc.fillColor(DARK).font('Helvetica-Bold').text(formatCurrency(totalPaid), 440, 143, { width: 105, align: 'right' });
    doc.fillColor(GOLD).font('Helvetica-Bold').text('Net Balance Due:', 330, 160);
    doc.text(formatCurrency(totalOutstanding), 440, 160, { width: 105, align: 'right' });
    doc.y = 205;
    doc.fillColor(DARK).font('Helvetica-Bold').fontSize(11).text('TRANSACTION LEDGER HISTORY', 40, doc.y);
    doc.y += 15;
    const tableTop = doc.y;
    doc.rect(40, tableTop, 515, 22).fill(DARK);
    doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(8.5);
    doc.text('DATE', 50, tableTop + 6);
    doc.text('TYPE / REF', 120, tableTop + 6);
    doc.text('DEBIT (ORDER)', 250, tableTop + 6, { width: 90, align: 'right' });
    doc.text('CREDIT (PAID)', 350, tableTop + 6, { width: 90, align: 'right' });
    doc.text('RUNNING BAL', 450, tableTop + 6, { width: 95, align: 'right' });
    let y = tableTop + 24;
    let runningBalance = 0;
    let isRowEven = false;
    orders.forEach((ord) => {
        // Order row (Debit)
        runningBalance += ord.totalAmount;
        if (isRowEven)
            doc.rect(40, y - 2, 515, 20).fill(LIGHT_BG);
        doc.fillColor(DARK).font('Helvetica').fontSize(8.5);
        doc.text(new Date(ord.orderDate).toLocaleDateString(), 50, y);
        doc.text(`Order #${ord.orderNumber}`, 120, y);
        doc.text(formatCurrency(ord.totalAmount), 250, y, { width: 90, align: 'right' });
        doc.text('-', 350, y, { width: 90, align: 'right' });
        doc.font('Helvetica-Bold').text(formatCurrency(runningBalance), 450, y, { width: 95, align: 'right' });
        y += 20;
        isRowEven = !isRowEven;
        // Payments rows (Credit)
        (ord.payments || []).filter((p) => p.status === 'SUCCESS').forEach((pay) => {
            runningBalance -= pay.amount;
            if (isRowEven)
                doc.rect(40, y - 2, 515, 20).fill(LIGHT_BG);
            doc.fillColor(DARK).font('Helvetica').fontSize(8.5);
            doc.text(new Date(pay.paymentDate).toLocaleDateString(), 50, y);
            doc.text(`Payment (${pay.paymentMethod})`, 120, y);
            doc.text('-', 250, y, { width: 90, align: 'right' });
            doc.fillColor('#2e7d32').text(formatCurrency(pay.amount), 350, y, { width: 90, align: 'right' });
            doc.fillColor(DARK).font('Helvetica-Bold').text(formatCurrency(runningBalance), 450, y, { width: 95, align: 'right' });
            y += 20;
            isRowEven = !isRowEven;
        });
    });
    drawFooter(doc, 1, 1);
    doc.end();
    return doc;
}
// 4. MONTHLY & YEARLY STATEMENT PDF GENERATOR
async function generateFinancialStatementPdf(title, metrics, rows, periodStr, res) {
    const doc = new pdfkit_1.default({ size: 'A4', margin: 40 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${title.replace(/\s+/g, '_')}_${periodStr}.pdf"`);
    doc.pipe(res);
    drawHeader(doc, {
        docTitle: title,
        documentNumber: `FJ-STAT-${Date.now().toString().substring(5)}`,
        dateStr: periodStr,
    });
    doc.y = 120;
    doc.fillColor(DARK).font('Helvetica-Bold').fontSize(11).text('FINANCIAL OVERVIEW METRICS', 40, doc.y);
    doc.y += 15;
    const cardWidth = 160;
    const cardHeight = 45;
    let cardX = 40;
    let cardY = doc.y;
    const cards = [
        { label: 'TOTAL ORDERS', val: metrics.totalOrders },
        { label: 'GROSS SALES', val: formatCurrency(metrics.grossSales) },
        { label: 'PAYMENTS RECEIVED', val: formatCurrency(metrics.paymentsReceived) },
        { label: 'REFUNDS ISSUED', val: formatCurrency(metrics.totalRefunds) },
        { label: 'OUTSTANDING BALANCE', val: formatCurrency(metrics.outstandingBalance) },
        { label: 'NET REVENUE', val: formatCurrency(metrics.netRevenue) },
    ];
    cards.forEach((c, idx) => {
        if (idx === 3) {
            cardX = 40;
            cardY += 52;
        }
        doc.rect(cardX, cardY, cardWidth, cardHeight).fillAndStroke(LIGHT_BG, BORDER_COLOR);
        doc.fillColor(GREY).font('Helvetica').fontSize(7.5).text(c.label, cardX + 10, cardY + 8);
        doc.fillColor(DARK).font('Helvetica-Bold').fontSize(12).text(c.val.toString(), cardX + 10, cardY + 22);
        cardX += 175;
    });
    doc.y = cardY + 60;
    doc.fillColor(DARK).font('Helvetica-Bold').fontSize(11).text('BREAKDOWN DETAILS', 40, doc.y);
    doc.y += 15;
    const tableTop = doc.y;
    doc.rect(40, tableTop, 515, 22).fill(DARK);
    doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(8.5);
    doc.text('PERIOD / ITEM', 50, tableTop + 6);
    doc.text('ORDERS', 180, tableTop + 6, { width: 50, align: 'center' });
    doc.text('GROSS SALES', 240, tableTop + 6, { width: 85, align: 'right' });
    doc.text('PAYMENTS', 330, tableTop + 6, { width: 85, align: 'right' });
    doc.text('OUTSTANDING', 425, tableTop + 6, { width: 120, align: 'right' });
    let y = tableTop + 24;
    let isRowEven = false;
    rows.forEach((r) => {
        if (isRowEven)
            doc.rect(40, y - 2, 515, 20).fill(LIGHT_BG);
        doc.fillColor(DARK).font('Helvetica').fontSize(8.5);
        doc.text(r.label || r.orderNumber, 50, y);
        doc.text((r.ordersCount || 1).toString(), 180, y, { width: 50, align: 'center' });
        doc.text(formatCurrency(r.sales || r.totalAmount), 240, y, { width: 85, align: 'right' });
        doc.text(formatCurrency(r.payments || r.paidAmount), 330, y, { width: 85, align: 'right' });
        doc.font('Helvetica-Bold').text(formatCurrency(r.outstanding || r.balanceDue), 425, y, { width: 120, align: 'right' });
        y += 20;
        isRowEven = !isRowEven;
    });
    drawFooter(doc, 1, 1);
    doc.end();
}
// 5. ORDER INVOICE PDF GENERATOR
async function generateOrderInvoicePdf(order, res) {
    const doc = new pdfkit_1.default({ size: 'A4', margin: 40 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="Invoice_${order.orderNumber}.pdf"`);
    doc.pipe(res);
    drawHeader(doc, {
        docTitle: 'Tax Invoice',
        documentNumber: `INV-${order.orderNumber}`,
        dateStr: new Date(order.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    });
    doc.y = 120;
    const startY = doc.y;
    doc.fillColor(DARK).font('Helvetica-Bold').fontSize(10).text('ISSUED TO:', 40, startY);
    doc.fillColor(DARK).font('Helvetica-Bold').fontSize(9.5).text(order.customerName || 'Valued Client', 40, startY + 15);
    doc.fillColor(GREY).font('Helvetica').fontSize(9).text(`Email: ${order.customerEmail || 'N/A'}`, 40, startY + 30);
    doc.text(`Phone: ${order.customerPhone || 'N/A'}`, 40, startY + 43);
    doc.text(`Billing: ${order.billingAddress || 'N/A'}`, 40, startY + 56, { width: 230 });
    doc.fillColor(DARK).font('Helvetica-Bold').fontSize(10).text('INVOICE SUMMARY:', 320, startY);
    doc.fillColor(GREY).font('Helvetica').fontSize(9).text(`Order Ref: ${order.orderNumber}`, 320, startY + 15);
    doc.text(`Order Date: ${new Date(order.orderDate).toLocaleDateString()}`, 320, startY + 30);
    doc.text(`Order Status: ${order.orderStatus}`, 320, startY + 43);
    doc.text(`Payment Status: ${order.calculatedStatus || 'UNPAID'}`, 320, startY + 56);
    doc.y = startY + 105;
    doc.strokeColor(BORDER_COLOR).lineWidth(0.5).moveTo(40, doc.y).lineTo(555, doc.y).stroke();
    doc.y += 15;
    const tableTop = doc.y;
    doc.rect(40, tableTop, 515, 22).fill(DARK);
    doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(8.5);
    doc.text('ITEM', 50, tableTop + 6);
    doc.text('QTY', 320, tableTop + 6, { width: 40, align: 'center' });
    doc.text('UNIT PRICE', 370, tableTop + 6, { width: 85, align: 'right' });
    doc.text('TOTAL', 465, tableTop + 6, { width: 80, align: 'right' });
    let y = tableTop + 24;
    let isRowEven = false;
    (order.items || []).forEach((item) => {
        if (isRowEven)
            doc.rect(40, y - 2, 515, 22).fill(LIGHT_BG);
        doc.fillColor(DARK).font('Helvetica').fontSize(9).text(item.productName, 50, y, { width: 260 });
        doc.text(item.quantity.toString(), 320, y, { width: 40, align: 'center' });
        doc.text(formatCurrency(item.unitPrice, order.currency), 370, y, { width: 85, align: 'right' });
        doc.font('Helvetica-Bold').text(formatCurrency(item.subtotal, order.currency), 465, y, { width: 80, align: 'right' });
        y += 22;
        isRowEven = !isRowEven;
    });
    doc.y = y + 10;
    doc.rect(320, doc.y, 235, 110).fillAndStroke(LIGHT_BG, BORDER_COLOR);
    let sysY = doc.y + 10;
    doc.fillColor(GREY).font('Helvetica').fontSize(9).text('Subtotal:', 330, sysY);
    doc.fillColor(DARK).text(formatCurrency(order.subtotal, order.currency), 430, sysY, { width: 110, align: 'right' });
    sysY += 16;
    if (order.discount > 0) {
        doc.fillColor(GREY).text('Discount:', 330, sysY);
        doc.fillColor(DARK).text(`-${formatCurrency(order.discount, order.currency)}`, 430, sysY, { width: 110, align: 'right' });
        sysY += 16;
    }
    if (order.tax > 0) {
        doc.fillColor(GREY).text('Tax:', 330, sysY);
        doc.fillColor(DARK).text(formatCurrency(order.tax, order.currency), 430, sysY, { width: 110, align: 'right' });
        sysY += 16;
    }
    if (order.shippingFee > 0) {
        doc.fillColor(GREY).text('Shipping:', 330, sysY);
        doc.fillColor(DARK).text(formatCurrency(order.shippingFee, order.currency), 430, sysY, { width: 110, align: 'right' });
        sysY += 16;
    }
    doc.strokeColor(GOLD).lineWidth(1).moveTo(330, sysY).lineTo(545, sysY).stroke();
    sysY += 6;
    doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(11).text('TOTAL DUE:', 330, sysY);
    doc.text(formatCurrency(order.totalAmount, order.currency), 430, sysY, { width: 110, align: 'right' });
    drawFooter(doc, 1, 1);
    doc.end();
}
