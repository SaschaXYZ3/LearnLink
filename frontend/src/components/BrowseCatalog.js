import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Categories, SubCategories, SortOptions } from "../data/categories"; // Importiere die Daten

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
  faHeart as faSolidHeart,
  faStar,
  faList,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";

import "../css/BrowseCatalog.css";

function BrowseCatalog() {
  const [courses, setCourses] = useState([]); // Hier wird die Liste der Kurse gespeichert
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState("grid");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubCategory, setFilterSubCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Ladeszustand hinzufügen
  const [error, setError] = useState(null); // Fehlerbehandlung hinzufügen
  const [showFavorites, setShowFavorites] = useState(false); // State für favoriten

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token"); // Überprüfen, ob Benutzer angemeldet ist
  const token = localStorage.getItem("token");

  // useEffect, um Daten vom Backend zu laden
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5001/api/courses");
        /*headers: {
     Authorization: `Bearer ${localStorage.getItem("token")}`,
     "Content-Type": "application/json",
   },
 });
 */
        const data = await response.json();
        setCourses(data);
        setIsLoading(false);

      } catch (err) {
        console.error("Error fetching courses: ", err);
        setError("Fehler beim Laden der Kursdaten.");
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []); // Leeres Array stellt sicher, dass der Effekt nur einmal ausgeführt wird


  // Dynamically filter subcategories based on selected category
  const availableSubCategories = filterCategory
    ? SubCategories.filter((sub) => sub.category === filterCategory)
    : SubCategories;


  // Filter logic for courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearchTerm = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? course.category === filterCategory : true;
    const matchesSubCategory = filterSubCategory ? course.subcategory === filterSubCategory : true;
    const matchesFavorites = showFavorites ? course.isFavorite : true;
    return matchesSearchTerm && matchesCategory && matchesSubCategory && matchesFavorites;
  });

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
      alert("Please log in to add courses to your favorites!");
      navigate("/register");
      return;
    }

    try {
      // API-Aufruf zum Aktualisieren des Favoritenstatus
      const response = await fetch(
        `http://localhost:5001/api/courses/${courseId}/favorite`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${"token"}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      // Überprüfen, ob die Anfrage erfolgreich war
      if (!response.ok) {
        throw new Error(`Fehler: ${response.status}`);
      }

      const data = await response.json(); // Antwortdaten parsen

      // Favoritenstatus im State aktualisieren
      const updatedCourses = courses.map((course) =>
        course.id === courseId
          ? { ...course, isFavorite: data.isFavorite }
          : course
      );
      setCourses(updatedCourses);
    } catch (err) {
      console.error("Fehler beim Aktualisieren des Favoritenstatus: ", err);
      alert("Fehler beim Aktualisieren des Favoritenstatus.");
    }
  };

  const handleBooking = async (courseId) => {
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


        {/* Category Select */}
        <Form.Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="mb-3">

          {/* Default Anzeige ALLE KATEGORIEN*/}
          <option value="">All Categories</option>

          {Categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </Form.Select>

        {/* Subcategory Select */}
        <Form.Select value={filterSubCategory} onChange={(e) => setFilterSubCategory(e.target.value)} disbled={!filterCategory}>
         
          {/* Default Anzeige ALLE KATEGORIEN*/}
          <option value="">Alle Kategorien</option>


          {availableSubCategories.map((subcategory) => (
            <option key={subcategory.value} value={subcategory.value}>
              {subcategory.label}
            </option>
          ))}
        </Form.Select>

        <Form.Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          {SortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      </Form>

      <div
        className={`filter-favorites mb-3 ${showFavorites ? "favorite-active" : ""
          }`}
        onClick={() => setShowFavorites(!showFavorites)}
      >
        <FontAwesomeIcon icon={showFavorites ? faSolidHeart : faRegularHeart} />
        <span className="ms-2">Nur Favoriten anzeigen</span>
      </div>

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
                  <strong>Category:</strong> {course.category} <br />
                  <strong>Subcategory:</strong> {course.subcategory} <br />
                  <strong>Tutor Rating:</strong> {course.averageRating?.toFixed(1)}{" "}
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
                      <FontAwesomeIcon icon={faSolidHeart} />
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
