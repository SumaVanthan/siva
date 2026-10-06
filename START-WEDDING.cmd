@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Please install Node.js 22.13 or newer, then reopen this file.
  pause
  exit /b 1
)
node scripts/local-handover.mjs start --open
if errorlevel 1 echo The website could not start. Review the message above.
pause
