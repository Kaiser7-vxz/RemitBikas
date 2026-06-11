# Docker Troubleshooting & Optimization Guide

## 🔍 Common Docker Issues & Solutions

### Issue 1: Database Connection Refused

**Error Message:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
Error: getaddrinfo ENOTFOUND postgres
```

**Causes:**
- PostgreSQL service not running
- Wrong DATABASE_URL format
- Incorrect hostname in connection string
- Network connectivity issue

**Solutions:**

```bash
# Check if postgres service is running
docker-compose ps

# View postgres logs
docker-compose logs postgres

# Wait for database to be ready
docker-compose logs postgres | grep "ready to accept connections"

# For local connection, use: postgresql://user:pass@localhost:5432/db
# For docker-compose, use: postgresql://user:pass@postgres:5432/db
# Update your .env file accordingly
```

**Fix:**
```env
# Wrong (for Docker Compose)
DATABASE_URL="postgresql://user:pass@localhost:5432/remitbikas"

# Correct (for Docker Compose)
DATABASE_URL="postgresql://user:pass@postgres:5432/remitbikas"
```

---

### Issue 2: Port Already in Use

**Error Message:**
```
bind: address already in use
Error: listen EADDRINUSE: address already in use :::5000
```

**Causes:**
- Service already running on that port
- Previous container not properly stopped
- Multiple services trying to use same port

**Solutions:**

```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or stop the container
docker-compose down

# Or use different port (change in docker-compose.yml)
# Change "5000:5000" to "5001:5000"
```

---

### Issue 3: Docker Build Fails

**Error Message:**
```
failed to solve with frontend dockerfile.v0
COPY failed: file not found
RUN npm ci: exit code 1
```

**Causes:**
- Missing files referenced in Dockerfile
- Incorrect working directory
- Corrupted node_modules
- Insufficient disk space

**Solutions:**

```bash
# Clean build without cache
docker-compose build --no-cache

# Check Docker disk usage
docker system df

# Clean up unused images/containers
docker system prune -a

# Check available disk space
df -h

# Build with verbose output
docker build --progress=plain -t name:tag .
```

---

### Issue 4: Container Exits Immediately

**Error Message:**
```
Container exited with code 0/1
docker: Error response from daemon
```

**Causes:**
- Environment variables not set
- Service failed to start
- Database not ready
- Port conflicts
- Memory issues

**Solutions:**

```bash
# Check logs for error
docker-compose logs backend

# Run in foreground to see errors
docker-compose up backend

# Check if environment variables are set
docker-compose exec backend env

# Check container status
docker-compose ps

# Inspect container
docker inspect <container-id>
```

---

### Issue 5: Health Check Failing

**Error Message:**
```
Health check failed: exit code 1
Container marked unhealthy
```

**Causes:**
- Service not started yet
- Wrong health check configuration
- Service listening on wrong port
- Network issues

**Solutions:**

```bash
# Wait longer for startup
# Edit docker-compose.yml:
# start_period: 60s (increase from 30s)

# Test health check manually
docker-compose exec backend curl http://localhost:5000/health

# Check health status
docker inspect remitbikas_backend | grep Health

# View detailed logs
docker-compose logs backend --tail=50
```

---

### Issue 6: Database Migrations Not Running

**Error Message:**
```
Error: schema not created
Error: relation does not exist
Prisma Client not found
```

**Causes:**
- Migrations not applied
- Database not initialized
- Prisma client not generated

**Solutions:**

```bash
# Generate Prisma client
docker-compose exec backend npx prisma generate

# Run migrations
docker-compose exec backend npm run db:migrate

# Seed database
docker-compose exec backend npm run db:seed

# Check migration status
docker-compose exec backend npx prisma migrate status
```

---

### Issue 7: Volumes Not Working

**Error Message:**
```
Volume mount failed
Permission denied
File not found in container
```

**Causes:**
- Incorrect volume path
- Permission issues
- Path doesn't exist on host
- Wrong volume definition

**Solutions:**

```bash
# Check volume mounts
docker inspect remitbikas_backend | grep -A 10 Mounts

# List volumes
docker volume ls

# Inspect volume
docker volume inspect remitbikas_postgres_data

# Fix permissions
chmod -R 777 ./backend/uploads

# Recreate volumes
docker-compose down -v
docker-compose up -d
```

---

### Issue 8: Memory/CPU Issues

**Error Message:**
```
Out of memory
Process killed
Container stopped
```

**Causes:**
- Resource limits too low
- Memory leak in application
- Too many containers running
- Large database queries

**Solutions:**

```bash
# Check resource usage
docker stats

# Increase resource limits in docker-compose.yml:
deploy:
  resources:
    limits:
      memory: 2G    # Increase from 1G
      cpus: '2'     # Increase from 1.5

# Check system resources
free -h
df -h

# Restart service
docker-compose restart backend
```

---

### Issue 9: Network Issues

**Error Message:**
```
Cannot connect to service
Network unreachable
Cannot resolve hostname
```

**Causes:**
- Services on different networks
- DNS resolution issues
- Firewall blocking ports
- Network driver issues

**Solutions:**

```bash
# Check network
docker network ls

# Inspect network
docker network inspect remitbikas_network

# Test connectivity
docker-compose exec backend ping postgres

# Test API connectivity
docker-compose exec backend curl http://backend:5000/health

# Recreate network
docker-compose down
docker network prune
docker-compose up -d
```

---

### Issue 10: CORS/Authentication Errors

**Error Message:**
```
Access to XMLHttpRequest blocked by CORS policy
401 Unauthorized
Invalid token
```

**Causes:**
- CORS_ORIGIN not set correctly
- Wrong authentication header
- Token expired
- API not accessible

**Solutions:**

```bash
# Check CORS_ORIGIN in .env
cat .env | grep CORS_ORIGIN

# Update docker-compose.yml or .env
CORS_ORIGIN=http://localhost:3000,http://localhost:5173

# Restart backend
docker-compose restart backend

# Check API response
curl -i http://localhost:5000/api/projects

# Verify token format
# Should be: Authorization: Bearer <token>
```

---

## ⚡ Performance Optimization

### Image Size Optimization

```bash
# Check image sizes
docker images | grep remitbikas

# Build with specific targets
docker build --target runtime -t remitbikas-backend:slim .

# Use Alpine Linux instead of full node image
# Already in Dockerfiles!
```

**Current sizes:**
- Backend: ~150MB (production), ~400MB (with dev deps)
- Frontend: ~100MB (optimized build)

### Build Speed Optimization

```dockerfile
# Good - cacheable layers
FROM node:20-alpine
COPY package.json ./
RUN npm ci                    # Cached if package.json unchanged
COPY src ./src                # Copy last (changes frequently)
RUN npm run build
```

```bash
# Build caching
docker-compose build --cache-from remitbikas-backend:latest

# Parallel builds
docker-compose build
```

### Runtime Performance

```yaml
# docker-compose.yml
services:
  backend:
    # Use health checks for auto-restart
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

    # Resource limits prevent runaway processes
    deploy:
      resources:
        limits:
          cpus: '1.5'
          memory: 1G
```

### Database Performance

```sql
-- Connection pooling (use PgBouncer in production)
-- Already configured in Prisma datasource

-- Enable indexes
CREATE INDEX idx_project_status ON projects(status);
CREATE INDEX idx_contribution_user ON contributions(user_id);

-- Monitor slow queries
EXPLAIN ANALYZE SELECT * FROM projects WHERE status = 'ONGOING';
```

---

## 🔐 Security Best Practices

### Image Security

```dockerfile
# Use specific base image versions
FROM node:20.10.0-alpine3.18  # Instead of node:20-alpine

# Don't run as root
USER nodejs

# Use read-only filesystem where possible
RUN chmod -R 555 /app/dist
```

### Container Security

```bash
# Run with security options
docker run --security-opt=no-new-privileges \
           --cap-drop=ALL \
           --cap-add=NET_BIND_SERVICE \
           remitbikas-backend:latest

# This is handled in docker-compose by switching to non-root user
```

### Network Security

```yaml
# docker-compose.yml
networks:
  remitbikas_network:
    driver: bridge
    driver_opts:
      # Isolate containers from each other
      com.docker.network.bridge.name: br_remitbikas

services:
  postgres:
    # Only expose internally
    # No ports defined for database in production
```

### Secrets Management

```bash
# Use Docker Secrets (in Swarm mode)
docker secret create db_password -
docker secret create jwt_secret -

# Or use environment files
docker-compose --env-file=.env.prod up

# Never commit .env to Git
echo ".env*" >> .gitignore
```

---

## 📊 Monitoring & Logging

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f postgres
docker-compose logs -f frontend

# Last N lines
docker-compose logs -f --tail=50 backend

# Since timestamp
docker-compose logs -f --since 2026-06-11T10:00:00 backend
```

### Monitor Resources

```bash
# Real-time stats
docker stats

# Historical stats
docker stats --no-stream

# Specific container
docker stats remitbikas_backend
```

### Health Checks

```bash
# Check health status
docker-compose ps

# Or
docker inspect remitbikas_backend | grep -A 5 State

# Manual health check
docker-compose exec backend curl http://localhost:5000/health
docker-compose exec postgres pg_isready
```

---

## 🔄 Backup & Recovery

### Database Backup

```bash
# Backup database
docker-compose exec postgres pg_dump -U remitbikas remitbikas > backup.sql

# Backup to file in mounted volume
docker-compose exec postgres pg_dump -U remitbikas remitbikas > /backups/backup_$(date +%Y%m%d_%H%M%S).sql

# List backups
ls -la ./backups/
```

### Database Restore

```bash
# Restore from backup
docker-compose exec -T postgres psql -U remitbikas remitbikas < backup.sql

# Restore to specific version
docker-compose exec -T postgres psql -U remitbikas -d remitbikas < /backups/backup_20260611_100000.sql
```

### Volume Backup

```bash
# Backup volumes
docker run --rm -v remitbikas_backend_uploads:/data -v $(pwd):/backup \
  alpine tar czf /backup/uploads_backup.tar.gz -C /data .

# Restore volumes
docker run --rm -v remitbikas_backend_uploads:/data -v $(pwd):/backup \
  alpine tar xzf /backup/uploads_backup.tar.gz -C /data
```

---

## 🚀 Scaling & Advanced Setup

### Scaling with Load Balancing

```yaml
# docker-compose.yml with multiple backends
services:
  backend1:
    build: ./backend
    environment:
      NODE_ENV: production
    networks:
      - remitbikas_network

  backend2:
    build: ./backend
    environment:
      NODE_ENV: production
    networks:
      - remitbikas_network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx-lb.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - backend1
      - backend2
```

### Using Docker Swarm

```bash
# Initialize swarm
docker swarm init

# Deploy service
docker service create --name backend \
  --replicas 3 \
  -p 5000:5000 \
  remitbikas-backend:latest

# Scale service
docker service scale backend=5

# View services
docker service ls
docker service ps backend
```

### Using Kubernetes

```yaml
# backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: remitbikas-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: remitbikas-backend:latest
        ports:
        - containerPort: 5000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
```

---

## 📋 Docker Compose Quick Reference

```bash
# Lifecycle
docker-compose up               # Start services
docker-compose up -d            # Start in background
docker-compose down             # Stop services
docker-compose down -v          # Stop and remove volumes
docker-compose restart          # Restart services
docker-compose restart backend  # Restart specific service

# Logs
docker-compose logs             # View all logs
docker-compose logs -f          # Follow logs
docker-compose logs backend     # Specific service
docker-compose logs -f --tail=50 backend  # Last 50 lines

# Building
docker-compose build            # Build all images
docker-compose build --no-cache # Build without cache
docker-compose build backend    # Build specific service

# Executing
docker-compose exec service command
docker-compose exec backend npm run db:seed
docker-compose exec backend npm run db:migrate
docker-compose exec postgres psql -U remitbikas

# Status
docker-compose ps               # List services
docker-compose config           # View configuration
docker-compose images           # List images

# Network
docker-compose network ls
docker-compose network inspect remitbikas_network

# Cleanup
docker-compose stop             # Stop without removing
docker-compose rm               # Remove stopped containers
docker system prune -a          # Remove unused images
```

---

## 🆘 Getting Help

### Debug Mode

```bash
# Verbose output
docker-compose --verbose up

# Build with output
docker build --progress=plain -t name:tag .

# Run with debug shell
docker run -it -u root --entrypoint /bin/sh name:tag
```

### Check Logs

```bash
# Full container logs
docker logs <container-id> 2>&1 | head -100

# Follow logs from start
docker logs -f --since 2026-06-11 <container-id>

# Export logs
docker logs <container-id> > container.log 2>&1
```

### Test Connectivity

```bash
# From container to service
docker-compose exec backend ping postgres
docker-compose exec backend curl http://backend:5000/health
docker-compose exec frontend curl http://backend:5000/api/projects

# From host to container
curl http://localhost:5000/health
curl http://localhost:3000
```

---

## ✅ Checklist Before Production

- [ ] Dockerfiles optimized (multi-stage, Alpine)
- [ ] Environment variables properly set
- [ ] Health checks configured
- [ ] Resource limits set
- [ ] Restart policies defined
- [ ] Volumes for persistent data
- [ ] Network isolation configured
- [ ] Logging configured
- [ ] Security: non-root user
- [ ] Secrets not in images
- [ ] Images scanned for vulnerabilities
- [ ] Load testing completed
- [ ] Backup strategy in place
- [ ] Monitoring set up
- [ ] Documentation updated

---

**Your Docker setup is now production-grade! 🎉**
