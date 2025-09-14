// API Configuration for Melit Trade
// This file centralizes all API endpoints and configuration

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {
    // Public API endpoints
    products: `${API_BASE_URL}/api/products`,
    home: `${API_BASE_URL}/api/home`,
    team: `${API_BASE_URL}/api/team`,
    partners: `${API_BASE_URL}/api/partners`,
    blog: `${API_BASE_URL}/api/blog`,
    blogFeatured: `${API_BASE_URL}/api/blog/featured`,
    blogById: (id) => `${API_BASE_URL}/api/blog/${id}`,
    
    // Admin endpoints
    admin: `${API_BASE_URL}/admin`,
    adminLogin: `${API_BASE_URL}/admin/login`,
    adminLogout: `${API_BASE_URL}/admin/logout`,
    
    // Admin API endpoints
    adminProducts: `${API_BASE_URL}/admin/products`,
    adminHome: `${API_BASE_URL}/admin/home`,
    adminTeam: `${API_BASE_URL}/admin/team`,
    adminPartners: `${API_BASE_URL}/admin/partners`,
    adminBlog: `${API_BASE_URL}/admin/blog`,
    adminBlogById: (id) => `${API_BASE_URL}/admin/blog/${id}`,
    
    // File upload
    upload: `${API_BASE_URL}/admin/upload`
  },
  
  // Default fetch options
  defaultOptions: {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },
  
  // Public API options (no credentials)
  publicOptions: {
    headers: {
      'Accept': 'application/json'
    },
    credentials: 'omit'
  },
  
  // Admin API options (with credentials)
  adminOptions: {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }
};

// Helper function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(endpoint, {
      ...apiConfig.defaultOptions,
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Helper function for public API calls
export const publicApiCall = async (endpoint, options = {}) => {
  return apiCall(endpoint, {
    ...apiConfig.publicOptions,
    ...options
  });
};

// Helper function for admin API calls
export const adminApiCall = async (endpoint, options = {}) => {
  return apiCall(endpoint, {
    ...apiConfig.adminOptions,
    ...options
  });
};

export default apiConfig;
