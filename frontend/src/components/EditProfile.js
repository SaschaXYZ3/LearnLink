import React, { useState } from "react";
import "../css/EditProfile.css";

function EditProfile() {
  // State für Benutzerdaten
  const [userData, setUserData] = useState({
    name: "Marie Horwitz",
    role: "Web Designer",
    email: "info@example.com",
    phone: "123 456 789",
    address: "123 Example Street, Vienna",
    birthdate: "1990-01-01",
    recentProject: "Lorem Ipsum",
    mostViewedProject: "Dolor Sit Amet"
  });
  
  const [isEditing, setIsEditing] = useState(false); // Edit-Modus

  // Änderung der Formulareingaben verarbeiten
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Änderungen speichern
  const handleSave = () => {
    alert("Profile updated successfully!");
    setIsEditing(false); // Bearbeitungsmodus beenden
  };

  return (
    <section className="profile-section">
      <div className="profile-container">
        
        {/* Profilbild und Avatar */}
        <div className="profile-header">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
            alt="User Avatar"
            className="profile-avatar"
          />
          <h2>{userData.name}</h2>
          {/* Rolle bearbeitbar */}
          {isEditing ? (
            <input
              type="text"
              name="role"
              value={userData.role}
              onChange={handleInputChange}
              className="form-control mb-2"
            />
          ) : (
            <p>{userData.role}</p>
          )}

          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Profilinformationen */}
        <div className="profile-details">
          <h3>Personal Information</h3>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
          <p><strong>Address:</strong> {userData.address}</p>
          <p><strong>Birthdate:</strong> {userData.birthdate}</p>

          {/* Eingabefelder im Bearbeitungsmodus */}
          {isEditing && (
            <>
              <input type="text" name="email" value={userData.email} onChange={handleInputChange} />
              <input type="text" name="phone" value={userData.phone} onChange={handleInputChange} />
              <input type="text" name="address" value={userData.address} onChange={handleInputChange} />
              <input type="date" name="birthdate" value={userData.birthdate} onChange={handleInputChange} />
              <button onClick={handleSave}>Save Changes</button>
            </>
          )}

          {/* Projektinformationen */}
          <h3 className="mt-4">Projects</h3>
          <p><strong>Recent Project:</strong> {userData.recentProject}</p>
          <p><strong>Most Viewed Project:</strong> {userData.mostViewedProject}</p>
        </div>
      </div>
    </section>
  );
}

export default EditProfile;