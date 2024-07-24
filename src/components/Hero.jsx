import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HeroItem from './HeroItem';
import FirstHeroItem from './FirstHeroItem';

const HeroItems = [
  { 
    image: "img/hero/procure1.png",
    tagline1: "We Procure",
    tagline2: "Global Procurement Solutions",
    text: "Your worldwide procurement partner, providing end-to-end solutions tailored to meet all your business needs efficiently. "
  },
  {
    image: "img/hero/we_deliver.png",
    tagline1: "We Deliver",
    tagline2: "tagline 2",
    text: "Efficient and reliable delivery services tailored to meet your business needs, ensuring your products reach their destination on time."
  },
  {
    image: "img/hero/whole_sale.png",
    tagline1: "We Provide Whole Sale Services",
    tagline2: "tagline 2",
    text: "Offering comprehensive wholesale solutions to cater to your bulk purchasing needs, with competitive pricing and high-quality standards"
  },
  {
    image: "img/hero/logistics.png",
    tagline1: "We Provide Logistics Services",
    tagline2: "tagline 2",
    text: "Streamlined logistics services designed to simplify your supply chain, from procurement to final delivery, ensuring seamless operations"
  }
];

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} arrow__right`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} arrow__left`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
};


const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />

    
  };

  return (
    <section className="hero">
      <Slider {...settings}>
        <div>
          <FirstHeroItem image="img/hero/main_back.png" />
        </div>
        {HeroItems.map((item, index) => (
          <div key={index}>
            <HeroItem
              image={item.image}
              tagline1={item.tagline1}
              tagline2={item.tagline2}
              text={item.text}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default Hero;
