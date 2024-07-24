


// const BannerItem = ({ item, index }) => {
//   // Determine column class based on index for alternating layout
//   let colClass = '';
//   let offsetClass = '';
//   if (index === 0) {
//     colClass = 'col-lg-6';
//     offsetClass = 'offset-lg-6';
//   } else if (index % 2 == 1) {
//     colClass = 'col-lg-6';
//     offsetClass = '';
//   } else {
//     colClass = 'col-lg-6';
//     offsetClass = '';
//   }

//   // Determine the direction of the item
// //   const itemClass = `banner__item ${index % 2 === 1 ? 'banner__item--middle' : ''}`;
  
//   let itemClass = 'banner__item'

//   if (index == 0) {
//     itemClass = 'banner__item banner__item--first';
//   } else if (index % 2 == 1) {
//     itemClass = 'banner__item banner__item--middle';
//   } 
//   else {
//      itemClass = 'banner__item banner__item--last';
//   }
//   return (
//     <div className={`${colClass} ${offsetClass}`}>
//       <div className={itemClass}>
        
//         <div className="banner__item__pic">
//           <img src={item.imgSrc} alt={item.title} />
//         </div>
//         <div className="banner__item__text">
//           <h2>{item.title}</h2>
//           <a href={item.link}>Shop now</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BannerItem;
