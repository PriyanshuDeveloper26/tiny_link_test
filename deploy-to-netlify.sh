#!/bin/bash

echo "🚀 TinyLink - Netlify Deployment Helper"
echo "========================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - TinyLink with MongoDB"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Create a GitHub repository:"
echo "   - Go to: https://github.com/new"
echo "   - Name: tinylink"
echo "   - Don't initialize with README"
echo ""
echo "2. Push to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/tinylink.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Deploy on Netlify:"
echo "   - Go to: https://app.netlify.com"
echo "   - Click 'Add new site' → 'Import an existing project'"
echo "   - Choose GitHub and select your repository"
echo ""
echo "4. Add Environment Variables in Netlify:"
echo "   DATABASE_URL=mongodb+srv://sathavarapriyanshu9_db_user:sathavarapriyanshu9_db_user@cluster0.eht6ypq.mongodb.net/?appName=Cluster0"
echo "   NEXT_PUBLIC_APP_URL=https://YOUR_SITE.netlify.app"
echo ""
echo "5. After deployment, update NEXT_PUBLIC_APP_URL with your actual Netlify URL"
echo ""
echo "📖 For detailed instructions, see: NETLIFY_DEPLOYMENT.md"
echo ""
