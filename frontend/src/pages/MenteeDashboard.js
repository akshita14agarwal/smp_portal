import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/dashboard.css";


const MenteeDashboard = () => {
  const navigate = useNavigate();



  // ✅ State for mentors, notes, and announcements
  const [mentors, setMentors] = useState([]);
  const [notes, setNotes] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [papers, setPapers] = useState([]);


  // ✅ Fetch mentors
  const fetchMentors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/mentors");
      setMentors(res.data);
    } catch (err) {
      console.error("Failed to fetch mentors", err);
    }
  };

  // ✅ Fetch notes
  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token"); // make sure you're storing token after login
  
      const res = await axios.get("http://localhost:5000/api/notes/view", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes", err);
    }
  };
  

  // ✅ Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/announcements/all");
      setAnnouncements(res.data);
    } catch (err) {
      console.error("Failed to fetch announcements", err);
    }
  };
  //fetch papers
  const fetchPapers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/papers"); // This should match your backend route
      setPapers(res.data);
    } catch (err) {
      console.error("Failed to fetch papers", err);
    }
  };
  

  useEffect(() => {
    fetchMentors();
    fetchNotes();
    fetchAnnouncements();
    fetchPapers();
  }, []);

  return (
    <div className="dashboard-container">
      <h1> Welcome to Your Mentee Dashboard</h1>
      {/* ✅ "Know Your Mentors" Section */}
      <div className="dashboard-grid">
        {/*left coln */}
        <div className="dashboard-left">
      <div className="dashboard-section">
        <div className =" section -header">
        <h2>Know Your Mentors</h2>
        <button onClick={() => navigate("/know-your-mentors")}>View Mentors</button>
        </div>
        <div className= "card-container">
        <ul>
          {mentors.map((mentor, index) => (
            <li key={index}>
              <strong>{mentor.name}</strong> <br />
              📧 {mentor.email} <br />
              📞 {mentor.contact}
            </li>
          ))}
        </ul>
      </div>
      </div>

      {/* ✅ Available Notes Section */}
      <div className="dashboard-section">
  <h2>Available Notes</h2>
  <ul className="list">
  {notes.map((note, index) => (
    <li key={index}>
      📚 {note.title} ({note.subject}) —{" "}
      <a
        href={`http://localhost:5000/${note.filePath}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Download
      </a>
    </li>
  ))}
</ul>

</div>
</div>
{/*papers*/}
{/* ✅ Previous Year Papers Section */}
<div className="dashboard-section">
  <h2>Previous Year Papers</h2>
  <ul className="list">
    {papers.map((paper, index) => (
      <li key={index}>
        📄 {paper.title} —{" "}
        <a
          href={`http://localhost:5000/${paper.filePath}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </a>
      </li>
    ))}
  </ul>
</div>



      {/* ✅ Announcements Section */}
      <div className= "dashboard-right">
      <div className="dashboard-section annoucements-section">
        <h2>Latest Announcements</h2>
        <ul className="list">
          {announcements.map((ann, index) => (
            <li key={index}>
              <strong>{ann.title}</strong> <br />
              {ann.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
    </div>

  );
};

export default MenteeDashboard;
