# Multi-stage build for Node.js backend
FROM node:22 AS base

# Install system dependencies
RUN apt-get update && apt-get install -y \
    openssl \
    curl \
    dumb-init \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --production=false

# Copy only necessary source files
COPY src/backend ./src/backend
COPY tsconfig.json ./

# Generate Prisma client
RUN yarn db:generate

# Build the backend
RUN yarn build:backend

# Production stage
FROM node:22 AS production

# Install system dependencies for production
RUN apt-get update && apt-get install -y \
    openssl \
    curl \
    dumb-init \
    && rm -rf /var/lib/apt/lists/*

# Create app user
RUN groupadd -g 1001 nodejs && \
    useradd -r -u 1001 -g nodejs nodejs

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --frozen-lockfile --production=true && \
    yarn cache clean

# Copy built application and necessary files
COPY --from=base /app/dist/backend ./dist
COPY --from=base /app/src/backend/prisma ./prisma
COPY --from=base /app/src/backend/generated ./generated
COPY --from=base /app/src/backend/scripts ./scripts

# Create data directory for OpenLibrary imports
RUN mkdir -p /app/data && chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3001/health || exit 1

# Expose port
EXPOSE 3001

# Start the application
CMD ["dumb-init", "node", "dist/server.js"]