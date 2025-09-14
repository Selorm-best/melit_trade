# Vercel + Railway Deployment Guide

This guide covers deploying Melit Trade using Vercel for the frontend and Railway for the backend.

## 🎯 Architecture Overview

- **Frontend**: Vercel (React app)
- **Backend**: Railway (Node.js API)
- **File Storage**: Cloudinary (recommended)

## 📋 Prerequisites

- GitHub repository with your code
- Vercel account
- Railway account
- Cloudinary account (for file storage)

## 🚀 Step 1: Deploy Backend to Railway

### 1.1 Create Railway Project

1. Go to [Railway.app](https://railway.app)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository

### 1.2 Configure Railway Settings

1. **Set Build Command**: `npm install`
2. **Set Start Command**: `node server/server.prod.js`
3. **Set Root Directory**: `/` (or leave empty)

### 1.3 Set Environment Variables

In Railway dashboard, add these environment variables:

```env
NODE_ENV=production
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your-secure-password
CORS_ORIGIN=https://yourdomain.vercel.app
MAX_FILE_SIZE=5242880
BCRYPT_ROUNDS=12
SESSION_SECRET=your-session-secret
```

### 1.4 Deploy

1. Click "Deploy"
2. Wait for deployment to complete
3. Copy the generated URL (e.g., `https://your-app.railway.app`)

## 🎨 Step 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Project

1. Go to [Vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your repository

### 2.2 Configure Build Settings

1. **Framework Preset**: Create React App
2. **Build Command**: `npm run build`
3. **Output Directory**: `build`
4. **Install Command**: `npm install`

### 2.3 Set Environment Variables

In Vercel dashboard, add these environment variables:

```env
REACT_APP_API_URL=https://your-app.railway.app
```

### 2.4 Deploy

1. Click "Deploy"
2. Wait for deployment to complete
3. Copy the generated URL (e.g., `https://your-app.vercel.app`)

## 🔧 Step 3: Configure File Storage (Cloudinary)

### 3.1 Set up Cloudinary

1. Go to [Cloudinary.com](https://cloudinary.com)
2. Create a free account
3. Get your Cloud Name, API Key, and API Secret

### 3.2 Update Backend for Cloudinary

Add Cloudinary environment variables to Railway:

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 3.3 Install Cloudinary SDK

Add to your package.json:

```json
{
  "dependencies": {
    "cloudinary": "^1.40.0",
    "multer-storage-cloudinary": "^4.0.0"
  }
}
```

## 🔄 Step 4: Update CORS and API URLs

### 4.1 Update Backend CORS

Update your Railway environment variable:

```env
CORS_ORIGIN=https://your-app.vercel.app
```

### 4.2 Redeploy

Redeploy both Railway and Vercel to apply changes.

## ✅ Step 5: Test Deployment

1. **Test Frontend**: Visit your Vercel URL
2. **Test Admin CMS**: Visit `https://your-app.vercel.app/admin`
3. **Test API**: Check `https://your-app.railway.app/health`
4. **Test File Upload**: Try uploading an image in admin

## 🔐 Step 6: Security & Production Setup

### 6.1 Custom Domain (Optional)

1. **Vercel**: Add custom domain in project settings
2. **Railway**: Add custom domain in project settings
3. **Update CORS**: Update CORS_ORIGIN with your custom domain

### 6.2 SSL Certificates

Both Vercel and Railway provide automatic SSL certificates.

### 6.3 Environment Variables Security

- Never commit `.env` files
- Use strong, unique secrets
- Rotate secrets regularly

## 📊 Step 7: Monitoring & Maintenance

### 7.1 Set up Monitoring

- **Vercel**: Built-in analytics
- **Railway**: Built-in metrics
- **Error Tracking**: Consider Sentry

### 7.2 Backup Strategy

- **Database**: Regular backups (if using external DB)
- **Files**: Cloudinary provides backup
- **Code**: GitHub provides version control

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors**: Check CORS_ORIGIN environment variable
2. **File Upload Fails**: Verify Cloudinary configuration
3. **Admin Login Issues**: Check JWT_SECRET and admin credentials
4. **Build Failures**: Check Node.js version compatibility

### Debug Steps:

1. Check Railway logs for backend errors
2. Check Vercel function logs
3. Verify environment variables
4. Test API endpoints individually

## 📈 Scaling Considerations

- **Vercel**: Automatic scaling
- **Railway**: Upgrade plan for higher limits
- **Cloudinary**: Upgrade plan for more storage/bandwidth
- **Database**: Consider external database for high traffic

---

## 🎉 You're Done!

Your Melit Trade application is now deployed with:
- ✅ Professional hosting
- ✅ Automatic SSL
- ✅ Global CDN
- ✅ Admin CMS functionality
- ✅ File upload capabilities
- ✅ Production-ready security


