# Melit Trade - Deployment Guide

This guide covers deploying the Melit Trade application with admin CMS functionality.

## 🚀 Deployment Options

### Option 1: Vercel + Railway (Recommended)
- **Frontend**: Vercel (React app)
- **Backend**: Railway (Node.js API)
- **File Storage**: Cloudinary or AWS S3

### Option 2: Netlify + Heroku
- **Frontend**: Netlify (React app)
- **Backend**: Heroku (Node.js API)
- **File Storage**: Cloudinary or AWS S3

### Option 3: Full VPS Deployment
- **Server**: DigitalOcean, AWS EC2, or Linode
- **Database**: MongoDB Atlas or PostgreSQL
- **File Storage**: Local or AWS S3

## 📋 Pre-Deployment Checklist

### 1. Environment Variables
Create a `.env` file with the following variables:

```env
# Environment Configuration
NODE_ENV=production
PORT=5000

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
JWT_EXPIRES_IN=24h

# Admin Credentials (change these in production)
ADMIN_EMAIL=admin@melittrade.com
ADMIN_PASSWORD=admin123

# CORS Configuration
CORS_ORIGIN=https://yourdomain.com

# File Upload Configuration
MAX_FILE_SIZE=5242880

# Security Settings
BCRYPT_ROUNDS=12
SESSION_SECRET=your-session-secret-here
```

### 2. Security Updates
- Change default admin credentials
- Generate strong JWT secret
- Update CORS origins
- Enable HTTPS

### 3. Database Setup
- Set up MongoDB Atlas or PostgreSQL
- Migrate JSON data to database
- Configure connection strings

## 🛠️ Deployment Steps

### Step 1: Prepare the Application

1. **Install dependencies**:
```bash
npm install
```

2. **Build the React app**:
```bash
npm run build
```

3. **Test locally**:
```bash
npm run server
```

### Step 2: Deploy Backend (Railway/Heroku)

1. **Create account** on Railway or Heroku
2. **Connect your repository**
3. **Set environment variables**
4. **Deploy**

### Step 3: Deploy Frontend (Vercel/Netlify)

1. **Create account** on Vercel or Netlify
2. **Connect your repository**
3. **Set build settings**:
   - Build command: `npm run build`
   - Publish directory: `build`
4. **Set environment variables**:
   - `REACT_APP_API_URL`: Your backend URL
5. **Deploy**

## 🔧 Production Configuration

### Server Configuration
Update `server/server.js` for production:

```javascript
// Production CORS settings
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://yourdomain.com',
  credentials: true,
  optionsSuccessStatus: 200
}));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});
```

### Database Migration
Convert JSON files to database:

1. **Set up MongoDB Atlas**
2. **Create collections**: products, team, partners, testimonials, deals, blog, home
3. **Import JSON data**
4. **Update dataStore utility**

## 📁 File Storage Options

### Option 1: Cloudinary (Recommended)
- Free tier available
- Automatic image optimization
- CDN delivery

### Option 2: AWS S3
- Scalable storage
- Cost-effective
- Integration with CloudFront

### Option 3: Local Storage (VPS only)
- Store in `/uploads` directory
- Regular backups required
- Not suitable for serverless

## 🔐 Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **HTTPS**: Always use SSL certificates
3. **Admin Access**: Use strong passwords
4. **File Uploads**: Validate file types and sizes
5. **Rate Limiting**: Implement API rate limiting
6. **Backup**: Regular database backups

## 📊 Monitoring & Maintenance

1. **Logging**: Set up application logging
2. **Monitoring**: Use services like Sentry for error tracking
3. **Backup**: Regular data backups
4. **Updates**: Keep dependencies updated
5. **Performance**: Monitor API response times

## 🚨 Troubleshooting

### Common Issues:
1. **CORS errors**: Check CORS_ORIGIN setting
2. **File uploads**: Verify file storage configuration
3. **Admin login**: Check JWT secret and credentials
4. **Build failures**: Verify Node.js version compatibility

### Support:
- Check server logs for errors
- Verify environment variables
- Test API endpoints individually
- Check file permissions (VPS deployment)

## 📞 Post-Deployment

1. **Test all functionality**
2. **Verify admin CMS access**
3. **Test file uploads**
4. **Check mobile responsiveness**
5. **Set up monitoring**
6. **Configure backups**

---

For specific platform deployment instructions, see the detailed guides below.



