import React, { useState } from "react";
import axios from "axios";

const UploadNotes = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
      if (!file) {
          alert("Please select a file!");
          return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("subject", subject);
      formData.append("file", file);

      try {
          const res = await fetch("http://localhost:5000/api/notes/upload", {
              method: "POST",
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // ✅ Ensure Token is Included
              body: formData, // ✅ Don't set Content-Type manually!
          });

          const data = await res.json();
          if (res.ok) {
              alert("Upload Successful!");
          } else {
              alert("Upload Failed: " + data.message);
          }
      } catch (error) {
          console.error("Upload Error:", error);
          alert("Upload failed. Check console.");
      }
  };

  return (
      <div>
          <h2>Upload Notes</h2>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button onClick={handleUpload}>Upload</button>
      </div>
  );
};

export default UploadNotes;
