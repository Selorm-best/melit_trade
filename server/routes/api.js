const express = require('express');
const { readData } = require('../utils/dataStore');

const router = express.Router();

/**
 * GET /api/team - Get all team members
 * Public endpoint for frontend to fetch team data
 */
router.get('/team', async (req, res) => {
  try {
    const team = await readData('team.json');
    res.json(team);
  } catch (error) {
    console.error('API Error - Team:', error);
    res.status(500).json({ error: 'Failed to fetch team data' });
  }
});

/**
 * GET /api/partners - Get all partners
 * Public endpoint for frontend to fetch partners data
 */
router.get('/partners', async (req, res) => {
  try {
    const partners = await readData('partners.json');
    res.json(partners);
  } catch (error) {
    console.error('API Error - Partners:', error);
    res.status(500).json({ error: 'Failed to fetch partners data' });
  }
});

/**
 * GET /api/testimonials - Get all testimonials
 * Public endpoint for frontend to fetch testimonials data
 */
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await readData('testimonials.json');
    res.json(testimonials);
  } catch (error) {
    console.error('API Error - Testimonials:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials data' });
  }
});

/**
 * GET /api/deal - Get the first active deal
 * Public endpoint for frontend to fetch current deal of the week
 */
router.get('/deal', async (req, res) => {
  try {
    const deals = await readData('deals.json');
    const activeDeal = deals.find(deal => deal.active === true);
    
    if (!activeDeal) {
      return res.json(null);
    }
    
    res.json(activeDeal);
  } catch (error) {
    console.error('API Error - Deal:', error);
    res.status(500).json({ error: 'Failed to fetch deal data' });
  }
});

/**
 * GET /api/deals - Get all deals (for admin use)
 * Public endpoint for frontend to fetch all deals
 */
router.get('/deals', async (req, res) => {
  try {
    const deals = await readData('deals.json');
    res.json(deals);
  } catch (error) {
    console.error('API Error - Deals:', error);
    res.status(500).json({ error: 'Failed to fetch deals data' });
  }
});

/**
 * GET /api/products - Get all products
 */
router.get('/products', async (req, res) => {
  try {
    console.log('Products API endpoint called');
    console.log('Request headers:', req.headers);
    const products = await readData('products.json');
    console.log('Products loaded:', products.length, 'items');
    res.json(products);
  } catch (error) {
    console.error('API Error - Products:', error);
    res.status(500).json({ error: 'Failed to fetch products data' });
  }
});

/**
 * GET /api/home - Get home page editable content
 */
router.get('/home', async (req, res) => {
  try {
    const home = await readData('home.json');
    res.json(home);
  } catch (error) {
    console.error('API Error - Home:', error);
    res.status(500).json({ error: 'Failed to fetch home content' });
  }
});

/**
 * GET /api/blog - Get all published blog posts
 * Public endpoint for frontend to fetch blog data
 */
router.get('/blog', async (req, res) => {
  try {
    const blogs = await readData('blog.json');
    // Only return published posts
    const publishedBlogs = blogs.filter(blog => blog.published === true);
    res.json(publishedBlogs);
  } catch (error) {
    console.error('API Error - Blog:', error);
    res.status(500).json({ error: 'Failed to fetch blog data' });
  }
});

/**
 * GET /api/blog/:id - Get a specific blog post by ID
 * Public endpoint for frontend to fetch individual blog post
 */
router.get('/blog/:id', async (req, res) => {
  try {
    const blogs = await readData('blog.json');
    const blogId = parseInt(req.params.id);
    const blog = blogs.find(b => b.id === blogId && b.published === true);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    res.json(blog);
  } catch (error) {
    console.error('API Error - Blog Detail:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

/**
 * GET /api/blog/featured - Get featured blog posts
 * Public endpoint for frontend to fetch featured blog posts
 */
router.get('/blog/featured', async (req, res) => {
  try {
    const blogs = await readData('blog.json');
    // Only return published and featured posts
    const featuredBlogs = blogs.filter(blog => blog.published === true && blog.featured === true);
    res.json(featuredBlogs);
  } catch (error) {
    console.error('API Error - Featured Blog:', error);
    res.status(500).json({ error: 'Failed to fetch featured blog data' });
  }
});

/**
 * GET /api/health - Health check endpoint
 * Simple endpoint to verify API is running
 */
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Melit Trade API'
  });
});

/**
 * GET /api/test - Simple test endpoint
 * Test endpoint to verify basic connectivity
 */
router.get('/test', (req, res) => {
  res.json({ 
    message: 'API is working!',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;


