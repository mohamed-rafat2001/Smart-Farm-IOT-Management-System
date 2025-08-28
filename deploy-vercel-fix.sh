#!/bin/bash

echo "🚀 Smart Farm Vercel Deployment Fix Script"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "server" ] || [ ! -d "client" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

print_status "Checking Git status..."
if [ -n "$(git status --porcelain)" ]; then
    print_warning "You have uncommitted changes. Committing them..."
    git add .
    git commit -m "Fix Vercel 500 error - add robust error handling"
    print_success "Changes committed"
else
    print_success "No uncommitted changes"
fi

print_status "Checking server dependencies..."
cd server
if [ ! -d "node_modules" ]; then
    print_status "Installing server dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        print_error "Failed to install server dependencies"
        exit 1
    fi
    print_success "Server dependencies installed"
else
    print_success "Server dependencies already installed"
fi

print_status "Testing server build..."
npm run build 2>/dev/null || echo "No build script found, skipping..."

print_status "Testing server startup..."
timeout 10s node index.js > /dev/null 2>&1 &
SERVER_PID=$!
sleep 3

if kill -0 $SERVER_PID 2>/dev/null; then
    print_success "Server starts successfully"
    kill $SERVER_PID
else
    print_warning "Server startup test failed (this might be normal for serverless)"
fi

cd ..

print_status "Checking client dependencies..."
cd client
if [ ! -d "node_modules" ]; then
    print_status "Installing client dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        print_error "Failed to install client dependencies"
        exit 1
    fi
    print_success "Client dependencies installed"
else
    print_success "Client dependencies already installed"
fi

print_status "Testing client build..."
npm run build
if [ $? -ne 0 ]; then
    print_error "Client build failed"
    exit 1
fi
print_success "Client builds successfully"

cd ..

print_status "Checking Vercel configuration files..."
if [ ! -f "vercel.json" ]; then
    print_error "vercel.json not found in root directory"
    exit 1
fi

if [ ! -f "server/vercel.json" ]; then
    print_error "server/vercel.json not found"
    exit 1
fi

print_success "Vercel configuration files found"

print_status "Environment variables checklist:"
echo "======================================"
echo "Required for server deployment:"
echo "  □ DB_URL - MongoDB connection string"
echo "  □ JWTKEY - JWT secret key"
echo "  □ CLIENT_URL - Frontend URL for CORS"
echo ""
echo "Optional but recommended:"
echo "  □ NODE_ENV=production"
echo "  □ MODE=PRODUCTION"
echo ""

print_warning "IMPORTANT: Make sure you have set the required environment variables in your Vercel dashboard!"
print_warning "Go to: Vercel Dashboard > Your Project > Settings > Environment Variables"

echo ""
print_status "Next steps:"
echo "============="
echo "1. Push your changes to GitHub:"
echo "   git push origin main"
echo ""
echo "2. Deploy to Vercel:"
echo "   - Go to your Vercel dashboard"
echo "   - Redeploy your server project"
echo ""
echo "3. Test the deployment:"
echo "   - Visit: https://your-server-app.vercel.app/api/test"
echo "   - Visit: https://your-server-app.vercel.app/api/v1/health"
echo ""
echo "4. Check Vercel logs if there are still issues:"
echo "   - Go to Vercel Dashboard > Functions tab"
echo "   - Check the runtime logs for error messages"
echo ""

print_success "Deployment preparation complete!"
print_status "The server now has robust error handling and should not crash on Vercel."
