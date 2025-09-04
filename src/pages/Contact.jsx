import React, { useRef, useState } from 'react';
import Navigation from '../components/Navigation';
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faClock, faCheckCircle, faPaperPlane, faUser, faBuilding } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
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
      .sendForm('melittrade', 'template_0hr2pl9', form.current, 'sf26lZpdpTMK2_Agb')
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          setSubmitted(true);
          setFormData({
            fullName: '',
            email: '',
            phoneNumber: '',
            companyName: '',
            subject: '',
            message: ''
          });
          window.scrollTo({ top: 0, behavior: 'smooth' });
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
      title: "Call Us",
      details: "+233 53 879 7707",
      link: "tel:+233 53 879 7707",
      description: "Speak with our team directly",
      color: "#10B981",
      gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)"
    },
    {
      icon: faEnvelope,
      title: "Email Us",
      details: "melit.trade@outlook.com",
      link: "mailto:melit.trade@outlook.com",
      description: "Send us a detailed message",
      color: "#3B82F6",
      gradient: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)"
    },
    {
      icon: faMapMarkerAlt,
      title: "Visit Us",
      details: "Ashaley Botwe, Near Lakeside Shell",
      description: "Accra, Ghana",
      color: "#EF4444",
      gradient: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
    },
    {
      icon: faClock,
      title: "Business Hours",
      details: "Weekdays: 9AM - 5PM",
      description: "Saturday: 12PM - 4PM",
      color: "#F59E0B",
      gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)"
    }
  ];

  return (
    <>
      <Navigation />
      
      {/* Success Message */}
      {submitted && (
        <div className="quote-form-container">
          <div className="quote-success-alert">
            <div className="success-content">
              <div className="success-icon">
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              <div className="success-text">
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form - Styled like Quote Form */}
      <div className="quote-form-container quote_container">
        <div className="section-title">
          <h2>Contact Us</h2>
          <p>We'd love to hear from you. Fill out the form and our team will get back to you promptly.</p>
        </div>

        <form ref={form} onSubmit={sendEmail} className="quote-form">
          <div className="form-section">
            <h3>Your Information</h3>
            <div className="form-group">
              <label>Full Name (Required):</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email Address (Required):</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+233 XX XXX XXXX" />
            </div>
            <div className="form-group">
              <label>Company Name (Optional):</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
            </div>
          </div>

          <div className="form-section">
            <h3>Message Details</h3>
            <div className="form-group">
              <label>Subject (Required):</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Message (Required):</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="5" required placeholder="Tell us about your inquiry, project requirements, or any questions you have..." />
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Sending...' : 'SEND MESSAGE'}
          </button>
        </form>
      </div>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="map-header">
            <h2>Find Our Office</h2>
            <p>Visit us at Ashaley Botwe, Near Lakeside Shell, Accra, Ghana</p>
          </div>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.5!2d-0.1!3d5.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzYnMDAuMCJOIDDCsDA2JzAwLjAiVw!5e0!3m2!1sen!2sgh!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Melit Trade - Ashaley Botwe, Near Lakeside Shell"
            ></iframe>
          </div>
        </div>
      </section>
      
      {/* Powered By Section */}
      <section className="powered-by-section">
        <div className="container">
          <div className="powered-by-content">
            <p>Powered by <a href="https://domitechnologies.com" target="_blank" rel="noopener noreferrer">Domi Technologies</a></p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact; 