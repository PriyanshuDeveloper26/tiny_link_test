# Quick Start Guide

Get TinyLink running locally in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create `.env.local`:

```bash
DATABASE_URL=postgresql://username:password@localhost:5432/tinylink
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set Up Database

```bash
npm run db:setup
```

### 4. Start Development Server

```bash
npm run dev
```

### 5. Open Browser

Visit [http://localhost:3000](http://localhost:3000)

## Test the Application

1. **Create a link**: Enter a URL in the form
2. **Copy short URL**: Click the copy icon
3. **Test redirect**: Open the short URL in a new tab
4. **View stats**: Click the chart icon
5. **Delete link**: Click the trash icon

## API Testing

### Health Check
```bash
curl http://localhost:3000/healthz
```

### Create Link
```bash
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{"target_url": "https://example.com"}'
```

### Create Link with Custom Code
```bash
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{"target_url": "https://example.com", "code": "abc123"}'
```

### Get All Links
```bash
curl http://localhost:3000/api/links
```

### Get Link Stats
```bash
curl http://localhost:3000/api/links/abc123
```

### Delete Link
```bash
curl -X DELETE http://localhost:3000/api/links/abc123
```

## Troubleshooting

### Database Connection Error

**Problem**: Cannot connect to database

**Solution**:
1. Verify PostgreSQL is running
2. Check `DATABASE_URL` in `.env.local`
3. Ensure database exists
4. Run `npm run db:setup` again

### Port Already in Use

**Problem**: Port 3000 is already in use

**Solution**:
```bash
# Use a different port
PORT=3001 npm run dev
```

### Module Not Found

**Problem**: Cannot find module errors

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

- Read [README.md](./README.md) for full documentation
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions
- Customize the UI in `src/components/`
- Add features in `src/app/api/`

## Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linter

# Database
npm run db:setup     # Set up database tables
```

## Project Structure

```
src/
├── app/              # Next.js App Router
│   ├── api/         # API routes
│   ├── code/        # Stats pages
│   ├── [code]/      # Redirect handler
│   └── page.tsx     # Dashboard
├── components/       # React components
├── lib/             # Utilities
└── types/           # TypeScript types
```

## Need Help?

- Check the [README.md](./README.md)
- Review error messages in terminal
- Verify database connection
- Check browser console for client errors

---

Happy link shortening! 🚀
