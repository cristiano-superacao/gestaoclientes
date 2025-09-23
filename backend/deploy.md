# 🚀 Deployment Guide - Cloud Database Configuration

## Supported Cloud Database Providers

### 1. 🚄 Railway (Recommended for beginners)
Railway provides PostgreSQL with automatic deployments.

**Setup:**
1. Create account at [railway.app](https://railway.app)
2. Create new project
3. Add PostgreSQL service
4. Get connection string from variables tab
5. Set `DATABASE_URL` environment variable

**Connection String Format:**
```
postgresql://postgres:password@host:port/railway
```

### 2. 🎯 Supabase (Free tier available)
Supabase provides PostgreSQL with additional features.

**Setup:**
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings > Database
4. Copy connection string
5. Use connection pooling for better performance

**Connection String Format:**
```
postgresql://postgres:password@host:port/postgres?pgbouncer=true&connection_limit=1
```

### 3. ⚡ Neon (Serverless PostgreSQL)
Neon provides serverless PostgreSQL with automatic scaling.

**Setup:**
1. Create account at [neon.tech](https://neon.tech)
2. Create database
3. Copy connection string
4. Enable SSL

**Connection String Format:**
```
postgresql://user:password@host/database?sslmode=require
```

### 4. 🌐 AWS RDS
For production applications with custom requirements.

**Setup:**
1. Create RDS PostgreSQL instance
2. Configure security groups
3. Get connection details
4. Set up SSL if required

**Connection String Format:**
```
postgresql://user:password@host:5432/database
```

## Environment Variables Setup

Create `.env` file in backend directory:

```env
# Database (replace with your cloud database URL)
DATABASE_URL="postgresql://user:password@host:port/database"

# Server Configuration
PORT=3001
NODE_ENV=production

# CORS (replace with your frontend URL)
FRONTEND_URL=https://your-frontend-domain.com

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=900000
```

## Deployment Steps

### 1. Database Migration
```bash
cd backend
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### 2. Deploy Backend
Common deployment platforms:
- **Railway**: Connect GitHub repo, auto-deploys
- **Render**: Connect GitHub repo, set build command
- **Heroku**: Use Heroku CLI or GitHub integration
- **Vercel**: For serverless functions

### 3. Update Frontend
Update frontend API URL to point to deployed backend.

## Health Check

After deployment, verify your API:
```
GET https://your-backend-url/health
```

Should return:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production",
  "version": "1.0.0"
}
```

## Monitoring

- Monitor database connections
- Check API response times
- Monitor error rates
- Set up alerts for downtime

## Security Checklist

- ✅ Use environment variables for secrets
- ✅ Enable CORS with specific origins
- ✅ Use rate limiting
- ✅ Enable HTTPS
- ✅ Use connection pooling
- ✅ Regular database backups
- ✅ Monitor for suspicious activity

## Troubleshooting

### Common Issues:
1. **Connection timeout**: Check firewall/security groups
2. **SSL required**: Add `?sslmode=require` to connection string
3. **Too many connections**: Use connection pooling
4. **CORS errors**: Check FRONTEND_URL environment variable

### Database Connection Test:
```bash
npm run prisma:generate
npx prisma db push
```