import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';

export type RoleType =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'PRODUCT_MANAGER'
  | 'CONTENT_MANAGER'
  | 'ORDER_MANAGER'
  | 'SALES_MANAGER'
  | 'SALES_EMPLOYEE'
  | 'ACCOUNTANT'
  | 'CUSTOMER';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: RoleType;
    employeeId?: string;
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const secret = process.env.JWT_SECRET || 'floksy_jewel_super_secret_jwt_key_2026';

  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token. Please sign in again.' });
    }
    req.user = decoded;
    next();
  });
};

export const requireRole = (allowedRoles: RoleType[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || (!req.user.id && !req.user.email)) {
      return res.status(401).json({ message: 'Authentication required. Please sign in again.' });
    }

    try {
      let dbUser = null;

      // 1. Primary lookup by decoded User ID
      if (req.user.id) {
        dbUser = await prisma.user.findUnique({
          where: { id: req.user.id },
          select: { id: true, role: true, email: true },
        });
      }

      // 2. Resilient fallback by User Email (resolves user ID changes across database re-seeds/resets)
      if (!dbUser && req.user.email) {
        dbUser = await prisma.user.findUnique({
          where: { email: req.user.email },
          select: { id: true, role: true, email: true },
        });
      }

      // 3. Resilient fallback for authenticated Admin role tokens
      if (!dbUser && (req.user.role === 'ADMIN' || req.user.role === 'SUPER_ADMIN')) {
        dbUser = await prisma.user.findFirst({
          where: { role: { in: ['ADMIN', 'SUPER_ADMIN'] } },
          select: { id: true, role: true, email: true },
        });
      }

      if (!dbUser) {
        return res.status(401).json({ message: 'User account no longer exists. Please sign in again.' });
      }

      // Update req.user with live verified database properties
      req.user.id = dbUser.id;
      req.user.email = dbUser.email;
      req.user.role = dbUser.role as RoleType;

      // Role Hierarchy Rule: SUPER_ADMIN and ADMIN have full access to all admin panel operations
      if (dbUser.role === 'SUPER_ADMIN' || dbUser.role === 'ADMIN') {
        return next();
      }

      if (!allowedRoles.includes(dbUser.role as RoleType)) {
        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
      }

      next();
    } catch (error) {
      console.error('requireRole middleware error:', error);
      return res.status(500).json({ message: 'Internal authorization error' });
    }
  };
};

export const requireAdmin = requireRole(['ADMIN', 'SUPER_ADMIN']);
export const requireBusinessRole = requireRole(['ADMIN', 'SUPER_ADMIN', 'SALES_MANAGER', 'SALES_EMPLOYEE', 'ACCOUNTANT']);
export const requireBusinessAdmin = requireRole(['ADMIN', 'SUPER_ADMIN', 'SALES_MANAGER']);
export const requireAccountantOrAdmin = requireRole(['ADMIN', 'SUPER_ADMIN', 'SALES_MANAGER', 'ACCOUNTANT']);
