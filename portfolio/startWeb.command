#!/bin/bash

# 切换到本文件所在目录
cd "$(dirname "$0")"

# 杀掉占用 8000 端口的进程（如果有）
lsof -ti:8000 | xargs kill -9 2>/dev/null

echo "正在启动 StudyFlow Portfolio..."
echo "浏览器会自动打开，请稍等..."

# 延迟 1 秒后打开浏览器
(sleep 1 && open "http://localhost:8000") &

# 启动本地服务器
python3 -m http.server 8000
