import React from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap"; // Import Bootstrap Carousel
import "../css/StudentView.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function LandingPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect back to login after logout
  };

  return (
    <section className="student-landing-page">
      {/* Bootstrap Carousel */}
      <Carousel fade interval={3000}>
        {/* Slide 1 */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x500/102601/FFFFFF?text=Slide+1"
            alt="First Slide"
          />
          <Carousel.Caption>
            <h3>Welcome to the Platform</h3>
            <p>Explore your learning tools and resources.</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x500/1B5948/FFFFFF?text=Slide+2"
            alt="Second Slide"
          />
          <Carousel.Caption>
            <h3>Join the Community</h3>
            <p>Collaborate with your peers and mentors.</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Slide 3 */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x500/C09465/FFFFFF?text=Slide+3"
            alt="Third Slide"
          />
          <Carousel.Caption>
            <h3>Track Your Progress</h3>
            <p>Keep up with your achievements and milestones.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Logout Button */}
      <button onClick={handleLogout} className="btn btn-danger mt-4">
        Logout
      </button>
    </section>
  );
}

export default LandingPage;