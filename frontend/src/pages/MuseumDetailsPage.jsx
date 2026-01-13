import { useParams, useNavigate } from "react-router-dom";
import Chatbot from "../components/Chatbot.jsx";

export default function MuseumDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Add all 6 museums here
  const museumDetails = {
    1: {
      name: "The Louvre",
      location: "Paris",
      description:
        "Home to the Mona Lisa and Venus de Milo, The Louvre is the world's most visited museum.",
      image:
        "https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg",
    },
    2: {
      name: "The British Museum",
      location: "London",
      description:
        "Houses a vast collection of world art and artifacts including the Rosetta Stone.",
      image:
        "https://images.pexels.com/photos/5825377/pexels-photo-5825377.jpeg",
    },
    3: {
      name: "The Met",
      location: "New York",
      description:
        "One of the largest art museums in the world, showcasing over two million works.",
      image:
        "https://images.pexels.com/photos/17097400/pexels-photo-17097400.jpeg",
    },
    4: {
      name: "Uffizi Gallery",
      location: "Florence",
      description:
        "Famous for its outstanding collection of Renaissance art, including works by Botticelli and Michelangelo.",
      image:
        "https://images.pexels.com/photos/30268775/pexels-photo-30268775.jpeg",
    },
    5: {
      name: "Prado Museum",
      location: "Madrid",
      description:
        "Houses one of the finest collections of European art, from the 12th to early 20th century.",
      image:
        "https://images.pexels.com/photos/32380245/pexels-photo-32380245.jpeg",
    },
    6: {
      name: "Rijks Museum",
      location: "Amsterdam",
      description:
        "The Dutch national museum, showcasing masterpieces by Rembrandt, Vermeer, and other Dutch Golden Age artists.",
      image:
        "https://images.pexels.com/photos/208733/pexels-photo-208733.jpeg",
    },
  };

  const museum = museumDetails[id];
  if (!museum) return <p style={{ textAlign: "center", marginTop: "50px" }}>Museum not found.</p>;

  return (
    <div style={styles.page}>
      {/* Banner */}
      <div style={{ ...styles.banner, backgroundImage: `url(${museum.image})` }}>
        <h1 style={styles.title}>{museum.name}</h1>
      </div>

      {/* Info Section */}
      <div style={styles.detailsCard}>
        <p style={styles.location}>
          <strong>📍 Location:</strong> {museum.location}
        </p>
        <p style={styles.description}>{museum.description}</p>

        <button style={styles.bookButton} onClick={() => navigate(`/book/${id}`)}>
          🎟️ Book Tickets
        </button>
      </div>

      <Chatbot />
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Poppins', sans-serif",
    background: "linear-gradient(135deg, #f7efe8, #fdf6f0)",
    minHeight: "100vh",
    paddingBottom: "50px",
  },
  banner: {
    height: "300px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "inset 0 0 100px rgba(0,0,0,0.4)",
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "48px",
    color: "#ffffff",
    textShadow: "2px 2px 15px rgba(0,0,0,0.7)",
  },
  detailsCard: {
    margin: "40px auto",
    padding: "30px",
    width: "60%",
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  location: {
    fontSize: "20px",
    marginBottom: "15px",
    color: "#555",
  },
  description: {
    fontSize: "18px",
    color: "#444",
    lineHeight: "1.6",
    marginBottom: "30px",
  },
  bookButton: {
    padding: "12px 25px",
    background: "#8B4513",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "0.3s",
  },
};
