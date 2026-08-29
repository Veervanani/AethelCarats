import { Response } from 'express';
import prisma from '../prisma';
import { AuthRequest } from '../middleware/auth';

export const getBusinessDashboardMetrics = async (req: AuthRequest, res: Response) => {
  try {
    const period = (req.query.period as string) || 'all'; // 'today', 'month', 'year', 'all', 'custom'
    const selectedYear = req.query.year ? Number(req.query.year) : undefined;
    const selectedMonth = (req.query.month as string) || ''; // e.g. 'August' or '08'
    const dateFrom = (req.query.dateFrom as string) || '';
    const dateTo = (req.query.dateTo as string) || '';
    const employeeId = (req.query.employeeId as string) || '';
    const dollarRate = Number(req.query.dollarRate) || 94.55; // Default exchange rate from Excel Dashboard G20

    const now = new Date();
    const where: any = {};

    if (employeeId && employeeId !== 'ALL') {
      where.employeeId = employeeId;
    }

    if (period === 'today') {
      const startOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
      const endOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999));
      where.saleDate = { gte: startOfDay, lte: endOfDay };
    } else if (period === 'month') {
      const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0));
      const endOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59, 999));
      where.saleDate = { gte: startOfMonth, lte: endOfMonth };
    } else if (period === 'year') {
      const yr = selectedYear || now.getUTCFullYear();
      const startOfYear = new Date(Date.UTC(yr, 0, 1, 0, 0, 0));
      const endOfYear = new Date(Date.UTC(yr, 11, 31, 23, 59, 59, 999));
      where.saleDate = { gte: startOfYear, lte: endOfYear };
    } else if (dateFrom || dateTo) {
      where.saleDate = {};
      if (dateFrom) where.saleDate.gte = new Date(dateFrom);
      if (dateTo) {
        const end = new Date(dateTo);
        end.setUTCHours(23, 59, 59, 999);
        where.saleDate.lte = end;
      }
    } else if (selectedYear) {
      const startOfYear = new Date(Date.UTC(selectedYear, 0, 1, 0, 0, 0));
      const endOfYear = new Date(Date.UTC(selectedYear, 11, 31, 23, 59, 59, 999));
      where.saleDate = { gte: startOfYear, lte: endOfYear };
    }

    if (selectedMonth && selectedMonth !== 'All Months') {
      where.saleMonth = selectedMonth;
    }

    // Role scoping for Sales Employees
    if (req.user && req.user.role === 'SALES_EMPLOYEE') {
      const emp = await prisma.employee.findFirst({
        where: { OR: [{ userId: req.user.id }, { email: req.user.email }] },
      });
      if (emp) {
        where.employeeId = emp.id;
      }
    }

    const [
      sales,
      salesCount,
      aggregate,
      diamondAggregate,
      jewelryAggregate,
      orderStatusGroups,
      paymentStatusGroups,
      employees,
      targetsAggregate,
    ] = await Promise.all([
      prisma.internalSale.findMany({
        where,
        select: {
          id: true,
          salesPersonName: true,
          employeeId: true,
          finalSaleAmount: true,
          netProfit: true,
          commissionAmount: true,
          profitAfterCommission: true,
          finalPurchasePrice: true,
          productType: true,
          customerName: true,
          customerCountry: true,
          dollarRate: true,
          paymentStatus: true,
          orderStatus: true,
        },
      }),
      prisma.internalSale.count({ where }),
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
          pendingAmount: true,
          shippingCost: true,
        },
      }),
      prisma.internalSale.aggregate({
        where: { ...where, productType: 'Diamond' },
        _sum: { finalSaleAmount: true, netProfit: true },
        _count: { id: true },
      }),
      prisma.internalSale.aggregate({
        where: { ...where, productType: 'Jewelry' },
        _sum: { finalSaleAmount: true, netProfit: true },
        _count: { id: true },
      }),
      prisma.internalSale.groupBy({
        by: ['orderStatus'],
        where,
        _count: { id: true },
      }),
      prisma.internalSale.groupBy({
        by: ['paymentStatus'],
        where,
        _count: { id: true },
      }),
      prisma.employee.findMany({
        where: { status: 'ACTIVE' },
        select: { id: true, fullName: true, employeeCode: true, monthlySalesTarget: true },
      }),
      prisma.salesTarget.aggregate({
        where: { status: 'ACTIVE' },
        _sum: { targetAmount: true },
      }),
    ]);

    const totalRevenue = Number((aggregate._sum.finalSaleAmount || 0).toFixed(2));
    const totalPurchaseCost = Number((aggregate._sum.finalPurchasePrice || 0).toFixed(2));
    const totalGrossProfit = Number((aggregate._sum.grossProfit || 0).toFixed(2));
    const totalNetProfit = Number((aggregate._sum.netProfit || 0).toFixed(2));
    const totalCommission = Number((aggregate._sum.commissionAmount || 0).toFixed(2));
    const totalProfitAfterCommission = Number((aggregate._sum.profitAfterCommission || 0).toFixed(2));
    const totalGst = Number((aggregate._sum.gstAmount || 0).toFixed(2));
    const pendingReceivables = Number((aggregate._sum.pendingAmount || 0).toFixed(2));
    const averageMarkupPercent = totalPurchaseCost > 0 ? Number((totalNetProfit / totalPurchaseCost).toFixed(4)) : 0;

    // Build Sales Person Performance Table (USD and INR)
    const salesPersonMap: Record<string, {
      name: string;
      employeeId?: string;
      orders: number;
      revenue: number;
      netProfitUSD: number;
      commissionUSD: number;
      netProfitINR: number;
      commissionINR: number;
      profitAfterCommission: number;
    }> = {};

    employees.forEach((emp) => {
      salesPersonMap[emp.fullName.toLowerCase()] = {
        name: emp.fullName,
        employeeId: emp.id,
        orders: 0,
        revenue: 0,
        netProfitUSD: 0,
        commissionUSD: 0,
        netProfitINR: 0,
        commissionINR: 0,
        profitAfterCommission: 0,
      };
    });

    sales.forEach((s) => {
      const nameKey = (s.salesPersonName || 'Unassigned').toLowerCase().trim();
      if (!salesPersonMap[nameKey]) {
        salesPersonMap[nameKey] = {
          name: s.salesPersonName || 'Unassigned',
          orders: 0,
          revenue: 0,
          netProfitUSD: 0,
          commissionUSD: 0,
          netProfitINR: 0,
          commissionINR: 0,
          profitAfterCommission: 0,
        };
      }
      const item = salesPersonMap[nameKey];
      item.orders += 1;
      item.revenue += s.finalSaleAmount || 0;
      item.netProfitUSD += s.netProfit || 0;
      item.commissionUSD += s.commissionAmount || 0;
      item.profitAfterCommission += s.profitAfterCommission || 0;

      const rate = s.dollarRate || dollarRate;
      item.netProfitINR += (s.netProfit || 0) * rate;
      item.commissionINR += (s.commissionAmount || 0) * rate;
    });

    const salesPersonPerformance = Object.values(salesPersonMap)
      .map((sp) => ({
        ...sp,
        revenue: Number(sp.revenue.toFixed(2)),
        netProfitUSD: Number(sp.netProfitUSD.toFixed(2)),
        commissionUSD: Number(sp.commissionUSD.toFixed(2)),
        netProfitINR: Number(sp.netProfitINR.toFixed(2)),
        commissionINR: Number(sp.commissionINR.toFixed(2)),
        profitAfterCommission: Number(sp.profitAfterCommission.toFixed(2)),
      }))
      .sort((a, b) => b.revenue - a.revenue);

    // Customer Breakdown
    const customerMap: Record<string, { name: string; country?: string; orders: number; revenue: number }> = {};
    sales.forEach((s) => {
      const cName = (s.customerName || 'Unknown').trim();
      if (!customerMap[cName]) {
        customerMap[cName] = { name: cName, country: s.customerCountry || undefined, orders: 0, revenue: 0 };
      }
      customerMap[cName].orders += 1;
      customerMap[cName].revenue += s.finalSaleAmount || 0;
    });
    const topCustomers = Object.values(customerMap)
      .map((c) => ({ ...c, revenue: Number(c.revenue.toFixed(2)) }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    // Country Breakdown
    const countryMap: Record<string, { country: string; orders: number; revenue: number }> = {};
    sales.forEach((s) => {
      const country = (s.customerCountry || 'Other').trim();
      if (!countryMap[country]) {
        countryMap[country] = { country, orders: 0, revenue: 0 };
      }
      countryMap[country].orders += 1;
      countryMap[country].revenue += s.finalSaleAmount || 0;
    });
    const countryDistribution = Object.values(countryMap)
      .map((c) => ({ ...c, revenue: Number(c.revenue.toFixed(2)) }))
      .sort((a, b) => b.revenue - a.revenue);

    // Today Attendance Stats
    const today = new Date();
    const startOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0));
    const endOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999));

    const todayAttendances = await prisma.attendance.findMany({
      where: { date: { gte: startOfDay, lte: endOfDay } },
    });

    let presentToday = 0;
    let absentToday = 0;
    let lateToday = 0;
    let leaveToday = 0;

    todayAttendances.forEach((a) => {
      if (a.status === 'PRESENT') presentToday++;
      else if (a.status === 'ABSENT') absentToday++;
      else if (a.status === 'LEAVE') leaveToday++;
      if (a.lateStatus) lateToday++;
    });

    const recordedEmpIds = new Set(todayAttendances.map((a) => a.employeeId));
    const unrecordedCount = Math.max(0, employees.length - recordedEmpIds.size);

    const totalTarget = targetsAggregate._sum.targetAmount || employees.reduce((acc, e) => acc + (e.monthlySalesTarget || 0), 0);
    const targetAchievementPercent = totalTarget > 0 ? Number(((totalRevenue / totalTarget) * 100).toFixed(1)) : 0;

    return res.json({
      metrics: {
        totalRevenue,
        totalOrders: salesCount,
        totalPurchaseCost,
        totalGrossProfit,
        totalNetProfit,
        totalCommission,
        totalProfitAfterCommission,
        averageMarkupPercent,
        totalGst,
        pendingReceivables,
        totalNetProfitINR: Number((totalNetProfit * dollarRate).toFixed(2)),
        totalCommissionINR: Number((totalCommission * dollarRate).toFixed(2)),
        profitAfterCommissionINR: Number((totalProfitAfterCommission * dollarRate).toFixed(2)),
        dollarRate,
      },
      productDistribution: {
        diamond: {
          orders: diamondAggregate._count.id || 0,
          revenue: Number((diamondAggregate._sum.finalSaleAmount || 0).toFixed(2)),
          netProfit: Number((diamondAggregate._sum.netProfit || 0).toFixed(2)),
        },
        jewelry: {
          orders: jewelryAggregate._count.id || 0,
          revenue: Number((jewelryAggregate._sum.finalSaleAmount || 0).toFixed(2)),
          netProfit: Number((jewelryAggregate._sum.netProfit || 0).toFixed(2)),
        },
      },
      orderStatusCounts: orderStatusGroups.reduce((acc: any, curr) => {
        acc[curr.orderStatus] = curr._count.id;
        return acc;
      }, {}),
      paymentStatusCounts: paymentStatusGroups.reduce((acc: any, curr) => {
        acc[curr.paymentStatus] = curr._count.id;
        return acc;
      }, {}),
      salesPersonPerformance,
      topCustomers,
      countryDistribution,
      attendance: {
        totalEmployees: employees.length,
        present: presentToday,
        absent: absentToday + unrecordedCount,
        late: lateToday,
        onLeave: leaveToday,
      },
      targets: {
        totalTarget,
        actualSales: totalRevenue,
        achievementPercent: targetAchievementPercent,
        remaining: Math.max(0, totalTarget - totalRevenue),
      },
    });
  } catch (error: any) {
    console.error('getBusinessDashboardMetrics error:', error);
    return res.status(500).json({ message: 'Error calculating dashboard metrics', error: error.message });
  }
};
