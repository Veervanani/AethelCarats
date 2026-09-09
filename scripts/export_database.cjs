const fs = require('fs');
const path = require('path');
const { mysqlPool } = require('../backend/dist/prisma');

function escapeSqlValue(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return Number.isFinite(val) ? String(val) : 'NULL';
  if (typeof val === 'boolean') return val ? '1' : '0';
  if (val instanceof Date) {
    return `'${val.toISOString().slice(0, 23).replace('T', ' ')}'`;
  }
  if (Buffer.isBuffer(val)) {
    return `X'${val.toString('hex')}'`;
  }
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  const str = String(val)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\0/g, '\\0')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\x1a/g, '\\Z');
  return `'${str}'`;
}

async function exportFullDatabase() {
  console.log('🚀 Starting live database export...');

  const dbDir = path.resolve(__dirname, '../database');
  const backendDataDir = path.resolve(__dirname, '../backend/data');
  if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
  if (!fs.existsSync(backendDataDir)) fs.mkdirSync(backendDataDir, { recursive: true });

  const rootSqlFile = path.resolve(__dirname, '../aethelcarats-database.sql');
  const dbSqlFile = path.join(dbDir, 'aethelcarats-database.sql');
  const schemaSqlFile = path.join(dbDir, 'schema.sql');

  const [tablesResult] = await mysqlPool.query('SHOW TABLES');
  const tableNames = tablesResult.map((r) => Object.values(r)[0]);

  let schemaContent = `-- ==========================================================================\n`;
  schemaContent += `-- AETHELCARATS LUXURY FINE JEWELLERY & DIAMOND VAULT PLATFORM\n`;
  schemaContent += `-- Complete Database Schema (DDL)\n`;
  schemaContent += `-- Target Engine: MySQL 8.0+ / MariaDB 10.4+\n`;
  schemaContent += `-- Generated: ${new Date().toISOString()}\n`;
  schemaContent += `-- ==========================================================================\n\n`;
  schemaContent += `SET FOREIGN_KEY_CHECKS = 0;\nSET NAMES utf8mb4;\nSET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";\n\n`;

  let fullDumpContent = `-- ==========================================================================\n`;
  fullDumpContent += `-- AETHELCARATS LUXURY FINE JEWELLERY & DIAMOND VAULT PLATFORM\n`;
  fullDumpContent += `-- Complete Production Database Dump (Schema + Data)\n`;
  fullDumpContent += `-- Target Engine: MySQL 8.0+ / MariaDB 10.4+\n`;
  fullDumpContent += `-- Database: u707945653_aethelcarats\n`;
  fullDumpContent += `-- Generated: ${new Date().toISOString()}\n`;
  fullDumpContent += `-- Total Tables: ${tableNames.length}\n`;
  fullDumpContent += `-- ==========================================================================\n\n`;
  fullDumpContent += `SET FOREIGN_KEY_CHECKS = 0;\nSET NAMES utf8mb4;\nSET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";\n\n`;

  // Track key tables for JSON backups
  const jsonTables = ['Category', 'Product', 'SiteSetting', 'Media', 'HeroBanner', 'SeoMetadata'];
  const jsonBackups = {};

  for (const table of tableNames) {
    console.log(`Processing table [${table}]...`);

    // 1. Get Table DDL
    const [[createResult]] = await mysqlPool.query(`SHOW CREATE TABLE \`${table}\``);
    const ddl = createResult['Create Table'];
    schemaContent += `DROP TABLE IF EXISTS \`${table}\`;\n${ddl};\n\n`;
    fullDumpContent += `-- --------------------------------------------------------\n`;
    fullDumpContent += `-- Table structure for \`${table}\`\n`;
    fullDumpContent += `-- --------------------------------------------------------\n`;
    fullDumpContent += `DROP TABLE IF EXISTS \`${table}\`;\n${ddl};\n\n`;

    // 2. Get Table Data
    const [rows] = await mysqlPool.query(`SELECT * FROM \`${table}\``);
    if (jsonTables.includes(table)) {
      jsonBackups[table] = rows;
    }

    if (rows.length > 0) {
      fullDumpContent += `-- Dumping data for table \`${table}\` (${rows.length} rows)\n`;
      fullDumpContent += `LOCK TABLES \`${table}\` WRITE;\n`;

      const columns = Object.keys(rows[0]).map((c) => `\`${c}\``).join(', ');
      
      // Batch inserts in chunks of 100 rows
      const chunkSize = 100;
      for (let i = 0; i < rows.length; i += chunkSize) {
        const chunk = rows.slice(i, i + chunkSize);
        const valuesList = chunk
          .map((row) => {
            const rowValues = Object.values(row).map(escapeSqlValue).join(', ');
            return `(${rowValues})`;
          })
          .join(',\n  ');

        fullDumpContent += `INSERT INTO \`${table}\` (${columns}) VALUES\n  ${valuesList};\n`;
      }

      fullDumpContent += `UNLOCK TABLES;\n\n`;
    }
  }

  fullDumpContent += `SET FOREIGN_KEY_CHECKS = 1;\n`;
  schemaContent += `SET FOREIGN_KEY_CHECKS = 1;\n`;

  // Write SQL files
  console.log(`Writing ${dbSqlFile}...`);
  fs.writeFileSync(dbSqlFile, fullDumpContent, 'utf-8');

  console.log(`Writing ${rootSqlFile}...`);
  fs.writeFileSync(rootSqlFile, fullDumpContent, 'utf-8');

  console.log(`Writing ${schemaSqlFile}...`);
  fs.writeFileSync(schemaSqlFile, schemaContent, 'utf-8');

  // Write updated JSON data files to backend/data/
  if (jsonBackups.Category) {
    fs.writeFileSync(path.join(backendDataDir, 'live_categories.json'), JSON.stringify(jsonBackups.Category, null, 2), 'utf-8');
  }
  if (jsonBackups.Product) {
    fs.writeFileSync(path.join(backendDataDir, 'live_products.json'), JSON.stringify(jsonBackups.Product, null, 2), 'utf-8');
  }
  if (jsonBackups.SiteSetting) {
    fs.writeFileSync(path.join(backendDataDir, 'live_site_settings.json'), JSON.stringify(jsonBackups.SiteSetting, null, 2), 'utf-8');
  }
  if (jsonBackups.Media) {
    fs.writeFileSync(path.join(backendDataDir, 'live_media.json'), JSON.stringify(jsonBackups.Media, null, 2), 'utf-8');
  }
  if (jsonBackups.HeroBanner) {
    fs.writeFileSync(path.join(backendDataDir, 'live_hero_banners.json'), JSON.stringify(jsonBackups.HeroBanner, null, 2), 'utf-8');
  }
  if (jsonBackups.SeoMetadata) {
    fs.writeFileSync(path.join(backendDataDir, 'live_seo.json'), JSON.stringify(jsonBackups.SeoMetadata, null, 2), 'utf-8');
  }

  console.log('✅ Full database export and JSON data refresh completed successfully!');
  process.exit(0);
}

exportFullDatabase().catch((err) => {
  console.error('❌ Database export error:', err);
  process.exit(1);
});
