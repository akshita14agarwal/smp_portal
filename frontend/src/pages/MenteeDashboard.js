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
      const res = await axios.get("http://localhost:5000/api/notes");
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

  useEffect(() => {
    fetchMentors();
    fetchNotes();
    fetchAnnouncements();
  }, []);

  return (
    <div className="dashboard-container">
      {/* ✅ "Know Your Mentors" Section */}
      <div className="section">
        <h2>Know Your Mentors</h2>
        <button onClick={() => navigate("/know-your-mentors")}>View Mentors</button>

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

      {/* ✅ Available Notes Section */}
      <div className="section">
        <h2>Available Notes</h2>
        <ul>
          {notes.map((note, index) => (
            <li key={index} onClick={() => navigate(`/notes/${note.subject}`)}>
              📚 {note.subject} Notes
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Announcements Section */}
      <div className="section">
        <h2>Latest Announcements</h2>
        <ul>
          {announcements.map((ann, index) => (
            <li key={index}>
              <strong>{ann.title}</strong> <br />
              {ann.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenteeDashboard;
