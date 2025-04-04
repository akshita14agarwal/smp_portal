import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  //createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Mentor ID
  //createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Announcement", AnnouncementSchema);
