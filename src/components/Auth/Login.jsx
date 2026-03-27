import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "", role: "buyer" });
  const [error, setError] = useState("");

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await loginUser(form);
      login({
        token: response.token,
        userId: response.userId,
        role: response.role,
      });
      navigate(response.role === "seller" ? "/seller/inventory" : "/villas");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <section className="page authPage">
      <div className="authCard">
        <h3>Login</h3>
        <form onSubmit={onSubmit} className="authForm">
          <input name="email" type="email" placeholder="Email" onChange={onChange} required />
          <input name="password" type="password" placeholder="Password" onChange={onChange} required />
          <select name="role" value={form.role} onChange={onChange}>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
          {error ? <p className="authError">{error}</p> : null}
          <button type="submit">Login</button>
        </form>
        <p>
          No account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
