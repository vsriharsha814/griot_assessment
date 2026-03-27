import React from "react";

const About = () => {
  return (
    <>
      <section id="aboutUs_Mini">
        <div className="first_container">
          <div className="content">
          <h1>ABOUT US</h1>
          <p>
            We are a small team obsessed with well-lit photos, accurate square footage, and hosts who actually answer the phone.
          </p>
          <p>
            Every listing on the demo site is seeded for evaluation, but the flow mirrors what we would ship: browse, compare, bid, and manage your stays in one place.
          </p>
          <p>
            Hosts get a simple inventory view; guests see starting bids in USD and can drill into details before they commit.
          </p>
          <p>
            Feedback welcome—we are iterating fast and your notes help us prioritize what to build next.
          </p>
          </div>
          <button type="button">We strive to offer you best possible homes to stay!</button>
        </div>
        <div className="second_container">
          <div className="image_1">
            <img src="/people.jpg" alt="people" />
          </div>
          <div className="image_2">
            <img src="/people2.jpg" alt="people2" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;