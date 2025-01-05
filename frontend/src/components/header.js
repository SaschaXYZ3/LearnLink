import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../css/Header.css";
function Header() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");  //might be changed to NULL instead?
  const [role, setRole] = useState(null);

  // Überprüfen, ob der Benutzer eingeloggt ist, wenn die Komponente geladen wird
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);

      if (storedRole === "admin") {
        setRole(storedRole)
      }
    }
  }, []);

  // Abmelden-Funktion
  const handleLogout = () => {
    localStorage.removeItem("username"); // Entfernen des Usernames aus dem localStorage
    localStorage.removeItem("role");  //entefernen der Rolle
    setIsLoggedIn(false); // Setzt den Status zurück
    setUsername(""); // Löscht den Usernamen
    setRole(null);
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
        <Link to="/browsecatalog">CATALOG</Link>
        {isLoggedIn && role?.trim().toLowerCase() === "admin" && <Link to="/admin">ADMIN DASHBOARD</Link>}
      </nav>

      {/* User Dropdown or Auth Links */}
      <div className="auth-section">
        {username ? (
          <div className="dropdown">
            <button className="dropdown-toggle">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                className="rounded-circle"
                height="55"
                alt="User Avatar"
              />
              <span className="ms-2">{username}</span>
            </button>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to="/editprofile">My Profile</Link>
              <Link className="dropdown-item" to="/studentview">StudentView</Link>
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
    
}

export default Header;