#!/bin/bash

# Start RemitBikas Backend Only
# This runs the Express.js API server on port 5000

cd "$(dirname "$0")/remitbikas/backend"

echo "🚀 Starting RemitBikas Backend..."
echo "================================"
echo ""
echo "Backend API: http://localhost:5000"
echo "Health Check: http://localhost:5000/health"
echo ""
echo "Press Ctrl+C to stop"
echo ""

npm run dev
