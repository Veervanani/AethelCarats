import { Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../prisma';
import { AuthRequest } from '../middleware/auth';

export const getEmployees = async (req: AuthRequest, res: Response) => {
  try {
    const search = ((req.query.search as string) || '').trim().toLowerCase();
    const department = (req.query.department as string) || '';
    const status = (req.query.status as string) || '';
    const role = (req.query.role as string) || '';
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(req.query.limit) || 25));
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }
    if (department && department !== 'ALL') {
      where.department = department;
    }
    if (role && role !== 'ALL') {
      where.role = role;
    }
    if (search) {
      where.OR = [
        { fullName: { contains: search } },
        { email: { contains: search } },
        { employeeCode: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    const [total, employees] = await Promise.all([
      prisma.employee.count({ where }),
      prisma.employee.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          commissionPlan: { select: { id: true, name: true } },
          _count: {
            select: {
              sales: true,
              attendances: true,
              commissions: true,
            },
          },
        },
      }),
    ]);

    return res.json({
      employees,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('getEmployees error:', error);
    return res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
};

export const getEmployeeById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, email: true, name: true, role: true } },
        commissionPlan: true,
        commissionRules: true,
        salesTargets: {
          orderBy: { startDate: 'desc' },
          take: 12,
        },
        attendances: {
          orderBy: { date: 'desc' },
          take: 30,
        },
        sales: {
          orderBy: { saleDate: 'desc' },
          take: 20,
        },
        commissions: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Performance aggregates
    const salesAggregate = await prisma.internalSale.aggregate({
      where: { employeeId: id },
      _sum: {
        finalSaleAmount: true,
        grossProfit: true,
        netProfit: true,
        commissionAmount: true,
      },
      _count: { id: true },
    });

    const diamondSalesCount = await prisma.internalSale.count({
      where: { employeeId: id, productType: 'Diamond' },
    });

    const jewelrySalesCount = await prisma.internalSale.count({
      where: { employeeId: id, productType: 'Jewelry' },
    });

    const commissionAggregate = await prisma.commission.groupBy({
      by: ['status'],
      where: { employeeId: id },
      _sum: { commissionAmount: true },
      _count: { id: true },
    });

    const commissionSummary = {
      pending: 0,
      approved: 0,
      paid: 0,
      cancelled: 0,
    };

    commissionAggregate.forEach((c) => {
      const st = c.status.toLowerCase() as keyof typeof commissionSummary;
      if (st in commissionSummary) {
        commissionSummary[st] = c._sum.commissionAmount || 0;
      }
    });

    return res.json({
      employee,
      stats: {
        totalOrders: salesAggregate._count.id || 0,
        totalSalesAmount: salesAggregate._sum.finalSaleAmount || 0,
        grossProfit: salesAggregate._sum.grossProfit || 0,
        netProfit: salesAggregate._sum.netProfit || 0,
        totalCommission: salesAggregate._sum.commissionAmount || 0,
        diamondSalesCount,
        jewelrySalesCount,
        commissionSummary,
      },
    });
  } catch (error: any) {
    console.error('getEmployeeById error:', error);
    return res.status(500).json({ message: 'Error fetching employee details', error: error.message });
  }
};

export const createEmployee = async (req: AuthRequest, res: Response) => {
  try {
    const {
      fullName,
      email,
      phone,
      department,
      designation,
      role = 'SALES_EMPLOYEE',
      joiningDate,
      commissionPlanId,
      monthlySalesTarget = 0,
      notes,
      createLogin = false,
      password,
    } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ message: 'Full name and email are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check unique email
    const existingEmployee = await prisma.employee.findUnique({
      where: { email: cleanEmail },
    });
    if (existingEmployee) {
      return res.status(400).json({ message: 'An employee with this email already exists.' });
    }

    // Auto-generate employee code if not provided
    const count = await prisma.employee.count();
    const employeeCode = `EMP-${String(count + 101).padStart(3, '0')}`;

    let linkedUserId: string | undefined;

    if (createLogin && password) {
      const existingUser = await prisma.user.findUnique({ where: { email: cleanEmail } });
      if (existingUser) {
        linkedUserId = existingUser.id;
      } else {
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
          data: {
            email: cleanEmail,
            name: fullName.trim(),
            passwordHash,
            role: role as any,
          },
        });
        linkedUserId = newUser.id;
      }
    }

    const employee = await prisma.employee.create({
      data: {
        employeeCode,
        userId: linkedUserId || null,
        fullName: fullName.trim(),
        email: cleanEmail,
        phone: phone ? phone.trim() : null,
        department: department ? department.trim() : 'Sales',
        designation: designation ? designation.trim() : 'Sales Executive',
        role,
        status: 'ACTIVE',
        joiningDate: joiningDate ? new Date(joiningDate) : new Date(),
        commissionPlanId: commissionPlanId || null,
        monthlySalesTarget: Number(monthlySalesTarget) || 0,
        notes: notes ? notes.trim() : null,
      },
    });

    if (linkedUserId) {
      await prisma.user.update({
        where: { id: linkedUserId },
        data: { employeeId: employee.id },
      });
    }

    // Audit log
    await prisma.activityLog.create({
      data: {
        userId: req.user?.id || 'SYSTEM',
        action: 'CREATE_EMPLOYEE',
        object: 'Employee Management',
        newValue: `Created employee ${employee.fullName} (${employee.employeeCode})`,
      },
    });

    return res.status(201).json(employee);
  } catch (error: any) {
    console.error('createEmployee error:', error);
    return res.status(500).json({ message: 'Failed to create employee', error: error.message });
  }
};

export const updateEmployee = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      email,
      phone,
      department,
      designation,
      role,
      status,
      joiningDate,
      commissionPlanId,
      monthlySalesTarget,
      notes,
    } = req.body;

    const existing = await prisma.employee.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const updated = await prisma.employee.update({
      where: { id },
      data: {
        fullName: fullName ? fullName.trim() : existing.fullName,
        email: email ? email.trim().toLowerCase() : existing.email,
        phone: phone !== undefined ? (phone ? phone.trim() : null) : existing.phone,
        department: department !== undefined ? department : existing.department,
        designation: designation !== undefined ? designation : existing.designation,
        role: role !== undefined ? role : existing.role,
        status: status !== undefined ? status : existing.status,
        joiningDate: joiningDate ? new Date(joiningDate) : existing.joiningDate,
        commissionPlanId: commissionPlanId !== undefined ? commissionPlanId : existing.commissionPlanId,
        monthlySalesTarget: monthlySalesTarget !== undefined ? Number(monthlySalesTarget) : existing.monthlySalesTarget,
        notes: notes !== undefined ? notes : existing.notes,
      },
    });

    // If linked to a User, keep role in sync
    if (updated.userId && role) {
      await prisma.user.update({
        where: { id: updated.userId },
        data: { role: role as any, name: updated.fullName },
      });
    }

    // Audit log
    await prisma.activityLog.create({
      data: {
        userId: req.user?.id || 'SYSTEM',
        action: 'UPDATE_EMPLOYEE',
        object: 'Employee Management',
        oldValue: JSON.stringify(existing),
        newValue: JSON.stringify(updated),
      },
    });

    return res.json(updated);
  } catch (error: any) {
    console.error('updateEmployee error:', error);
    return res.status(500).json({ message: 'Failed to update employee', error: error.message });
  }
};

export const toggleEmployeeStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const existing = await prisma.employee.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const newStatus = existing.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    const updated = await prisma.employee.update({
      where: { id },
      data: { status: newStatus },
    });

    await prisma.activityLog.create({
      data: {
        userId: req.user?.id || 'SYSTEM',
        action: 'TOGGLE_EMPLOYEE_STATUS',
        object: 'Employee Management',
        newValue: `Changed status of ${existing.fullName} to ${newStatus}`,
      },
    });

    return res.json(updated);
  } catch (error: any) {
    console.error('toggleEmployeeStatus error:', error);
    return res.status(500).json({ message: 'Failed to update employee status', error: error.message });
  }
};
