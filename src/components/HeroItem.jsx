import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroItem = ({image, tagline1, tagline2, text}) => {
  useEffect(() => {
    const elements = document.querySelectorAll('.set-bg');
    elements.forEach((element) => {
      const bg = element.getAttribute('data-setbg');
      if (bg) {
        element.style.backgroundImage = `url(${bg})`;
      }
    });
  }, []);

  return (
    <>
    <div className="hero__items set-bg" data-setbg={image}>
    <div className="container">
      <div className="row">
        <div className="col-xl-5 col-lg-7 col-md-8">
          <div className="hero__text_other">
            <h6>{tagline1}</h6>
       
            <p>{text}</p>
            <Link to={"/quotes"} className="primary-btn">Get a Qoute <span className="arrow_right" /></Link>
           
          </div>
        </div>
      </div>
    </div>
  </div>
  
  </>
  );
};

export default HeroItem;
