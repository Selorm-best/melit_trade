import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const Testimonials = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        
    };

    const testimonials = [
        {
            text: "“Our company's procurement process has significantly improved since partnering with Melit Trade. Their competitive pricing and extensive supplier network have saved us both time and money. The quality of products we receive is consistently high, and their tech-driven solutions make the entire process seamless. Highly recommended!”",
            author: "Kwame Yeboah",
            profession: "Operations Manager",
            imgSrc: "img/about/testimonial-author.jpg",
        },
        {
            text: "“We have been using Melit Trade for our procurement needs for over a year, and the experience has been exceptional. Their commitment to quality and transparency in all dealings sets them apart from other providers. The personalized shopping experience they offer ensures that our unique needs are always met”",
            author: "Kofi Yesu",
            profession: "Purchasing Director",
            imgSrc: "img/about/testimonial-author.jpg",
        },
        // Add more testimonials as needed
    ];

    return (
        <section className="testimonial">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <Slider {...settings}>
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="testimonial__text">
                                    <span className="icon_quotations" />
                                    <p>{testimonial.text}</p>
                                    <div className="testimonial__author">
                                        <div className="testimonial__author__pic">
                                            <img src={testimonial.imgSrc} alt={testimonial.author} />
                                        </div>
                                        <div className="testimonial__author__text">
                                            <h5>{testimonial.author}</h5>
                                            <p>{testimonial.profession}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
