# Melit Trade - Admin CMS

A lightweight, secure Admin CMS for managing website content with a simple JSON file-based database.

## 🚀 Features

- **Secure Authentication**: JWT-based authentication with HTTP-only cookies
- **Content Management**: CRUD operations for Team, Partners, Testimonials, and Deals
- **File Uploads**: Image management for team members, partners, and deals
- **Public API**: RESTful endpoints for frontend integration
- **Simple Database**: JSON file storage for easy deployment and maintenance
- **Responsive Design**: Modern admin interface with Bootstrap 5

## 🛠️ Technology Stack

- **Backend**: Node.js + Express.js
- **Authentication**: JWT + bcryptjs
- **File Uploads**: Multer
- **Templating**: EJS
- **Frontend**: Bootstrap 5 + Font Awesome
- **Database**: JSON files (simple, file-based storage)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## 🔧 Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory (use `env.example` as template):

```bash
# Admin CMS Configuration
ADMIN_USERNAME=admin
ADMIN_PASSWORD=$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KqQKqG
JWT_SECRET=melit_trade_super_secret_jwt_key_2024
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=5000
NODE_ENV=development

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=public/uploads
```

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

**To generate a new password hash:**
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your_password', 12));"
```

### 3. Build React Frontend

```bash
npm run build
```

### 4. Start the Server

```bash
# Development mode (concurrently runs both frontend and backend)
npm run dev

# Production mode (backend only)
npm run server
```

## 🌐 Access Points

- **Admin Panel**: http://localhost:5000/admin
- **API Endpoints**: http://localhost:5000/api
- **Frontend**: http://localhost:5000

## 📚 API Endpoints

### Public API (No Authentication Required)

```
GET /api/team          - Get all team members
GET /api/partners      - Get all partners
GET /api/testimonials  - Get all testimonials
GET /api/deal          - Get active deal of the week
GET /api/deals         - Get all deals
GET /api/health        - Health check
```

### Admin API (Authentication Required)

```
POST   /admin/login           - Admin login
POST   /admin/logout          - Admin logout
GET    /admin/dashboard       - Admin dashboard
GET    /admin/team            - Team management page
POST   /admin/team            - Add team member
PUT    /admin/team/:id        - Update team member
DELETE /admin/team/:id        - Delete team member
GET    /admin/partners        - Partners management page
POST   /admin/partners        - Add partner
PUT    /admin/partners/:id    - Update partner
DELETE /admin/partners/:id    - Delete partner
GET    /admin/testimonials    - Testimonials management page
POST   /admin/testimonials    - Add testimonial
PUT    /admin/testimonials/:id - Update testimonial
DELETE /admin/testimonials/:id - Delete testimonial
GET    /admin/deals           - Deals management page
POST   /admin/deals           - Add deal
PUT    /admin/deals/:id       - Update deal
DELETE /admin/deals/:id       - Delete deal
```

## 📁 Project Structure

```
melit-trade/
├── server/                 # Backend server files
│   ├── data/              # JSON data files (database)
│   ├── middleware/        # Authentication middleware
│   ├── routes/            # API and admin routes
│   ├── utils/             # Utility functions
│   ├── views/             # EJS templates
│   └── server.js          # Main server file
├── build/                 # React build output
├── public/                # Static assets
├── src/                   # React source code
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **HTTP-only Cookies**: Prevents XSS attacks
- **Password Hashing**: bcryptjs for secure password storage
- **Input Validation**: Server-side validation for all inputs
- **File Upload Security**: Type and size restrictions
- **CORS Protection**: Configurable cross-origin policies

## 📱 Frontend Integration

The main React website can fetch data from the public API endpoints:

```javascript
// Example: Fetch team members
const response = await fetch('/api/team');
const team = await response.json();

// Example: Fetch active deal
const response = await fetch('/api/deal');
const deal = await response.json();
```

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm run server
```

### Environment Variables for Production
```bash
NODE_ENV=production
PORT=5000
JWT_SECRET=your_super_secret_production_key
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_hashed_password
```

## 🛠️ Customization

### Adding New Content Types

1. Create new JSON data file in `server/data/`
2. Add routes in `server/routes/admin.js`
3. Create EJS template in `server/views/`
4. Add API endpoint in `server/routes/api.js`

### Modifying Admin Interface

- Edit EJS templates in `server/views/`
- Modify CSS styles in template `<style>` sections
- Update JavaScript functionality in template `<script>` sections

## 🔍 Troubleshooting

### Common Issues

1. **Port Already in Use**: Change PORT in .env file
2. **Authentication Failed**: Check admin credentials and JWT secret
3. **File Upload Errors**: Verify upload directory permissions
4. **Data Not Loading**: Check JSON file syntax and permissions

### Logs

Check console output for detailed error messages and debugging information.

## 📄 License

This project is proprietary software for Melit Trade.

## 🤝 Support

For technical support or questions, contact the development team.

---

**Built with ❤️ for Melit Trade**
