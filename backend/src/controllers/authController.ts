import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/auth';
import prisma from '../prisma';

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    const identifier = (username || email || '').trim();

    if (!identifier || !password) {
      return res.status(400).json({ message: 'Email/Username and Password are required' });
    }

    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { name: identifier },
        ],
      },
    });

    if (!user) {
      const employee = await prisma.employee.findFirst({
        where: { email: identifier },
      });
      if (employee && (employee as any).passwordHash) {
        if (employee.status?.toUpperCase() === 'INACTIVE') {
          return res.status(403).json({ message: 'Your employee account is currently inactive. Please contact your administrator.' });
        }
        user = {
          id: employee.id,
          email: employee.email,
          name: employee.fullName,
          role: employee.role,
          passwordHash: (employee as any).passwordHash,
          avatar: null,
          employeeId: employee.id,
          createdAt: employee.createdAt,
          updatedAt: employee.updatedAt,
        } as any;
      }
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const secret = process.env.JWT_SECRET || 'aura_diamond_atelier_secure_jwt_key_9v8k4m2x7t';
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      secret,
      { expiresIn: '7d' }
    );

    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'USER_LOGIN',
        object: 'Auth System',
        newValue: `User ${user.email} logged in`,
      },
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('loginAdmin error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ message: 'Authentication required' });

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, name: true, role: true, avatar: true, createdAt: true },
    });

    if (!user) return res.status(404).json({ message: 'User account not found' });

    res.json({ user, ...user });
  } catch (error) {
    console.error('getCurrentUser error:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'This email is already registered. Please sign in instead.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    // Public registration ALWAYS defaults to CUSTOMER role
    const user = await prisma.user.create({
      data: {
        email,
        name: name || email.split('@')[0],
        passwordHash,
        role: 'CUSTOMER',
      },
    });

    await prisma.customer.create({
      data: {
        email,
        name: name || email.split('@')[0],
        phone: phone || null,
      },
    });

    const secret = process.env.JWT_SECRET || 'aura_diamond_atelier_secure_jwt_key_9v8k4m2x7t';
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      secret,
      { expiresIn: '7d' }
    );

    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'USER_REGISTER',
        object: 'Auth System',
        newValue: `Registered customer account for ${email}`,
      },
    });

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('registerUser error:', error);
    return res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
};

// Admin User Management Controllers
export const getAdminUsers = async (req: AuthRequest, res: Response) => {
  try {
    const search = ((req.query.search as string) || '').trim().toLowerCase();
    const roleFilter = (req.query.role as string) || '';

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    let filtered = users;
    if (search) {
      filtered = filtered.filter(
        (u) => u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search)
      );
    }
    if (roleFilter && roleFilter !== 'ALL') {
      filtered = filtered.filter((u) => u.role === roleFilter);
    }

    res.json(filtered);
  } catch (error) {
    console.error('getAdminUsers error:', error);
    res.status(500).json({ message: 'Error fetching admin users' });
  }
};

export const updateUserRole = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    const { role: newRole } = req.body;

    if (!newRole) {
      return res.status(400).json({ message: 'Role is required' });
    }

    const ALLOWED_ROLES = [
      'CUSTOMER',
      'ADMIN',
      'SUPER_ADMIN',
      'SALES_HR_MANAGER',
      'SALES_MANAGER',
      'SALES_EMPLOYEE',
      'ACCOUNTANT',
      'PRODUCT_MANAGER',
      'CONTENT_MANAGER',
      'ORDER_MANAGER',
    ];
    if (!ALLOWED_ROLES.includes(newRole)) {
      return res.status(400).json({ message: `Invalid role specified: ${newRole}` });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Live Database lookup for calling admin user
    const callingUser = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, role: true },
    });

    if (!callingUser || (callingUser.role !== 'ADMIN' && callingUser.role !== 'SUPER_ADMIN')) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }

    // Role Hierarchy Rule: Only SUPER_ADMIN can assign SUPER_ADMIN role
    if (newRole === 'SUPER_ADMIN' && callingUser.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ message: 'Only SUPER_ADMIN can assign the SUPER_ADMIN role.' });
    }

    // Find Target User
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!targetUser) {
      return res.status(404).json({ message: 'Target user not found' });
    }

    const oldRole = targetUser.role;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
      select: { id: true, email: true, name: true, role: true, avatar: true, createdAt: true },
    });

    // Record Audit Log
    await prisma.activityLog.create({
      data: {
        userId: callingUser.id,
        action: 'ADMIN_ROLE_CHANGE',
        object: 'User Management',
        newValue: `Role for ${targetUser.email} changed from ${oldRole} to ${newRole} by ${callingUser.email}`,
      },
    });

    return res.json({
      success: true,
      user: updatedUser,
    });
  } catch (error: any) {
    console.error('updateUserRole error:', error);
    return res.status(500).json({ message: 'Failed to update user role' });
  }
};

export const getActivityLogs = async (req: AuthRequest, res: Response) => {
  try {
    const logs = await prisma.activityLog.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true, email: true } } },
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activity logs' });
  }
};

export const ensureDefaultAdminUsersExist = async () => {
  try {
    const adminCount = await prisma.user.count({
      where: { role: { in: ['ADMIN', 'SUPER_ADMIN'] } },
    });

    if (adminCount === 0) {
      const adminEmail = process.env.ADMIN_EMAIL || 'sysadmin@aura-atelier.internal';
      const adminName = process.env.ADMIN_NAME || 'aura_sysadmin_9k7x';
      // Bcrypt hash for strong admin password
      const hashedPassword = process.env.ADMIN_PASSWORD_HASH || '$2a$10$KVo.AmAhjCC16a46Xyk.KeXxO3.88Twg3bUxwQHDYupp1oVL3dgkG';

      await prisma.user.upsert({
        where: { email: adminEmail },
        update: { name: adminName, passwordHash: hashedPassword, role: 'SUPER_ADMIN' },
        create: {
          email: adminEmail,
          name: adminName,
          passwordHash: hashedPassword,
          role: 'SUPER_ADMIN',
        },
      });
      console.log('✅ Default Admin User ensured in database.');
    }
  } catch (err) {
    console.error('Error ensuring default admin users:', err);
  }
};
