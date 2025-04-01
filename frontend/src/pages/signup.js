import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "mentee" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = formData.role === "mentor" ? "http://localhost:5000/api/auth/mentor-signup" : "http://localhost:5000/api/auth/mentee-signup";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) alert("Signup successful");
    else alert(data.msg);
  };

  return (
    <div className ="auth-container">
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

      <select name="role" onChange={handleChange} value={formData.role}>
        <option value="mentee">Mentee</option>
        <option value="mentor">Mentor</option>
      </select>

      <button type="submit">Signup</button>
    </form>
    </div>
  );
};

export default Signup;
