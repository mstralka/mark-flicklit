@echo off
setlocal EnableDelayedExpansion

REM FlickLit Development Environment Stop Script for Windows
REM This script stops the Docker Compose development stack

title FlickLit Development Environment - Stop

REM Colors for output
set "RED=[91m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "NC=[0m"

REM Enable ANSI colors in Windows 10+
reg add HKCU\Console /v VirtualTerminalLevel /t REG_DWORD /d 1 /f >nul 2>&1

REM Functions
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

:main
echo 🛑 FlickLit Development Environment Stop
echo ========================================
echo.

call :print_status "Stopping development services..."
docker compose -f docker compose.yml -f docker compose.dev.yml down

if "%1"=="/volumes" (
    call :print_warning "Removing volumes (this will delete database data)..."
    docker compose -f docker compose.yml -f docker compose.dev.yml down --volumes
)

if "%1"=="/clean" (
    call :print_status "Cleaning up containers, networks, and orphaned resources..."
    docker compose -f docker compose.yml -f docker compose.dev.yml down --volumes --remove-orphans
    docker system prune -f
)

call :print_success "Development environment stopped!"

if not "%1"=="/volumes" (
    echo.
    echo 💡 Data volumes are preserved. Use /volumes to remove database data.
    echo 💡 Use /clean to remove all containers, networks, and orphaned resources.
)

echo.
echo Press any key to exit...
pause >nul

endlocal