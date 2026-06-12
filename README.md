# 🇳🇵 RemitBikas_iicquest
> Empowering communities through transparent municipal project tracking and decentralized crowdfunding.

---

## 👥 Team Information
**Team Name:** Team Aims_iicquest

**Team Members:**
- Sashmit Bhandari
- Aparajita Rokaha
- Aayush Karki
- Anajana Basnet

---

## ⚠️ Problem Statement
In many developing municipalities, there is a significant **lack of transparency** regarding public infrastructure and development projects. Citizens often have no visibility into how funds are allocated, causing a breakdown in trust between local governments and the community. 

Furthermore, the **diaspora and emigrant workers** often wish to invest in or donate to their hometown's development (e.g., schools, hospitals, drinking water) but lack a secure, transparent, and direct platform to do so, leading to underutilized remittance potential for civic growth.

---

## 💡 Solution Description
**RemitBikas** is a GovTech/CivicTech platform designed to bridge the gap between local municipalities and citizens (both local and abroad). 

### How it Works
The platform allows municipal officers to publish local development projects with clearly defined budgets, timelines, and milestones. Citizens can then view these projects, track their real-time progress, and directly **crowdfund** them via integrated payment portals (like eSewa or Khalti). 

### Key Features
- **📊 Transparency Dashboard:** Visualizes financial tracking, expense breakdowns, and overall progress of municipal projects.
- **💸 Crowdfunding (Invest Portal):** Allows users to securely fund specific projects via multiple payment methods.
- **🗺️ Interactive Project Mapping:** Geolocation tracking of ongoing projects using interactive maps.
- **🤖 AI Assistant Widget:** An integrated AI bot powered by Google GenAI to answer citizen queries regarding municipal processes, budgets, or project statuses.
- **👨‍⚖️ Admin & Municipal Dashboard:** Comprehensive management interfaces for projects, citizens, investments, and analytics.

### Expected Outcomes
- Rebuilt trust between citizens and local governance.
- Faster development of local infrastructure fueled by diaspora remittances.
- Reduced corruption and mismanagement of funds through public ledger transparency.

---

## 🛠️ Tech Stack

### 💻 Programming Languages
- TypeScript
- JavaScript (ES6+)
- HTML5 / CSS3

### 🎨 Frontend Frameworks/Libraries
- **React 19** (UI Library)
- **Vite** (Build Tool)
- **Tailwind CSS v4** (Styling)
- **Framer Motion** (Animations)
- **Leaflet & React-Leaflet** (Interactive Maps)
- **Chart.js** (Data Visualization)

### ⚙️ Backend Frameworks/Libraries
- **Node.js** (Runtime)
- **Express.js** (Web Framework)
- **Prisma** (ORM)
- **Socket.io** (Real-time updates)
- **JSON Web Tokens (JWT)** (Authentication)

### 🗄️ Database
- **PostgreSQL 16**

### 🔌 APIs Used
- **Google GenAI API** (For the interactive AI assistant)
- **OpenStreetMap / Mapbox** (Map Tiles)

### 🧠 AI/ML Technologies
- **Google Gemini** (Underlying model for the chatbot widget and predictive delay analytics)

### 🚀 DevOps & Deployment Tools
- **Docker** & **Docker Compose**
- **Nginx** (Reverse Proxy)

---

## 🚀 Setup & Installation Guide

### Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org/) (If running natively)
- [Docker](https://www.docker.com/) & Docker Compose (If running via containers)
- Git

### Local Development Setup

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/RemitBikas.git
cd RemitBikas/remitbikas
```

**2. Backend Setup**
```bash
cd backend
npm install

# Copy environment variables and configure them
cp .env.example .env

# Initialize the database and generate Prisma client
npm run db:setup
npm run dev
```

**3. Frontend Setup**
```bash
cd ../frontend
npm install

# Copy environment variables
cp .env.example .env

# Start the Vite development server
npm run dev
```
The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

### 🐳 Docker Setup
To run the entire stack (Database, Backend, Frontend) in isolated containers:

**Building and running containers:**
```bash
# From the root /remitbikas directory
docker-compose up --build -d
```

**Useful Docker commands:**
```bash
# View logs
docker-compose logs -f

# Stop the containers
docker-compose down

# Restart the containers
docker-compose restart
```

---

## 📁 Project Structure

```text
remitbikas/
├── backend/                  # Node.js Express Server
│   ├── prisma/               # Database schema and migration scripts
│   └── src/                  # Backend source code
│       ├── config.ts         # Environment configuration
│       ├── index.ts          # Server entry point
│       ├── middleware/       # Auth and error handling
│       ├── routes/           # API endpoints (auth, projects, dashboard, etc.)
│       ├── services/         # Business logic & AI integrations
│       └── socketInstance.ts # WebSocket initialization
├── frontend/                 # React SPA
│   ├── public/               # Static assets
│   └── src/
│       ├── components/       # Reusable UI components & Layouts
│       ├── lib/              # API clients & utilities
│       ├── pages/            # View components (InvestPortal, Admin Dashboards)
│       └── App.jsx           # Routing configuration
├── docker-compose.yml        # Production Docker configuration
├── docker-compose.dev.yml    # Local Development Docker configuration
└── nginx.conf                # Nginx reverse proxy configuration
```

---

## 🤖 AI Tools Used
During the development of RemitBikas, the following AI tools were leveraged:
- **Google Gemini / Google DeepMind Agent:** Used extensively for architectural design, code generation, debugging complex React state issues, and generating structured documentation.
- **Google GenAI API:** Integrated directly into the application code to power the `AIBotWidget`, providing contextual assistance to citizens navigating the platform.

---

## 🔮 Future Improvements
- **Live Payment Gateway Integration:** Transition from simulated wallets to live merchant APIs (e.g., eSewa, Khalti, Stripe) with webhook callbacks.
- **Automated PDF Reports:** Implement server-side generation of tax receipts and municipal transparency reports using Puppeteer.
- **Email Notifications:** Hook up Nodemailer with an active SMTP server to send transactional emails (e.g., contribution receipts, milestone updates).
- **Blockchain Ledger:** Integrate a public, immutable ledger for absolute verification of fund allocation.

---

## 📄 License
This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.

---

## 🙏 Acknowledgements
- A massive thank you to all mentors and open-source contributors.
- UI inspiration drawn from modern GovTech interfaces.
- Placeholder imagery provided by Unsplash and various external public sources.
