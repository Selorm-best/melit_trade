# Server Deployment Guide for Melit Trade Admin CMS

This guide covers deploying the Express.js server separately for the admin content management system.

## 🚀 Quick Deployment Options

### Option 1: Railway (Recommended)
**Best for**: Easy deployment, automatic HTTPS, database included

1. **Prepare for Railway**:
   ```bash
   cd melit-trade
   npm install
   ```

2. **Deploy to Railway**:
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Select the `melit-trade` folder
   - Railway will auto-detect Node.js and deploy

3. **Environment Variables** (Set in Railway dashboard):
   ```
   NODE_ENV=production
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

### Option 2: Heroku
**Best for**: Reliable, well-documented platform

1. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku App**:
   ```bash
   cd melit-trade
   heroku create melit-trade-admin
   ```

3. **Set Environment Variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-super-secret-jwt-key-here
   ```

4. **Deploy**:
   ```bash
   git add .
   git commit -m "Deploy admin server"
   git push heroku main
   ```

### Option 3: DigitalOcean App Platform
**Best for**: Cost-effective, scalable

1. **Create App**:
   - Go to DigitalOcean App Platform
   - Connect GitHub repository
   - Select Node.js runtime

2. **Configure**:
   - Source Directory: `melit-trade`
   - Build Command: `npm install`
   - Run Command: `npm run server:prod`

### Option 4: VPS with PM2
**Best for**: Full control, cost-effective

1. **Server Setup** (Ubuntu/Debian):
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2 globally
   sudo npm install -g pm2
   
   # Install Nginx
   sudo apt install nginx -y
   ```

2. **Deploy Application**:
   ```bash
   # Clone repository
   git clone https://github.com/yourusername/melit-trade.git
   cd melit-trade
   
   # Install dependencies
   npm install
   
   # Build React app
   npm run build
   
   # Start with PM2
   pm2 start server/server.js --name "melit-trade-admin"
   pm2 save
   pm2 startup
   ```

## 🔧 Production Server Configuration

### 1. Update Server Configuration

Create `server/config/production.js`:
```javascript
module.exports = {
  port: process.env.PORT || 5000,
  cors: {
    origin: [
      'https://your-frontend-domain.com',
      'https://melit-trade.vercel.app',
      'http://localhost:3000' // For local development
    ],
    credentials: true,
    optionsSuccessStatus: 200
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret-key',
    expiresIn: '24h'
  },
  uploads: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  }
};
```

### 2. Update Package.json Scripts

Add these scripts to `package.json`:
```json
{
  "scripts": {
    "server:prod": "NODE_ENV=production node --max-http-header-size=32768 server/server.js",
    "server:dev": "NODE_ENV=development nodemon server/server.js",
    "build:server": "npm install --production",
    "start:server": "npm run server:prod"
  }
}
```

### 3. Environment Variables

Create `.env.production`:
```env
NODE_ENV=production
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
CORS_ORIGIN=https://your-frontend-domain.com
```

## 🌐 Frontend Configuration

### Update API Endpoints

In your React app, update API calls to point to your deployed server:

```javascript
// In your API service files
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-server-domain.com' 
  : 'http://localhost:5000';

// Example usage
const response = await fetch(`${API_BASE_URL}/api/products`, {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  },
  credentials: 'omit'
});
```

### Environment Variables for Frontend

Create `.env.production` in your React app:
```env
REACT_APP_API_URL=https://your-server-domain.com
REACT_APP_ENV=production
```

## 🔒 Security Considerations

### 1. CORS Configuration
Update CORS to only allow your frontend domains:
```javascript
app.use(cors({
  origin: [
    'https://your-frontend-domain.com',
    'https://melit-trade.vercel.app'
  ],
  credentials: true,
  optionsSuccessStatus: 200
}));
```

### 2. Rate Limiting
Add rate limiting to prevent abuse:
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api', limiter);
```

### 3. Helmet Security Headers
```bash
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

## 📊 Monitoring and Logging

### 1. PM2 Monitoring (for VPS)
```bash
# Monitor processes
pm2 monit

# View logs
pm2 logs melit-trade-admin

# Restart if needed
pm2 restart melit-trade-admin
```

### 2. Health Check Endpoint
Add to your server:
```javascript
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

## 🚀 Deployment Checklist

### Before Deployment:
- [ ] Update CORS origins to production domains
- [ ] Set strong JWT secret
- [ ] Configure environment variables
- [ ] Test admin panel locally
- [ ] Build React app for production

### After Deployment:
- [ ] Test admin login functionality
- [ ] Verify file uploads work
- [ ] Check API endpoints respond correctly
- [ ] Test CORS with frontend
- [ ] Monitor server logs
- [ ] Set up monitoring/alerting

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Check CORS configuration
   - Verify frontend domain is in allowed origins

2. **File Upload Issues**:
   - Check file size limits
   - Verify upload directory permissions

3. **Database/File Storage**:
   - Ensure data persistence (use external storage for production)
   - Consider using cloud storage for uploads

4. **Memory Issues**:
   - Monitor server memory usage
   - Consider upgrading server resources

## 💰 Cost Comparison

| Platform | Free Tier | Paid Plans | Best For |
|----------|-----------|------------|----------|
| Railway | 500 hours/month | $5/month | Easy deployment |
| Heroku | 550-1000 hours/month | $7/month | Reliability |
| DigitalOcean | $5/month | $5-12/month | Cost-effective |
| VPS | $5-10/month | $5-50/month | Full control |

## 📞 Support

If you encounter issues:
1. Check server logs
2. Verify environment variables
3. Test API endpoints directly
4. Check CORS configuration
5. Ensure all dependencies are installed

Remember to keep your JWT secret secure and never commit it to version control!
