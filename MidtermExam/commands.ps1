Write-Host "Blog Application Commands" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Choose an option:"
Write-Host "1. Start JSON Server API"
Write-Host "2. Start Vue Development Server"
Write-Host "3. Start Both API and Vue Server"
Write-Host "4. Run API Test in Browser"
Write-Host "5. Check Database JSON Format"
Write-Host "6. Kill Process on Port 3000 (if stuck)"
Write-Host "7. View Database in Browser"
Write-Host ""

$choice = Read-Host "Enter your choice (1-7)"

switch ($choice) {
    "1" {
        Write-Host "Starting JSON Server API..." -ForegroundColor Green
        Start-Process powershell -ArgumentList "-Command npm run api"
    }
    "2" {
        Write-Host "Starting Vue Development Server..." -ForegroundColor Green
        Start-Process powershell -ArgumentList "-Command npm run serve"
    }
    "3" {
        Write-Host "Starting both servers..." -ForegroundColor Green
        Start-Process powershell -ArgumentList "-Command npm run api"
        Start-Sleep -Seconds 2
        Start-Process powershell -ArgumentList "-Command npm run serve"
    }
    "4" {
        Write-Host "Running API test in browser..." -ForegroundColor Green
        Start-Process "http://localhost:3000/api-test.html"
    }
    "5" {
        Write-Host "Checking database JSON format..." -ForegroundColor Green
        Get-Content db.json | npx json
    }
    "6" {
        Write-Host "Killing process on port 3000..." -ForegroundColor Green
        npx kill-port 3000
    }
    "7" {
        Write-Host "Opening JSON Server in browser..." -ForegroundColor Green
        Start-Process "http://localhost:3000"
    }
    default {
        Write-Host "Invalid choice!" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Command executed. Press any key to exit..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 