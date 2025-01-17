import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import axios from "axios"; // Installiere axios, falls noch nicht installiert

import "../css/BrowseCatalog.css";

function BrowseCatalog() {
  const [courses, setCourses] = useState([]); // Hier wird die Liste der Kurse gespeichert
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState("grid");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Ladeszustand hinzufügen
  const [error, setError] = useState(null); // Fehlerbehandlung hinzufügen
  const navigate = useNavigate();


  const isLoggedIn = localStorage.getItem("token"); // Überprüfen, ob Benutzer angemeldet ist

  // useEffect, um Daten vom Backend zu laden
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:5001/api/courses");
         /*headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        */
        setCourses(response.data); // Kurse setzen
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
      return b.rating - a.rating;
    } else if (sortOption === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const toggleFavorite = (courseTitle) => {
    if (!isLoggedIn) {
      alert("Please log in to add courses to your favorites!");
      navigate("/register");
      return;
    }

    const updatedCourses = courses.map((course) =>
      course.title === courseTitle
        ? { ...course, favorited: !course.favorited }
        : course
    );
    setCourses(updatedCourses);
  };

  const handleBooking = (courseTitle) => {
    if (!isLoggedIn) {
      alert("Please log in to book a course!");
      navigate("/register");
      return;
    }

    const updatedCourses = courses.map((course) =>
      course.title === courseTitle ? { ...course, requested: true } : course
    );
    setCourses(updatedCourses);
    alert("Course successfully requested!"); // Platzhalteraktion
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
                  <strong>Dozent:</strong> {course.instructor} <br />
                  <strong>Bewertung:</strong> {course.rating}{" "}
                  <FontAwesomeIcon icon={faStar} style={{ color: "#FFD700" }} />{" "}
                  ({course.reviews} Bewertungen)
                </Card.Text>
                <ProgressBar
                  now={(course.enrolled / course.capacity) * 100}
                  label={`${course.enrolled}/${course.capacity} Belegt`}
                  variant={
                    course.enrolled === course.capacity ? "danger" : "info"
                  }
                  className="mb-3"
                />
                <div className="button-group">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Zu Favoriten hinzufügen</Tooltip>}
                  >
                    <Button
                      variant={course.favorited ? "danger" : "outline-danger"}
                      onClick={() => toggleFavorite(course.title)}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </Button>
                  </OverlayTrigger>
                  <Button
                    className="btn-primary"
                    onClick={() => handleBooking(course.title)}
                    disabled={
                      course.enrolled === course.capacity || course.requested
                    }
                  >
                    {course.requested ? "Kurs angefordert" : "Jetzt buchen"}
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
