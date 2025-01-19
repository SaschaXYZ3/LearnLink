import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-calendar/dist/Calendar.css";

const localizer = momentLocalizer(moment);

function AllCalendar() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Funktion zum Abrufen der Termine
    const fetchEvents = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Token is missing. Please log in.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:5001/api/user/schedule", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch events.");
            }

            const data = await response.json();

            // Daten in das erforderliche Format für react-big-calendar konvertieren
            const formattedEvents = data.events.map((event) => ({
                title: `${event.courseTitle} (${event.bookingStatus})`,
                start: new Date(`${event.date}T${event.time}`), // Startzeit
                end: new Date(new Date(`${event.date}T${event.time}`).getTime() + 60 * 60 * 1000), // 1 Stunde später
                color: event.bookingStatus === "Tutor Course" ? "blue" : "green", // Unterschiedliche Farben für Tutor und Student
            }));

            setEvents(formattedEvents);
        } catch (err) {
            console.error("Error fetching events:", err.message);
            setError("There was a problem fetching the events.");
        } finally {
            setLoading(false);
        }
    };

    // Events bei der Initialisierung laden
    useEffect(() => {
        fetchEvents();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>User Schedule</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{
                    height: "400px", // Höhe anpassen
                    width: "80%", // Breite anpassen
                    margin: "0 auto", // Zentriert auf der Seite
                    fontSize: "14px", // Schriftgröße für bessere Lesbarkeit
                    backgroundColor: "#f8f9fa", // Heller Hintergrund
                    borderRadius: "8px", // Abgerundete Ecken
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Schatteneffekt
                }}
            />
        </div>
    );
}

export default AllCalendar;