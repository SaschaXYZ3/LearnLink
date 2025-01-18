import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Help.css";
import { Link } from "react-router-dom";
import ContactForm from './ContactForm';

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
          <section className="faq-section py-3">
      <div className="container">
        <div className="w-lg-50 mx-auto text-center">
          <h6 className="mb-2 fs-4 mb-4">FAQ | Frequently Asked Questions</h6>
          <h2 className="mb-5 fs-2">Have Questions? We Have Answers!</h2>
          <div className="accordion accordion-flush" id="accordionExample">

            {/* Question 1 */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#question1"
                  aria-expanded="true"
                  aria-controls="question1"
                >
                  How do I create an account?
                </button>
              </h2>
              <div
                id="question1"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p>
                    Click{" "}
                    <Link to="/register" style={{ textDecoration: "none", color: "blue" }}>
                      "Register"
                    </Link>{" "}
                    on the homepage and follow the instructions.
                  </p>
                </div>
              </div>
            </div>

            {/* Question 2 */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#question2"
                  aria-expanded="false"
                  aria-controls="question2"
                >
                  Is my data secure?
                </button>
              </h2>
              <div
                id="question2"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p>Yes, we follow industry-standard practices to ensure your data is protected.</p>
                </div>
              </div>
            </div>

            {/* Question 3 */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#question3"
                  aria-expanded="false"
                  aria-controls="question3"
                >
                  How do I find the right course?
                </button>
              </h2>
              <div
                id="question3"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p>Use the filters in the course search.</p>
                </div>
              </div>
            </div>

            {/* Question 4 */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#question4"
                  aria-expanded="false"
                  aria-controls="question4"
                >
                  What devices can I use to access the platform?
                </button>
              </h2>
              <div
                id="question4"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p>The platform works on desktops, tablets, and smartphones.</p>
                </div>
              </div>
            </div>

            {/* Question 5 */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#question5"
                  aria-expanded="false"
                  aria-controls="question5"
                >
                  Can I switch from student to tutor?
                </button>
              </h2>
              <div
                id="question5"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p>Yes, you have to register as a tutor or student.</p>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#question6"
                  aria-expanded="false"
                  aria-controls="question6"
                >
                 How do I participate in a course?
                </button>
              </h2>
              <div
                id="question6"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p>Use the  Zoom link in the course section.
                  </p>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#question7"
                  aria-expanded="false"
                  aria-controls="question7"
                >
                  How can I track my progress?
                </button>
              </h2>
              <div
                id="question7"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p>Visit your profile or the course page to view your progress and completed modules.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#question8"
                  aria-expanded="false"
                  aria-controls="question8"
                >What happens if a student violates platform rules?</button>
              </h2>
              <div
                id="question8"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p> Report the issue to the Admin. See contact form on the Click <Link to="/" style={{ textDecoration: "none", color: "blue" }}
                > Homepage.</Link>{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#question9"
                  aria-expanded="false"
                  aria-controls="question9"
                >
                 What can I do if my topic is not listed under the main categories or subcategories?
                </button>
              </h2>
              <div
                id="question9"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p>No worries, this is intentionally limited to <strong>pre-sets</strong>! Use <Link to="/" style={{ textDecoration: "none", color: "blue" }}
                > contact.</Link>{" "}  form to request new ones.
                  </p>
                </div>
              </div>
            </div>

          </div>

          <p className="mt-5 fs-5">
            If you have further questions, feel free to use the{" "}
            <Link to="/connect" style={{ textDecoration: "none", color: "blue" }}>
              Forum
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
      );
    
      case "tutorials":
        const videos = [
          {
            title: "Introduction to JavaScript",
            description: "Learn the basics of JavaScript in this comprehensive tutorial.",
            url: "https://www.youtube.com/embed/xwKbtUP87Dk?si=56KB8aVUPy8il_XQ"
          },
          {
            title: "Mastering React Basics",
            description: "A beginner's guide to building powerful UIs with React.",
            url: "https://www.youtube.com/embed/E8lXC2mR6-k?si=y54rNnZ5Usm0Et_a"
          },
          {
            title: "CSS Tips and Tricks",
            description: "Discover advanced CSS techniques to make your websites pop!",
            url: "https://www.youtube.com/embed/PL3Odw-k8W4?si=tVXj8mOJTPD8ig42"
          }
        ];
      
        return (
          <section className="tutorials-section py-5" style={{ backgroundColor: "#f9f9f9" }}>
      <div className="container">
        <h2 className="text-center mb-4" style={{ color: "#333" }}>Tutorials</h2>
        <p className="text-center mb-5 fs-4" style={{ color: "#555" }}>
          Explore our curated tutorials to enhance your learning experience.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          {videos.map((video, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                textAlign: "center"
              }}
            >
              <h4 style={{ color: "#8b4513", marginBottom: "10px" }}>{video.title}</h4>
              <p style={{ fontSize: "18px", color: "rgb(10, 10, 10)", marginBottom: "35px" }}>{video.description}</p>
              <iframe
                width="90%"
                height="350"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </section>
        );

      case "support":
        return (
          <div className="card">
            <div className="card-body">
           <ContactForm />
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
