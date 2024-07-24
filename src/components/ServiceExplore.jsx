import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen, faTruckFast, faHandshake, faWarehouse, faTruck, faCartShopping, faLock, faBell, faUserTie, faChartLine, faTools} from '@fortawesome/free-solid-svg-icons';

const ServiceExplore = () => {
  const options = {
    items: 1,
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000, // 5 seconds
    autoplayHoverPause: true
  };

  return (
    // <div>
    //   <div className="category-buttons">
    //     <button onClick={() => document.querySelector('.owl-carousel').to('.item-1')}>Consumer Procurement</button>
    //     <button onClick={() => document.querySelector('.owl-carousel').to('.item-2')}>Logistics</button>
    //     <button onClick={() => document.querySelector('.owl-carousel').to('.item-3')}>Wholesale Services</button>
    //     <button onClick={() => document.querySelector('.owl-carousel').to('.item-4')}>Tech-Driven Solutions</button>
    //     <button onClick={() => document.querySelector('.owl-carousel').to('.item-5')}>Consulting Services</button>
    //   </div>
      
    //   <OwlCarousel className="owl-theme" {...options}>
    //     <div className="item item-1">
    //       <h2>Consumer Procurement</h2>
    //       <p><strong>Personalized Sourcing:</strong> Tailored procurement services to meet specific customer needs.</p>
    //       <p><strong>Supplier Network:</strong> Access to an extensive network of reliable suppliers in Mainland China.</p>
    //       <p><strong>Competitive Pricing:</strong> Negotiation of the best prices without compromising quality.</p>
    //       <p><strong>Quality Assurance:</strong> Rigorous quality checks to ensure product standards.</p>
    //     </div>
    //     <div className="item item-2">
    //       <h2>Logistics</h2>
    //       <p><strong>End-to-End Solutions:</strong> Comprehensive logistics services from supplier to final delivery.</p>
    //       <p><strong>Efficient Transportation:</strong> Coordination of air, sea, and land transport to optimize delivery times and costs.</p>
    //       <p><strong>Warehousing:</strong> Secure storage solutions to manage inventory effectively.</p>
    //       <p><strong>Customs Clearance:</strong> Handling of all customs documentation and procedures for smooth import/export processes.</p>
    //     </div>
    //     <div className="item item-3">
    //       <h2>Wholesale Services</h2>
    //       <p><strong>Bulk Purchasing:</strong> Competitive pricing and efficient logistics for large volume orders.</p>
    //       <p><strong>Supplier Relations:</strong> Strong relationships with manufacturers and wholesalers to secure high-quality products.</p>
    //       <p><strong>Inventory Management:</strong> Advanced systems to keep track of stock levels and streamline reordering.</p>
    //     </div>
    //     <div className="item item-4">
    //       <h2>Tech-Driven Solutions</h2>
    //       <p><strong>Intuitive Online Platform:</strong> User-friendly platform for easy order placement and tracking.</p>
    //       <p><strong>Blockchain Integration:</strong> Enhanced transparency and security in transactions through blockchain technology.</p>
    //       <p><strong>Real-Time Updates:</strong> Instant notifications and updates on order status and shipment tracking.</p>
    //       <p><strong>Customer Support:</strong> Dedicated tech support to assist with platform navigation and issues.</p>
    //     </div>
    //     <div className="item item-5">
    //       <h2>Consulting Services</h2>
    //       <p><strong>Supply Chain Optimization:</strong> Expert advice on improving supply chain efficiency and reducing costs.</p>
    //       <p><strong>Risk Management:</strong> Strategies to mitigate risks associated with international trade and logistics.</p>
    //       <p><strong>Regulatory Compliance:</strong> Guidance on compliance with international trade regulations and standards.</p>
    //     </div>
    //   </OwlCarousel>
    // </div>
    
   
    <section className="delivery">
        
    <div className="service_container">
        
      <div className="col-sm-12">
        <div id="progressCarousel" className="carousel slide" data-ride="carousel">
          
        <div className="row justify-content-center">
              <ol className="custom-carousel-indicators text-center">
                <li data-target="#progressCarousel" data-slide-to="0" className="exo">Consumer Procurement</li>
                <li data-target="#progressCarousel" data-slide-to="1" className="exo active">Logistics</li>
                <li data-target="#progressCarousel" data-slide-to="2" className="exo">Wholesale Services</li>
                <li data-target="#progressCarousel" data-slide-to="3" className="exo">Tech-Driven Solutions</li>
                <li data-target="#progressCarousel" data-slide-to="4" className="exo">Consulting Services</li>
              </ol>
            </div>
      
          <div className="row mt-4">
            
            <div className="col-12">
              <div className="carousel-inner">

                {/* Consumer Procurement */}
                <div className="carousel-item">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-7">
                        <div className="procurement-content">
                          <h1>Consumer Procurement</h1>
                          <p>Tailored procurement services to meet specific customer needs. Access to an extensive network of reliable suppliers in Mainland China. Negotiation of the best prices without compromising quality. Rigorous quality checks to ensure product standards.</p>
                          <div className="container my-4 fade-in">
                          <ul className="timeline">
                                <li >
                                    <div className="timeline-badge"><i className="fa fa-pencil"></i></div>
                                    <div className="timeline-panel">
                                        <div className="timeline-heading">
                                        <h4 className="timeline-title">Tell Us</h4>
                                        
                                        </div>
                                        <div className="timeline-body">
                                        <p>Provide your order details and requirements.</p>
                                        </div>
                                    </div>
                                    </li>
                                    <li className="timeline-inverted">
                                    <div className="timeline-badge primary"><i className="fa fa-credit-card"></i></div>
                                    <div className="timeline-panel">
                                        <div className="timeline-heading">
                                        <h4 className="timeline-title">Pay</h4>
                                        </div>
                                        <div className="timeline-body">
                                        <p>Complete the payment process securely</p>
                                        </div>
                                    </div>
                                    </li>
                                    <li>
                                    <div className="timeline-badge secondary"><i className="fa fa-truck"></i></div>
                                    <div className="timeline-panel">
                                        <div className="timeline-heading">
                                        <h4 className="timeline-title">Item Delivered</h4>
                                        </div>
                                        <div className="timeline-body">
                                        <p>Your item will be delivered to your prefered destination safely</p>
                                        </div>
                                    </div>
                                    </li>
                                
                            </ul>
                            </div>

                            <div className="read">
                            <a href="">Read More <i className="fa fa-arrow-right"></i></a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5 vanish">
                        <div className="purchase-image">
                          <img src="img/services/deliver.png" className="img-fluid" alt="Consumer Procurement" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Logistics */}
                <div className="carousel-item active">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-7">
                        <div className="logistics-content">
                          <h1>Logistics</h1>
                          <p>Comprehensive logistics services from supplier to final delivery. Coordination of air, sea, and land transport to optimize delivery times and costs. Secure storage solutions to manage inventory effectively. Handling of all customs documentation and procedures for smooth import/export processes.</p>
                          <div className="container my-4 fade-in">
                          <ul className="timeline">
                                <li >
                                    <div className="timeline-badge"><i className="fa fa-tasks"></i></div>
                                    <div className="timeline-panel">
                                        <div className="timeline-heading">
                                        <h4 className="timeline-title">Plan</h4>
                                        
                                        </div>
                                        <div className="timeline-body">
                                        <p>Strategize your order by detailing your requirements and preferences.</p>
                                        </div>
                                    </div>
                                    </li>
                                    <li className="timeline-inverted">
                                    <div className="timeline-badge primary"><FontAwesomeIcon icon={faTruckFast} /></div>
                                    <div className="timeline-panel">
                                        <div className="timeline-heading">
                                        <h4 className="timeline-title">Transport</h4>
                                        </div>
                                        <div className="timeline-body">
                                        <p>Ensure smooth and secure transportation of your items to the desired location</p>
                                        </div>
                                    </div>
                                    </li>
                                    <li>
                                    <div className="timeline-badge secondary"><FontAwesomeIcon icon={faBoxOpen} /></div>
                                    <div className="timeline-panel">
                                        <div className="timeline-heading">
                                        <h4 className="timeline-title"> Deliver</h4>
                                        </div>
                                        <div className="timeline-body">
                                        <p>Receive your items promptly and efficiently at your doorstep.</p>
                                        </div>
                                    </div>
                                    </li>
                                
                            </ul>
                            </div>

                          <div className="read buy">
                            <a href="">Read More <i className="fa fa-arrow-right"></i></a>
                          </div>
                        </div>
                      </div>
             
                      <div className="col-md-5" vanish>
                        <div className="purchase-image">
                          <img src="img/services/logistics.png" className="img-fluid vanish" alt="Logistics" />
                        </div>
                      </div>
                  
                    </div>
                  </div>
                </div>

                {/* Wholesale Services */}
                <div className="carousel-item">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-7">
                        <div className="wholesale-content">
                          <h1>Wholesale Services</h1>
                          <p>Competitive pricing and efficient logistics for large volume orders. Strong relationships with manufacturers and wholesalers to secure high-quality products. Advanced systems to keep track of stock levels and streamline reordering.</p>
                          <div className="container my-4 fade-in" >
                          <ul className="timeline">
                                <li >
                                    <div className="timeline-badge"><FontAwesomeIcon icon={faHandshake} /></div>
                                    <div className="timeline-panel">
                                        <div className="timeline-heading">
                                        <h4 className="timeline-title">Negotiate</h4>
                                        
                                        </div>
                                        <div className="timeline-body">
                                        <p>Secure competitive pricing and build strong relationships with manufacturers and wholesalers.</p>
                                        </div>
                                    </div>
                                    </li>
                                    <li className="timeline-inverted">
                                    <div className="timeline-badge primary"><FontAwesomeIcon icon={faWarehouse} /></div>
                                    <div className="timeline-panel">
                                        <div className="timeline-heading">
                                        <h4 className="timeline-title">Manage Inventory</h4>
                                        </div>
                                        <div className="timeline-body">
                                        <p>Utilize advanced systems to keep track of price levels and streamline reordering.</p>
                                        </div>
                                    </div>
                                    </li>
                                    <li>
                                    <div className="timeline-badge secondary"><FontAwesomeIcon icon={faTruck} /></div>
                                    <div className="timeline-panel">
                                        <div className="timeline-heading">
                                        <h4 className="timeline-title"> Logistics</h4>
                                        </div>
                                        <div className="timeline-body">
                                        <p>Ensure efficient logistics for large volume orders and timely delivery.</p>
                                        </div>
                                    </div>
                                    </li>
                                
                            </ul>
                            </div>
                          <div className="read door">
                            <a href="">Read More <i className="fa fa-arrow-right"></i></a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5 vanish">
                        <div className="purchase-image">
                          <img src="img/services/wholesale.png" className="img-fluid" alt="Wholesale Services" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tech-Driven Solutions */}
                <div className="carousel-item">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-7">
                        <div className="tech-content">
                          <h1>Tech-Driven Solutions</h1>
                          <p>User-friendly platform for easy order placement and tracking. Enhanced transparency and security in transactions through blockchain technology.</p>
                          <div className="container my-4 fade-in" >
                          <ul className="timeline">
                                <li >
                                    <div className="timeline-badge"><FontAwesomeIcon icon={faCartShopping} /></div>
                                    <div className="timeline-panel">
                                        <div className="timeline-heading">
                                        <h4 className="timeline-title">Order & Track</h4>
                                        
                                        </div>
                                        <div className="timeline-body">
                                        <p>User-friendly platform for easy order placement and tracking.</p>
                                        </div>
                                    </div>
                                    </li>
                                    <li className="timeline-inverted">
                                    <div className="timeline-badge primary"><FontAwesomeIcon icon={faLock} /></div>
                                    <div className="timeline-panel">
                                        <div className="timeline-heading">
                                        <h4 className="timeline-title">Secure Transactions</h4>
                                        </div>
                                        <div className="timeline-body">
                                        <p>Enhanced transparency and security in transactions through blockchain technology.</p>
                                        </div>
                                    </div>
                                    </li>
                                    <li>
                                    <div className="timeline-badge secondary"><FontAwesomeIcon icon={faBell} /></div>
                                    <div className="timeline-panel">
                                        <div className="timeline-heading">
                                        <h4 className="timeline-title"> Notifications</h4>
                                        </div>
                                        <div className="timeline-body">
                                        <p>Instant notifications and updates on order status and shipment tracking.</p>
                                        </div>
                                    </div>
                                    </li>
                                
                            </ul>
                            </div>
                          <div className="read door">
                            <a href="#">Read More <i className="fa fa-arrow-right"></i></a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5 vanish">
                        <div className="purchase-image">
                          <img src="img/services/tech.png" className="img-fluid" alt="Tech-Driven Solutions" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Consulting Services */}
                <div className="carousel-item">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-7">
                        <div className="tech-content">
                          <h1>Consulting Services</h1>
                          <p>Expert advice on improving supply chain efficiency and reducing costs. Strategies to mitigate risks associated with international trade and logistics. Guidance on compliance with international trade regulations and standards.</p>
                          <div className="container my-4 fade-in">
                          <ul className="timeline">
                                <li >
                                    <div className="timeline-badge"><FontAwesomeIcon icon={faUserTie} /></div>
                                    <div className="timeline-panel">
                                        <div className="timeline-heading">
                                        <h4 className="timeline-title">Consult</h4>
                                        
                                        </div>
                                        <div className="timeline-body">
                                        <p>Receive expert advice on improving supply chain efficiency and reducing costs</p>
                                        </div>
                                    </div>
                                    </li>
                                    <li className="timeline-inverted">
                                    <div className="timeline-badge primary"><FontAwesomeIcon icon={faChartLine} /></div>
                                    <div className="timeline-panel">
                                        <div className="timeline-heading">
                                        <h4 className="timeline-title">Strategize</h4>
                                        </div>
                                        <div className="timeline-body">
                                        <p>Enhanced transparency and security in transactions through blockchain technology.</p>
                                        </div>
                                    </div>
                                    </li>
                                    <li>
                                    <div className="timeline-badge secondary"><FontAwesomeIcon icon={faTools} /></div>
                                    <div className="timeline-panel">
                                        <div className="timeline-heading">
                                        <h4 className="timeline-title"> Implement</h4>
                                        </div>
                                        <div className="timeline-body">
                                        <p>Instant notifications and updates on order status and shipment tracking.</p>
                                        </div>
                                    </div>
                                    </li>
                                
                            </ul>
                            </div>
                          <div className="read door">
                            <a href="#">Read More <i className="fa fa-arrow-right"></i></a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5 vanish">
                        <div className="purchase-image">
                          <img src="img/services/consult.png" className="img-fluid" alt="Consulting Services" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default ServiceExplore;
