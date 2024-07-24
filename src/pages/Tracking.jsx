import { Link } from "react-router-dom"
import Navigation from "../components/Navigation"
import PackageTracker from "../components/PackageTracker"

const Tracking = () => {
  return (
    <>
      <Navigation />
       {/* Breadcrumb Section Begin */}
        <section className="breadcrumb-option">
            <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <div className="breadcrumb__text">
                    <h4>About Us</h4>
                    <div className="breadcrumb__links">
                    <Link  to ={"/"}>Home</Link>
                    <span>Tracking</span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        {/* Breadcrumb Section End */}
        <PackageTracker />
        
    </>
  )
}

export default Tracking
