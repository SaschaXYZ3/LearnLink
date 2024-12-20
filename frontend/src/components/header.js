import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../Header.css";
function Header() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");  //might be changed to NULL instead?

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
    <header className="header">
      {/* Logo Section */}
      <div className="logo">
        <Link to="/">LearnLink</Link>
      </div>

      {/* Navigation Links */}
      <nav className="nav">
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/tools">TOOLS</Link>
        <Link to="/connect">CONNECT</Link>
      </nav>

      {/* User Dropdown or Auth Links */}
      <div className="auth-section">
        {username ? (
          <div className="dropdown">
            <button className="dropdown-toggle">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                className="rounded-circle"
                height="30"
                alt="User Avatar"
              />
              <span className="ms-2">{username}</span>
            </button>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to="#">My Profile</Link>
              <Link className="dropdown-item" to="#">Settings</Link>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login" className="subscribe-btn">Login</Link>
            <Link to="/register" className="subscribe-btn">Register</Link>
          </>
        )}
      </div>

      {/* Hamburger Menu for Smaller Screens */}
      <button className="navbar-toggler" type="button">
        <span className="navbar-toggler-icon"></span>
      </button>
    </header>
  );
    
    /*
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">LearnLink</Link>
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
  */
}

export default Header;