import React, { useState } from "react";
import "../styles/upload.css";

const UploadNotes = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      alert(`File "${file.name}" uploaded successfully!`);
      setFile(null);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Notes</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>Upload</button>
    </div>
  );
};

export default UploadNotes;
