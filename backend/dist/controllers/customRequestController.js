"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomRequestStatus = exports.getCustomRequests = exports.createCustomRequest = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const createCustomRequest = async (req, res) => {
    try {
        const data = req.body;
        const reqNum = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const customReq = await prisma_1.default.customRequest.create({
            data: {
                requestNumber: reqNum,
                name: data.name,
                email: data.email,
                whatsapp: data.whatsapp,
                jewelleryType: data.jewelleryType,
                metal: data.metal || null,
                diamondPreference: data.diamondPreference || null,
                budget: data.budget || null,
                deadline: data.deadline || null,
                description: data.description,
                status: 'NEW',
                timelines: {
                    create: [{ status: 'NEW', note: 'Custom request submitted by client' }],
                },
            },
        });
        res.status(201).json(customReq);
    }
    catch (error) {
        console.error('createCustomRequest error:', error);
        res.status(500).json({ message: 'Error submitting custom request' });
    }
};
exports.createCustomRequest = createCustomRequest;
const getCustomRequests = async (req, res) => {
    try {
        const requests = await prisma_1.default.customRequest.findMany({
            orderBy: { createdAt: 'desc' },
            include: { files: true, timelines: { orderBy: { createdAt: 'desc' } } },
        });
        res.json(requests);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching custom requests' });
    }
};
exports.getCustomRequests = getCustomRequests;
const updateCustomRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, adminNotes, cadFileUrl, note } = req.body;
        const existing = await prisma_1.default.customRequest.findUnique({ where: { id } });
        if (!existing)
            return res.status(404).json({ message: 'Request not found' });
        const updated = await prisma_1.default.customRequest.update({
            where: { id },
            data: {
                status: status || existing.status,
                adminNotes: adminNotes ?? existing.adminNotes,
                cadFileUrl: cadFileUrl ?? existing.cadFileUrl,
                timelines: {
                    create: [{ status: status || existing.status, note: note || `Status updated to ${status}` }],
                },
            },
            include: { timelines: { orderBy: { createdAt: 'desc' } } },
        });
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating custom request' });
    }
};
exports.updateCustomRequestStatus = updateCustomRequestStatus;
