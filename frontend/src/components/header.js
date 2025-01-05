import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "../css/Header.css";

function Header() {
    // State-Variablen für den Login-Status, den Benutzernamen, die Rolle und die Suchleiste
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
            if (storedRole === "admin") {
                setRole(storedRole); // Speichert die Rolle des Nutzers, wenn vorhanden
            }
        }
    }, []);

    // Funktion für die Abmeldung, löscht Benutzerdaten aus dem Local Storage
    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("role");
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
                {/* Admin-Dashboard Link nur für Admins sichtbar */}
                {isLoggedIn && role?.trim().toLowerCase() === "admin" && (
                    <Link to="/admin">ADMIN DASHBOARD</Link>
                )}
            </nav>

            {/* Suchleiste – Erscheint nur, wenn Benutzer eingeloggt ist */}
            {isLoggedIn && (
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search courses..."
                        className="search-input"
                    />
                    <button type="submit" className="search-btn">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
            )}

            {/* Authentifizierungsbereich: Zeigt entweder den Benutzernamen oder Login/Registrierung */}
            <div className="auth-section">
                {username ? (
                    // Dropdown-Menü für eingeloggte Nutzer
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
                            <button className="dropdown-item" onClick={handleLogout}>Logout</button>
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