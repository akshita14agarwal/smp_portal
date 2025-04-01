import mongoose from "mongoose";

const MentorSchema = new mongoose.Schema({
    name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "mentor" }, // Make sure this field exists
    
});
const User = mongoose.model("User", MentorSchema);
export default User;
