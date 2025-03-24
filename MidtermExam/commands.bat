@echo off
echo Blog Application Commands
echo ======================
echo.
echo Choose an option:
echo 1. Start JSON Server API
echo 2. Start Vue Development Server
echo 3. Start Both API and Vue Server
echo 4. Run API Test
echo 5. Check Database JSON Format
echo 6. Kill Process on Port 3000 (if stuck)
echo.
set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" (
  echo Starting JSON Server API...
  start cmd /k "npm run api"
)

if "%choice%"=="2" (
  echo Starting Vue Development Server...
  start cmd /k "npm run serve"
)

if "%choice%"=="3" (
  echo Starting both servers...
  start cmd /k "npm run api"
  timeout /t 2 > nul
  start cmd /k "npm run serve"
)

if "%choice%"=="4" (
  echo Running API test in browser...
  start http://localhost:3000/api-test.html
)

if "%choice%"=="5" (
  echo Checking database JSON format...
  type db.json | npx json
)

if "%choice%"=="6" (
  echo Killing process on port 3000...
  npx kill-port 3000
)

echo.
echo Command executed. Press any key to exit...
pause > nul 