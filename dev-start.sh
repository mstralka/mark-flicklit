#!/bin/bash

# FlickLit Development Environment Startup Script
# This script starts the Docker Compose stack in development mode

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info >/dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker Desktop and try again."
        exit 1
    fi
}

# Function to check if required files exist
check_files() {
    local missing_files=()
    
    if [[ ! -f "docker-compose.yml" ]]; then
        missing_files+=("docker-compose.yml")
    fi
    
    if [[ ! -f "docker-compose.dev.yml" ]]; then
        missing_files+=("docker-compose.dev.yml")
    fi
    
    if [[ ! -f ".env" ]]; then
        missing_files+=(".env")
    fi
    
    if [[ ${#missing_files[@]} -gt 0 ]]; then
        print_error "Missing required files:"
        for file in "${missing_files[@]}"; do
            echo "  - $file"
        done
        exit 1
    fi
}

# Function to setup environment
setup_environment() {
    # Create .env.docker.local if it doesn't exist
    if [[ ! -f ".env.docker.local" ]]; then
        if [[ -f ".env.docker" ]]; then
            print_warning ".env.docker.local not found. Copying from .env.docker template..."
            cp .env.docker .env.docker.local
            print_warning "Please edit .env.docker.local with your secure passwords before running in production!"
        else
            print_warning "No environment template found. Using default .env file."
        fi
    fi
}

# Function to clean up old containers
cleanup() {
    print_status "Cleaning up old containers..."
    docker compose -f docker-compose.yml -f docker-compose.dev.yml down --remove-orphans 2>/dev/null || true
}

# Function to build images
build_images() {
    print_status "Building Docker images..."
    docker compose -f docker-compose.yml -f docker-compose.dev.yml build --parallel
}

# Function to start services
start_services() {
    print_status "Starting development services..."
    
    # Use .env.docker.local if it exists, otherwise use .env
    local env_file=""
    if [[ -f ".env.docker.local" ]]; then
        env_file="--env-file .env.docker.local"
    fi
    
    docker compose $env_file -f docker-compose.yml -f docker-compose.dev.yml up -d
}

# Function to wait for services to be ready
wait_for_services() {
    print_status "Waiting for services to be ready..."
    
    # Wait for PostgreSQL
    print_status "Waiting for PostgreSQL..."
    timeout=60
    while ! docker compose exec -T postgres pg_isready -U flicklit -d flicklit 2>/dev/null; do
        sleep 2
        timeout=$((timeout - 2))
        if [[ $timeout -le 0 ]]; then
            print_error "PostgreSQL failed to start within 60 seconds"
            return 1
        fi
    done
    
    # Wait for backend
    print_status "Waiting for backend..."
    timeout=60
    while ! curl -f http://localhost:3001/health >/dev/null 2>&1; do
        sleep 2
        timeout=$((timeout - 2))
        if [[ $timeout -le 0 ]]; then
            print_error "Backend failed to start within 60 seconds"
            return 1
        fi
    done
    
    print_success "All services are ready!"
}

# Function to show service status
show_status() {
    echo
    print_success "FlickLit Development Environment is running!"
    echo
    echo "🌐 Application URLs:"
    echo "   Frontend (via proxy): http://localhost:8080"
    echo "   Frontend (direct):    http://localhost:5173"
    echo "   Backend API:          http://localhost:3001"
    echo "   Backend Health:       http://localhost:3001/health"
    echo
    echo "💾 Database:"
    echo "   PostgreSQL:           localhost:5432"
    echo "   Database:             flicklit"
    echo
    echo "🔧 Development Features:"
    echo "   ✓ Hot reload for frontend and backend"
    echo "   ✓ Node.js debugger on port 9229"
    echo "   ✓ File watching enabled"
    echo
    echo "📋 Useful Commands:"
    echo "   View logs:            docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f"
    echo "   Stop services:        docker compose -f docker-compose.yml -f docker-compose.dev.yml down"
    echo "   Restart service:      docker compose -f docker-compose.yml -f docker-compose.dev.yml restart <service>"
    echo "   Run migrations:       docker compose exec backend yarn db:push"
    echo
}

# Function to handle script interruption
cleanup_on_exit() {
    echo
    print_warning "Received interrupt signal. To stop all services, run:"
    echo "  docker compose -f docker-compose.yml -f docker-compose.dev.yml down"
    exit 0
}

# Main execution
main() {
    echo "🚀 FlickLit Development Environment Startup"
    echo "==========================================="
    echo
    
    # Set up signal handlers
    trap cleanup_on_exit SIGINT SIGTERM
    
    # Check prerequisites
    print_status "Checking prerequisites..."
    check_docker
    check_files
    
    # Setup environment
    setup_environment
    
    # Clean up any existing containers
    cleanup
    
    # Build images
    build_images
    
    # Start services
    start_services
    
    # Wait for services to be ready
    if wait_for_services; then
        show_status
        
        # Follow logs if requested
        if [[ "${1:-}" == "--logs" || "${1:-}" == "-l" ]]; then
            echo
            print_status "Following logs (Ctrl+C to stop):"
            docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f
        else
            echo
            print_status "Run with --logs or -l to follow logs automatically"
            echo "Press Ctrl+C to exit (services will continue running)"
            
            # Keep script running until interrupted
            while true; do
                sleep 1
            done
        fi
    else
        print_error "Failed to start services. Check the logs:"
        echo "  docker compose -f docker-compose.yml -f docker-compose.dev.yml logs"
        exit 1
    fi
}

# Help function
show_help() {
    echo "FlickLit Development Environment Startup Script"
    echo
    echo "Usage: $0 [OPTIONS]"
    echo
    echo "Options:"
    echo "  -l, --logs     Follow logs after startup"
    echo "  -h, --help     Show this help message"
    echo
    echo "This script will:"
    echo "  1. Check Docker is running"
    echo "  2. Verify required files exist"
    echo "  3. Clean up old containers"
    echo "  4. Build Docker images"
    echo "  5. Start development services"
    echo "  6. Wait for services to be ready"
    echo "  7. Display service URLs and status"
}

# Parse command line arguments
case "${1:-}" in
    -h|--help)
        show_help
        exit 0
        ;;
    *)
        main "$@"
        ;;
esac