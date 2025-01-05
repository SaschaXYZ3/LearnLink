import React, { useState, useEffect } from "react";
import { Navbar, Container, Button, Card, ProgressBar, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/StudentView.css";

function StudentView() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [completedCourses, setCompletedCourses] = useState(3); // Fortschrittsanzeige
    const [totalCourses, setTotalCourses] = useState(10); // Anzahl aller Kurse
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Beispielbuchungen (kann durch Datenbank ersetzt werden)
    useEffect(() => {
        const mockBookings = [
            { title: "Python Basics", category: "Coding", instructor: "John Doe", date: "2024-05-10", status: "Booked" },
            { title: "Algebra Essentials", category: "Mathematics", instructor: "Alan Turing", date: "2024-05-15", status: "Completed" }
        ];
        setBookings(mockBookings);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("username");
        navigate("/login");
    };

    return (
        <div className="studentview-page">

            {/* Navbar Section */}
            <Navbar expand="lg" className="navbar-custom">
                <Container>
                    <Navbar.Brand href="/">LearnLink - Student Dashboard</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Button className="btn-primary" onClick={handleLogout}>Logout</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

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

            {/* Aktive Buchungen */}
            <Container className="bookings-section mt-5">
                <h2>Your Current Bookings</h2>
                {bookings.length > 0 ? (
                    bookings.map((booking, index) => (
                        <Card key={index} className="course-card">
                            <Card.Body>
                                <Card.Title>{booking.title}</Card.Title>
                                <Card.Text>
                                    <strong>Category:</strong> {booking.category} <br />
                                    <strong>Instructor:</strong> {booking.instructor} <br />
                                    <strong>Date:</strong> {booking.date}
                                </Card.Text>
                                <Badge bg={booking.status === "Completed" ? "success" : "primary"}>
                                    {booking.status}
                                </Badge>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p>No bookings available.</p>
                )}
            </Container>
        </div>
    );
}

export default StudentView;