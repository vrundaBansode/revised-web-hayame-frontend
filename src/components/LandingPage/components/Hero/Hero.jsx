import React from "react";
import { useNavigate } from "react-router-dom";
import "./hero.css";
import { team } from "../../../../assets";

const Hero = () => {
  let navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="hero-div wave">
      <div className="hero-card-bg">
        <div className="hero-card">
          <h1>Get your work done with Flexible Workforce.</h1>
          <p>
            <strong>Hayame</strong> bridges the gap between individuals or
            businesses and staff. We help you hire staff whenever and wherever
            needed.
          </p>
        </div>
        <div className="hero-card-img">
          <img src={team} alt="People working together" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
