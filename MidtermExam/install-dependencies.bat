@echo off
echo Installing all required dependencies for the blog application...
echo ==========================================================
echo.

echo Installing json-server globally...
call npm install -g json-server

echo.
echo Installing kill-port utility...
call npm install -g kill-port

echo.
echo Installing project dependencies...
call npm install

echo.
echo Installing additional development dependencies...
call npm install --save-dev json

echo.
echo All dependencies installed successfully!
echo.
echo Next steps:
echo 1. Run 'npm run commands' to see available commands
echo 2. Or run 'npm run api' to start the API server
echo 3. Then run 'npm run serve' to start the Vue application
echo.
pause 