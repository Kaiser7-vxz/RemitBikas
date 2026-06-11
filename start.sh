#!/bin/bash

# RemitBikas - Unified Startup Script
# This script starts both frontend and backend together

set -e

PROJECT_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BACKEND_DIR="$PROJECT_ROOT/remitbikas/backend"
FRONTEND_DIR="$PROJECT_ROOT/remitbikas/frontend"

echo "🚀 RemitBikas - Starting Application"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check if PostgreSQL is running
echo -e "${BLUE}Step 1: Checking PostgreSQL...${NC}"
if ! timeout 3 psql -h localhost -U postgres -d remitbikas -c "SELECT 1" >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  PostgreSQL not found at localhost:5432${NC}"
    echo "Please ensure PostgreSQL is running:"
    echo "  Option A (Docker): docker run --name remitbikas-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=remitbikas -p 5432:5432 -d postgres:16-alpine"
    echo "  Option B (Local): brew install postgresql@16 && brew services start postgresql@16"
    echo ""
    echo "Continuing without database... Frontend will still work."
else
    echo -e "${GREEN}✓ PostgreSQL is running${NC}"
fi

echo ""

# Step 2: Install dependencies
echo -e "${BLUE}Step 2: Installing dependencies...${NC}"
npm run install:all
echo -e "${GREEN}✓ Dependencies installed${NC}"

echo ""

# Step 3: Try to initialize database (optional)
echo -e "${BLUE}Step 3: Initializing database (if available)...${NC}"
if timeout 3 psql -h localhost -U postgres -d remitbikas -c "SELECT 1" >/dev/null 2>&1; then
    echo "Migrating database..."
    cd "$BACKEND_DIR"
    npm run prisma:migrate -- --skip-generate || echo "Migration skipped or already done"
    echo "Seeding database..."
    npm run prisma:seed || echo "Seeding skipped"
    cd "$PROJECT_ROOT"
    echo -e "${GREEN}✓ Database initialized${NC}"
else
    echo -e "${YELLOW}⚠️  Skipping database initialization${NC}"
fi

echo ""

# Step 4: Start both servers
echo -e "${BLUE}Step 4: Starting frontend and backend...${NC}"
echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}Frontend: http://localhost:5173${NC}"
echo -e "${GREEN}Backend:  http://localhost:5000${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""

cd "$PROJECT_ROOT"
npm run dev
