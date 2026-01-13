// src/pages/HistoryPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { getBookingHistory } from "../utils/api";
import { getOrCreateUserId } from "../utils/user";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";

export default function HistoryPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = getOrCreateUserId();
  const qrRefs = useRef({}); // store refs for each booking’s QR

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getBookingHistory(userId);
        if (Array.isArray(data)) setBookings(data);
        else setBookings([]);
      } catch (err) {
        console.error("Failed to load history:", err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [userId]);

  // 📥 Download PDF (Beautiful Rich UI Ticket)
const handleDownload = (b) => {
  const doc = new jsPDF();
  const qrCanvas = qrRefs.current[b._id];
  const qrDataUrl = qrCanvas ? qrCanvas.toDataURL("image/png") : "";

  // 🌈 Background (soft gradient tone)
  doc.setFillColor(255, 220, 240);
  doc.rect(0, 0, 210, 297, "F");

  // 🎫 Title - "Your Ticket"
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.setTextColor(190, 24, 93);
  const title = "Your Ticket";
  const pageWidth = doc.internal.pageSize.getWidth();
  const titleWidth = doc.getTextWidth(title);
  doc.text(title, (pageWidth - titleWidth) / 2, 30);

  // 🧾 Ticket Box
  const boxX = 15, boxY = 45, boxW = 180, boxH = 100;
  doc.setDrawColor(255, 105, 180); // pink border
  doc.setLineWidth(1);
  doc.roundedRect(boxX, boxY, boxW, boxH, 5, 5);

  // 📋 Ticket Details inside the box
  let y = boxY + 15;
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);

  const details = [
    ["Museum:", b.museum],
    ["Date:", b.date],
    ["Time:", b.time],
    ["People:", b.people],
    ["Names:", b.names],
    ["User ID:", b.userId],
    ["Booked On:", new Date(b.createdAt).toLocaleString()],
  ];

  details.forEach(([key, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(key, 25, y);
    doc.setFont("helvetica", "normal");
    doc.text(value.toString(), 65, y);
    y += 12;
  });

  // 🌀 QR code on right side of the box
  if (qrDataUrl) {
    doc.addImage(qrDataUrl, "PNG", 145, 60, 40, 40);
  }

  // 💖 Thank You Message (centered, below ticket box)
  doc.setFont("helvetica", "italic");
  doc.setFontSize(16);
  doc.setTextColor(200, 50, 120);
  const thankYou = "Thank you for your Booking!";
  const textWidth = doc.getTextWidth(thankYou);
  doc.text(thankYou, (pageWidth - textWidth) / 2, boxY + boxH + 25);

  // 💾 Save the PDF
  doc.save(`${b.museum}_Ticket.pdf`);
};


  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🎟️ Your Booking History</h1>

      {loading ? (
        <p style={styles.note}>Loading...</p>
      ) : bookings.length === 0 ? (
        <p style={styles.note}>No bookings found yet. Book a ticket to see it here.</p>
      ) : (
        <div style={styles.list}>
          {bookings.map((b) => (
            <div key={b._id} style={styles.card} className="booking-card">
              <div style={styles.left}>
                <h2 style={styles.museum}>{b.museum}</h2>
                <p style={styles.meta}>
                  <strong>Date:</strong> {b.date} • <strong>Time:</strong> {b.time}
                </p>
                <p style={styles.meta}>
                  <strong>People:</strong> {b.people} • <strong>Names:</strong> {b.names}
                </p>
                <p style={styles.small}>
                  Booked on {new Date(b.createdAt).toLocaleString()}
                </p>

                {/* ⬇️ Download Button */}
                <button
                  onClick={() => handleDownload(b)}
                  style={styles.downloadBtn}
                  onMouseEnter={(e) => (e.target.style.background = "#ec4899")}
                  onMouseLeave={(e) => (e.target.style.background = "#f472b6")}
                >
                  ⬇️ Download Ticket
                </button>
              </div>

              <div style={styles.right}>
                <QRCodeCanvas
                  ref={(el) => (qrRefs.current[b._id] = el)}
                  value={
                    b.qrData
                      ? b.qrData
                      : JSON.stringify({
                          museum: b.museum,
                          date: b.date,
                          time: b.time,
                          names: b.names,
                        })
                  }
                  size={120}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Page background and hover styling */}
      <style>
        {`
          body {
            background: linear-gradient(135deg, #fbc2eb, #fda085);
            min-height: 100vh;
            margin: 0;
          }
          .booking-card {
            transition: all 0.3s ease;
          }
          .booking-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            background: rgba(255,255,255,0.95);
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  page: {
    padding: 24,
    fontFamily: "'Poppins', sans-serif",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ffe6f0, #ffd1dc)",
  },
  title: {
    marginBottom: 16,
    color: "#831843",
    fontSize: 32,
    fontWeight: "600",
    textAlign: "center",
  },
  note: { color: "#374151", textAlign: "center", marginTop: 20 },
  list: {
    display: "grid",
    gap: 16,
    maxWidth: 800,
    margin: "auto",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#ffffffd9",
    padding: 20,
    borderRadius: 16,
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
    border: "1px solid #f9a8d4",
  },
  left: { maxWidth: "70%" },
  right: { textAlign: "center" },
  museum: { margin: 0, color: "#be185d" },
  meta: { margin: "6px 0", color: "#374151" },
  small: { marginTop: 8, color: "#6b7280", fontSize: 12 },
  downloadBtn: {
    marginTop: 10,
    background: "#f472b6",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "8px 14px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "0.3s",
  },
};
