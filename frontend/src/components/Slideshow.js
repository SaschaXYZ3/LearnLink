import React from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import "../css/StudentView.css";
import "bootstrap/dist/css/bootstrap.min.css";

function StudentView() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect back to login after logout
  };

  // Simple Categories for the Browse Section
  const categories = [
    {
      name: "Technology",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },
    {
      name: "Art & Design",
      image: "https://images.unsplash.com/photo-1505740106531-4243f3831c32",
    },
    {
      name: "Business",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    },
    {
      name: "Science",
      image: "https://images.unsplash.com/photo-1531266751680-1f197477d6f0",
    },
  ];

  return (
    <section className="student-view-page">
      {/* Carousel Section */}
      <Carousel fade interval={3000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
            alt="First Slide"
          />
          <Carousel.Caption>
            <h3>Welcome to Your Learning Platform</h3>
            <p>Explore new tools and resources to accelerate your learning.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
            alt="Second Slide"
          />
          <Carousel.Caption>
            <h3>Join the Community</h3>
            <p>Connect with your peers and mentors worldwide.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1516321497487-e288fb19713f"
            alt="Third Slide"
          />
          <Carousel.Caption>
            <h3>Track Your Progress</h3>
            <p>Stay motivated with progress tracking tools.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Browse Catalogue Section */}
      <div className="browse-catalogue mt-5">
        <h2 className="text-center mb-4">Browse Categories</h2>
        <div className="row justify-content-center">
          {categories.map((category, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card category-card">
                <img
                  src={category.image}
                  alt={category.name}
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{category.name}</h5>
                  <button className="btn btn-primary mt-2">Explore</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="text-center mt-5">
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </section>
  );
}

export default StudentView;