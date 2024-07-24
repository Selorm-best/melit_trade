import Countdown from "./Countdown"
const targetDate = new Date('2024-08-31')

const WeeklyItem = () => {
  return (
    <div className="container imp">
      <div className="row">
        <div className="col-lg-4">
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
            {/* <div className="hot__deal__sticker">
              <span>Sale Of</span>
              <h5>$29.99</h5>
            </div> */}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="categories__deal__countdown">
            <span>Deal Of The Week</span>
              <h2>Uninterruptible power supply (UPS)</h2>
            

           <Countdown targetDate={targetDate} />
               
            <a href="#" className="primary-btn">Place An Order</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeeklyItem
