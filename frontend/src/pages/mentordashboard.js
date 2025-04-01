import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

const MentorDashboard = () => {
  const mentorName = "Hello Mentor, Akshita Agarwal "; // Replace with dynamic name
  const students = ["Alice", "Bob", "Charlie", "David", "Eve"];
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Mentor Name on the Top Left */}
      <span className="mentor-name">{mentorName}</span>

      {/* Top Right Buttons */}
      <div className="top-right">
        <button onClick={() => navigate("/upload-notes")}>Upload Notes</button>
        <button onClick={() => navigate("/upload-papers")}>Upload Previous Year Paper</button>
      </div>

      {/* Students List */}
      <div className="students-section">
        <h2>Student List</h2>
        <ul>
          {students.map((student, index) => (
            <li key={index}>{student}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MentorDashboard;
