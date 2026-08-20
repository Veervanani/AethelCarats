import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { computeOrderFinancials } from './orderController';
import prisma from '../prisma';

export const getRefunds = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId, fromDate, toDate } = req.query;

    const where: any = {};
    if (orderId) where.orderId = String(orderId);
    if (fromDate || toDate) {
      where.refundDate = {};
      if (fromDate) where.refundDate.gte = new Date(String(fromDate));
      if (toDate) where.refundDate.lte = new Date(String(toDate) + 'T23:59:59.999Z');
    }

    const refunds = await prisma.refund.findMany({
      where,
      include: {
        order: true,
        payment: true,
      },
      orderBy: { refundDate: 'desc' },
    });

    return res.status(200).json(refunds);
  } catch (error) {
    console.error('getRefunds error:', error);
    return res.status(500).json({ message: 'Error retrieving refunds' });
  }
};

export const createRefund = async (req: AuthRequest, res: Response) => {
  try {
    const {
      orderId,
      paymentId,
      amount,
      refundMethod = 'Original Payment Method',
      reason,
      notes,
      referenceId,
    } = req.body;

    if (!orderId || !amount || Number(amount) <= 0) {
      return res.status(400).json({ message: 'Order ID and valid Refund Amount are required' });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { payments: true, refunds: true },
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const year = new Date().getFullYear();
    const count = await prisma.refund.count();
    const numPadded = String(count + 1).padStart(5, '0');
    const refundNumber = `FJ-REF-${year}-${numPadded}`;

    const recordedBy = req.user?.email || 'Admin';

    const refund = await prisma.refund.create({
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

    const updatedOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: { payments: true, refunds: true },
    });

    const fin = computeOrderFinancials(updatedOrder);

    // Audit log
    await prisma.financialAuditLog.create({
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
  } catch (error) {
    console.error('createRefund error:', error);
    return res.status(500).json({ message: 'Error creating refund' });
  }
};
