import React from "react";
import "../Hero.css";

function Hero() {
  return (
    <section className="hero">
      {/* Left Content */}
      <div className="hero-content">
        <h1 className="hero-title">LearnLink</h1>
        <p className="vertical-text">THE ULTIMATE TUTORING PLATFORM </p>
      </div>

      {/* Right Image Section */}
      <div className="hero-image"></div>

      {/* Social Links */}
      <div className="social-links">
        <a href="#"><i className="fab fa-youtube"></i></a>
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
      </div>
    </section>
  );
}

export default Hero;