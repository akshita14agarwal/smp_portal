import express  from "express";
import bcrypt from"bcrypt";
import User  from "../models/mentor.js"; // Adjust path if needed
import jwt from "jsonwebtoken";
import Mentee from "../models/Mentee.js";

const router = express.Router();
// Register Route
// Mentee Signup
router.post("/mentee-signup", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      let mentee = await Mentee.findOne({ email });
      if (mentee) return res.status(400).json({ msg: "Email already registered" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      mentee = new Mentee({ name, email, password: hashedPassword, role: "mentee" });
  
      await mentee.save();
      res.status(201).json({ msg: "Mentee signup successful" });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  });
  
  // Mentor Signup
  router.post("/mentor-signup", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      let mentor = await User.findOne({ email });
      if (mentor) return res.status(400).json({ msg: "Email already registered" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      mentor = new User({ name, email, password: hashedPassword, role: "mentor" });
  
      await mentor.save();
      res.status(201).json({ msg: "Mentor signup successful" });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  });
  
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await Mentee.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Invalid credentials" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
  
      const token = jwt.sign({ id: user._id, role: user.role }, "yourSecretKey", { expiresIn: "1d" });
  
      res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  });
  // Mentee Login
router.post("/mentee-login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const mentee = await Mentee.findOne({ email });
      if (!mentee) return res.status(400).json({ msg: "Invalid credentials" });
  
      const isMatch = await bcrypt.compare(password, mentee.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
  
      const token = jwt.sign({ id: mentee._id, role: "mentee" }, process.env.JWT_SECRET, { expiresIn: "1d" });
  
      res.json({ token, mentee: { id: mentee._id, name: mentee.name, email: mentee.email } });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  });
  
  // Mentor Login
  router.post("/mentor-login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const mentor = await User.findOne({ email });
      if (!mentor) return res.status(400).json({ msg: "Invalid credentials" });
  
      const isMatch = await bcrypt.compare(password, mentor.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
  
      const token = jwt.sign({ id: mentor._id, role: "mentor" }, process.env.JWT_SECRET, { expiresIn: "1d" });
  
      res.json({ token, mentor: { id: mentor._id, name: mentor.name, email: mentor.email } });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  });
  
  
  




export default router;