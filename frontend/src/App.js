import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MentorDashboard from "./pages/mentordashboard"; 
import Notes from "./pages/Notes";
import { useState, useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import MenteeDashboard from "./pages/MenteeDashboard";
import KnowYourMentors from "./pages/KnowYourMentors";
import UploadPapers from "./pages/Uploadpapers";
import UploadNotes from "./pages/Uploadnotes";

function App() {
    const [user, setUser] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(true);
        }
    }, []);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };
    

    return (
        <Router>
           <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#ddd" }}>
                <h1>SMP Portal</h1>
                <div className ="auth-buttons">
                    {user ? (
                        <>
                            <span>Welcome, {user.email}</span>
                            <button  className ="logout-btn"onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/Login"><button className ="auth-btn">Login</button></Link>
                            <Link to="/Signup"><button className ="auth-btn">Signup</button></Link>
                        </>
                    )}
                </div>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Signup" element={<Signup setUser={setUser} />} />
                <Route path="/Login" element={<Login setUser={setUser} />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute allowedRoles={["mentor"]} />}>
                    <Route path="/MentorDashboard" element={<MentorDashboard />} />
                    <Route path="/upload-notes" element={<UploadNotes />} />

                </Route>

                <Route element={<ProtectedRoute allowedRoles={["mentee"]} />}>
                 <Route path="/notes" element={<Notes />} />

                    <Route path="/MenteeDashboard" element={<MenteeDashboard />} />
                    <Route path="/know-your-mentors" element={<KnowYourMentors />} />


                </Route>

                {/* Unauthorized Access Page */}
                <Route path="/unauthorized" element={<h1>Access Denied</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
