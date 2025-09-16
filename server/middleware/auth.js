const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT token from HTTP-only cookie
 * Protects admin routes from unauthorized access
 */
const authenticateToken = (req, res, next) => {
  const token = req.cookies.adminToken;

  if (!token) {
    return res.redirect('/admin');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      res.clearCookie('adminToken');
      return res.redirect('/admin');
    }
    
    req.user = user;
    next();
  });
};

/**
 * Middleware to check if user is already authenticated
 * Redirects to dashboard if already logged in
 */
const checkAuth = (req, res, next) => {
  const token = req.cookies.adminToken;

  // If no token, proceed to login
  if (!token) {
    return next();
  }

  // Verify token; redirect if valid, otherwise continue to login
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next();
    }
    return res.redirect('/admin/dashboard');
  });
};

module.exports = { authenticateToken, checkAuth };

