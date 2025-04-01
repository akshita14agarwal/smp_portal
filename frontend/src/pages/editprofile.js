import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/editprofile.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const [mentor, setMentor] = useState({
    name: "Akshita Agarwal",
    bio: "Experienced Mentor in Electrical Engineering with Minor in Computer Science and Engineering",
    subjects: "Circuits, Power Systems, Control Systems",
    //profilePic: "/images/profile-placeholder.png",
  });

  const handleChange = (e) => {
    setMentor({ ...mentor, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setMentor({ ...mentor, profilePic: imageUrl });
    }
  };

  const handleSave = () => {
    // Save updated mentor details (send to backend if needed)
    console.log("Updated Profile:", mentor);
    navigate("/mentor-dashboard"); // Redirect to Dashboard
  };

  return (
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>
      <div className="profile-form">
        <label>Profile Picture:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <img src={mentor.profilePic} alt="Profile Preview" className="profile-preview" />

        <label>Name:</label>
        <input type="text" name="name" value={mentor.name} onChange={handleChange} />

        <label>Bio:</label>
        <textarea name="bio" value={mentor.bio} onChange={handleChange} />

        <label>Subjects:</label>
        <input type="text" name="subjects" value={mentor.subjects} onChange={handleChange} />

        <button onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default EditProfile;
