# RemitBikas - Municipal Project Transparency Platform
## Project Documentation

This document serves as the single source of truth for developers, DevOps engineers, and project stakeholders working on the **RemitBikas** platform.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [API Documentation](#3-api-documentation)
4. [System Architecture](#4-system-architecture)
5. [Application Structure](#5-application-structure)
6. [Web Application Details](#6-web-application-details)
7. [Credentials & Configuration](#7-credentials--configuration)
8. [Local Development Setup](#8-local-development-setup)
9. [Docker Setup](#9-docker-setup)
10. [Additional Documentation](#10-additional-documentation)

---

## 1. Project Overview

### Purpose and Objectives
**RemitBikas** is a GovTech/CivicTech platform designed to foster municipal project transparency and encourage citizen participation in local development. By allowing local citizens and the diaspora to track and directly crowdfund infrastructure, education, and healthcare projects, the platform bridges the gap between local governments and the community.

### Key Features and Functionality
- **Project Tracking**: Monitor ongoing, completed, and planned projects with milestones, budgets, and location tracking.
- **Crowdfunding (Invest Portal)**: Allows users to fund specific projects via multiple payment methods (including simulated wallets like eSewa/Khalti).
- **Transparency Dashboard**: Visualizes financial tracking, expense breakdowns, and overall progress.
- **Admin & Municipal Dashboard**: Management interfaces for projects, citizens, investments, and analytics.
- **AI Bot Integration**: An interactive AI widget to answer citizen queries regarding municipal processes or project statuses.
- **Community Hub & Suchana Board**: Public notice board and community interaction forums.

### Business/Domain Context
The platform is tailored toward Nepalese municipalities (using the '₨' currency and specific governance models). It targets the need for civic transparency and leveraging remittance or local private funding for public goods.

---

## 2. Technology Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS (v4) + Framer Motion (for animations)
- **Mapping & Charts**: Leaflet (Maps) & Chart.js
- **State/Routing**: React Router DOM
- **Real-time**: Socket.io-client

### Backend
- **Runtime/Framework**: Node.js + Express
- **Language**: TypeScript
- **Database ORM**: Prisma Client
- **Real-time**: Socket.io
- **File Uploads**: Multer & Sharp (Image Processing)
- **AI Integration**: `@google/genai`
- **Authentication**: JWT (JSON Web Tokens) & bcryptjs

### Database
- **Primary Database**: PostgreSQL 16

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Reverse Proxy**: Nginx (optional, via docker-compose)

---

## 3. API Documentation

### Internal APIs
The backend exposes a RESTful API under the `/api` prefix:
- `/api/auth`: User registration, login, and current user retrieval (`/me`).
- `/api/projects`: CRUD operations for municipal projects. Supports filtering and pagination.
- `/api/contributions`: Endpoints for making and verifying investments/crowdfunding payments.
- `/api/adminDashboard`: Protected endpoints for fetching aggregated statistics for municipal officers.
- `/api/chat`: AI chat interface integration.

### Authentication
- The platform uses **JWT (JSON Web Tokens)**.
- Tokens are passed in the `Authorization` header as a Bearer token: `Authorization: Bearer <token>`.
- Protected routes use middleware to verify the token and authorize specific roles (e.g., `ADMIN`, `MUNICIPAL_OFFICER`).

### External APIs
- **Google GenAI API**: Used for powering the AI Bot Widget.
- **Map Tiles**: Leaflet uses external OpenStreetMap or Mapbox tile providers.

---

## 4. System Architecture

### High-level Architecture
The application follows a standard Three-Tier Architecture. The React SPA communicates with the Express backend, which manages the business logic and interfaces with PostgreSQL via Prisma.

```mermaid
graph TD;
    Client[React Frontend / Browser] -->|REST & WebSockets| API[Node.js / Express API];
    API -->|Prisma ORM| DB[(PostgreSQL Database)];
    API -->|API Calls| AI[Google GenAI];
    API -->|File System| Storage[Local Uploads / Storage];
```

### Data Flow
1. **User Action**: User visits the Invest Portal and clicks "Fund Project".
2. **Frontend Logic**: React handles the UI flow and captures the payment intent.
3. **API Request**: A `POST` request is sent to `/api/contributions` with the JWT token.
4. **Backend Processing**: Express verifies the token, Prisma records the transaction as `PENDING`.
5. **Real-time Update**: If successful, Socket.io broadcasts the funding progress to connected clients.

---

## 5. Application Structure

```text
remitbikas/
├── backend/                  # Node.js backend
│   ├── prisma/               # Database schema and seed scripts
│   │   └── schema.prisma     # Prisma Data Model
│   ├── src/                  # Backend source code
│   │   ├── config.ts         # Environment configuration
│   │   ├── index.ts          # Express entry point
│   │   ├── middleware/       # Auth and error middlewares
│   │   ├── routes/           # Express API routers (auth, projects, etc.)
│   │   ├── services/         # Business logic & 3rd party integrations
│   │   └── socketInstance.ts # WebSocket setup
│   ├── Dockerfile
│   └── package.json
├── frontend/                 # React frontend
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable UI components & Admin layouts
│   │   ├── lib/              # API clients & utility functions
│   │   ├── pages/            # View components (InvestPortal, Dashboards)
│   │   ├── App.jsx           # Main React Router setup
│   │   └── index.css         # Tailwind entry
│   ├── vite.config.js
│   └── package.json
├── docker-compose.yml        # Production Docker configuration
├── docker-compose.dev.yml    # Local Development Docker configuration
└── nginx.conf                # Nginx reverse proxy configuration
```

---

## 6. Web Application Details

### User Roles and Permissions
Defined in Prisma (`UserRole` enum):
1. **CITIZEN**: Default role. Can view projects, make contributions, and interact in the community.
2. **CONTRACTOR**: Can update project milestones and submit expenses/reports for assigned projects.
3. **MUNICIPAL_OFFICER**: Can create projects, approve milestones, and view transparency analytics.
4. **ADMIN**: Superuser access to system settings, citizen management, and raw data via the Admin Dashboard.

### Workflows
- **Admin Workflow**: Access `/admin/dashboard` -> Manage Projects -> Create New Infrastructure Project.
- **Citizen Workflow**: Access `/invest` -> Select Project -> Checkout via eSewa/Khalti -> View contribution in `/user/dashboard`.

---

## 7. Credentials & Configuration

### Required Environment Variables

**Backend (`backend/.env`)**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/remitbikas"
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRY=7d
CORS_ORIGIN=http://localhost:5173
OPENAI_API_KEY=your_openai_key_here
```

**Frontend (`frontend/.env`)**
```env
VITE_API_URL=/api
VITE_APP_NAME=RemitBikas
```

### Security Considerations
- Never commit `.env` files.
- `JWT_SECRET` must be a strong, randomly generated string in production.
- Database credentials should be managed via Docker secrets or secure CI/CD injection in production.

---

## 8. Local Development Setup

### Prerequisites
- Node.js v18+
- PostgreSQL (or Docker to run it)
- NPM or Yarn

### Installation Steps
1. **Clone the repository.**
2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   cp .env.example .env # Configure your DB and JWT secrets
   ```
3. **Database Initialization:**
   ```bash
   # Ensure PostgreSQL is running
   npm run db:push
   npm run prisma:generate
   npm run prisma:seed # (Optional) To populate mock data
   ```
4. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   ```

### Running Locally
You need two terminal instances:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```
The frontend runs at `http://localhost:5173` and the backend at `http://localhost:5000`.

---

## 9. Docker Setup

The repository includes both development and production docker-compose configurations.

### Build and Run (Production)
```bash
# Build and start all services in detached mode
docker-compose up --build -d

# Check logs
docker-compose logs -f
```

### Docker Architecture
- **postgres**: Runs `postgres:16-alpine`. Uses local volumes for data persistence.
- **backend**: Builds from `backend/Dockerfile`. Connects to `postgres` via bridge network.
- **frontend**: Builds from `frontend/Dockerfile` (typically served via Nginx in prod).

---

## 10. Additional Documentation

### Known Issues & Future Improvements
- **Payment Gateway**: Current contributions use a simulated wallet checkout. True integration with eSewa/Khalti requires merchant API keys and webhook callbacks.
- **Report Generation**: The admin dashboard contains buttons for PDF/CSV reports. Future implementations should utilize Puppeteer or `pdfmake` on the backend to stream reports.
- **Email Notifications**: The NodeMailer setup (`SMTP_*` variables) requires actual SMTP credentials to send transactional emails (e.g., contribution receipts).

### Testing Procedures
- Run linting via `npm run lint` in both frontend and backend directories.
- Ensure Prisma schema validations pass before pushing schema changes (`npx prisma validate`).
