import React, { useState, useEffect, useCallback } from "react";
import "../css/EditProfile.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Standard-Import

function EditProfile() {
  const [userData, setUserData] = useState({
    name: "",
    role: "",
    email: "",
    birthdate: "",
    profileImageUrl: "",
  });

  const [isEditing, setIsEditing] = useState(false); // Bearbeitungsmodus
  const [newImage, setNewImage] = useState(null); // Neues Profilbild
  const [imagePreview, setImagePreview] = useState(null); // Vorschau für das neue Bild

  // Funktion, um die Benutzer-ID aus dem Token zu extrahieren
  const getUserIdFromToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.id || decoded.userId;
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }
    return null;
  }, []);

  // Benutzerinformationen vom Server abrufen
  const fetchUserData = useCallback(async () => {
    const id = getUserIdFromToken();
    if (!id) {
      console.error("User ID not found. Please check the token.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData({
        name: response.data.username,
        role: response.data.role,
        email: response.data.email,
        birthdate: response.data.birthDate,
        profileImageUrl: response.data.profileImageUrl,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [getUserIdFromToken]);

  // Eingaben in den Feldern aktualisieren
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Profilbild-Upload verarbeiten
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Änderungen speichern
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("email", userData.email);
    formData.append("birthdate", userData.birthdate);

    if (newImage) {
      formData.append("profileImage", newImage);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`/api/user/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated successfully!");
      setUserData(response.data);
      setIsEditing(false);
      setImagePreview(null); // Vorschau zurücksetzen
      setNewImage(null); // Bild-Upload zurücksetzen
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("There was an error updating your profile.");
    }
  };

  // Daten beim ersten Rendern laden
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <section className="profile-section">
      <div className="profile-container">
        <div className="profile-header">
          {/* Zeigt das Profilbild an, wenn es vorhanden ist */}
          <img
            src={userData.profileImageUrl || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"}
            alt="User Avatar"
            className="profile-avatar"
          />
          <h2>{userData.name}</h2>
  
          {/* Rolle ist nicht bearbeitbar, wird nur angezeigt */}
          <p>{userData.role}</p>
  
          {/* Toggle Button für Editieren */}
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
  
        <div className="profile-details">
          <h3>Personal Information</h3>
          {/* Zeigt Email und Geburtsdatum an, bevor Editiermodus aktiviert wird */}
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Birthdate:</strong> {userData.birthdate}</p>
  
          {/* Bearbeitungsmodus */}
          {isEditing && (
            <>
              <input
                type="text"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
              />
              <input
                type="date"
                name="birthdate"
                value={userData.birthdate}
                onChange={handleInputChange}
              />
  
              <input type="file" onChange={handleImageChange} />
              {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
  
              <button onClick={handleSave}>Save Changes</button>
            </>
          )}
        </div>
      </div>
    </section>
  );
  
}

export default EditProfile;
