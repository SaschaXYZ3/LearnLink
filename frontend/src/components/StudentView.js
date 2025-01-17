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
        const mockBookings = [
            {
                id: 1,
                title: "Python Basics",
                category: "Coding",
                instructor: "John Doe",
                date: "2024-05-10",
                status: "Booked",
                userRating: null,
            },
            {
                id: 2,
                title: "Algebra Essentials",
                category: "Mathematics",
                instructor: "Alan Turing",
                date: "2024-05-15",
                status: "Completed",
                userRating: null,
            },
            {
                id: 3,
                title: "React for Beginners",
                category: "Web Development",
                instructor: "Jane Smith",
                date: "2024-06-01",
                status: "Completed",
                userRating: null,
            },
            {
                id: 4,
                title: "Cybersecurity Basics",
                category: "IT Security",
                instructor: "Eve Black",
                date: "2024-05-20",
                status: "Booked",
                userRating: null,
            },
            {
                id: 5,
                title: "Linear Algebra Deep Dive",
                category: "Mathematics",
                instructor: "Isaac Newton",
                date: "2024-07-05",
                status: "Completed",
                userRating: null,
            },
            {
                id: 6,
                title: "Introduction to Machine Learning",
                category: "Artificial Intelligence",
                instructor: "Andrew Ng",
                date: "2024-08-15",
                status: "Booked",
                userRating: null,
            },
            {
                id: 7,
                title: "Data Structures and Algorithms",
                category: "Computer Science",
                instructor: "Grace Hopper",
                date: "2024-09-01",
                status: "Completed",
                userRating: null,
            },
            {
                id: 8,
                title: "Cloud Computing Basics",
                category: "Networking",
                instructor: "Jeff Bezos",
                date: "2024-04-30",
                status: "Booked",
                userRating: null,
            },
            {
                id: 9,
                title: "Advanced JavaScript",
                category: "Web Development",
                instructor: "Brendan Eich",
                date: "2024-06-10",
                status: "Completed",
                userRating: null,
            },
            {
                id: 10,
                title: "Introduction to Blockchain",
                category: "Technology",
                instructor: "Satoshi Nakamoto",
                date: "2024-07-20",
                status: "Booked",
                userRating: null,
            },
            {
                id: 11,
                title: "Graphic Design Essentials",
                category: "Design",
                instructor: "Paul Rand",
                date: "2024-06-25",
                status: "Completed",
                userRating: null,
            },
            {
                id: 12,
                title: "Ethical Hacking",
                category: "IT Security",
                instructor: "Kevin Mitnick",
                date: "2024-08-05",
                status: "Booked",
                userRating: null,
            },
            {
                id: 13,
                title: "Basics of SQL",
                category: "Databases",
                instructor: "Donald Chamberlin",
                date: "2024-05-18",
                status: "Completed",
                userRating: null,
            },
            {
                id: 14,
                title: "Statistics for Data Science",
                category: "Mathematics",
                instructor: "Florence Nightingale",
                date: "2024-06-15",
                status: "Booked",
                userRating: null,
            },
            {
                id: 15,
                title: "Introduction to Photography",
                category: "Art",
                instructor: "Ansel Adams",
                date: "2024-07-01",
                status: "Completed",
                userRating: null,
            },
        ];
        setBookings(mockBookings);
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
    const handleSubmitRating = () => {
        if (rating < 1) {
            alert("Bitte mindestens 1 Stern vergeben.");
            return;
        }
        const updatedBookings = bookings.map((booking) =>
            booking.id === selectedCourse.id ? { ...booking, userRating: rating } : booking
        );
        console.log(`Bewertung für Kurs ${selectedCourse.title}: ${rating} Sterne`);
        setBookings(updatedBookings);
        setShowModal(false);
        setRating(0); // Reset the rating
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
                <div className={viewType === "grid" ? "d-flex flex-wrap gap-3" : ""}>
                    {filteredBookings.length > 0 ? (
                        filteredBookings.map((booking) => (
                            <Card key={booking.id} className="course-card mb-3" style={{ width: viewType === "grid" ? "20rem" : "100%" }}>
                                <Card.Body>
                                    <Card.Title>{booking.title}</Card.Title>
                                    <Card.Text>
                                        <strong>Category:</strong> {booking.category} <br />
                                        <strong>Instructor:</strong> {booking.instructor} <br />
                                        <strong>Date:</strong> {booking.date} <br />
                                        {booking.userRating !== null && (
                                            <strong>
                                                Your Rating: {booking.userRating} ★
                                            </strong>
                                        )}
                                    </Card.Text>
                                    <Badge
                                        bg={booking.status === "Completed" ? "success" : "primary"}
                                    >
                                        {booking.status}
                                    </Badge>
                                    <div className="mt-3">
                                        {booking.status === "Completed" ? (
                                            <Button
                                                variant="success"
                                                disabled={booking.status === "Completed" && booking.userRating !== null}
                                                onClick={() => {
                                                    setSelectedCourse(booking);
                                                    setShowModal(true);
                                                }}
                                            >
                                                {booking.userRating !== null ? "Rated" : "Rate"}
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