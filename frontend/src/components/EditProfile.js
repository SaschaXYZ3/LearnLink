import React, { useState } from "react";
import "../css/EditProfile.css"; // Make sure this CSS file exists

function EditProfile() {
  // State to store user data
  const [userData, setUserData] = useState({
    name: "Marie Horwitz",
    role: "Web Designer",
    email: "info@example.com",
    phone: "123 456 789",
    recentProject: "Lorem ipsum",
    mostViewedProject: "Dolor sit amet",
  });

  const [isEditing, setIsEditing] = useState(false); // Edit mode toggle

  // Handle changes to the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Toggle between view and edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Simulate saving data (could be connected to a backend)
  const handleSave = () => {
    alert("Profile updated successfully!");
    setIsEditing(false); // Exit edit mode after saving
  };

  return (
    <section className="profile-section vh-100">
      <div className="container py-5 h-100 d-flex justify-content-center align-items-center">
        <div className="card profile-card d-flex flex-row">
          
          {/* Left Section */}
          <div className="profile-side-section text-center text-white gradient-custom p-4">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
              alt="Avatar"
              className="rounded-circle mb-3"
              style={{ width: "80px" }}
            />
            <h5>{userData.name}</h5>
            <p>{userData.role}</p>
            <button className="edit-btn" onClick={toggleEdit}>
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Right Section - Editable Info */}
          <div className="p-4 flex-fill">
            <h6>Information</h6>
            <hr />
            <form>
              <p><strong>Email:</strong></p>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
              ) : (
                <p>{userData.email}</p>
              )}

              <p><strong>Phone:</strong></p>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
              ) : (
                <p>{userData.phone}</p>
              )}

              <h6 className="mt-4">Projects</h6>
              <hr />
              <p><strong>Recent:</strong></p>
              {isEditing ? (
                <input
                  type="text"
                  name="recentProject"
                  value={userData.recentProject}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
              ) : (
                <p>{userData.recentProject}</p>
              )}

              <p><strong>Most Viewed:</strong></p>
              {isEditing ? (
                <input
                  type="text"
                  name="mostViewedProject"
                  value={userData.mostViewedProject}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                />
              ) : (
                <p>{userData.mostViewedProject}</p>
              )}

              {isEditing && (
                <button
                  type="button"
                  className="save-btn mt-3"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditProfile;