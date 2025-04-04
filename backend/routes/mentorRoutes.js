import express from "express";
import User from "../models/mentor.js"; // or wherever your mentor model is

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const mentors = await User.find({ role: "mentor" }).select("-password");
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
