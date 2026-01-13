import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        navigate("/"); // go to login page
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server error. Try again!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Create Account</h2>
        <form onSubmit={handleRegister}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label style={styles.label}>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label style={styles.label}>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={styles.button}>
            Register
          </button>

          <p style={styles.loginLink}>
            Already have an account?{" "}
            <span
              style={styles.loginBtn}
              onClick={() => navigate("/")}
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    /* 🔥 New gradient background */
    background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",

    padding: "20px",
  },

  formContainer: {
    width: "350px",
    padding: "30px",

    /* 🔥 Glassmorphism effect */
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(10px)",

    borderRadius: "15px",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },

  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "bold",
    color: "#444",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",

    /* Nice input focus */
    outline: "none",
    transition: "0.3s",
  },

  button: {
    width: "100%",
    padding: "12px",

    /* 🔥 Button gradient */
    background: "linear-gradient(90deg, #ff7e5f, #feb47b)",

    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.3s",
  },

  loginLink: {
    marginTop: "15px",
    textAlign: "center",
    color: "#333",
    fontSize: "14px",
  },

  loginBtn: {
    color: "#ff4b2b",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

/* Add input hover and focus styles */
styles.input[":focus"] = {
  borderColor: "#ff7e5f",
};
