import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ContactEntriesView = () => {
  const [entries, setEntries] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        return;
      }

      try {
        const response = await fetch("http://localhost:5001/api/protected", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data.user); // Speichere Benutzerdaten
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      }
    };

    const fetchEntries = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        return;
      }

      try {
        const response = await fetch("http://localhost:5001/api/contact-entries", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch contact entries");

        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.error("Error fetching contact entries:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Lade Benutzerdaten und danach die Einträge
    const loadData = async () => {
      await fetchUserData();
      await fetchEntries();
    };

    loadData();
  }, []);

  const handleDeleteEntry = async (entryId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5001/contact-entries/${entryId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete contact entry");

      setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
    } catch (error) {
      console.error("Error deleting contact entry:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Contact Form Entries</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.name}</td>
              <td>{entry.email}</td>
              <td>{entry.message}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteEntry(entry.id)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ContactEntriesView;