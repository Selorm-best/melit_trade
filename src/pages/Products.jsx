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
        console.log('Fetching products from /api/products...');
        const res = await fetch('/api/products');
        console.log('Response status:', res.status);
        if (res.ok) {
          const data = await res.json();
          console.log('Products data:', data);
          setProducts(Array.isArray(data) ? data : []);
        } else {
          console.error('Failed to fetch products:', res.statusText);
        }
      } catch (e) {
        console.error('Error fetching products:', e);
      }
    };
    fetchProducts();
  }, []);

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
              <div className="col-lg-3">
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
              <div className="col-lg-9">
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
                <div className="video-card-container">
                  {filteredVideoData.map((video, index) => (
                    <VideoCard key={index} video={video} />
                  ))}
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="product__pagination">
                      <a className="active" href="#">1</a>
                      <a href="#">2</a>
                      <a href="#">3</a>
                      <span>...</span>
                      <a href="#">21</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Products;