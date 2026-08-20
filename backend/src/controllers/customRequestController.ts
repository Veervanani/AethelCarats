import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../prisma';

export const createCustomRequest = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    const reqNum = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const customReq = await prisma.customRequest.create({
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
  } catch (error) {
    console.error('createCustomRequest error:', error);
    res.status(500).json({ message: 'Error submitting custom request' });
  }
};

export const getCustomRequests = async (req: AuthRequest, res: Response) => {
  try {
    const requests = await prisma.customRequest.findMany({
      orderBy: { createdAt: 'desc' },
      include: { files: true, timelines: { orderBy: { createdAt: 'desc' } } },
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching custom requests' });
  }
};

export const updateCustomRequestStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, adminNotes, cadFileUrl, note } = req.body;

    const existing = await prisma.customRequest.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: 'Request not found' });

    const updated = await prisma.customRequest.update({
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
  } catch (error) {
    res.status(500).json({ message: 'Error updating custom request' });
  }
};
