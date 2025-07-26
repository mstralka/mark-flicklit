# Multi-stage build for React frontend
FROM node:22 AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy only necessary source files
COPY src/frontend ./src/frontend
COPY src/backend/tsconfig.json ./src/backend/tsconfig.json
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY index.html ./
COPY tailwind.config.js ./
COPY postcss.config.mjs ./

# Build argument for API URL
ARG VITE_API_URL=http://localhost/api

# Set environment variable for build
ENV VITE_API_URL=${VITE_API_URL}

# Build the frontend
RUN yarn build:frontend

# Production stage with nginx
FROM nginx:1.29 AS production

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy built assets from build stage
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Copy custom nginx configuration for SPA
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Create nginx user
RUN groupadd -g 1001 nginx-user && \
    useradd -r -u 1001 -g nginx-user nginx-user

# Set proper permissions
RUN chown -R nginx-user:nginx-user /usr/share/nginx/html && \
    chown -R nginx-user:nginx-user /var/cache/nginx && \
    chown -R nginx-user:nginx-user /var/log/nginx && \
    chown -R nginx-user:nginx-user /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx-user:nginx-user /var/run/nginx.pid

# Switch to non-root user
USER nginx-user

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:80/ || exit 1

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]