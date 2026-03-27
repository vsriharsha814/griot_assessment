import React from "react";
import { RiFacebookBoxLine } from "react-icons/ri";
const FACEBOOK_URL = "https://www.facebook.com";
const Contact = () => {
  return (
    <>
      <section id="contact">
        <h1>CONTACT US</h1>
        <p>Questions about a listing, a bid, or hosting your own place? We read every message.</p>
        <p>
          Our support team is here weekdays 9am–6pm Pacific. For urgent trip issues, mention your booking reference in the subject line.
        </p>
        <div className="container">
          <img src="https://plus.unsplash.com/premium_photo-1661749309788-0bba60b81222?w=800&q=80" alt="about" />
          <div className="content">
              <h3>Let&apos;s connect</h3>
              <div>
                <p>Phone</p>
                <span>+1 (555) 010-2044</span>
              </div>
              <div>
                <p>Email</p>
                <span>hello@griotrentals.demo</span>
              </div>
              <div>
                <p>Address</p>
                <span>428 Harbor View Ave, Suite 300, Portland, OR 97201</span>
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