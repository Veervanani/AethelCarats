"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaClient = exports.PrismaClientMock = exports.prisma = exports.mysqlPool = void 0;
exports.getDatabaseUrl = getDatabaseUrl;
exports.getTableColumns = getTableColumns;
const promise_1 = __importDefault(require("mysql2/promise"));
const node_crypto_1 = __importDefault(require("node:crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbHost = process.env.DB_HOST || (process.platform === 'linux' ? '127.0.0.1' : 'srv844.hstgr.io');
const dbPort = Number(process.env.DB_PORT) || 3306;
const dbName = process.env.DB_NAME || 'u707945653_aethelcarats';
const dbUser = process.env.DB_USER || 'u707945653_admin';
const dbPass = process.env.DB_PASSWORD || 'tMg6FPi73a*HbPb';
console.log(`🔌 Initializing Pure JavaScript Native MySQL2 Pool for ${dbUser}@${dbHost}:${dbPort}/${dbName}`);
exports.mysqlPool = promise_1.default.createPool({
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
function getDatabaseUrl() {
    const encodedPassword = encodeURIComponent(dbPass)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A');
    return `mysql://${dbUser}:${encodedPassword}@${dbHost}:${dbPort}/${dbName}?connect_timeout=3&socket_timeout=3&pool_timeout=3`;
}
// In-memory cache for table columns to dynamically prevent ER_BAD_FIELD_ERROR
const tableColumnsCache = new Map();
async function getTableColumns(tableName) {
    const cached = tableColumnsCache.get(tableName);
    if (cached)
        return cached;
    try {
        const [rows] = await exports.mysqlPool.query(`DESCRIBE \`${tableName}\``);
        const cols = new Set(rows.map((r) => r.Field));
        tableColumnsCache.set(tableName, cols);
        return cols;
    }
    catch (err) {
        console.warn(`Could not describe table ${tableName}:`, err?.message || err);
        return new Set();
    }
}
function buildWhereClause(where, params, cols) {
    if (!where || typeof where !== 'object' || Object.keys(where).length === 0)
        return '';
    const clauses = [];
    for (const [key, val] of Object.entries(where)) {
        if (val === undefined)
            continue;
        if (key === 'OR' && Array.isArray(val)) {
            const orParts = val
                .map((cond) => {
                const subParams = [];
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
                const subParams = [];
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
        }
        else if (typeof val === 'object' && !(val instanceof Date)) {
            if ('some' in val || 'none' in val || 'every' in val) {
                // Relation filter not supported in flat SQL, skip
                continue;
            }
            if ('equals' in val) {
                if (val.equals === null) {
                    clauses.push('`' + key + '` IS NULL');
                }
                else {
                    clauses.push('`' + key + '` = ?');
                    params.push(val.equals);
                }
            }
            if ('not' in val) {
                if (val.not === null) {
                    clauses.push('`' + key + '` IS NOT NULL');
                }
                else {
                    clauses.push('`' + key + '` != ?');
                    params.push(val.not);
                }
            }
            if ('in' in val && Array.isArray(val.in)) {
                if (val.in.length === 0) {
                    clauses.push('1 = 0');
                }
                else {
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
        }
        else {
            clauses.push('`' + key + '` = ?');
            params.push(val);
        }
    }
    return clauses.length > 0 ? 'WHERE ' + clauses.join(' AND ') : '';
}
function createModelHandler(tableName) {
    return {
        async count(args = {}) {
            const cols = await getTableColumns(tableName);
            const params = [];
            const whereSql = buildWhereClause(args.where, params, cols);
            const sql = 'SELECT COUNT(*) as count FROM `' + tableName + '` ' + whereSql;
            const [rows] = await exports.mysqlPool.query(sql, params);
            return Number(rows[0]?.count || 0);
        },
        async findMany(args = {}) {
            const cols = await getTableColumns(tableName);
            const params = [];
            const whereSql = buildWhereClause(args.where, params, cols);
            let orderSql = '';
            if (args.orderBy) {
                if (Array.isArray(args.orderBy)) {
                    const parts = args.orderBy
                        .map((o) => {
                        const [k, d] = Object.entries(o)[0];
                        if (cols.size > 0 && !cols.has(k))
                            return null;
                        return '`' + k + '` ' + String(d).toUpperCase();
                    })
                        .filter(Boolean);
                    if (parts.length > 0)
                        orderSql = 'ORDER BY ' + parts.join(', ');
                }
                else {
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
                const selectedCols = Object.keys(args.select).filter((k) => args.select[k] === true && (cols.size === 0 || cols.has(k)));
                if (selectedCols.length > 0) {
                    selectSql = selectedCols.map((c) => '`' + c + '`').join(', ');
                }
            }
            const sql = 'SELECT ' + selectSql + ' FROM `' + tableName + '` ' + whereSql + ' ' + orderSql + ' ' + limitSql;
            const [rows] = await exports.mysqlPool.query(sql, params);
            // Handle relations if include is specified
            if (args.include && typeof args.include === 'object' && rows.length > 0) {
                for (const row of rows) {
                    await attachIncludes(tableName, row, args.include);
                }
            }
            return rows;
        },
        async findFirst(args = {}) {
            const rows = await this.findMany({ ...args, take: 1 });
            return rows[0] || null;
        },
        async findUnique(args = {}) {
            return this.findFirst(args);
        },
        async create(args = {}) {
            const cols = await getTableColumns(tableName);
            const rawData = { ...args.data };
            if (cols.has('id') && !rawData.id)
                rawData.id = node_crypto_1.default.randomUUID();
            if (cols.has('createdAt') && !rawData.createdAt)
                rawData.createdAt = new Date();
            if (cols.has('updatedAt') && !rawData.updatedAt)
                rawData.updatedAt = new Date();
            // Only insert keys that actually exist in the table columns
            const keys = Object.keys(rawData).filter((k) => rawData[k] !== undefined && (cols.size === 0 || cols.has(k)));
            const values = keys.map((k) => {
                const v = rawData[k];
                if (v !== null && typeof v === 'object' && !(v instanceof Date)) {
                    return JSON.stringify(v);
                }
                return v;
            });
            const sql = 'INSERT INTO `' +
                tableName +
                '` (' +
                keys.map((k) => '`' + k + '`').join(', ') +
                ') VALUES (' +
                keys.map(() => '?').join(', ') +
                ')';
            await exports.mysqlPool.query(sql, values);
            return this.findFirst({ where: { id: rawData.id || args.data?.id }, include: args.include });
        },
        async update(args = {}) {
            const cols = await getTableColumns(tableName);
            const rawData = { ...args.data };
            if (cols.has('updatedAt') && !rawData.updatedAt)
                rawData.updatedAt = new Date();
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
            await exports.mysqlPool.query(sql, params);
            return this.findFirst({ where: args.where });
        },
        async upsert(args = {}) {
            const existing = await this.findFirst({ where: args.where });
            if (existing) {
                return this.update({ where: args.where, data: args.update });
            }
            else {
                return this.create({ data: { ...args.where, ...args.create } });
            }
        },
        async delete(args = {}) {
            const cols = await getTableColumns(tableName);
            const existing = await this.findFirst({ where: args.where });
            const params = [];
            const whereSql = buildWhereClause(args.where, params, cols);
            await exports.mysqlPool.query('DELETE FROM `' + tableName + '` ' + whereSql, params);
            return existing;
        },
        async deleteMany(args = {}) {
            const cols = await getTableColumns(tableName);
            const params = [];
            const whereSql = buildWhereClause(args.where, params, cols);
            const [res] = await exports.mysqlPool.query('DELETE FROM `' + tableName + '` ' + whereSql, params);
            return { count: res.affectedRows || 0 };
        },
        async createMany(args = {}) {
            const items = Array.isArray(args.data) ? args.data : [args.data].filter(Boolean);
            let count = 0;
            for (const item of items) {
                await this.create({ data: item });
                count++;
            }
            return { count };
        },
        async aggregate(args = {}) {
            const cols = await getTableColumns(tableName);
            const params = [];
            const whereSql = buildWhereClause(args.where, params, cols);
            const selectExprs = [];
            const mapping = [];
            if (args._sum && typeof args._sum === 'object') {
                for (const k of Object.keys(args._sum)) {
                    if (cols.size === 0 || cols.has(k)) {
                        const alias = `_sum_${k}`;
                        selectExprs.push(`COALESCE(SUM(\`${k}\`), 0) AS \`${alias}\``);
                        mapping.push({ type: '_sum', key: k, alias });
                    }
                }
            }
            if (args._count && typeof args._count === 'object') {
                for (const k of Object.keys(args._count)) {
                    const alias = `_count_${k}`;
                    if (k === '_all' || k === 'id') {
                        selectExprs.push(`COUNT(*) AS \`${alias}\``);
                    }
                    else if (cols.size === 0 || cols.has(k)) {
                        selectExprs.push(`COUNT(\`${k}\`) AS \`${alias}\``);
                    }
                    mapping.push({ type: '_count', key: k, alias });
                }
            }
            if (args._max && typeof args._max === 'object') {
                for (const k of Object.keys(args._max)) {
                    if (cols.size === 0 || cols.has(k)) {
                        const alias = `_max_${k}`;
                        selectExprs.push(`MAX(\`${k}\`) AS \`${alias}\``);
                        mapping.push({ type: '_max', key: k, alias });
                    }
                }
            }
            if (args._min && typeof args._min === 'object') {
                for (const k of Object.keys(args._min)) {
                    if (cols.size === 0 || cols.has(k)) {
                        const alias = `_min_${k}`;
                        selectExprs.push(`MIN(\`${k}\`) AS \`${alias}\``);
                        mapping.push({ type: '_min', key: k, alias });
                    }
                }
            }
            if (args._avg && typeof args._avg === 'object') {
                for (const k of Object.keys(args._avg)) {
                    if (cols.size === 0 || cols.has(k)) {
                        const alias = `_avg_${k}`;
                        selectExprs.push(`COALESCE(AVG(\`${k}\`), 0) AS \`${alias}\``);
                        mapping.push({ type: '_avg', key: k, alias });
                    }
                }
            }
            if (selectExprs.length === 0) {
                selectExprs.push('COUNT(*) AS `_count_id`');
                mapping.push({ type: '_count', key: 'id', alias: '_count_id' });
            }
            const sql = `SELECT ${selectExprs.join(', ')} FROM \`${tableName}\` ${whereSql}`;
            const [rows] = await exports.mysqlPool.query(sql, params);
            const row = rows[0] || {};
            const result = {
                _sum: {},
                _count: {},
                _max: {},
                _min: {},
                _avg: {},
            };
            for (const m of mapping) {
                const val = row[m.alias];
                if (m.type === '_sum' || m.type === '_avg' || m.type === '_count') {
                    result[m.type][m.key] = val !== null && val !== undefined ? Number(val) : 0;
                }
                else {
                    result[m.type][m.key] = val !== undefined ? val : null;
                }
            }
            return result;
        },
        async groupBy(args = {}) {
            const cols = await getTableColumns(tableName);
            const byFields = Array.isArray(args.by) ? args.by : [args.by].filter(Boolean);
            const validBy = byFields.filter((f) => cols.size === 0 || cols.has(f));
            if (validBy.length === 0)
                return [];
            const params = [];
            const whereSql = buildWhereClause(args.where, params, cols);
            const byList = validBy.map((f) => '`' + f + '`').join(', ');
            const sql = `SELECT ${byList}, COUNT(*) as _count_id FROM \`${tableName}\` ${whereSql} GROUP BY ${byList}`;
            const [rows] = await exports.mysqlPool.query(sql, params);
            return rows.map((r) => {
                const item = { _count: { id: Number(r._count_id || 0) } };
                for (const f of validBy) {
                    item[f] = r[f];
                }
                return item;
            });
        },
    };
}
async function attachIncludes(parentTable, row, include) {
    if (!row || !row.id)
        return;
    if (parentTable === 'Page') {
        if (include.sections) {
            const [secs] = await exports.mysqlPool.query('SELECT * FROM `PageSection` WHERE `pageId` = ? ORDER BY `position` ASC', [row.id]);
            row.sections = secs;
        }
        if (include.seoMetadata) {
            const [seo] = await exports.mysqlPool.query('SELECT * FROM `SeoMetadata` WHERE `pageId` = ? LIMIT 1', [row.id]);
            row.seoMetadata = seo[0] || null;
        }
        if (include.revisions) {
            const [revs] = await exports.mysqlPool.query('SELECT * FROM `PageRevision` WHERE `pageId` = ? ORDER BY `createdAt` DESC LIMIT 20', [row.id]);
            row.revisions = revs;
        }
        if (include.faqs) {
            const [faqs] = await exports.mysqlPool.query('SELECT * FROM `FaqItem` WHERE `pageId` = ? ORDER BY `sortOrder` ASC', [row.id]);
            row.faqs = faqs;
        }
        if (include._count) {
            row._count = row._count || {};
            if (include._count.select?.sections) {
                const [cnt] = await exports.mysqlPool.query('SELECT COUNT(*) as c FROM `PageSection` WHERE `pageId` = ?', [row.id]).catch(() => [{ c: 0 }]);
                row._count.sections = Number(cnt[0]?.c || 0);
            }
            if (include._count.select?.revisions) {
                const [cnt] = await exports.mysqlPool.query('SELECT COUNT(*) as c FROM `PageRevision` WHERE `pageId` = ?', [row.id]).catch(() => [{ c: 0 }]);
                row._count.revisions = Number(cnt[0]?.c || 0);
            }
        }
    }
    else if (parentTable === 'Product') {
        if (include.images) {
            const [imgs] = await exports.mysqlPool.query('SELECT * FROM `ProductImage` WHERE `productId` = ? ORDER BY `position` ASC, `id` ASC', [row.id]);
            row.images = imgs;
        }
        if (include.category && row.categoryId) {
            const [cat] = await exports.mysqlPool.query('SELECT * FROM `Category` WHERE `id` = ? LIMIT 1', [row.categoryId]);
            row.category = cat[0] || null;
        }
    }
    else if (parentTable === 'Menu') {
        if (include.items) {
            const [items] = await exports.mysqlPool.query('SELECT * FROM `MenuItem` WHERE `menuId` = ? ORDER BY `position` ASC', [row.id]);
            row.items = items;
        }
    }
    else if (parentTable === 'Order') {
        if (include.items) {
            const [items] = await exports.mysqlPool.query('SELECT * FROM `OrderItem` WHERE `orderId` = ?', [row.id]).catch(() => [[]]);
            row.items = items;
        }
        if (include.payments) {
            const [payments] = await exports.mysqlPool.query('SELECT * FROM `Payment` WHERE `orderId` = ?', [row.id]).catch(() => [[]]);
            row.payments = payments;
        }
        if (include.refunds) {
            const [refunds] = await exports.mysqlPool.query('SELECT * FROM `Refund` WHERE `orderId` = ?', [row.id]).catch(() => [[]]);
            row.refunds = refunds;
        }
        if (include.customer && row.customerId) {
            const [cust] = await exports.mysqlPool.query('SELECT id, name, email FROM `User` WHERE `id` = ? LIMIT 1', [row.customerId]).catch(() => [[]]);
            row.customer = cust[0] || null;
        }
        if (include.shipments) {
            const [shipments] = await exports.mysqlPool.query('SELECT * FROM `Shipment` WHERE `orderId` = ?', [row.id]).catch(() => [[]]);
            row.shipments = shipments;
        }
    }
    else if (parentTable === 'User') {
        if (include.employee && row.employeeId) {
            const [emp] = await exports.mysqlPool.query('SELECT * FROM `Employee` WHERE `id` = ? LIMIT 1', [row.employeeId]);
            row.employee = emp[0] || null;
        }
    }
    else if (parentTable === 'Customer') {
        if (include.orders) {
            const [orders] = await exports.mysqlPool.query('SELECT * FROM `Order` WHERE `customerId` = ?', [row.id]).catch(() => [[]]);
            row.orders = orders || [];
            if (include.orders.include) {
                for (const o of row.orders) {
                    await attachIncludes('Order', o, include.orders.include);
                }
            }
        }
        else {
            row.orders = [];
        }
        if (include.assignedEmployee && row.assignedEmployeeId) {
            const [emp] = await exports.mysqlPool.query('SELECT * FROM `Employee` WHERE `id` = ? LIMIT 1', [row.assignedEmployeeId]).catch(() => [[]]);
            row.assignedEmployee = emp[0] || null;
        }
        if (include._count) {
            row._count = row._count || {};
            if (include._count.select?.internalSales) {
                const [cnt] = await exports.mysqlPool.query('SELECT COUNT(*) as c FROM `InternalSale` WHERE `customerId` = ?', [row.id]).catch(() => [{ c: 0 }]);
                row._count.internalSales = Number(cnt[0]?.c || 0);
            }
            if (include._count.select?.orders) {
                const [cnt] = await exports.mysqlPool.query('SELECT COUNT(*) as c FROM `Order` WHERE `customerId` = ?', [row.id]).catch(() => [{ c: 0 }]);
                row._count.orders = Number(cnt[0]?.c || 0);
            }
        }
    }
    else if (parentTable === 'InternalSale') {
        if (include.employee && row.employeeId) {
            const [emp] = await exports.mysqlPool.query('SELECT * FROM `Employee` WHERE `id` = ? LIMIT 1', [row.employeeId]).catch(() => [[]]);
            row.employee = emp[0] || null;
        }
        if (include.customer && row.customerId) {
            const [cust] = await exports.mysqlPool.query('SELECT * FROM `Customer` WHERE `id` = ? LIMIT 1', [row.customerId]).catch(() => [[]]);
            row.customer = cust[0] || null;
        }
        if (include.supplier && row.supplierId) {
            const [sup] = await exports.mysqlPool.query('SELECT * FROM `Supplier` WHERE `id` = ? LIMIT 1', [row.supplierId]).catch(() => [[]]);
            row.supplier = sup[0] || null;
        }
        if (include.commission) {
            const [comm] = await exports.mysqlPool.query('SELECT * FROM `Commission` WHERE `saleId` = ? LIMIT 1', [row.id]).catch(() => [[]]);
            row.commission = comm[0] || null;
        }
    }
    else if (parentTable === 'Commission') {
        if (include.employee && row.employeeId) {
            const [emp] = await exports.mysqlPool.query('SELECT * FROM `Employee` WHERE `id` = ? LIMIT 1', [row.employeeId]).catch(() => [[]]);
            row.employee = emp[0] || null;
        }
        if (include.sale && row.saleId) {
            const [sale] = await exports.mysqlPool.query('SELECT * FROM `InternalSale` WHERE `id` = ? LIMIT 1', [row.saleId]).catch(() => [[]]);
            row.sale = sale[0] || null;
        }
    }
}
exports.prisma = new Proxy({}, {
    get(target, prop) {
        if (prop === '$connect' || prop === '$disconnect')
            return async () => { };
        if (prop === '$queryRawUnsafe' || prop === '$queryRaw') {
            return (sql, ...params) => exports.mysqlPool.query(sql, params).then(([r]) => r);
        }
        if (prop === '$executeRawUnsafe' || prop === '$executeRaw') {
            return (sql, ...params) => exports.mysqlPool.query(sql, params).then(([r]) => r.affectedRows || 0);
        }
        if (prop === '$transaction') {
            return (ops) => (Array.isArray(ops) ? Promise.all(ops) : ops(exports.prisma));
        }
        // Convert camelCase model to PascalCase table name:
        // user -> User, diamond -> Diamond, siteSetting -> SiteSetting, etc.
        const table = prop.charAt(0).toUpperCase() + prop.slice(1);
        return createModelHandler(table);
    },
});
class PrismaClientMock {
    constructor() {
        return exports.prisma;
    }
}
exports.PrismaClientMock = PrismaClientMock;
exports.PrismaClient = PrismaClientMock;
exports.default = exports.prisma;
