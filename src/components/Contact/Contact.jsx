import React from "react";
import { RiFacebookBoxLine } from "react-icons/ri";
const FACEBOOK_URL = "https://www.facebook.com";
const Contact = () => {
  return (
    <>
      <section id="contact">
        <h1>CONTACT US</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unless something similar pleasure!
        </p>
        <div className="container">
          <img src="https://plus.unsplash.com/premium_photo-1661749309788-0bba60b81222?w=800&q=80" alt="about" />
          <div className="content">
              <h3>Let&apos;s connect</h3>
              <div>
                <p>Phone</p>
                <span>+91 000 000 0000</span>
              </div>
              <div>
                <p>Email</p>
                <span>ozgur@gmail.com</span>
              </div>
              <div>
                <p>Address</p>
                <span>House No.123 Sector A-1</span>
              </div>
              <ul>
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <RiFacebookBoxLine />
                </a>
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <RiFacebookBoxLine />
                </a>
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <RiFacebookBoxLine />
                </a>
              </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;