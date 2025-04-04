import React, { useState } from 'react';
import axios from 'axios';

const UploadPreviousPaper = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('mentorId', 'your_mentor_id_here'); // Replace with actual mentor ID
    const token = localStorage.getItem('token'); // Or sessionStorage, if that's where you store it

    try {
      await axios.post('http://localhost:5000/api/papers/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,  // 👈 this is key

        },
      });
      
      alert('Uploaded successfully');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <input
        type="text"
        placeholder="Paper Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-2 py-1 mb-2 w-full"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload Paper
      </button>
    </div>
  );
};

export default UploadPreviousPaper;
