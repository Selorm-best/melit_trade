import React, { useRef, useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const QuoteForm = () => {
  const form = useRef();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    serviceType: [],
    productDescription: '',
    quantity: '',
    qualityStandards: '',
    destinationAddress: '',
    deliveryDate: '',
    budgetRange: '',
    comments: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    // Check if product information was passed from VideoCard
    if (location.state) {
      setProductInfo(location.state);
      // Pre-fill product description with the product name
      setFormData(prev => ({
        ...prev,
        productDescription: `Quote request for: ${location.state.productName}`
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => {
        if (checked) {
          return { ...prevData, serviceType: [...prevData.serviceType, value] };
        } else {
          return { ...prevData, serviceType: prevData.serviceType.filter((service) => service !== value) };
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
            companyName: '',
            email: '',
            phoneNumber: '',
            serviceType: [],
            productDescription: '',
            quantity: '',
            qualityStandards: '',
            destinationAddress: '',
            deliveryDate: '',
            budgetRange: '',
            comments: '',
          });
          // Scroll to top to show success message
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

  return (
    <div className="quote-form-container quote_container">
      {submitted && (
        <div className="quote-success-alert">
          <div className="success-content">
            <div className="success-icon">
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <div className="success-text">
              <h3>Quote Request Submitted Successfully!</h3>
              <p>Thank you for your inquiry. We'll review your requirements and get back to you within 24 hours with a detailed quote.</p>
              <div className="success-arrow">
                <FontAwesomeIcon icon={faArrowRight} />
                <span>Your request is being processed</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="section-title">
        <h2>Get a Quote Form</h2>
        <p> Please fill out the form below to request a detailed quote for our services. Provide as much information as possible to ensure an accurate and timely response.</p>
      </div>

      {productInfo && (
        <div className="product-quote-info">
          <h3>Product Information</h3>
          <div className="product-details">
            <div className="product-image">
              <img src={productInfo.productImage} alt={productInfo.productName} />
            </div>
            <div className="product-text">
              <h4>{productInfo.productName}</h4>
              <p><strong>Category:</strong> {productInfo.productCategory}</p>
              {productInfo.productPrice && <p><strong>Price:</strong> {productInfo.productPrice}</p>}
            </div>
          </div>
        </div>
      )}
      <form ref={form} onSubmit={sendEmail} className="quote-form">
        <div className="form-section">
          <h3>Contact Information</h3>
          <div className="form-group">
            <label>Full Name (Required):</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Company Name (Optional):</label>
            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email Address (Required):</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone Number (Required):</label>
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </div>
        </div>

        <div className="form-section">
          <h3>Service Details</h3>
          <div className="form-group">
            <label>Type of Service Needed (Select all that apply):</label>
            <div className="checkbox-group">
              <div className="checkbox-item">
                <input type="checkbox" name="serviceType" value="Consumer Procurement" onChange={handleChange} id="procurement" />
                <label htmlFor="procurement">Consumer Procurement</label>
              </div>
              <div className="checkbox-item">
                <input type="checkbox" name="serviceType" value="Logistics" onChange={handleChange} id="logistics" />
                <label htmlFor="logistics">Logistics</label>
              </div>
              <div className="checkbox-item">
                <input type="checkbox" name="serviceType" value="Wholesale Services" onChange={handleChange} id="wholesale" />
                <label htmlFor="wholesale">Wholesale Services</label>
              </div>
              <div className="checkbox-item">
                <input type="checkbox" name="serviceType" value="Tech-Driven Solutions" onChange={handleChange} id="tech" />
                <label htmlFor="tech">Tech-Driven Solutions</label>
              </div>
              <div className="checkbox-item">
                <input type="checkbox" name="serviceType" value="Consulting Services" onChange={handleChange} id="consulting" />
                <label htmlFor="consulting">Consulting Services</label>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Product/Service Specifications</h3>
          <div className="form-group">
            <label>Product Description (Please provide detailed information about the product or service required):</label>
            <textarea name="productDescription" value={formData.productDescription} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Quantity (Approximate number of units or volume needed):</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Quality Standards (Specify any quality requirements or certifications needed):</label>
            <input type="text" name="qualityStandards" value={formData.qualityStandards} onChange={handleChange} />
          </div>
        </div>

        <div className="form-section">
          <h3>Delivery Information</h3>
          <div className="form-group">
            <label>Destination Address (City, State, Country):</label>
            <input type="text" name="destinationAddress" value={formData.destinationAddress} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Preferred Delivery Date (DD/MM/YYYY):</label>
            <input type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label>Upload Picture (Optional):</label>
          <div className="file-upload-wrapper">
            <input type="file" name="file" id="file-upload" />
            <label htmlFor="file-upload" className="file-upload-label">
              Choose File
            </label>
            <span id="file-upload-filename" className="file-upload-filename">No file chosen</span>
          </div>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Sending...' : "SUBMIT REQUEST"}
        </button>
      </form>
      
      <div className="qr-code mt-4 text-center">
        <h3>Scan to Get a Quote</h3>
        <QRCode value="https://melittrade.com/quotes" />
      </div>
      
      <div className="powered-by">
        <p>Powered by <a href="https://domitechnologies.com" target="_blank" rel="noopener noreferrer">Domi Technologies</a></p>
      </div>
    </div>
  );
};

export default QuoteForm;
