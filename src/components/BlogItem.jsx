
import { Link } from "react-router-dom";

const BlogItem = ({blog_item, index}) => {
  return (
    <>
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="blog__item">
            <div className="blog__item__pic set-bg" data-setbg={blog_item.img} />
            <div className="blog__item__text">
              <span><img src="img/icon/calendar.png" alt /> {blog_item.date}</span>
              <h5>{blog_item.info}</h5>
              <Link to={`/blog/${blog_item.id}`} className="blog__item__readmore">
                Read More
              </Link>
            </div>
          </div>
        </div>
    </>
  )
}

export default BlogItem
