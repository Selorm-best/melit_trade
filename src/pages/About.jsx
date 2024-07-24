import React from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { useEffect } from 'react'
import CounterSection from '../components/CounterSection'
import CoreValues from '../components/CoreValues'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'
import Team from '../components/Team'
const About = () => {

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
   <div>
    <Navigation />
  {/* Breadcrumb Section Begin */}
  <section className="breadcrumb-option">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb__text">
            <h4>About Us</h4>
            <div className="breadcrumb__links">
              <Link to ={"/"}>Home</Link>
              <span>About Us</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Breadcrumb Section End */}
  
  {/* About Section Begin */}
  <section className="about spad">
    <div className="container">
    <div className="row">
        <div className="col-lg-12">
          <div className="about__item">
          <h4>Company Overview</h4>
            <p>At Melit Trade Ltd, we specialize in consumer procurement, logistics, and wholesale services. 
              We're dedicated to fulfilling specific customer orders efficiently, streamlining the process of sourcing goods from Mainland China.
              Leveraging our extensive supplier network, we negotiate competitive prices while upholding high standards of quality. 
              Our commitment to innovation is evident through our tech-driven solutions, such as an intuitive online platform and block chain integration for enhanced transparency in transactions. Our goal is to offer 
              a seamless and personalized shopping experience at affordable rates, making Melit Trade the top choice for customers.</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="about__item">
          <h4>Our Mission</h4>
            <p>
            Delivering efficient, transparent, and personalized procurement and logistics solutions 
             with a commitment to quality and innovation
            </p>
          </div>
        </div>
      </div>
      {/* core values and why choose us begins */}
      <CoreValues />
      <WhyChooseUs />
      {/* Core values and why choose us ends */}
     
      
    </div>
  </section>
  {/* About Section End */}
  {/* Testimonial Section Begin */}
  <Testimonials />
  {/* Testimonial Section End */}
  {/* Counter Section Begin */}
  <CounterSection />
  {/* Counter Section End */}
  {/* Team Section Begin */}
  <section className="team spad">
   <Team />
  </section>
  {/* Team Section End */}
  {/* Client Section Begin */}
  <section className="clients spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-title">
            <span>Partner</span>
            <h2>Happy Clients</h2>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-lg-3 col-md-4 col-sm-4 col-6 d-flex justify-content-center">
          <a href="#" className="client__item"><img src="img/clients/company1.jpg" alt /></a>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-4 col-6 d-flex justify-content-center">
          <a href="#" className="client__item"><img src="img/clients/company2.jpg" alt /></a>
        </div>
        
      </div>
    </div>
  </section>
  {/* Client Section End */}
</div>

    </>
  )
}

export default About
