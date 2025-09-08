import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTruckFast } from '@fortawesome/free-solid-svg-icons';


const FirstHeroItem = ({ image }) => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Your Trusted Global Procurement Partner.";
  const textRef = useRef('');
  const [hero, setHero] = useState(null);

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
    // typing effect
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

  useEffect(() => {
    const loadHome = async () => {
      try {
        console.log('Fetching home content from /api/home...');
        const res = await fetch('/api/home');
        console.log('Home response status:', res.status);
        if (res.ok) {
          const data = await res.json();
          console.log('Home data:', data);
          setHero(data?.hero || null);
        } else {
          console.error('Failed to fetch home content:', res.statusText);
        }
      } catch (e) {
        console.error('Error fetching home content:', e);
      }
    };
    loadHome();
  }, []);

  return (
    <div className="hero__items_f set-bg" data-setbg={image}>
      <div className="container h-100 d-flex align-items-center justify-content-center">
        <div className="row justify-content-center">
          <div className="col-xl-12 col-lg-12 col-md-12 d-flex flex-column align-items-center text-center">
            <div className="hero__text_f">
              {/* <h6>Welcome to Melit Trade</h6> */}
             
              <h2 className="tagline_f"><span className='w_wrap'>{hero?.headline || displayText}</span></h2>
         
              <p>{hero?.subtext || "At Melit Trade, we bridge the gap between you and the world, providing seamless procurement solutions tailored to your needs. Our dedicated team ensures precision, efficiency, and reliability in every transaction."}</p>
              <div className="d-flex justify-content-center align-items-center gap-3">
                <Link to={hero?.ctaPrimary?.path || "/quotes"} className="primary-btn btn-hero">
                  <FontAwesomeIcon icon={faPaperPlane} />
                  <span>{hero?.ctaPrimary?.label || 'Get a Quote'}</span>
                </Link>
                <Link to={hero?.ctaSecondary?.path || "/tracking"} className="primary-btn btn-hero">
                  <FontAwesomeIcon icon={faTruckFast} />
                  <span>{hero?.ctaSecondary?.label || 'Track Package'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstHeroItem;
