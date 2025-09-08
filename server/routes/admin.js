const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { authenticateToken } = require('../middleware/auth');
const { 
  readData, 
  writeData, 
  generateId, 
  findById, 
  updateById, 
  deleteById 
} = require('../utils/dataStore');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/uploads');
    fs.mkdir(uploadPath, { recursive: true })
      .then(() => cb(null, uploadPath))
      .catch(err => cb(err));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Apply authentication to all admin routes
router.use(authenticateToken);

/**
 * GET /admin/dashboard - Render admin dashboard
 */
router.get('/dashboard', async (req, res) => {
  try {
    const [team, partners, testimonials, deals] = await Promise.all([
      readData('team.json'),
      readData('partners.json'),
      readData('testimonials.json'),
      readData('deals.json')
    ]);

    res.render('dashboard', {
      title: 'Admin Dashboard',
      user: req.user,
      stats: {
        team: team.length,
        partners: partners.length,
        testimonials: testimonials.length,
        deals: deals.length
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).render('error', { error: 'Failed to load dashboard' });
  }
});

// Team Members Management
router.get('/team', async (req, res) => {
  try {
    const team = await readData('team.json');
    res.render('team', { title: 'Manage Team', team, user: req.user });
  } catch (error) {
    res.status(500).render('error', { error: 'Failed to load team data' });
  }
});

router.post('/team', upload.single('image'), async (req, res) => {
  try {
    const { name, role, location } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    
    const team = await readData('team.json');
    const newMember = {
      id: generateId(),
      name,
      role,
      location,
      imgSrc: imagePath || 'img/about/default.jpg'
    };
    
    team.push(newMember);
    await writeData('team.json', team);
    
    res.json({ success: true, member: newMember });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add team member' });
  }
});

router.put('/team/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, location } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    
    let team = await readData('team.json');
    const member = findById(team, id);
    
    if (!member) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    // Delete old image if new one uploaded
    if (imagePath && member.imgSrc && member.imgSrc.startsWith('/uploads/')) {
      try {
        await fs.unlink(path.join(__dirname, '../public', member.imgSrc));
      } catch (err) {
        console.log('Old image not found for deletion');
      }
    }
    
    team = updateById(team, id, {
      name,
      role,
      location,
      ...(imagePath && { imgSrc: imagePath })
    });
    
    await writeData('team.json', team);
    res.json({ success: true, member: findById(team, id) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update team member' });
  }
});

router.delete('/team/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let team = await readData('team.json');
    const member = findById(team, id);
    
    if (!member) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    // Delete associated image
    if (member.imgSrc && member.imgSrc.startsWith('/uploads/')) {
      try {
        await fs.unlink(path.join(__dirname, '../public', member.imgSrc));
      } catch (err) {
        console.log('Image not found for deletion');
      }
    }
    
    team = deleteById(team, id);
    await writeData('team.json', team);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team member' });
  }
});

// Partners Management
router.get('/partners', async (req, res) => {
  try {
    const partners = await readData('partners.json');
    res.render('partners', { title: 'Manage Partners', partners, user: req.user });
  } catch (error) {
    res.status(500).render('error', { error: 'Failed to load partners data' });
  }
});

router.post('/partners', upload.single('image'), async (req, res) => {
  try {
    const { name, role, location } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    
    const partners = await readData('partners.json');
    const newPartner = {
      id: generateId(),
      name,
      role,
      location,
      imgSrc: imagePath || 'img/about/default.jpg'
    };
    
    partners.push(newPartner);
    await writeData('partners.json', partners);
    
    res.json({ success: true, partner: newPartner });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add partner' });
  }
});

router.put('/partners/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, location } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    
    let partners = await readData('partners.json');
    const partner = findById(partners, id);
    
    if (!partner) {
      return res.status(404).json({ error: 'Partner not found' });
    }
    
    // Delete old image if new one uploaded
    if (imagePath && partner.imgSrc && partner.imgSrc.startsWith('/uploads/')) {
      try {
        await fs.unlink(path.join(__dirname, '../public', partner.imgSrc));
      } catch (err) {
        console.log('Old image not found for deletion');
      }
    }
    
    partners = updateById(partners, id, {
      name,
      role,
      location,
      ...(imagePath && { imgSrc: imagePath })
    });
    
    await writeData('partners.json', partners);
    res.json({ success: true, partner: findById(partners, id) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update partner' });
  }
});

router.delete('/partners/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let partners = await readData('partners.json');
    const partner = findById(partners, id);
    
    if (!partner) {
      return res.status(404).json({ error: 'Partner not found' });
    }
    
    // Delete associated image
    if (partner.imgSrc && partner.imgSrc.startsWith('/uploads/')) {
      try {
        await fs.unlink(path.join(__dirname, '../public', partner.imgSrc));
      } catch (err) {
        console.log('Image not found for deletion');
      }
    }
    
    partners = deleteById(partners, id);
    await writeData('partners.json', partners);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete partner' });
  }
});

// Testimonials Management
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await readData('testimonials.json');
    res.render('testimonials', { title: 'Manage Testimonials', testimonials, user: req.user });
  } catch (error) {
    res.status(500).render('error', { error: 'Failed to load testimonials data' });
  }
});

router.post('/testimonials', async (req, res) => {
  try {
    const { text, author, profession } = req.body;
    
    const testimonials = await readData('testimonials.json');
    const newTestimonial = {
      id: generateId(),
      text,
      author,
      profession,
      imgSrc: 'img/about/testimonial-author.jpg'
    };
    
    testimonials.push(newTestimonial);
    await writeData('testimonials.json', testimonials);
    
    res.json({ success: true, testimonial: newTestimonial });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add testimonial' });
  }
});

router.put('/testimonials/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { text, author, profession } = req.body;
    
    let testimonials = await readData('testimonials.json');
    const testimonial = findById(testimonials, id);
    
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    
    testimonials = updateById(testimonials, id, { text, author, profession });
    await writeData('testimonials.json', testimonials);
    
    res.json({ success: true, testimonial: findById(testimonials, id) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

router.delete('/testimonials/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let testimonials = await readData('testimonials.json');
    
    if (!findById(testimonials, id)) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    
    testimonials = deleteById(testimonials, id);
    await writeData('testimonials.json', testimonials);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

// Deals Management
router.get('/deals', async (req, res) => {
  try {
    const deals = await readData('deals.json');
    res.render('deals', { title: 'Manage Deals', deals, user: req.user });
  } catch (error) {
    res.status(500).render('error', { error: 'Failed to load deals data' });
  }
});

// Render products UI
router.get('/products-ui', async (req, res) => {
  try {
    res.render('products', { title: 'Manage Products', user: req.user });
  } catch (error) {
    res.status(500).render('error', { error: 'Failed to load products UI' });
  }
});

// Render home content UI
router.get('/home-ui', async (req, res) => {
  try {
    res.render('home', { title: 'Home Content', user: req.user });
  } catch (error) {
    res.status(500).render('error', { error: 'Failed to load home UI' });
  }
});

// Products Management
router.get('/products', async (req, res) => {
  try {
    const products = await readData('products.json');
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load products data' });
  }
});

router.post('/products', upload.single('image'), async (req, res) => {
  try {
    const { productName, category, price, vid } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const products = await readData('products.json');
    const newProduct = {
      id: generateId(),
      productName,
      category,
      price,
      vid: vid || 'videos/na.mp4',
      img: imagePath || 'img/product/default.jpg'
    };
    products.push(newProduct);
    await writeData('products.json', products);
    res.json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

router.put('/products/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, category, price, vid } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    let products = await readData('products.json');
    const product = findById(products, id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (imagePath && product.img && product.img.startsWith('/uploads/')) {
      try { await fs.unlink(path.join(__dirname, '../public', product.img)); } catch (_) {}
    }
    products = updateById(products, id, {
      productName,
      category,
      price,
      vid,
      ...(imagePath && { img: imagePath })
    });
    await writeData('products.json', products);
    res.json({ success: true, product: findById(products, id) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let products = await readData('products.json');
    const product = findById(products, id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.img && product.img.startsWith('/uploads/')) {
      try { await fs.unlink(path.join(__dirname, '../public', product.img)); } catch (_) {}
    }
    products = deleteById(products, id);
    await writeData('products.json', products);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Home content management
router.get('/home', async (req, res) => {
  try {
    const home = await readData('home.json');
    res.json({ success: true, home });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load home content' });
  }
});

router.put('/home', async (req, res) => {
  try {
    const home = req.body;
    await writeData('home.json', home);
    res.json({ success: true, home });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update home content' });
  }
});

router.post('/deals', upload.single('image'), async (req, res) => {
  try {
    const { title, description, price, category, targetDate } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    
    const deals = await readData('deals.json');
    const newDeal = {
      id: generateId(),
      title,
      description,
      price,
      category,
      targetDate,
      imgSrc: imagePath || 'img/product/default.jpg',
      active: true,
      createdAt: new Date().toISOString()
    };
    
    deals.push(newDeal);
    await writeData('deals.json', deals);
    
    res.json({ success: true, deal: newDeal });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add deal' });
  }
});

router.put('/deals/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, category, targetDate, active } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    
    let deals = await readData('deals.json');
    const deal = findById(deals, id);
    
    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    
    // Delete old image if new one uploaded
    if (imagePath && deal.imgSrc && deal.imgSrc.startsWith('/uploads/')) {
      try {
        await fs.unlink(path.join(__dirname, '../public', deal.imgSrc));
      } catch (err) {
        console.log('Old image not found for deletion');
      }
    }
    
    deals = updateById(deals, id, {
      title,
      description,
      price,
      category,
      targetDate,
      active: active === 'true',
      ...(imagePath && { imgSrc: imagePath })
    });
    
    await writeData('deals.json', deals);
    res.json({ success: true, deal: findById(deals, id) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update deal' });
  }
});

router.delete('/deals/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let deals = await readData('deals.json');
    const deal = findById(deals, id);
    
    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    
    // Delete associated image
    if (deal.imgSrc && deal.imgSrc.startsWith('/uploads/')) {
      try {
        await fs.unlink(path.join(__dirname, '../public', deal.imgSrc));
      } catch (err) {
        console.log('Image not found for deletion');
      }
    }
    
    deals = deleteById(deals, id);
    await writeData('deals.json', deals);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete deal' });
  }
});

module.exports = router;


