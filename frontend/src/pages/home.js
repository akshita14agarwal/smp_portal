import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="nav-buttons">
        <button className="login-btn" onClick={() => navigate('/login')}>
          Login
        </button>
        <button className="signup-btn" onClick={() => navigate('/signup')}>
          Sign Up
        </button>
      </div>
      <h1 className="home-heading">Welcome to SMP</h1>
    </div>
  );
};

export default Home;
