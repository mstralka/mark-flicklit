@echo off
setlocal enabledelayedexpansion

REM FlickLit Database Connection Script (Windows)
REM Connects to PostgreSQL running in Docker container

set COMMAND=%~1
if "%COMMAND%"=="" set COMMAND=psql

goto :main

:print_status
echo [94mℹ️  %~1[0m
goto :eof

:print_success
echo [92m✅ %~1[0m
goto :eof

:print_error
echo [91m❌ %~1[0m
goto :eof

:print_warning
echo [93m⚠️  %~1[0m
goto :eof

:show_help
echo FlickLit Database Connection Script (Windows)
echo.
echo Usage: %~nx0 [COMMAND]
echo.
echo Commands:
echo   psql, sql, connect    Connect to PostgreSQL with psql
echo   studio               Open Prisma Studio (database GUI)
echo   backup [file]        Backup database to file (default: backup.sql)
echo   restore [file]       Restore database from file
echo   info                 Show database connection info
echo   logs                 Show PostgreSQL container logs
echo   status               Check if database container is running
echo   help                 Show this help message
echo.
echo Examples:
echo   %~nx0 psql              # Connect with psql
echo   %~nx0 studio            # Open Prisma Studio
echo   %~nx0 backup mydata.sql # Backup to mydata.sql
echo   %~nx0 info              # Show connection details
goto :eof

:check_container
docker compose ps postgres | findstr "Up" >nul 2>&1
if !errorlevel! neq 0 (
    call :print_error "PostgreSQL container is not running"
    call :print_status "Start it with: docker compose up -d postgres"
    exit /b 1
)
goto :eof

:wait_for_db
call :print_status "Waiting for database to be ready..."
set timeout=30
:wait_loop
docker compose exec -T postgres pg_isready -U flicklit -d flicklit >nul 2>&1
if !errorlevel! equ 0 goto :db_ready
timeout /t 1 /nobreak >nul
set /a timeout-=1
if !timeout! gtr 0 goto :wait_loop
call :print_error "Database failed to become ready within 30 seconds"
exit /b 1
:db_ready
call :print_success "Database is ready"
goto :eof

:connect_psql
call :check_container
if !errorlevel! neq 0 exit /b 1
call :wait_for_db
if !errorlevel! neq 0 exit /b 1

call :print_status "Connecting to PostgreSQL..."
call :print_warning "Note: You're connecting as user 'flicklit' to database 'flicklit'"
echo.

docker compose exec postgres psql -U flicklit -d flicklit
goto :eof

:open_studio
call :check_container
if !errorlevel! neq 0 exit /b 1
call :wait_for_db
if !errorlevel! neq 0 exit /b 1

call :print_status "Opening Prisma Studio..."
call :print_status "This will open a web interface at http://localhost:5555"
call :print_warning "Press Ctrl+C to stop Prisma Studio"
echo.

cd src\backend && yarn prisma studio
goto :eof

:backup_db
set backup_file=%~2
if "%backup_file%"=="" (
    for /f "tokens=1-4 delims=/ " %%a in ('date /t') do set backup_date=%%c%%a%%b
    for /f "tokens=1-2 delims=: " %%a in ('time /t') do set backup_time=%%a%%b
    set backup_file=backup_!backup_date!_!backup_time!.sql
)

call :check_container
if !errorlevel! neq 0 exit /b 1
call :wait_for_db
if !errorlevel! neq 0 exit /b 1

call :print_status "Backing up database to: !backup_file!"

docker compose exec -T postgres pg_dump -U flicklit -d flicklit > "!backup_file!"

if exist "!backup_file!" (
    call :print_success "Database backed up to: !backup_file!"
) else (
    call :print_error "Backup failed"
    exit /b 1
)
goto :eof

:restore_db
set restore_file=%~2
if "%restore_file%"=="" (
    call :print_error "Please specify a backup file to restore"
    echo Usage: %~nx0 restore backup.sql
    exit /b 1
)

if not exist "%restore_file%" (
    call :print_error "Backup file not found: %restore_file%"
    exit /b 1
)

call :check_container
if !errorlevel! neq 0 exit /b 1
call :wait_for_db
if !errorlevel! neq 0 exit /b 1

call :print_warning "This will replace all data in the database!"
set /p confirm="Are you sure you want to continue? (y/N): "
if /i not "%confirm%"=="y" (
    call :print_status "Restore cancelled"
    exit /b 0
)

call :print_status "Restoring database from: %restore_file%"

docker compose exec -T postgres psql -U flicklit -d flicklit < "%restore_file%"

call :print_success "Database restored from: %restore_file%"
goto :eof

:show_info
call :check_container
if !errorlevel! neq 0 exit /b 1

echo.
echo 🐘 PostgreSQL Database Information
echo ==================================
echo.
echo Container:        flicklit_postgres
echo Host:             localhost
echo Port:             5432
echo Database:         flicklit
echo Username:         flicklit
echo Password:         flicklit
echo.
echo 📊 Connection URLs:
echo Local:            postgresql://flicklit:flicklit@localhost:5432/flicklit
echo Docker Network:   postgresql://flicklit:flicklit@postgres:5432/flicklit
echo.
echo 🔧 Quick Commands:
echo Connect:          %~nx0 psql
echo GUI Tool:         %~nx0 studio
echo Backup:           %~nx0 backup
echo Container Logs:   %~nx0 logs
echo.

call :print_status "Container Status:"
docker compose ps postgres
echo.
goto :eof

:show_logs
call :check_container
if !errorlevel! neq 0 exit /b 1
call :print_status "Showing PostgreSQL container logs (press Ctrl+C to exit):"
echo.
docker compose logs -f postgres
goto :eof

:check_status
echo.
echo 🐘 PostgreSQL Container Status
echo ==============================
echo.

docker compose ps postgres | findstr "Up" >nul 2>&1
if !errorlevel! equ 0 (
    call :print_success "PostgreSQL container is running"
    
    docker compose exec -T postgres pg_isready -U flicklit -d flicklit >nul 2>&1
    if !errorlevel! equ 0 (
        call :print_success "Database is accepting connections"
    ) else (
        call :print_warning "Database is starting up..."
    )
    
    echo.
    docker compose ps postgres
) else (
    call :print_error "PostgreSQL container is not running"
    call :print_status "Start it with: docker compose up -d postgres"
)
echo.
goto :eof

:main
if "%COMMAND%"=="psql" goto :connect_psql
if "%COMMAND%"=="sql" goto :connect_psql
if "%COMMAND%"=="connect" goto :connect_psql
if "%COMMAND%"=="studio" goto :open_studio
if "%COMMAND%"=="backup" goto :backup_db
if "%COMMAND%"=="restore" goto :restore_db
if "%COMMAND%"=="info" goto :show_info
if "%COMMAND%"=="logs" goto :show_logs
if "%COMMAND%"=="status" goto :check_status
if "%COMMAND%"=="help" goto :show_help
if "%COMMAND%"=="--help" goto :show_help
if "%COMMAND%"=="-h" goto :show_help

call :print_error "Unknown command: %COMMAND%"
echo.
call :show_help
exit /b 1