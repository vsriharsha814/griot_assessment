import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="page authPage">
      <div className="authCard" style={{ textAlign: "center" }}>
        <h3>Page not found</h3>
        <p style={{ margin: "16px 0" }}>The page you are looking for does not exist.</p>
        <Link to="/">Back to home</Link>
      </div>
    </section>
  );
};

export default NotFound;
