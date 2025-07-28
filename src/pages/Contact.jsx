import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faClock, faCheckCircle, faUser, faBuilding } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm('melittrade', 'template_contact', form.current, 'sf26lZpdpTMK2_Agb')
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          setSubmitted(true);
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            subject: '',
            message: ''
          });
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  const contactInfo = [
    {
      icon: faPhone,
      title: "Phone Number",
      details: "+233 53 879 7707",
      link: "tel:+233 53 879 7707",
      description: "Call us during business hours"
    },
    {
      icon: faEnvelope,
      title: "Email Address",
      details: "melit.trade@outlook.com",
      link: "mailto:melit.trade@outlook.com",
      description: "Send us an email anytime"
    },
    {
      icon: faMapMarkerAlt,
      title: "Office Location",
      details: "Ashaley Botwe, Near Lakeside Shell",
      description: "Accra, Ghana"
    },
    {
      icon: faClock,
      title: "Business Hours",
      details: "Weekdays: 9AM - 5PM",
      description: "Saturday: 12PM - 4PM"
    }
  ];

  return (
    <>
      <Navigation />
      
      {/* Hero Section Begin */}
      <section className="contact-hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="contact-hero__content">
                <h1>Get In Touch</h1>
                <p>We're here to help and answer any questions you might have. We look forward to hearing from you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Hero Section End */}

      {/* Contact Information Section Begin */}
      <section className="contact-info-section">
        <div className="container">
          <div className="row">
            {contactInfo.map((info, index) => (
              <div key={index} className="col-lg-3 col-md-6 col-sm-6">
                <div className="contact-info-card">
                  <div className="contact-info-card__icon">
                    <FontAwesomeIcon icon={info.icon} />
                  </div>
                  <div className="contact-info-card__content">
                    <h4>{info.title}</h4>
                    {info.link ? (
                      <a href={info.link} className="contact-link">{info.details}</a>
                    ) : (
                      <p className="contact-details">{info.details}</p>
                    )}
                    <p className="contact-description">{info.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Information Section End */}

      {/* Contact Form Section Begin */}
      <section className="contact-form-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="contact-form-wrapper">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="contact-form__info">
                      <h2>Send us a Message</h2>
                      <p>Fill out the form and we'll get back to you as soon as possible. We're here to help with all your procurement needs.</p>
                      
                      {submitted && (
                        <div className="success-message">
                          <FontAwesomeIcon icon={faCheckCircle} />
                          <div>
                            <h4>Message Sent Successfully!</h4>
                            <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="col-lg-6">
                    <div className="contact-form__form">
                      <form ref={form} onSubmit={sendEmail}>
                        <div className="form-row">
                          <div className="form-group">
                            <label>
                              <FontAwesomeIcon icon={faUser} />
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              placeholder="Your full name"
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>
                              <FontAwesomeIcon icon={faEnvelope} />
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder="your.email@example.com"
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>
                              <FontAwesomeIcon icon={faPhone} />
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+233 XX XXX XXXX"
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>
                              <FontAwesomeIcon icon={faBuilding} />
                              Company Name
                            </label>
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              placeholder="Your company name"
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>Subject *</label>
                            <input
                              type="text"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              required
                              placeholder="What is this regarding?"
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>Message *</label>
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              required
                              rows="5"
                              placeholder="Tell us about your inquiry..."
                            ></textarea>
                          </div>
                        </div>

                        <div className="form-row">
                          <button 
                            type="submit" 
                            className="submit-button" 
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <span className="loading-spinner"></span>
                                Sending Message...
                              </>
                            ) : (
                              'Send Message'
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Form Section End */}

      {/* Map Section Begin */}
      <section className="map-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="map-container">
                <div className="map-header">
                  <h2>Find Our Office</h2>
                  <p>Visit us at Ashaley Botwe, Near Lakeside Shell, Accra, Ghana</p>
                </div>
                <div className="map-wrapper">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.5!2d-0.1!3d5.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzYnMDAuMCJOIDDCsDA2JzAwLjAiVw!5e0!3m2!1sen!2sgh!4v1234567890"
                    width="100%"
                    height="500"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Melit Trade - Ashaley Botwe, Near Lakeside Shell"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Map Section End */}
    </>
  );
};

export default Contact; 