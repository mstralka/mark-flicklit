@echo off
setlocal EnableDelayedExpansion

REM FlickLit Development Environment Startup Script for Windows
REM This script starts the Docker Compose stack in development mode

title FlickLit Development Environment

REM Colors for output (using Windows color codes)
set "RED=[91m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "NC=[0m"

REM Function to print colored output
goto :main

:print_status
echo %BLUE%[INFO]%NC% %~1
goto :eof

:print_success
echo %GREEN%[SUCCESS]%NC% %~1
goto :eof

:print_warning
echo %YELLOW%[WARNING]%NC% %~1
goto :eof

:print_error
echo %RED%[ERROR]%NC% %~1
goto :eof

:check_docker
docker info >nul 2>&1
if !errorlevel! neq 0 (
    call :print_error "Docker is not running. Please start Docker Desktop and try again."
    pause
    exit /b 1
)
goto :eof

:check_files
set "missing_files="
if not exist "docker-compose.yml" (
    set "missing_files=!missing_files! docker-compose.yml"
)
if not exist "docker-compose.dev.yml" (
    set "missing_files=!missing_files! docker-compose.dev.yml"
)
if not exist ".env" (
    set "missing_files=!missing_files! .env"
)

if not "!missing_files!"=="" (
    call :print_error "Missing required files:"
    for %%f in (!missing_files!) do (
        echo   - %%f
    )
    pause
    exit /b 1
)
goto :eof

:setup_environment
if not exist ".env.docker.local" (
    if exist ".env.docker" (
        call :print_warning ".env.docker.local not found. Copying from .env.docker template..."
        copy ".env.docker" ".env.docker.local" >nul
        call :print_warning "Please edit .env.docker.local with your secure passwords before running in production!"
    ) else (
        call :print_warning "No environment template found. Using default .env file."
    )
)
goto :eof

:cleanup
call :print_status "Cleaning up old containers..."
docker compose -f docker-compose.yml -f docker-compose.dev.yml down --remove-orphans >nul 2>&1
goto :eof

:build_images
call :print_status "Building Docker images..."
docker compose -f docker-compose.yml -f docker-compose.dev.yml build --parallel
if !errorlevel! neq 0 (
    call :print_error "Failed to build Docker images"
    pause
    exit /b 1
)
goto :eof

:start_services
call :print_status "Starting development services..."

REM Use .env.docker.local if it exists, otherwise use .env
set "env_file="
if exist ".env.docker.local" (
    set "env_file=--env-file .env.docker.local"
)

docker compose !env_file! -f docker-compose.yml -f docker-compose.dev.yml up -d
if !errorlevel! neq 0 (
    call :print_error "Failed to start services"
    pause
    exit /b 1
)
goto :eof

:wait_for_services
call :print_status "Waiting for services to be ready..."

REM Wait for PostgreSQL
call :print_status "Waiting for PostgreSQL..."
set timeout=30
:wait_postgres
docker compose exec -T postgres pg_isready -U flicklit -d flicklit >nul 2>&1
if !errorlevel! equ 0 goto :postgres_ready
timeout /t 2 /nobreak >nul
set /a timeout-=1
if !timeout! gtr 0 goto :wait_postgres
call :print_error "PostgreSQL failed to start within 60 seconds"
exit /b 1

:postgres_ready
REM Wait for backend (using PowerShell for HTTP request)
call :print_status "Waiting for backend..."
set timeout=30
:wait_backend
powershell -Command "try { Invoke-WebRequest -Uri 'http://localhost:3001/health' -UseBasicParsing -TimeoutSec 5 | Out-Null; exit 0 } catch { exit 1 }" >nul 2>&1
if !errorlevel! equ 0 goto :backend_ready
timeout /t 2 /nobreak >nul
set /a timeout-=1
if !timeout! gtr 0 goto :wait_backend
call :print_error "Backend failed to start within 60 seconds"
exit /b 1

:backend_ready
call :print_success "All services are ready!"
goto :eof

:show_status
echo.
call :print_success "FlickLit Development Environment is running!"
echo.
echo 🌐 Application URLs:
echo    Frontend (via proxy): http://localhost:8080
echo    Frontend (direct):    http://localhost:5173
echo    Backend API:          http://localhost:3001
echo    Backend Health:       http://localhost:3001/health
echo.
echo 💾 Database:
echo    PostgreSQL:           localhost:5432
echo    Database:             flicklit
echo.
echo 🔧 Development Features:
echo    ✓ Hot reload for frontend and backend
echo    ✓ Node.js debugger on port 9229
echo    ✓ File watching enabled
echo.
echo 📋 Useful Commands:
echo    View logs:            docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f
echo    Stop services:        docker compose -f docker-compose.yml -f docker-compose.dev.yml down
echo    Restart service:      docker compose -f docker-compose.yml -f docker-compose.dev.yml restart ^<service^>
echo    Run migrations:       docker compose exec backend yarn db:push
echo.
goto :eof

:show_help
echo FlickLit Development Environment Startup Script for Windows
echo.
echo Usage: %~nx0 [OPTIONS]
echo.
echo Options:
echo   /logs      Follow logs after startup
echo   /help      Show this help message
echo.
echo This script will:
echo   1. Check Docker is running
echo   2. Verify required files exist
echo   3. Clean up old containers
echo   4. Build Docker images
echo   5. Start development services
echo   6. Wait for services to be ready
echo   7. Display service URLs and status
pause
goto :eof

:main
REM Enable ANSI colors in Windows 10+
reg add HKCU\Console /v VirtualTerminalLevel /t REG_DWORD /d 1 /f >nul 2>&1

echo 🚀 FlickLit Development Environment Startup
echo ===========================================
echo.

REM Parse command line arguments
if "%1"=="/help" goto :show_help
if "%1"=="--help" goto :show_help
if "%1"=="/?" goto :show_help

REM Check prerequisites
call :print_status "Checking prerequisites..."
call :check_docker
call :check_files

REM Setup environment
call :setup_environment

REM Clean up any existing containers
call :cleanup

REM Build images
call :build_images

REM Start services
call :start_services

REM Wait for services to be ready
call :wait_for_services
if !errorlevel! neq 0 (
    call :print_error "Failed to start services. Check the logs:"
    echo   docker compose -f docker-compose.yml -f docker-compose.dev.yml logs
    pause
    exit /b 1
)

call :show_status

REM Follow logs if requested
if "%1"=="/logs" (
    echo.
    call :print_status "Following logs (Ctrl+C to stop):"
    docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f
) else (
    echo.
    call :print_status "Run with /logs to follow logs automatically"
    echo Press any key to exit (services will continue running)
    pause >nul
)

endlocal