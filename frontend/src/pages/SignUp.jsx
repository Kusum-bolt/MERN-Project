import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); setError("");
    try {
      const res = await axios.post("http://localhost:7000/api/auth/signup", form);
      setMessage(res.data.message);
      setTimeout(() => navigate("/signin"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input style={styles.input} name="firstName" placeholder="First Name"
            value={form.firstName} onChange={handleChange} required />
          <input style={styles.input} name="lastName" placeholder="Last Name"
            value={form.lastName} onChange={handleChange} required />
          <input style={styles.input} name="email" type="email" placeholder="Email"
            value={form.email} onChange={handleChange} required />
          <input style={styles.input} name="password" type="password" placeholder="Password"
            value={form.password} onChange={handleChange} required />
          <button style={styles.button} type="submit">Sign Up</button>
        </form>
        {message && <p style={styles.success}>{message}</p>}
        {error   && <p style={styles.error}>{error}</p>}
        <p style={styles.link}>Already have an account? <Link to="/signin">Sign In</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", display: "flex", alignItems: "center",
    justifyContent: "center", background: "linear-gradient(to right, #43cea2, #185a9d)" },
  card: { background: "#fff", padding: "40px", borderRadius: "12px",
    width: "360px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" },
  title: { textAlign: "center", marginBottom: "20px", color: "#333" },
  input: { width: "100%", padding: "10px", marginBottom: "14px", borderRadius: "6px",
    border: "1px solid #ccc", fontSize: "14px", boxSizing: "border-box" },
  button: { width: "100%", padding: "11px", background: "#185a9d",
    color: "#fff", border: "none", borderRadius: "6px", fontSize: "15px", cursor: "pointer" },
  success: { color: "green", textAlign: "center", marginTop: "10px" },
  error:   { color: "red",   textAlign: "center", marginTop: "10px" },
  link: { textAlign: "center", marginTop: "14px", fontSize: "13px" }
};