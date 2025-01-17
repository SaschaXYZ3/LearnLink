import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Card,
  ProgressBar,
  Tooltip,
  OverlayTrigger,
  Form,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar,
  faList,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons";

import "../css/BrowseCatalog.css";

function BrowseCatalog() {
  const [courses, setCourses] = useState([]); // Hier wird die Liste der Kurse gespeichert
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState("grid");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Ladeszustand hinzufügen
  const [error, setError] = useState(null); // Fehlerbehandlung hinzufügen

  const isLoggedIn = localStorage.getItem("token"); // Überprüfen, ob Benutzer angemeldet ist



  // useEffect, um Daten vom Backend zu laden
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);

        // Abrufen der Daten mit fetch
        const response = await fetch("http://localhost:5001/api/courses", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        // Überprüfen, ob die Anfrage erfolgreich war
        if (!response.ok) {
          throw new Error(`Fehler: ${response.status}`);
        }

        const data = await response.json(); // Parsen der Antwortdaten
        setCourses(data); // Daten aus der API in den State setzen
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching courses: ", err);
        setError("Fehler beim Laden der Kursdaten.");
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []); // Leeres Array stellt sicher, dass der Effekt nur einmal ausgeführt wird

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory ? course.category === filterCategory : true)
  );

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortOption === "rating") {
      return b.averageRating - a.averageRating;
    } else if (sortOption === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

 
  const toggleFavorite = async (courseId) => {
    if (!isLoggedIn) {
      alert("Bitte melde dich an, um Kurse zu den Favoriten hinzuzufügen!");
      return;
    }
  
    try {
      // API-Aufruf zum Aktualisieren des Favoritenstatus
      const response = await fetch(`http://localhost:5001/api/courses/${courseId}/favorite`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), 
      });
  
      // Überprüfen, ob die Anfrage erfolgreich war
      if (!response.ok) {
        throw new Error(`Fehler: ${response.status}`);
      }
  
      const data = await response.json(); // Antwortdaten parsen
  
      // Favoritenstatus im State aktualisieren
      const updatedCourses = courses.map((course) =>
        course.id === courseId ? { ...course, isFavorite: data.isFavorite } : course
      );
      setCourses(updatedCourses);
    } catch (err) {
      console.error("Fehler beim Aktualisieren des Favoritenstatus: ", err);
      alert("Fehler beim Aktualisieren des Favoritenstatus.");
    }
  };

  const handleBooking = async (courseId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5001/api/book/${courseId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.error) {
        alert(data.error); // Zeigt den Fehler an, falls es einen gibt
      } else {
        alert(data.message); // Erfolgsnachricht anzeigen
      }
    } catch (error) {
      console.error("Fehler beim Buchen:", error);
      alert("Fehler beim Buchen des Kurses.");
    }
  };

  return (
    <Container className="browse-catalog-page mt-5">
      <Form className="d-flex justify-content-between align-items-center mb-4">
        <Form.Control
          type="text"
          placeholder="Suche nach Kursen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-50"
        />
        <Button
          variant="secondary"
          onClick={() => setViewType(viewType === "grid" ? "list" : "grid")}
        >
          <FontAwesomeIcon icon={viewType === "grid" ? faList : faThLarge} />
        </Button>
        <Form.Select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Alle Kategorien</option>
          <option value="Coding">Coding</option>
          <option value="IT Security">IT Security</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Network Technologies">Network Technologies</option>
        </Form.Select>
        <Form.Select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sortieren nach</option>
          <option value="rating">Bewertung</option>
          <option value="title">Titel</option>
        </Form.Select>
      </Form>

      {isLoading ? (
        <div>Loading courses...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div
          className={
            viewType === "grid"
              ? "d-flex flex-wrap gap-4 justify-content-center"
              : ""
          }
        >
          {sortedCourses.map((course, index) => (
            <Card
              key={index}
              style={{ width: "20rem" }}
              className="course-card"
            >
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>
                  <strong>Kategorie:</strong> {course.category} <br />
                  <strong>Bewertung:</strong> {course.averageRating?.toFixed(1)}{" "}
                  <FontAwesomeIcon icon={faStar} style={{ color: "#FFD700" }} />
                  ({course.course_reviews?.length || 0} Bewertungen)
                </Card.Text>

                <ProgressBar
                  now={(() => {
                    // Wenn actualStudents oder maxStudents nicht vorhanden sind, gehe mit einem Default-Wert vor
                    const actual = course.actualStudents || 0; // Standardwert 0, falls keine Studenten vorhanden sind
                    const max = course.maxStudents > 0 ? course.maxStudents : 1; // Standardwert 1, falls keine max. Anzahl an Studenten gesetzt ist
                    return Math.min(Math.max((actual / max) * 100, 0), 100); // Berechnung des Prozentsatzes, der zwischen 0 und 100 liegt
                  })()}
                  label={`${course.actualStudents || 0}/${course.maxStudents > 0 ? course.maxStudents : 1
                    } Belegt`} // Anzeige der belegten Plätze
                  variant={
                    course.actualStudents === course.maxStudents
                      ? "danger"
                      : "info"
                  } // Rote Farbe, wenn der Kurs voll ist
                  className="mb-3"
                />

                <div className="button-group">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Zu Favoriten hinzufügen</Tooltip>}
                  >
                    <Button
                      variant={course.isFavorite ? "danger" : "outline-danger"}
                      onClick={() => toggleFavorite(course.id)}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </Button>
                  </OverlayTrigger>
                  <Button
                    className="btn-primary"
                    onClick={() => handleBooking(course.id)}
                    disabled={course.actualStudents === course.maxStudents}
                  >
                    Jetzt buchen
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}

export default BrowseCatalog;
