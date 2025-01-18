import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resetPasswordValue, setResetPasswordValue] = useState("");

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

  const handleDeleteUser = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5001/admin/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete user");

      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleResetPassword = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5001/admin/users/${userId}/reset-password`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: resetPasswordValue }),
      });

      if (!response.ok) throw new Error("Failed to reset password");
      alert("Password reset successfully!");
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  const handleEditUsername = async (userId, newUsername) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5001/admin/users/${userId}/edit-username`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newUsername }),
      });

      if (!response.ok) throw new Error("Failed to update username");

      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, username: newUsername } : user))
      );
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Admin Panel</h1>
      <Form className="mb-3">
        <Form.Group controlId="resetPassword">
          <Form.Label>Default Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter default password"
            value={resetPasswordValue}
            onChange={(e) => setResetPasswordValue(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Birth Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <input
                  type="text"
                  defaultValue={user.username}
                  onBlur={(e) => handleEditUsername(user.id, e.target.value)}
                />
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.birthDate}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </Button>{" "}
                <Button
                  variant="primary"
                  onClick={() => handleResetPassword(user.id)}
                >
                  Reset Password
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AdminPanel;