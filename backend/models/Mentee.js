import mongoose from "mongoose";

const menteeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["mentor", "mentee"], required: true }, // New field

});

export default mongoose.model("Mentee", menteeSchema);
