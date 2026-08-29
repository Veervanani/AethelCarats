import { Response } from 'express';
import prisma from '../prisma';
import { AuthRequest } from '../middleware/auth';

export const getBusinessAuditLogs = async (req: AuthRequest, res: Response) => {
  try {
    const object = (req.query.object as string) || '';
    const action = (req.query.action as string) || '';
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(req.query.limit) || 50));
    const skip = (page - 1) * limit;

    const where: any = {};
    if (object && object !== 'ALL') where.object = { contains: object };
    if (action && action !== 'ALL') where.action = { contains: action };

    const [total, logs] = await Promise.all([
      prisma.activityLog.count({ where }),
      prisma.activityLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, name: true, email: true, role: true } },
        },
      }),
    ]);

    return res.json({
      logs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('getBusinessAuditLogs error:', error);
    return res.status(500).json({ message: 'Error fetching audit logs', error: error.message });
  }
};
