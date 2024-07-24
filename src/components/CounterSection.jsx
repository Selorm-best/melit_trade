import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceGrinBeam, faFaceSmileHala } from '@fortawesome/free-solid-svg-icons';
import { FaSmile,FaUsers, FaWeightHanging, FaCheckCircle } from 'react-icons/fa';

import { FaPlus } from 'react-icons/fa';
const CounterSection = () => {
    const [clients, setClients] = useState(0);
    const [categories, setCategories] = useState(0);
    const [inCountry, setInCountry] = useState(0);
    const [happyCustomers, setHappyCustomers] = useState(0);

    useEffect(() => {
        const targetClients = 102;
        const targetCategories = 30;
        const targetInCountry = 102;
        const targetHappyCustomers = 98;
        const incrementSpeed = 50; // Adjust this value for speed

        const incrementCounter = (setCounter, target) => {
            const interval = setInterval(() => {
                setCounter(prev => {
                    if (prev < target) {
                        return prev + 1;
                    } else {
                        clearInterval(interval);
                        return prev;
                    }
                });
            }, incrementSpeed);
        };

        incrementCounter(setClients, targetClients);
        incrementCounter(setCategories, targetCategories);
        incrementCounter(setInCountry, targetInCountry);
        incrementCounter(setHappyCustomers, targetHappyCustomers);

        // Cleanup intervals on unmount
        return () => {
            clearInterval(incrementCounter);
        };
    }, []);

    return (
        <section className="counter spad">
           <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="counter__item">
                            <div className="counter__item__icon">
                            <FontAwesomeIcon icon={faFaceGrinBeam} />
                            </div>
                            <div className="counter__item__number">
                                <h2 className="cn_num">{clients}<FaPlus className="plus-icon" /></h2>
                            </div>
                            <span>Happy <br />Customers</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="counter__item">
                            <div className="counter__item__icon">
                                <FaUsers />
                            </div>
                            <div className="counter__item__number">
                                <h2 className="cn_num">{categories}<FaPlus className="plus-icon" /></h2>
                            </div>
                            <span>Acquired <br />Users</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="counter__item">
                            <div className="counter__item__icon">
                                <FaWeightHanging />
                            </div>
                            <div className="counter__item__number">
                                <h2 className="cn_num">{inCountry}<text style={{color:'#3498db', fontWeight:'bold'}}>MT</text><FaPlus className="plus-icon" /></h2>
                            </div>
                            <span>Weights of <br />Goods Moved</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="counter__item">
                            <div className="counter__item__icon">
                                <FaCheckCircle />
                            </div>
                            <div className="counter__item__number">
                                <h2 className="cn_num">{happyCustomers}<FaPlus className="plus-icon" /></h2>
                            </div>
                            <span>Completed <br />Orders</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CounterSection;
