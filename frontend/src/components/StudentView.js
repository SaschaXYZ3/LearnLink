import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect back to login after logout
  };

  return (
    <section className="landing-page">
      <h1>Welcome to Your Dashboard</h1>
      <p>You have successfully logged in.</p>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </section>
  );
}

export default LandingPage;