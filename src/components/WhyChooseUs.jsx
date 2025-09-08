import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faCertificate, faLaptopCode, faUsers, faEye, faCheckCircle } from '@fortawesome/free-solid-svg-icons';


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
                            <FontAwesomeIcon icon={faDollarSign} className="why-choose-us-icon" />
                            <h5>Competitive Pricing</h5>
                            <p>Through our extensive supplier network, we offer competitive pricing.</p>
                        </div>
                        <div className="why-choose-us-item">
                            <FontAwesomeIcon icon={faCertificate} className="why-choose-us-icon" />
                            <h5>High Standards of Quality</h5>
                            <p>We adhere to high standards of quality in all our products and services.</p>
                        </div>
                        <div className="why-choose-us-item">
                            <FontAwesomeIcon icon={faLaptopCode} className="why-choose-us-icon" />
                            <h5>Tech-Driven Solutions</h5>
                            <p>Our online platform leverages technology to provide innovative solutions.</p>
                        </div>
                        <div className="why-choose-us-item">
                            <FontAwesomeIcon icon={faUsers} className="why-choose-us-icon" />
                            <h5>Customer-Centric Approach</h5>
                            <p>We put our customers at the center of everything we do.</p>
                        </div>
                        <div className="why-choose-us-item">
                            <FontAwesomeIcon icon={faEye} className="why-choose-us-icon" />
                            <h5>Transparency</h5>
                            <p>We believe in maintaining transparency in all our dealings.</p>
                        </div>
                        <div className="why-choose-us-item">
                            <FontAwesomeIcon icon={faCheckCircle} className="why-choose-us-icon" />
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
