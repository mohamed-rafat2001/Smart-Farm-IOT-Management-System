#!/bin/bash

# Smart Farm Vercel Deployment Script
# This script helps prepare your project for Vercel deployment

echo "🚀 Smart Farm Vercel Deployment Setup"
echo "====================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git remote add origin <your-github-repo-url>"
    echo "   git push -u origin main"
    exit 1
fi

# Check if .env files exist
echo "📋 Checking environment files..."

if [ ! -f "server/.env" ]; then
    echo "⚠️  server/.env not found. Creating from example..."
    if [ -f "server/env.example" ]; then
        cp server/env.example server/.env
        echo "✅ Created server/.env from example"
        echo "   ⚠️  Please update server/.env with your actual values"
    else
        echo "❌ server/env.example not found. Please create server/.env manually"
    fi
else
    echo "✅ server/.env already exists"
fi

if [ ! -f "client/.env" ]; then
    echo "⚠️  client/.env not found. Creating from example..."
    if [ -f "client/env.example" ]; then
        cp client/env.example client/.env
        echo "✅ Created client/.env from example"
        echo "   ⚠️  Please update client/.env with your actual values"
    else
        echo "❌ client/env.example not found. Please create client/.env manually"
    fi
else
    echo "✅ client/.env already exists"
fi

# Check dependencies
echo "📦 Checking dependencies..."

if [ ! -d "node_modules" ]; then
    echo "📥 Installing server dependencies..."
    npm install
fi

if [ ! -d "client/node_modules" ]; then
    echo "📥 Installing client dependencies..."
    cd client
    npm install
    cd ..
fi

# Build test
echo "🔨 Testing builds..."

echo "Building client..."
cd client
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Client build successful"
else
    echo "❌ Client build failed"
    exit 1
fi
cd ..

echo "Building server..."
cd server
npm run build 2>/dev/null || echo "ℹ️  Server build not configured (this is normal for Express apps)"
cd ..

echo ""
echo "🎉 Setup complete! Next steps:"
echo ""
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Prepare for Vercel deployment'"
echo "   git push"
echo ""
echo "2. Deploy to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Create new project"
echo "   - Import your GitHub repository"
echo "   - Set root directory to 'server' for backend"
echo "   - Set root directory to 'client' for frontend"
echo ""
echo "3. Configure environment variables in Vercel:"
echo "   - DB_URL (MongoDB Atlas connection string)"
echo "   - JWTKEY (your secret key)"
echo "   - CLIENT_URL (your frontend URL)"
echo "   - VITE_API_URL (your backend URL)"
echo ""
echo "📖 For detailed instructions, see VERCEL_DEPLOYMENT.md"
echo ""
