# 🏗️ RemitBikas - Municipal Project Transparency Platform

A full-stack web application for tracking municipal projects, managing contributions, predicting delays, and ensuring transparency in infrastructure development.

## 📋 Quick Navigation

| Purpose | File | Description |
|---------|------|-------------|
| **Getting Started** | [QUICKSTART.md](./remitbikas/QUICKSTART.md) | 5-minute setup guide |
| **Detailed Setup** | [SETUP.md](./remitbikas/SETUP.md) | Complete installation guide |
| **Docker Setup** | [DOCKER_COMPLETE.md](./DOCKER_COMPLETE.md) | Docker files & commands |
| **Docker Guide** | [DOCKER_SETUP_GUIDE.md](./DOCKER_SETUP_GUIDE.md) | Docker implementation details |
| **Troubleshooting** | [DOCKER_TROUBLESHOOTING.md](./DOCKER_TROUBLESHOOTING.md) | Common issues & solutions |
| **Environment Config** | [ENV_CONFIGURATION.md](./ENV_CONFIGURATION.md) | Environment setup templates |
| **API Integration** | [FRONTEND_API_INTEGRATION.md](./FRONTEND_API_INTEGRATION.md) | Frontend-backend integration |
| **Full Documentation** | [COMPLETE_DOCUMENTATION.md](./COMPLETE_DOCUMENTATION.md) | Complete technical reference |

---

## 🚀 Quick Start

### Option 1: Local Development (Fastest)
```bash
cd remitbikas
npm run install:all      # Install all dependencies
npm run setup            # Setup database & seed data
npm run dev              # Start both servers
```
👉 Access: Frontend http://localhost:5173 | Backend http://localhost:5000

### Option 2: Docker Development (Recommended for Teams)
```bash
cd remitbikas
docker-compose -f docker-compose.dev.yml up
sleep 30
docker-compose -f docker-compose.dev.yml exec backend npm run db:seed
```
👉 Access: Frontend http://localhost:5173 | Backend http://localhost:5000

### Option 3: Docker Production
```bash
cd remitbikas
docker-compose up -d
sleep 30
docker-compose exec backend npm run db:seed
```
👉 Access: Frontend http://localhost:3000 | Backend http://localhost:5000

---

## 📁 Project Structure

```
RemitBikas/
├── remitbikas/
│   ├── backend/                    # Express.js + TypeScript backend
│   │   ├── src/
│   │   │   ├── routes/             # 6 API route files (20+ endpoints)
│   │   │   ├── services/           # Business logic
│   │   │   ├── middleware/         # Auth, error handling
│   │   │   └── types/              # TypeScript definitions
│   │   ├── prisma/
│   │   │   ├── schema.prisma       # Database schema (14 models)
│   │   │   └── seed.ts             # Sample data seeding
│   │   ├── Dockerfile              # Production (multi-stage)
│   │   ├── Dockerfile.dev          # Development (hot reload)
│   │   └── package.json
│   │
│   ├── frontend/                   # React + TypeScript frontend
│   │   ├── src/
│   │   │   ├── app/                # Next.js pages
│   │   │   ├── components/         # React components
│   │   │   ├── lib/                # Utilities & API client
│   │   │   └── types/              # TypeScript definitions
│   │   ├── Dockerfile              # Production (multi-stage)
│   │   ├── Dockerfile.dev          # Development (hot reload)
│   │   └── package.json
│   │
│   ├── docker-compose.yml          # Production (3 services)
│   ├── docker-compose.dev.yml      # Development (3 services)
│   ├── docker-compose.prod.yml     # Production + Nginx (4 services)
│   ├── nginx.conf                  # Nginx reverse proxy config
│   └── .dockerignore
│
├── DOCKER_COMPLETE.md              # Docker files summary
├── DOCKER_SETUP_GUIDE.md           # Docker implementation guide
├── DOCKER_TROUBLESHOOTING.md       # Troubleshooting & optimization
├── ENV_CONFIGURATION.md            # Environment templates
├── QUICKSTART.md                   # 5-minute setup
├── SETUP.md                        # Detailed setup guide
├── FRONTEND_API_INTEGRATION.md     # API integration guide
└── COMPLETE_DOCUMENTATION.md       # Full technical reference
```

---

## 🛠️ Tech Stack

### Backend
- **Node.js 20** - Runtime
- **Express.js 4.18** - Web framework
- **TypeScript 5.3** - Type safety
- **Prisma 5.7** - ORM
- **PostgreSQL 16** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React 18** - UI library
- **TypeScript 5** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Next.js/Routing** - Page routing

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Orchestration
- **Nginx** - Reverse proxy (production)

---

## 🎯 Features

### 📊 Projects Management
- Create and track municipal projects
- View project details with milestones
- Track project budget and spending
- Monitor project completion status
- Filter projects by status, type, location

### 💰 Contributions
- Track citizen contributions
- Multiple payment methods
- Contribution history
- Statistics and analytics
- Donation receipts

### ⏰ Delay Prediction
- Predict project delays based on progress
- Risk assessment
- Historical analysis
- Delay percentage calculation

### 📱 Transparency Dashboard
- Real-time project status
- Budget transparency
- Contribution tracking
- Expense breakdown
- Project timeline visualization

### 👥 Role-Based Access
- Citizens: View projects, contribute
- Contractors: Manage work progress
- Municipal Officers: Create projects
- Admins: Full system access

### 🤖 AI Integration
- Project insights
- Delay predictions
- Cost optimization
- Automated recommendations

---

## 📦 Dependencies

### Backend
```json
{
  "express": "^4.18.2",
  "typescript": "^5.3.3",
  "@prisma/client": "^5.7.1",
  "jsonwebtoken": "^9.1.2",
  "bcryptjs": "^2.4.3",
  "dotenv": "^16.3.1",
  "joi": "^17.11.0"
}
```

### Frontend
```json
{
  "react": "^18.2.0",
  "typescript": "^5.2.2",
  "vite": "^5.0.0",
  "tailwindcss": "^3.3.0",
  "axios": "^1.6.2"
}
```

---

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for stateless authentication:

```bash
# Login endpoint
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

# Response
{
  "token": "eyJhbGc...",
  "user": { "id", "email", "name", "role" }
}

# Use token in subsequent requests
Authorization: Bearer <token>
```

### Test Credentials

| Email | Password | Role |
|-------|----------|------|
| admin@remitbikas.com | password123 | ADMIN |
| citizen@example.com | password123 | CITIZEN |
| contractor@example.com | password123 | CONTRACTOR |

---

## 📚 API Endpoints

### Authentication (5 endpoints)
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/change-password` - Change password

### Projects (5 endpoints)
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get project details
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `GET /api/projects/stats/overview` - Project statistics

### Contributions (4 endpoints)
- `POST /api/contributions` - Create contribution
- `GET /api/contributions/user/my-contributions` - User contributions
- `GET /api/contributions/project/:id` - Project contributions
- `PUT /api/contributions/:id/status` - Update status

### Milestones (3 endpoints)
- `POST /api/milestones` - Create milestone
- `GET /api/milestones/project/:id` - Project milestones
- `PUT /api/milestones/:id` - Update milestone

### Dashboard (2 endpoints)
- `GET /api/dashboard` - User dashboard
- `GET /api/dashboard/admin/system-overview` - Admin dashboard

### Additional (2+ endpoints)
- `POST /api/delay-prediction/predict/:id` - Predict delays
- `/api/contractors` - Contractor management

**Total: 20+ fully documented endpoints**

---

## 🐳 Docker Commands

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Execute commands
docker-compose exec backend npm run db:seed
docker-compose exec backend npm run db:migrate

# Stop services
docker-compose down

# Clean everything
docker-compose down -v
docker system prune -a
```

---

## 📊 Database Schema

14 models with relationships:
- **User** - Application users with roles
- **Project** - Municipal projects
- **Contribution** - Citizen contributions
- **Milestone** - Project milestones
- **Expense** - Project expenses
- **ProjectReview** - Project reviews
- **Attachment** - File attachments
- **Report** - User reports
- **Notification** - System notifications
- **DelayAnalysis** - Delay predictions
- **ReputationScore** - Project ratings
- **QRCode** - QR code tracking

---

## 🚀 Deployment

### Local Server
```bash
cd remitbikas
npm run install:all
npm run setup
npm run dev
```

### Docker Compose (Any Server)
```bash
docker-compose up -d
docker-compose exec backend npm run db:seed
```

### Production with Nginx
```bash
docker-compose -f docker-compose.prod.yml up -d
# Access: https://yourdomain.com
```

### Cloud Deployment (AWS, DigitalOcean)
1. Push images to container registry
2. Deploy using docker-compose
3. Configure SSL certificates
4. Set up domain & DNS

---

## 🔧 Configuration

### Environment Variables
See [ENV_CONFIGURATION.md](./ENV_CONFIGURATION.md) for complete templates

```env
# Backend
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:3000

# Frontend
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📝 Development Workflow

### Local Development
```bash
# Terminal 1 - Backend
cd remitbikas/backend
npm run dev

# Terminal 2 - Frontend
cd remitbikas/frontend
npm run dev
```

### Docker Development
```bash
docker-compose -f docker-compose.dev.yml up
# Code changes auto-reload
```

### Running Tests
```bash
npm run test
npm run test:coverage
npm run lint
npm run typecheck
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
lsof -i :5000
kill -9 <PID>
```

### Database Connection Failed
```bash
docker-compose logs postgres
# Check DATABASE_URL in .env
```

### Build Errors
```bash
docker-compose build --no-cache
docker system prune -a
```

See [DOCKER_TROUBLESHOOTING.md](./DOCKER_TROUBLESHOOTING.md) for more issues

---

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| [QUICKSTART.md](./remitbikas/QUICKSTART.md) | 5-minute quick start |
| [SETUP.md](./remitbikas/SETUP.md) | Detailed setup guide |
| [DOCKER_COMPLETE.md](./DOCKER_COMPLETE.md) | Docker overview |
| [DOCKER_SETUP_GUIDE.md](./DOCKER_SETUP_GUIDE.md) | Docker detailed guide |
| [DOCKER_TROUBLESHOOTING.md](./DOCKER_TROUBLESHOOTING.md) | Issue resolution |
| [ENV_CONFIGURATION.md](./ENV_CONFIGURATION.md) | Environment setup |
| [FRONTEND_API_INTEGRATION.md](./FRONTEND_API_INTEGRATION.md) | API integration |
| [COMPLETE_DOCUMENTATION.md](./COMPLETE_DOCUMENTATION.md) | Full reference |

---

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [Prisma ORM Guide](https://www.prisma.io/docs/)
- [React Documentation](https://react.dev/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [PostgreSQL Manual](https://www.postgresql.org/docs/)

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test locally
4. Create a pull request
5. Ensure tests pass

---

## 📄 License

This project is provided as-is for educational and commercial use.

---

## ✅ Ready to Get Started?

1. **Quick Start**: Follow [QUICKSTART.md](./remitbikas/QUICKSTART.md) (5 minutes)
2. **Docker Setup**: Follow [DOCKER_COMPLETE.md](./DOCKER_COMPLETE.md)
3. **API Testing**: Use Postman or curl to test endpoints
4. **Deployment**: Choose your deployment method

---

## 🆘 Need Help?

- Check [DOCKER_TROUBLESHOOTING.md](./DOCKER_TROUBLESHOOTING.md) for common issues
- Review [ENV_CONFIGURATION.md](./ENV_CONFIGURATION.md) for environment setup
- See [FRONTEND_API_INTEGRATION.md](./FRONTEND_API_INTEGRATION.md) for API usage
- Read [COMPLETE_DOCUMENTATION.md](./COMPLETE_DOCUMENTATION.md) for complete reference

---

**Happy coding! 🚀**

RemitBikas - Making Municipal Projects Transparent Since 2026
