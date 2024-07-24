import React, { useState } from 'react';
import { motion } from 'framer-motion';


const PackageTracker = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [status, setStatus] = useState(null);

  const handleTrack = () => {
    // Simulate an API call
    setStatus({
      currentLocation: 'New York, NY',
      estimatedDelivery: 'July 20, 2024',
      steps: [
        { location: 'Los Angeles, CA', date: 'July 5, 2024' },
        { location: 'Chicago, IL', date: 'July 7, 2024' },
        { location: 'New York, NY', date: 'July 9, 2024' },
      ],
    });
  };

  return (
    <div className='container track_out spad'>
    <motion.div
      className="tracker-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Track Your Package</h2>
      <input
        type="text"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        placeholder="Enter Tracking Number"
      />
      <button onClick={handleTrack}>Track Package</button>

      {status && (
        <motion.div
          className="tracking-info"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3>Current Location: {status.currentLocation}</h3>
          <p>Estimated Delivery: {status.estimatedDelivery}</p>
          <h4>Tracking Steps:</h4>
          <ul>
            {status.steps.map((step, index) => (
              <motion.li
                key={index}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                {step.location} - {step.date}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
    </div>
  );
};

export default PackageTracker;
