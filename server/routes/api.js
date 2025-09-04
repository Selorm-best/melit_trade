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

module.exports = router;

