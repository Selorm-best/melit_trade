# 🔧 Deployment Troubleshooting Guide

## Common Errors and Solutions

### Error: "Cannot read properties of undefined (reading 'fsPath')"

This error typically occurs due to file system path issues. Here are the solutions:

#### Solution 1: Use the Fixed Server
```bash
# Replace your server.js with the fixed version
cp server/server.fixed.js server/server.js
```

#### Solution 2: Check File Structure
Ensure your project has the correct structure:
```
melit-trade/
├── server/
│   ├── server.js
│   ├── routes/
│   ├── views/
│   ├── data/
│   └── public/
│       └── uploads/
├── build/          # Created by npm run build
├── public/
└── src/
```

#### Solution 3: Create Missing Directories
```bash
mkdir -p server/public/uploads
mkdir -p server/data
mkdir -p server/views
```

#### Solution 4: Build React App First
```bash
npm run build
```

### Error: "Build files not found"

**Cause**: React build files are missing.

**Solution**:
```bash
npm run build
```

### Error: "Port already in use"

**Cause**: Another process is using the same port.

**Solution**:
```bash
# Find and kill the process
lsof -ti:5000 | xargs kill -9

# Or use a different port
PORT=3001 npm run server
```

### Error: "Permission denied"

**Cause**: Insufficient file permissions.

**Solution**:
```bash
# Fix permissions
chmod -R 755 server/
chmod -R 755 build/
```

### Error: "Module not found"

**Cause**: Missing dependencies.

**Solution**:
```bash
npm install
```

## Platform-Specific Issues

### Railway Deployment

#### Issue: Build fails
**Solution**:
1. Check `railway.json` configuration
2. Ensure all dependencies are in `package.json`
3. Check build logs in Railway dashboard

#### Issue: Environment variables not working
**Solution**:
1. Set variables in Railway dashboard
2. Redeploy after adding variables
3. Check variable names (case-sensitive)

### Heroku Deployment

#### Issue: "App crashed"
**Solution**:
1. Check Heroku logs: `heroku logs --tail`
2. Ensure `Procfile` is correct
3. Check if all dependencies are in `package.json`

#### Issue: "Buildpack detection failed"
**Solution**:
```bash
heroku buildpacks:set heroku/nodejs
```

### Vercel Deployment

#### Issue: "Build failed"
**Solution**:
1. Check `vercel.json` configuration
2. Ensure build command is correct
3. Check environment variables

#### Issue: "Function timeout"
**Solution**:
1. Optimize your code
2. Use Vercel's Pro plan for longer timeouts
3. Consider moving heavy operations to external services

## Quick Fixes

### 1. Reset Everything
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build

# Test locally
npm run server
```

### 2. Check File Permissions
```bash
# Make sure all files are readable
chmod -R 644 .
chmod +x scripts/*.sh
```

### 3. Verify Environment Variables
```bash
# Check if variables are set
echo $NODE_ENV
echo $PORT
echo $JWT_SECRET
```

### 4. Test API Endpoints
```bash
# Test health endpoint
curl http://localhost:5000/health

# Test API endpoints
curl http://localhost:5000/api/products
```

## Debugging Steps

### 1. Check Server Logs
```bash
# Local development
npm run server

# Production (Railway)
railway logs

# Production (Heroku)
heroku logs --tail
```

### 2. Test Locally First
```bash
# Build React app
npm run build

# Start server
npm run server

# Test in browser
open http://localhost:5000
```

### 3. Check File Paths
```javascript
// Add this to your server.js for debugging
console.log('__dirname:', __dirname);
console.log('Build path:', path.join(__dirname, '../build'));
console.log('Build exists:', fs.existsSync(path.join(__dirname, '../build')));
```

### 4. Verify Dependencies
```bash
# Check if all dependencies are installed
npm list

# Check for vulnerabilities
npm audit
```

## Common Deployment Checklist

### Before Deployment:
- [ ] Run `npm run build` successfully
- [ ] Test server locally with `npm run server`
- [ ] Check all environment variables are set
- [ ] Verify file permissions
- [ ] Test API endpoints

### After Deployment:
- [ ] Check deployment logs
- [ ] Test health endpoint
- [ ] Verify environment variables
- [ ] Test admin panel functionality
- [ ] Check CORS configuration

## Getting Help

If you're still having issues:

1. **Check the logs** - Most errors are visible in the deployment logs
2. **Test locally first** - Make sure everything works locally
3. **Check the documentation** - Each platform has specific requirements
4. **Use the fixed server** - The `server.fixed.js` handles most common issues

## Emergency Rollback

If deployment fails:

1. **Railway**: Use the dashboard to rollback to previous deployment
2. **Heroku**: `heroku rollback`
3. **Vercel**: Use the dashboard to revert to previous deployment

Remember: Always test locally before deploying!
