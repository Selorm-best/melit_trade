// Production configuration
module.exports = {
  // Server settings
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'production',
  
  // Security settings
  cors: {
    origin: process.env.CORS_ORIGIN || 'https://yourdomain.com',
    credentials: true,
    optionsSuccessStatus: 200
  },
  
  // JWT settings
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },
  
  // File upload settings
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
    uploadPath: process.env.UPLOAD_PATH || './public/uploads'
  },
  
  // Database settings (for future database integration)
  database: {
    url: process.env.DATABASE_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  
  // Email settings
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  },
  
  // Admin settings
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@melittrade.com',
    password: process.env.ADMIN_PASSWORD || 'admin123'
  },
  
  // Logging settings
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    enableConsole: process.env.NODE_ENV !== 'production'
  }
};
