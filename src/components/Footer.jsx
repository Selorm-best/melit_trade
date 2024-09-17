
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div>
    <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="footer__about">
            <div className="footer__logo">
              <Link to={"/"}><img src="img/fn_logo.png" alt /></Link>
            </div>
            <p>Your Trusted Global Procurement Partner, Ensuring Seamless and Reliable Delivery Solutions.</p>
            <a href="#"><img src="img/payment.png" alt /></a>
            <a href="#"><img src="img/mtnmomo.png" width="50%" height="50%" alt /></a>
          </div>
        </div>
        <div className="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
          <div className="footer__widget">
            <h6>Useful Links</h6>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Products</a></li>
              <li><a href="#">Tracking</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Latest Insights</a></li>
            </ul>
          </div>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-6">
          <div className="footer__widget">
            <h6>Working Hours</h6>
            <ul>
              <li><a href="#">Weekdays: 9AM - 10PM</a></li>
              <li><a href="#">Saturday: 9AM - 2PM </a></li>
              <li><a href="#">Sundays: 2PM - 5PM</a></li>
              <li><a href="#"></a></li>
            </ul>
          </div>
        </div>
        <div className="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
          <div className="footer__widget">
            <h6>GET IN TOUCH</h6>
     <div className="contact_info">
      <div className="row justify-content-center">
        <div className="col">
           <p><i className="fas fa-envelope"></i>
               <a href="mailto:">melit.trade@outlook.com</a>
            </p>
            <p>
                <i className="fas fa-phone"></i>
                
                <a href="tel:+233 53 879 7707">+233 53 879 7707</a>
              </p>
              <p>
            <i className="fas fa-map-marker-alt"></i> <a href="#">Accra, Ghana</a>
        </p>
      </div>
    </div>
    </div>
            <div className="footer__newslatter">
              <p>Stay Informed, Join Our Mailing List Today!</p>
              <form action="#">
                <input type="text" placeholder="Your email" />
                <button type="submit"><i title="Subscribe" className="fas fa-envelope" /></button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row top_line">
        <div className="col-lg-12 d-flex justify-content-between align-items-center ">
          <div className="footer__copyright__text">
            <p>Copyright © { new Date().getFullYear()} All rights reserved 
            </p>
          </div>
         
       
        <div className="social-icons">
          <a href='#'><FontAwesomeIcon icon={faInstagram} className="icon instagram" /></a>
          <a href="#">< FontAwesomeIcon icon={faFacebook} className="icon facebook" /> </a>
          <a href="#"><FontAwesomeIcon icon={faTwitter} className="icon twitter" /></a>
        </div>
    
        </div>
      </div>
    </div>
  </footer>
  {/* Footer Section End */}
  {/* Search Begin */}
  <div className="search-model">
    <div className="h-100 d-flex align-items-center justify-content-center">
      <div className="search-close-switch">+</div>
      <form className="search-model-form">
        <input type="text" id="search-input" placeholder="Search here....." />
      </form>
    </div>
  </div>
  {/* Search End */}
    </div>
  )
}

export default Footer
