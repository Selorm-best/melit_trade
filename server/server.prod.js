const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
require('dotenv').config();

const config = require('./config/production');

const app = express();
const PORT = config.port;

// Security middleware
if (config.security.helmet) {
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://code.jquery.com"],
        connectSrc: ["'self'"]
      }
    }
  }));
}

// Trust proxy for accurate IP addresses
if (config.security.trustProxy) {
  app.set('trust proxy', 1);
}

// Compression middleware
app.use(compression());

// Rate limiting
const limiter = rateLimit(config.rateLimit);
app.use('/api', limiter);

// CORS configuration
app.use(cors(config.cors));

// Custom middleware to handle large headers gracefully
app.use((req, res, next) => {
  const headerSize = JSON.stringify(req.headers).length;
  if (headerSize > 8192) {
    console.log(`Large header detected: ${headerSize} bytes from IP: ${req.ip}`);
  }
  next();
});

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Static assets
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use(express.static(path.join(__dirname, '../build')));

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

// Import routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');

// Routes
app.use('/admin', authRoutes);
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error occurred:', err.message);
  console.error('Stack trace:', err.stack);
  console.error('Request IP:', req.ip);
  console.error('Request URL:', req.url);
  
  // Handle specific error types
  if (err.code === 'HPE_HEADER_OVERFLOW' || err.status === 431) {
    console.error('Header size too large error detected');
    return res.status(431).json({ 
      error: 'Request header fields too large',
      message: 'Please clear your browser cookies and try again'
    });
  }
  
  // Handle file upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      error: 'File too large',
      message: 'File size exceeds the maximum allowed limit'
    });
  }
  
  // Handle rate limit errors
  if (err.status === 429) {
    return res.status(429).json({
      error: 'Too many requests',
      message: 'Rate limit exceeded. Please try again later.'
    });
  }
  
  // Default error response
  const statusCode = err.status || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Something went wrong!' 
    : err.message;
    
  res.status(statusCode).json({
    error: 'Internal Server Error',
    message: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
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

// Start server with increased header size limit
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Admin panel: http://localhost:${PORT}/admin`);
  console.log(`🔗 API endpoints: http://localhost:${PORT}/api`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});

// Increase HTTP header size limit to prevent 431 errors
server.maxHeadersCount = 2000;

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

module.exports = app;