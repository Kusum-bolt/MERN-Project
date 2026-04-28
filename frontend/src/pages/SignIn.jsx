import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); setError(""); setLoading(true);
    try {
      const res = await axios.post("http://localhost:7000/api/auth/signin", form);
      setMessage(`Welcome back, ${res.data.user.firstName}! Redirecting...`);
      setTimeout(() => {
        navigate("/dashboard", { state: { user: res.data.user } });
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>

      

      
      <div style={s.right}>
        <div style={s.card}>

          <div style={s.cardTop}>
            <div style={s.iconCircle}>🔐</div>
            <h2 style={s.title}>Sign In</h2>
            <p style={s.subtitle}>Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={s.field}>
              <label style={s.label}>Email Address</label>
              <input
                style={s.input}
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div style={s.field}>
              <label style={s.label}>Password</label>
              <input
                style={s.input}
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              style={loading ? { ...s.button, opacity: 0.7 } : s.button}
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In →"}
            </button>
          </form>

          {message && (
            <div style={s.successBox}>✓ {message}</div>
          )}
          {error && (
            <div style={s.errorBox}>✕ {error}</div>
          )}

          <div style={s.divider} />

          <p style={s.linkText}>
            Don't have an account?{" "}
            <Link to="/" style={s.link}>Sign Up for Free</Link>
          </p>

        </div>
      </div>

    </div>
  );
}

const s = {
  page: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Arial, sans-serif"
  },

  /* LEFT */
  left: {
    width: "42%",
    background: "linear-gradient(160deg, #ff7e5f, #feb47b)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "36px 44px",
    color: "#fff"
  },
  logo: { fontSize: "22px", fontWeight: "400" },
  leftCenter: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" },
  heroTitle: {
    fontSize: "42px", fontWeight: "800",
    lineHeight: "1.2", margin: "0 0 16px"
  },
  heroSub: {
    fontSize: "15px", opacity: 0.9,
    lineHeight: "1.7", margin: "0 0 36px"
  },
  features: { display: "flex", flexDirection: "column", gap: "16px" },
  feature:  { display: "flex", alignItems: "center", gap: "12px" },
  featureIcon: { fontSize: "20px" },
  featureText: { fontSize: "14px", fontWeight: "600" },
  leftFooter: { fontSize: "12px", opacity: 0.7 },

  /* RIGHT */
  right: {
    flex: 1,
    background: "#3b8194",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 24px"
  },
  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "44px 40px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 20px 60px rgba(255,126,95,0.13)"
  },
  cardTop: { textAlign: "center", marginBottom: "32px" },
  iconCircle: {
    fontSize: "32px",
    width: "64px", height: "64px",
    background: "#fff3f0",
    borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto 16px"
  },
  title: {
    fontSize: "24px", fontWeight: "800",
    color: "#1a1a2e", margin: "0 0 6px"
  },
  subtitle: { fontSize: "14px", color: "#999", margin: 0 },

  field: { marginBottom: "18px" },
  label: {
    display: "block", fontSize: "12px", fontWeight: "700",
    color: "#555", marginBottom: "7px",
    textTransform: "uppercase", letterSpacing: "0.5px"
  },
  input: {
    width: "100%", padding: "12px 14px", borderRadius: "10px",
    border: "1.5px solid #e2e8f0", fontSize: "14px",
    color: "#1a1a2e", outline: "none",
    boxSizing: "border-box", background: "#fafafa"
  },
  button: {
    width: "100%", padding: "13px", borderRadius: "10px",
    background: "linear-gradient(to right, #ff7e5f, #feb47b)",
    color: "#fff", border: "none", fontSize: "15px",
    fontWeight: "700", cursor: "pointer",
    marginTop: "4px", marginBottom: "18px"
  },
  successBox: {
    background: "#f0fdf4", border: "1px solid #bbf7d0",
    color: "#15803d", borderRadius: "10px",
    padding: "12px 16px", fontSize: "13px", marginBottom: "14px"
  },
  errorBox: {
    background: "#fff1f2", border: "1px solid #fecdd3",
    color: "#be123c", borderRadius: "10px",
    padding: "12px 16px", fontSize: "13px", marginBottom: "14px"
  },
  divider: { height: "1px", background: "#f0f0f0", margin: "0 0 20px" },
  linkText: { textAlign: "center", fontSize: "14px", color: "#888", margin: 0 },
  link: { color: "#ff7e5f", fontWeight: "700", textDecoration: "none" },
};
