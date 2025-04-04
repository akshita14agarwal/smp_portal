import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      
    
      <h1 className="home-heading">Welcome to SMP!</h1>
      <h3> for the students , by the students</h3>
    </div>
  );
};

export default Home;
