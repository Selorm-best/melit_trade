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

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (!err) {
        return res.redirect('/admin/dashboard');
      }
    });
  }
  
  next();
};

module.exports = { authenticateToken, checkAuth };

