import React, { useEffect, useState } from 'react';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add loading class to body
    document.body.classList.add('loading');
    
    const timer = setTimeout(() => {
      setLoading(false);
      // Remove loading class from body
      document.body.classList.remove('loading');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div id="preloader">
      <div className="loader"></div>
    </div>
  );
};

export default Preloader;
