import { Response } from 'express';
import prisma from '../prisma';
import { AuthRequest } from '../middleware/auth';

export const getBusinessCustomers = async (req: AuthRequest, res: Response) => {
  try {
    const search = ((req.query.search as string) || '').trim().toLowerCase();
    const country = (req.query.country as string) || '';
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(req.query.limit) || 25));
    const skip = (page - 1) * limit;

    const where: any = {};
    if (country && country !== 'ALL') where.country = country;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
        { company: { contains: search } },
        { country: { contains: search } },
      ];
    }

    const [total, customers] = await Promise.all([
      prisma.customer.count({ where }),
      prisma.customer.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: 'asc' },
        include: {
          assignedEmployee: { select: { id: true, fullName: true } },
          _count: {
            select: { internalSales: true, orders: true },
          },
        },
      }),
    ]);

    // Calculate customer metrics (Total sales value, last sale date)
    const enriched = await Promise.all(
      customers.map(async (c) => {
        const salesAgg = await prisma.internalSale.aggregate({
          where: { customerId: c.id },
          _sum: { finalSaleAmount: true, netProfit: true },
          _max: { saleDate: true },
        });

        return {
          ...c,
          totalSales: salesAgg._sum.finalSaleAmount || 0,
          totalNetProfit: salesAgg._sum.netProfit || 0,
          lastSaleDate: salesAgg._max.saleDate || null,
        };
      })
    );

    return res.json({
      customers: enriched,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('getBusinessCustomers error:', error);
    return res.status(500).json({ message: 'Error fetching customers', error: error.message });
  }
};

export const checkDuplicateCustomer = async (req: AuthRequest, res: Response) => {
  try {
    const name = ((req.body.name as string) || '').trim();
    const email = ((req.body.email as string) || '').trim().toLowerCase();
    const phone = ((req.body.phone as string) || '').trim();

    if (!name && !email && !phone) {
      return res.json({ matches: [] });
    }

    const allCustomers = await prisma.customer.findMany({
      select: { id: true, name: true, email: true, phone: true, country: true, company: true },
    });

    const matches: any[] = [];
    const normalizedInputName = name.toLowerCase().replace(/\s+/g, '');

    allCustomers.forEach((c) => {
      let isMatch = false;
      let reason = '';

      if (email && c.email.toLowerCase() === email) {
        isMatch = true;
        reason = 'Exact email match';
      } else if (name) {
        const normalizedDbName = c.name.toLowerCase().replace(/\s+/g, '');
        if (normalizedDbName === normalizedInputName) {
          isMatch = true;
          reason = 'Exact name match (case/spacing normalized)';
        } else if (normalizedDbName.includes(normalizedInputName) || normalizedInputName.includes(normalizedDbName)) {
          isMatch = true;
          reason = 'Similar name match';
        }
      } else if (phone && c.phone && c.phone.replace(/[^0-9]/g, '') === phone.replace(/[^0-9]/g, '')) {
        isMatch = true;
        reason = 'Exact phone match';
      }

      if (isMatch) {
        matches.push({ customer: c, reason });
      }
    });

    return res.json({ matches });
  } catch (error: any) {
    console.error('checkDuplicateCustomer error:', error);
    return res.status(500).json({ message: 'Error checking duplicate customer', error: error.message });
  }
};

export const createBusinessCustomer = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, phone, country, company, address, assignedEmployeeId, notes } = req.body;
    if (!name) return res.status(400).json({ message: 'Customer name is required.' });

    const cleanEmail = email ? email.trim().toLowerCase() : `client_${Date.now()}@internal-sales.aura-atelier.internal`;

    const customer = await prisma.customer.create({
      data: {
        name: name.trim(),
        email: cleanEmail,
        phone: phone ? phone.trim() : null,
        country: country ? country.trim() : null,
        company: company ? company.trim() : null,
        address: address ? address.trim() : null,
        assignedEmployeeId: assignedEmployeeId || null,
        notes: notes ? notes.trim() : null,
      },
    });

    return res.status(201).json(customer);
  } catch (error: any) {
    console.error('createBusinessCustomer error:', error);
    return res.status(500).json({ message: 'Failed to create customer', error: error.message });
  }
};
