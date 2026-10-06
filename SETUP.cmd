@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Please install Node.js 22.13 or newer, then reopen this file.
  pause
  exit /b 1
)
node scripts/local-handover.mjs setup
if errorlevel 1 (
  echo Setup could not finish. Review the message above.
  pause
  exit /b 1
)
echo Ready. Double-click START-WEDDING.cmd to open the website.
pause
