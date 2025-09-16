# 🚀 Quick Server Deployment Guide

## Option 1: Railway (Easiest - 5 minutes)

1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and Deploy**:
   ```bash
   cd melit-trade
   railway login
   railway up
   ```

3. **Set Environment Variables** in Railway dashboard:
   - `NODE_ENV=production`
   - `JWT_SECRET=your-secret-key-here`

4. **Done!** Your server will be live at the provided URL.

## Option 2: Heroku (Reliable - 10 minutes)

1. **Install Heroku CLI**:
   - Download from [heroku.com](https://devcenter.heroku.com/articles/heroku-cli)

2. **Deploy**:
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

3. **Done!** Your server will be at `https://melit-trade-admin.herokuapp.com`

## Option 3: Use the Deploy Script

```bash
cd melit-trade
chmod +x scripts/deploy-server.sh
./scripts/deploy-server.sh
```

## After Deployment

1. **Update Frontend API URL**:
   - In your React app, update API calls to use your server URL
   - Example: `https://your-server.railway.app/api/products`

2. **Test Admin Panel**:
   - Visit `https://your-server-url.com/admin`
   - Login with your admin credentials
   - Test creating/editing content

3. **Update CORS** (if needed):
   - Add your frontend domain to the CORS origins in `server/config/production.js`

## Environment Variables Needed

```env
NODE_ENV=production
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-here
```

## Troubleshooting

- **CORS Errors**: Update CORS origins in production config
- **File Upload Issues**: Check file size limits and permissions
- **Database Issues**: Ensure data persistence (Railway/Heroku handle this automatically)

## Cost

- **Railway**: Free tier available, $5/month for paid
- **Heroku**: Free tier available, $7/month for paid
- **VPS**: $5-10/month

Choose the option that works best for you!

