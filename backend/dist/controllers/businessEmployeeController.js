"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleEmployeeStatus = exports.updateEmployee = exports.createEmployee = exports.getEmployeeById = exports.getEmployees = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../prisma"));
const getEmployees = async (req, res) => {
    try {
        const search = (req.query.search || '').trim().toLowerCase();
        const department = req.query.department || '';
        const status = req.query.status || '';
        const role = req.query.role || '';
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.max(1, Math.min(100, Number(req.query.limit) || 25));
        const skip = (page - 1) * limit;
        const where = {};
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
            prisma_1.default.employee.count({ where }),
            prisma_1.default.employee.findMany({
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
    }
    catch (error) {
        console.error('getEmployees error:', error);
        return res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
};
exports.getEmployees = getEmployees;
const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await prisma_1.default.employee.findUnique({
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
        const salesAggregate = await prisma_1.default.internalSale.aggregate({
            where: { employeeId: id },
            _sum: {
                finalSaleAmount: true,
                grossProfit: true,
                netProfit: true,
                commissionAmount: true,
            },
            _count: { id: true },
        });
        const diamondSalesCount = await prisma_1.default.internalSale.count({
            where: { employeeId: id, productType: 'Diamond' },
        });
        const jewelrySalesCount = await prisma_1.default.internalSale.count({
            where: { employeeId: id, productType: 'Jewelry' },
        });
        const commissionAggregate = await prisma_1.default.commission.groupBy({
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
            const st = c.status.toLowerCase();
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
    }
    catch (error) {
        console.error('getEmployeeById error:', error);
        return res.status(500).json({ message: 'Error fetching employee details', error: error.message });
    }
};
exports.getEmployeeById = getEmployeeById;
const createEmployee = async (req, res) => {
    try {
        const { fullName, email, phone, department, designation, role = 'SALES_EMPLOYEE', joiningDate, commissionPlanId, monthlySalesTarget = 0, notes, createLogin = false, password, } = req.body;
        if (!fullName || !email) {
            return res.status(400).json({ message: 'Full name and email are required.' });
        }
        const cleanEmail = email.trim().toLowerCase();
        // Check unique email
        const existingEmployee = await prisma_1.default.employee.findUnique({
            where: { email: cleanEmail },
        });
        if (existingEmployee) {
            return res.status(400).json({ message: 'An employee with this email already exists.' });
        }
        // Auto-generate employee code if not provided
        const count = await prisma_1.default.employee.count();
        const employeeCode = `EMP-${String(count + 101).padStart(3, '0')}`;
        let linkedUserId;
        if (password || createLogin || role === 'SALES_HR_MANAGER') {
            const existingUser = await prisma_1.default.user.findUnique({ where: { email: cleanEmail } });
            const passwordHash = password ? await bcryptjs_1.default.hash(password, 10) : undefined;
            if (existingUser) {
                linkedUserId = existingUser.id;
                if (passwordHash || role) {
                    await prisma_1.default.user.update({
                        where: { id: existingUser.id },
                        data: {
                            name: fullName.trim(),
                            role: role,
                            ...(passwordHash ? { passwordHash } : {}),
                        },
                    });
                }
            }
            else if (passwordHash) {
                const newUser = await prisma_1.default.user.create({
                    data: {
                        email: cleanEmail,
                        name: fullName.trim(),
                        passwordHash,
                        role: role,
                    },
                });
                linkedUserId = newUser.id;
            }
        }
        const employee = await prisma_1.default.employee.create({
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
            await prisma_1.default.user.update({
                where: { id: linkedUserId },
                data: { employeeId: employee.id },
            });
        }
        // Audit log
        await prisma_1.default.activityLog.create({
            data: {
                userId: req.user?.id || 'SYSTEM',
                action: 'CREATE_EMPLOYEE',
                object: 'Employee Management',
                newValue: `Created employee ${employee.fullName} (${employee.employeeCode}) with role ${role}`,
            },
        });
        return res.status(201).json(employee);
    }
    catch (error) {
        console.error('createEmployee error:', error);
        return res.status(500).json({ message: 'Failed to create employee', error: error.message });
    }
};
exports.createEmployee = createEmployee;
const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, email, phone, department, designation, role, status, joiningDate, commissionPlanId, monthlySalesTarget, notes, password, } = req.body;
        const existing = await prisma_1.default.employee.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        let linkedUserId = existing.userId;
        const targetEmail = email ? email.trim().toLowerCase() : existing.email;
        // Handle password update / user creation
        if (password) {
            const passwordHash = await bcryptjs_1.default.hash(password, 10);
            if (linkedUserId) {
                await prisma_1.default.user.update({
                    where: { id: linkedUserId },
                    data: {
                        passwordHash,
                        email: targetEmail,
                        name: fullName ? fullName.trim() : existing.fullName,
                        role: (role || existing.role),
                    },
                });
            }
            else {
                const existingUser = await prisma_1.default.user.findUnique({ where: { email: targetEmail } });
                if (existingUser) {
                    linkedUserId = existingUser.id;
                    await prisma_1.default.user.update({
                        where: { id: existingUser.id },
                        data: {
                            passwordHash,
                            role: (role || existing.role),
                            name: fullName ? fullName.trim() : existing.fullName,
                            employeeId: existing.id,
                        },
                    });
                }
                else {
                    const newUser = await prisma_1.default.user.create({
                        data: {
                            email: targetEmail,
                            name: fullName ? fullName.trim() : existing.fullName,
                            passwordHash,
                            role: (role || existing.role),
                            employeeId: existing.id,
                        },
                    });
                    linkedUserId = newUser.id;
                }
            }
        }
        else if (linkedUserId && (role || fullName || email)) {
            await prisma_1.default.user.update({
                where: { id: linkedUserId },
                data: {
                    role: role ? role : undefined,
                    name: fullName ? fullName.trim() : undefined,
                    email: email ? targetEmail : undefined,
                },
            });
        }
        const updated = await prisma_1.default.employee.update({
            where: { id },
            data: {
                userId: linkedUserId || existing.userId,
                fullName: fullName ? fullName.trim() : existing.fullName,
                email: targetEmail,
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
        // Audit log
        await prisma_1.default.activityLog.create({
            data: {
                userId: req.user?.id || 'SYSTEM',
                action: 'UPDATE_EMPLOYEE',
                object: 'Employee Management',
                oldValue: JSON.stringify(existing),
                newValue: JSON.stringify(updated),
            },
        });
        return res.json(updated);
    }
    catch (error) {
        console.error('updateEmployee error:', error);
        return res.status(500).json({ message: 'Failed to update employee', error: error.message });
    }
};
exports.updateEmployee = updateEmployee;
const toggleEmployeeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const existing = await prisma_1.default.employee.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        const newStatus = existing.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        const updated = await prisma_1.default.employee.update({
            where: { id },
            data: { status: newStatus },
        });
        await prisma_1.default.activityLog.create({
            data: {
                userId: req.user?.id || 'SYSTEM',
                action: 'TOGGLE_EMPLOYEE_STATUS',
                object: 'Employee Management',
                newValue: `Changed status of ${existing.fullName} to ${newStatus}`,
            },
        });
        return res.json(updated);
    }
    catch (error) {
        console.error('toggleEmployeeStatus error:', error);
        return res.status(500).json({ message: 'Failed to update employee status', error: error.message });
    }
};
exports.toggleEmployeeStatus = toggleEmployeeStatus;
