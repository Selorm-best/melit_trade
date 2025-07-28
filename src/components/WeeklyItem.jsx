import Countdown from "./Countdown"
// Set target date to 7 days from now
const targetDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

const WeeklyItem = () => {
  return (
    <div className="container imp">
      <div className="row">
        <div className="col-lg-3">
          <div className="categories__text">
          <h2>Cloth Collections 
          <br /> 
          <span>Electrical Appliances</span> 
          <br /> 
          Accessories</h2>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="categories__hot__deal">
            <img src="img/product/ups.png" alt />
          </div>
        </div>
        <div className="col-lg-5">
          <div className="categories__deal__countdown">
            <span>Deal Of The Week</span>
              <h2>Uninterruptible power supply (UPS)</h2>
            <Countdown targetDate={targetDate} />
            <a href="/order" className="primary-btn">Place An Order</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeeklyItem
