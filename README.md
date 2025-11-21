# TinyLink - URL Shortener

A modern, full-stack URL shortening service built with Next.js, TypeScript, PostgreSQL, and TailwindCSS.

## 🌟 Features

- **Create Short Links**: Generate short URLs with optional custom codes
- **Click Tracking**: Monitor click counts and last clicked timestamps
- **Link Management**: View, search, and delete links from an intuitive dashboard
- **Statistics Page**: Detailed stats for individual links
- **Responsive Design**: Clean, modern UI that works on all devices
- **Health Check**: API endpoint for monitoring and automated testing

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended) or Render

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database (local or hosted on Neon/Railway/etc.)
- npm or yarn

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd full-stack-test
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your database connection string:

```env
DATABASE_URL=postgresql://username:password@host:port/database
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set Up the Database

Run the database setup script to create the required table:

```bash
npm run db:setup
```

This will create the `links` table with the following schema:

```sql
CREATE TABLE links (
  id SERIAL PRIMARY KEY,
  code VARCHAR(8) UNIQUE NOT NULL,
  target_url TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  last_clicked TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
full-stack-test/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── links/
│   │   │       ├── route.ts          # GET, POST /api/links
│   │   │       └── [code]/
│   │   │           └── route.ts      # GET, DELETE /api/links/:code
│   │   ├── healthz/
│   │   │   └── route.ts              # Health check endpoint
│   │   ├── code/
│   │   │   └── [code]/
│   │   │       └── page.tsx          # Stats page
│   │   ├── [code]/
│   │   │   └── page.tsx              # Redirect handler
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Dashboard
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── CreateLinkForm.tsx        # Form to create links
│   │   └── LinksTable.tsx            # Table to display links
│   ├── lib/
│   │   ├── db.ts                     # Database connection
│   │   └── validation.ts             # Validation utilities
│   └── types/
│       └── index.ts                  # TypeScript types
├── scripts/
│   └── setup-db.js                   # Database setup script
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## 🔌 API Endpoints

### Health Check
- **GET** `/healthz` - Returns `{ ok: true, version: "1.0" }`

### Links Management
- **POST** `/api/links` - Create a new short link
  - Body: `{ target_url: string, code?: string }`
  - Returns: `{ code: string, target_url: string, short_url: string }`
  - Status: 201 (Created), 400 (Invalid), 409 (Conflict)

- **GET** `/api/links` - Get all links
  - Returns: Array of link objects
  - Status: 200

- **GET** `/api/links/:code` - Get stats for a specific link
  - Returns: Link object with stats
  - Status: 200, 404 (Not Found)

- **DELETE** `/api/links/:code` - Delete a link
  - Returns: `{ message: string }`
  - Status: 200, 404 (Not Found)

### Redirect
- **GET** `/:code` - Redirect to target URL (302) and increment click count
  - Status: 302 (Redirect), 404 (Not Found)

## 🎨 Pages

- **`/`** - Dashboard with link creation form and links table
- **`/code/:code`** - Statistics page for a specific link
- **`/:code`** - Redirect endpoint (increments clicks)

## 🧪 Testing the Application

### Manual Testing

1. **Create a link**: Use the form on the dashboard
2. **View stats**: Click the stats icon in the table
3. **Test redirect**: Click the short URL or visit `/:code`
4. **Delete a link**: Click the delete icon
5. **Health check**: Visit `/healthz`

### Automated Testing

The application is designed to work with automated tests that check:
- Health endpoint returns 200
- Link creation works and returns proper responses
- Duplicate codes return 409
- Redirects work and increment click count
- Deletion stops redirects (404)

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NEXT_PUBLIC_APP_URL`: Your deployed URL (e.g., `https://your-app.vercel.app`)
4. Deploy!

### Database Setup on Neon (Free PostgreSQL)

1. Create account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Run the database setup script locally or use Neon's SQL editor

### Alternative: Deploy to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy!

## 🔒 Code Validation Rules

- Short codes must be **6-8 alphanumeric characters** (`[A-Za-z0-9]{6,8}`)
- Target URLs must be valid HTTP or HTTPS URLs
- Codes are globally unique (409 error on duplicates)

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NEXT_PUBLIC_APP_URL` | Base URL of the application | `http://localhost:3000` |

## 🎯 Key Features Implementation

### URL Validation
- Uses native `URL` constructor to validate URLs
- Ensures only HTTP/HTTPS protocols are accepted

### Code Generation
- Random 6-character alphanumeric codes
- Collision detection with retry logic
- Custom code validation

### Click Tracking
- Atomic increment on each redirect
- Timestamp update for last clicked
- Server-side tracking (no client-side manipulation)

### Error Handling
- Proper HTTP status codes (400, 404, 409, 500)
- User-friendly error messages
- Form validation with visual feedback

### Responsive Design
- Mobile-first approach
- Tailwind CSS utilities
- Clean, modern UI with proper spacing and hierarchy

## 📄 License

MIT

## 👨‍💻 Author

Created as a take-home project for TinyLink.

---

**Version**: 1.0.0
