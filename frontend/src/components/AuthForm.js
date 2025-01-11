import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../css/AuthForm.css";

const AuthForm = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true); // Default: Login
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "", // password confirmation
    role: "student", // role
    birthDate: "", // birthdate
  });

  // Ändere den Zustand basierend auf der Route
  useEffect(() => {
    if (location.pathname === "/register") {
      setIsLogin(false); // Registrierungsmodus aktivieren
    } else if (location.pathname === "/login") {
      setIsLogin(true); // Loginmodus aktivieren
    }
  }, [location.pathname]);

  // Eingabeänderungen verarbeiten
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Formular absenden
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // check if the passwords are the same
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return; // prevent the form from being sent
    }

    const url = isLogin
      ? "http://localhost:5001/login"
      : "http://localhost:5001/register";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          ...formData,
        }),
        headers: {
          "Content-Type": "application/json", // Header für den Content-Type hinzugefügt
        },
      });

      if (!response.ok) {
        // Fehlerbehandlung für nicht erfolgreiche Antwort
        const errorData = await response.json();
        alert(`Error: ${errorData.error || response.statusText}`);
        return; // Verhindert die Weiterleitung bei einem Fehler
      }

      // Wenn die Antwort erfolgreich war (response.ok === true)
      const data = await response.json();
      // Speichern des JWT-Tokens im localStorage

      localStorage.setItem("token", data.token); // Speichern des Tokens

      // Speichern des Usernames und der Rolle im localStorage
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);

      alert(
        isLogin
          ? `Welcome back, ${data.username}!`
          : `User ${data.username} registered successfully!`
      );

      // Weiterleitung basierend auf der Rolle
      if (data.role === "student") {
        window.location.href = "/studentview";
      } else if (data.role === "tutor") {
        window.location.href = "/tutorview";
      } else if (data.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error details:", error); // Detaillierte Fehlermeldung
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleFormSubmit}>
        {!isLogin && (
          <>
            <div className="form-group mt-3">
              <label>Role:</label>
              <div className="d-flex justify-content-center mt-2">
                <br />
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="roleStudent"
                    value="student"
                    checked={formData.role === "student"}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="roleStudent">
                    Student
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="roleTutor"
                    value="tutor"
                    checked={formData.role === "tutor"}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="roleTutor">
                    Tutor
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="birthDate">Birth Date:</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
          </>
        )}
        <div className="form-group mt-3">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        {!isLogin && (
          <div className="form-group mt-3">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary mt-4 w-100">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <p className="toggle-text mt-3">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setIsLogin(!isLogin)} className="btn btn-link">
          {isLogin ? "Register here" : "Login here"}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
