# Docker Setup Guide for RemitBikas

## 📋 Docker Files Included

### Production Dockerfiles
- **backend/Dockerfile** - Multi-stage production build for API server
- **frontend/Dockerfile** - Multi-stage production build for React app

### Development Dockerfiles
- **backend/Dockerfile.dev** - Development build with hot reload
- **frontend/Dockerfile.dev** - Development build with hot reload

### Optimization Files
- **backend/.dockerignore** - Excludes unnecessary files from build context
- **frontend/.dockerignore** - Excludes unnecessary files from build context

---

## 🚀 Quick Start with Docker

### Option 1: Production with Docker Compose (Recommended)

```bash
cd /home/kaiser/Documents/RemitBikas/remitbikas

# Start all services (PostgreSQL + Backend + Frontend)
docker-compose up -d

# Wait for services to start (30 seconds)
sleep 30

# Seed database with sample data
docker-compose exec backend npm run db:seed

# View logs
docker-compose logs -f
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Database: localhost:5432

### Option 2: Development with Docker Compose

Create `docker-compose.dev.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: remitbikas
      POSTGRES_PASSWORD: remitbikas123
      POSTGRES_DB: remitbikas
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    ports:
      - "5000:5000"
    volumes:
      - ./backend/src:/app/src
      - ./backend/prisma:/app/prisma
    environment:
      DATABASE_URL: postgresql://remitbikas:remitbikas123@postgres:5432/remitbikas
      NODE_ENV: development
    depends_on:
      - postgres

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports:
      - "5173:5173"
    volumes:
      - ./frontend/src:/app/src
    environment:
      REACT_APP_API_URL: http://localhost:5000/api
    depends_on:
      - backend

volumes:
  postgres_data:
```

Run development environment:
```bash
docker-compose -f docker-compose.dev.yml up
```

---

## 🐳 Building Images Manually

### Build Backend

#### Production Build
```bash
cd remitbikas/backend

# Build image
docker build -t remitbikas-backend:latest .

# Run container
docker run -d \
  --name remitbikas-backend \
  -p 5000:5000 \
  -e DATABASE_URL="postgresql://user:pass@db-host:5432/remitbikas" \
  -e JWT_SECRET="your-secret-key" \
  remitbikas-backend:latest

# View logs
docker logs -f remitbikas-backend

# Stop container
docker stop remitbikas-backend
docker rm remitbikas-backend
```

#### Development Build
```bash
cd remitbikas/backend

# Build image
docker build -f Dockerfile.dev -t remitbikas-backend:dev .

# Run with volume mount for hot reload
docker run -it \
  --name remitbikas-backend-dev \
  -p 5000:5000 \
  -v $(pwd)/src:/app/src \
  -e DATABASE_URL="postgresql://user:pass@localhost:5432/remitbikas" \
  remitbikas-backend:dev
```

### Build Frontend

#### Production Build
```bash
cd remitbikas/frontend

# Build image
docker build -t remitbikas-frontend:latest .

# Run container
docker run -d \
  --name remitbikas-frontend \
  -p 3000:3000 \
  -e REACT_APP_API_URL="http://localhost:5000/api" \
  remitbikas-frontend:latest

# View logs
docker logs -f remitbikas-frontend
```

#### Development Build
```bash
cd remitbikas/frontend

# Build image
docker build -f Dockerfile.dev -t remitbikas-frontend:dev .

# Run with volume mount for hot reload
docker run -it \
  --name remitbikas-frontend-dev \
  -p 5173:5173 \
  -v $(pwd)/src:/app/src \
  remitbikas-frontend:dev
```

---

## 📦 Docker Compose Commands

```bash
# Start services in background
docker-compose up -d

# Start services in foreground
docker-compose up

# View logs
docker-compose logs -f

# View logs of specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Execute command in running container
docker-compose exec backend npm run db:seed
docker-compose exec postgres psql -U remitbikas -d remitbikas

# Stop services
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop and remove everything including volumes
docker-compose down -v

# Rebuild images
docker-compose build

# Rebuild specific service
docker-compose build backend
```

---

## 🔍 Docker Image Features

### Backend Image (Production)

**Benefits:**
- ✅ Multi-stage build (reduces final image size)
- ✅ Non-root user (security)
- ✅ Health checks (automatic monitoring)
- ✅ Dumb-init (proper signal handling)
- ✅ Alpine Linux (small image size ~150MB)
- ✅ Optimized caching layers
- ✅ Production-grade configuration

**Image Size:** ~150MB (production), ~400MB (with dev dependencies)

**Security:**
- Runs as non-root nodejs user
- No unnecessary packages
- Health checks enabled

### Frontend Image (Production)

**Benefits:**
- ✅ Multi-stage build
- ✅ Serves static files efficiently
- ✅ Non-root user (security)
- ✅ Health checks
- ✅ Alpine Linux
- ✅ Optimized for production

**Image Size:** ~100MB

**Serving:**
- Uses `serve` package for production-grade HTTP server
- Supports SPA routing
- Gzip compression

---

## 🔧 Environment Variables

### Backend Environment Variables

```env
# Required
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Server
NODE_ENV=production
PORT=5000

# JWT
JWT_SECRET=your-very-secure-secret-key-at-least-32-characters

# CORS
CORS_ORIGIN=http://localhost:3000,https://yourdomain.com

# Upload
UPLOAD_DIR=/app/uploads
MAX_FILE_SIZE=10485760

# Optional - AI Service
OPENAI_API_KEY=sk-...
```

### Frontend Environment Variables

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_UPLOAD_URL=http://localhost:5000/uploads
```

---

## 🚨 Troubleshooting

### Image Build Fails

```bash
# Clean build without cache
docker-compose build --no-cache

# Check Docker logs
docker-compose logs
```

### Container Exits Immediately

```bash
# Check logs
docker-compose logs backend

# Run in foreground to see errors
docker-compose up backend

# Common issues:
# - DATABASE_URL not set
# - Port already in use
# - Insufficient disk space
```

### Database Connection Failed

```bash
# Ensure postgres is running
docker-compose logs postgres

# Check database URL format
# Should be: postgresql://user:password@service-name:5432/dbname

# For docker-compose, use service name as hostname:
# postgresql://remitbikas:remitbikas123@postgres:5432/remitbikas
```

### Port Already in Use

```bash
# Find process using port
lsof -i :5000    # Backend
lsof -i :5173    # Frontend dev
lsof -i :3000    # Frontend prod
lsof -i :5432    # Database

# Kill process
kill -9 <PID>

# Or use different port
docker run -p 5001:5000 remitbikas-backend:latest
```

### Health Check Failing

```bash
# Check if service is actually running
docker-compose exec backend curl http://localhost:5000/health

# Check logs
docker-compose logs backend

# Wait longer for startup
# Health check has 40s start-period
```

---

## 📊 Production Deployment

### Using Docker Registry

#### Push to Docker Hub

```bash
# Login to Docker Hub
docker login

# Tag images
docker tag remitbikas-backend:latest yourusername/remitbikas-backend:latest
docker tag remitbikas-frontend:latest yourusername/remitbikas-frontend:latest

# Push images
docker push yourusername/remitbikas-backend:latest
docker push yourusername/remitbikas-frontend:latest
```

#### Using Private Registry

```bash
# Tag for private registry
docker tag remitbikas-backend:latest registry.example.com/remitbikas-backend:latest

# Push to registry
docker push registry.example.com/remitbikas-backend:latest
```

### Docker Production Best Practices

1. **Use Specific Tags**
   ```bash
   docker tag remitbikas-backend:latest remitbikas-backend:v1.0.0
   ```

2. **Keep Images Minimal**
   - Use Alpine Linux
   - Remove unnecessary dependencies
   - Use multi-stage builds

3. **Security**
   - Don't run as root
   - Scan images for vulnerabilities
   - Use secrets management

4. **Monitoring**
   - Enable health checks
   - Monitor resource usage
   - Setup logging

5. **Scaling**
   - Use orchestration (Kubernetes)
   - Load balancing
   - Container networking

---

## 🐳 Docker Networking

### Service Communication in Docker Compose

Services can communicate using service names as hostnames:

```javascript
// Backend configuration
const DATABASE_URL = process.env.DATABASE_URL 
  // For docker-compose: postgresql://user:pass@postgres:5432/dbname
  // For local: postgresql://user:pass@localhost:5432/dbname
```

```javascript
// Frontend configuration
const API_URL = process.env.REACT_APP_API_URL
  // For docker-compose: http://backend:5000/api
  // For localhost: http://localhost:5000/api
```

---

## 📈 Performance Optimization

### Image Size Optimization

```dockerfile
# Bad - large image
FROM node:20
RUN apt-get update && apt-get install ...

# Good - minimal image
FROM node:20-alpine
RUN apk add --no-cache ...
```

### Build Speed Optimization

```dockerfile
# Order matters - put expensive operations last
COPY package.json ./      # Small, cached often
RUN npm ci                # Medium, cached if package.json unchanged
COPY . .                  # Large, changes frequently
```

### Runtime Optimization

- Use health checks to auto-restart failing containers
- Set memory limits
- Set CPU limits
- Use restart policies

---

## 🧪 Testing Docker Setup

```bash
# Test backend connectivity
docker-compose exec backend curl http://localhost:5000/health

# Test database
docker-compose exec postgres psql -U remitbikas -c "SELECT 1"

# Test frontend
docker-compose exec frontend curl http://localhost:3000

# Check running containers
docker-compose ps

# Check resource usage
docker stats
```

---

## 📚 Docker Commands Quick Reference

```bash
# Build
docker build -t name:tag .
docker build -f Dockerfile.dev -t name:dev .

# Run
docker run -d -p 5000:5000 name:tag
docker run -it -v $(pwd):/app name:dev

# Compose
docker-compose up -d
docker-compose down
docker-compose logs -f
docker-compose exec service command

# Image management
docker images
docker rmi image-id
docker tag source:tag target:tag

# Container management
docker ps
docker ps -a
docker stop container-id
docker rm container-id
docker logs container-id

# Debugging
docker inspect container-id
docker exec -it container-id /bin/sh
docker stats
```

---

## 🎯 Next Steps

1. **Build and test locally:**
   ```bash
   docker-compose up -d
   docker-compose exec backend npm run db:seed
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

3. **Monitor and debug:**
   ```bash
   docker-compose logs -f
   ```

4. **Deploy to production:**
   - Push images to registry
   - Update production docker-compose.yml
   - Deploy with orchestration tools

---

**Your Docker setup is production-ready! 🎉**
