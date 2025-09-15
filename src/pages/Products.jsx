import React, {useEffect, useState} from 'react'
import Navigation from '../components/Navigation'
import NiceSelect from '../components/NiceSelect';
import VideoCardContainer from '../components/VideoModal';
import VideoCard from '../components/VideoCard';
import { Link } from 'react-router-dom';

const categories = [
  "All",
  "Electronics and Electricals",
  "Household",
  "Agricultural Products and Machinery",
  "Renewable Energy Products",
  "Furniture",
  "Home Decor and Furnishings",
  "Baby Products and Toys",
  "Educational Materials",
  "Automobiles and Auto Parts",
  "Clothing and Fashion Accessories",
  "Fitness and Sports Equipment"
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  useEffect(() => {
    const elements = document.querySelectorAll('.set-bg');
    elements.forEach((element) => {
      const bg = element.getAttribute('data-setbg');
      if (bg) {
        element.style.backgroundImage = `url(${bg})`;
      }
    });
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching products from /api/products...');
        
        // Try different fetch approaches
        let res;
        try {
          // First try with minimal headers
          res = await fetch('/api/products', {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          });
        } catch (headerError) {
          console.log('Header error, trying without headers...');
          // If headers cause issues, try without any headers
          res = await fetch('/api/products');
        }
        
        console.log('Response status:', res.status);
        if (res.ok) {
          const data = await res.json();
          console.log('Products data:', data);
          setProducts(Array.isArray(data) ? data : []);
        } else {
          console.error('Failed to fetch products:', res.statusText);
          setError('Failed to load products from server');
          // Fallback to default products if API fails
          setProducts(getDefaultProducts());
        }
      } catch (e) {
        console.error('Error fetching products:', e);
        setError('Network error - using default products');
        // Fallback to default products if API fails
        setProducts(getDefaultProducts());
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Default products fallback
  const getDefaultProducts = () => [
    {
      id: "p1",
      img: "img/product/laptops.jpg",
      vid: "videos/electronics.mp4",
      productName: "High-performance Laptops",
      price: "$192",
      category: "Electronics and Electricals"
    },
    {
      id: "p2",
      img: "img/product/Electricals.jpg",
      vid: "videos/electricals.mp4",
      productName: "High-Quality Electrical Wires",
      price: "$192",
      category: "Electronics and Electricals"
    },
    {
      id: "p3",
      img: "img/product/blender.jpg",
      vid: "videos/household.mp4",
      productName: "High-Performance Blenders",
      price: "$192",
      category: "Household"
    },
    {
      id: "p4",
      img: "img/product/televisions.jpg",
      vid: "videos/electronics.mp4",
      productName: "Ultra HD Televisions",
      price: "$1,092",
      category: "Electronics and Electricals"
    },
    {
      id: "p5",
      img: "img/product/electronics-5.jpg",
      vid: "videos/electronics.mp4",
      productName: "Sleek and Powerful Tablets",
      price: "$599",
      category: "Electronics and Electricals"
    }
  ];

  const [selectedValue, setSelectedValue] = useState('');

  const options = [
    { value: 'Popularity', label: 'Popularity', selected: true },
    { value: 'Category', label: 'Category' },
    { value: 'A-Z', label: 'A-Z' }
  ];

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const filteredVideoData = (selectedCategory === 'All'
    ? products
    : products.filter(video => video.category === selectedCategory))
    .map(v => ({
      img: v.img,
      vid: v.vid || 'videos/na.mp4',
      productName: v.productName,
      price: v.price,
      category: v.category
    }));

  // Pagination logic
  const totalProducts = filteredVideoData.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredVideoData.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div>
        <Navigation />
        <section className="breadcrumb-option">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb__text">
                  <h4>Products</h4>
                  <div className="breadcrumb__links">
                    <Link to="/">Home</Link>
                    <span>Products</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="shop spad">
          <div className="container prod">
            <div className="row">
              <div className="col-lg-3 col-md-12">
                <div className="shop__sidebar">
                  {/* Search removed as requested */}
                  <div className="product_categories">
                    <h4>Product Categories</h4>
                    <ul>
                      {categories.map((category, index) => (
                        <li key={index}>
                          <a 
                            className={selectedCategory === category ? 'active' : ''}
                            onClick={() => handleCategoryChange(category)}
                          >
                            {category}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-12">
                <div className="shop__product__option">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="shop__product__option__right">
                       
                      </div>
                    </div>
                  </div>
                </div>
                {loading ? (
                  <div className="loading-container" style={{ textAlign: 'center', padding: '2rem' }}>
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                    <p style={{ marginTop: '1rem' }}>Loading products...</p>
                  </div>
                ) : error ? (
                  <div className="alert alert-warning" role="alert">
                    <strong>Warning:</strong> {error}
                  </div>
                ) : filteredVideoData.length === 0 ? (
                  <div className="no-products" style={{ textAlign: 'center', padding: '2rem' }}>
                    <h4>No products found</h4>
                    <p>No products available in the selected category.</p>
                  </div>
                ) : (
                  <div className="video-card-container">
                    {currentProducts.map((video, index) => (
                      <VideoCard key={indexOfFirstProduct + index} video={video} />
                    ))}
                  </div>
                )}
                {totalPages > 1 && (
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="product__pagination">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                          <a
                            key={pageNumber}
                            className={currentPage === pageNumber ? 'active' : ''}
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(pageNumber);
                            }}
                            href="#"
                            style={{ cursor: 'pointer' }}
                          >
                            {pageNumber}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Products;