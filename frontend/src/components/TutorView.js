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
} from "@fortawesome/free-solid-svg-icons";
import "../css/TutorView.css";

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
  });

  const [userId, setUserId] = useState(null); // Store user ID
  //const [loading, setLoading] = useState(true); // Loading state for user data
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/courses/mine", {
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
        setCourses(data); // Setzt die geladenen Kurse in den State
      } catch (error) {
        console.error("Error fetching your courses:", error);
      }
    };

    fetchCourses();
  }, [token]);

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
  /*
    const addCourse = () => {
        setCourses([...courses, newCourse]);
        setShowAddModal(false);
        resetForm();
    };
*/

  const addCourse = async () => {
    try {
      const courseData = {
        ...newCourse,
        userId, // Wird benötigt, um den Kurs dem Tutor zuzuordnen
      };

      const response = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
        return;
      }

      const data = await response.json();

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
    });
  };

  const acceptBooking = (index) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].status = "Accepted";
    setBookings(updatedBookings);
  };

  const rejectBooking = (index) => {
    const updatedBookings = [...bookings];
    updatedBookings.splice(index, 1);
    setBookings(updatedBookings);
  };

  const moveToPending = (index) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].status = "Pending";
    setBookings(updatedBookings);
  };

  const removeBooking = (index) => {
    const updatedBookings = bookings.filter((_, i) => i !== index);
    setBookings(updatedBookings);
  };

  const deleteCourse = async (courseId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/courses/${courseId}`,
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
              className="course-card"
            >
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>
                  <strong>Subject:</strong> {course.category} <br />
                  <strong>Course:</strong> {course.subcategory} <br />
                  <strong>Level:</strong> {course.level} <br />
                  <strong>Max Students:</strong> {course.maxStudents || "N/A"}
                  {/* Fallback, falls kein Wert vorhanden */}
                </Card.Text>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteCourse(course.id)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>

      {/* Pending Bookings Section */}
      <Container>
        <h2>Pending Bookings</h2>
        <ListGroup>
          {bookings.map((booking, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{booking.studentName}</strong> requested to join{" "}
                <em>{booking.course}</em>
              </div>
              <Badge bg={booking.status === "Pending" ? "warning" : "success"}>
                {booking.status}
              </Badge>
              {booking.status === "Pending" && (
                <>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => acceptBooking(index)}
                  >
                    <FontAwesomeIcon icon={faUserCheck} /> Accept
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => rejectBooking(index)}
                  >
                    <FontAwesomeIcon icon={faTimesCircle} /> Reject
                  </Button>
                </>
              )}
              {booking.status === "Accepted" && (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => moveToPending(index)}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} /> Move to Pending
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeBooking(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Remove
                  </Button>
                </>
              )}
            </ListGroup.Item>
          ))}
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
                required
              >
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
                required
              >
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
                required
              >
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
                value={newCourse.capacity}
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
                !newCourse.meetingLink
              }
            >
              Add Course
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TutorView;
