import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import MentorDashboard from "./pages/mentordashboard";
import UploadNotes from "./pages/Uploadnotes";
import UploadPapers from "./pages/Uploadpapers";
import Home from "./pages/home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<MentorDashboard />} />
        <Route path="/upload-notes" element={<UploadNotes />} />
        <Route path="/upload-papers" element={<UploadPapers />} />

      </Routes>
    </Router>
  );
};

export default App;
