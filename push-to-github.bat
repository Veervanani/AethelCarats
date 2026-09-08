@echo off
setlocal enabledelayedexpansion

echo ========================================================
echo    AethelCarats — Production Build & GitHub Deploy
echo ========================================================
echo.
echo [1/3] Building frontend and backend locally...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Local build failed! Push aborted to protect production.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/3] Staging and committing clean production build...
git add -A
git diff-index --quiet HEAD --
if %ERRORLEVEL% NEQ 0 (
    git commit -m "build: clean optimized production build"
) else (
    echo Working tree clean, no new changes to commit.
)

echo.
echo [3/3] Pushing to GitHub repository...
echo Remote: https://github.com/aethelcarats/AethelCarats.git
git push -u origin main

echo.
echo ========================================================
echo    Successfully deployed to GitHub!
echo    Hostinger will now deploy without hitting limits.
echo ========================================================
pause
