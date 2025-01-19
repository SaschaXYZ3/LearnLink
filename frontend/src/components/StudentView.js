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
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/StudentView.css";

function StudentView() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [completedCourses, setCompletedCourses] = useState(3);
    const [totalCourses, setTotalCourses] = useState(10);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filterStatus, setFilterStatus] = useState(""); // Filter für Kursstatus
    const [showModal, setShowModal] = useState(false); // Modal-Status
    const [selectedCourse, setSelectedCourse] = useState(null); // Ausgewählter Kurs für die Bewertung
    const [rating, setRating] = useState(0); // Bewertung (1 bis 5 Sterne)
    const [hoverRating, setHoverRating] = useState(0); // Für Hover-Effekte
    const [viewType, setViewType] = useState("list"); // Default is list view

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.warn("Kein Token gefunden. Bitte loggen Sie sich ein.");
                return;
            }

            try {
                const response = await fetch("http://localhost:5001/api/student/bookings", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

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
    }, []);

    /*const handleLogout = () => {
        localStorage.removeItem("username");
        navigate("/login");
    };
    */

    // Kursstatus filtern
    const filteredBookings = bookings.filter((booking) =>
        filterStatus ? booking.status === filterStatus : true
    );



    // Bewertung abschicken
    const handleSubmitRating = async () => {
        if (rating < 1) {
            alert("Please select at least 1 star.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5001/api/courses/${selectedCourse.courseId}/review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ rating, comment: "Great course!" }), // Replace with dynamic comment
            });

            if (!response.ok) {
                throw new Error("Failed to submit rating.");
            }

            alert("Rating submitted successfully!");
            setShowModal(false);
            setRating(0);
            // Optionally, refetch the course data to update the ratings
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
                <ProgressBar
                    now={(completedCourses / totalCourses) * 100}
                    label={`${completedCourses} of ${totalCourses} completed`}
                    variant="success"
                />
            </Container>

            {/* Kalender Integration */}
            <Container className="calendar-section mt-5">
                <h2>Upcoming Classes</h2>
                <Calendar onChange={setSelectedDate} value={selectedDate} />
                <p>Selected Date: {selectedDate.toDateString()}</p>
            </Container>

            {/* Filter und Buchungen */}
            <Container className="bookings-section mt-5">
                <h2>Your Current Bookings</h2>
                <div className="filter-section mb-3">
                    <select
                        className="form-select"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">All Courses</option>
                        <option value="Booked">Open</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                {/* View Toggle Button */}
                <div className="view-toggle mb-3">
                    <Button
                        variant="secondary"
                        onClick={() => setViewType(viewType === "grid" ? "list" : "grid")}
                    >
                        {viewType === "grid" ? "Switch to List View" : "Switch to Grid View"}
                    </Button>
                </div>


                {/* Container für die Buchungen */}
                <div className={`course-container ${viewType === "grid" ? "d-flex flex-wrap gap-3" : ""}`}>
                    {Array.isArray(filteredBookings) && filteredBookings.length > 0 ? (
                        filteredBookings.map((booking) => (
                            <Card
                                key={booking.bookingId} // Eindeutiger Schlüssel für jeden Eintrag
                                className="course-card mb-3"
                                style={{ width: viewType === "grid" ? "20rem" : "100%" }}
                            >
                                <Card.Body>
                                    <Card.Title>{booking.title}</Card.Title>
                                    <Card.Text>
                                        <strong>Category:</strong> {booking.category} <br />
                                        <strong>Instructor:</strong> {booking.instructor} <br />
                                        <strong>Date:</strong> {booking.date} <br />
                                        <strong>Time:</strong> {booking.time} <br />
                                        <strong>Description:</strong> {booking.description} <br />
                                        <strong>Seats:</strong> {booking.actualStudents}/{booking.maxStudents} <br />
                                        <strong>Average Tutor Rating:</strong> {booking.averageRating ?? "No ratings yet"} ★
                                        <br />
                                        <strong>Your Rating:</strong> {booking.userRating ?? "Not rated yet"} ★
                                    </Card.Text>
                                    <Badge bg={booking.status === 1 ? "success" : "primary"}>
                                        {booking.status === 1 ? "Completed" : "Open"}
                                    </Badge>
                                    <div className="mt-3">
                                        {booking.status === 1 ? (
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
                                        ) : (
                                            <Button variant="secondary" disabled>
                                                Rate
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
                                className={`rating-star ${star <= (hoverRating || rating) ? "filled" : "empty"}`}
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