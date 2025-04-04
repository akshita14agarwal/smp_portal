import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/dashboard.css';
import'../styles/auth.css';
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import styles
import "../styles/CalendarStyles.css"; // Custom CSS for highlighting



const MentorDashboard = () => {
  const navigate = useNavigate();
  //meetings

  const [date, setDate] = useState(new Date());
  const [meetings, setMeetings] = useState([
    { date: "2025-04-10", title: "Meeting with Student A" },
    { date: "2025-04-12", title: "Doubt Session with Group" },
  ]);
  const [selectedDates, setSelectedDates] = useState([]); // Store highlighted dates



    // Function to format dates for comparison
    const formatDate = (date) => date.toISOString().split("T")[0];
    // Toggle date selection for meeting scheduling
  const handleDateClick = (selectedDate) => {
    const formattedDate = formatDate(selectedDate);

    setSelectedDates((prev) =>
      prev.includes(formattedDate)
        ? prev.filter((date) => date !== formattedDate) // Remove if already selected
        : [...prev, formattedDate] // Add if not selected
    );
  };




  const [mentor, setMentor] = useState({
    name: "Hello SMP Mentor, Akshita Agarwal",
    bio: "Mentor in Electrical Engineering with Minor in Computer Science and Engineering",
    profilePic: "/images/profile.png", // ✅ Fixed image path
  });

  const [announcement, setAnnouncement] = useState({ title: "", message: "" });
  const [announcements, setAnnouncements] = useState([]); // ✅ Store announcements
  const [students, setStudents] = useState(["Student 1", "Student 2", "Student 3"]);
  const [newStudent, setNewStudent] = useState("");

  // ✅ Fetch Announcements from API
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/announcements/view");
      setAnnouncements(res.data.map(ann => ({ title: ann.title, message: ann.content }))); // ✅ Correct field names

    } catch (err) {
      alert("Failed to fetch announcements");
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // ✅ Add Student Function
  const handleAddStudent = () => {
    if (newStudent.trim() !== "") {
      setStudents([...students, newStudent]); // Add to list
      setNewStudent(""); // Clear input
    }
  };

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setAnnouncement({ ...announcement, [e.target.name]: e.target.value });
  };

  // ✅ Post Announcement & Refresh List
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/announcements/create", 
        { title: announcement.title, content: announcement.message }, // ✅ Match backend field names
        { withCredentials: true }
      );
      alert("Announcement posted successfully!");
      setAnnouncement({ title: "", message: "" });
      fetchAnnouncements(); // ✅ Refresh after posting
    } catch (err) {
      alert("Failed to post announcement");
  

    }
  };

  return (
    <div className="dashboard-container">
      {/* ✅ Left Side: Profile & Mentees */}
      <div className="left-section">
        <div className="mentor-profile">
          <img src={mentor.profilePic} alt="Mentor" className="profile-pic" />
          <h2>{mentor.name}</h2>
          <p>{mentor.bio}</p>
          <button onClick={() => navigate("/edit-profile")}>Edit Profile</button>
        </div>

        <div className="students-section">
          <h2>Your Mentees</h2>
          <ul>
            {students.map((student, index) => (
              <li key={index}>{student}</li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Enter student name"
            value={newStudent}
            onChange={(e) => setNewStudent(e.target.value)}
            className="student-input"
          />
          <button className="add-student-btn" onClick={handleAddStudent}>
            Add Student
          </button>
        </div>
      </div>

      {/* ✅ Right Side: Upload Buttons on Top & Announcements Below */}
      <div className="right-section">
        {/* ✅ Upload Buttons on Top right */}
        <div className="top-right-buttons">
          <button className ="upload-btns"onClick={() => navigate("/upload-notes")}>Upload Notes</button>
          <button className="upload-btn" onClick={() => navigate("/upload-papers")}>Upload Previous Year Paper</button>
        </div> {/* Calendar Section */}
        <div className="calendar-section">
          <h3>📅 Upcoming Meetings</h3>
          <Calendar
            onClickDay={handleDateClick}
            value={date}
            tileClassName={({ date }) =>
              selectedDates.includes(formatDate(date)) ? "highlight" : null
            }
          />

          <h4>📝 Meetings on {formatDate(date)}</h4>
          <ul>
            {meetings
              .filter((m) => m.date === formatDate(date))
              .map((m, index) => (
                <li key={index}>{m.title}</li>
              ))}
          </ul>

          <h4>🟡 Selected Meeting Dates</h4>
          <ul>
            {selectedDates.length > 0 ? (
              selectedDates.map((d, index) => <li key={index}>{d}</li>)
            ) : (
              <p>No meetings scheduled</p>
            )}
          </ul>
        </div>



        {/* ✅ Announcements Below Upload Buttons */}
        <div className="announcement-section">
          <h3>Post an Announcement</h3>
          <form className="announcement-form" onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title" value={announcement.title} onChange={handleChange} required />
            <textarea name="message" placeholder="Message" value={announcement.message} onChange={handleChange} required />
            <button type="submit">Post</button>
          </form>

          <h3>Recent Announcements</h3>
          <ul className="announcement-list">
            {announcements.map((ann, index) => (
              <li key={index} className="announcement-item">
                <h4>{ann.title}</h4>
                <p>{ann.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;  


