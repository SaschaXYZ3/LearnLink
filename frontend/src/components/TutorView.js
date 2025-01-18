import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Form,
  Modal,
  Card,
  ListGroup,
  Badge,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faTrash,
  faUserCheck,
  faTimesCircle,
  faArrowLeft,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import "../css/TutorView.css";
import jwt_decode from "jwt-decode";

const TutorView = () => {
  //const { userId } = useContext(UserContext); // Access userId from context
  const [showAddModal, setShowAddModal] = useState(false);
  const [courses, setCourses] = useState([]);
  const [bookings, setBookings] = useState([
    { studentName: "John Doe", course: "Python Basics", status: "Pending" },
    {
      studentName: "Jane Smith",
      course: "React Fundamentals",
      status: "Pending",
    },
  ]);
  const [newCourse, setNewCourse] = useState({
    title: "",
    category: "",
    subcategory: "",
    level: "",
    maxStudents: "",
    tutoringType: "",
    date: "",
    time: new Date(),
    meetingLink: "",
    description: "",
  });

  const [userId, setUserId] = useState(null); // Store user ID
  //const [loading, setLoading] = useState(true); // Loading state for user data
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
  const [pendingBookings, setPendingBookings] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Funktion zum Öffnen des Modals und Setzen des ausgewählten Kurses
  const handleShowModal = async (course) => {
    setShowModal(true); // Zeige das Modal an

    try {
      const response = await fetch(
        `http://localhost:5001/api/enrollments/${course.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch participants");
      }

      const participants = await response.json();

      // Aktualisiere die Teilnehmerdaten direkt im Kursarray
      setCourses((prevCourses) =>
        prevCourses.map((c) =>
          c.id === course.id ? { ...c, participants } : c
        )
      );

      setSelectedCourse({ ...course, participants }); // Setze den ausgewählten Kurs
    } catch (error) {
      console.error("Error fetching participants:", error.message);
    }
  };

  useEffect(() => {
    if (!token) {
      console.warn("Token is missing");
      return;
    }

    const fetchPendingBookings = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/tutors/pending-bookings",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch pending bookings");
        }

        const data = await response.json();
        console.log("Fetched pending bookings:", data);
        setPendingBookings(data);
      } catch (error) {
        console.error("Error fetching pending bookings:", error.message);
      }
    };

    fetchPendingBookings();
  }, [token]);

  // Fetch courses or other related data (if needed)
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/courses/mine", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch your courses");
        }

        const data = await response.json();
        setCourses(data); // Store fetched courses in state
      } catch (error) {
        console.error("Error fetching your courses:", error);
      }
    };

    fetchCourses();
  }, [token]);

  useEffect(() => {
    const fetchParticipantsForSelectedCourse = async () => {
      if (!selectedCourse?.id) return; // Verhindern, dass wir den API-Call ohne gültige CourseId ausführen

      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `http://localhost:5001/api/enrollments/${selectedCourse.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch participants");
        }

        const participants = await response.json();
        console.log("Fetched participants:", participants);

        setSelectedCourse((prev) => ({
          ...prev,
          participants, // Setze die Teilnehmer nur einmal, wenn die Teilnehmer abgerufen werden
        }));
      } catch (error) {
        console.error("Error fetching participants:", error.message);
      }
    };
    fetchParticipantsForSelectedCourse();
  }, [selectedCourse?.id]); // Läuft nur, wenn `selectedCourse.id` sich ändert

  //GET maxStudents and actualStudents from Backend for occupied seats
  const [courseAvailability, setCourseAvailability] = useState(null);

  useEffect(() => {
    if (!selectedCourse?.id) return; // Verhindern, dass die Funktion ausgeführt wird, wenn kein Kurs ausgewählt ist

    const fetchCourseAvailability = async () => {
      const courseId = selectedCourse.id; // Hole die courseId vom ausgewählten Kurs
      try {
        const response = await fetch(
          `http://localhost:5001/api/courses/${courseId}/students`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch course availability");
        }

        const data = await response.json(); // Erwartet: maxStudents und actualStudents
        console.log(`Fetched availability for course ${courseId}:`, data);

        setCourseAvailability(data);
      } catch (error) {
        console.error(
          `Error fetching availability for course ${courseId}:`,
          error.message
        );
      }
    };

    fetchCourseAvailability();
  }, [selectedCourse?.id, token]);

  const handleCourseSelection = (course) => {
    setSelectedCourse(course); // Setzt den ausgewählten Kurs
  };

  /* if (selectedCourse?.id) {
      fetchParticipants();
    }
  }, [selectedCourse?.id]); // Setze hier nur selectedCourse.id als Abhängigkeit, damit die Teilnehmer nur einmal geladen werden
  // Achte darauf, dass selectedCourse nicht direkt in die Dependency-Liste gehört, sondern den richtigen Wert enthält
*/
  const categories = {
    Coding: ["Python", "JavaScript", "React", "C++", "Java"],
    "Network Technologies": ["CCNA", "Cloud Networking", "Wireless Security"],
    "IT Security": [
      "Penetration Testing",
      "Network Security",
      "Ethical Hacking",
    ],
    Mathematics: ["Algebra", "Calculus", "Linear Algebra"],
  };

  const handleInputChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleTimeChange = (time) => {
    setNewCourse({ ...newCourse, time });
  };

  const addCourse = async () => {
    try {
      const courseData = {
        ...newCourse,
        userId, // Wird benötigt, um den Kurs dem Tutor zuzuordnen
      };
      console.log("Userid:", userId);
      console.log("User-Token:", token);
      //const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend Error:", errorData);
        alert(`Error: ${errorData.error}`);
        return;
      }

      const data = await response.json();
      console.log("Course added successfully:", data);

      // Neu erstellten Kurs direkt dem State hinzufügen
      setCourses((prevCourses) => [
        ...prevCourses,
        { ...newCourse, id: data.courseId },
      ]);

      setShowAddModal(false);
      resetForm();
      alert("Course added successfully!");
    } catch (error) {
      console.error("Failed to add course:", error);
      alert("Failed to add the course. Please try again later.");
    }
  };

  const resetForm = () => {
    setNewCourse({
      title: "",
      category: "",
      subcategory: "",
      level: "",
      maxStudents: "",
      tutoringType: "",
      date: "",
      time: new Date(),
      meetingLink: "",
      description: "",
    });
  };

  const acceptBooking = async (enrollmentId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5001/api/enrollments/${enrollmentId}/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to accept booking");
      }

      const updatedBooking = await response.json();
      console.log("Booking accepted:", updatedBooking);

      setPendingBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.enrollmentId !== enrollmentId)
      );
    } catch (error) {
      console.error("Error accepting booking:", error.message);
    }
  };

  const rejectBooking = async (enrollmentId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5001/api/enrollments/${enrollmentId}/reject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to reject booking");
      }
      const updatedBookings = await response.json();
      console.log("Booking rejected: ", updatedBookings);

      setPendingBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.enrollmentId !== enrollmentId)
      );
    } catch (error) {
      console.error("Error accepting booking:", error.message);
    }
  };

  const removeBooking = (index) => {
    const updatedBookings = bookings.filter((_, i) => i !== index);
    setBookings(updatedBookings);
  };

  const deleteCourse = async (courseId) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/courses/${courseId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
        return;
      }

      // Update the state to remove the course from the UI
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseId)
      );

      alert("Course deleted successfully!");
    } catch (error) {
      console.error("Failed to delete course:", error);
      alert("Failed to delete the course. Please try again later.");
    }
  };

  // Funktion zum Zurücksetzen des Modals
  const resetModal = () => {
    setSelectedCourse(null); // Setze den Kurs zurück
  };

  const handleShowCourseDetails = async (course) => {
    setSelectedCourse({ ...course, participants: [] }); // Initialisiere mit leeren Teilnehmern
    setShowModal(true); // Zeige das Modal an

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5001/api/enrollments/${course.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch participants");
      }

      const participants = await response.json();
      setSelectedCourse((prev) => ({
        ...prev,
        participants,
      }));
    } catch (error) {
      console.error("Error fetching participants:", error.message);
    }
  };

  return (
    <div className="tutor-page">
      {/* Dashboard Header */}
      <Container className="tutor-header">
        <h1>Welcome, Tutor!</h1>
        <p>Manage your courses and bookings seamlessly.</p>
        <Button variant="success" onClick={() => setShowAddModal(true)}>
          <FontAwesomeIcon icon={faPlusCircle} /> Add New Course
        </Button>
      </Container>

      {/* Active Courses Section */}
      <Container>
        <h2>Your Courses</h2>
        <div className="d-flex flex-wrap justify-content-start gap-4">
          {courses.map((course, index) => (
            <Card
              key={index}
              style={{ width: "20rem" }}
              className="course-card">
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>
                  <strong>Subject:</strong> {course.category} <br />
                  <strong>Course:</strong> {course.subcategory} <br />
                  <strong>Level:</strong> {course.level} <br />
                  <strong>Max Students:</strong> {course.maxStudents || "N/A"}
                  <br />
                  <strong>Occupied seats: </strong>
                  {courses.id === selectedCourse?.id && courseAvailability
                    ? courseAvailability.actualStudents || 0
                    : 0}
                  {/* Fallback, falls kein Wert vorhanden */}
                </Card.Text>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteCourse(course.id)}>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleShowModal(course)}>
                  <FontAwesomeIcon icon={faAddressCard} /> Show Details
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>

      {/* Modal für Kursdetails */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCourse?.title} Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Subject:</strong> {selectedCourse?.category}
          </p>
          <p>
            <strong>Course:</strong> {selectedCourse?.subcategory}
          </p>
          <p>
            <strong>Level:</strong> {selectedCourse?.level}
          </p>
          <p>
            <strong>Max Students:</strong>{" "}
            {selectedCourse?.maxStudents || "N/A"}
          </p>
          <p>
            <strong>Current Participants:</strong>{" "}
            {courses.id === selectedCourse?.id && courseAvailability
              ? courseAvailability.actualStudents || 0
              : 0}
          </p>
          <hr />
          <h5>Participants</h5>
          <ListGroup>
            {selectedCourse?.participants?.length > 0 ? (
              selectedCourse.participants.map((participant, index) => (
                <ListGroup.Item key={index}>
                  {participant.studentName} ({participant.studentEmail})
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>No participants yet.</ListGroup.Item>
            )}
          </ListGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Pending Bookings Section */}
      <Container>
        <h2>Pending Bookings</h2>
        <ListGroup>
          {pendingBookings.length === 0 ? (
            <p>No pending bookings found.</p>
          ) : (
            pendingBookings.map((booking) => (
              <ListGroup.Item
                key={booking.enrollmentId}
                className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{booking.studentName}</strong> requested to join{" "}
                  <em>{booking.courseName}</em>
                </div>
                <Badge
                  bg={
                    booking.bookingStatus === "requested"
                      ? "warning"
                      : "success"
                  }>
                  {booking.bookingStatus}
                </Badge>
                {booking.bookingStatus === "requested" && (
                  <>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => acceptBooking(booking.enrollmentId)}>
                      <FontAwesomeIcon icon={faUserCheck} /> Accept
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => rejectBooking(booking.enrollmentId)}>
                      <FontAwesomeIcon icon={faTimesCircle} /> Reject
                    </Button>
                  </>
                )}
                {booking.bookingStatus === "Accepted" && (
                  <>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeBooking(booking.enrollmentId)}>
                      <FontAwesomeIcon icon={faTrash} /> Remove
                    </Button>
                  </>
                )}
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Container>

      {/* Add Course Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Course Title */}
            <Form.Group className="mb-3">
              <Form.Label>Course Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newCourse.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Category Selection */}
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={newCourse.category}
                onChange={handleInputChange}
                required>
                <option value="">Select Category</option>
                {Object.keys(categories).map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Subcategory Selection */}
            <Form.Group className="mb-3">
              <Form.Label>Subcategory</Form.Label>
              <Form.Control
                as="select"
                name="subcategory"
                value={newCourse.subcategory}
                onChange={handleInputChange}
                disabled={!newCourse.category}
                required>
                <option value="">Select Subcategory</option>
                {newCourse.category &&
                  categories[newCourse.category]?.map((subcat, idx) => (
                    <option key={idx} value={subcat}>
                      {subcat}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>

            {/* Experience Level Selection */}
            <Form.Group className="mb-3">
              <Form.Label>Experience Level</Form.Label>
              <Form.Control
                as="select"
                name="level"
                value={newCourse.level}
                onChange={handleInputChange}
                required>
                <option value="">Select Level</option>
                <option value="Amateur">Amateur</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </Form.Control>
            </Form.Group>

            {/* Date Picker */}
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={newCourse.date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Time Picker (Improved with DatePicker) */}
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <DatePicker
                selected={newCourse.time}
                onChange={handleTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="h:mm aa"
                className="form-control"
              />
            </Form.Group>

            {/* Capacity */}
            <Form.Group className="mb-3">
              <Form.Label>Max Participants</Form.Label>
              <Form.Control
                type="number"
                name="maxStudents"
                min="1"
                max="100"
                value={newCourse.maxStudents}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Meeting Link */}
            <Form.Group className="mb-3">
              <Form.Label>Meeting Link</Form.Label>
              <Form.Control
                type="url"
                name="meetingLink"
                value={newCourse.meetingLink}
                onChange={handleInputChange}
                placeholder="https://example.com/meeting-link"
                required
              />
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                min="1"
                max="5000"
                value={newCourse.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* Submit Button */}
            <Button
              variant="success"
              onClick={addCourse}
              disabled={
                !newCourse.title ||
                !newCourse.category ||
                !newCourse.subcategory ||
                !newCourse.level ||
                !newCourse.date ||
                !newCourse.time ||
                !newCourse.maxStudents ||
                !newCourse.meetingLink ||
                !newCourse.description
              }>
              Add Course
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TutorView;
