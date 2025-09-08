const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { checkAuth } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /admin - Render login page
 * Redirects to dashboard if already authenticated
 */
router.get('/', checkAuth, (req, res) => {
  res.render('login', { 
    title: 'Admin Login',
    error: req.query.error || null
  });
});

/**
 * POST /admin/login - Handle admin login
 * Validates credentials and sets JWT cookie
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ 
        error: 'Username and password are required' 
      });
    }

    // Check credentials against environment variables
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPasswordHash = process.env.ADMIN_PASSWORD;

    if (username !== adminUsername) {
      return res.status(401).json({ 
        error: 'Invalid credentials' 
      });
    }

    // Verify password hash
    const isValidPassword = await bcrypt.compare(password, adminPasswordHash);
    
    if (!isValidPassword) {
      return res.status(401).json({ 
        error: 'Invalid credentials' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // Set HTTP-only cookie
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.json({ success: true, redirect: '/admin/dashboard' });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /admin/logout - Handle admin logout
 * Clears JWT cookie and redirects to login
 */
router.post('/logout', (req, res) => {
  res.clearCookie('adminToken');
  res.json({ success: true, redirect: '/admin' });
});

module.exports = router;


