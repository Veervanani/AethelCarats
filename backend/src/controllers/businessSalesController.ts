import { Response } from 'express';
import prisma from '../prisma';
import { AuthRequest } from '../middleware/auth';

export interface FinancialCalculationInput {
  sellingPrice: number;
  discount?: number;
  purchasePrice: number;
  gstPercent?: number;
  shippingCost?: number;
  commissionPercent?: number;
  commissionBasis?: 'NET_PROFIT' | 'SALE_AMOUNT' | 'FIXED_AMOUNT';
  amountReceived?: number;
  paymentStatus?: string;
  dollarRate?: number;
}

export function computeAuthoritativeFinancials(input: FinancialCalculationInput) {
  const sellingPrice = Number(input.sellingPrice) || 0;
  const discount = Number(input.discount) || 0;
  const finalSaleAmount = Math.max(0, sellingPrice - discount);

  const purchasePrice = Number(input.purchasePrice) || 0;
  const gstPercent = Number(input.gstPercent) || 0;
  const gstAmount = Number((purchasePrice * gstPercent).toFixed(4));
  const finalPurchasePrice = Number((purchasePrice + gstAmount).toFixed(4));

  const shippingCost = Number(input.shippingCost) || 0;
  const grossProfit = Number((finalSaleAmount - finalPurchasePrice).toFixed(4));
  const netProfit = Number((grossProfit - shippingCost).toFixed(4));

  const commRate = Number(input.commissionPercent) || 0;
  const basis = input.commissionBasis || 'NET_PROFIT';

  let commissionAmount = 0;
  if (basis === 'NET_PROFIT') {
    commissionAmount = Number((Math.max(0, netProfit) * commRate).toFixed(4));
  } else if (basis === 'SALE_AMOUNT') {
    commissionAmount = Number((finalSaleAmount * commRate).toFixed(4));
  } else if (basis === 'FIXED_AMOUNT') {
    commissionAmount = commRate;
  }

  const profitAfterCommission = Number((netProfit - commissionAmount).toFixed(4));
  const markupPercent = finalPurchasePrice > 0 ? Number((netProfit / finalPurchasePrice).toFixed(6)) : 0;
  const finalProfitPercent = finalPurchasePrice > 0 ? Number((profitAfterCommission / finalPurchasePrice).toFixed(6)) : 0;

  const paymentStatus = input.paymentStatus || 'Paid';
  const amountReceived = paymentStatus === 'Paid' ? finalSaleAmount : Number(input.amountReceived) || 0;
  const pendingAmount = paymentStatus === 'Paid' ? 0 : Math.max(0, Number((finalSaleAmount - amountReceived).toFixed(4)));

  return {
    sellingPrice,
    discount,
    finalSaleAmount,
    purchasePrice,
    gstPercent,
    gstAmount,
    finalPurchasePrice,
    shippingCost,
    grossProfit,
    netProfit,
    commissionPercent: commRate,
    commissionAmount,
    profitAfterCommission,
    markupPercent,
    finalProfitPercent,
    amountReceived,
    pendingAmount,
    paymentStatus,
  };
}

export const calculateSalesPreview = (req: AuthRequest, res: Response) => {
  try {
    const result = computeAuthoritativeFinancials(req.body);
    return res.json(result);
  } catch (error: any) {
    console.error('calculateSalesPreview error:', error);
    return res.status(400).json({ message: 'Calculation error', error: error.message });
  }
};

export const getSalesList = async (req: AuthRequest, res: Response) => {
  try {
    const search = ((req.query.search as string) || '').trim().toLowerCase();
    const productType = (req.query.productType as string) || '';
    const employeeId = (req.query.employeeId as string) || '';
    const customerId = (req.query.customerId as string) || '';
    const paymentStatus = (req.query.paymentStatus as string) || '';
    const orderStatus = (req.query.orderStatus as string) || '';
    const dateFrom = (req.query.dateFrom as string) || '';
    const dateTo = (req.query.dateTo as string) || '';
    const year = req.query.year ? Number(req.query.year) : undefined;
    const month = (req.query.month as string) || '';

    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(req.query.limit) || 25));
    const skip = (page - 1) * limit;

    const where: any = {};

    // Role-based visibility scoping: Sales Employee can only view their own sales unless Manager / Admin
    if (req.user && req.user.role === 'SALES_EMPLOYEE') {
      const emp = await prisma.employee.findFirst({
        where: { OR: [{ userId: req.user.id }, { email: req.user.email }] },
      });
      if (emp) {
        where.employeeId = emp.id;
      }
    } else if (employeeId && employeeId !== 'ALL') {
      where.employeeId = employeeId;
    }

    if (productType && productType !== 'ALL') {
      where.productType = productType;
    }
    if (customerId && customerId !== 'ALL') {
      where.customerId = customerId;
    }
    if (paymentStatus && paymentStatus !== 'ALL') {
      where.paymentStatus = paymentStatus;
    }
    if (orderStatus && orderStatus !== 'ALL') {
      where.orderStatus = orderStatus;
    }
    if (month && month !== 'ALL') {
      where.saleMonth = month;
    }

    if (dateFrom || dateTo) {
      where.saleDate = {};
      if (dateFrom) where.saleDate.gte = new Date(dateFrom);
      if (dateTo) {
        const end = new Date(dateTo);
        end.setUTCHours(23, 59, 59, 999);
        where.saleDate.lte = end;
      }
    } else if (year) {
      const startOfYear = new Date(Date.UTC(year, 0, 1, 0, 0, 0));
      const endOfYear = new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999));
      where.saleDate = { gte: startOfYear, lte: endOfYear };
    }

    if (search) {
      where.OR = [
        { invoiceNo: { contains: search } },
        { customerName: { contains: search } },
        { salesPersonName: { contains: search } },
        { productDescription: { contains: search } },
        { shape: { contains: search } },
        { trackingNumber: { contains: search } },
        { certificateNo: { contains: search } },
      ];
    }

    const [total, sales, aggregate] = await Promise.all([
      prisma.internalSale.count({ where }),
      prisma.internalSale.findMany({
        where,
        skip,
        take: limit,
        orderBy: { saleDate: 'desc' },
        include: {
          employee: { select: { id: true, fullName: true, employeeCode: true } },
          customer: { select: { id: true, name: true, country: true, email: true } },
          supplier: { select: { id: true, name: true } },
          commission: true,
        },
      }),
      prisma.internalSale.aggregate({
        where,
        _sum: {
          finalSaleAmount: true,
          finalPurchasePrice: true,
          grossProfit: true,
          netProfit: true,
          commissionAmount: true,
          profitAfterCommission: true,
          gstAmount: true,
          shippingCost: true,
        },
        _count: { id: true },
      }),
    ]);

    return res.json({
      sales,
      summary: {
        totalOrders: aggregate._count.id || 0,
        totalRevenue: aggregate._sum.finalSaleAmount || 0,
        totalPurchaseCost: aggregate._sum.finalPurchasePrice || 0,
        totalGrossProfit: aggregate._sum.grossProfit || 0,
        totalNetProfit: aggregate._sum.netProfit || 0,
        totalCommission: aggregate._sum.commissionAmount || 0,
        totalProfitAfterCommission: aggregate._sum.profitAfterCommission || 0,
        totalGst: aggregate._sum.gstAmount || 0,
        totalShipping: aggregate._sum.shippingCost || 0,
      },
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('getSalesList error:', error);
    return res.status(500).json({ message: 'Error fetching sales list', error: error.message });
  }
};

export const getSaleById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const sale = await prisma.internalSale.findUnique({
      where: { id },
      include: {
        employee: true,
        customer: true,
        supplier: true,
        diamond: true,
        product: true,
        commission: true,
      },
    });

    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    return res.json(sale);
  } catch (error: any) {
    console.error('getSaleById error:', error);
    return res.status(500).json({ message: 'Error fetching sale', error: error.message });
  }
};

export const createSale = async (req: AuthRequest, res: Response) => {
  try {
    const {
      invoiceNo,
      saleDate = new Date(),
      customerName,
      customerCountry,
      customerId,
      productType = 'Diamond',
      productDescription,
      stoneType,
      shape,
      diamondColor,
      clarity,
      cut,
      polish,
      symmetry,
      fluorescence,
      measurement,
      pricePerCarat,
      caratWeight,
      quantity = 1,
      certificate,
      certificateNo,
      supplierName,
      supplierId,
      purchasePrice,
      sellingPrice,
      discount = 0,
      shippingCost = 0,
      gstPercent = 0,
      paymentStatus = 'Paid',
      paymentMethod = 'Bank Wire',
      amountReceived,
      employeeId,
      salesPersonName,
      commissionPercent,
      orderStatus = 'Delivered',
      trackingNumber,
      trackingLink,
      dollarRate,
      notes,
    } = req.body;

    if (!customerName || sellingPrice === undefined) {
      return res.status(400).json({ message: 'Customer name and Selling price are required.' });
    }

    // Auto-generate invoiceNo if not provided
    let finalInvoiceNo = invoiceNo ? invoiceNo.trim() : '';
    if (!finalInvoiceNo) {
      const count = await prisma.internalSale.count();
      finalInvoiceNo = `INV-${String(count + 1001).padStart(4, '0')}`;
    }

    // Check unique invoice
    const existing = await prisma.internalSale.findUnique({ where: { invoiceNo: finalInvoiceNo } });
    if (existing) {
      return res.status(400).json({ message: `Invoice No ${finalInvoiceNo} already exists.` });
    }

    // Resolve Employee
    let resolvedEmpId = employeeId;
    let resolvedEmpName = salesPersonName;
    if (resolvedEmpId) {
      const emp = await prisma.employee.findUnique({ where: { id: resolvedEmpId } });
      if (emp) resolvedEmpName = emp.fullName;
    } else if (req.user) {
      const emp = await prisma.employee.findFirst({
        where: { OR: [{ userId: req.user.id }, { email: req.user.email }] },
      });
      if (emp) {
        resolvedEmpId = emp.id;
        resolvedEmpName = emp.fullName;
      }
    }

    // Resolve Customer
    let resolvedCustId = customerId;
    if (!resolvedCustId && customerName) {
      const cleanCustName = customerName.trim();
      let cust = await prisma.customer.findFirst({
        where: { name: cleanCustName },
      });
      if (!cust) {
        const dummyEmail = `client_${Date.now()}@internal-sales.floksyjewel.com`;
        cust = await prisma.customer.create({
          data: {
            name: cleanCustName,
            email: dummyEmail,
            country: customerCountry || null,
            assignedEmployeeId: resolvedEmpId || null,
          },
        });
      }
      resolvedCustId = cust.id;
    }

    // Resolve Supplier
    let resolvedSuppId = supplierId;
    if (!resolvedSuppId && supplierName && supplierName.trim() !== 'None' && supplierName.trim() !== 'NONE') {
      let supp = await prisma.supplier.findUnique({ where: { name: supplierName.trim() } });
      if (!supp) {
        supp = await prisma.supplier.create({
          data: { name: supplierName.trim() },
        });
      }
      resolvedSuppId = supp.id;
    }

    // Determine Commission Rate if not explicitly provided
    let finalCommRate = Number(commissionPercent) || 0;
    if (commissionPercent === undefined && resolvedEmpId) {
      const rule = await prisma.commissionRule.findFirst({
        where: {
          employeeId: resolvedEmpId,
          status: 'ACTIVE',
          OR: [{ productType: 'ALL' }, { productType: productType.toUpperCase() }],
        },
        orderBy: { createdAt: 'desc' },
      });
      if (rule) {
        finalCommRate = rule.commissionRate;
      }
    }

    // Calculate purchase price for diamonds if pricePerCarat & caratWeight provided
    let calculatedPurchasePrice = Number(purchasePrice) || 0;
    if (productType === 'Diamond' && pricePerCarat && caratWeight && !purchasePrice) {
      calculatedPurchasePrice = Number((Number(pricePerCarat) * Number(caratWeight)).toFixed(4));
    }

    // Authoritative Financial Recalculation
    const financial = computeAuthoritativeFinancials({
      sellingPrice: Number(sellingPrice),
      discount: Number(discount),
      purchasePrice: calculatedPurchasePrice,
      gstPercent: Number(gstPercent),
      shippingCost: Number(shippingCost),
      commissionPercent: finalCommRate,
      amountReceived: Number(amountReceived),
      paymentStatus,
    });

    const parsedDate = new Date(saleDate);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const saleMonth = months[parsedDate.getUTCMonth()];

    const sale = await prisma.internalSale.create({
      data: {
        invoiceNo: finalInvoiceNo,
        saleDate: parsedDate,
        customerId: resolvedCustId,
        customerName: customerName.trim(),
        customerCountry: customerCountry ? customerCountry.trim() : null,
        productType,
        productDescription: productDescription ? productDescription.trim() : null,
        stoneType: stoneType || null,
        shape: shape || null,
        diamondColor: diamondColor || null,
        clarity: clarity || null,
        cut: cut || null,
        polish: polish || null,
        symmetry: symmetry || null,
        fluorescence: fluorescence || null,
        measurement: measurement ? measurement.trim() : null,
        pricePerCarat: pricePerCarat ? Number(pricePerCarat) : null,
        caratWeight: caratWeight ? Number(caratWeight) : null,
        quantity: quantity ? Number(quantity) : 1,
        certificate: certificate || null,
        certificateNo: certificateNo ? String(certificateNo).trim() : null,
        supplierId: resolvedSuppId || null,
        supplierName: supplierName ? supplierName.trim() : null,
        purchasePrice: financial.purchasePrice,
        sellingPrice: financial.sellingPrice,
        discount: financial.discount,
        finalSaleAmount: financial.finalSaleAmount,
        shippingCost: financial.shippingCost,
        gstPercent: financial.gstPercent,
        gstAmount: financial.gstAmount,
        finalPurchasePrice: financial.finalPurchasePrice,
        paymentStatus: financial.paymentStatus,
        paymentMethod: paymentMethod || 'Bank Wire',
        amountReceived: financial.amountReceived,
        pendingAmount: financial.pendingAmount,
        grossProfit: financial.grossProfit,
        netProfit: financial.netProfit,
        employeeId: resolvedEmpId || null,
        salesPersonName: resolvedEmpName || 'Unassigned',
        commissionPercent: financial.commissionPercent,
        commissionAmount: financial.commissionAmount,
        profitAfterCommission: financial.profitAfterCommission,
        markupPercent: financial.markupPercent,
        finalProfitPercent: financial.finalProfitPercent,
        orderStatus,
        trackingNumber: trackingNumber ? trackingNumber.trim() : null,
        trackingLink: trackingLink ? trackingLink.trim() : null,
        dollarRate: dollarRate ? Number(dollarRate) : null,
        saleMonth,
        notes: notes ? notes.trim() : null,
      },
    });

    // Create Commission Snapshot
    if (resolvedEmpId && financial.commissionAmount > 0) {
      await prisma.commission.create({
        data: {
          saleId: sale.id,
          employeeId: resolvedEmpId,
          commissionBasis: 'NET_PROFIT',
          commissionRate: financial.commissionPercent,
          commissionAmount: financial.commissionAmount,
          status: 'PENDING',
        },
      });
    }

    // Audit log
    await prisma.activityLog.create({
      data: {
        userId: req.user?.id || 'SYSTEM',
        action: 'CREATE_SALE',
        object: 'Sales Management',
        newValue: `Created invoice ${sale.invoiceNo} for ${sale.customerName}: $${sale.finalSaleAmount}`,
      },
    });

    return res.status(201).json(sale);
  } catch (error: any) {
    console.error('createSale error:', error);
    return res.status(500).json({ message: 'Failed to create sale', error: error.message });
  }
};

export const updateSale = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const existing = await prisma.internalSale.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    const payload = req.body;
    const sellingPrice = payload.sellingPrice !== undefined ? Number(payload.sellingPrice) : existing.sellingPrice;
    const discount = payload.discount !== undefined ? Number(payload.discount) : existing.discount;
    const purchasePrice = payload.purchasePrice !== undefined ? Number(payload.purchasePrice) : existing.purchasePrice;
    const gstPercent = payload.gstPercent !== undefined ? Number(payload.gstPercent) : existing.gstPercent;
    const shippingCost = payload.shippingCost !== undefined ? Number(payload.shippingCost) : existing.shippingCost;
    const commissionPercent = payload.commissionPercent !== undefined ? Number(payload.commissionPercent) : existing.commissionPercent;
    const paymentStatus = payload.paymentStatus || existing.paymentStatus;
    const amountReceived = payload.amountReceived !== undefined ? Number(payload.amountReceived) : existing.amountReceived;

    const financial = computeAuthoritativeFinancials({
      sellingPrice,
      discount,
      purchasePrice,
      gstPercent,
      shippingCost,
      commissionPercent,
      amountReceived,
      paymentStatus,
    });

    const updated = await prisma.internalSale.update({
      where: { id },
      data: {
        customerName: payload.customerName ? payload.customerName.trim() : existing.customerName,
        customerCountry: payload.customerCountry !== undefined ? payload.customerCountry : existing.customerCountry,
        productType: payload.productType || existing.productType,
        productDescription: payload.productDescription !== undefined ? payload.productDescription : existing.productDescription,
        stoneType: payload.stoneType !== undefined ? payload.stoneType : existing.stoneType,
        shape: payload.shape !== undefined ? payload.shape : existing.shape,
        diamondColor: payload.diamondColor !== undefined ? payload.diamondColor : existing.diamondColor,
        clarity: payload.clarity !== undefined ? payload.clarity : existing.clarity,
        cut: payload.cut !== undefined ? payload.cut : existing.cut,
        polish: payload.polish !== undefined ? payload.polish : existing.polish,
        symmetry: payload.symmetry !== undefined ? payload.symmetry : existing.symmetry,
        fluorescence: payload.fluorescence !== undefined ? payload.fluorescence : existing.fluorescence,
        measurement: payload.measurement !== undefined ? payload.measurement : existing.measurement,
        pricePerCarat: payload.pricePerCarat !== undefined ? Number(payload.pricePerCarat) : existing.pricePerCarat,
        caratWeight: payload.caratWeight !== undefined ? Number(payload.caratWeight) : existing.caratWeight,
        quantity: payload.quantity !== undefined ? Number(payload.quantity) : existing.quantity,
        certificate: payload.certificate !== undefined ? payload.certificate : existing.certificate,
        certificateNo: payload.certificateNo !== undefined ? payload.certificateNo : existing.certificateNo,
        supplierName: payload.supplierName !== undefined ? payload.supplierName : existing.supplierName,
        paymentStatus: financial.paymentStatus,
        paymentMethod: payload.paymentMethod || existing.paymentMethod,
        purchasePrice: financial.purchasePrice,
        sellingPrice: financial.sellingPrice,
        discount: financial.discount,
        finalSaleAmount: financial.finalSaleAmount,
        shippingCost: financial.shippingCost,
        gstPercent: financial.gstPercent,
        gstAmount: financial.gstAmount,
        finalPurchasePrice: financial.finalPurchasePrice,
        amountReceived: financial.amountReceived,
        pendingAmount: financial.pendingAmount,
        grossProfit: financial.grossProfit,
        netProfit: financial.netProfit,
        employeeId: payload.employeeId !== undefined ? payload.employeeId : existing.employeeId,
        salesPersonName: payload.salesPersonName !== undefined ? payload.salesPersonName : existing.salesPersonName,
        commissionPercent: financial.commissionPercent,
        commissionAmount: financial.commissionAmount,
        profitAfterCommission: financial.profitAfterCommission,
        markupPercent: financial.markupPercent,
        finalProfitPercent: financial.finalProfitPercent,
        orderStatus: payload.orderStatus || existing.orderStatus,
        trackingNumber: payload.trackingNumber !== undefined ? payload.trackingNumber : existing.trackingNumber,
        trackingLink: payload.trackingLink !== undefined ? payload.trackingLink : existing.trackingLink,
        dollarRate: payload.dollarRate !== undefined ? Number(payload.dollarRate) : existing.dollarRate,
        notes: payload.notes !== undefined ? payload.notes : existing.notes,
      },
    });

    // Update commission snapshot if exists
    if (updated.employeeId) {
      await prisma.commission.upsert({
        where: { saleId: updated.id },
        create: {
          saleId: updated.id,
          employeeId: updated.employeeId,
          commissionBasis: 'NET_PROFIT',
          commissionRate: financial.commissionPercent,
          commissionAmount: financial.commissionAmount,
          status: 'PENDING',
        },
        update: {
          employeeId: updated.employeeId,
          commissionRate: financial.commissionPercent,
          commissionAmount: financial.commissionAmount,
        },
      });
    }

    // Audit log
    await prisma.activityLog.create({
      data: {
        userId: req.user?.id || 'SYSTEM',
        action: 'UPDATE_SALE',
        object: 'Sales Management',
        oldValue: JSON.stringify(existing),
        newValue: JSON.stringify(updated),
      },
    });

    return res.json(updated);
  } catch (error: any) {
    console.error('updateSale error:', error);
    return res.status(500).json({ message: 'Failed to update sale', error: error.message });
  }
};

export const deleteSale = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const existing = await prisma.internalSale.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    await prisma.internalSale.delete({ where: { id } });

    await prisma.activityLog.create({
      data: {
        userId: req.user?.id || 'SYSTEM',
        action: 'DELETE_SALE',
        object: 'Sales Management',
        oldValue: `Deleted invoice ${existing.invoiceNo} (${existing.customerName})`,
      },
    });

    return res.json({ message: 'Sale deleted successfully', deletedId: id });
  } catch (error: any) {
    console.error('deleteSale error:', error);
    return res.status(500).json({ message: 'Failed to delete sale', error: error.message });
  }
};
