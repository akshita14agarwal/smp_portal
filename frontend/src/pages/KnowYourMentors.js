import React, { useState } from "react";
import "../styles/mentors.css";

const KnowYourMentors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMentor, setSelectedMentor] = useState("");
  const [doubt, setDoubt] = useState("");
  const [doubts, setDoubts] = useState([]);

  const mentors = [
    { name: "John Doe", email: "john@example.com", contact: "1234567890", branch: "Electrical", domain: "Core" },
    { name: "Jane Smith", email: "jane@example.com", contact: "0987654321", branch: "Computer Science", domain: "Software" },
    { name: "Michael Brown", email: "michael@example.com", contact: "1122334455", branch: "Mechanical", domain: "Consultancy" }
  ];

  const filteredMentors = mentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePostDoubt = () => {
    if (selectedMentor && doubt) {
      setDoubts([...doubts, { mentor: selectedMentor, doubt }]);
      setDoubt("");
    } else {
      alert("Please select a mentor and enter a doubt.");
    }
  };

  return (
    <div className="mentors-container">
      <h2>Know Your Mentors</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="mentors-list">
        {filteredMentors.map((mentor, index) => (
          <div key={index} className="mentor-card">
            <h3>{mentor.name}</h3>
            <p>Email: {mentor.email}</p>
            <p>Contact: {mentor.contact}</p>
            <p>Branch: {mentor.branch}</p>
            <p>Domain: {mentor.domain}</p>
          </div>
        ))}
      </div>

      {/* Post a Doubt Section */}
      <div className="post-doubt">
        <h3>Post a Doubt</h3>
        <select value={selectedMentor} onChange={(e) => setSelectedMentor(e.target.value)}>
          <option value="">Select Mentor</option>
          {mentors.map((mentor, index) => (
            <option key={index} value={mentor.name}>{mentor.name}</option>
          ))}
        </select>
        <textarea
          placeholder="Enter your doubt"
          value={doubt}
          onChange={(e) => setDoubt(e.target.value)}
        />
        <button onClick={handlePostDoubt}>Submit</button>
      </div>

      {/* Display Posted Doubts */}
      <div className="doubt-list">
        <h3>Your Doubts</h3>
        {doubts.map((item, index) => (
          <div key={index} className="doubt-item">
            <p><strong>To:</strong> {item.mentor}</p>
            <p>{item.doubt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowYourMentors;