// src/components/Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

import { saveBooking } from "../utils/api";
import { getOrCreateUserId } from "../utils/user";

const museums = [
  "The Louvre",
  "The British Museum",
  "The Met",
  "Uffizi Gallery",
  "Prado Museum",
  "Rijksmuseum",
];

const times = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00",
  "17:00",
];

export default function ChatbotIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hello! Do you want to book a ticket?", options: ["Yes", "No"] },
  ]);

  const chatEndRef = useRef(null);
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    museum: "",
    date: "",
    time: "",
    people: "",
    names: "",
  });

  const toggleChat = () => setIsOpen(!isOpen);

  const isValidDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date);
  const isValidTime = (time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
  const isValidNumber = (num) => /^\d+$/.test(num) && parseInt(num) > 0;

  const handleOptionClick = (value) => processMessage(value, true);
  const handleDateSelect = (date) => processMessage(date, true);
  const handleTimeSelect = (time) => processMessage(time, true);

  const processMessage = (userMessage, isOption = false) => {
    setMessages(prev => [...prev, { sender: "user", text: userMessage }]);

    setTimeout(() => {
      let botMessage = "";
      let options = null;
      let datePicker = false;
      let timePicker = false;
      let numberInput = false;
      let textInput = false;

      switch (bookingStep) {
        case 0:
          if (userMessage === "Yes") {
            botMessage = "Great! Which museum would you like to visit?";
            options = museums;
            setBookingStep(1);
          } else if (userMessage === "No") {
            botMessage = "Alright! You can start booking anytime.";
          } else {
            botMessage = "Please choose 'Yes' or 'No'.";
            options = ["Yes", "No"];
          }
          break;

        case 1:
          if (museums.includes(userMessage)) {
            setBookingData(prev => ({ ...prev, museum: userMessage }));
            botMessage = "Select the date you want to visit:";
            datePicker = true;
            setBookingStep(2);
          } else {
            botMessage = "Please select a valid museum from the options above.";
            options = museums;
          }
          break;

        case 2:
          if (isValidDate(userMessage)) {
            setBookingData(prev => ({ ...prev, date: userMessage }));
            botMessage = "Select the time you want to visit:";
            timePicker = true;
            setBookingStep(3);
          } else {
            botMessage = "Invalid date! Please pick a valid date.";
            datePicker = true;
          }
          break;

        case 3:
          if (isValidTime(userMessage)) {
            setBookingData(prev => ({ ...prev, time: userMessage }));
            botMessage = "How many people are coming?";
            numberInput = true;
            setBookingStep(4);
          } else {
            botMessage = "Invalid time! Please select a valid time.";
            timePicker = true;
          }
          break;

        case 4:
          if (isValidNumber(userMessage)) {
            setBookingData(prev => ({ ...prev, people: userMessage }));
            botMessage = "Please provide the names of the attendees (comma separated):";
            textInput = true;
            setBookingStep(5);
          } else {
            botMessage = "Invalid number! Enter a valid number of people.";
            numberInput = true;
          }
          break;

        case 5:
          const enteredNames = userMessage.trim().split(",").map(n => n.trim()).filter(n => n);
          if (enteredNames.length !== parseInt(bookingData.people)) {
            botMessage = `Please enter valid names for all attendees. Expected ${bookingData.people} names.`;
            textInput = true;
          } else {
            const qrData = { ...bookingData, names: userMessage };

            // Show QR code
            setMessages(prev => [
              ...prev,
              { sender: "bot", text: "🎉 Booking complete! Here’s your QR code:", qr: qrData }
            ]);

            // Save booking to backend
            const userId = getOrCreateUserId();
            saveBooking({
              userId,
              museum: bookingData.museum,
              date: bookingData.date,
              time: bookingData.time,
              people: parseInt(bookingData.people),
              names: userMessage
            });

            setBookingStep(0);
            setBookingData({ museum: "", date: "", time: "", people: "", names: "" });
            return;
          }
          break;

        default:
          botMessage = "Do you want to book a ticket?";
          options = ["Yes", "No"];
          setBookingStep(0);
          break;
      }

      setMessages(prev => [...prev, { sender: "bot", text: botMessage, options, datePicker, timePicker, numberInput, textInput }]);
    }, 500);
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    processMessage(message.trim());
    setMessage("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      {/* Floating Button with Hover Slider */}
      {!isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            display: "flex",
            alignItems: "center",
            zIndex: 2000,
            cursor: "pointer",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={toggleChat}
        >
          <div
            style={{
              position: "absolute",
              right: "80px",
              backgroundColor: "#8A2BE2",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: "25px",
              fontWeight: "700",
              fontSize: "18px",
              fontFamily: "'Playfair Display', serif",
              letterSpacing: "0.5px",
              whiteSpace: "nowrap",
              transform: isHovered ? "translateX(0)" : "translateX(60px)",
              opacity: isHovered ? 1 : 0,
              transition: "all 0.3s ease",
              boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
            }}
          >
            Chatbot
          </div>

          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: isHovered ? "#a463ff" : "#8A2BE2",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease",
              animation: isHovered ? "none" : "blink 1s infinite",
            }}
          >
            💬
          </div>

          <style>
            {`
              @keyframes blink {
                0% { opacity: 1; }
                50% { opacity: 0.4; }
                100% { opacity: 1; }
              }
            `}
          </style>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "360px",
            height: "500px",
            backgroundColor: "#f8f6ff",
            borderRadius: "15px",
            boxShadow: "0px 6px 20px rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            fontFamily: "'Poppins', sans-serif",
            zIndex: 2000,
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#8A2BE2",
              color: "white",
              padding: "12px 15px",
              fontWeight: "bold",
              fontSize: "18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Museum Chatbot 🤖
            <button
              onClick={toggleChat}
              style={{
                background: "transparent",
                color: "white",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              ✖
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: "10px", overflowY: "auto", fontSize: "14px", color: "#333" }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ textAlign: msg.sender === "user" ? "right" : "left", margin: "8px 0" }}>
                <span
                  style={{
                    backgroundColor: msg.sender === "user" ? "#8A2BE2" : "#e5e5e5",
                    color: msg.sender === "user" ? "white" : "black",
                    padding: "8px 12px",
                    borderRadius: "20px",
                    display: "inline-block",
                    maxWidth: "80%",
                  }}
                >
                  {msg.text}
                </span>

                {msg.options && (
                  <div style={{ marginTop: "5px", display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(opt)}
                        style={{
                          padding: "5px 10px",
                          borderRadius: "15px",
                          border: "1px solid #8A2BE2",
                          backgroundColor: "#fff",
                          color: "#8A2BE2",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {msg.datePicker && (
                  <div style={{ marginTop: "5px" }}>
                    <input
                      type="date"
                      onChange={(e) => handleDateSelect(e.target.value)}
                      style={{ padding: "5px", borderRadius: "10px", border: "1px solid #ccc" }}
                    />
                  </div>
                )}

                {msg.timePicker && (
                  <div style={{ marginTop: "5px", display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {times.map((t, i) => (
                      <button
                        key={i}
                        onClick={() => handleTimeSelect(t)}
                        style={{
                          padding: "5px 10px",
                          borderRadius: "15px",
                          border: "1px solid #8A2BE2",
                          backgroundColor: "#fff",
                          color: "#8A2BE2",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}

                {msg.qr && (
                  <div style={{ marginTop: "10px" }}>
                    <QRCodeCanvas value={JSON.stringify(msg.qr)} size={150} fgColor="#8A2BE2" bgColor="#fff" />
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "10px", borderTop: "1px solid #ddd", backgroundColor: "#fff", display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage(); }}
              style={{ flex: 1, padding: "8px 12px", borderRadius: "20px", border: "1px solid #ccc", outline: "none" }}
            />
            <button
              onClick={handleSendMessage}
              style={{ backgroundColor: "#8A2BE2", color: "white", border: "none", borderRadius: "20px", padding: "8px 16px", cursor: "pointer" }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
