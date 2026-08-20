# Floksy Jewel

Luxury jewelry and diamond platform featuring a high-end storefront, authenticated loose diamond vault, bespoke CAD customizer, and a complete CMS Admin Panel.
<!-- Cloud Run Continuous Deployment Verified -->
<!-- Verified Cloud Build Trigger Connection -->

---

## Project Structure

```text
floksy-jewel/
├── frontend/             # React (Vite, TypeScript, Styled-Components, Swiper)
│   ├── public/           # Static brand assets, favicon, SVGs, and campaign media
│   └── src/              # Storefront, Admin Panel, components, routes, and styles
├── backend/              # Node.js Express server (TypeScript, Prisma ORM, SQLite/PostgreSQL)
│   ├── prisma/           # Database schema, migrations, and seed scripts
│   └── src/              # REST API controllers, routes, middleware, and services
├── .env.example          # Environment variables template
├── .gitignore            # Workspace ignore rules
└── package.json          # Root workspace scripts
```

---

## Environment Variables

Before running the application, set up the environment variables for both backend and frontend.

### Backend Setup:
Copy the example file to `.env`:
```bash
cp backend/.env.example backend/.env
```
Provide the required values:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
JWT_SECRET=your_secure_jwt_secret_here
```

### Frontend Setup:
Copy the example file to `.env`:
```bash
cp frontend/.env.example frontend/.env
```
Provide the API connection URL:
```env
VITE_API_URL=http://localhost:5000/api
```

> **IMPORTANT**: Never commit `.env` files or production secrets to Git.

---

## Development

### 1. Root Workspace (Recommended)
You can start both frontend and backend concurrently from the project root:

```bash
# Install root dependencies
npm install

# Run frontend and backend concurrently
npm run dev
```

### 2. Frontend Only
```bash
cd frontend
npm install
npm run dev
```
Storefront URL: `http://localhost:3000`

### 3. Backend Only
```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:seed
npm run dev
```
Backend API URL: `http://localhost:5000`

---

## Database Management (Prisma)

Run database migrations and seeding from the root or backend folder:

```bash
# Generate Prisma Client
npm run db:generate

# Run Database Seed (Initializes catalog, mega menus & CMS blocks)
npm run db:seed

# Run Development Migrations
npm run db:migrate
```

---

## Production Build & Verification

To build both frontend and backend for production:

```bash
# Build both frontend and backend from root
npm run build

# Or build individually:
npm run build:frontend
npm run build:backend
```

- **Frontend build output**: `frontend/dist/`
- **Backend build output**: `backend/dist/`

---

## Admin Panel

The Floksy Jewel application includes an Admin Content Management System (CMS) and Page Builder.

- **Access URL**: `/admin` (or `/admin/cms/page-builder`)
- **Key Capabilities**:
  - **Homepage Hero Section**: 25-point visual control panel (heading, description, desktop/tablet/mobile hero images, overlay, focal alignment, font sizes).
  - **Campaign Banner Section**: Dedicated independent CMS section (`/assets/GOLD-MARQUISE-DIAMOND-JEWELRY-SET.webp`) with custom focal points and overlay opacity controls.
  - **Mega Menu Navigation**: Dynamic mega menu management for all main categories (RINGS, EARRINGS, NECKLACES, BRACELETS, PENDANTS, DIAMONDS) with editable promotional cards.
  - **Diamond Shapes Vault**: Admin management of vector shape SVGs (Round, Oval, Emerald, Princess, Cushion, Pear, Radiant, Marquise) with responsive display sizes and target links.
  - **Catalog & Orders**: Manage loose diamonds, products, categories, and custom CAD requests.

---

## Security & Publishing Guidelines

- All sensitive keys, secrets, database credentials, and binary build artifacts are explicitly listed in `.gitignore`.
- Always verify that `.env` files are excluded before pushing changes to GitHub.

---

## Google Cloud Run Deployment

- **Container Port**: Configured for `0.0.0.0:${PORT}` (defaults to `8080`).
- **Production Server**: Driven by `frontend/server.js` (`npm start`).
- **Cloud Run Health Check**: Supports `/healthz` and `HEAD /` returning HTTP 200 OK.
- **SPA Client Routes**: Automatic fallback to `index.html` for client-side navigation (`/rings`, `/diamonds`, `/pendants`, `/custom-jewellery`, `/admin`).

