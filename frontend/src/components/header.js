import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../css/Header.css";

function Header() {
    // State-Variablen für den Login-Status, den Benutzernamen und die Rolle
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [role, setRole] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    // useEffect-Hook überprüft beim Laden der Seite, ob der Benutzer bereits eingeloggt ist
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        const storedRole = localStorage.getItem("role");

        if (storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
            setRole(storedRole);
        }
    }, []);

    // Funktion für die Abmeldung, löscht Benutzerdaten aus dem Local Storage
    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("token"); 
        setIsLoggedIn(false);
        setUsername("");
        setRole(null);
        window.location.href = "/"; // Leitet nach dem Logout zur Startseite weiter
    };

    // Funktion zur Verarbeitung der Suchanfrage
    const handleSearch = (e) => {
        e.preventDefault();
        alert(`Searching for: ${searchQuery}`); // Momentan nur eine einfache Alert-Box, später erweiterbar
    };

    return (
        <header className="header">
            {/* Logo-Bereich */}
            <div className="logo">
                <Link to="/">LearnLink</Link>
            </div>

            {/* Navigationsleiste mit dynamischen Links basierend auf Login-Status */}
            <nav className="nav">
                <Link to="/">HOME</Link>
                <Link to="/about">ABOUT</Link>
                <Link to="/tools">TOOLS</Link>
                <Link to="/connect">CONNECT</Link>
                <Link to="/browsecatalog">CATALOG</Link>
                <Link to="/help">HELP</Link>
                {/* Admin-Dashboard Link nur für Admins sichtbar */}
                {isLoggedIn && role?.trim().toLowerCase() === "admin" && (
                    <Link to="/admin">ADMIN DASHBOARD</Link>
                )}
            </nav>

            {/* Authentifizierungsbereich: Zeigt entweder den Benutzernamen oder Login/Registrierung */}
            <div className="auth-section">
                {isLoggedIn ? (
                    // Dropdown-Menü für eingeloggte Nutzer
                    <div className="dropdown">
                        <button className="dropdown-toggle">
                           {/* Zeigt das Profilbild und den Benutzernamen an */}
                          <img 
                              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                              alt="Profile" 
                              style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }} 
                          />
                            {/* Zeigt den Benutzernamen an */}
                            <span className="ms-2">{username}</span>
                        </button>
                        <div className="dropdown-menu" 
                            style={{ fontSize: "16px", color: "#000000", textDecoration: "none", textAlign: "center" }}>
                            <Link className="dropdown-item" to="/editprofile" 
                                style={{ fontSize: "16px", color: "#000000", textDecoration: "none" }}>My Profile</Link>
                            {role === "student" && <Link to="/studentview" 
                                style={{ fontSize: "16px", color: "#000000", textDecoration: "none" }}>Student Dashboard</Link>}
                            {role === "tutor" && <Link to="/tutorview" 
                                style={{ fontSize: "16px", color: "#000000", textDecoration: "none" }}>Tutor Dashboard</Link>}
                            {role === "admin" && <Link to="/admin" 
                                style={{ fontSize: "16px", color: "#000000", textDecoration: "none" }}>Admin Dashboard</Link>}
                            <Link className="dropdown-item" to="#" 
                                style={{ fontSize: "16px", color: "#000000", textDecoration: "none" }}>Settings</Link>
                            <button className="dropdown-item" onClick={handleLogout} 
                                style={{ fontSize: "16px", color: "#000000", textDecoration: "none" }}>Logout</button>
                        </div>
                    </div>
                ) : (
                    // Wenn nicht eingeloggt, dann Login & Register anzeigen
                    <>
                        <Link to="/login" className="subscribe-btn">Login</Link>
                        <Link to="/register" className="subscribe-btn">Register</Link>
                    </>
                )}
            </div>

            {/* Hamburger-Menü für kleinere Bildschirme */}
            <button className="navbar-toggler" type="button">
                <span className="navbar-toggler-icon"></span>
            </button>
        </header>
    );
}

export default Header;
