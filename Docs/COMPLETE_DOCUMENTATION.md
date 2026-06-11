# RemitBikas - Complete Code Documentation

## 📋 Table of Contents
1. [Frontend Architecture](#frontend-architecture)
2. [Backend Architecture](#backend-architecture)
3. [Database Schema](#database-schema)
4. [API Endpoints](#api-endpoints)
5. [Authentication Flow](#authentication-flow)
6. [Key Features](#key-features)

---

## 🎨 Frontend Architecture

### Technology Stack
- **React 19**: UI framework with latest features
- **Vite**: Lightning-fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Router v7**: Client-side routing
- **Lucide React**: Icon library

### Project Structure

#### Pages (src/pages/)
```
Home.jsx              # Landing page with project showcase & stats
ProjectDetails.jsx    # Project listing with filtering
CoInvestmentPortal.jsx # Investment/contribution interface
TransparencyDashboard.jsx # Data visualization & analytics
SuchanaBoard.jsx      # Complaint/report board
Login.jsx             # Authentication (login/signup)
About.jsx             # About project information
```

#### Components (src/components/)

**Layout Components**:
- `Navbar.jsx` - Navigation bar
- `Footer.jsx` - Footer section

**Feature Components**:
- `AIBotWidget.jsx` - Floating AI assistant chatbot
- `ContributionForm.tsx` - Form for contributing to projects
- `ProjectCard.tsx` - Reusable project card
- `MilestoneTimeline.tsx` - Visual milestone tracker
- `DelayAlert.tsx` - Alert for project delays
- `MapView.tsx` - Geographic project mapping
- `QRDisplay.tsx` - QR code display for projects

**UI Components** (src/components/ui/):
- `Badge.tsx` - Status badges
- `Button.tsx` - Reusable button
- `Card.tsx` - Card container
- `Input.tsx` - Form input
- `Progress.tsx` - Progress bars

#### Utilities (src/lib/)
- `api.ts` - API client configuration
- `constants.ts` - Constants & enums
- `utils.ts` - Helper functions

#### Styling
- `App.css` - App styles
- `index.css` - Global styles
- `globals.css` - Global app styles
- `tailwind.config.ts` - Tailwind configuration

### Key Frontend Features

1. **Home Page**
   - Hero section with call-to-action
   - Statistics cards showing:
     - Total projects
     - Completed projects
     - Total budget
     - Average completion percentage
   - Featured project grid

2. **Project Details Page**
   - Filter by status: All, Ongoing, Completed, Planning, Tender
   - Project cards showing:
     - Project type & status
     - Budget & timeline
     - Completion progress
     - Workers & fund usage

3. **Contribution System**
   - Select project to contribute
   - Choose payment method
   - Add optional description
   - Real-time contribution tracking

4. **Dashboard**
   - User statistics based on role
   - Recent project activity
   - Notifications panel
   - Quick links to key features

5. **AI Assistant**
   - Floating bot widget
   - Chat interface
   - Demo responses (ready for AI integration)

6. **Responsive Design**
   - Mobile-first approach
   - Grid layouts that adapt
   - Touch-friendly interfaces
   - Optimized for all screen sizes

---

## 🔧 Backend Architecture

### Technology Stack
- **Express.js**: Web framework
- **TypeScript**: Type safety
- **Prisma ORM**: Database abstraction
- **PostgreSQL**: Relational database
- **JWT**: Authentication
- **bcryptjs**: Password hashing

### Project Structure

#### src/index.ts (Main Server)
```typescript
- Express app initialization
- CORS middleware setup
- JSON body parser
- Route mounting
- Error handler
- Server startup on port 5000
```

#### src/config.ts (Configuration)
```typescript
export const config = {
  server: {
    port: 5000,
    nodeEnv: 'development',
    apiUrl: 'http://localhost:5000'
  },
  database: {
    url: process.env.DATABASE_URL
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: '7d'
  },
  upload: {
    dir: './uploads',
    maxFileSize: 10MB
  },
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:3000']
  }
}
```

#### src/types/index.ts (TypeScript Interfaces)
```typescript
- AuthRequest: Extends Request with user data
- ApiResponse<T>: Standard API response format
- PaginationParams: Pagination options
- ProjectStats: Project statistics
- ContributorStats: Contributor statistics
- ProjectFilter: Project filtering options
```

#### src/middleware/index.ts (Middleware Functions)
```typescript
authenticateToken()    # JWT verification
authorizeRole()        # Role-based access control
errorHandler()         # Global error handler
asyncHandler()         # Async error wrapper
```

#### src/routes/ (API Endpoints)

**auth.ts** - Authentication Routes
```
POST   /login              # User login
POST   /signup             # User registration
GET    /me                 # Get current user
PUT    /profile            # Update user profile
POST   /change-password    # Change password
```

**projects.ts** - Project Management
```
GET    /                   # List projects (with filters)
GET    /:id                # Get single project
POST   /                   # Create project (Admin/Officer)
PUT    /:id                # Update project
GET    /stats/overview     # Get project statistics
```

**contributions.ts** - Contributions
```
POST   /                   # Create contribution
GET    /user/my-contributions  # User's contributions
GET    /project/:projectId     # Project contributions
PUT    /:id/status         # Update contribution status
```

**dashboard.ts** - Dashboard Data
```
GET    /                   # User dashboard
GET    /admin/system-overview  # System overview
```

**milestones.ts** - Milestone Management
```
POST   /                   # Create milestone
GET    /project/:projectId # Get project milestones
PUT    /:id                # Update milestone
```

**delayPrediction.ts** - Delay Analysis
```
POST   /predict/:projectId # Predict project delays
```

---

## 📊 Database Schema

### Prisma Models

#### User
```
id                String @id
email             String @unique
password          String (hashed)
name              String
role              UserRole (CITIZEN | CONTRACTOR | OFFICER | ADMIN)
phone             String?
avatar            String?
verified          Boolean
active            Boolean
createdAt         DateTime
updatedAt         DateTime

Relations:
- contributions: Contribution[]
- reviews: ProjectReview[]
- reports: Report[]
- notifications: Notification[]
```

#### Project
```
id                String @id
title             String
description       String
type              ProjectType
status            ProjectStatus
totalBudget       Float
spentBudget       Float
location          String
latitude/longitude Float?
startDate         DateTime
expectedEndDate   DateTime
actualEndDate     DateTime?
completionPercentage Int
fundingCollected  Float
fundingTarget     Float?
contractor        String?
contractorContact String?
createdAt         DateTime
updatedAt         DateTime

Relations:
- milestones: Milestone[]
- contributions: Contribution[]
- expenses: Expense[]
- reviews: ProjectReview[]
- attachments: Attachment[]
- reports: Report[]
- delayAnalysis: DelayAnalysis?
- reputationScore: ReputationScore?
```

#### Contribution
```
id                String @id
projectId         String
userId            String
amount            Float
description       String?
paymentMethod     PaymentMethod
transactionId     String?
status            ContributionStatus
createdAt         DateTime
updatedAt         DateTime
```

#### Milestone
```
id                String @id
projectId         String
title             String
description       String?
targetDate        DateTime
completedDate     DateTime?
status            MilestoneStatus
completionPercentage Int
createdAt         DateTime
updatedAt         DateTime
```

#### Expense
```
id                String @id
projectId         String
description       String
amount            Float
category          ExpenseCategory
date              DateTime
voucher           String?
verifiedBy        String?
```

#### ProjectReview
```
id                String @id
projectId         String
userId            String
rating            Int (1-5)
comment           String?
isAnonymous       Boolean
createdAt         DateTime
updatedAt         DateTime
```

#### Enumerations
```
UserRole: CITIZEN, CONTRACTOR, MUNICIPAL_OFFICER, ADMIN
ProjectType: INFRASTRUCTURE, EDUCATION, HEALTHCARE, UTILITIES, 
            ENVIRONMENT, ENERGY, TECHNOLOGY, AGRICULTURE
ProjectStatus: PLANNING, TENDER, ONGOING, COMPLETED, SUSPENDED, CANCELLED
MilestoneStatus: PENDING, IN_PROGRESS, COMPLETED, DELAYED, CANCELLED
PaymentMethod: BANK_TRANSFER, MOBILE_WALLET, CREDIT_CARD, CASH
ContributionStatus: PENDING, COMPLETED, FAILED, CANCELLED, REFUNDED
ExpenseCategory: LABOR, MATERIALS, EQUIPMENT, TRANSPORTATION, 
                ADMINISTRATION, OTHER
```

---

## 🔐 Authentication Flow

### Login Process
```
1. User enters email & password
2. Backend finds user by email
3. Compares password with bcrypt hash
4. If valid, generates JWT token
5. Token contains: user.id, user.email, user.role
6. Token expires in 7 days
7. Frontend stores token in localStorage
8. Token sent in Authorization header for authenticated requests
```

### Protected Routes
```
authenticateToken middleware:
1. Extract token from Authorization header
2. Verify JWT signature using secret
3. Decode and attach user to request
4. Call next() if valid
5. Return 401/403 if invalid/expired

authorizeRole middleware:
1. Check if user.role is in allowed roles
2. Grant access if authorized
3. Return 403 Forbidden if unauthorized
```

---

## 📡 API Endpoints Summary

### Response Format
```json
{
  "success": true,
  "message": "Operation description",
  "data": { /* endpoint-specific data */ }
}

// Error response
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error trace (dev mode only)"
}
```

### Authentication Endpoints
| Method | Endpoint | Auth | Body |
|--------|----------|------|------|
| POST | /auth/login | ❌ | { email, password } |
| POST | /auth/signup | ❌ | { email, password, name, role? } |
| GET | /auth/me | ✅ | - |
| PUT | /auth/profile | ✅ | { name?, phone?, avatar? } |
| POST | /auth/change-password | ✅ | { oldPassword, newPassword } |

### Project Endpoints
| Method | Endpoint | Auth | Params |
|--------|----------|------|--------|
| GET | /projects | ❌ | ?status=&type=&search=&page=1&limit=10 |
| GET | /projects/:id | ❌ | - |
| POST | /projects | ✅ Admin/Officer | { title, description, type, totalBudget, ... } |
| PUT | /projects/:id | ✅ Admin/Officer | { title?, description?, status?, completionPercentage?, ... } |
| GET | /projects/stats/overview | ❌ | - |

### Contribution Endpoints
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | /contributions | ✅ | Create new contribution |
| GET | /contributions/user/my-contributions | ✅ | Get user's contributions |
| GET | /contributions/project/:projectId | ❌ | Get project contributions |
| PUT | /contributions/:id/status | ✅ Admin | Update contribution status |

### Dashboard Endpoints
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | /dashboard | ✅ | User dashboard data |
| GET | /dashboard/admin/system-overview | ✅ Admin | System statistics |

### Milestone Endpoints
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | /milestones | ✅ Admin/Officer | Create milestone |
| GET | /milestones/project/:projectId | ❌ | Get project milestones |
| PUT | /milestones/:id | ✅ Admin/Officer | Update milestone |

---

## 🎯 Key Features Explained

### 1. Project Management
- **Statuses**: PLANNING → TENDER → ONGOING → COMPLETED
- **Tracking**: Real-time completion percentage
- **Budget Monitoring**: Track spent vs. total budget
- **Filtering**: By status, type, search term

### 2. Contribution System
- **Multiple Payment Methods**: Bank transfer, mobile wallet, credit card, cash
- **Status Tracking**: PENDING → COMPLETED/FAILED
- **Project Funding**: Track total contributions per project
- **User Contribution History**: See all user contributions

### 3. Role-Based Access Control
- **Citizen**: Can contribute, review, report issues
- **Contractor**: Can manage assigned projects
- **Municipal Officer**: Can create/update projects
- **Admin**: Full system access

### 4. Milestones & Tracking
- **Phases**: Break projects into milestones
- **Progress**: Track each milestone's completion
- **Dates**: Target date vs. actual completion
- **Alerts**: Notify on milestone delays

### 5. Delay Prediction
- **Algorithm**: Based on current completion rate
- **Risk Assessment**: LOW, MEDIUM, HIGH, CRITICAL
- **Recommendations**: Suggest corrective actions

### 6. Reputation System
- **Scoring**: 0-100 scale
- **Metrics**: Transparency, timeliness, budget accuracy, public trust
- **Updates**: Dynamic scoring based on performance

### 7. Notification System
- **Types**: Project updates, milestone completions, contributions, alerts
- **Real-time**: Instant notifications to users
- **History**: View past notifications

### 8. Transparency Dashboard
- **Visualizations**: Charts and graphs
- **Statistics**: Project stats, funding overview
- **Reports**: Generate transparency reports
- **Public Access**: Most data publicly viewable

---

## 🚀 How to Extend

### Add New API Endpoint
1. Create route in `src/routes/newFeature.ts`
2. Import in `src/index.ts`
3. Mount route: `app.use('/api/newFeature', newFeatureRouter)`

### Add New Database Model
1. Define model in `prisma/schema.prisma`
2. Run migration: `npm run prisma:migrate`
3. Generate Prisma client: `npm run prisma:generate`

### Add New Frontend Page
1. Create component in `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`
3. Add navigation link in `Navbar.jsx`

### Add Authentication to Endpoint
```typescript
router.get('/protected', authenticateToken, asyncHandler(async (req, res) => {
  // Access authenticated user via req.user
}));
```

### Add Role Authorization
```typescript
router.post('/admin-only', 
  authenticateToken,
  authorizeRole('ADMIN'),
  asyncHandler(async (req, res) => {
    // Only admins can access
  })
);
```

---

## 📈 Performance Optimization

- **Database**: Indexes on frequently queried columns
- **API**: Pagination to limit response size
- **Frontend**: Code splitting with Vite
- **Caching**: JWT token-based session management
- **Build**: Minification and optimization

---

## 🔒 Security Measures

- ✅ Password hashing with bcryptjs (10 rounds)
- ✅ JWT authentication with expiry
- ✅ Role-based access control
- ✅ CORS configuration
- ✅ Input validation
- ✅ SQL injection prevention (Prisma)
- ✅ XSS protection (React)
- ✅ HTTPS ready for production

---

**This comprehensive system provides a complete platform for municipal transparency and community co-investment in local projects!**
