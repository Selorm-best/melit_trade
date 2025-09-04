import React, {useEffect, useState} from 'react'
import Navigation from '../components/Navigation'
import NiceSelect from '../components/NiceSelect';
import VideoCardContainer from '../components/VideoModal';
import VideoCard from '../components/VideoCard';
import { Link } from 'react-router-dom';

const videoData = [
  {
    img: 'img/product/laptops.jpg',
    vid: 'videos/electronics.mp4',
    productName: 'High-performance Laptops',
    price: '$192',
    rating: '1 day ago',
    category: 'Electronics and Electricals'
  },
  {
    img: 'img/product/Electricals.jpg',
    vid: 'videos/electricals.mp4',
    productName: 'High-Quality Electrical Wires',
    price: '$192',
    rating: '1 day ago',
    category: 'Electronics and Electricals'
  },
  {
    img: 'img/product/blender.jpg',
    vid: 'videos/household.mp4',
    productName: 'High-Performance Blenders',
    price: '$192',
    rating: '1 day ago',
    category: 'Household'
  },
  {
    img: 'img/product/televisions.jpg',
    vid: 'videos/electronics.mp4',
    productName: 'Ultra HD Televisions',
    price: '$1,092',
    rating: '5',
    category: 'Electronics and Electricals'
  },
  {
    img: 'img/product/electronics-5.jpg',
    vid: 'videos/electronics.mp4',
    productName: 'Sleek and Powerful Tablets',
    price: '$599',
    rating: '4',
    category: 'Electronics and Electricals'
  },
  {
    img: 'img/product/Gaming.jpg',
    vid: 'videos/electronics.mp4',
    productName: 'Next-Gen Gaming Consoles',
    price: '$602' ,
    rating: '4',
    category: 'Electronics and Electricals'
  },
  {
    img: 'img/product/machinery-2.jpg',
    vid: 'videos/agric.mp4',
    productName: 'Heavy-Duty Trucks',
    price: '$1,902',
    rating: '4',
    category: 'Agricultural Products and Machinery'
  },
  {
    img: 'img/product/furniture.jpg',
    vid: 'videos/furniture.mp4',
    productName: 'High Quality Home Furniture',
    price: '$602',
    rating: '5',
    category: 'Furniture'
  },
  {
    img: 'img/product/clothing-3.jpg',
    vid: 'videos/clothing.mp4',
    productName: 'Elegant Jewelry Collections',
    price: '$602',
    rating: '5',
    category: 'Clothing and Fashion Accessories'
  },
  {
    img: 'img/product/machinery.jpg',
    vid: 'videos/agric.mp4',
    productName: 'Durable Agricultural Machines',
    price: '$602',
    rating: '5',
    category: 'Agricultural Products and Machinery'
  },
  {
    img: 'img/product/lighting.jpg',
    vid: 'videos/electricals.mp4',
    productName: 'Energy-Efficient Lighting',
    price: '$602',
    rating: '5',
    category: 'Electronics and Electricals'
    
  },
  {
    img: 'img/product/office_furniture.jpg',
    vid: 'videos/furniture.mp4',
    productName: 'Ergonomic Office Furniture',
    price: '$602',
    rating: '5',
    category: 'Furniture'
  },
  {
    img: 'img/product/ups.jpg',
    vid: 'videos/electricals.mp4',
    productName: 'Reliable Uninterruptible Power Supplies',
    price: '$602',
    rating: '5',
    category: 'Electronics and Electricals'
    
  },
  {
    img: 'img/product/solar-products.jpg',
    vid: 'videos/solar.mp4',
    productName: 'High Quality Solar Products',
    price: '$602',
    rating: '5',
    category: 'Renewable Energy Products'
  },
  {
    img: 'img/product/Stationary.jpg',
    vid: 'videos/education.mp4',
    productName: 'Bestselling Books',
    price: '$602',
    rating: '5',
    category: 'Educational Materials'
  },
  {
    img: 'img/product/dresss.jpg',
    vid: 'videos/clothing.mp4',
    productName: 'Trendy Clothing',
    price: '$602',
    rating: '5',
    category: 'Clothing and Fashion Accessories'
  },
  {
    img: 'img/product/shoes.jpg',
    vid: 'videos/clothing.mp4',
    productName: 'High Quality Shoes',
    price: '$602',
    rating: '5',
    category: 'Clothing and Fashion Accessories'
  },
  {
    img: 'img/product/motor.jpg',
    vid: 'videos/automobile.mp4',
    productName: 'Motorbikes and Automobiles',
    price: '$602',
    rating: '5',
    category: 'Automobiles and Auto Parts'
  },
  {
    img: 'img/product/fitness.jpg',
    vid: 'videos/fitness.mp4',
    productName: 'State-of-the-Art Fitness Machines',
    price: '$602',
    rating: '5',
    category: 'Fitness and sports equipment'
  },
  {
    img: 'img/product/home_decor.jpg',
    vid: 'videos/home_decor.mp4',
    productName: 'Stylish Room Decor',
    price: '$602',
    rating: '5',
    category: 'Home Decor and Furnishings'
  },
  {
    img: 'img/product/toys.jpg',
    vid: 'videos/toys.mp4',
    productName: 'Fun and Educational Toys',
    price: '$602',
    rating: '5',
    category: 'Baby products and toys'
  },
  {
    img: 'img/product/auto_parts.jpg',
    vid: 'videos/automobile.mp4',
    productName: 'Durable Automobile Parts',
    price: '$602',
    rating: '5',
    category: 'Automobiles and Auto Parts'
  },
  {
    img: 'img/product/microwaves.jpg',
    vid: 'videos/household.mp4',
    productName: 'Cooking Appliances',
    price: '$602',
    rating: '5',
    category: 'Household'
  }
  // Add more video data here
];

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

  useEffect(() => {
    const elements = document.querySelectorAll('.set-bg');
    elements.forEach((element) => {
      const bg = element.getAttribute('data-setbg');
      if (bg) {
        element.style.backgroundImage = `url(${bg})`;
      }
    });
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

  const filteredVideoData = selectedCategory === 'All'
    ? videoData
    : videoData.filter(video => video.category === selectedCategory);

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