import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// Save a booking
router.post("/", async (req, res) => {
  try {
    const { userId, museum, date, time, people, names } = req.body;

    const newBooking = new Booking({
      userId,
      museum,
      date,
      time,
      people,
      names
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save booking." });
  }
});

// Get all bookings for a user (optional)
// GET /api/bookings/:userId
router.get("/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings." });
  }
});


export default router;
