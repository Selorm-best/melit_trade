#!/bin/bash

# Melit Trade Deployment Script
# This script prepares the application for deployment

echo "🚀 Starting deployment preparation..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from example..."
    cp .env.example .env
    echo "📝 Please update the .env file with your production values!"
fi

# Build React application
echo "🔨 Building React application..."
npm run build

# Check if build was successful
if [ ! -d "build" ]; then
    echo "❌ Build failed. Please check for errors."
    exit 1
fi

# Create uploads directory if it doesn't exist
mkdir -p server/public/uploads

# Set proper permissions for uploads directory
chmod 755 server/public/uploads

echo "✅ Deployment preparation completed!"
echo ""
echo "📋 Next steps:"
echo "1. Update your .env file with production values"
echo "2. Deploy to your chosen platform"
echo "3. Set up your domain and SSL certificate"
echo "4. Configure your database (if using external database)"
echo ""
echo "🔧 Platform-specific deployment guides:"
echo "- Vercel + Railway: See deployment/vercel-railway.md"
echo "- Netlify + Heroku: See deployment/netlify-heroku.md"
echo "- VPS Deployment: See deployment/vps.md"
