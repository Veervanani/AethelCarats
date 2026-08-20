# Multi-stage production Dockerfile for Floksy Jewel Platform (Cloud Run)
FROM node:20-alpine AS builder

RUN apk add --no-cache openssl

WORKDIR /app

# Copy root and workspace package manifests
COPY package.json package-lock.json ./
COPY frontend/package.json frontend/package-lock.json ./frontend/
COPY backend/package.json backend/package-lock.json ./backend/

# Install root, frontend, and backend dependencies with dev dependencies included for build stage
RUN npm ci --include=dev && cd frontend && npm ci --include=dev && cd ../backend && npm ci --include=dev

# Copy source code
COPY . ./

ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"

# Build backend and frontend
RUN cd backend && npx prisma generate && npm run build
RUN cd frontend && npm run build

# Production runner stage
FROM node:20-alpine AS runner

RUN apk add --no-cache openssl

WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/frontend/dist ./frontend/dist

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "server.js"]
