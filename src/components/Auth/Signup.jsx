import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../api/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "buyer",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      await signupUser(form);
      setSuccessMessage("Account created successfully. Please login.");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <section className="page authPage">
      <div className="authCard">
        <h3>Sign Up</h3>
        <form onSubmit={onSubmit} className="authForm">
          <input name="username" type="text" placeholder="Username" onChange={onChange} required />
          <input name="email" type="email" placeholder="Email" onChange={onChange} required />
          <input name="password" type="password" placeholder="Password" onChange={onChange} required />
          <select name="role" value={form.role} onChange={onChange}>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
          {error ? <p className="authError">{error}</p> : null}
          {successMessage ? <p className="authSuccess">{successMessage}</p> : null}
          <button type="submit">Create Account</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
