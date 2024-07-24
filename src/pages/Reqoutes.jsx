import { Link } from "react-router-dom"
import Navigation from "../components/Navigation"
import QuoteForm from "../components/QouteForm"


const Reqoutes = () => {
  return (
    <> 
      <Navigation/>
       {/* Breadcrumb Section Begin */}
        <section className="breadcrumb-option">
            <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <div className="breadcrumb__text">
                    <h4>Request A Quote</h4>
                    <div className="breadcrumb__links">
                    <Link to ={"/"}>Home</Link>
                    <span>Request a Quote </span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        {/* Breadcrumb Section End */}
        <QuoteForm />
    </>
  )
}

export default Reqoutes
