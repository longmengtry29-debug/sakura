@echo off
setlocal
echo =======================================================
echo   Pushing CineSphere & Tokyo Sakura 3D to GitHub
echo   Repository: https://github.com/longmengtry29-debug/sakura.git
echo =======================================================
echo.

set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%LOCALAPPDATA%\Programs\GitHubCLI\bin;%PATH%"

cd /d "%~dp0"

echo [1/3] Checking GitHub authentication...
gh auth status >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Please sign in to your GitHub account.
    echo A browser window will open automatically.
    echo Press ENTER to continue with browser login...
    pause >nul
    gh auth login --web -h github.com
)

echo.
echo [2/3] Setting up Git credentials...
gh auth setup-git

echo.
echo [3/3] Pushing to origin main...
git remote set-url origin https://github.com/longmengtry29-debug/sakura.git
git branch -M main
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =======================================================
    echo   SUCCESS! Your code has been pushed to GitHub!
    echo   View online: https://github.com/longmengtry29-debug/sakura
    echo =======================================================
) else (
    echo.
    echo Push failed. Please verify your repository permissions.
)

echo.
echo Press any key to close this window...
pause >nul
