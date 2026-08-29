import { Response } from 'express';
import prisma from '../prisma';
import { AuthRequest } from '../middleware/auth';

export const getSuppliers = async (req: AuthRequest, res: Response) => {
  try {
    const search = ((req.query.search as string) || '').trim().toLowerCase();
    const status = (req.query.status as string) || '';

    const where: any = {};
    if (status && status !== 'ALL') where.status = status;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { contactPerson: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    const suppliers = await prisma.supplier.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        _count: { select: { sales: true } },
      },
    });

    return res.json(suppliers);
  } catch (error: any) {
    console.error('getSuppliers error:', error);
    return res.status(500).json({ message: 'Error fetching suppliers', error: error.message });
  }
};

export const createSupplier = async (req: AuthRequest, res: Response) => {
  try {
    const { name, contactPerson, email, phone, country, notes } = req.body;
    if (!name) return res.status(400).json({ message: 'Supplier name is required.' });

    const existing = await prisma.supplier.findUnique({ where: { name: name.trim() } });
    if (existing) {
      return res.status(400).json({ message: 'Supplier with this name already exists.' });
    }

    const supplier = await prisma.supplier.create({
      data: {
        name: name.trim(),
        contactPerson: contactPerson ? contactPerson.trim() : null,
        email: email ? email.trim().toLowerCase() : null,
        phone: phone ? phone.trim() : null,
        country: country ? country.trim() : null,
        notes: notes ? notes.trim() : null,
        status: 'ACTIVE',
      },
    });

    return res.status(201).json(supplier);
  } catch (error: any) {
    console.error('createSupplier error:', error);
    return res.status(500).json({ message: 'Failed to create supplier', error: error.message });
  }
};

export const updateSupplier = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, contactPerson, email, phone, country, notes, status } = req.body;

    const updated = await prisma.supplier.update({
      where: { id },
      data: {
        name: name ? name.trim() : undefined,
        contactPerson: contactPerson !== undefined ? contactPerson : undefined,
        email: email !== undefined ? (email ? email.trim().toLowerCase() : null) : undefined,
        phone: phone !== undefined ? phone : undefined,
        country: country !== undefined ? country : undefined,
        notes: notes !== undefined ? notes : undefined,
        status: status || undefined,
      },
    });

    return res.json(updated);
  } catch (error: any) {
    console.error('updateSupplier error:', error);
    return res.status(500).json({ message: 'Failed to update supplier', error: error.message });
  }
};
