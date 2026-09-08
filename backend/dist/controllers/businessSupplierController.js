"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSupplier = exports.createSupplier = exports.getSuppliers = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const getSuppliers = async (req, res) => {
    try {
        const search = (req.query.search || '').trim().toLowerCase();
        const status = req.query.status || '';
        const where = {};
        if (status && status !== 'ALL')
            where.status = status;
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { contactPerson: { contains: search } },
                { email: { contains: search } },
                { phone: { contains: search } },
            ];
        }
        const suppliers = await prisma_1.default.supplier.findMany({
            where,
            orderBy: { name: 'asc' },
            include: {
                _count: { select: { sales: true } },
            },
        });
        return res.json(suppliers);
    }
    catch (error) {
        console.error('getSuppliers error:', error);
        return res.status(500).json({ message: 'Error fetching suppliers', error: error.message });
    }
};
exports.getSuppliers = getSuppliers;
const createSupplier = async (req, res) => {
    try {
        const { name, contactPerson, email, phone, country, notes } = req.body;
        if (!name)
            return res.status(400).json({ message: 'Supplier name is required.' });
        const existing = await prisma_1.default.supplier.findUnique({ where: { name: name.trim() } });
        if (existing) {
            return res.status(400).json({ message: 'Supplier with this name already exists.' });
        }
        const supplier = await prisma_1.default.supplier.create({
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
    }
    catch (error) {
        console.error('createSupplier error:', error);
        return res.status(500).json({ message: 'Failed to create supplier', error: error.message });
    }
};
exports.createSupplier = createSupplier;
const updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, contactPerson, email, phone, country, notes, status } = req.body;
        const updated = await prisma_1.default.supplier.update({
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
    }
    catch (error) {
        console.error('updateSupplier error:', error);
        return res.status(500).json({ message: 'Failed to update supplier', error: error.message });
    }
};
exports.updateSupplier = updateSupplier;
