import React, { useEffect, useState } from "react";

function AdminPanel() {
  const [users, setUsers] = useState([]); // Für Benutzer speichern
  const [loading, setLoading] = useState(true); // Lade-Status
  const [error, setError] = useState(null); // Fehlerstatus

  // Daten beim Laden der Komponente abrufen
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token"); // Token aus dem Local Storage (sofern es dort gespeichert ist)

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
          console.log("Fetched data", data);
          setUsers(data); // Benutzer in den State speichern
        } else {
          const errorData = await response.json();
          console.error("Error fetching users:", errorData);
          setError(errorData.error || "An error occurred while fetching data");
        }
      } catch (error) {
        console.error("Network error:", error);
        setError("Network error occurred.");
      } finally {
        setLoading(false); // Lade-Status auf false setzen
      }
    };

    fetchUsers(); // Funktion zum Abrufen der Benutzer aufrufen
  }, []); // Leeres Array, um den Effekt nur einmal auszuführen

  if (loading) {
    return <p>Loading...</p>; // Ladeanzeige
  }

  if (error) {
    return <p>{error}</p>; // Fehleranzeige
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Birth Date</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && <tr><td colSpan="5">No users found</td></tr>} {/* Wenn keine Benutzer da sind */}
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.birthDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
