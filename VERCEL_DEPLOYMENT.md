# 🚀 Vercel Deployment Guide for Melit Trade

This guide covers deploying your React frontend to Vercel while keeping the admin server separate.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI**: Install globally
   ```bash
   npm install -g vercel
   ```

## 🎯 Deployment Strategy

- **Frontend (React)**: Deploy to Vercel
- **Backend (Admin Server)**: Deploy to Railway/Heroku/VPS
- **API Communication**: Frontend calls backend APIs

## 🚀 Step 1: Deploy Backend Server First

### Option A: Railway (Recommended)
```bash
cd melit-trade
npm install -g @railway/cli
railway login
railway up
```

### Option B: Heroku
```bash
cd melit-trade
heroku login
heroku create melit-trade-admin
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=$(openssl rand -base64 32)
git add .
git commit -m "Deploy admin server"
git push heroku main
```

**Note your backend URL** (e.g., `https://melit-trade-admin.herokuapp.com`)

## 🎨 Step 2: Deploy Frontend to Vercel

### Method 1: Vercel CLI (Recommended)

1. **Login to Vercel**:
   ```bash
   vercel login
   ```

2. **Deploy**:
   ```bash
   cd melit-trade
   vercel
   ```

3. **Follow the prompts**:
   - Link to existing project? **No**
   - Project name: `melit-trade`
   - Directory: `./`
   - Override settings? **No**

4. **Set Environment Variables**:
   ```bash
   vercel env add REACT_APP_API_URL
   # Enter your backend URL when prompted
   ```

### Method 2: Vercel Dashboard

1. **Connect GitHub**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**:
   - Framework Preset: **Create React App**
   - Root Directory: `melit-trade`
   - Build Command: `npm run build`
   - Output Directory: `build`

3. **Set Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add: `REACT_APP_API_URL` = `https://your-backend-url.com`

## 🔧 Step 3: Update API Configuration

### Update API Service Files

Create `src/config/api.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {
    products: `${API_BASE_URL}/api/products`,
    home: `${API_BASE_URL}/api/home`,
    team: `${API_BASE_URL}/api/team`,
    partners: `${API_BASE_URL}/api/partners`,
    blog: `${API_BASE_URL}/api/blog`,
    admin: `${API_BASE_URL}/admin`
  }
};

export default apiConfig;
```

### Update Your API Calls

Replace hardcoded URLs in your components:

```javascript
// Before
const response = await fetch('/api/products');

// After
import { apiConfig } from '../config/api';
const response = await fetch(apiConfig.endpoints.products);
```

## 🌐 Step 4: Configure CORS

Update your backend server CORS configuration to include your Vercel domain:

```javascript
// In server/config/production.js
cors: {
  origin: [
    'https://melit-trade.vercel.app',
    'https://melit-trade-git-main-yourusername.vercel.app',
    'https://melit-trade-git-develop-yourusername.vercel.app',
    'http://localhost:3000' // For local development
  ],
  credentials: true,
  optionsSuccessStatus: 200
}
```

## 🔄 Step 5: Continuous Deployment

### Automatic Deployments
- **Production**: Deploys from `main` branch
- **Preview**: Deploys from other branches
- **Local**: `vercel dev` for local development

### Environment Variables
Set different values for different environments:

```bash
# Production
vercel env add REACT_APP_API_URL production
# Enter: https://your-production-backend.com

# Preview
vercel env add REACT_APP_API_URL preview
# Enter: https://your-staging-backend.com

# Development
vercel env add REACT_APP_API_URL development
# Enter: http://localhost:5000
```

## 📊 Step 6: Monitoring and Analytics

### Vercel Analytics
1. Enable Vercel Analytics in your project dashboard
2. Add to your app:
   ```bash
   npm install @vercel/analytics
   ```

```javascript
// In src/index.js
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

### Performance Monitoring
- Use Vercel's built-in performance insights
- Monitor Core Web Vitals
- Track API response times

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Check CORS configuration in backend
   - Ensure Vercel domain is in allowed origins

2. **API Calls Failing**:
   - Verify `REACT_APP_API_URL` environment variable
   - Check network tab in browser dev tools

3. **Build Failures**:
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`

4. **Environment Variables Not Working**:
   - Redeploy after adding environment variables
   - Check variable names (must start with `REACT_APP_`)

## 🚀 Quick Deploy Commands

```bash
# Deploy to Vercel
vercel

# Deploy with production environment
vercel --prod

# Deploy specific branch
vercel --target production

# Check deployment status
vercel ls

# View logs
vercel logs
```

## 📈 Performance Optimization

### Vercel Optimizations:
1. **Image Optimization**: Use `next/image` or Vercel's image optimization
2. **Edge Functions**: For serverless functions
3. **CDN**: Automatic global CDN
4. **Caching**: Automatic caching for static assets

### React Optimizations:
1. **Code Splitting**: Use React.lazy() for route-based splitting
2. **Bundle Analysis**: Use `npm run build` and analyze bundle
3. **Lazy Loading**: Implement lazy loading for images and components

## 🔒 Security Considerations

1. **Environment Variables**: Never commit sensitive data
2. **API Keys**: Store in Vercel environment variables
3. **CORS**: Properly configure CORS for your domain
4. **HTTPS**: Vercel provides automatic HTTPS

## 💰 Cost

- **Vercel**: Free tier available, $20/month for Pro
- **Backend**: $5-10/month (Railway/Heroku/VPS)
- **Total**: $5-30/month depending on usage

## 🎉 You're Done!

Your Melit Trade website is now deployed with:
- ✅ React frontend on Vercel
- ✅ Admin server on Railway/Heroku
- ✅ Automatic deployments
- ✅ Global CDN
- ✅ HTTPS enabled
- ✅ Performance monitoring

Visit your Vercel dashboard to manage deployments and monitor performance!
