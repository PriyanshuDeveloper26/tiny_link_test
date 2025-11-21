# Installation & Testing Guide

## Step-by-Step Installation

### Step 1: Install Node.js Dependencies

```bash
cd /home/tempadmin/Documents/full-stack-test
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- PostgreSQL driver (pg)
- Lucide React (icons)

### Step 2: Set Up PostgreSQL Database

You have two options:

#### Option A: Local PostgreSQL

1. Install PostgreSQL if not already installed:
```bash
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# macOS
brew install postgresql
```

2. Create a database:
```bash
sudo -u postgres psql
CREATE DATABASE tinylink;
CREATE USER tinylink_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE tinylink TO tinylink_user;
\q
```

#### Option B: Cloud PostgreSQL (Neon - Free)

1. Go to [neon.tech](https://neon.tech)
2. Sign up for free account
3. Create new project
4. Copy connection string

### Step 3: Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# For local PostgreSQL
DATABASE_URL=postgresql://tinylink_user:your_password@localhost:5432/tinylink

# For Neon (cloud)
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 4: Initialize Database

```bash
npm run db:setup
```

Expected output:
```
Setting up database...
✅ Database setup complete!
Table "links" created successfully.
```

### Step 5: Start Development Server

```bash
npm run dev
```

Expected output:
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
- Ready in 2.3s
```

### Step 6: Verify Installation

Open browser to [http://localhost:3000](http://localhost:3000)

You should see:
- TinyLink header with logo
- "Create Short Link" form
- "Your Links" table (empty initially)

## Testing the Application

### 1. Test Health Check

```bash
curl http://localhost:3000/healthz
```

Expected response:
```json
{"ok":true,"version":"1.0"}
```

### 2. Test Link Creation

#### Create with Auto-Generated Code

```bash
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{"target_url": "https://github.com"}'
```

Expected response (200):
```json
{
  "code": "aB3xY9",
  "target_url": "https://github.com",
  "short_url": "http://localhost:3000/aB3xY9"
}
```

#### Create with Custom Code

```bash
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{"target_url": "https://google.com", "code": "google"}'
```

Expected response (201):
```json
{
  "code": "google",
  "target_url": "https://google.com",
  "short_url": "http://localhost:3000/google"
}
```

#### Test Duplicate Code (Should Fail)

```bash
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{"target_url": "https://example.com", "code": "google"}'
```

Expected response (409):
```json
{
  "error": "Code already exists",
  "message": "This short code is already in use"
}
```

#### Test Invalid URL (Should Fail)

```bash
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{"target_url": "not-a-valid-url"}'
```

Expected response (400):
```json
{
  "error": "Invalid URL",
  "message": "Please provide a valid HTTP or HTTPS URL"
}
```

### 3. Test Get All Links

```bash
curl http://localhost:3000/api/links
```

Expected response (200):
```json
[
  {
    "id": 1,
    "code": "google",
    "target_url": "https://google.com",
    "clicks": 0,
    "last_clicked": null,
    "created_at": "2024-01-01T12:00:00.000Z"
  }
]
```

### 4. Test Get Single Link

```bash
curl http://localhost:3000/api/links/google
```

Expected response (200):
```json
{
  "id": 1,
  "code": "google",
  "target_url": "https://google.com",
  "clicks": 0,
  "last_clicked": null,
  "created_at": "2024-01-01T12:00:00.000Z"
}
```

### 5. Test Redirect

```bash
curl -I http://localhost:3000/google
```

Expected response:
```
HTTP/1.1 307 Temporary Redirect
Location: https://google.com
```

Or open in browser: [http://localhost:3000/google](http://localhost:3000/google)

After redirect, check clicks incremented:
```bash
curl http://localhost:3000/api/links/google
```

Should show `"clicks": 1`

### 6. Test Delete

```bash
curl -X DELETE http://localhost:3000/api/links/google
```

Expected response (200):
```json
{
  "message": "Link deleted successfully"
}
```

Verify deletion:
```bash
curl http://localhost:3000/google
```

Should return 404 page.

### 7. Test UI Features

#### Dashboard
- ✅ Create link with auto-generated code
- ✅ Create link with custom code "test123"
- ✅ See link appear in table
- ✅ Copy short URL using copy button
- ✅ Search for link using search box
- ✅ Click stats icon to view stats page
- ✅ Click delete icon and confirm deletion

#### Stats Page
- ✅ Navigate to `/code/test123`
- ✅ See link details (code, URLs, stats)
- ✅ Copy short URL
- ✅ Click "Visit Short URL" button
- ✅ Return to stats page and see clicks incremented

#### Responsive Design
- ✅ Resize browser window
- ✅ Test on mobile device (or use DevTools device emulation)
- ✅ Verify table scrolls horizontally on small screens
- ✅ Verify forms are usable on mobile

## Troubleshooting

### Error: "Cannot find module"

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "Database connection failed"

**Solution:**
1. Check PostgreSQL is running:
   ```bash
   sudo systemctl status postgresql
   ```
2. Verify DATABASE_URL in `.env.local`
3. Test connection:
   ```bash
   psql $DATABASE_URL
   ```

### Error: "Port 3000 already in use"

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

### Error: "Table does not exist"

**Solution:**
```bash
npm run db:setup
```

### TypeScript Errors in IDE

**Note:** The TypeScript errors you see before running `npm install` are expected. They will resolve after installing dependencies.

## Performance Testing

### Load Testing with Apache Bench

```bash
# Install Apache Bench
sudo apt-get install apache2-utils

# Test health endpoint
ab -n 1000 -c 10 http://localhost:3000/healthz

# Test API endpoint
ab -n 100 -c 5 -p post.json -T application/json http://localhost:3000/api/links
```

### Expected Performance
- Health check: < 10ms response time
- Link creation: < 50ms response time
- Redirect: < 20ms response time
- List links: < 30ms response time

## Database Verification

### Check Table Structure

```bash
psql $DATABASE_URL -c "\d links"
```

Expected output:
```
                                     Table "public.links"
    Column    |            Type             | Collation | Nullable |              Default
--------------+-----------------------------+-----------+----------+-----------------------------------
 id           | integer                     |           | not null | nextval('links_id_seq'::regclass)
 code         | character varying(8)        |           | not null |
 target_url   | text                        |           | not null |
 clicks       | integer                     |           |          | 0
 last_clicked | timestamp without time zone |           |          |
 created_at   | timestamp without time zone |           |          | CURRENT_TIMESTAMP
```

### Check Data

```bash
psql $DATABASE_URL -c "SELECT * FROM links;"
```

### Clear All Data

```bash
psql $DATABASE_URL -c "TRUNCATE TABLE links RESTART IDENTITY;"
```

## Next Steps

1. ✅ Verify all tests pass
2. ✅ Review code in `src/` directory
3. ✅ Customize UI if desired
4. ✅ Read DEPLOYMENT.md for production deployment
5. ✅ Set up Git repository
6. ✅ Deploy to Vercel/Render/Railway

## Automated Test Suite

Create `test.sh` for quick testing:

```bash
#!/bin/bash

echo "Testing TinyLink..."

# Health check
echo "1. Health check..."
curl -s http://localhost:3000/healthz | jq

# Create link
echo "2. Creating link..."
RESPONSE=$(curl -s -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{"target_url": "https://example.com"}')
echo $RESPONSE | jq
CODE=$(echo $RESPONSE | jq -r '.code')

# Get link
echo "3. Getting link..."
curl -s http://localhost:3000/api/links/$CODE | jq

# Test redirect
echo "4. Testing redirect..."
curl -I http://localhost:3000/$CODE 2>&1 | grep Location

# Delete link
echo "5. Deleting link..."
curl -s -X DELETE http://localhost:3000/api/links/$CODE | jq

echo "All tests completed!"
```

Make executable and run:
```bash
chmod +x test.sh
./test.sh
```

## Success Criteria

Your installation is successful if:
- ✅ `npm run dev` starts without errors
- ✅ Health check returns 200
- ✅ Can create links via UI and API
- ✅ Redirects work and increment clicks
- ✅ Stats page displays correctly
- ✅ Can delete links
- ✅ No console errors in browser
- ✅ All TypeScript errors resolved after `npm install`

---

**Ready to deploy!** See DEPLOYMENT.md for production deployment instructions.
