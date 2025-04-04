import express from "express";
import multer from "multer";
import path from "path";
import { verifyToken, isMentor } from "../middleware/authMiddleware.js";
import Note from "../models/Note.js";
import { getAllNotes } from "../controllers/noteController.js";

const router = express.Router();

// 📌 Configure Multer for File Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// ✅ Upload Notes Route
router.post("/upload", verifyToken, isMentor, upload.single("file"), async (req, res) => {
  try {
    const { title, subject } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const note = new Note({
      title,
      subject,
      filePath: req.file.path,
      uploadedBy: req.user.id,
    });

    await note.save();
    res.status(201).json({ message: "Note uploaded successfully" });

  } catch (err) {
    console.error("❌ Upload Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// 📌 Route: View Notes (Mentee) - Filter by Subject
router.get("/view", verifyToken, async (req, res) => {
  try {
    const { subject } = req.query; // Get subject from request
    const query = subject ? { subject } : {}; // Filter by subject if provided

    const notes = await Note.find(query).populate("uploadedBy", "name");
    res.json(notes);
  } catch (err) {
    console.error("View Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 📌 Serve Uploaded Files
router.use("/uploads", express.static("uploads"));

export default router;
