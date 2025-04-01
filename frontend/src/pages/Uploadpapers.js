import React, { useState } from "react";
import "../styles/upload.css";

const UploadPapers = () => {
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
      <h2>Upload Previous Year Paper</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>Upload</button>
    </div>
  );
};

export default UploadPapers;
