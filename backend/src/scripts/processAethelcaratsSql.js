const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '../../../hostinger-mysql-migration.sql');
const dest = path.join(__dirname, '../../../aethelcarats-database.sql');

console.log('Reading source SQL from:', source);
let content = fs.readFileSync(source, 'utf8');

const newHeader = `-- ==========================================================================
-- AETHELCARATS FINE JEWELLERY ATELIER — HOSTINGER MYSQL DATABASE EXPORT
-- Database: u707945653_aethelcarats
-- User: u707945653_admin
-- Host: localhost (Port 3306)
-- Engine Target: Hostinger MySQL 8 / MariaDB (All Storefront & Admin Tables)
-- ==========================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET NAMES utf8mb4;
`;

content = content.replace(/-- =+[\s\S]*?SET NAMES utf8mb4;/i, newHeader);
content = content.replaceAll('`floksyjewel`', '`u707945653_aethelcarats`');
content = content.replaceAll('`aura_atelier_db`', '`u707945653_aethelcarats`');
content = content.replaceAll('FLOKSY JEWEL', 'AETHELCARATS');
content = content.replaceAll('Floksy Jewel', 'AethelCarats');
content = content.replaceAll('floksy-jewel', 'aethelcarats');
content = content.replaceAll('floksyjewel', 'aethelcarats');
content = content.replaceAll('AURA DIAMOND ATELIER', 'AETHELCARATS FINE JEWELLERY ATELIER');
content = content.replaceAll('Aura Diamond Atelier', 'AethelCarats Fine Jewellery Atelier');
content = content.replaceAll('aura-atelier', 'aethelcarats');
content = content.replaceAll('contact@auroradiamonds.com', 'concierge@aethelcarats.com');
content = content.replaceAll('contact@floksyjewel.com', 'concierge@aethelcarats.com');

fs.writeFileSync(dest, content, 'utf8');
console.log('✅ Generated aethelcarats-database.sql: ' + (fs.statSync(dest).size / (1024 * 1024)).toFixed(2) + ' MB');
