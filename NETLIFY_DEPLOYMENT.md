# Deploy TinyLink to Netlify

## Prerequisites

✅ MongoDB Atlas connection string (already configured)
✅ GitHub account
✅ Netlify account (free)

## Step-by-Step Deployment Guide

### Step 1: Install Netlify Plugin

```bash
npm install @netlify/plugin-nextjs
```

### Step 2: Push to GitHub

1. **Initialize Git repository** (if not already done):
```bash
cd /home/tempadmin/Documents/full-stack-test
git init
git add .
git commit -m "Initial commit - TinyLink with MongoDB"
```

2. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Name: `tinylink`
   - Description: "URL shortening service with Next.js and MongoDB"
   - Keep it Public or Private
   - Don't initialize with README (we already have files)
   - Click "Create repository"

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/tinylink.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Netlify

1. **Go to Netlify**:
   - Visit https://app.netlify.com
   - Sign up or log in

2. **Import Project**:
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub
   - Select your `tinylink` repository

3. **Configure Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Base directory**: (leave empty)

4. **Add Environment Variables**:
   Click "Add environment variables" and add:
   
   ```
   DATABASE_URL=mongodb+srv://sathavarapriyanshu9_db_user:sathavarapriyanshu9_db_user@cluster0.eht6ypq.mongodb.net/?appName=Cluster0
   
   NEXT_PUBLIC_APP_URL=https://YOUR_SITE_NAME.netlify.app
   ```
   
   **Note**: Replace `YOUR_SITE_NAME` with your actual Netlify site name (you'll see it after deployment)

5. **Deploy**:
   - Click "Deploy site"
   - Wait for build to complete (2-3 minutes)

### Step 4: Update App URL

After first deployment:

1. **Get your Netlify URL**:
   - Example: `https://tinylink-abc123.netlify.app`

2. **Update Environment Variable**:
   - Go to Site settings → Environment variables
   - Edit `NEXT_PUBLIC_APP_URL`
   - Set to your Netlify URL: `https://tinylink-abc123.netlify.app`
   - Save

3. **Redeploy**:
   - Go to Deploys tab
   - Click "Trigger deploy" → "Deploy site"

### Step 5: Configure Custom Domain (Optional)

1. **Go to Domain settings**:
   - Site settings → Domain management
   - Click "Add custom domain"

2. **Add your domain**:
   - Enter your domain (e.g., `tinylink.yourdomain.com`)
   - Follow DNS configuration instructions

3. **Update Environment Variable**:
   - Change `NEXT_PUBLIC_APP_URL` to your custom domain
   - Redeploy

## Configuration Files

### `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/.netlify/functions/___netlify-handler"
  status = 200

[functions]
  node_bundler = "esbuild"
  external_node_modules = ["mongodb"]
```

### Environment Variables Required

| Variable | Value | Description |
|----------|-------|-------------|
| `DATABASE_URL` | Your MongoDB connection string | MongoDB Atlas connection |
| `NEXT_PUBLIC_APP_URL` | Your Netlify site URL | Used for generating short URLs |

## Testing Your Deployment

### 1. Test Health Check
```bash
curl https://YOUR_SITE.netlify.app/healthz
```

Expected: `{"ok":true,"version":"1.0"}`

### 2. Test Create Link
```bash
curl -X POST https://YOUR_SITE.netlify.app/api/links \
  -H "Content-Type: application/json" \
  -d '{"target_url": "https://google.com"}'
```

### 3. Test Redirect
Visit `https://YOUR_SITE.netlify.app/{code}` in browser

### 4. Test Dashboard
Visit `https://YOUR_SITE.netlify.app/` in browser

## Troubleshooting

### Build Fails

**Error**: "Module not found: mongodb"
- **Solution**: Make sure `mongodb` is in `dependencies`, not `devDependencies`

**Error**: "Build exceeded time limit"
- **Solution**: Netlify free tier has 300 build minutes/month. Check your usage.

### Runtime Errors

**Error**: "Cannot connect to MongoDB"
- **Solution**: Check `DATABASE_URL` environment variable is set correctly
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

**Error**: "Short URLs not working"
- **Solution**: Update `NEXT_PUBLIC_APP_URL` to match your Netlify URL
- Redeploy after changing environment variables

### MongoDB Atlas Configuration

1. **Allow Netlify IPs**:
   - Go to MongoDB Atlas → Network Access
   - Click "Add IP Address"
   - Select "Allow access from anywhere" (0.0.0.0/0)
   - Or add specific Netlify IPs if you have them

2. **Database User**:
   - Ensure user has read/write permissions
   - Your current user: `sathavarapriyanshu9_db_user`

## Continuous Deployment

Once set up, Netlify automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push

# Netlify automatically builds and deploys
```

## Monitoring

### View Logs
- Go to Netlify Dashboard → Your site → Deploys
- Click on a deploy → View deploy logs

### View Function Logs
- Netlify Dashboard → Functions
- Click on a function to see invocation logs

### Analytics
- Netlify Dashboard → Analytics (paid feature)
- Or use MongoDB Atlas to track link clicks

## Performance Optimization

### 1. Enable Netlify CDN
- Automatically enabled for static assets
- Your Next.js pages are served via Netlify Edge

### 2. MongoDB Connection Pooling
- Already configured in `src/lib/db.ts`
- Reuses connections across function invocations

### 3. Caching
- Static assets cached automatically
- API routes are serverless functions (not cached)

## Cost Considerations

### Netlify Free Tier Includes:
- ✅ 100 GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Unlimited sites
- ✅ HTTPS included
- ✅ Automatic deployments

### MongoDB Atlas Free Tier Includes:
- ✅ 512 MB storage
- ✅ Shared RAM
- ✅ No credit card required
- ✅ Perfect for testing/small projects

## Alternative: Deploy to Vercel (Recommended)

Vercel is built by the Next.js team and has better Next.js support:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts and add environment variables
```

Vercel advantages:
- ✅ Better Next.js optimization
- ✅ Edge functions support
- ✅ Faster cold starts
- ✅ Built-in analytics
- ✅ Zero configuration needed

## Support

- **Netlify Docs**: https://docs.netlify.com/integrations/frameworks/next-js/
- **Next.js Docs**: https://nextjs.org/docs/deployment
- **MongoDB Atlas**: https://www.mongodb.com/docs/atlas/

---

## Quick Deploy Checklist

- [ ] Push code to GitHub
- [ ] Create Netlify account
- [ ] Import GitHub repository
- [ ] Add `DATABASE_URL` environment variable
- [ ] Add `NEXT_PUBLIC_APP_URL` environment variable
- [ ] Deploy site
- [ ] Update `NEXT_PUBLIC_APP_URL` with actual Netlify URL
- [ ] Redeploy
- [ ] Test all features
- [ ] Configure custom domain (optional)

**Your MongoDB connection is already configured and ready to use!**
