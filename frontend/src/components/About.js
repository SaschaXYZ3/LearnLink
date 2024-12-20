import React from "react";
import { useNavigate } from "react-router-dom";
import "../About.css";
import AboutImage from "../images/fhcampus.png";

function About({ scrollToContact }) {
  const navigate = useNavigate();

  const handleContactClick = (e) => {
    e.preventDefault();
    navigate("/"); // Navigate to the root page
    setTimeout(() => {
      scrollToContact(); // Scroll to the Contact Form
    }, 100); // Delay to ensure navigation completes
  };

  return (
    <section className="about">
      <div className="about-container">
        {/* Image Section */}
        <img src={AboutImage} alt="About us" className="about-image" />

        {/* Content Section */}
        <div className="about-content">
          <h1 className="about-title">About Us</h1>
          <p className="about-subtitle">
            We are a platform that connects students and tutors. We are dedicated to transferring knowledge!
          </p>
          <p className="about-text">
            Our mission is to deliver a simple, intuitive, and powerful tutoring platform that improves
            the everyday lives of students. By combining booking, tutoring, and learning, this platform should help you succeed!
          </p>
          <div className="about-values">
            <h2 className="about-values-title">Our Values</h2>
            <ul className="about-values-list">
              <li>Simplicity</li>
              <li>Learning Motivation</li>
              <li>User Satisfaction</li>
              <li>Sustainability</li>
            </ul>
          </div>
          <p className="about-footer">
            Thank you for taking the time to learn more about us. If you have any questions, feel free to{" "}
            <a href="/" onClick={handleContactClick} className="about-link">
              contact us
            </a>
            !
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;