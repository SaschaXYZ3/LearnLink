import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Help.css"; // Stelle sicher, dass deine CSS-Datei hier importiert ist
import { Link } from "react-router-dom";

const Help = () => {
  const [activeTab, setActiveTab] = useState("general");

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="card">
            <div className="card-body">
              <h2>Welcome to Learnlink!</h2>
              <p className="mt-4 fs-5">
                We help you to achieve your learning goals or pass on your
                knowledge. Learnlink should be a platform for you where
                everyone has the same goal: to succeed together.
              </p>
              <p className="mt-4 fs-5">
                If you have the desire and motivation to share your in-depth
                knowledge, then register with us as a tutor and make your
                courses available.
              </p>
              <p className="mt-4 fs-5">
                If you are currently studying or at school and majoring in
                computer science, then Learnlink is essential for you to get
                through the milestones. You can all support each other. How?
                Learnlink will help you.
              </p>
              <p className="mt-4 fs-5">
                This section gives you an overview of how the site works:
              </p>

              {/* New content: First Steps */}
              {/* New content: First Steps */}
<h3 className="mt-5 mb-4">Your First Steps on Learnlink</h3>

<h4 className="mb-3">For Students</h4>
<ol style={{ fontSize: "18px", lineHeight: "1.8", marginBottom: "30px" }}>
  <li>
    <strong>Register: </strong>{" "}
    <Link
      to="/register"
      style={{ textDecoration: "none", color: "blue" }}
    >
      Create your account and join our community of learners.
    </Link>{" "}
    It's quick, simple, and your first step toward success.
  </li>
  <li>
    <strong>Search Courses: </strong>{" "}
    <Link
      to="/browsecatalog"
      style={{ textDecoration: "none", color: "blue" }}
      > Explore our wide range of courses.
                </Link>{" "}
                Filter by topic, difficulty level, or even language—whatever suits your learning style best!
              </li>
              <li>
                <strong>Book: </strong> Found a course that excites you? Book it! A request will be sent to the tutor to confirm your spot.
              </li>
              <li>
                <strong>Join: </strong> Once your booking is approved, you’ll receive a Zoom link from the tutor. Join the session and dive into the learning experience!
              </li>
              <li>
                <strong>Track Progress: </strong> Keep an eye on your growth through your personalized student dashboard. Celebrate every milestone you achieve!
              </li>
            </ol>

            <h4 className="mb-3">For Tutors</h4>
            <ol style={{ fontSize: "18px", lineHeight: "1.8" }}>
              <li>
                <strong>Register: </strong><Link to="/register" style={{ textDecoration: "none", color: "blue" }}
                > Create your account as a tutor and step into the world of teaching. Share your expertise with eager learners worldwide.
                </Link>{" "} 
              </li>
              <li>
                <strong>Create Courses: </strong> Add all the exciting details about your course—title, description, schedule, price, and of course, your Zoom link.
              </li>
              <li>
                <strong>Manage Courses: </strong> Monitor your courses and keep track of students who have enrolled. It’s all at your fingertips.
              </li>
              <li>
                <strong>Teach: </strong> Get ready to inspire and empower! Share your Zoom link, deliver engaging sessions, and watch your students thrive.
              </li>
            </ol>

            <h2 className="mt-5 fs-5" style={{ fontWeight: "bold", color: "black" }}>
              Have fun and enjoy yourself! ;)</h2>
            </div>
          </div>
        );
      case "faq":
        return (
          <div className="card">
            <div className="card-body">
              <h2 className="mb-4">Frequently Asked Questions (FAQ)</h2>
              <h3>For Students</h3>
              <ul>
                <li>
                  <strong>How do I find the right course?</strong> Use the
                  filters in the course search.
                </li>
                <li>
                  <strong>How do I participate in a course?</strong> Use the
                  Zoom link in the course section.
                </li>
              </ul>
              <h3>For Tutors</h3>
              <ul>
                <li>
                  <strong>How do I create a course?</strong> Go to your
                  dashboard and click "Create Course".
                </li>
                <li>
                  <strong>How do I manage my students?</strong> Check the
                  participants list in the course area.
                </li>
              </ul>
            </div>
          </div>
        );
      case "tutorials":
        return (
          <div className="card">
            <div className="card-body">
              <h2 className="mb-4">Tutorials</h2>
              <h3>For Students</h3>
              <ul>
                <li>Video: How to book a course?</li>
                <li>Video: How to track your learning progress.</li>
              </ul>
              <h3>For Tutors</h3>
              <ul>
                <li>Video: How to create a course?</li>
                <li>Video: Tips for successful teaching.</li>
              </ul>
            </div>
          </div>
        );
      case "support":
        return (
          <div className="card">
            <div className="card-body">
              <h2 className="mb-4">Support</h2>
              <p>Do you still have questions? Contact us!</p>
              <ul>
                <li>
                  <strong>Email:</strong> support@learnlink.com
                </li>
                <li>
                  <strong>Phone:</strong> +49 123 456 789
                </li>
                <li>
                  <strong>Live Chat:</strong> Use the chatbot on the bottom
                  right of every page.
                </li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Sidebar Tabs */}
        <div className="col-md-3">
          <div className="nav flex-column nav-pills">
            <button
              className={`nav-link ${activeTab === "general" ? "active" : ""}`}
              onClick={() => setActiveTab("general")}
            >
              General Help & Guideline
            </button>
            <button
              className={`nav-link ${activeTab === "faq" ? "active" : ""}`}
              onClick={() => setActiveTab("faq")}
            >
              FAQ
            </button>
            <button
              className={`nav-link ${activeTab === "tutorials" ? "active" : ""}`}
              onClick={() => setActiveTab("tutorials")}
            >
              Tutorials
            </button>
            <button
              className={`nav-link ${activeTab === "support" ? "active" : ""}`}
              onClick={() => setActiveTab("support")}
            >
              Support
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="col-md-9">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Help;
