import React, { useEffect } from "react";

// API-Aufruf für anstehende Kurse
const fetchUpcomingCourses = async (token) => {
  try {
    const response = await fetch("http://localhost:5001/api/user/upcoming-courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Auth-Token senden
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch upcoming courses.");
    }

    return await response.json(); // Kurse zurückgeben
  } catch (error) {
    console.error("Error fetching upcoming courses:", error.message);
    return [];
  }
};

const Notification = () => {
  const token = localStorage.getItem("token"); // Token aus dem Speicher abrufen

  // Anfrageberechtigung für Notifications
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Funktion zur Anzeige einer Benachrichtigung
  const sendNotification = (course) => {
    if (Notification.permission === "granted") {
      new Notification("Upcoming Course Reminder", {
        body: `Your course "${course.title}" starts in 1 hour at ${course.time}.`,
      });
    }
  };

  // Funktion zum Prüfen von anstehenden Kursen
  const checkUpcomingCourses = async () => {
    try {
      const courses = await fetchUpcomingCourses(token);
      const now = new Date();

      courses.forEach((course) => {
        const courseDateTime = new Date(`${course.date}T${course.time}`);
        const timeDifference = courseDateTime - now;

        // Benachrichtigung senden, wenn der Kurs in 1 Stunde beginnt
        if (timeDifference > 0 && timeDifference <= 3600000) {
          sendNotification(course);
        }
      });
    } catch (error) {
      console.error("Error checking upcoming courses:", error);
    }
  };

  // Regelmäßige Überprüfung alle 10 Minuten
  useEffect(() => {
    const interval = setInterval(checkUpcomingCourses, 10 * 60 * 1000); // 10 Minuten
    return () => clearInterval(interval); // Aufräumen
  }, [token]); // `token` als Abhängigkeit hinzufügen

  return null; // Kein UI erforderlich
};

export default Notification;