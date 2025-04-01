import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Your backend API


export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error.response?.data || error.message);
    throw error;
  }
};

export const login = async (formData) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data; // Ensure this contains the token
  } catch (error) {
    console.error("API Login Error:", error);
    throw error;
  }
};

// 📌 Upload Notes (Mentor)
export const uploadNote = async (formData, token) => {
  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Required for file uploads
        Authorization: `Bearer ${token}`, // Auth token from localStorage
      },
    });
    return response.data;
  } catch (error) {
    console.error("Upload Notes Error:", error.response?.data || error.message);
    throw error;
  }
};

// 📌 Fetch Notes (Mentee)
export const fetchNotes = async (subject = "", token) => {
  try {
    const response = await axios.get(`${API_URL}/view?subject=${subject}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Fetch Notes Error:", error.response?.data || error.message);
    throw error;
  }
};
