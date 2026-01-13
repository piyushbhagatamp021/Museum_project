import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  museum: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  people: { type: Number, required: true },
  names: { type: String, required: true },
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
