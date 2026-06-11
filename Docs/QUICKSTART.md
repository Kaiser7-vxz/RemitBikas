# RemitBikas - Quick Start Guide

## 🎯 Running the Project in 5 Minutes

### **Step 1: Install Dependencies**
```bash
cd /home/kaiser/Documents/RemitBikas
npm run install:all
```

### **Step 2: Configure Database**

Create `.env` file in `remitbikas/backend/`:
```bash
cd remitbikas/backend
cp .env.example .env
```

Edit `.env` with these values:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/remitbikas"
NODE_ENV=development
PORT=5000
JWT_SECRET=your_secret_key_here
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

### **Step 3: Setup Database** (PostgreSQL must be running)

```bash
# From remitbikas/backend directory
npm run prisma:migrate     # Create database tables
npm run prisma:seed        # Add sample data
```

### **Step 4: Start Both Servers**

```bash
# From root directory (/home/kaiser/Documents/RemitBikas)
npm run dev
```

✅ **You're done!** 
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- API Docs: http://localhost:5000/api

## 🐳 Or Use Docker (Easier!)

```bash
cd /home/kaiser/Documents/RemitBikas/remitbikas

# Start all services with Docker
docker-compose up -d

# Wait for services to start (30 seconds)
sleep 30

# Seed database with sample data
docker-compose exec backend npm run db:seed

# Access:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:5000
# - Database: localhost:5432
```

## 🔐 Test Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@remitbikas.com | admin123 |
| Citizen | citizen@example.com | citizen123 |
| Contractor | contractor@example.com | contractor123 |

## ⚡ Common Commands

```bash
# Development
npm run dev                 # Start both frontend & backend
npm run dev:frontend        # Frontend only
npm run dev:backend         # Backend only

# Database
npm run db:migrate         # Apply migrations
npm run db:seed            # Add sample data
npm run db:studio          # Open Prisma Studio (visualize data)

# Docker
npm run docker:up          # Start containers
npm run docker:down        # Stop containers
npm run docker:logs        # View logs

# Building
npm run build              # Build both apps
npm run build:frontend     # Build frontend only
npm run build:backend      # Build backend only
```

## 📊 Project Features

### Frontend
- ✅ Home page with project showcase
- ✅ Project listing with filters
- ✅ Project details page
- ✅ Contribution form
- ✅ Dashboard
- ✅ AI Bot assistant
- ✅ Responsive design with Tailwind CSS
- ✅ Animations with Framer Motion

### Backend
- ✅ User authentication (signup/login)
- ✅ Role-based access control
- ✅ Project CRUD operations
- ✅ Contribution tracking
- ✅ Milestone management
- ✅ Dashboard data aggregation
- ✅ Delay prediction
- ✅ Reputation scoring system
- ✅ Complete REST API

## 📁 What Was Created

### Backend Files Created:
```
remitbikas/backend/
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript config
├── .env.example              # Environment template
├── .gitignore
├── Dockerfile
├── prisma/
│   ├── schema.prisma         # Database schema (14 models)
│   └── seed.ts               # Sample data
└── src/
    ├── index.ts              # Main server
    ├── config.ts             # Configuration
    ├── types/
    │   └── index.ts          # TypeScript interfaces
    ├── middleware/
    │   └── index.ts          # Auth, error handling
    └── routes/
        ├── auth.ts           # Login, signup, profile
        ├── projects.ts       # Project CRUD & stats
        ├── contributions.ts  # Contribution tracking
        ├── dashboard.ts      # Dashboard data
        ├── milestones.ts     # Milestone management
        └── delayPrediction.ts # Delay analysis
```

### Configuration Files:
```
├── remitbikas/
│   ├── docker-compose.yml    # Multi-container setup
│   ├── backend/
│   │   └── Dockerfile
│   └── frontend/
│       └── Dockerfile
├── package.json              # Root npm scripts
└── SETUP.md                  # Detailed setup guide
```

## 🔄 Database Models

The Prisma schema includes:
- **User** - Accounts with roles (CITIZEN, CONTRACTOR, ADMIN, OFFICER)
- **Project** - Construction/development projects
- **Contribution** - User contributions to projects
- **Milestone** - Project phases and checkpoints
- **Expense** - Project spending records
- **ProjectReview** - User ratings and feedback
- **Attachment** - Files and documents
- **Report** - Issue/fraud reporting
- **Notification** - User notifications
- **DelayAnalysis** - Predictive delay analysis
- **ReputationScore** - Performance metrics
- **QRCode** - Project QR codes

## 🚀 API Endpoints Summary

**Base URL**: http://localhost:5000/api

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | /auth/login | ❌ | Login user |
| POST | /auth/signup | ❌ | Register user |
| GET | /projects | ❌ | List projects |
| GET | /projects/:id | ❌ | Project details |
| POST | /contributions | ✅ | Create contribution |
| GET | /dashboard | ✅ | User dashboard |
| POST | /milestones | ✅ | Create milestone |

✅ = Requires authentication

## ⚙️ Environment Setup

### PostgreSQL Locally
```bash
# macOS
brew install postgresql
brew services start postgresql

# Linux (Ubuntu)
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start

# Windows
# Download from https://www.postgresql.org/download/windows/
```

### Create Database
```bash
psql -U postgres
CREATE DATABASE remitbikas;
CREATE USER remitbikas WITH PASSWORD 'remitbikas123';
GRANT ALL PRIVILEGES ON DATABASE remitbikas TO remitbikas;
```

## 📝 Notes

- All passwords are hashed with bcryptjs before storage
- JWT tokens expire in 7 days by default
- API uses PostgreSQL with Prisma ORM
- CORS configured for localhost development
- Error handling with detailed messages in dev mode

## ❓ Need Help?

1. **Check logs**: `npm run docker:logs` (if using Docker)
2. **Review SETUP.md**: Full setup documentation
3. **Database issues**: Run `npm run db:migrate` again
4. **Port conflicts**: Use different port in .env

---

**Happy coding! 🎉**
