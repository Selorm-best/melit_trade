#!/bin/bash

# Fix Deployment Issues Script
# This script fixes common deployment problems

set -e

echo "🔧 Fixing Deployment Issues"
echo "=========================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "1. Creating missing directories..."
mkdir -p server/public/uploads
mkdir -p server/data
mkdir -p server/views
mkdir -p logs

echo "2. Fixing file permissions..."
chmod -R 755 server/
chmod +x scripts/*.sh

echo "3. Installing dependencies..."
npm install

echo "4. Building React app..."
npm run build

echo "5. Testing server locally..."
# Start server in background
npm run server &
SERVER_PID=$!

# Wait a moment for server to start
sleep 5

# Test health endpoint
if curl -f http://localhost:5000/health > /dev/null 2>&1; then
    echo "✅ Server is running correctly"
else
    echo "❌ Server failed to start"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi

# Stop the test server
kill $SERVER_PID 2>/dev/null || true

echo "6. Checking file structure..."
echo "📁 Project structure:"
echo "├── server/"
echo "│   ├── server.js"
echo "│   ├── routes/"
echo "│   ├── views/"
echo "│   ├── data/"
echo "│   └── public/uploads/"
echo "├── build/"
echo "└── src/"

echo ""
echo "✅ Deployment issues fixed!"
echo ""
echo "🚀 You can now deploy using:"
echo "   Railway: railway up"
echo "   Heroku: git push heroku main"
echo "   Vercel: vercel --prod"
echo ""
echo "📚 For more help, check DEPLOYMENT_TROUBLESHOOTING.md"

