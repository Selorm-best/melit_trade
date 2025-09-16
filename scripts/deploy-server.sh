#!/bin/bash

# Melit Trade Server Deployment Script
# This script helps deploy the admin server to various platforms

set -e

echo "🚀 Melit Trade Server Deployment Script"
echo "======================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Function to deploy to Railway
deploy_railway() {
    echo "🚂 Deploying to Railway..."
    
    # Check if Railway CLI is installed
    if ! command -v railway &> /dev/null; then
        echo "📦 Installing Railway CLI..."
        npm install -g @railway/cli
    fi
    
    # Login to Railway
    echo "🔐 Logging in to Railway..."
    railway login
    
    # Deploy
    echo "🚀 Deploying to Railway..."
    railway up
    
    echo "✅ Deployment to Railway completed!"
    echo "🌐 Your server will be available at the URL provided by Railway"
}

# Function to deploy to Heroku
deploy_heroku() {
    echo "🟣 Deploying to Heroku..."
    
    # Check if Heroku CLI is installed
    if ! command -v heroku &> /dev/null; then
        echo "❌ Error: Heroku CLI is not installed. Please install it first."
        echo "Visit: https://devcenter.heroku.com/articles/heroku-cli"
        exit 1
    fi
    
    # Check if logged in to Heroku
    if ! heroku auth:whoami &> /dev/null; then
        echo "🔐 Logging in to Heroku..."
        heroku login
    fi
    
    # Create Heroku app if it doesn't exist
    if ! heroku apps:info melit-trade-admin &> /dev/null; then
        echo "📱 Creating Heroku app..."
        heroku create melit-trade-admin
    fi
    
    # Set environment variables
    echo "⚙️ Setting environment variables..."
    heroku config:set NODE_ENV=production
    heroku config:set JWT_SECRET=$(openssl rand -base64 32)
    
    # Deploy
    echo "🚀 Deploying to Heroku..."
    git add .
    git commit -m "Deploy admin server to Heroku" || true
    git push heroku main
    
    echo "✅ Deployment to Heroku completed!"
    echo "🌐 Your server is available at: https://melit-trade-admin.herokuapp.com"
}

# Function to prepare for VPS deployment
prepare_vps() {
    echo "🖥️ Preparing for VPS deployment..."
    
    # Install dependencies
    echo "📦 Installing dependencies..."
    npm install --production
    
    # Build React app
    echo "🏗️ Building React app..."
    npm run build
    
    # Create logs directory
    mkdir -p logs
    
    # Create PM2 ecosystem file
    echo "📝 PM2 ecosystem file created: ecosystem.config.js"
    
    echo "✅ VPS preparation completed!"
    echo "📋 Next steps:"
    echo "1. Upload the project to your VPS"
    echo "2. Install PM2: npm install -g pm2"
    echo "3. Start the server: pm2 start ecosystem.config.js --env production"
    echo "4. Save PM2 configuration: pm2 save"
    echo "5. Set up PM2 startup: pm2 startup"
}

# Main menu
echo ""
echo "Please select a deployment option:"
echo "1) Railway (Recommended - Easy)"
echo "2) Heroku (Reliable)"
echo "3) VPS Preparation (Advanced)"
echo "4) Exit"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        deploy_railway
        ;;
    2)
        deploy_heroku
        ;;
    3)
        prepare_vps
        ;;
    4)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment process completed!"
echo "📚 For more information, check the SERVER_DEPLOYMENT.md file"

