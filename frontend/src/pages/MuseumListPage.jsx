import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ================== UPDATED NAVBAR WITH LOGOUT ==================
function Navbar({ museums }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 🔹 LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("user"); // remove user session
    navigate("/"); // redirect to login page
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo} onClick={() => navigate("/")}>
        Museum Explorer
      </div>

      <div style={styles.navLinks}>
        <span
          style={styles.link}
          onMouseEnter={(e) => (e.target.style.color = "#ffd700")}
          onMouseLeave={(e) => (e.target.style.color = "#fff")}
          onClick={() => navigate("/")}
        >
          Home
        </span>

        {/* Museums dropdown */}
        <div
          style={styles.dropdownContainer}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <span style={styles.link}>Museums ▾</span>

          {dropdownOpen && (
            <div style={styles.dropdown}>
              {museums.map((museum) => (
                <div
                  key={museum.id}
                  style={styles.dropdownItem}
                  onClick={() => navigate(`/museums/${museum.id}`)}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#f0f0f0")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#fff")
                  }
                >
                  {museum.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <span
          style={styles.link}
          onMouseEnter={(e) => (e.target.style.color = "#ffd700")}
          onMouseLeave={(e) => (e.target.style.color = "#fff")}
          onClick={() => navigate("/contact")}
        >
          Contact
        </span>

        <span
          style={styles.link}
          onMouseEnter={(e) => (e.target.style.color = "#ffd700")}
          onMouseLeave={(e) => (e.target.style.color = "#fff")}
          onClick={() => navigate("/history")}
        >
          History
        </span>

        {/* 🔥 LOGOUT BUTTON ADDED */}
        <span
          style={styles.link}
           onMouseEnter={(e) => (e.target.style.color = "#ffd700")}
           onMouseLeave={(e) => (e.target.style.color = "#fff")}
           onClick={handleLogout}
>
            Logout
        </span>
      </div>
    </nav>
  );
}

// ================== Museum List Page ==================
export default function MuseumListPage() {
  const navigate = useNavigate();

  const museums = [
    {
      id: 1,
      name: "The Louvre",
      location: "Paris",
      image:
        "https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg",
    },
    {
      id: 2,
      name: "The British Museum",
      location: "London",
      image:
        "https://images.pexels.com/photos/5825377/pexels-photo-5825377.jpeg",
    },
    {
      id: 3,
      name: "The Met",
      location: "New York",
      image:
        "https://images.pexels.com/photos/17097400/pexels-photo-17097400.jpeg",
    },
    {
      id: 4,
      name: "Uffizi Gallery",
      location: "Florence",
      image:
        "https://images.pexels.com/photos/30268775/pexels-photo-30268775.jpeg",
    },
    {
      id: 5,
      name: "Prado Museum",
      location: "Madrid",
      image:
        "https://images.pexels.com/photos/32380245/pexels-photo-32380245.jpeg",
    },
    {
      id: 6,
      name: "Rijks Museum",
      location: "Amsterdam",
      image:
        "https://images.pexels.com/photos/208733/pexels-photo-208733.jpeg",
    },
  ];

  return (
    <div style={styles.container}>
      <Navbar museums={museums} /> {/* Navbar Updated */}
      <h2 style={styles.heading}>Discover the World's Most Famous Museums</h2>

      <div style={styles.listContainer}>
        {museums.map((museum) => (
          <MuseumCard key={museum.id} museum={museum} navigate={navigate} />
        ))}
      </div>
    </div>
  );
}

// ================== Museum Card ==================
function MuseumCard({ museum, navigate }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        transform: isHovered ? "translateY(-10px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 15px 35px rgba(0,0,0,0.3)"
          : "0 5px 20px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/museums/${museum.id}`)}
    >
      <div style={styles.imageContainer}>
        <img
          src={museum.image}
          alt={museum.name}
          style={{
            ...styles.cardImage,
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/250x150.png?text=Museum+Image";
          }}
        />
      </div>

      <div style={styles.cardContent}>
        <h3 style={styles.cardTitle}>{museum.name}</h3>
        <p style={styles.cardLocation}>{museum.location}</p>
      </div>
    </div>
  );
}

// ================== Styles ==================
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 50px",
    backgroundColor: "#000",
    color: "#fff",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    fontFamily: "'Playfair Display', serif",
    borderRadius: "15px",
    flexWrap: "wrap",
  },
  logo: {
    fontSize: "26px",
    fontWeight: "700",
    cursor: "pointer",
    letterSpacing: "1px",
    color: "#fff",
  },
  navLinks: {
    display: "flex",
    gap: "30px",
    fontSize: "16px",
    fontWeight: "500",
    flexWrap: "wrap",
    alignItems: "center",
  },
  link: {
    cursor: "pointer",
    transition: "all 0.3s ease",
    padding: "5px 10px",
    borderRadius: "5px",
    color: "#fff",
  },
  dropdownContainer: {
    position: "relative",
  },
  dropdown: {
    position: "absolute",
    top: "35px",
    left: 0,
    backgroundColor: "#fff",
    color: "#000",
    minWidth: "180px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    zIndex: 1000,
    overflow: "hidden",
  },
  dropdownItem: {
    padding: "10px 15px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  container: {
    padding: "40px",
    textAlign: "center",
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#fdf6f0",
  },
  heading: {
    fontSize: "44px",
    fontWeight: "900",
    marginBottom: "50px",
    fontFamily: "'Cinzel', serif",
    color: "#1a1a1a",
    textShadow: "2px 2px 8px rgba(0,0,0,0.1)",
  },
  listContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
  },
  card: {
    width: "270px",
    background: "#fff8f2",
    borderRadius: "20px",
    cursor: "pointer",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#333",
    border: "1px solid #f1e7dc",
  },
  imageContainer: {
    width: "100%",
    overflow: "hidden",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
  },
  cardImage: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
  },
  cardContent: {
    padding: "15px 10px",
    textAlign: "center",
  },
  cardTitle: {
    margin: "10px 0 5px",
    fontSize: "20px",
    fontWeight: "700",
    fontFamily: "'Playfair Display', serif",
    color: "#4b2e2e",
  },
  cardLocation: {
    fontSize: "14px",
    color: "#7a5e5e",
  },
};
