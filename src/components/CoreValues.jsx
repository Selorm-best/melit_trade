import { FaLightbulb, FaShieldAlt, FaBolt } from 'react-icons/fa';


const CoreValues = () => {
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="about__item">
                    <h4>Our Core Values</h4>
                    <div className="core-values">
                        <div className="core-value-item">
                            <FaLightbulb className="core-value-icon" />
                            <h5>Innovation</h5>
                            <p>We embrace change and creativity to deliver the best solutions.</p>
                        </div>
                        <div className="core-value-item">
                            <FaShieldAlt className="core-value-icon" />
                            <h5>Integrity</h5>
                            <p>We adhere to the highest standards of ethics and transparency.</p>
                        </div>
                        <div className="core-value-item">
                            <FaBolt className="core-value-icon" />
                            <h5>Efficiency</h5>
                            <p>We strive to achieve maximum productivity with minimum wasted effort.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoreValues;
