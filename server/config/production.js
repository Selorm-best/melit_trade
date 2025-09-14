module.exports = {
  port: process.env.PORT || 5000,
  cors: {
    origin: [
      'https://melit-trade.vercel.app',
      'https://melit-trade-git-main-yourusername.vercel.app',
      'https://melit-trade-git-develop-yourusername.vercel.app',
      'http://localhost:3000', // For local development
      'http://localhost:5000'  // For local development
    ],
    credentials: true,
    optionsSuccessStatus: 200
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret-key-change-in-production',
    expiresIn: '24h'
  },
  uploads: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    destination: 'public/uploads'
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
  },
  security: {
    helmet: true,
    trustProxy: true
  }
};