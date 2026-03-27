import "./TermsAndConditions.css";

const TermsAndConditions = () => {
  return (
    <section id="termsandcond" className="page">
      <header>
        <h1>Terms and Conditions</h1>
        <p>Please read these terms before using the platform.</p>
      </header>
      <div className="content">
        <h5>1. Use of Platform</h5>
        <p>Users must provide accurate information and comply with local laws.</p>
        <h5>2. Listings and Bids</h5>
        <p>Listing owners are responsible for their content. Bids are final once submitted.</p>
        <h5>3. Accounts</h5>
        <p>Keep your account credentials secure. You are responsible for account activity.</p>
      </div>
    </section>
  );
};

export default TermsAndConditions;
