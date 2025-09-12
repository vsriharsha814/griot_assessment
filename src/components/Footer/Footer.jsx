import React from 'react'
import {Link, useLocation} from "react-router-dom"

const Footer = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
  return (
    <>
        <footer className={isHomePage ? "homePage_footer otherPage_footer" : "otherPage_footer"}>
            <div className="container">
                <h4>PROPERTY RENTAL</h4>
                <p>Hello, the pain itself is a love of consectetur adipisicing elite. True, but what or that this, love to achieve to pain pleasure that pains work accuse explain greater less, except is pain any?</p>
                <ul>
                    <li>
                        <Link to={'/'}>Home</Link>    
                    </li>
                    <li>
                        <Link to={'/termsandconditions'}>Terms And Conditions</Link>    
                    </li>
                    <li>
                        <Link to={'/contact'}>Contact</Link>    
                    </li>    
                </ul>    
            </div> 
            <div className="container">
                <h4>Connect with us</h4>
                <p>+91 000 000 0000</p>
                <p>ozgur@gmail.com</p>
                <p>All Rights Reservsed By Ozgur</p>
            </div>
        </footer>
    </>
  )
}

export default Footer