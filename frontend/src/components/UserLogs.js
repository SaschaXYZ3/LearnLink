import React, { useEffect, useState } from "react";
import { Container, Table, Spinner, Alert } from "react-bootstrap";

function UserLogs({ role }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLogs = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token is missing. Please log in.");
      setLoading(false);
      return;
    }

    try {
      // API endpoint depends on the role
      let url = "http://localhost:5001/api/analytics"; // Default for admin

      if (role === "student") {
        url = "http://localhost:5001/api/student/logs"; // Student-specific logs
      } else if (role === "tutor") {
        url = "http://localhost:5001/api/tutor/logs"; // Tutor-specific logs
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user logs.");
      }

      const data = await response.json();
      setLogs(data.logs || []);
    } catch (err) {
      console.error("Error:", err.message);
      setError("There was a problem fetching the data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  });

  return (
    <Container className="mt-5">
      <h2>{role.charAt(0).toUpperCase() + role.slice(1)} Logs</h2>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && logs.length === 0 && (
        <Alert variant="warning">No logs found.</Alert>
      )}
      {!loading && logs.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Endpoint</th>
              <th>Action</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={log.id}>
                <td>{index + 1}</td>
                <td>{log.endpoint}</td>
                <td>{log.action}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default UserLogs;
