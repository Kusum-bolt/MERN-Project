import { useNavigate, useLocation } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.circle}>✓</div>
        <h1 style={s.title}>Welcome, {user?.firstName || "User"}! 🎉</h1>
        <p style={s.sub}>You have successfully logged in.</p>
        <div style={s.divider} />
        <div style={s.infoBox}>
          <h2>DashBoard Is Here!!</h2>
        </div>
        <button onClick={() => navigate("/signin")} style={s.btn}>Logout</button>
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #ff7e5f, #feb47b)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif"
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "50px 44px",
    width: "100%",
    maxWidth: "420px",
    textAlign: "center",
    boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
  },
  circle: {
    width: "65px", height: "65px", borderRadius: "50%",
    background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
    color: "#fff", fontSize: "28px", fontWeight: "700",
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto 20px"
  },
  title: { fontSize: "24px", fontWeight: "800", color: "#1a1a2e", margin: "0 0 8px" },
  sub:   { fontSize: "14px", color: "#888", margin: "0 0 24px" },
  divider: { height: "1px", background: "#f0f0f0", margin: "0 0 24px" },
  infoBox: { background: "#fff8f5", borderRadius: "12px", padding: "16px 20px", marginBottom: "28px", textAlign: "left" },
  infoRow: { display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#333", margin: "8px 0" },
  label:  { color: "#888", fontWeight: "600" },
  btn: {
    width: "100%", padding: "13px", borderRadius: "10px",
    background: "linear-gradient(to right, #ff7e5f, #feb47b)",
    color: "#fff", border: "none", fontSize: "15px",
    fontWeight: "700", cursor: "pointer"
  },
};