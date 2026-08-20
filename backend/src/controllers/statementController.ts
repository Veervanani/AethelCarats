import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import {
  generateOrderStatementPdf,
  generatePaymentReceiptPdf,
  generateCustomerStatementPdf,
  generateFinancialStatementPdf,
  generateOrderInvoicePdf,
} from '../services/pdfService';
import { exportOrdersToExcel, exportOrdersToCsv, exportPaymentsToExcel } from '../services/exportService';
import { computeOrderFinancials } from './orderController';
import prisma from '../prisma';

// 1. ORDER STATEMENT PDF
export const getOrderStatementPdf = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId } = req.params;

    const order = await prisma.order.findFirst({
      where: { OR: [{ id: orderId }, { orderNumber: orderId }] },
      include: {
        items: true,
        payments: { orderBy: { paymentDate: 'asc' } },
        refunds: { orderBy: { refundDate: 'asc' } },
        customer: true,
      },
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const fin = computeOrderFinancials(order);
    const enrichedOrder = { ...order, ...fin };

    await generateOrderStatementPdf(enrichedOrder, res);
  } catch (error) {
    console.error('getOrderStatementPdf error:', error);
    return res.status(500).json({ message: 'Error generating order statement PDF' });
  }
};

// 2. PAYMENT RECEIPT PDF
export const getPaymentReceiptPdf = async (req: AuthRequest, res: Response) => {
  try {
    const { paymentId } = req.params;

    const payment = await prisma.payment.findFirst({
      where: { OR: [{ id: paymentId }, { paymentNumber: paymentId }] },
      include: {
        order: {
          include: {
            items: true,
            payments: true,
            refunds: true,
          },
        },
      },
    });

    if (!payment || !payment.order) {
      return res.status(404).json({ message: 'Payment record or associated order not found' });
    }

    await generatePaymentReceiptPdf(payment, payment.order, res);
  } catch (error) {
    console.error('getPaymentReceiptPdf error:', error);
    return res.status(500).json({ message: 'Error generating payment receipt PDF' });
  }
};

// 3. ORDER INVOICE PDF
export const getOrderInvoicePdf = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId } = req.params;

    const order = await prisma.order.findFirst({
      where: { OR: [{ id: orderId }, { orderNumber: orderId }] },
      include: {
        items: true,
        payments: true,
        refunds: true,
        customer: true,
      },
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const fin = computeOrderFinancials(order);
    const enrichedOrder = { ...order, ...fin };

    await generateOrderInvoicePdf(enrichedOrder, res);
  } catch (error) {
    console.error('getOrderInvoicePdf error:', error);
    return res.status(500).json({ message: 'Error generating order invoice PDF' });
  }
};

// 4. CUSTOMER ACCOUNT STATEMENT PDF & DATA
export const getCustomerStatementPdf = async (req: AuthRequest, res: Response) => {
  try {
    const { customerId } = req.params;
    const { fromDate, toDate } = req.query;

    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const where: any = { customerId };
    if (fromDate || toDate) {
      where.orderDate = {};
      if (fromDate) where.orderDate.gte = new Date(String(fromDate));
      if (toDate) where.orderDate.lte = new Date(String(toDate) + 'T23:59:59.999Z');
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: true,
        payments: true,
        refunds: true,
      },
      orderBy: { orderDate: 'asc' },
    });

    await generateCustomerStatementPdf(customer, orders, String(fromDate || ''), String(toDate || ''), res);
  } catch (error) {
    console.error('getCustomerStatementPdf error:', error);
    return res.status(500).json({ message: 'Error generating customer statement PDF' });
  }
};

// 5. MONTHLY STATEMENT PDF
export const getMonthlyStatementPdf = async (req: AuthRequest, res: Response) => {
  try {
    const month = Number(req.query.month) || new Date().getMonth() + 1;
    const year = Number(req.query.year) || new Date().getFullYear();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = monthNames[month - 1] || 'Current';

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const orders = await prisma.order.findMany({
      where: {
        orderDate: { gte: startDate, lte: endDate },
      },
      include: {
        payments: true,
        refunds: true,
      },
      orderBy: { orderDate: 'asc' },
    });

    let grossSales = 0;
    let paymentsReceived = 0;
    let totalRefunds = 0;

    const rows = orders.map((o) => {
      const fin = computeOrderFinancials(o);
      grossSales += fin.finalOrderTotal;
      paymentsReceived += fin.paidAmount;
      totalRefunds += fin.refundedAmount;

      return {
        label: `#${o.orderNumber} - ${o.customerName || 'Client'}`,
        ordersCount: 1,
        sales: fin.finalOrderTotal,
        payments: fin.paidAmount,
        outstanding: fin.balanceDue,
      };
    });

    const netRevenue = paymentsReceived - totalRefunds;
    const outstandingBalance = Math.max(0, grossSales - (paymentsReceived - totalRefunds));

    const metrics = {
      totalOrders: orders.length,
      grossSales,
      paymentsReceived,
      totalRefunds,
      outstandingBalance,
      netRevenue,
    };

    await generateFinancialStatementPdf(`${monthName.toUpperCase()} ${year} ORDER & PAYMENT STATEMENT`, metrics, rows, `${monthName} ${year}`, res);
  } catch (error) {
    console.error('getMonthlyStatementPdf error:', error);
    return res.status(500).json({ message: 'Error generating monthly statement PDF' });
  }
};

// 6. YEARLY STATEMENT PDF
export const getYearlyStatementPdf = async (req: AuthRequest, res: Response) => {
  try {
    const year = Number(req.query.year) || new Date().getFullYear();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59, 999);

    const orders = await prisma.order.findMany({
      where: {
        orderDate: { gte: startDate, lte: endDate },
      },
      include: {
        payments: true,
        refunds: true,
      },
    });

    let yearGrossSales = 0;
    let yearPayments = 0;
    let yearRefunds = 0;

    const rows = monthNames.map((mName, mIdx) => {
      const mOrders = orders.filter((o) => new Date(o.orderDate).getMonth() === mIdx);
      let mSales = 0;
      let mPayments = 0;
      let mRefunds = 0;

      mOrders.forEach((o) => {
        const fin = computeOrderFinancials(o);
        mSales += fin.finalOrderTotal;
        mPayments += fin.paidAmount;
        mRefunds += fin.refundedAmount;
      });

      yearGrossSales += mSales;
      yearPayments += mPayments;
      yearRefunds += mRefunds;

      return {
        label: mName,
        ordersCount: mOrders.length,
        sales: mSales,
        payments: mPayments,
        outstanding: Math.max(0, mSales - (mPayments - mRefunds)),
      };
    });

    const metrics = {
      totalOrders: orders.length,
      grossSales: yearGrossSales,
      paymentsReceived: yearPayments,
      totalRefunds: yearRefunds,
      outstandingBalance: Math.max(0, yearGrossSales - (yearPayments - yearRefunds)),
      netRevenue: yearPayments - yearRefunds,
    };

    await generateFinancialStatementPdf(`ANNUAL FINANCIAL STATEMENT ${year}`, metrics, rows, `Year ${year}`, res);
  } catch (error) {
    console.error('getYearlyStatementPdf error:', error);
    return res.status(500).json({ message: 'Error generating yearly statement PDF' });
  }
};

// 7. CUSTOM DATE RANGE STATEMENT PDF
export const getCustomStatementPdf = async (req: AuthRequest, res: Response) => {
  try {
    const { fromDate, toDate, orderStatus, paymentStatus } = req.query;

    const where: any = {};
    if (fromDate || toDate) {
      where.orderDate = {};
      if (fromDate) where.orderDate.gte = new Date(String(fromDate));
      if (toDate) where.orderDate.lte = new Date(String(toDate) + 'T23:59:59.999Z');
    }
    if (orderStatus && orderStatus !== 'ALL') {
      where.orderStatus = String(orderStatus);
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        payments: true,
        refunds: true,
      },
      orderBy: { orderDate: 'desc' },
    });

    const filtered = orders.filter((o) => {
      if (!paymentStatus || paymentStatus === 'ALL') return true;
      const fin = computeOrderFinancials(o);
      return fin.calculatedStatus === String(paymentStatus);
    });

    let grossSales = 0;
    let paymentsReceived = 0;
    let totalRefunds = 0;

    const rows = filtered.map((o) => {
      const fin = computeOrderFinancials(o);
      grossSales += fin.finalOrderTotal;
      paymentsReceived += fin.paidAmount;
      totalRefunds += fin.refundedAmount;

      return {
        label: `#${o.orderNumber} - ${o.customerName || 'Client'}`,
        ordersCount: 1,
        sales: fin.finalOrderTotal,
        payments: fin.paidAmount,
        outstanding: fin.balanceDue,
      };
    });

    const metrics = {
      totalOrders: filtered.length,
      grossSales,
      paymentsReceived,
      totalRefunds,
      outstandingBalance: Math.max(0, grossSales - (paymentsReceived - totalRefunds)),
      netRevenue: paymentsReceived - totalRefunds,
    };

    const dateLabel = `${fromDate || 'Start'} to ${toDate || 'Present'}`;
    await generateFinancialStatementPdf(`CUSTOM PERIOD ORDER STATEMENT`, metrics, rows, dateLabel, res);
  } catch (error) {
    console.error('getCustomStatementPdf error:', error);
    return res.status(500).json({ message: 'Error generating custom statement PDF' });
  }
};

// EXPORT ENDPOINTS
export const exportData = async (req: AuthRequest, res: Response) => {
  try {
    const { format = 'excel', type = 'orders', fromDate, toDate } = req.query;

    if (type === 'payments') {
      const payments = await prisma.payment.findMany({
        include: { order: true },
        orderBy: { paymentDate: 'desc' },
      });
      return exportPaymentsToExcel(payments, res);
    }

    const where: any = {};
    if (fromDate || toDate) {
      where.orderDate = {};
      if (fromDate) where.orderDate.gte = new Date(String(fromDate));
      if (toDate) where.orderDate.lte = new Date(String(toDate) + 'T23:59:59.999Z');
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: true,
        payments: true,
        refunds: true,
      },
      orderBy: { orderDate: 'desc' },
    });

    const enriched = orders.map((o) => ({
      ...o,
      ...computeOrderFinancials(o),
    }));

    if (format === 'csv') {
      return exportOrdersToCsv(enriched, res);
    } else {
      return exportOrdersToExcel(enriched, res);
    }
  } catch (error) {
    console.error('exportData error:', error);
    return res.status(500).json({ message: 'Error exporting financial data' });
  }
};

// FINANCIAL AUDIT LOGS
export const getFinancialAuditLogs = async (req: AuthRequest, res: Response) => {
  try {
    const logs = await prisma.financialAuditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    return res.status(200).json(logs);
  } catch (error) {
    console.error('getFinancialAuditLogs error:', error);
    return res.status(500).json({ message: 'Error fetching financial audit logs' });
  }
};

// CUSTOMERS WITH FINANCIAL HISTORY
export const getCustomersWithFinancials = async (req: AuthRequest, res: Response) => {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        orders: {
          include: {
            payments: true,
            refunds: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    const enriched = customers.map((c) => {
      let totalOrdersCount = c.orders.length;
      let totalInvoiced = 0;
      let totalPaid = 0;
      let totalRefunds = 0;

      c.orders.forEach((o) => {
        const fin = computeOrderFinancials(o);
        totalInvoiced += fin.finalOrderTotal;
        totalPaid += fin.paidAmount;
        totalRefunds += fin.refundedAmount;
      });

      const netPaid = totalPaid - totalRefunds;
      const outstandingBalance = Math.max(0, totalInvoiced - netPaid);

      return {
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        country: c.country,
        createdAt: c.createdAt,
        totalOrdersCount,
        totalInvoiced,
        totalPaid,
        totalRefunds,
        netPaid,
        outstandingBalance,
      };
    });

    return res.status(200).json(enriched);
  } catch (error) {
    console.error('getCustomersWithFinancials error:', error);
    return res.status(500).json({ message: 'Error fetching customers' });
  }
};

export const getCustomerDetailWithLedger = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        orders: {
          include: {
            items: true,
            payments: { orderBy: { paymentDate: 'asc' } },
            refunds: { orderBy: { refundDate: 'asc' } },
          },
          orderBy: { orderDate: 'desc' },
        },
        addresses: true,
      },
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    let totalInvoiced = 0;
    let totalPaid = 0;
    let totalRefunds = 0;

    const enrichedOrders = customer.orders.map((o) => {
      const fin = computeOrderFinancials(o);
      totalInvoiced += fin.finalOrderTotal;
      totalPaid += fin.paidAmount;
      totalRefunds += fin.refundedAmount;
      return {
        ...o,
        ...fin,
      };
    });

    const outstandingBalance = Math.max(0, totalInvoiced - (totalPaid - totalRefunds));

    return res.status(200).json({
      ...customer,
      orders: enrichedOrders,
      financialSummary: {
        totalInvoiced,
        totalPaid,
        totalRefunds,
        netPaid: totalPaid - totalRefunds,
        outstandingBalance,
      },
    });
  } catch (error) {
    console.error('getCustomerDetailWithLedger error:', error);
    return res.status(500).json({ message: 'Error fetching customer ledger detail' });
  }
};
