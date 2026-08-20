# Multi-stage production Dockerfile for Floksy Jewel Frontend (Cloud Run)
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code and build Vite static bundle
COPY . ./
RUN npm run build

# Production runner stage
FROM node:20-alpine AS runner

WORKDIR /app

# Copy production static server & build output
COPY package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./server.js

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "server.js"]
