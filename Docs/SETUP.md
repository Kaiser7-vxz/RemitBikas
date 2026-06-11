# RemitBikas - Municipal Project Transparency Platform

A comprehensive full-stack application for tracking, managing, and ensuring transparency in municipal construction projects and government spending through community participation and remittance co-funding.

## 📋 Project Overview

RemitBikas enables:
- **Transparency**: Real-time project tracking and budget monitoring
- **Co-Investment**: Community members can contribute to local projects
- **Accountability**: Track spending, progress, and project outcomes
- **Intelligence**: AI-powered delay predictions and risk analysis
- **Reputation**: Score contractors and projects based on performance

## 🏗️ Architecture

### Backend
- **Framework**: Express.js (TypeScript)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based
- **API**: RESTful with comprehensive error handling

### Frontend
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **Animations**: Framer Motion
- **UI Components**: Custom + Lucide Icons

## 📁 Project Structure

```
remitbikas/
├── backend/                    # Express API Server
│   ├── prisma/                # Database schema & migrations
│   │   ├── schema.prisma      # Prisma schema
│   │   └── seed.ts            # Database seeding script
│   ├── src/
│   │   ├── routes/            # API endpoints
│   │   │   ├── auth.ts        # Authentication
│   │   │   ├── projects.ts    # Project management
│   │   │   ├── contributions.ts # Contributions
│   │   │   ├── dashboard.ts   # Dashboard data
│   │   │   ├── milestones.ts  # Milestones
│   │   │   └── delayPrediction.ts
│   │   ├── middleware/        # Express middleware
│   │   ├── types/             # TypeScript interfaces
│   │   ├── config.ts          # Configuration
│   │   └── index.ts           # Main server file
│   ├── Dockerfile
│   ├── tsconfig.json
│   └── package.json
│
├── frontend/                   # React Application
│   ├── src/
│   │   ├── pages/             # Page components
│   │   ├── components/        # Reusable components
│   │   ├── lib/               # Utilities & API client
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── Dockerfile
│   ├── vite.config.js
│   └── package.json
│
├── docker-compose.yml         # Docker orchestration
└── package.json               # Root scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL 12+ (or use Docker)

### Installation & Setup

#### Option 1: Local Development

1. **Clone & Install Dependencies**
```bash
cd RemitBikas
npm run install:all
```

2. **Setup Environment Variables**
```bash
# Backend .env
cd remitbikas/backend
cp .env.example .env
# Edit .env with your PostgreSQL credentials
```

3. **Setup Database**
```bash
# From remitbikas/backend directory
npm run prisma:migrate    # Run migrations
npm run prisma:seed       # Seed sample data
```

4. **Start Development Servers**
```bash
# From root directory
npm run dev
```

This will start:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173

#### Option 2: Docker (Recommended)

1. **Set Environment Variables**
```bash
cd remitbikas
cat > .env.docker << EOF
DB_USER=remitbikas
DB_PASSWORD=remitbikas123
DB_NAME=remitbikas
DB_PORT=5432
JWT_SECRET=your_secret_key_here
EOF
```

2. **Start All Services**
```bash
npm run docker:up
```

This will start:
- **PostgreSQL**: localhost:5432
- **Backend API**: http://localhost:5000
- **Frontend**: http://localhost:3000

3. **View Logs**
```bash
npm run docker:logs
```

4. **Seed Database** (if not done automatically)
```bash
docker-compose -f remitbikas/docker-compose.yml exec backend npm run db:seed
```

## 🔐 Default Test Accounts

### Admin Account
- Email: `admin@remitbikas.com`
- Password: `admin123`

### Citizen Account
- Email: `citizen@example.com`
- Password: `citizen123`

### Contractor Account
- Email: `contractor@example.com`
- Password: `contractor123`

## 📚 API Endpoints

### Authentication
```
POST   /api/auth/login           # Login user
POST   /api/auth/signup          # Create account
GET    /api/auth/me              # Get current user
PUT    /api/auth/profile         # Update profile
POST   /api/auth/change-password # Change password
```

### Projects
```
GET    /api/projects             # List all projects
GET    /api/projects/:id         # Get project details
POST   /api/projects             # Create project (Admin/Officer)
PUT    /api/projects/:id         # Update project
GET    /api/projects/stats/overview # Get statistics
```

### Contributions
```
POST   /api/contributions        # Create contribution
GET    /api/contributions/user/my-contributions # Get user's contributions
GET    /api/contributions/project/:projectId # Get project contributions
PUT    /api/contributions/:id/status # Update status (Admin)
```

### Dashboard
```
GET    /api/dashboard            # User dashboard data
GET    /api/dashboard/admin/system-overview # System overview (Admin)
```

### Milestones
```
POST   /api/milestones           # Create milestone
GET    /api/milestones/project/:projectId # Get project milestones
PUT    /api/milestones/:id       # Update milestone
```

### Delay Prediction
```
POST   /api/delay-prediction/predict/:projectId # Predict delays
```

## 🗄️ Database Schema

### Core Entities
- **User**: Citizens, contractors, officers, admins
- **Project**: Construction/development projects
- **Contribution**: User contributions to projects
- **Milestone**: Project phases and checkpoints
- **Expense**: Project spending records
- **ProjectReview**: User ratings and feedback
- **DelayAnalysis**: Predictive delay analysis
- **ReputationScore**: Performance scoring
- **Report**: Issue/fraud reporting system

## 🔧 Development Commands

```bash
# Backend only
npm run dev:backend               # Start backend dev server
npm run build:backend             # Build backend
npm run lint                      # Run linter

# Frontend only
npm run dev:frontend              # Start frontend dev server
npm run build:frontend            # Build frontend

# Database
npm run db:migrate               # Run pending migrations
npm run db:seed                  # Seed database
npm run db:studio                # Open Prisma Studio

# Full stack
npm run dev                      # Start both servers
npm run build                    # Build both apps
npm run setup                    # Initial setup (install, migrate, seed)

# Docker
npm run docker:up                # Start Docker containers
npm run docker:down              # Stop Docker containers
npm run docker:logs              # View container logs
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control (RBAC)
- CORS configuration
- Input validation with Joi
- Request rate limiting ready

## 🎨 Frontend Features

- Responsive design (mobile-first)
- Dark mode support ready
- Animation with Framer Motion
- Charts & visualizations
- Real-time notifications
- AI bot widget for assistance

## 📊 Backend Features

- Comprehensive error handling
- Pagination support
- Filtering and search
- Full-text search on projects
- Async/await with error wrapping
- Database migrations with Prisma

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Environment for Production
```bash
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:pass@host:5432/remitbikas
JWT_SECRET=long_random_secret_key
CORS_ORIGIN=https://yourdomain.com
```

### Using Docker
```bash
npm run docker:up
# Services are automatically production-ready
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

### Database Connection Error
```bash
# Verify DATABASE_URL in .env
# Ensure PostgreSQL is running
# Check credentials

# Reset database
npm run db:migrate -- --skip-generate
npm run db:seed
```

### Docker Issues
```bash
# Clean up containers and volumes
docker-compose -f remitbikas/docker-compose.yml down -v
npm run docker:up
```

## 📖 API Documentation

Each endpoint returns a standard response:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* endpoint-specific data */ }
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (dev mode only)"
}
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/name`
2. Make your changes
3. Commit: `git commit -am 'Add feature'`
4. Push: `git push origin feature/name`
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for personal and commercial purposes.

## 📞 Support

For issues, questions, or suggestions, please open an issue in the repository.

---

**Built with ❤️ for Municipal Transparency**
