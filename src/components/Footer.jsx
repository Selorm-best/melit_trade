
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div>
    <footer className="footer">
    <div className="container">
      <div className="row">
        {/* Company Info Column */}
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="footer__about">
            <div className="footer__logo">
              <Link to={"/"}><img src="img/fn_logo.png" alt /></Link>
            </div>
            <p>Your Trusted Global Procurement Partner, Ensuring Seamless and Reliable Delivery Solutions.</p>
            <a href="#"><img src="img/mtnmomo.png" width="50%" height="50%" alt /></a>
          </div>
        </div>
        
        {/* Working Hours Column */}
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="footer__widget">
            <h6>Working Hours</h6>
            <ul>
              <li><a href="#">Weekdays: 9AM - 5PM</a></li>
              <li><a href="#">Saturday: 12PM - 4PM</a></li>
              <li><a href="#">Sunday: Closed</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Info Column */}
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="footer__widget">
            <h6>Contact Information</h6>
            <div className="contact_info">
              <p><i className="fas fa-envelope"></i>
                <a href="mailto:melit.trade@outlook.com">melit.trade@outlook.com</a>
              </p>
              <p>
                <i className="fas fa-phone"></i>
                <a href="tel:+233 53 879 7707">+233 53 879 7707</a>
              </p>
              <p>
                <i className="fas fa-map-marker-alt"></i> 
                <a href="#">Ashaley Botwe, Near Lakeside Shell</a>
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Column */}
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="footer__widget">
            <h6>Stay Connected</h6>
            <div className="footer__newslatter">
              <p>Stay Informed, Join Our Mailing List Today!</p>
              <form action="#">
                <input type="text" placeholder="Your email" />
                <button type="submit"><i title="Subscribe" className="fas fa-envelope" /></button>
              </form>
            </div>
            <div className="social-icons">
              <a href='https://www.instagram.com/melittradeltd/' target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} className="icon instagram" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61565431388127" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} className="icon facebook" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="row top_line">
        <div className="col-lg-12 d-flex justify-content-center align-items-center">
          <div className="footer__copyright__text">
            <p>Copyright © { new Date().getFullYear()} Melit Trade Ltd. All rights reserved</p>
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
