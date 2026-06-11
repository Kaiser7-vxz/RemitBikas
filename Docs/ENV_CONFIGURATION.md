# Environment Configuration Templates

## 📋 Development Environment (.env.development)

For local development with hot reload:

```env
# ============================================================
# Development Environment Configuration
# ============================================================

# Node Environment
NODE_ENV=development
DEBUG=*

# Server Configuration
PORT=5000
API_URL=http://localhost:5000

# Database (Local PostgreSQL)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/remitbikas"

# JWT Configuration
JWT_SECRET=dev_super_secret_key_change_in_production
JWT_EXPIRY=7d

# CORS Configuration (Allow local development)
CORS_ORIGIN=http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173,http://127.0.0.1:3000

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760

# Email (Optional - for notifications)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your_email@gmail.com
# SMTP_PASS=your_password
# SMTP_FROM=noreply@remitbikas.com

# AI Service (Optional)
# OPENAI_API_KEY=sk-...

# Frontend Configuration
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_UPLOAD_URL=http://localhost:5000/uploads
```

---

## 🐳 Docker Development Environment (.env.docker.dev)

For Docker Compose development:

```env
# ============================================================
# Docker Development Environment Configuration
# ============================================================

# Node Environment
NODE_ENV=development

# Database (Docker Service)
DB_USER=remitbikas
DB_PASSWORD=remitbikas123
DB_NAME=remitbikas
DB_PORT=5432

# Backend (Docker Service)
DATABASE_URL="postgresql://remitbikas:remitbikas123@postgres:5432/remitbikas"
PORT=5000
JWT_SECRET=docker_dev_secret_key_change_in_production
CORS_ORIGIN=http://localhost:5173,http://localhost:3000,http://frontend:5173

# Frontend (Docker Service)
REACT_APP_API_URL=http://localhost:5000/api

# Docker Compose will use service names as hostnames
# For frontend to access backend: http://backend:5000/api
```

---

## 🚀 Docker Production Environment (.env.docker.prod)

For production Docker Compose:

```env
# ============================================================
# Docker Production Environment Configuration
# ============================================================

# Node Environment
NODE_ENV=production

# Database (Docker Service with Performance Tuning)
DB_USER=remitbikas_prod
DB_PASSWORD=your_very_secure_database_password_at_least_32_chars
DB_NAME=remitbikas_production
DB_PORT=5432

# Backend (Docker Service)
DATABASE_URL="postgresql://remitbikas_prod:your_very_secure_database_password_at_least_32_chars@postgres:5432/remitbikas_production"
PORT=5000
JWT_SECRET=your_very_long_secure_jwt_secret_at_least_64_characters_recommended
JWT_EXPIRY=7d
CORS_ORIGIN=https://remitbikas.com,https://www.remitbikas.com

# Upload Configuration
UPLOAD_DIR=/app/uploads
MAX_FILE_SIZE=10485760

# API URLs
API_URL=https://remitbikas.com
UPLOAD_URL=https://remitbikas.com/uploads

# Frontend (Docker Service)
REACT_APP_API_URL=https://remitbikas.com/api
REACT_APP_UPLOAD_URL=https://remitbikas.com/uploads

# Email Configuration (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_business_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=noreply@remitbikas.com

# Optional: AI Service
# OPENAI_API_KEY=sk-your-key-here

# Security
HTTPS=true
```

---

## ☁️ Cloud Production Environment (.env.cloud)

For AWS, DigitalOcean, etc.:

```env
# ============================================================
# Cloud Production Environment Configuration
# ============================================================

NODE_ENV=production

# Database (AWS RDS / DigitalOcean Managed)
DATABASE_URL="postgresql://admin:very_secure_password@db-instance.region.rds.amazonaws.com:5432/remitbikas"

# Server
PORT=5000
API_URL=https://api.remitbikas.com

# Security
JWT_SECRET=very_long_secure_random_string_minimum_64_characters
JWT_EXPIRY=7d

# CORS (Restrict to production domain only)
CORS_ORIGIN=https://remitbikas.com,https://www.remitbikas.com

# S3 / Object Storage for Uploads
UPLOAD_PROVIDER=s3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_BUCKET=remitbikas-uploads
AWS_BUCKET_URL=https://remitbikas-uploads.s3.amazonaws.com

# Email Service (SendGrid, AWS SES, etc.)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.your_sendgrid_key
SMTP_FROM=noreply@remitbikas.com

# CDN (CloudFront, Cloudflare, etc.)
CDN_URL=https://cdn.remitbikas.com

# Analytics
GOOGLE_ANALYTICS_ID=UA-xxx-xxx
SENTRY_DSN=https://xxx@sentry.io/xxx

# API Rate Limiting
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX_REQUESTS=100

# Frontend URLs
REACT_APP_API_URL=https://api.remitbikas.com/api
REACT_APP_UPLOAD_URL=https://remitbikas-uploads.s3.amazonaws.com

# Security & Monitoring
LOG_LEVEL=info
ENABLE_METRICS=true
ENABLE_TRACING=true
```

---

## 🔐 Docker Secrets (.env.secrets)

For sensitive data (use Docker Secrets in production):

```env
# Database credentials
DB_PASSWORD=very_secure_password_minimum_16_characters
POSTGRES_PASSWORD=very_secure_password_minimum_16_characters

# JWT
JWT_SECRET=very_long_random_secure_string_minimum_64_characters

# OAuth / Third-party services
OAUTH_CLIENT_SECRET=secret_key
SENDGRID_API_KEY=SG.xxxx
AWS_SECRET_ACCESS_KEY=secret_key

# SSL Certificates (in /etc/letsencrypt)
# SSL_CERT_PATH=/etc/letsencrypt/live/remitbikas.com/fullchain.pem
# SSL_KEY_PATH=/etc/letsencrypt/live/remitbikas.com/privkey.pem
```

---

## 📚 How to Use Environment Files

### Development

```bash
# With local PostgreSQL
cd remitbikas/backend
cp .env.example .env
# Edit .env with local database URL
export $(cat .env | xargs)
npm run dev
```

### Docker Development

```bash
# Using Docker Compose for development
cd remitbikas
docker-compose -f docker-compose.dev.yml up -d

# Database URL for docker-compose.dev.yml
DATABASE_URL="postgresql://remitbikas:remitbikas123@postgres:5432/remitbikas"
```

### Docker Production

```bash
# Create .env file for docker-compose.yml
cd remitbikas
cat > .env << EOF
DB_USER=remitbikas_prod
DB_PASSWORD=your_very_secure_password
DB_NAME=remitbikas_production
JWT_SECRET=your_very_long_secure_jwt_secret
CORS_ORIGIN=https://yourdomain.com
EOF

# Start production services
docker-compose up -d
```

### With .env File in Docker Compose

```yaml
# docker-compose.yml
services:
  backend:
    environment:
      # Load from .env file
      DATABASE_URL: ${DATABASE_URL}
      JWT_SECRET: ${JWT_SECRET}
      CORS_ORIGIN: ${CORS_ORIGIN}
```

Run with:
```bash
docker-compose --env-file=.env.prod up -d
```

---

## 🔒 Security Best Practices

### Password Generation

```bash
# Generate secure random password
openssl rand -base64 32

# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Environment File Security

```bash
# Make .env readable only by owner
chmod 600 .env

# Add to .gitignore
echo ".env*" >> .gitignore
echo "!.env.example" >> .gitignore

# For production, use secrets management:
# - AWS Secrets Manager
# - Azure Key Vault
# - HashiCorp Vault
# - Docker Secrets (in Swarm mode)
```

### Never Commit Secrets

```bash
# Verify before committing
git diff --cached | grep -i password
git diff --cached | grep -i secret
git diff --cached | grep -i key

# If accidentally committed
git rm --cached .env
git commit -m "Remove .env file"
```

---

## 🔄 Environment Variable Validation

```typescript
// src/config.ts - Validate required variables
const requiredEnvVars = [
  'DATABASE_URL',
  'JWT_SECRET',
  'PORT'
];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});
```

---

## 📝 Configuration by Environment

| Variable | Development | Docker Dev | Docker Prod | Cloud |
|----------|-------------|-----------|-------------|-------|
| NODE_ENV | development | development | production | production |
| DATABASE_URL | localhost | postgres service | cloud RDS | cloud RDS |
| PORT | 5000 | 5000 | 5000 | 5000 |
| CORS_ORIGIN | localhost:* | localhost:* | yourdomain.com | yourdomain.com |
| UPLOAD_DIR | ./uploads | /app/uploads | S3 bucket | S3 bucket |
| JWT_SECRET | dev_key | dev_key | secure_key | secure_key |
| SSL | false | false | true | true |

---

## 🚀 Environment Setup Checklist

- [ ] Copy `.env.example` to `.env`
- [ ] Update all required variables
- [ ] Set secure passwords (minimum 16 characters)
- [ ] Set secure JWT_SECRET (minimum 64 characters)
- [ ] Verify DATABASE_URL format
- [ ] Test environment by running: `node -e "console.log(process.env)"`
- [ ] Make `.env` readable only by owner: `chmod 600 .env`
- [ ] Add `.env` to `.gitignore`
- [ ] Never commit `.env` file
- [ ] Use `.env.example` for template
- [ ] Document all custom variables

---

**Your environment configuration is now complete and secure! 🔐**
