# Multi-stage build for backend

# Stage 1: Dependencies
FROM node:18-alpine AS dependenci
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Build (if needed for production optimizations)
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# No build step needed for this Node.js app, but stage is here for consistency

# Stage 3: Production
FROM node:18-alpine AS production
WORKDIR /app

# Copy production dependencies
COPY --from=dependencies /app/node_modules ./node_modules

# Copy application code
COPY . .

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

# Expose port
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["node", "src/index.js"]

