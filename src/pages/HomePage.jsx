import React from 'react'
import { useState } from 'react';
import Hero from '../components/Hero'
import BannerItem from '../components/BannerItem';
import Navigation from '../components/Navigation'
import ServiceExplore from '../components/ServiceExplore';
import VideoCard from '../components/VideoCard';
import VideoModal from '../components/VideoModal';
import VideoCardContainer from '../components/VideoModal';
import BlogItem from '../components/BlogItem';
import WeeklyItem from '../components/WeeklyItem';


const videoData = [
  {
    img: 'img/product/laptops.jpg',
    vid: 'videos/na.mp4',
    productName: 'High-performance Laptops',
    price: '$192',
    rating: '1 day ago'
  },
  {
    img: 'img/product/televisions.jpg',
    vid: 'videos/na.mp4',
    productName: 'Ultra HD Televisions',
    price: '$1,092',
    rating: '5'
  },
  {
    img: 'img/product/electronics-5.jpg',
    vid: 'videos/3.mp4',
    productName: 'Sleek and Powerful Tablets',
    price: '$599',
    rating: '4'
  },
  {
    img: 'img/product/Gaming.jpg',
    vid: 'videos/3.mp4',
    productName: 'Next-Gen Gaming Consoles',
    price: '$602' ,
    rating: '4'
  },
  {
    img: 'img/product/machinery-2.jpg',
    vid: 'videos/na.mp4',
    productName: 'Heavy-Duty Trucks',
    price: '$1,902',
    rating: '4'
  },
  {
    img: 'img/product/furniture.jpg',
    vid: 'videos/na.mp4',
    productName: 'High Quality Furniture',
    price: '$602',
    rating: '5'
  },
  {
    img: 'img/product/clothing-3.jpg',
    vid: 'videos/na.mp4',
    productName: 'Elegant Jewelry Collections',
    price: '$602',
    rating: '5'
  },
 
  // Add more video data here
];

const blog = [{ img: 'img/blog/blog-1.jpg', date: '19th December 2023', info: 'Which Inventory Management Systems Are Leading the Industry?' },
{ img: 'img/blog/blog-2.png', date: '16th January 2023', info: 'Sustainable Procurement: Strategies for Long-Term Success' },
{ img: 'img/blog/blog-3.jpg', date: '15th December 2023', info: 'The Financial Benefits of Streamlined Procurement Processes' }]

const HomePage = () => {
  
  return (
    <div>
      
   <div>
  <Navigation />
  {/* Hero Section Begin */}
  <Hero/>
  {/* Hero Section End */}
  {/* Service Exploration Begin */}
  <section className='explore_services'>
  {/* <span className="service_text"> Explore Our Services</span>
  <p>Save time and money with our comprehensive logistics solutions for individuals and businesses. From personalized procurement to tech-driven solutions, our services streamline your operations so you can focus on what matters most.
  Explore our tailored services below to discover how we can meet your unique needs.
  </p> */}
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8 text-center">
        <span class="service_text ">Explore Our Services</span>
        <p className='service_ptext'>
          Save time and money with our comprehensive logistics solutions for individuals and businesses. Our services streamline your operations so you can focus on what matters most.
          Explore our tailored services below to discover how we can meet your unique needs.
        </p>
      </div>
      
    </div>
    
    <ServiceExplore/>
    
  </div>
  </section>
  {/* Service Exploration Ends */}
  {/* Banner Section Begin */}
  {/* <section className="banner spad_banner">
    <div className="container">
      <span class="Product_showcase">Top Products</span>
      <div className='banner-container'> */}
      {/* <div className="row">
        <div className="col-lg-7 offset-lg-4">  
          <div className="banner__item">
            <div className="banner__item__pic">
              <img src="img/banner/banner-1.jpg" alt />
            </div>
            <div className="banner__item__text">
              <h2>Clothing Collections 2030</h2>
              <a href="#">Shop now</a>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="banner__item banner__item--middle">
            <div className="banner__item__pic">
              <img src="img/banner/banner-2.jpg" alt />
            </div>
            <div className="banner__item__text">
              <h2>Accessories</h2>
              <a href="#">Shop now</a>
            </div>
          </div>
        </div>
        
        <div className="col-lg-7">
          <div className="banner__item banner__item--last">
            <div className="banner__item__pic">
              <img src="img/banner/banner-3.jpg" alt />
            </div>
            <div className="banner__item__text">
              <h2>Shoes Spring 2030</h2>
              <a href="#">Shop now</a>
            </div>
          </div>
        </div>
        </div> */}
        {/* <div className="row_e">
        {items.map((item, index) => (
          <BannerItem key={index} item={item} index={index} />
        ))}
      </div>

      </div>
    </div>
  </section> */}
  <section className='Product_modal spad_banner'>
  <div class="row justify-content-center">
      <div class="col-md-6 text-center">
        <span class="Product_showcase">Top Products</span>
        <p className='service_ptext'>
        Browse our selection of top products, representing the quality and diversity of items we can procure. Whether you're looking
        for these specific items or need help sourcing something else, our team is ready to meet your procurement needs.
        </p>
      </div>
      
    </div>
  
    <div className="video-card-container ">
      {videoData.map((video, index) => (
        <VideoCard key={index} video={video} />
      ))}
  
    </div>
  </section>
  {/* Banner Section End */}
 
  {/* Categories Section Begin */}
  <section className="categories spad">
    <WeeklyItem />
  </section>
  {/* Categories Section End */}
  {/* Instagram Section Begin */}

  {/* Instagram Section End */}
  {/* Latest Blog Section Begin */}
  <section className="latest spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-title">
            <span>Latest Insights</span>
            <h2>Supply Chain Innovations</h2>
          </div>
        </div>
      </div>
      <div className="row">

      {blog.map((blog_item, index) => (
          <BlogItem key={index} blog_item={blog_item} index={index} />
        ))}
      
      
   
      </div>
    </div>
  </section>
  {/* Latest Blog Section End */}
  {/* Footer Section Begin */}
 
</div>


      
    </div>
  )
}

export default HomePage
