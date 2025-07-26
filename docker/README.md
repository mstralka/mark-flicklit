# FlickLit Docker Setup

This directory contains Docker configuration files for running FlickLit in containerized environments.

## Architecture

The Docker stack includes:

- **nginx**: Reverse proxy and static file server
- **mysql**: Production database 
- **valkey**: Redis-compatible cache (for future use)
- **backend**: Express.js API server (Node.js/Ubuntu)
- **frontend**: React application served by nginx (Ubuntu)

## Quick Start

### Production

1. Copy environment file:
   ```bash
   cp .env.docker .env.docker.local
   # Edit .env.docker.local with your secure passwords
   ```

2. Start the stack:
   ```bash
   docker-compose --env-file .env.docker.local up -d
   ```

3. Run database migrations:
   ```bash
   docker-compose exec backend yarn db:push
   ```

4. Access the application:
   - Frontend: http://localhost
   - API: http://localhost/api
   - Direct backend: http://localhost:3001

### Development

#### Option 1: Convenience Scripts (Recommended)

**Linux/macOS:**
```bash
./dev-start.sh          # Start development environment
./dev-start.sh --logs    # Start and follow logs
./dev-stop.sh           # Stop development environment
```

**Windows:**
```cmd
dev-start.bat           # Start development environment
dev-start.bat /logs     # Start and follow logs
dev-stop.bat            # Stop development environment
```

#### Option 2: Manual Docker Compose

1. Start with development overrides:
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
   ```

2. Access the application:
   - Frontend: http://localhost:8080 (nginx proxy)
   - Direct frontend: http://localhost:5173 (Vite dev server)
   - Direct backend: http://localhost:3001

## Services

### nginx
- **Image**: nginx:1.29
- **Purpose**: Reverse proxy, static file serving, SSL termination
- **Ports**: 80, 443
- **Config**: `./docker/nginx/`

### mysql
- **Image**: mysql:8.0
- **Purpose**: Primary database
- **Port**: 3306
- **Data**: Persisted in `mysql_data` volume
- **Init**: `./docker/mysql/init/`

### valkey
- **Image**: valkey/valkey:7
- **Purpose**: Redis-compatible cache/session store
- **Port**: 6379
- **Data**: Persisted in `valkey_data` volume

### backend
- **Base**: node:20-ubuntu
- **Purpose**: Express.js API server
- **Port**: 3001
- **Build**: Multi-stage with production optimization
- **Health**: `/health` endpoint

### frontend  
- **Base**: node:20-ubuntu (build), nginx:1.29 (serve)
- **Purpose**: React SPA
- **Port**: 80 (internal)
- **Build**: Vite production build served by nginx

## Environment Variables

Required variables in `.env.docker.local`:

```bash
# Database
MYSQL_ROOT_PASSWORD=secure_root_password
MYSQL_DATABASE=flicklit  
MYSQL_USER=flicklit
MYSQL_PASSWORD=secure_password

# Application
JWT_SECRET=super_secure_jwt_secret_32_chars_min
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12

# URLs
FRONTEND_URL=http://localhost
VITE_API_URL=http://localhost/api
```

## Data Management

### Database Migrations

```bash
# Generate Prisma client
docker-compose exec backend yarn db:generate

# Push schema changes
docker-compose exec backend yarn db:push

# Run seeds
docker-compose exec backend yarn db:seed
```

### Import OpenLibrary Data

```bash
# Import authors
docker-compose exec backend yarn import:authors

# Import works
docker-compose exec backend yarn import:works
```

### Backups

```bash
# Database backup
docker-compose exec mysql mysqldump -u flicklit -p flicklit > backup.sql

# Restore database
docker-compose exec -i mysql mysql -u flicklit -p flicklit < backup.sql
```

## Development

### Convenience Scripts

The project includes cross-platform scripts for easy Docker management:

**Features:**
- ✅ Automatic prerequisite checking (Docker running, required files)
- ✅ Environment setup with `.env.docker.local` template
- ✅ Container cleanup and image building
- ✅ Service health checks (MySQL, backend API)
- ✅ Colored output with status messages
- ✅ Service URL display
- ✅ Optional log following

**Script Options:**
```bash
# Linux/macOS
./dev-start.sh --help    # Show help
./dev-start.sh --logs    # Follow logs after startup
./dev-stop.sh --volumes  # Stop and remove data volumes
./dev-stop.sh --clean    # Complete cleanup

# Windows
dev-start.bat /help      # Show help
dev-start.bat /logs      # Follow logs after startup
dev-stop.bat /volumes    # Stop and remove data volumes
dev-stop.bat /clean      # Complete cleanup
```

### Hot Reload

Development mode supports hot reload for both frontend and backend:

```bash
# Using convenience scripts (recommended)
./dev-start.sh

# Manual docker-compose
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# The containers will automatically restart on file changes
```

### Debugging

Backend debugging is available on port 9229 in development mode:

```bash
# In your IDE, connect to localhost:9229
```

### Logs

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

## Production Deployment

### SSL/HTTPS

1. Place SSL certificates in `./docker/ssl/`:
   - `cert.pem` - SSL certificate
   - `key.pem` - Private key

2. Update nginx configuration to enable HTTPS

3. Set `FRONTEND_URL=https://yourdomain.com`

### Scaling

```bash
# Scale backend services
docker-compose up -d --scale backend=3

# Use external load balancer for multiple replicas
```

### Health Checks

All services include health checks:
- Backend: `GET /health`
- Frontend: `GET /health` 
- MySQL: `mysqladmin ping`
- Valkey: `valkey-cli ping`

## Troubleshooting

### Common Issues

1. **Permission denied errors**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

2. **Port conflicts**
   ```bash
   # Check what's using ports
   sudo netstat -tulpn | grep :80
   ```

3. **Database connection issues**
   ```bash
   # Check MySQL logs
   docker-compose logs mysql
   
   # Verify database is ready
   docker-compose exec mysql mysql -u flicklit -p -e "SELECT 1"
   ```

4. **Build failures**
   ```bash
   # Clean rebuild
   docker-compose down
   docker system prune -f
   docker-compose build --no-cache
   ```

### Performance Tuning

1. **MySQL**: Adjust `innodb_buffer_pool_size` in init script
2. **nginx**: Tune worker processes and connections
3. **Node.js**: Adjust `NODE_OPTIONS="--max-old-space-size=4096"`

## Security

- All services run as non-root users
- Security headers configured in nginx
- Rate limiting on API endpoints
- Environment variables for secrets
- Regular security updates recommended

## Monitoring

Consider adding:
- Prometheus + Grafana for metrics
- ELK stack for centralized logging  
- Uptime monitoring for health checks