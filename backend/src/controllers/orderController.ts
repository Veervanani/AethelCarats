import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../prisma';

// Utility to calculate financial status for an order
export function computeOrderFinancials(order: any) {
  const subtotal = order.subtotal || 0;
  const tax = order.tax || 0;
  const shippingFee = order.shippingFee || 0;
  const discount = order.discount || 0;
  const finalOrderTotal = subtotal + tax + shippingFee - discount;

  const successfulPayments = (order.payments || []).filter((p: any) => p.status === 'SUCCESS');
  const paidAmount = successfulPayments.reduce((acc: number, p: any) => acc + (p.amount || 0), 0);

  const refunds = order.refunds || [];
  const refundedAmount = refunds.reduce((acc: number, r: any) => acc + (r.amount || 0), 0);

  const netPaid = paidAmount - refundedAmount;
  const balanceDue = Math.max(0, finalOrderTotal - netPaid);

  let calculatedStatus = 'UNPAID';
  if (refundedAmount >= finalOrderTotal && paidAmount <= refundedAmount && finalOrderTotal > 0) {
    calculatedStatus = 'REFUNDED';
  } else if (refundedAmount > 0) {
    calculatedStatus = 'PARTIALLY REFUNDED';
  } else if (paidAmount <= 0) {
    calculatedStatus = 'UNPAID';
  } else if (paidAmount < finalOrderTotal - 0.01) {
    calculatedStatus = 'PARTIALLY PAID';
  } else if (Math.abs(paidAmount - finalOrderTotal) <= 0.01) {
    calculatedStatus = 'PAID';
  } else if (paidAmount > finalOrderTotal + 0.01) {
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

export const getOrders = async (req: AuthRequest, res: Response) => {
  try {
    const { search, orderStatus, paymentStatus, fromDate, toDate, customerId } = req.query;

    const where: any = {};

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
      if (fromDate) where.orderDate.gte = new Date(String(fromDate));
      if (toDate) where.orderDate.lte = new Date(String(toDate) + 'T23:59:59.999Z');
    }

    const orders = await prisma.order.findMany({
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
        if (!paymentStatus || paymentStatus === 'ALL') return true;
        return o.calculatedStatus === String(paymentStatus);
      });

    return res.status(200).json(enrichedOrders);
  } catch (error) {
    console.error('getOrders error:', error);
    return res.status(500).json({ message: 'Error retrieving orders' });
  }
};

export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findFirst({
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

    const auditLogs = await prisma.financialAuditLog.findMany({
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
  } catch (error) {
    console.error('getOrderById error:', error);
    return res.status(500).json({ message: 'Error retrieving order detail' });
  }
};

import { isHolidayModeActive } from './settingController';

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const holiday = await isHolidayModeActive();
    if (holiday.active) {
      return res.status(403).json({
        message: holiday.message || 'Orders are temporarily unavailable while Holiday Mode is active.'
      });
    }

    const {
      customerName,
      customerEmail,
      customerPhone,
      billingAddress,
      shippingAddress,
      items,
      subtotal,
      tax = 0,
      shippingFee = 0,
      discount = 0,
      currency = 'USD',
      notes,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    // Auto generate unique order number (e.g. FJ-10026)
    const count = await prisma.order.count();
    const nextNum = 10001 + count;
    const orderNumber = `FJ-${nextNum}`;

    let customerId = null;
    if (customerEmail) {
      let customer = await prisma.customer.findUnique({ where: { email: customerEmail } });
      if (!customer) {
        customer = await prisma.customer.create({
          data: {
            email: customerEmail,
            name: customerName || 'Valued Client',
            phone: customerPhone,
          },
        });
      }
      customerId = customer.id;
    }

    const calculatedSubtotal = items.reduce((acc: number, item: any) => acc + (item.unitPrice * item.quantity - (item.discount || 0)), 0);
    const finalTotal = (subtotal || calculatedSubtotal) + Number(tax) + Number(shippingFee) - Number(discount);

    const order = await prisma.order.create({
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
          create: items.map((i: any) => ({
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
    await prisma.financialAuditLog.create({
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
  } catch (error) {
    console.error('createOrder error:', error);
    return res.status(500).json({ message: 'Error creating order' });
  }
};

export const createPublicOrder = async (req: any, res: Response) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      billingAddress,
      shippingAddress,
      items,
      subtotal,
      tax = 0,
      shippingFee = 0,
      discount = 0,
      currency = 'USD',
      notes,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    // Auto generate unique order number (e.g. FJ-10028)
    const count = await prisma.order.count();
    const nextNum = 10001 + count;
    const orderNumber = `FJ-${nextNum}`;

    let customerId = null;
    if (customerEmail) {
      let customer = await prisma.customer.findUnique({ where: { email: customerEmail } });
      if (!customer) {
        customer = await prisma.customer.create({
          data: {
            email: customerEmail,
            name: customerName || 'Valued Client',
            phone: customerPhone || null,
          },
        });
      }
      customerId = customer.id;
    }

    const calculatedSubtotal = items.reduce((acc: number, item: any) => acc + (Number(item.unitPrice || 0) * Number(item.quantity || 1) - Number(item.discount || 0)), 0);
    const finalTotal = (subtotal || calculatedSubtotal) + Number(tax) + Number(shippingFee) - Number(discount);

    const order = await prisma.order.create({
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
          create: items.map((i: any) => ({
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
  } catch (error: any) {
    console.error('createPublicOrder error:', error);
    return res.status(500).json({ message: error.message || 'Failed to place order' });
  }
};

export const updateOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const {
      orderStatus,
      customerName,
      customerEmail,
      customerPhone,
      subtotal,
      tax,
      shippingFee,
      discount,
      totalAmount,
      notes,
      billingAddress,
      shippingAddress,
      reason,
      courierCompany,
      trackingNumber,
    } = req.body;

    const existingOrder = await prisma.order.findUnique({ where: { id } });
    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (courierCompany || trackingNumber) {
      await prisma.shipment.create({
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

    const updated = await prisma.order.update({
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
    await prisma.financialAuditLog.create({
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
  } catch (error) {
    console.error('updateOrder error:', error);
    return res.status(500).json({ message: 'Error updating order' });
  }
};

export const deleteOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const existingOrder = await prisma.order.findUnique({ where: { id } });
    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await prisma.orderItem.deleteMany({ where: { orderId: id } });
    await prisma.payment.deleteMany({ where: { orderId: id } });
    await prisma.refund.deleteMany({ where: { orderId: id } });
    await prisma.shipment.deleteMany({ where: { orderId: id } });
    await prisma.order.delete({ where: { id } });

    await prisma.financialAuditLog.create({
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
  } catch (error: any) {
    console.error('deleteOrder error:', error);
    return res.status(500).json({ message: error.message || 'Failed to delete order' });
  }
};

export const wipeAllOrders = async (req: AuthRequest, res: Response) => {
  try {
    await prisma.orderItem.deleteMany({});
    await prisma.payment.deleteMany({});
    await prisma.refund.deleteMany({});
    await prisma.shipment.deleteMany({});
    await prisma.financialAuditLog.deleteMany({});
    await prisma.order.deleteMany({});

    return res.status(200).json({ message: 'All orders wiped to 0 successfully.' });
  } catch (error: any) {
    console.error('wipeAllOrders error:', error);
    return res.status(500).json({ message: error.message || 'Failed to wipe orders' });
  }
};

export const trackPublicOrder = async (req: any, res: Response) => {
  try {
    const { orderNumber, email } = req.query;
    if (!orderNumber) {
      return res.status(400).json({ message: 'Order number is required' });
    }

    const rawQ = String(orderNumber).trim().replace(/^#/, '');

    // Match exact orderNumber, or containing number, or FJ- prefixed number
    let order = await prisma.order.findFirst({
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
      order = await prisma.order.findFirst({
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
  } catch (error: any) {
    console.error('trackPublicOrder error:', error);
    return res.status(500).json({ message: 'Error retrieving order status' });
  }
};

export const getOrdersByCustomerEmail = async (req: any, res: Response) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.json([]);
    }

    const orders = await prisma.order.findMany({
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
  } catch (error: any) {
    console.error('getOrdersByCustomerEmail error:', error);
    return res.status(500).json({ message: 'Error loading client orders' });
  }
};

export const getOrderSummaryMetrics = async (req: AuthRequest, res: Response) => {
  try {
    const { period, fromDate, toDate } = req.query;

    const now = new Date();
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    if (period === 'today') {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (period === 'yesterday') {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, -1);
    } else if (period === 'this_week') {
      const day = now.getDay();
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day);
    } else if (period === 'this_month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (period === 'last_month') {
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      endDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
    } else if (period === 'this_year') {
      startDate = new Date(now.getFullYear(), 0, 1);
    } else if (fromDate || toDate) {
      if (fromDate) startDate = new Date(String(fromDate));
      if (toDate) endDate = new Date(String(toDate) + 'T23:59:59.999Z');
    }

    const where: any = {};
    if (startDate || endDate) {
      where.orderDate = {};
      if (startDate) where.orderDate.gte = startDate;
      if (endDate) where.orderDate.lte = endDate;
    }

    const orders = await prisma.order.findMany({
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
  } catch (error) {
    console.error('getOrderSummaryMetrics error:', error);
    return res.status(500).json({ message: 'Error computing order metrics' });
  }
};
