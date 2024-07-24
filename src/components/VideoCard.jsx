import React, { useState, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTimes } from '@fortawesome/free-solid-svg-icons';

const VideoCard = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && video.vid) {
      videoRef.current.play().catch(() => setVideoError(true));
      videoRef.current.playbackRate = 2.0;
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleCardClick = () => {
    if (video.vid && !videoError) {
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <>
      <div className='product__item'>
      <div 
        className="video-card" 
        
      >
        <div className="video-card-body" onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}>
          <div className="video-thumbnail">
            <img src={process.env.PUBLIC_URL + video.img} className="thumb-img" alt="" />
            {isHovered && videoError ? (
              <div className="video-error"></div>
            ) : (
              <video 
                ref={videoRef}
                src={video.vid} 
                className="thumb-video" 
                muted 
                loop
                style={{ opacity: isHovered ? 1 : 0 }}
              ></video>
              
            )}
            </div>
           
          </div>
          
          <div className="product__item bord">
                        <div className="product__item__text video_text">
                      
                            <h6 title='{video.productName}'>{ video.productName.length > 30 ? video.productName.substring(0, 30) + "..."  : video.productName }</h6>
                               
                            <a href="#" className="add-cart">Place An Order</a>
                            {/* <div className="rating">
                               <i><FontAwesomeIcon icon={faStar} className='star' /></i> 
                               <i><FontAwesomeIcon icon={faStar} className='star' /></i> 
                               <i><FontAwesomeIcon icon={faStar}className='star'  /></i> 
                               <i><FontAwesomeIcon icon={faStar}className='star'  /></i> 
                           
                               <i><FontAwesomeIcon className='star'  icon={faStar} style={{color:'transparent', stroke:'black', strokeWidth:'5px'}}/></i>
                            </div> */}
                            {/* <h5>{video.price}</h5> */}
                            <div className="product__color__select">
                                <label for="pc-1">
                                    <input type="radio" id="pc-1" />
                                </label>
                                <label className="active black" for="pc-2" >
                                    <input type="radio" id="pc-2" />
                                </label>
                                <label className="grey" for="pc-3">
                                    <input type="radio" id="pc-3" /> 
                                </label>
                            </div>
                        </div>
            </div>
              
          {/* <p className="video-card-title" title={video.title}>
            {video.title.length > 50 ? video.title.substring(0, 55) + "..." : video.title}
          </p> */}
          {/* <div className="video-card-info">
            <a href="#" className="user"><i className="fa fa-user"></i> {video.user}</a>
            <span className="uploaded-time"><i className="fa fa-clock"></i> {video.uploadedTime}</span>
          </div> */}
        
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
      <video src={video.vid} className="modal-video" controls autoPlay loop></video>

      <div className="modal-video-info">
        <div className="container mt-3">
          <FontAwesomeIcon className='media_close_btn' onClick={handleModalClose} icon={faTimes} />
          <div className="row">
            <div className="col d-flex justify-content-between align-items-center">
              <span className="modal_title">{video.productName}</span>
              <a href='#' className='add-to-cart'>+ Add to Cart</a>
            </div>
          </div>
          {/* <div className='row n_spad'>
            <div className='col'>
              <div className="product__item__text">
                <div className="rating">
                  <i><FontAwesomeIcon icon={faStar} className='star' /></i> 
                  <i><FontAwesomeIcon icon={faStar} className='star' /></i> 
                  <i><FontAwesomeIcon icon={faStar} className='star' /></i> 
                  <i><FontAwesomeIcon icon={faStar} className='star' /></i> 
                  <i><FontAwesomeIcon icon={faStar} className='star' style={{color:'transparent', stroke:'black', strokeWidth:'5px'}} /></i>
                </div>
                <h5>$67.24</h5>
              </div>
            </div>
          </div>   */}
        </div>
      </div>
    </div>
        </div>
      )}
    </>
  );
};

export default VideoCard;
