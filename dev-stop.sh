#!/bin/bash

# FlickLit Development Environment Stop Script
# This script stops the Docker Compose development stack

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

echo "🛑 FlickLit Development Environment Stop"
echo "========================================"
echo

print_status "Stopping development services..."
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

if [[ "${1:-}" == "--volumes" || "${1:-}" == "-v" ]]; then
    print_warning "Removing volumes (this will delete database data)..."
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml down --volumes
fi

if [[ "${1:-}" == "--clean" || "${1:-}" == "-c" ]]; then
    print_status "Cleaning up containers, networks, and orphaned resources..."
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml down --volumes --remove-orphans
    docker system prune -f
fi

print_success "Development environment stopped!"

if [[ "${1:-}" != "--volumes" && "${1:-}" != "-v" ]]; then
    echo
    echo "💡 Data volumes are preserved. Use --volumes to remove database data."
    echo "💡 Use --clean to remove all containers, networks, and orphaned resources."
fi