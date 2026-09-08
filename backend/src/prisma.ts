import mysql from 'mysql2/promise';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import type { PrismaClient } from '@prisma/client';

dotenv.config();

const dbHost = process.env.DB_HOST || 'srv844.hstgr.io';
const dbPort = Number(process.env.DB_PORT) || 3306;
const dbName = process.env.DB_NAME || 'u707945653_aethelcarats';
const dbUser = process.env.DB_USER || 'u707945653_admin';
const dbPass = process.env.DB_PASSWORD || 'tMg6FPi73a*HbPb';

console.log(`🔌 Initializing Pure JavaScript Native MySQL2 Pool for ${dbUser}@${dbHost}:${dbPort}/${dbName}`);

export const mysqlPool = mysql.createPool({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPass,
  database: dbName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 4000,
});

export function getDatabaseUrl(): string {
  const encodedPassword = encodeURIComponent(dbPass)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A');
  return `mysql://${dbUser}:${encodedPassword}@${dbHost}:${dbPort}/${dbName}?connect_timeout=3&socket_timeout=3&pool_timeout=3`;
}

// In-memory cache for table columns to dynamically prevent ER_BAD_FIELD_ERROR
const tableColumnsCache = new Map<string, Set<string>>();

export async function getTableColumns(tableName: string): Promise<Set<string>> {
  const cached = tableColumnsCache.get(tableName);
  if (cached) return cached;
  try {
    const [rows]: any = await mysqlPool.query(`DESCRIBE \`${tableName}\``);
    const cols = new Set<string>(rows.map((r: any) => r.Field));
    tableColumnsCache.set(tableName, cols);
    return cols;
  } catch (err: any) {
    console.warn(`Could not describe table ${tableName}:`, err?.message || err);
    return new Set();
  }
}

function buildWhereClause(where: any, params: any[], cols?: Set<string>): string {
  if (!where || typeof where !== 'object' || Object.keys(where).length === 0) return '';
  const clauses: string[] = [];

  for (const [key, val] of Object.entries(where)) {
    if (val === undefined) continue;

    if (key === 'OR' && Array.isArray(val)) {
      const orParts = val
        .map((cond) => {
          const subParams: any[] = [];
          const subClause = buildWhereClause(cond, subParams, cols);
          if (subClause) {
            params.push(...subParams);
            return subClause.replace(/^WHERE\s+/, '');
          }
          return null;
        })
        .filter(Boolean);
      if (orParts.length > 0) {
        clauses.push('(' + orParts.join(' OR ') + ')');
      }
      continue;
    }

    if (key === 'AND' && Array.isArray(val)) {
      const andParts = val
        .map((cond) => {
          const subParams: any[] = [];
          const subClause = buildWhereClause(cond, subParams, cols);
          if (subClause) {
            params.push(...subParams);
            return subClause.replace(/^WHERE\s+/, '');
          }
          return null;
        })
        .filter(Boolean);
      if (andParts.length > 0) {
        clauses.push('(' + andParts.join(' AND ') + ')');
      }
      continue;
    }

    // Skip nested relations or unknown columns if column set is available
    if (cols && cols.size > 0 && !cols.has(key)) {
      continue;
    }

    if (val === null) {
      clauses.push('`' + key + '` IS NULL');
    } else if (typeof val === 'object' && !(val instanceof Date)) {
      if ('some' in val || 'none' in val || 'every' in val) {
        // Relation filter not supported in flat SQL, skip
        continue;
      }
      if ('equals' in val) {
        if (val.equals === null) {
          clauses.push('`' + key + '` IS NULL');
        } else {
          clauses.push('`' + key + '` = ?');
          params.push(val.equals);
        }
      }
      if ('not' in val) {
        if (val.not === null) {
          clauses.push('`' + key + '` IS NOT NULL');
        } else {
          clauses.push('`' + key + '` != ?');
          params.push(val.not);
        }
      }
      if ('in' in val && Array.isArray(val.in)) {
        if (val.in.length === 0) {
          clauses.push('1 = 0');
        } else {
          clauses.push('`' + key + '` IN (' + val.in.map(() => '?').join(', ') + ')');
          params.push(...val.in);
        }
      }
      if ('notIn' in val && Array.isArray(val.notIn)) {
        if (val.notIn.length > 0) {
          clauses.push('`' + key + '` NOT IN (' + val.notIn.map(() => '?').join(', ') + ')');
          params.push(...val.notIn);
        }
      }
      if ('gte' in val) {
        clauses.push('`' + key + '` >= ?');
        params.push(val.gte);
      }
      if ('lte' in val) {
        clauses.push('`' + key + '` <= ?');
        params.push(val.lte);
      }
      if ('gt' in val) {
        clauses.push('`' + key + '` > ?');
        params.push(val.gt);
      }
      if ('lt' in val) {
        clauses.push('`' + key + '` < ?');
        params.push(val.lt);
      }
      if ('contains' in val) {
        clauses.push('`' + key + '` LIKE ?');
        params.push('%' + val.contains + '%');
      }
    } else {
      clauses.push('`' + key + '` = ?');
      params.push(val);
    }
  }

  return clauses.length > 0 ? 'WHERE ' + clauses.join(' AND ') : '';
}

function createModelHandler(tableName: string) {
  return {
    async count(args: any = {}) {
      const cols = await getTableColumns(tableName);
      const params: any[] = [];
      const whereSql = buildWhereClause(args.where, params, cols);
      const sql = 'SELECT COUNT(*) as count FROM `' + tableName + '` ' + whereSql;
      const [rows]: any = await mysqlPool.query(sql, params);
      return Number(rows[0]?.count || 0);
    },

    async findMany(args: any = {}) {
      const cols = await getTableColumns(tableName);
      const params: any[] = [];
      const whereSql = buildWhereClause(args.where, params, cols);

      let orderSql = '';
      if (args.orderBy) {
        if (Array.isArray(args.orderBy)) {
          const parts = args.orderBy
            .map((o: any) => {
              const [k, d] = Object.entries(o)[0];
              if (cols.size > 0 && !cols.has(k)) return null;
              return '`' + k + '` ' + String(d).toUpperCase();
            })
            .filter(Boolean);
          if (parts.length > 0) orderSql = 'ORDER BY ' + parts.join(', ');
        } else {
          const [k, d] = Object.entries(args.orderBy)[0];
          if (cols.size === 0 || cols.has(k)) {
            orderSql = 'ORDER BY `' + k + '` ' + String(d).toUpperCase();
          }
        }
      }

      let limitSql = '';
      if (args.take !== undefined) {
        const take = Number(args.take);
        const skip = Number(args.skip || 0);
        limitSql = 'LIMIT ' + take + ' OFFSET ' + skip;
      }

      let selectSql = '*';
      if (args.select && typeof args.select === 'object') {
        const selectedCols = Object.keys(args.select).filter(
          (k) => args.select[k] === true && (cols.size === 0 || cols.has(k))
        );
        if (selectedCols.length > 0) {
          selectSql = selectedCols.map((c) => '`' + c + '`').join(', ');
        }
      }

      const sql = 'SELECT ' + selectSql + ' FROM `' + tableName + '` ' + whereSql + ' ' + orderSql + ' ' + limitSql;
      const [rows]: any = await mysqlPool.query(sql, params);

      // Handle relations if include is specified
      if (args.include && typeof args.include === 'object' && rows.length > 0) {
        for (const row of rows) {
          await attachIncludes(tableName, row, args.include);
        }
      }

      return rows;
    },

    async findFirst(args: any = {}) {
      const rows = await this.findMany({ ...args, take: 1 });
      return rows[0] || null;
    },

    async findUnique(args: any = {}) {
      return this.findFirst(args);
    },

    async create(args: any = {}) {
      const cols = await getTableColumns(tableName);
      const rawData = { ...args.data };
      if (cols.has('id') && !rawData.id) rawData.id = crypto.randomUUID();
      if (cols.has('createdAt') && !rawData.createdAt) rawData.createdAt = new Date();
      if (cols.has('updatedAt') && !rawData.updatedAt) rawData.updatedAt = new Date();

      // Only insert keys that actually exist in the table columns
      const keys = Object.keys(rawData).filter((k) => rawData[k] !== undefined && (cols.size === 0 || cols.has(k)));
      const values = keys.map((k) => {
        const v = rawData[k];
        if (v !== null && typeof v === 'object' && !(v instanceof Date)) {
          return JSON.stringify(v);
        }
        return v;
      });

      const sql =
        'INSERT INTO `' +
        tableName +
        '` (' +
        keys.map((k) => '`' + k + '`').join(', ') +
        ') VALUES (' +
        keys.map(() => '?').join(', ') +
        ')';
      await mysqlPool.query(sql, values);
      return this.findFirst({ where: { id: rawData.id || args.data?.id }, include: args.include });
    },

    async update(args: any = {}) {
      const cols = await getTableColumns(tableName);
      const rawData = { ...args.data };
      if (cols.has('updatedAt') && !rawData.updatedAt) rawData.updatedAt = new Date();

      const keys = Object.keys(rawData).filter((k) => rawData[k] !== undefined && (cols.size === 0 || cols.has(k)));
      if (keys.length === 0) {
        return this.findFirst({ where: args.where });
      }

      const values = keys.map((k) => {
        const v = rawData[k];
        if (v !== null && typeof v === 'object' && !(v instanceof Date)) {
          return JSON.stringify(v);
        }
        return v;
      });

      const params = [...values];
      const whereSql = buildWhereClause(args.where, params, cols);
      const sql = 'UPDATE `' + tableName + '` SET ' + keys.map((k) => '`' + k + '` = ?').join(', ') + ' ' + whereSql;
      await mysqlPool.query(sql, params);
      return this.findFirst({ where: args.where });
    },

    async upsert(args: any = {}) {
      const existing = await this.findFirst({ where: args.where });
      if (existing) {
        return this.update({ where: args.where, data: args.update });
      } else {
        return this.create({ data: { ...args.where, ...args.create } });
      }
    },

    async delete(args: any = {}) {
      const cols = await getTableColumns(tableName);
      const existing = await this.findFirst({ where: args.where });
      const params: any[] = [];
      const whereSql = buildWhereClause(args.where, params, cols);
      await mysqlPool.query('DELETE FROM `' + tableName + '` ' + whereSql, params);
      return existing;
    },

    async deleteMany(args: any = {}) {
      const cols = await getTableColumns(tableName);
      const params: any[] = [];
      const whereSql = buildWhereClause(args.where, params, cols);
      const [res]: any = await mysqlPool.query('DELETE FROM `' + tableName + '` ' + whereSql, params);
      return { count: res.affectedRows || 0 };
    },
  };
}

async function attachIncludes(parentTable: string, row: any, include: any) {
  if (!row || !row.id) return;

  if (parentTable === 'Page') {
    if (include.sections) {
      const [secs]: any = await mysqlPool.query(
        'SELECT * FROM `PageSection` WHERE `pageId` = ? ORDER BY `position` ASC',
        [row.id]
      );
      row.sections = secs;
    }
    if (include.seoMetadata) {
      const [seo]: any = await mysqlPool.query('SELECT * FROM `SeoMetadata` WHERE `pageId` = ? LIMIT 1', [row.id]);
      row.seoMetadata = seo[0] || null;
    }
    if (include.revisions) {
      const [revs]: any = await mysqlPool.query(
        'SELECT * FROM `PageRevision` WHERE `pageId` = ? ORDER BY `createdAt` DESC LIMIT 20',
        [row.id]
      );
      row.revisions = revs;
    }
    if (include.faqs) {
      const [faqs]: any = await mysqlPool.query(
        'SELECT * FROM `FaqItem` WHERE `pageId` = ? ORDER BY `sortOrder` ASC',
        [row.id]
      );
      row.faqs = faqs;
    }
    if (include._count) {
      row._count = row._count || {};
      if (include._count.select?.sections) {
        const [cnt]: any = await mysqlPool.query('SELECT COUNT(*) as c FROM `PageSection` WHERE `pageId` = ?', [row.id]).catch(() => [{ c: 0 }]);
        row._count.sections = Number(cnt[0]?.c || 0);
      }
      if (include._count.select?.revisions) {
        const [cnt]: any = await mysqlPool.query('SELECT COUNT(*) as c FROM `PageRevision` WHERE `pageId` = ?', [row.id]).catch(() => [{ c: 0 }]);
        row._count.revisions = Number(cnt[0]?.c || 0);
      }
    }
  } else if (parentTable === 'Product') {
    if (include.images) {
      const [imgs]: any = await mysqlPool.query(
        'SELECT * FROM `ProductImage` WHERE `productId` = ? ORDER BY `position` ASC, `id` ASC',
        [row.id]
      );
      row.images = imgs;
    }
    if (include.category && row.categoryId) {
      const [cat]: any = await mysqlPool.query('SELECT * FROM `Category` WHERE `id` = ? LIMIT 1', [row.categoryId]);
      row.category = cat[0] || null;
    }
  } else if (parentTable === 'Menu') {
    if (include.items) {
      const [items]: any = await mysqlPool.query(
        'SELECT * FROM `MenuItem` WHERE `menuId` = ? ORDER BY `position` ASC',
        [row.id]
      );
      row.items = items;
    }
  } else if (parentTable === 'Order') {
    if (include.items) {
      const [items]: any = await mysqlPool.query('SELECT * FROM `OrderItem` WHERE `orderId` = ?', [row.id]).catch(() => [[]]);
      row.items = items;
    }
    if (include.payments) {
      const [payments]: any = await mysqlPool.query('SELECT * FROM `Payment` WHERE `orderId` = ?', [row.id]).catch(() => [[]]);
      row.payments = payments;
    }
    if (include.refunds) {
      const [refunds]: any = await mysqlPool.query('SELECT * FROM `Refund` WHERE `orderId` = ?', [row.id]).catch(() => [[]]);
      row.refunds = refunds;
    }
    if (include.customer && row.customerId) {
      const [cust]: any = await mysqlPool.query('SELECT id, name, email FROM `User` WHERE `id` = ? LIMIT 1', [row.customerId]).catch(() => [[]]);
      row.customer = cust[0] || null;
    }
    if (include.shipments) {
      const [shipments]: any = await mysqlPool.query('SELECT * FROM `Shipment` WHERE `orderId` = ?', [row.id]).catch(() => [[]]);
      row.shipments = shipments;
    }
  } else if (parentTable === 'User') {
    if (include.employee && row.employeeId) {
      const [emp]: any = await mysqlPool.query('SELECT * FROM `Employee` WHERE `id` = ? LIMIT 1', [row.employeeId]);
      row.employee = emp[0] || null;
    }
  }
}

export const prisma = new Proxy(
  {},
  {
    get(target, prop: string) {
      if (prop === '$connect' || prop === '$disconnect') return async () => {};
      if (prop === '$queryRawUnsafe' || prop === '$queryRaw') {
        return (sql: string, ...params: any[]) => mysqlPool.query(sql, params).then(([r]) => r);
      }
      if (prop === '$executeRawUnsafe' || prop === '$executeRaw') {
        return (sql: string, ...params: any[]) => mysqlPool.query(sql, params).then(([r]: any) => r.affectedRows || 0);
      }
      if (prop === '$transaction') {
        return (ops: any) => (Array.isArray(ops) ? Promise.all(ops) : ops(prisma));
      }

      // Convert camelCase model to PascalCase table name:
      // user -> User, diamond -> Diamond, siteSetting -> SiteSetting, etc.
      const table = prop.charAt(0).toUpperCase() + prop.slice(1);
      return createModelHandler(table);
    },
  }
) as unknown as PrismaClient;

export class PrismaClientMock {
  constructor() {
    return prisma;
  }
}

export { PrismaClientMock as PrismaClient };
export default prisma;
