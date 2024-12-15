import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // Überprüfen, ob der Benutzer eingeloggt ist, wenn die Komponente geladen wird
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  // Abmelden-Funktion
  const handleLogout = () => {
    localStorage.removeItem("username"); // Entfernen des Usernames aus dem localStorage
    setIsLoggedIn(false); // Setzt den Status zurück
    setUsername(""); // Löscht den Usernamen
    window.location.href = "/"; 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">MyApp</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="ms-auto">
          {isLoggedIn ? (
            <div>
              <span className="navbar-text me-2">Welcome, {username}</span>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary me-2">Login</Link>
              <Link to="/register" className="btn btn-secondary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;