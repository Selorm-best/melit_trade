import React from 'react';
import { FaDollarSign, FaCertificate, FaLaptopCode, FaShoppingCart, FaUsers, FaEye, FaCheckCircle } from 'react-icons/fa';


const WhyChooseUs = () => {
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="about__item">
                    <h4>Why Choose Us</h4>
                    <p className="leading-text">
                        We are committed to providing exceptional service and unmatched quality. Here are the reasons why you should choose us:
                    </p>
                    <div className="why-choose-us">
                        <div className="why-choose-us-item">
                            <FaDollarSign className="why-choose-us-icon" />
                            <h5>Competitive Pricing</h5>
                            <p>Through our extensive supplier network, we offer competitive pricing.</p>
                        </div>
                        <div className="why-choose-us-item">
                            <FaCertificate className="why-choose-us-icon" />
                            <h5>High Standards of Quality</h5>
                            <p>We adhere to high standards of quality in all our products and services.</p>
                        </div>
                        <div className="why-choose-us-item">
                            <FaLaptopCode className="why-choose-us-icon" />
                            <h5>Tech-Driven Solutions</h5>
                            <p>Our online platform leverages technology to provide innovative solutions.</p>
                        </div>
                        <div className="why-choose-us-item">
                            <FaUsers className="why-choose-us-icon" />
                            <h5>Customer-Centric Approach</h5>
                            <p>We put our customers at the center of everything we do.</p>
                        </div>
                        <div className="why-choose-us-item">
                            <FaEye className="why-choose-us-icon" />
                            <h5>Transparency</h5>
                            <p>We believe in maintaining transparency in all our dealings.</p>
                        </div>
                        <div className="why-choose-us-item">
                            <FaCheckCircle className="why-choose-us-icon" />
                            <h5>Quality Commitment</h5>
                            <p>We are committed to providing quality products and services.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
