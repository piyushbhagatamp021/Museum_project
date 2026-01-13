import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // no two users with same email
  },
  password: {
    type: String,
    required: true,
  }
});

export default mongoose.model("User", userSchema);
