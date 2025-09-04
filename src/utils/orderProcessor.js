import emailjs from '@emailjs/browser';

/**
 * Process a product order by sending order details via email
 * @param {Object} orderData - Order information
 * @param {string} orderData.productName - Name of the product
 * @param {string} orderData.productImage - Product image URL
 * @param {string} orderData.customerName - Customer's name
 * @param {string} orderData.customerEmail - Customer's email
 * @param {string} orderData.customerPhone - Customer's phone
 * @param {string} orderData.quantity - Quantity requested
 * @param {string} orderData.deliveryAddress - Delivery address
 * @param {string} orderData.additionalNotes - Any additional notes
 * @returns {Promise<Object>} - Result of the order processing
 */
export const processOrder = async (orderData) => {
  try {
    // Prepare email template parameters
    const templateParams = {
      to_name: 'Melit Trade Team',
      from_name: orderData.customerName,
      from_email: orderData.customerEmail,
      from_phone: orderData.customerPhone,
      subject: `New Product Order: ${orderData.productName}`,
      message: `
Product Order Details:
- Product: ${orderData.productName}
- Quantity: ${orderData.quantity}
- Delivery Address: ${orderData.deliveryAddress}
- Additional Notes: ${orderData.additionalNotes || 'None'}

Customer Information:
- Name: ${orderData.customerName}
- Email: ${orderData.customerEmail}
- Phone: ${orderData.customerPhone}

This order was placed through the website product catalog.
      `.trim()
    };

    // Send order via email using EmailJS
    const result = await emailjs.send(
      'melittrade', // Service ID
      'template_0hr2pl9', // Template ID
      templateParams,
      'sf26lZpdpTMK2_Agb' // Public Key
    );

    return {
      success: true,
      message: 'Order placed successfully! We will contact you within 24 hours.',
      result: result
    };

  } catch (error) {
    console.error('Order processing error:', error);
    return {
      success: false,
      message: 'Failed to place order. Please try again or contact us directly.',
      error: error
    };
  }
};

/**
 * Validate order data before processing
 * @param {Object} orderData - Order information to validate
 * @returns {Object} - Validation result with isValid boolean and errors array
 */
export const validateOrder = (orderData) => {
  const errors = [];
  
  if (!orderData.productName?.trim()) {
    errors.push('Product name is required');
  }
  
  if (!orderData.customerName?.trim()) {
    errors.push('Customer name is required');
  }
  
  if (!orderData.customerEmail?.trim()) {
    errors.push('Customer email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderData.customerEmail)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!orderData.customerPhone?.trim()) {
    errors.push('Customer phone is required');
  }
  
  if (!orderData.quantity?.trim()) {
    errors.push('Quantity is required');
  }
  
  if (!orderData.deliveryAddress?.trim()) {
    errors.push('Delivery address is required');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
};

/**
 * Format order data for display
 * @param {Object} orderData - Raw order data
 * @returns {Object} - Formatted order data
 */
export const formatOrderData = (orderData) => {
  return {
    ...orderData,
    productName: orderData.productName?.trim() || '',
    customerName: orderData.customerName?.trim() || '',
    customerEmail: orderData.customerEmail?.trim() || '',
    customerPhone: orderData.customerPhone?.trim() || '',
    quantity: orderData.quantity?.trim() || '',
    deliveryAddress: orderData.deliveryAddress?.trim() || '',
    additionalNotes: orderData.additionalNotes?.trim() || ''
  };
};

