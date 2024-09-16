import React, { useRef, useState } from 'react';
import QRCode from 'qrcode.react';
import emailjs from '@emailjs/browser';

const QuoteForm = () => {
  const form = useRef();
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
      .sendForm('service_2wf34dl', 'template_0hr2pl9', form.current, 'sf26lZpdpTMK2_Agb')
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
      setLoading(false);
  };

  return (
    <div className="quote-form-container quote_container">
      <div className="section-title">
        <h2>Get a Quote Form</h2>
        <p> Please fill out the form below to request a detailed quote for our services. Provide as much information as possible to ensure an accurate and timely response.</p>
      </div>
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
            <div className="form-check">
                <label className="form-check-label">Consumer Procurement</label>
                <input type="checkbox" name="serviceType" value="Consumer Procurement" onChange={handleChange} />
            </div>
            <div className="form-check">
                <label className="form-check-label">Logistics </label>
                <input type="checkbox" name="serviceType" value="Logistics" onChange={handleChange} />
            </div>
            <div className="form-check">
                <label className="form-check-label">Wholesale Services</label>
                <input type="checkbox" name="serviceType" value="Wholesale Services" onChange={handleChange} />
            </div>
            <div className="form-check">
                <label className="form-check-label">Tech-Driven Solutions</label>
                <input type="checkbox" name="serviceType" value="Tech-Driven Solutions" onChange={handleChange} />
            </div>
            <div className="form-check">
                <label className="form-check-label">Consulting Services</label>
                <input type="checkbox" name="serviceType" value="Consulting Services" onChange={handleChange} />
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
          {loading? 'Sending...' :"SUBMIT REQUEST"}
          </button>
      </form>
      <div className="qr-code mt-4 text-center">
        <h3>Scan to Get a Quote</h3>
        <QRCode value="https://melittrade.com/quotes" />
      </div>
    </div>
  );
};

export default QuoteForm;
