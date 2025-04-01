import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: String,
  subject: String, // Added Subject
  filePath: String, // Store PDF path
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Note", NoteSchema);
