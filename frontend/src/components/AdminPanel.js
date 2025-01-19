import React, { useEffect, useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [changes, setChanges] = useState({});
  const [showResetModal, setShowResetModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found, please login.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5001/admin", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          const errorData = await response.json();
          setError(errorData.error || "An error occurred while fetching data");
        }
      } catch (error) {
        setError("Network error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEditField = (userId, field, value) => {
    setChanges((prevChanges) => ({
      ...prevChanges,
      [userId]: {
        ...prevChanges[userId],
        [field]: value,
      },
    }));
  };

  // SAVE USER DATA CHANGES
  const saveAllChanges = async () => {
    const token = localStorage.getItem("token");
    const updates = Object.entries(changes);

    if (updates.length === 0) {
      alert("No changes to save.");
      return;
    }

    try {
      for (const [userId, fields] of updates) {
        // Den vollständigen Benutzerdatensatz aus `users` abrufen
        const user = users.find((u) => u.id === parseInt(userId, 10));

        if (!user) {
          alert(`User with ID ${userId} not found.`);
          continue;
        }

        // Änderungen mit bestehenden Werten kombinieren
        const payload = {
          username: fields.username || user.username,
          email: fields.email || user.email,
          birthDate: fields.birthDate || user.birthDate,
        };

        const response = await fetch(
          `http://localhost:5001/admin/user/${userId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          alert(`Error updating user ${userId}: ${errorData.error}`);
          continue;
        }
      }

      alert("All changes saved successfully.");
      setChanges({});
    } catch (error) {
      alert("Network error occurred while saving changes.");
    }
  };

  //DELETE USER
  const deleteUser = async (userId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found, please login.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/admin/user/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error deleting user ${userId}: ${errorData.error}`);
        return;
      }

      // Benutzer aus der Liste entfernen
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      alert("User deleted successfully.");
    } catch (error) {
      alert("Network error occurred while deleting user.");
    }
  };

  // PASSWORD RESET
  const handleResetPassword = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found, please login.");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/admin/user/${selectedUserId}/reset-password`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(
          `Error resetting password for user ${selectedUserId}: ${errorData.error}`
        );
        return;
      }

      alert("Password reset successfully.");
      setShowResetModal(false);
      setNewPassword(""); // Reset password field

      // Benutzerinformationen erneut abrufen
      const updatedUsersResponse = await fetch("http://localhost:5001/admin", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedUsers = await updatedUsersResponse.json();
      setUsers(updatedUsers);
    } catch (error) {
      alert("Network error occurred while resetting the password.");
    }
  };

  return (
    <div className="p-5">
      <Table Table striped bordered hover className="custom-table">
        <thead>
          <tr className="text-center custom-header">
            <th style={{ padding: "15px" }}>ID</th>
            <th style={{ padding: "15px" }}>Username</th>
            <th style={{ padding: "15px" }}>Email</th>
            <th style={{ padding: "15px" }}>Role</th>
            <th style={{ padding: "15px" }}>Birth Date</th>
            <th style={{ padding: "15px" }}>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {users.map((user) => (
            <tr key={user.id} >
              <td>{user.id}</td>
              <td>
                <input
                  type="text"
                  defaultValue={user.username}
                  onChange={(e) =>
                    handleEditField(user.id, "username", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="email"
                  defaultValue={user.email}
                  onChange={(e) =>
                    handleEditField(user.id, "email", e.target.value)
                  }
                />
              </td>
              <td>
                <p>{user.role}</p>
              </td>
              <td>
                <input
                  type="date"
                  defaultValue={user.birthDate}
                  onChange={(e) =>
                    handleEditField(user.id, "birthDate", e.target.value)
                  }
                />
              </td>
              <td>
                <Button
                  className="mb-3"
                  variant="danger"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="warning"
                  className="mb-3"
                  onClick={() => {
                    setSelectedUserId(user.id);
                    setShowResetModal(true);
                  }}
                >
                  Reset Password
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="text-center">
        <Button className="p-3 m-3" variant="primary" onClick={saveAllChanges}>
          <strong>Save All Changes</strong>
        </Button>
      </div>

      {/* Modal zum Zurücksetzen des Passworts */}
      <Modal show={showResetModal} onHide={() => setShowResetModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowResetModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleResetPassword}>
            Reset Password
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminPanel;
