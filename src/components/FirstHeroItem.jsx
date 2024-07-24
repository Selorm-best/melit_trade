import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';


const FirstHeroItem = ({ image }) => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Your Trusted Global Procurement Partner.";
  const textRef = useRef('');

  useEffect(() => {
    const elements = document.querySelectorAll('.set-bg');
    elements.forEach((element) => {
      const bg = element.getAttribute('data-setbg');
      if (bg) {
        element.style.backgroundImage = `url(${bg})`;
      }
    });

    let index = 0;
    const intervalId = setInterval(() => {
      if (index < fullText.length) {
        textRef.current += fullText.charAt(index);
        setDisplayText(textRef.current);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [fullText]);

  return (
    <div className="hero__items_f set-bg" data-setbg={image}>
      <div className="container h-100 d-flex align-items-center justify-content-center">
        <div className="row justify-content-center">
          <div className="col-xl-12 col-lg-12 col-md-12 d-flex flex-column align-items-center text-center">
            <div className="hero__text_f">
              {/* <h6>Welcome to Melit Trade</h6> */}
             
              <h2 className="tagline_f"><span className='w_wrap'>{displayText}<span className="caret_f"></span></span></h2>
          
              <p>At Melit Trade, we bridge the gap between you and the world, providing seamless procurement solutions tailored to your needs. Our dedicated team ensures precision, efficiency, and reliability in every transaction.</p>
              <Link to={"quotes"}  className="primary-btn">Get a Qoute <span className="arrow_right" /></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstHeroItem;
