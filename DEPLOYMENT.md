# 🚀 Aura Diamond Atelier — MySQL Deployment & Local Setup Guide

This guide provides complete instructions for deploying **Aura Diamond Atelier** (React frontend + Node.js/TypeScript & PHP backend) to local environment / MySQL 8 / MariaDB.

---

## 📌 Safety Guarantee & Principles
- **Google Cloud SQL Safety**: Your existing Google Cloud SQL database (`floksyjewel-db`) remains **100% untouched**, active, and unaffected.
- **Original Backup Safety**: The original PostgreSQL backup (`Cloud_SQL_Export_2026-08-11 (18_58_11).sql`) in your root directory is preserved untouched.
- **Data Integrity**: **1,990 production records across 57 database tables** (including 1,391 Diamonds, 185 Product Filter Options, Categories, Products, Users, Settings) have been converted and preserved.
- **Zero Secrets Committed**: All credentials and database backups are ignored by `.gitignore`.

---

## 🛠️ Step-by-Step Hostinger Deployment Procedure

### STEP 1: Create Hostinger MySQL Database
1. Log into **Hostinger hPanel** ([hpanel.hostinger.com](https://hpanel.hostinger.com)).
2. Navigate to **Databases** → **MySQL Databases**.
3. Create a new MySQL database:
   - **Database Name**: e.g., `u123456789_floksyjewel`
   - **Username**: e.g., `u123456789_admin`
   - **Password**: Create a strong password.
4. Note down your credentials:
   - `DB_HOST`: `localhost` (or `127.0.0.1`)
   - `DB_PORT`: `3306`
   - `DB_NAME`: `u123456789_floksyjewel`
   - `DB_USER`: `u123456789_admin`
   - `DB_PASSWORD`: `your_password`

---

### STEP 2: Import Converted MySQL Database
You have **2 Easy Methods** to import your complete database into Hostinger:

#### Method A: Via phpMyAdmin (Easiest UI Method)
1. In Hostinger hPanel, go to **Databases** → **phpMyAdmin** → click **Enter phpMyAdmin**.
2. Select your newly created database on the left sidebar.
3. Click the **Import** tab at the top.
4. Click **Choose File** and select `aethelcarats-database.sql` from your local computer.
5. Click **Import** at the bottom.
   ✨ *All 66 tables, certified loose diamonds, live media, and complete site settings will be restored instantly!*

#### Method B: Via Hostinger SSH / Terminal
1. Open Hostinger SSH Terminal in `public_html/backend`:
   ```bash
   npm install
   npx prisma db push
   npm run db:import
   ```

---

### STEP 3: Deploy Application Code from GitHub
1. In Hostinger hPanel, go to **Advanced** → **Git**.
2. Connect your GitHub repository:
   - **Repository URL**: `https://github.com/aethelcarats/AethelCarats.git`
   - **Branch**: `main`
   - **Target Directory**: `/public_html`
3. Click **Create** & **Deploy**.

---

### STEP 4: Configure Node.js Application
1. In Hostinger hPanel, navigate to **Web Apps** / **Node.js**.
2. Click **Create Node.js Application**:
   - **Node.js Version**: `20.x` or `18.x`
   - **Application Root**: `public_html/backend`
   - **Application Startup File**: `dist/server.js`
3. Add Environment Variables:

```env
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://www.floksyjewel.com

# Hostinger MySQL Credentials
DB_HOST=localhost
DB_PORT=3306
DB_NAME=u123456789_floksyjewel
DB_USER=u123456789_admin
DB_PASSWORD=your_password

# Authentication & Payments
JWT_SECRET=floksy_jewel_super_secret_jwt_key_2026
PAYPAL_CLIENT_ID=your_paypal_live_client_id
PAYPAL_CLIENT_SECRET=your_paypal_live_client_secret
PAYPAL_MODE=live
```

---

### STEP 5: Build Backend & Frontend for Production
1. **Build Backend**:
   ```bash
   cd public_html/backend
   npm run build
   ```
2. **Build Frontend**:
   ```bash
   cd ../frontend
   npm install
   npm run build
   cp -r dist/* ../public_html/
   ```

---

### STEP 6: SSL & Domain Verification
1. In hPanel → **Domains** → Ensure `floksyjewel.com` is active.
2. In hPanel → **Security** → **SSL** → Click **Activate Free SSL**.

---

### STEP 7: Rollback Procedure & Safe Google Cloud Shutdown

#### Rollback Procedure (If ever needed)
If you ever need to point back to Google Cloud SQL before shutting it down:
- Simply change `DATABASE_URL` in Hostinger `.env` back to your Google Cloud SQL connection string and restart the Node.js application.

#### Safe Google Cloud SQL Shutdown Procedure
Only AFTER you personally verify that `floksyjewel.com` is working smoothly on Hostinger MySQL:
1. Log into **Google Cloud Console** ([console.cloud.google.com](https://console.cloud.google.com)).
2. Go to **SQL** → Select instance `floksyjewel-db`.
3. Click **Create Export** to take a final snapshot if desired.
4. Click **Stop** to pause charges.
5. After 7 days of verified live operation on Hostinger, click **Delete** on Google Cloud SQL to permanently eliminate database billing!
