import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userId", data.userId);
        alert("Login Successful!");
        navigate("/museums");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server error. Try again!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Welcome to the Museum</h2>
        <p style={styles.subHeading}>Sign in to explore</p>
        <form onSubmit={handleLogin}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <p style={styles.linkText}>
          Don't have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/register")}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=1470&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    fontFamily: "'Poppins', sans-serif",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 1,
  },
  formContainer: {
    width: "380px",
    padding: "40px",
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
    zIndex: 2,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "10px",
    background: "linear-gradient(90deg, #ff8a00, #e52e71)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subHeading: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "25px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "600",
    color: "#333",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(90deg, #ff8a00, #e52e71)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "700",
    transition: "all 0.3s",
  },
  linkText: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px",
    color: "#333",
  },
  link: {
    color: "#e52e71",
    cursor: "pointer",
    textDecoration: "underline",
    fontWeight: "600",
  },
};
