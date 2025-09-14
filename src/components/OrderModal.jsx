import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { processOrder, validateOrder, formatOrderData } from '../utils/orderProcessor';

const OrderModal = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    quantity: '',
    deliveryAddress: '',
    additionalNotes: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors.includes(name)) {
      setErrors(prev => prev.filter(error => error !== name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare order data
    const orderData = {
      ...formData,
      productName: product?.productName || 'Unknown Product',
      productImage: product?.img || ''
    };

    // Validate order data
    const validation = validateOrder(orderData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      // Process the order
      const result = await processOrder(formatOrderData(orderData));
      
      if (result.success) {
        setSubmitted(true);
        // Reset form
        setFormData({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          quantity: '',
          deliveryAddress: '',
          additionalNotes: ''
        });
        
        // Auto-close modal after 3 seconds
        setTimeout(() => {
          onClose();
          setSubmitted(false);
        }, 3000);
      } else {
        setErrors([result.message]);
      }
    } catch (error) {
      setErrors(['An unexpected error occurred. Please try again.']);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      setSubmitted(false);
      setErrors([]);
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        quantity: '',
        deliveryAddress: '',
        additionalNotes: ''
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="order-modal-overlay" onClick={handleClose}>
      <div className="order-modal" onClick={(e) => e.stopPropagation()}>
        <div className="order-modal-header">
          <h3>Place Order</h3>
          <button 
            className="order-modal-close" 
            onClick={handleClose}
            disabled={loading}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {submitted ? (
          <div className="order-success">
            <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
            <h4>Order Placed Successfully!</h4>
            <p>Thank you for your order. We will contact you within 24 hours to confirm details and discuss next steps.</p>
            <div className="order-details">
              <p><strong>Product:</strong> {product?.productName}</p>
              <p><strong>Quantity:</strong> {formData.quantity}</p>
            </div>
          </div>
        ) : (
          <>
            {product && (
              <div className="product-summary">
                <img src={product.img} alt={product.productName} />
                <div className="product-info">
                  <h4>{product.productName}</h4>
                  {product.price && <p className="product-price">{product.price}</p>}
                </div>
              </div>
            )}

            {errors.length > 0 && (
              <div className="order-errors">
                {errors.map((error, index) => (
                  <p key={index} className="error-message">{error}</p>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="order-form">
              <div className="form-group">
                <label htmlFor="customerName">Full Name *</label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className={errors.includes('customerName') ? 'error' : ''}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="customerEmail">Email Address *</label>
                <input
                  type="email"
                  id="customerEmail"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  className={errors.includes('customerEmail') ? 'error' : ''}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="customerPhone">Phone Number *</label>
                <input
                  type="tel"
                  id="customerPhone"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  className={errors.includes('customerPhone') ? 'error' : ''}
                  placeholder="+233 XX XXX XXXX"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="quantity">Quantity *</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className={errors.includes('quantity') ? 'error' : ''}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="deliveryAddress">Delivery Address *</label>
                <textarea
                  id="deliveryAddress"
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  className={errors.includes('deliveryAddress') ? 'error' : ''}
                  rows="3"
                  placeholder="Enter your complete delivery address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="additionalNotes">Additional Notes</label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Any special requirements or specifications..."
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleClose}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
                      Processing...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderModal;












