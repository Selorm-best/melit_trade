import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (isHovered) {
        videoElement.play().catch(e => console.log('Video autoplay prevented'));
      } else {
        videoElement.pause();
        videoElement.currentTime = 0;
      }
    }
  }, [isHovered]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleOrderClick = () => {
    // Navigate to quote form with product information
    navigate('/quotes', { 
      state: { 
        productName: video.productName,
        productImage: video.img,
        productCategory: video.category,
        productPrice: video.price
      } 
    });
  };

  return (
    <>
      <div 
        className="video-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleModalOpen}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <div className="video-card-thumbnail">
          <div className="thumbnail-image">
            <img src={video.img} alt={video.productName} />
          </div>
          {video.vid && video.vid !== 'videos/na.mp4' ? (
            <div className="video-overlay">
              <div className="video-error"></div>
            </div>
          ) : (
            <video 
              ref={videoRef}
              src={video.vid} 
              className="thumb-video" 
              muted 
              loop
              style={{ opacity: isHovered ? 1 : 0 }}
            />
          )}
        </div>
           
        <div className="product__item bord">
          <div className="product__item__text video_text">
            <h6 title={video.productName}>
              {video.productName.length > 30 ? video.productName.substring(0, 30) + "..." : video.productName}
            </h6>
                               
            <button 
              className="add-cart order-btn" 
              onClick={(e) => {
                e.stopPropagation();
                handleOrderClick();
              }}
            >
              Get Quote
            </button>
            
            <div className="product__color__select">
              <label htmlFor="pc-1">
                <input type="radio" id="pc-1" />
              </label>
              <label className="active black" htmlFor="pc-2">
                <input type="radio" id="pc-2" />
              </label>
              <label className="grey" htmlFor="pc-3">
                <input type="radio" id="pc-3" /> 
              </label>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="video-modal-screen active">
          <FontAwesomeIcon 
            icon={faTimes} 
            className="vid-modal-close-btn" 
            onClick={handleModalClose} 
          />
         
          <div className="video-modal-content">
            <video src={video.vid} className="modal-video" controls autoPlay loop />
            <div className="modal-video-info">
              <div className="container mt-3">
                <FontAwesomeIcon className='media_close_btn' onClick={handleModalClose} icon={faTimes} />
                <div className="row">
                  <div className="col d-flex justify-content-between align-items-center">
                    <span className="modal_title">{video.productName}</span>
                    <button 
                      className='add-to-cart order-btn'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleModalClose();
                        handleOrderClick();
                      }}
                    >
                      + Get Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default VideoCard;
