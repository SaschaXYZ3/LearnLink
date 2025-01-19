import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Card,
  ProgressBar,
  Badge,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/StudentView.css";
import Calendar from "./Calendar.js";
import "../css/Calendar.css";
import confetti from "canvas-confetti";


function StudentView() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [completedCourses, setCompletedCourses] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState(""); // Filter für Kursstatus
  const [showModal, setShowModal] = useState(false); // Modal-Status
  const [selectedCourse, setSelectedCourse] = useState(null); // Ausgewählter Kurs für die Bewertung
  const [rating, setRating] = useState(0); // Bewertung (1 bis 5 Sterne)
  const [hoverRating, setHoverRating] = useState(0); // Für Hover-Effekte
  const [tutorRatings, setTutorRatings] = useState({});
  const [points, setPoints] = useState(0); // Punkte-Variable
  const [showPointsModal, setShowPointsModal] = useState(false); // Modal-Status
  const token = localStorage.getItem("token");

  // Fortschrittsdaten abrufen
  useEffect(() => {
    const fetchProgress = async () => {
      if (!token) {
        console.warn("Kein Token gefunden. Bitte loggen Sie sich ein.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5001/user/progress`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Fortschrittsdaten");
        }

        const data = await response.json();
        console.log("Progress data:", data);

        setCompletedCourses(data.completed); // Abgeschlossene Kurse
        setTotalCourses(data.total); // Gesamtkurse
        setPoints(data.completed * 100); // Beispiel: 100 Punkte pro abgeschlossenem Kurs
      } catch (error) {
        console.error(
          "Fehler beim Abrufen der Fortschrittsdaten:",
          error.message
        );
      }
    };

    fetchProgress();
  }, [token]);

  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    if (points > 0) {
      // Starte Konfetti
      launchConfetti();
  
      // Füge eine Klasse für den Text-Hervorhebungseffekt hinzu
      const pointsText = document.querySelector(".points-text");
      pointsText.classList.add("highlight");
  
      // Entferne die Hervorhebung nach 3 Sekunden
      setTimeout(() => {
        pointsText.classList.remove("highlight");
      }, 3000);
    }
  }, [points]);
  
  

  //Fetch all Courses from backend
  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) {
        console.warn("Kein Token gefunden. Bitte loggen Sie sich ein.");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5001/api/student/bookings",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Buchungen");
        }

        const data = await response.json();
        console.log("Fetched bookings:", data);
        setBookings(data); // Gebuchte Kurse in den State speichern
      } catch (error) {
        console.error("Fehler beim Laden der Buchungen:", error.message);
      }
    };

    fetchBookings();
  }, [token]);

  useEffect(() => {
    const fetchTutorRatings = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/tutor/ratings",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Optional, falls der Endpunkt geschützt ist
            },
          }
        );

        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Tutor-Ratings");
        }

        const data = await response.json();

        // Transformiere die Daten in ein Objekt, um schnellen Zugriff zu ermöglichen
        const ratingsMap = data.reduce((acc, tutor) => {
          acc[tutor.tutorId] = tutor.averageRating;
          return acc;
        }, {});

        setTutorRatings(ratingsMap);
      } catch (error) {
        console.error("Fehler beim Laden der Tutor-Ratings:", error.message);
      }
    };

    fetchTutorRatings();
  }, [token]);

  // Kursstatus filtern
  const filteredBookings = bookings.filter((booking) => {
    // Keine Filterung, wenn kein Status ausgewählt ist
    if (!filterStatus) return true;

    // Prüfe, ob der bookingStatus dem ausgewählten Filter entspricht
    return booking.bookingStatus.toLowerCase() === filterStatus.toLowerCase();
  });

  // Bewertung abschicken
  const handleSubmitRating = async () => {
    if (rating < 1) {
      alert("Please select at least 1 star.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/courses/${selectedCourse.courseId}/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ rating, comment: "Great course!" }), // Replace with dynamic comment
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit rating.");
      }

      alert("Rating submitted successfully!");

      // Update the bookings state with the new rating
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.courseId === selectedCourse.courseId
            ? { ...booking, userRating: rating }
            : booking
        )
      );

      setShowModal(false);
      setRating(0);
    } catch (error) {
      console.error("Error submitting rating:", error.message);
      alert("Error submitting rating.");
    }
  };

  return (
    <div className="studentview-page">
      {/* Hero Section */}
      <div className="catalog-hero">
        <h1>Welcome Back to Your Learning Hub!</h1>
        <p>Manage your courses and track your progress.</p>
        <Button className="hero-btn" onClick={() => navigate("/browsecatalog")}>
          Browse All Courses
        </Button>
      </div>

      {/* Fortschrittsverfolgung */}
      <Container className="progress-section mt-5">
        <h2>Your Learning Progress</h2>
        <div className="custom-progress-bar-wrapper">
          <ProgressBar
            now={totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0}
            label={`${completedCourses} of ${totalCourses} completed`}
            className="custom-progress-bar"
            variant="success"
            animated
          />
        </div>
        <h4 style={{ color: "#ff6347" }}  className="mt-4 points-text">
          You have earned <strong>{points}</strong> points! 🎉
        </h4>
        <button
          className="mt-3 fs-5"
          onClick={() => setShowPointsModal(true)}
        >
          What can you do with the points?
        </button>
      </Container>

      {/* Modal für Punkte */}
      <Modal show={showPointsModal} onHide={() => setShowPointsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>What can you do with your points?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Points are a reward for your progress! Here’s how you can use them:
          </p>
          <ul>
            <li>Spend on additional 1-on-1 tutoring.</li>
            <li>Unlock exclusive courses.</li>
            <li>Earn badges for your achievements.</li>
          </ul>
          <strong>Keep up the great work and earn more points to unlock rewards!</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPointsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Kalender Integration */}
      <Container className="calendar-section mt-5">
        <Calendar />
      </Container>

      {/* Filter und Buchungen */}
      <Container className="bookings-section mt-5">
        <h2>Your Current Bookings</h2>
        {/* Filter */}
        <div className="filter-section mb-3">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Courses</option>
            <option value="Booked">Booked</option>
            <option value="Completed">Completed</option>
            <option value="Requested">Requested</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Container für die Buchungen */}
        <div className="d-flex flex-wrap gap-3">
          {Array.isArray(filteredBookings) && filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <Card key={booking.bookingId} className="course-card mb-3">
                <Card.Body>
                  <Card.Title>{booking.title}</Card.Title>
                  <Card.Text>
                    <strong>Title:</strong> {booking.courseTitle} <br />
                    <strong>Category:</strong> {booking.category} <br />
                    <strong>Tutor:</strong> {booking.tutorName} <br />
                    <strong>Date:</strong> {booking.date} <br />
                    <strong>Time:</strong> {booking.time} <br />
                    <strong>Description:</strong> {booking.description} <br />
                    <strong>Seats:</strong> {booking.actualStudents}/
                    {booking.maxStudents} <br />
                    <strong>Average Tutor Rating:</strong>{" "}
                    {tutorRatings[booking.tutorId]
                      ? `${tutorRatings[booking.tutorId].toFixed(1)} ★`
                      : "No ratings yet"}
                    <br />
                    <strong>Your Rating:</strong>{" "}
                    {booking.userRating ?? "Not rated yet"} ★
                  </Card.Text>
                  <Badge
                    bg={
                      booking.bookingStatus === "booked"
                        ? "primary"
                        : booking.bookingStatus === "completed"
                        ? "success"
                        : booking.bookingStatus === "rejected"
                        ? "danger"
                        : booking.bookingStatus === "requested"
                        ? "warning"
                        : "secondary"
                    }
                  >
                    {booking.bookingStatus.charAt(0).toUpperCase() +
                      booking.bookingStatus.slice(1)}
                  </Badge>
                  <div className="mt-3">
                    {booking.bookingStatus === "completed" ? (
                      <Button
                        variant="success"
                        disabled={!!booking.userRating}
                        onClick={() => {
                          setSelectedCourse(booking);
                          setShowModal(true);
                        }}
                      >
                        {!!booking.userRating ? "Rated" : "Rate"}
                      </Button>
                    ) : booking.bookingStatus === "requested" ? (
                      <Button variant="warning" disabled>
                        Pending Approval
                      </Button>
                    ) : (
                      <Button variant="secondary" disabled>
                        Not Rateable
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No bookings available.</p>
          )}
        </div>
      </Container>
      {/* Modal für Bewertung */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rate {selectedCourse?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Please rate the course by clicking on the stars below. 1 is the
            minimum and 5 is the maximum.
          </p>
          <div className="rating-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`rating-star ${
                  star <= (hoverRating || rating) ? "filled" : "empty"
                }`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmitRating}>
            Submit Rating
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StudentView;
