import mongoose from 'mongoose';

const previousPaperSchema = new mongoose.Schema({
  title: String,
  fileUrl: String, // Cloud storage or local URL
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
  uploadedAt: { type: Date, default: Date.now }
});

const PreviousPaper = mongoose.model('PreviousPaper', previousPaperSchema);
export default PreviousPaper;
