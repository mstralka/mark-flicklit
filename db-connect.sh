#!/bin/bash

# FlickLit Database Connection Script
# Connects to PostgreSQL running in Docker container

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

show_help() {
    echo "FlickLit Database Connection Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  psql, sql, connect    Connect to PostgreSQL with psql"
    echo "  studio               Open Prisma Studio (database GUI)"
    echo "  backup [file]        Backup database to file (default: backup.sql)"
    echo "  restore [file]       Restore database from file"
    echo "  info                 Show database connection info"
    echo "  logs                 Show PostgreSQL container logs"
    echo "  status               Check if database container is running"
    echo "  help                 Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 psql              # Connect with psql"
    echo "  $0 studio            # Open Prisma Studio"
    echo "  $0 backup mydata.sql # Backup to mydata.sql"
    echo "  $0 info              # Show connection details"
}

check_container() {
    if ! docker compose ps postgres | grep -q "Up"; then
        print_error "PostgreSQL container is not running"
        print_status "Start it with: docker compose up -d postgres"
        exit 1
    fi
}

wait_for_db() {
    print_status "Waiting for database to be ready..."
    timeout=30
    while ! docker compose exec -T postgres pg_isready -U flicklit -d flicklit >/dev/null 2>&1; do
        sleep 1
        timeout=$((timeout - 1))
        if [[ $timeout -le 0 ]]; then
            print_error "Database failed to become ready within 30 seconds"
            exit 1
        fi
    done
    print_success "Database is ready"
}

connect_psql() {
    check_container
    wait_for_db
    
    print_status "Connecting to PostgreSQL..."
    print_warning "Note: You're connecting as user 'flicklit' to database 'flicklit'"
    echo ""
    
    # Connect to PostgreSQL in the container
    docker compose exec postgres psql -U flicklit -d flicklit
}

open_studio() {
    check_container
    wait_for_db
    
    print_status "Opening Prisma Studio..."
    print_status "This will open a web interface at http://localhost:5555"
    print_warning "Press Ctrl+C to stop Prisma Studio"
    echo ""
    
    # Run Prisma Studio
    cd src/backend && yarn prisma studio
}

backup_db() {
    local backup_file=${1:-"backup_$(date +%Y%m%d_%H%M%S).sql"}
    
    check_container
    wait_for_db
    
    print_status "Backing up database to: $backup_file"
    
    # Create backup
    docker compose exec -T postgres pg_dump -U flicklit -d flicklit > "$backup_file"
    
    if [[ -f "$backup_file" ]]; then
        print_success "Database backed up to: $backup_file"
        print_status "File size: $(du -h "$backup_file" | cut -f1)"
    else
        print_error "Backup failed"
        exit 1
    fi
}

restore_db() {
    local restore_file="$1"
    
    if [[ -z "$restore_file" ]]; then
        print_error "Please specify a backup file to restore"
        echo "Usage: $0 restore backup.sql"
        exit 1
    fi
    
    if [[ ! -f "$restore_file" ]]; then
        print_error "Backup file not found: $restore_file"
        exit 1
    fi
    
    check_container
    wait_for_db
    
    print_warning "This will replace all data in the database!"
    read -p "Are you sure you want to continue? (y/N): " -n 1 -r
    echo
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_status "Restore cancelled"
        exit 0
    fi
    
    print_status "Restoring database from: $restore_file"
    
    # Restore backup
    docker compose exec -T postgres psql -U flicklit -d flicklit < "$restore_file"
    
    print_success "Database restored from: $restore_file"
}

show_info() {
    check_container
    
    echo ""
    echo "🐘 PostgreSQL Database Information"
    echo "=================================="
    echo ""
    echo "Container:        flicklit_postgres"
    echo "Host:             localhost"
    echo "Port:             5432"
    echo "Database:         flicklit"
    echo "Username:         flicklit"
    echo "Password:         flicklit"
    echo ""
    echo "📊 Connection URLs:"
    echo "Local:            postgresql://flicklit:flicklit@localhost:5432/flicklit"
    echo "Docker Network:   postgresql://flicklit:flicklit@postgres:5432/flicklit"
    echo ""
    echo "🔧 Quick Commands:"
    echo "Connect:          $0 psql"
    echo "GUI Tool:         $0 studio"
    echo "Backup:           $0 backup"
    echo "Container Logs:   $0 logs"
    echo ""
    
    # Show container status
    print_status "Container Status:"
    docker compose ps postgres
    echo ""
    
    # Show database info
    print_status "Database Statistics:"
    docker compose exec -T postgres psql -U flicklit -d flicklit -c "
        SELECT 
            schemaname,
            tablename,
            pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
        FROM pg_tables 
        WHERE schemaname = 'public'
        ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
    " 2>/dev/null || print_warning "Could not retrieve database statistics"
}

show_logs() {
    check_container
    print_status "Showing PostgreSQL container logs (press Ctrl+C to exit):"
    echo ""
    docker compose logs -f postgres
}

check_status() {
    echo ""
    echo "🐘 PostgreSQL Container Status"
    echo "=============================="
    echo ""
    
    if docker compose ps postgres | grep -q "Up"; then
        print_success "PostgreSQL container is running"
        
        if docker compose exec -T postgres pg_isready -U flicklit -d flicklit >/dev/null 2>&1; then
            print_success "Database is accepting connections"
        else
            print_warning "Database is starting up..."
        fi
        
        echo ""
        docker compose ps postgres
    else
        print_error "PostgreSQL container is not running"
        print_status "Start it with: docker compose up -d postgres"
    fi
    echo ""
}

# Main script logic
case "${1:-psql}" in
    "psql"|"sql"|"connect")
        connect_psql
        ;;
    "studio")
        open_studio
        ;;
    "backup")
        backup_db "$2"
        ;;
    "restore")
        restore_db "$2"
        ;;
    "info")
        show_info
        ;;
    "logs")
        show_logs
        ;;
    "status")
        check_status
        ;;
    "help"|"--help"|"-h")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac