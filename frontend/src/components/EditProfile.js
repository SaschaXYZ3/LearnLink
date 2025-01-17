import React, { useState, useEffect } from "react";
import "../css/EditProfile.css";
import { jwtDecode } from "jwt-decode";

function EditProfile() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    birthDate: "",
    password: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Benutzer-ID aus dem Token extrahieren
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.id || decoded.userId;
      } catch (err) {
        console.error("Error decoding token:", err);
        return null;
      }
    }
    return null;
  };

  // Benutzerinformationen vom Server abrufen
  useEffect(() => {
    if (!isEditing) {
      const fetchUserData = async () => {
        const userId = getUserIdFromToken();
        if (!userId) {
          console.error("User ID not found. Please check the token.");
          return;
        }

        setIsLoading(true);
        try {
          const response = await fetch("http://localhost:5001/api/user", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Fehler beim Laden der Benutzerdaten.");
          }

          const data = await response.json();
          setUserData({
            username: data.username,
            email: data.email,
            birthDate: data.birthDate,
            //password: data.password,
          });
          setIsLoading(false);
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Fehler beim Laden der Benutzerdaten.");
          setIsLoading(false);
        }
      };

      fetchUserData();
    }
  }, [isEditing]); // Läuft nur, wenn isEditing geändert wird

  // Eingaben in den Feldern aktualisieren
  const handleInputChange = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,

    }));
  };

  // Aktualisiere das aktuelle Passwort
  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  // Aktualisiere das neue Passwort
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  // Änderungen speichern
  const handleSave = async () => {
    const payload = {
      username: userData.username,
      email: userData.email,
      birthDate: userData.birthDate,
      ...(newPassword && {
        currentPassword: currentPassword,
        newPassword: newPassword,
      }),
    };

    try {
      const response = await fetch("http://localhost:5001/api/user/update", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Fehler"); 
      }

      const updatedData = await response.json();
      setUserData({
        username: updatedData.username,
        email: updatedData.email,
        birthDate: updatedData.birthDate,
      });

      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Es gab einen Fehler beim Aktualisieren des Profils.");
    }
  };

  return (
    <section className="profile-section">
      <div className="profile-container">
        <div className="profile-header">
          <h2>{userData.username}</h2>
          <p>{userData.email}</p>
          <p>{userData.birthDate}</p>
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <div className="profile-details">
          {isEditing ? (
            <>
              <input
                className="mb-3"
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                placeholder="Username"
              />

              <input
                className="mb-3"
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />

              <input
                className="mb-3"
                type="date"
                name="birthDate"
                value={userData.birthDate}
                onChange={handleInputChange}
              />

              <input
                className="mb-3"
                type="password"
                value={currentPassword}
                onChange = {handleCurrentPasswordChange}
                placeholder="Current Password"
              />

              <input
                className="mb-3"
                type="password"
                value={newPassword}
                onChange = {handleNewPasswordChange}
                placeholder="New Password"
              />

              <button onClick={handleSave}>Save Changes</button>
            </>
          ) : (
            <>
              <p><strong>Username:</strong> {userData.username}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Birthdate:</strong> {userData.birthDate}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default EditProfile;