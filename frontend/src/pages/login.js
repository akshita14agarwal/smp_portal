import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "../styles/auth.css";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "", role: "mentee" });
  const navigate = useNavigate(); // ✅ Initialize useNavigate

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint =
      formData.role === "mentor"
        ? "http://localhost:5000/api/auth/mentor-login"
        : "http://localhost:5000/api/auth/mentee-login";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ email: formData.email, role: formData.role }));

      setUser({ email: formData.email, role: formData.role });

      // ✅ Redirect based on role
      if (formData.role === "mentor") {
        navigate("/MentorDashboard");
      } else {
        navigate("/MenteeDashboard");
      }
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className ="auth-container">
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

      <select name="role" onChange={handleChange} value={formData.role}>
        <option value="mentee">Mentee</option>
        <option value="mentor">Mentor</option>
      </select>

      <button type="submit">Login</button>
    </form>
    </div>
  );
};

export default Login;
