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
                <p>We help travelers discover unique homes and hosts list with confidence. Browse villas, compare starting bids, and book stays that feel like a getaway—not a gamble.</p>
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
                <p>+1 (555) 010-2044</p>
                <p>hello@griotrentals.demo</p>
                <p>© 2026 Griot Property Rentals. All rights reserved.</p>
            </div>
        </footer>
    </>
  )
}

export default Footer