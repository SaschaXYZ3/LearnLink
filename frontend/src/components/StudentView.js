import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/StudentView.css";

function CourseCatalog() {
  const navigate = useNavigate();

  const courses = [
    { title: "Python Basics", category: "Coding", instructor: "John Doe" },
    { title: "Network Security", category: "IT Security", instructor: "Jane Smith" },
    { title: "Algebra Essentials", category: "Mathematics", instructor: "Alan Turing" },
    { title: "Cloud Networking", category: "Network Technologies", instructor: "Ada Lovelace" },
    { title: "Public Speaking", category: "Social Skills", instructor: "Elon Musk" },
  ];

  return (
    <div className="catalog-page">
      {/* Navbar */}
      <Navbar expand="lg" className="navbar-custom">
        <Container>
          <Navbar.Brand href="/">LearnLink</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Button className="btn-primary">Login</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div className="catalog-hero">
        <h1>Explore Your Next Learning Adventure</h1>
        <p>Find expertly curated courses to elevate your skills.</p>
        <Button className="hero-btn" onClick={() => navigate("/browsecatalog")}>
          Browse Courses
        </Button>
      </div>

      {/* Course Cards Section */}
      <Container className="catalog-grid">
        {courses.map((course, index) => (
          <div key={index} className="course-card">
            <div className="card-content">
              <h3>{course.title}</h3>
              <p><strong>Category:</strong> {course.category}</p>
              <p><strong>Instructor:</strong> {course.instructor}</p>
              <Button className="btn-course">Book Now</Button>
            </div>
          </div>
        ))}
      </Container>

      {/* Footer */}
      <footer className="catalog-footer text-center">
        <p>© 2024 LearnLink. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default CourseCatalog;