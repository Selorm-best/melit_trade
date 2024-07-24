import React from 'react';
import VideoCard from './VideoCard';


const videoData = [
  {
    img: 'thumbnail-images/thumb1.png',
    vid: 'videos/1.mp4',
    productName: 'A Long And Winding Road Going Up The Mountain Rock Plateau',
    price: '$192',
    rating: '1 day ago'
  },
  {
    img: 'thumbnail-images/thumb2.png',
    vid: 'videos/2.mp4',
    productName: 'Red Leaves | In Autumn',
    price: '$1,092',
    rating: '5'
  },
  {
    img: 'thumbnail-images/thumb3.png',
    vid: 'videos/2.mp4',
    productName: 'Red Leaves | In Autumn',
    price: '$599',
    rating: '4'
  },
  {
    img: 'thumbnail-images/thumb4.png',
    vid: 'videos/1.mp4',
    productName: 'Red Leaves | In Autumn',
    price: '$602' ,
    rating: '4'
  },
  {
    img: 'thumbnail-images/thumb5.png',
    vid: 'videos/2.mp4',
    productName: 'Red Leaves | In Autumn',
    price: '$1,902',
    rating: '4'
  },
  {
    img: 'thumbnail-images/thumb6.png',
    vid: 'videos/2.mp4',
    productName: 'Red Leaves | In Autumn',
    price: '$602',
    rating: '5'
  },
 
  // Add more video data here
];

const VideoCardContainer = () => {
  return (
    <div className="video-card-container">
      {videoData.map((video, index) => (
        <VideoCard key={index} video={video} />
      ))}
    </div>
  );
};

export default VideoCardContainer;
