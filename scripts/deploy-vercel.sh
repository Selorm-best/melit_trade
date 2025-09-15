#!/bin/bash

# Vercel Deployment Script for Melit Trade
# This script helps deploy the React frontend to Vercel

set -e

echo "🚀 Melit Trade Vercel Deployment Script"
echo "======================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Logging in to Vercel..."
    vercel login
fi

echo "🏗️ Building React app..."
npm run build

echo "🚀 Deploying to Vercel..."
vercel --prod

echo ""
echo "✅ Deployment completed!"
echo "🌐 Your app is now live on Vercel"
echo ""
echo "📋 Next steps:"
echo "1. Set up your backend server (Railway/Heroku)"
echo "2. Update REACT_APP_API_URL environment variable in Vercel"
echo "3. Test your admin panel functionality"
echo ""
echo "🔧 To set environment variables:"
echo "vercel env add REACT_APP_API_URL"
echo ""
echo "📚 For more information, check VERCEL_DEPLOYMENT.md"
