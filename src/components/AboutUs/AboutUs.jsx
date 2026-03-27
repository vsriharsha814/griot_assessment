import React from "react";
import AboutComponentMini from "../../subComponents/About";
const AboutUs = () => {
  return (
    <section id="aboutPage" className="page">
      <div className="container">
        <img src="/about.jpg" alt="about" />
        <div className="content">
          <h3>Your peace of mind, our priority!</h3>
          <p>Griot started as a weekend project between two friends who were tired of opaque pricing and endless email threads just to book a cabin.</p>
          <p>Today we focus on clear starting bids, honest photos, and tools that keep guests and hosts on the same page before anyone packs a bag.</p>
          <p>Whether you are planning a family reunion or a solo reset, we want finding the right place to feel straightforward—not like a second job.</p>
        </div>
      </div>
      <AboutComponentMini />
    </section>
  );
};

export default AboutUs;