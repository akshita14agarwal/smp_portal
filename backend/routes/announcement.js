import express from "express";
import Announcement from "../models/Announcement.js";
import { verifyToken, isMentor } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📌 Mentors Can Post an Announcement
router.post("/create", async (req, res) => {
  try {

      const { title, message } = req.body;

      if (!title || !message) {
          return res.status(400).json({ message: "Title and content are required" });
      }

      const newAnnouncement = new Announcement({ title, content });
      await newAnnouncement.save();

      res.status(201).json({ content: "Announcement posted successfully!" });
  } catch (error) {
      console.error("🚨 Announcement Error:", error);
      res.status(500).json({ content: "Server error", error: error.message });
  }
});

// 📌 Mentees Can View Announcements
// Route to get all announcements
router.get("/view", async (req, res) => {
  try {
      const announcements = await Announcement.find();  // Fetch all announcements from the database
      res.status(200).json(announcements);  // Send announcements as a response
  } catch (error) {
      console.error(" Error fetching announcements:", error);
      res.status(500).json({ message: "Server error" });
  }
});

export default router;
