

const BlogItem = ({blog_item, index}) => {
  return (
    <>
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="blog__item">
            <div className="blog__item__pic set-bg" data-setbg={blog_item.img} />
            <div className="blog__item__text">
              <span><img src="img/icon/calendar.png" alt /> {blog_item.date}</span>
              <h5>{blog_item.info}</h5>
              <a key={index} href="#">Read More</a>
            </div>
          </div>
        </div>
    </>
  )
}

export default BlogItem
