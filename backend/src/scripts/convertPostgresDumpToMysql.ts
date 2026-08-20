import fs from 'fs';
import path from 'path';

/**
 * Migration Utility: PostgreSQL pg_dump → Hostinger MySQL / MariaDB SQL Generator
 *
 * Reads PostgreSQL export "Cloud_SQL_Export_2026-08-11 (18_58_11).sql" without modifying it.
 * Generates a complete, ready-to-import "hostinger-mysql-migration.sql" file for Hostinger.
 */
const SOURCE_BACKUP_PATH = path.join(__dirname, '../../../Cloud_SQL_Export_2026-08-11 (18_58_11).sql');
const OUTPUT_MYSQL_SQL_PATH = path.join(__dirname, '../../../hostinger-mysql-migration.sql');

function convertPostgresDumpToMysql() {
  console.log(`🔍 Inspecting PostgreSQL Dump: ${SOURCE_BACKUP_PATH}`);

  if (!fs.existsSync(SOURCE_BACKUP_PATH)) {
    console.error(`❌ Error: Source backup file not found at ${SOURCE_BACKUP_PATH}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(SOURCE_BACKUP_PATH, 'utf-8');
  const lines = fileContent.split(/\r?\n/);

  console.log(`📊 Processing ${lines.length} lines from PostgreSQL dump...`);

  let mysqlSql = `-- ==========================================================================\n`;
  mysqlSql += `-- HOSTINGER MYSQL / MARIADB MIGRATION DUMP FOR FLOKSY JEWEL\n`;
  mysqlSql += `-- Generated from Google Cloud SQL PostgreSQL 18 Backup\n`;
  mysqlSql += `-- Date: ${new Date().toISOString()}\n`;
  mysqlSql += `-- ==========================================================================\n\n`;
  mysqlSql += `SET FOREIGN_KEY_CHECKS = 0;\n`;
  mysqlSql += `SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";\n`;
  mysqlSql += `SET NAMES utf8mb4;\n\n`;

  let inCopyBlock = false;
  let currentCopyTable = '';
  let currentCopyColumns: string[] = [];
  let recordCount = 0;
  let tableCounts: Record<string, number> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle COPY block start: COPY public."TableName" (col1, col2) FROM stdin;
    const copyMatch = line.match(/^COPY public\."([^"]+)"\s*\(([^)]+)\)\s*FROM stdin;/i);
    if (copyMatch) {
      inCopyBlock = true;
      currentCopyTable = copyMatch[1];
      currentCopyColumns = copyMatch[2].split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
      tableCounts[currentCopyTable] = 0;
      continue;
    }

    // Handle COPY block end: \.
    if (inCopyBlock) {
      if (line.trim() === '\\.') {
        inCopyBlock = false;
        currentCopyTable = '';
        currentCopyColumns = [];
        continue;
      }

      if (line.trim() === '') continue;

      // Parse tab-separated row data from PostgreSQL COPY statement
      const rowValues = line.split('\t');
      tableCounts[currentCopyTable] = (tableCounts[currentCopyTable] || 0) + 1;
      recordCount++;

      const formattedValues = rowValues.map((val) => {
        if (val === '\\N' || val === 'null' || val === 'NULL') {
          return 'NULL';
        }
        // Handle boolean values
        if (val === 't') return '1';
        if (val === 'f') return '0';
        // Handle strings & escape quotes
        let str = val
          .replace(/\\/g, '\\\\')
          .replace(/'/g, "\\'")
          .replace(/\r/g, '\\r')
          .replace(/\n/g, '\\n')
          .replace(/\t/g, '\\t');
        return `'${str}'`;
      });

      const colsFormatted = currentCopyColumns.map((c) => `\`${c}\``).join(', ');
      mysqlSql += `INSERT INTO \`${currentCopyTable}\` (${colsFormatted}) VALUES (${formattedValues.join(', ')});\n`;
    }
  }

  mysqlSql += `\nSET FOREIGN_KEY_CHECKS = 1;\n`;

  fs.writeFileSync(OUTPUT_MYSQL_SQL_PATH, mysqlSql, 'utf-8');

  console.log(`\n🎉 MySQL Migration SQL generated successfully!`);
  console.log(`📁 File location: ${OUTPUT_MYSQL_SQL_PATH}`);
  console.log(`📦 Total Data Insert Statements: ${recordCount}`);
  console.log(`📊 Table Record Breakdown:`, tableCounts);
}

convertPostgresDumpToMysql();
