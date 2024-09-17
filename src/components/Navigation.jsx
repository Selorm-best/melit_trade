import { useState , useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';


import { Link, useLocation} from 'react-router-dom';
import $ from 'jquery';


const Navigation = () => {
  const location = useLocation();

   const getActiveClass = (path) => location.pathname === path ? 'active' : '';


    const [isMenuActive, setIsMenuActive] = useState(false);

    const toggleMenu = () => {
      setIsMenuActive(!isMenuActive);
    };
 
    
 
  return (
    <div>
  
  {/* Offcanvas Menu Begin */}
  <div>
      
    
      <div className={`offcanvas-menu-overlay ${isMenuActive ? 'active' : ''}`} onClick={toggleMenu} />
      <div className={`offcanvas-menu-wrapper ${isMenuActive ? 'active' : ''}`}>
        <div className="offcanvas__option">
          <div className="offcanvas__links">
            <a href="#">Sign in</a>
            <a href="#">FAQs</a>
          </div>
          <div className="offcanvas__top__hover">
            <span>GH₵ <i className="arrow_carrot-down" /></span>
            <ul>
              <li>USD</li>
              <li>EUR</li>
              <li>CN¥</li>
            </ul>
          </div>
        </div>
        <div className="offcanvas__nav__option">
            <a href="#"><FontAwesomeIcon icon={faSearch} style={{color:'#002240'}}/>
                  </a>
                  <a href="#">
                   <FontAwesomeIcon icon={faHeartRegular} style={{color:'#002240'}}/>
            </a>
                  

        
        </div>
       


            <div className="wrapper">	<nav id="sidebar_e"> 
            <ul className="list-unstyled components">
           
            <li className={getActiveClass("/")}><Link to="/">Home</Link></li>
              <li className={getActiveClass("/products")}><Link to="/products">Products</Link></li>
              <li className={getActiveClass("/quotes")}><Link to="/quotes">Get Quote</Link></li>
              <li className={getActiveClass("/tracking")}><Link to="/tracking">Tracking</Link></li>
              <li className={getActiveClass("/about")}><Link to="/about">About Us</Link></li>
            <li>	<a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">More</a>	
            <ul className="collapse list-unstyled" id="pageSubmenu" >
              <div className="menu-back">
              <li className={getActiveClass("/blog")}><Link to="#">Blog</Link></li>
              <li className={getActiveClass("/contact")}><Link to="/#">Contact Us</Link></li>
             
              <li className={getActiveClass("/checkout")}><Link to="/#">Process Order</Link></li>
              <li className={getActiveClass("/blog-details")}><Link to="#">Blog Details</Link></li>
            </div>
            
            </ul>	
            
            </li>
            </ul>		
            </nav>	
            
            </div>
       
        <div className="offcanvas__text">
          <b></b><p>Seamless procurement experience, every time.</p>
        </div>
      </div>
    </div>
  {/* Offcanvas Menu End */}
  {/* Header Section Begin */}
  <header className="header">
    <div className="header__top">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-7">
            <div className="header__top__left">
              <p>Seamless procurement experience, every time.</p>
            </div>
          </div>
          <div className="col-lg-6 col-md-5">
            <div className="header__top__right">
              <div className="header__top__links">
                <a href="#">Sign in</a>
                <a href="#">FAQs</a>
              </div>
              <div className="header__top__hover">
                <span>GH₵ <i className="arrow_carrot-down" /></span>
                <ul>
                  <li>USD</li>
                  <li>EUR</li>
                  <li>CN¥</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   
    <div className= "header__bottom" >
      <div className="container">
        <div className="row ">
          <div className="col-lg-3 col-md-3">
            <div className="header__logo">
              <Link to={"/"} ><img src="img/headern_logo.png" alt="" /></Link>
            </div>
          </div>
          <div className="col-lg-7 col-md-6">
            <nav className="header__menu">
                <ul>
                  <li className={getActiveClass("/")}><Link to="/">Home</Link></li>
                  <li className={getActiveClass("/products")}><Link to="/products">Products</Link></li>
                  <li className={getActiveClass("/quotes")}><Link to="/quotes">Get Quote</Link></li>
                  <li className={getActiveClass("/tracking")}><Link to="/tracking">Tracking</Link></li>
                  <li className={getActiveClass("/about")}><Link to="/about">About Us</Link></li>
                  <li className="more">
                    <a href="#">More</a>
                    <ul className="dropdown">
                      <li className={getActiveClass("/blog")}><Link to="#">Blog</Link></li>
                      <li className={getActiveClass("/contact")}><Link to="#">Contact Us</Link></li>
                 
                      <li className={getActiveClass("/checkout")}><Link to="#">Process Order</Link></li>
                      <li className={getActiveClass("/blog-details")}><Link to="#">Blog Details</Link></li>
                    </ul>
                  </li>
                </ul>
              </nav>
          </div>
          <div className="col-lg-2 col-md-3">
            <div className="header__nav__option">
            <a href="#" className="search-switch">
                    <FontAwesomeIcon icon={faSearch} style={{color:'white'}}/>
                  </a>
                  <a href="#">
                   <FontAwesomeIcon icon={faHeartRegular} style={{color:'white'}}/>
                  </a>
                  

             
            </div>
          </div>
        </div>
       
        
        <div  className="canvas__open" onClick={toggleMenu}>
       <i  className={isMenuActive? "fa fa-times": "fa fa-bars"}></i>
      </div>
      
      </div>
  
    </div>
  </header>
  {/* Header Section End */}
    </div>
  
      
    
  )
}

export default Navigation
