#!/bin/bash

# Start RemitBikas Frontend Only
# This runs the React/Vite frontend on port 5173

cd "$(dirname "$0")/remitbikas/frontend"

echo "🚀 Starting RemitBikas Frontend..."
echo "================================="
echo ""
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop"
echo ""

npm run dev
