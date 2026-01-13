import { useState } from "react";
import Chatbot from "./Chatbot";

export default function ChatbotIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {!isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsOpen(true)}
          >
            {/* Slider text */}
            <div
              style={{
                position: "absolute",
                right: "70px", // distance from button
                backgroundColor: "#ff9800",
                color: "#fff",
                padding: "10px 15px",
                borderRadius: "20px",
                fontWeight: "600",
                fontSize: "16px",
                whiteSpace: "nowrap",
                transform: isHovered ? "translateX(0)" : "translateX(50px)",
                opacity: isHovered ? 1 : 0,
                transition: "all 0.3s ease",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            >
              Chatbot
            </div>

            {/* Circle button */}
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: isHovered ? "#ffb74d" : "#ff9800",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                transition: "all 0.3s ease",
              }}
            >
              💬
            </div>
          </div>
        </div>
      )}

      {isOpen && <Chatbot onClose={() => setIsOpen(false)} />}
    </>
  );
}
