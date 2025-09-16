const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000', 'https://melit-trade.com','https://melittrade-8fyc.onrender.com'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Custom middleware to handle large headers gracefully
app.use((req, res, next) => {
  // Log header size for debugging
  const headerSize = JSON.stringify(req.headers).length;
  if (headerSize > 8192) { // 8KB
    console.log(`Large header detected: ${headerSize} bytes`);
  }
  next();
});

// Increase header size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Static assets
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Serve React build only if it exists (backend can run standalone)
const buildDir = path.join(__dirname, '../build');
const buildIndexPath = path.join(buildDir, 'index.html');
const hasBuild = fs.existsSync(buildIndexPath);
if (hasBuild) {
  app.use(express.static(buildDir));
}

// Set EJS as templating engine for admin panel
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');

// Routes
app.use('/admin', authRoutes);
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

// Serve React app for all other routes when build is present
if (hasBuild) {
  app.get('*', (req, res) => {
    res.sendFile(buildIndexPath);
  });
} else {
  // Health/info route for backend-only deployments
  app.get('/', (req, res) => {
    res.json({ status: 'OK', service: 'melit-trade-backend', build: false });
  });
}

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
  
  res.status(500).render('error', { error: 'Something went wrong!' });
});

// Start server with increased header size limit
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
  console.log(`API endpoints: http://localhost:${PORT}/api`);
});

// Increase HTTP header size limit to prevent 431 errors
server.maxHeadersCount = 2000; // Increase max headers count

module.exports = app;
