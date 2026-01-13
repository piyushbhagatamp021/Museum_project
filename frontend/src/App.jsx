import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MuseumListPage from "./pages/MuseumListPage";
import MuseumDetailsPage from "./pages/MuseumDetailsPage";
import BookingPage from "./pages/BookingPage";
import HistoryPage from "./pages/HistoryPage";
import Chatbot from "./components/Chatbot";

function AppContent() {
  const location = useLocation();
  const [allBookings, setAllBookings] = useState([]);

  // ❌ Hide chatbot on login OR register page 
  const hideChatbot =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/museums" element={<MuseumListPage />} />
        <Route path="/museums/:id" element={<MuseumDetailsPage />} />
        <Route
          path="/book/:id"
          element={
            <BookingPage
              allBookings={allBookings}
              setAllBookings={setAllBookings}
            />
          }
        />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>

      {/* 👇 Show chatbot only AFTER login */}
      {!hideChatbot && <Chatbot />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
