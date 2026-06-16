@echo off
chcp 65001 >nul
cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
  echo 没有检测到 npm。请先安装 Node.js，然后再双击这个文件。
  echo 下载地址: https://nodejs.org/
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo 第一次启动需要安装依赖，请稍等...
  call npm install
  if errorlevel 1 (
    echo 依赖安装失败，请检查网络或 Node.js 环境。
    pause
    exit /b 1
  )
)

echo 正在启动网站...
start "" "http://127.0.0.1:5173/"
call npm run dev -- --host 127.0.0.1

pause
