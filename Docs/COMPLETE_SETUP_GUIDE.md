# 🎯 Complete Setup Guide - RemitBikas

## ✅ What's Been Completed

All code is now fixed and dependencies are installed:
- ✅ Fixed `express-cors` → `cors` package
- ✅ Updated all npm package versions
- ✅ Fixed Prisma schema (removed fulltext index)
- ✅ Created `.env` configuration
- ✅ Installed all dependencies

## 📋 Next: Start PostgreSQL Database

You need to have PostgreSQL running before proceeding. Choose one method:

---

## Method 1: Docker (Easiest) 🐳

```bash
# Start PostgreSQL container
docker run --name remitbikas-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=remitbikas \
  -p 5432:5432 \
  -d postgres:16-alpine

# Wait for it to start
sleep 10

# Check if running
docker ps | grep remitbikas-db
```

---

## Method 2: Docker Compose (Recommended for Team) 🐳

```bash
# Navigate to project
cd /home/kaiser/Documents/RemitBikas/remitbikas

# Start services
docker-compose -f docker-compose.dev.yml up -d

# Wait for database
sleep 15

# Check status
docker-compose ps
```

---

## Method 3: Local PostgreSQL (macOS/Linux)

### macOS with Homebrew
```bash
# Install PostgreSQL
brew install postgresql@16

# Start service
brew services start postgresql@16

# Create database and user
createdb remitbikas
createuser postgres -s
```

### Linux (Ubuntu/Debian)
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql

# Create database
sudo -u postgres createdb remitbikas
```

### Windows
Download and install from: https://www.postgresql.org/download/windows/

---

## ▶️ Run Setup After Database is Running

Once PostgreSQL is running and accessible:

```bash
# Terminal 1: Setup database
cd /home/kaiser/Documents/RemitBikas
npm run setup

# You should see:
# ✅ Prisma schema created
# ✅ Database migrated
# ✅ Sample data seeded
```

---

## ▶️ Start Development Servers

```bash
# Terminal 2: Start both servers
npm run dev

# You should see:
# Backend: Server running on http://localhost:5000
# Frontend: Server running on http://localhost:5173
```

---

## 🌐 Access Application

### Frontend
- URL: http://localhost:5173
- Login with test account

### Backend
- API: http://localhost:5000/api
- Health check: http://localhost:5000/health

### Test Credentials
```
Email: admin@remitbikas.com
Password: password123
```

---

## 🔧 Troubleshooting

### "Can't reach database server"
✅ Solution: Start PostgreSQL using one of the methods above

### "Port 5432 already in use"
✅ Solution: Change port in `.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/remitbikas"
```
Then update docker command:
```bash
docker run ... -p 5433:5432 ... postgres:16-alpine
```

### "Eaddrinuse: port 5000/5173 in use"
✅ Solution: Kill existing process or use different ports:
```bash
# Find process
lsof -i :5000

# Kill it
kill -9 <PID>
```

### "Database doesn't exist"
✅ Solution: Make sure you created the database:
```bash
createdb remitbikas
```

### "EACCES: permission denied"
✅ Solution: Fix upload directory permissions:
```bash
mkdir -p remitbikas/backend/uploads
chmod 755 remitbikas/backend/uploads
```

---

## 📊 Verify Installation

After setup completes, verify everything:

```bash
# Check database
npm run db:studio

# Check Prisma client
cd remitbikas/backend && npm list @prisma/client

# Test API
curl http://localhost:5000/health

# Check logs
npm run dev
```

---

## 🚀 Quick Start Commands

```bash
# One-time setup (requires database running)
npm run setup

# Start development
npm run dev

# Backend only
npm run dev:backend

# Frontend only
npm run dev:frontend

# Database
npm run db:seed              # Re-seed database
npm run db:studio            # Open Prisma Studio
npm run db:migrate           # Run migrations

# Docker
npm run docker:up            # Start Docker Compose
npm run docker:down          # Stop Docker Compose
npm run docker:logs          # View logs
```

---

## 📝 Environment File Details

The `.env` file in `remitbikas/backend/`:

```env
# Database - MUST match your PostgreSQL setup
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/remitbikas"

# Server
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000

# JWT - Change to random string in production
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRY=7d

# Upload directory
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760

# CORS - Allow frontend access
CORS_ORIGIN=http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173,http://127.0.0.1:3000
```

---

## ✨ Complete Setup Flow

```
1. Install Dependencies
   ✅ npm run install:all

2. Start Database (PostgreSQL)
   Choose Method 1, 2, or 3 above

3. Initialize Database
   → npm run setup
   This runs:
   - npm run prisma:migrate (creates schema)
   - npm run prisma:seed (adds sample data)

4. Start Development
   → npm run dev
   This starts:
   - Frontend at http://localhost:5173
   - Backend at http://localhost:5000

5. Login
   Email: admin@remitbikas.com
   Password: password123

6. Develop
   Make changes, servers auto-reload
```

---

## 🎓 Documentation

- [QUICKSTART.md](./QUICKSTART.md) - 5-minute guide
- [SETUP.md](./SETUP.md) - Detailed setup
- [DOCKER_COMPLETE.md](./DOCKER_COMPLETE.md) - Docker setup
- [PROJECT_README.md](./PROJECT_README.md) - Project overview
- [SETUP_STATUS.md](./SETUP_STATUS.md) - Fixes applied

---

## 💡 Pro Tips

1. **Use Docker Compose** - Best for team environment:
   ```bash
   cd remitbikas
   docker-compose -f docker-compose.dev.yml up -d
   npm run setup
   npm run dev
   ```

2. **Keep containers running** - Don't stop PostgreSQL between sessions:
   ```bash
   docker ps  # Check it's running
   ```

3. **Seed test data** - Database has test users:
   ```bash
   admin@remitbikas.com / password123
   citizen@example.com / password123
   contractor@example.com / password123
   ```

4. **Reset database** - If schema changes:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

---

## 🆘 Still Having Issues?

1. Verify database is running:
   ```bash
   docker ps  # or check PostgreSQL service status
   ```

2. Check connectivity:
   ```bash
   psql -U postgres -h localhost -d remitbikas
   ```

3. Review logs:
   ```bash
   npm run dev  # Shows all errors
   ```

4. Check ports:
   ```bash
   lsof -i :5432  # Database
   lsof -i :5000  # Backend
   lsof -i :5173  # Frontend
   ```

---

## ✅ You're Ready!

Once PostgreSQL is running:

```bash
npm run setup && npm run dev
```

Then visit: **http://localhost:5173**

---

**Last Updated**: June 11, 2026
**Status**: ✅ All code fixes applied, ready for database startup
