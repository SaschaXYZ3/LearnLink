import React, { useState, useEffect } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";

const ProfileChangesView = () => {
  const [profileChanges, setProfileChanges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileChanges = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No authentication token found. Please log in.");
          setIsLoading(false);
          return;
        }

        const response = await fetch("http://localhost:5001/api/profile-changes", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch profile changes.");
        }

        const data = await response.json();
        setProfileChanges(data);
      } catch (error) {
        console.error("Error fetching profile changes:", error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileChanges();
  }, []);

  return (
    <div className="profile-changes-view">
      <h2 className="mb-4">Profile Changes</h2>

      {isLoading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!isLoading && !error && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Username</th>
              <th>Change Type</th>
              <th>Timestamp</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {profileChanges.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No profile changes found.
                </td>
              </tr>
            ) : (
              profileChanges.map((change, index) => (
                <tr key={index}>
                  <td>{change.username}</td>
                  <td>{change.changeType}</td>
                  <td>{new Date(change.timestamp).toLocaleString()}</td>
                  <td>{change.ipAddress}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ProfileChangesView;