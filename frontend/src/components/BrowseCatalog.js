import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Categories, SubCategories, SortOptions } from "../data/categories"; // Importiere die Daten

import {
  Container,
  Button,
  Card,
  ProgressBar,
  Tooltip,
  OverlayTrigger,
  Form,
  Modal,
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
  const [showModal, setShowModal] = useState(false); // Modal anzeigen
  const [selectedCourse, setSelectedCourse] = useState(null); // Ausgewählter Post für das Modal
  const [tutorRatings, setTutorRatings] = useState({}); // Zustand für Tutor-Ratings

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token"); // Überprüfen, ob Benutzer angemeldet ist
  const token = localStorage.getItem("token");

  // useEffect, um Daten vom Backend zu laden
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const endpoint = isLoggedIn
          ? "http://localhost:5001/api/courses"
          : "http://localhost:5001/api/public/courses";

        const response = await fetch(endpoint, {
          method: "GET",
          headers: isLoggedIn
            ? {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              }
            : { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Kurse.");
        }

        const data = await response.json();

        // Für eingeloggte Benutzer `isFavorite` umwandeln
        const transformedData = data.map((course) => ({
          ...course,
          isFavorite: course.isFavorite === 1 || course.isFavorite === true, // Für eingeloggte Benutzer
        }));

        setCourses(transformedData);
      } catch (err) {
        console.error("Fehler beim Abrufen der Kurse:", err.message);
        setError("Fehler beim Laden der Kursdaten.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [token, isLoggedIn]);

  useEffect(() => {
    const fetchTutorRatings = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/tutor/ratings",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Tutor-Ratings");
        }

        const data = await response.json();
        const ratingsMap = data.reduce((acc, rating) => {
          acc[rating.tutorId] = {
            averageRating: rating.averageRating || 0,
            totalRatings: rating.totalRatings || 0,
          };
          return acc;
        }, {});

        // Kurse aktualisieren und Ratings hinzufügen
        setCourses((prevCourses) =>
          prevCourses.map((course) => ({
            ...course,
            ...ratingsMap[course.userId],
          }))
        );
      } catch (error) {
        console.error("Fehler beim Laden der Tutor-Ratings:", error.message);
      }
    };

    fetchTutorRatings();
  }, [token]);

  // Dynamically filter subcategories based on selected category
  const availableSubCategories = filterCategory
    ? SubCategories.filter((sub) => sub.category === filterCategory)
    : SubCategories;

  // Filter logic for courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearchTerm =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.subcategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tutor.toLowerCase().includes(searchTerm.toLowerCase()); // Hinzufügen der Tutorensuche

    const matchesCategory = filterCategory
      ? course.category === filterCategory
      : true;

    const matchesSubCategory = filterSubCategory
      ? course.subcategory === filterSubCategory
      : true;

    const matchesFavorites = showFavorites ? course.isFavorite : true;

    return (
      matchesSearchTerm && // Jetzt Titel oder Tutorname
      matchesCategory &&
      matchesSubCategory &&
      matchesFavorites
    );
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortOption === "rating") {
      return b.averageRating - a.averageRating;
    } else if (sortOption === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "tutor") {
      return a.tutor.localeCompare(b.tutor);
    }
    return 0;
  });

  const toggleFavorite = async (courseId) => {
    if (!isLoggedIn) {
      alert("Bitte loggen Sie sich ein, um Kurse zu favorisieren!");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/courses/${courseId}/favorite`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Fehler beim Aktualisieren des Favoritenstatus");
      }

      const { isFavorite } = await response.json();

      // Zustand aktualisieren
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === courseId
            ? { ...course, isFavorite } // Favoritenstatus aktualisieren
            : course
        )
      );
    } catch (err) {
      console.error("Fehler beim Aktualisieren des Favoritenstatus:", err);
      alert("Fehler beim Aktualisieren des Favoritenstatus.");
    }
  };

  const handleBooking = async (courseId, maxStudents) => {
    // Überprüfen, ob der Benutzer eingeloggt ist
    if (!isLoggedIn) {
      // Benutzer zur Registrierungsseite weiterleiten, wenn er nicht eingeloggt ist
      alert("Bitte loggen Sie sich ein, um den Kurs zu buchen!");
      navigate("/register");
      return;
    }
    try {
      // Punkteprüfung nur für 1-on-1-Kurse
      if (maxStudents === 1) {
        const response = await fetch("http://localhost:5001/api/user/points", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Punkte");
        }

        const { points } = await response.json();
        console.log("Erhaltene Punkte:", points);

        if (points < 200) {
          alert(
            "Sie benötigen mindestens 200 Punkte, um einen 1-on-1-Tutoring zu buchen."
          );
          return; // Abbrechen, wenn nicht genügend Punkte vorhanden sind
        }
      }

      // Buchungsanfrage senden
      const bookingResponse = await fetch(
        `http://localhost:5001/api/book/${courseId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await bookingResponse.json();

      if (data.error) {
        alert(data.error); // Fehler anzeigen
      } else {
        alert(data.message); // Erfolgsnachricht anzeigen
      }
    } catch (error) {
      console.error("Fehler beim Buchen:", error.message);
      alert("Fehler beim Buchen des Kurses.");
    }
  };

  //show modal
  const handleShowModal = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
    setShowModal(false);
  };

  return (
    <Container className="browse-catalog-page mt-5">
      <Form className="d-flex justify-content-between align-items-center mb-4">
        <Form.Control
          type="text"
          placeholder="Search for courses ... "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-50"
        />
        <Button
          variant="secondary"
          onClick={() => setViewType(viewType === "grid" ? "list" : "grid")}>
          <FontAwesomeIcon icon={viewType === "grid" ? faList : faThLarge} />
        </Button>

        {/* Category Select */}
        <Form.Select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="mb-3">
          {/* Default Anzeige ALLE KATEGORIEN*/}
          <option value="">All categories</option>

          {Categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </Form.Select>

        {/* Subcategory Select */}
        <Form.Select
          value={filterSubCategory}
          onChange={(e) => setFilterSubCategory(e.target.value)}
          disabled={!filterCategory}>
          {/* Default Anzeige ALLE KATEGORIEN*/}
          <option value="">All subcategories</option>

          {availableSubCategories.map((subcategory) => (
            <option key={subcategory.value} value={subcategory.value}>
              {subcategory.label}
            </option>
          ))}
        </Form.Select>

        <Form.Select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}>
          {SortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      </Form>

      <div
        className={`filter-favorites mb-3 ${
          showFavorites ? "favorite-active" : ""
        }`}
        onClick={() => setShowFavorites(!showFavorites)}>
        <FontAwesomeIcon icon={showFavorites ? faSolidHeart : faRegularHeart} />
        <span className="ms-2">
          <strong>Show only favorites</strong>
        </span>
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
          }>
          {sortedCourses.map((course, index) => (
            <Card
              key={index}
              style={{ width: "20rem" }}
              className="course-card">
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>
                  <strong>Category:</strong> {course.category} <br />
                  <strong>Subcategory:</strong> {course.subcategory} <br />
                  <strong>Tutor:</strong> {course.tutor} <br />
                  <strong>Tutor Rating:</strong>{" "}
                  {tutorRatings[course.tutorId]
                    ? `${tutorRatings[course.tutorId].averageRating?.toFixed(
                        1
                      )} (${tutorRatings[course.tutorId].totalRatings} Ratings)`
                    : "No ratings yet"}
                </Card.Text>

                {/* Button for description */}
                <div>
                  <Button
                    className="mb-4"
                    onClick={() => handleShowModal(course)} // Übergibt das 'course' Objekt an die Funktion
                  >
                    Show more
                  </Button>
                </div>

                {/* Modal für Kursbeschreibung */}
                <Modal show={showModal} onHide={handleCloseModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>{selectedCourse?.title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>
                      <strong>Category:</strong> {selectedCourse?.category}
                    </p>
                    <p>
                      <strong>Subcategory</strong> {selectedCourse?.subcategory}
                    </p>
                    <p>
                      <strong>Rating:</strong>{" "}
                      {selectedCourse?.averageRating?.toFixed(1)}
                    </p>
                    <p>
                      <strong>Tutor:</strong>{" "}
                      {selectedCourse?.tutor || "Undefined"}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {selectedCourse?.description ||
                        "No description available."}
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>

                <div className="progress-container">
                  <div className="progress-label">
                    {`${course.actualStudents || 0}/${
                      course.maxStudents || "∞"
                    } Belegt`}
                  </div>
                  <ProgressBar
                    now={
                      course.maxStudents > 0
                        ? (course.actualStudents / course.maxStudents) * 100
                        : 0
                    }
                    variant={
                      course.actualStudents === course.maxStudents
                        ? "danger"
                        : "info"
                    }
                    className="mb-3"
                  />
                </div>

                <div className="button-group">
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        {course.isFavorite
                          ? "Remove from favorites"
                          : "Add to favorites"}
                      </Tooltip>
                    }>
                    <Button
                      variant={course.isFavorite ? "danger" : "outline-danger"} // Dynamische Farbe
                      onClick={() => toggleFavorite(course.id)} // Favoritenstatus umschalten
                    >
                      <FontAwesomeIcon
                        icon={course.isFavorite ? faSolidHeart : faRegularHeart} // Herzstatus anzeigen
                      />
                    </Button>
                  </OverlayTrigger>
                  <Button
                    className="btn-primary"
                    onClick={() => handleBooking(course.id, course.maxStudents)}
                    disabled={course.actualStudents === course.maxStudents}>
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
