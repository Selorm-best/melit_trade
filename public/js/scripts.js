window.onscroll = function() {
    fixNavbar();
};

function fixNavbar() {
    var headerBottom = document.querySelector('.header__bottom');
    if (!headerBottom) return; // Check if element exists

    // console.log('Current Y Offset:', window.pageYOffset); // Debugging output
    if (window.pageYOffset > 0) {
        headerBottom.classList.add('fixed');
        // console.log('Added fixed class');
    } else {
        headerBottom.classList.remove('fixed');
        // console.log('Removed fixed class');
    }
}

// Adding custom styles
const style = document.createElement('style');
style.innerHTML = `
    .theme .owl-nav [class*='owl-'] {
        border-radius: 10px !important; /* Your new border-radius */
    }
`;
document.head.appendChild(style);



// // Sample data for images and text
// const items = [
//   { imgSrc: 'img/banner/banner-1.jpg', title: 'Title 1', description: 'Description for item 1', link: '#1' },
//   { imgSrc: 'img/banner/banner-2.jpg', title: 'Title 2', description: 'Description for item 2', link: '#2' },
//   { imgSrc: 'img/banner/banner-3.jpg', title: 'Title 3', description: 'Description for item 3', link: '#3' },
//   { imgSrc: 'img/banner/banner-1.jpg', title: 'Title 4', description: 'Description for item 4', link: '#4' }
// ];

// // Container where items will be appended
// const bannerContainer = document.getElementById('banner-container');

// // Function to create item elements
// function createItemElements(items) {
//   items.forEach((item, index) => {
//     // Create a div for each item
//     const bannerItem = document.createElement('div');
//     bannerItem.classList.add('banner__item');

//     // Create the image container
//     const imageContainer = document.createElement('div');
//     imageContainer.classList.add('banner__item__pic');
//     const img = document.createElement('img');
//     img.src = item.imgSrc;
//     img.alt = `Image ${index + 1}`;
//     imageContainer.appendChild(img);

//     // Create the text container
//     const textContainer = document.createElement('div');
//     textContainer.classList.add('banner__item__text');
//     const h2 = document.createElement('h2');
//     h2.textContent = item.title;
//     const p = document.createElement('p');
//     p.textContent = item.description;
//     const a = document.createElement('a');
//     a.href = item.link;
//     a.textContent = 'Read More';

//     // Append text elements to the text container
//     textContainer.appendChild(h2);
//     textContainer.appendChild(p);
//     textContainer.appendChild(a);

//     // Append image and text containers to the banner item
//     bannerItem.appendChild(imageContainer);
//     bannerItem.appendChild(textContainer);

//     // Append banner item to the container
//     bannerContainer.appendChild(bannerItem);
//   });
// }

// // Populate the item elements
// createItemElements(items);
