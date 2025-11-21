# Deployment Guide

This guide will help you deploy TinyLink to production.

## Option 1: Vercel + Neon (Recommended)

### Step 1: Set Up Neon Database

1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy your connection string (it looks like: `postgresql://user:password@host/database`)
4. In the Neon SQL Editor, run:

```sql
CREATE TABLE IF NOT EXISTS links (
  id SERIAL PRIMARY KEY,
  code VARCHAR(8) UNIQUE NOT NULL,
  target_url TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  last_clicked TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_code ON links(code);
```

### Step 2: Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables:
   - `DATABASE_URL`: Your Neon connection string
   - `NEXT_PUBLIC_APP_URL`: Leave empty (Vercel will auto-set this)
6. Click "Deploy"

### Step 3: Update Environment Variable

After deployment:
1. Go to your project settings in Vercel
2. Navigate to Environment Variables
3. Update `NEXT_PUBLIC_APP_URL` to your Vercel URL (e.g., `https://your-app.vercel.app`)
4. Redeploy

---

## Option 2: Render + Render PostgreSQL

### Step 1: Create PostgreSQL Database

1. Go to [render.com](https://render.com) and create an account
2. Click "New +" → "PostgreSQL"
3. Choose a name and region
4. Select the free plan
5. Click "Create Database"
6. Copy the "External Database URL"

### Step 2: Set Up Database Schema

1. In Render dashboard, go to your database
2. Click "Connect" → "PSQL Command"
3. Run the command in your terminal
4. Execute:

```sql
CREATE TABLE IF NOT EXISTS links (
  id SERIAL PRIMARY KEY,
  code VARCHAR(8) UNIQUE NOT NULL,
  target_url TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  last_clicked TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_code ON links(code);
```

### Step 3: Deploy Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: tinylink (or your choice)
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Add environment variables:
   - `DATABASE_URL`: Your Render PostgreSQL URL
   - `NEXT_PUBLIC_APP_URL`: Your Render URL (e.g., `https://tinylink.onrender.com`)
5. Click "Create Web Service"

---

## Option 3: Railway

### Step 1: Create Project

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository

### Step 2: Add PostgreSQL

1. Click "New" → "Database" → "Add PostgreSQL"
2. Railway will automatically create a database
3. Copy the `DATABASE_URL` from the PostgreSQL service

### Step 3: Set Up Database

1. Click on the PostgreSQL service
2. Go to "Data" tab
3. Click "Query"
4. Run:

```sql
CREATE TABLE IF NOT EXISTS links (
  id SERIAL PRIMARY KEY,
  code VARCHAR(8) UNIQUE NOT NULL,
  target_url TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  last_clicked TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_code ON links(code);
```

### Step 4: Configure Web Service

1. Click on your web service
2. Go to "Variables" tab
3. Add:
   - `DATABASE_URL`: Reference the PostgreSQL service
   - `NEXT_PUBLIC_APP_URL`: Your Railway URL
4. Deploy!

---

## Post-Deployment Checklist

- [ ] Database table created successfully
- [ ] Environment variables set correctly
- [ ] Health check endpoint returns 200: `https://your-app.com/healthz`
- [ ] Can create a new link
- [ ] Redirect works and increments clicks
- [ ] Stats page displays correctly
- [ ] Can delete links
- [ ] Custom codes work
- [ ] Duplicate codes return 409 error

---

## Troubleshooting

### Database Connection Issues

**Error**: "Connection refused" or "Database not found"

**Solution**:
- Verify `DATABASE_URL` is correct
- Check if database service is running
- Ensure SSL is configured (add `?sslmode=require` to connection string if needed)

### Build Failures

**Error**: "Module not found"

**Solution**:
- Run `npm install` locally to verify dependencies
- Check `package.json` for missing dependencies
- Clear build cache and redeploy

### Redirect Not Working

**Error**: 404 on `/:code`

**Solution**:
- Verify the link exists in database
- Check Next.js dynamic routes are configured correctly
- Ensure `[code]/page.tsx` is in the correct location

### Environment Variables Not Working

**Error**: `process.env.VARIABLE` is undefined

**Solution**:
- Client-side variables must start with `NEXT_PUBLIC_`
- Redeploy after adding environment variables
- Check variable names match exactly

---

## Monitoring

### Health Check

Set up monitoring with:
- **UptimeRobot**: Free uptime monitoring
- **Pingdom**: Advanced monitoring
- **Vercel Analytics**: Built-in for Vercel deployments

Monitor endpoint: `https://your-app.com/healthz`

Expected response:
```json
{
  "ok": true,
  "version": "1.0"
}
```

---

## Scaling Considerations

For production use, consider:

1. **Database Connection Pooling**: Use `pg-pool` or connection pooling from your provider
2. **Caching**: Add Redis for frequently accessed links
3. **Rate Limiting**: Implement rate limiting to prevent abuse
4. **Analytics**: Add detailed analytics (user agents, referrers, geographic data)
5. **Custom Domains**: Set up custom domain for professional URLs
6. **CDN**: Use Vercel's Edge Network or Cloudflare for global distribution

---

## Security Best Practices

- Never commit `.env` files
- Use environment variables for all secrets
- Enable SSL/HTTPS (automatic on Vercel/Render/Railway)
- Implement rate limiting for API endpoints
- Validate all user inputs
- Use prepared statements (already implemented with `pg`)
- Regular security updates: `npm audit fix`

---

## Support

For issues or questions:
- Check the main README.md
- Review error logs in your deployment platform
- Verify database connection and schema
