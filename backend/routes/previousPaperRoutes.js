import express from 'express';
import multer from 'multer';
import PreviousPaper from '../models/PreviousPaper.js';
import path from "path";
import { verifyToken, isMentor } from "../middleware/authMiddleware.js";


const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // or use cloud storage like Cloudinary

// Upload previous paper
router.post('/upload',verifyToken, isMentor, upload.single('file'), async (req, res) => {
    try {
      console.log("Body:", req.body);
      console.log("File:", req.file);
  
      const { title} = req.body;
  
      if (!req.file) {
        return res.status(400).json({ error: 'File not uploaded' });
      }
  
      const fileUrl = req.file.path;
  
      const newPaper = new PreviousPaper({
        title,
        fileUrl,
        uploadedBy: req.user.id,
      });
  
      await newPaper.save();
      res.status(201).json({ message: 'Paper uploaded successfully' });
  
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ error: err.message });
    }
  });
  

// Get all papers
router.get('/', async (req, res) => {
  try {
    const papers = await PreviousPaper.find().populate('uploadedBy', 'name');
    res.json(papers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



export default router;
