// src/pages/BookingPage.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

export default function BookingPage({ allBookings, setAllBookings }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [tickets, setTickets] = useState(1);
  const [date, setDate] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [qrData, setQrData] = useState(null);

  const handleBooking = (e) => {
    e.preventDefault();

    const newBooking = {
      museum: `Museum ${id}`,
      date: date,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      people: tickets,
      names: name,
    };

    setAllBookings((prev) => [...prev, newBooking]);
    setQrData(JSON.stringify(newBooking));
    setBookingConfirmed(true);
  };

  return (
    <div style={styles.container}>
      {!bookingConfirmed ? (
        <form onSubmit={handleBooking} style={styles.form}>
          <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#4b2e2e" }}>
            Book Tickets for Museum {id}
          </h2>

          <label style={styles.label}>Your Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>Number of Tickets:</label>
          <input
            type="number"
            value={tickets}
            min={1}
            onChange={(e) => setTickets(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>Select Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Book Now
          </button>
        </form>
      ) : (
        <div style={styles.confirmationCard}>
          <h2 style={{ color: "#fff" }}>Booking Confirmed! 🎉</h2>
          <p style={{ color: "#fff", fontSize: "16px", margin: "10px 0" }}>
            {tickets} ticket(s) booked for <strong>{name}</strong> on <strong>{date}</strong> at{" "}
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>

          <div style={styles.qrContainer}>
            <QRCodeCanvas value={qrData} size={180} fgColor="#4b2e2e" bgColor="#fff" />
          </div>

          <button
            style={styles.backButton}
            onClick={() => navigate("/museums")}
          >
            Back to Museums
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #ff9a9e, #fad0c4, #fad0c4, #ffecd2)",
    fontFamily: "'Poppins', sans-serif",
  },
  form: {
    width: "350px",
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#8A2BE2",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
  confirmationCard: {
    width: "400px",
    background: "rgba(0,0,0,0.7)",
    padding: "30px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },
  qrContainer: {
    margin: "20px auto",
    padding: "15px",
    background: "#fff",
    borderRadius: "15px",
    display: "inline-block",
  },
  backButton: {
    marginTop: "20px",
    padding: "12px 30px",
    background: "#ff6f61",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
  },
};
