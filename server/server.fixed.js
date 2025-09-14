const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure required directories exist
const ensureDirectories = () => {
  const dirs = [
    path.join(__dirname, 'public', 'uploads'),
    path.join(__dirname, 'data'),
    path.join(__dirname, 'views')
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });
};

// Initialize directories
ensureDirectories();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://melit-trade.vercel.app',
        'https://melit-trade-git-main-yourusername.vercel.app',
        'https://melit-trade-git-develop-yourusername.vercel.app',
        'http://localhost:3000'
      ]
    : ['http://localhost:3000', 'http://localhost:5000'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Custom middleware to handle large headers gracefully
app.use((req, res, next) => {
  const headerSize = JSON.stringify(req.headers).length;
  if (headerSize > 8192) {
    console.log(`Large header detected: ${headerSize} bytes`);
  }
  next();
});

// Increase header size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Static assets with error handling
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Serve React app with error handling
const buildPath = path.join(__dirname, '../build');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
} else {
  console.warn('Build directory not found. Make sure to run "npm run build" first.');
}

// Set EJS as templating engine for admin panel
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Import routes with error handling
let authRoutes, adminRoutes, apiRoutes;

try {
  authRoutes = require('./routes/auth');
  adminRoutes = require('./routes/admin');
  apiRoutes = require('./routes/api');
} catch (error) {
  console.error('Error loading routes:', error.message);
  // Create basic routes if files don't exist
  authRoutes = express.Router();
  adminRoutes = express.Router();
  apiRoutes = express.Router();
  
  // Basic API route
  apiRoutes.get('/products', (req, res) => {
    res.json([]);
  });
  
  apiRoutes.get('/home', (req, res) => {
    res.json({ hero: null });
  });
  
  apiRoutes.get('/team', (req, res) => {
    res.json([]);
  });
  
  apiRoutes.get('/partners', (req, res) => {
    res.json([]);
  });
  
  apiRoutes.get('/blog', (req, res) => {
    res.json([]);
  });
  
  apiRoutes.get('/blog/featured', (req, res) => {
    res.json([]);
  });
}

// Routes
app.use('/admin', authRoutes);
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

// Serve React app for all other routes with error handling
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../build/index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({
      error: 'Build files not found',
      message: 'Please run "npm run build" to create the React build files',
      path: indexPath
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error occurred:', err.message);
  console.error('Stack trace:', err.stack);
  
  // Handle specific error types
  if (err.code === 'HPE_HEADER_OVERFLOW' || err.status === 431) {
    console.error('Header size too large error detected');
    return res.status(431).json({ 
      error: 'Request header fields too large',
      message: 'Please clear your browser cookies and try again'
    });
  }
  
  // Handle file system errors
  if (err.code === 'ENOENT') {
    console.error('File not found:', err.path);
    return res.status(404).json({
      error: 'File not found',
      message: 'The requested file does not exist'
    });
  }
  
  // Handle permission errors
  if (err.code === 'EACCES') {
    console.error('Permission denied:', err.path);
    return res.status(403).json({
      error: 'Permission denied',
      message: 'Insufficient permissions to access the requested resource'
    });
  }
  
  // Default error response
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong!' 
      : err.message
  });
});

// Start server with error handling
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Admin panel: http://localhost:${PORT}/admin`);
  console.log(`🔗 API endpoints: http://localhost:${PORT}/api`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});

// Increase HTTP header size limit
server.maxHeadersCount = 2000;

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please use a different port.`);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

module.exports = app;
