import PreviousPaper from '../models/PreviousPaper.js';

export const getAllPapers = async (req, res) => {
  try {
    const papers = await PreviousPaper.find().sort({ createdAt: -1 });
    res.json(papers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching papers' });
  }
};

