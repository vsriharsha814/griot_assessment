import React from "react";
import { RiFacebookBoxLine } from "react-icons/ri";

const FACEBOOK_URL = "https://www.facebook.com";
const SubContact = () => {
  return (
    <>
      <section id="contact_Mini">
        <div className="super_container">
        <div className="container_1">
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
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><RiFacebookBoxLine/></a>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><RiFacebookBoxLine/></a>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><RiFacebookBoxLine/></a>
        </ul>
        </div>
        
        <div className="container_2">
          <h3>We&apos;d love to hear from you</h3>
          <form>
            <div>
              <input type="text" placeholder="Your Name"/>
              <input type="email" placeholder="Email"/>
            </div>
            <textarea rows="4" placeholder="Your Message..."/>
            <button type="submit">SEND</button>
          </form>
        </div>
        </div>
      </section>
    </>
  );
};

export default SubContact;