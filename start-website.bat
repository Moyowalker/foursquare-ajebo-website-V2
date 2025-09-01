@echo off
echo ========================================
echo Foursquare Gospel Church Ajebo Website
echo ========================================
echo.
echo Starting church website...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from https://nodejs.org
    echo Download the LTS version and restart your computer.
    echo.
    pause
    exit /b 1
)

echo Node.js is installed ✓
echo.

REM Check if dependencies are installed
if not exist "node_modules" (
    echo Installing dependencies... This may take a few minutes.
    echo.
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
    echo Dependencies installed ✓
    echo.
)

echo Starting the website server...
echo.
echo ========================================
echo  WEBSITE WILL OPEN AT:
echo  http://localhost:3000
echo ========================================
echo.
echo To stop the server, press Ctrl+C
echo.

REM Start the development server
npm run dev

pause
