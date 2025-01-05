import React, { useState } from "react";
import { Container, Button, Card, Badge, Form, ProgressBar, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faFilter, faSort, faList, faThLarge } from "@fortawesome/free-solid-svg-icons";
import "../css/BrowseCatalog.css"; // Aktualisierte CSS-Datei für konsistente Stile

function BrowseCatalog() {
    // Dummy-Kurse mit erweiterten Daten aus dem Bereich Computer Science
    const initialCourses = [
        { title: "Python Basics", category: "Coding", instructor: "John Doe", rating: 4.5, reviews: 120, capacity: 20, enrolled: 15, completed: 10, favorited: false },
        { title: "Network Security", category: "IT Security", instructor: "Jane Smith", rating: 5, reviews: 80, capacity: 15, enrolled: 15, completed: 15, favorited: false },
        { title: "Algebra Essentials", category: "Mathematics", instructor: "Alan Turing", rating: 3.8, reviews: 50, capacity: 30, enrolled: 10, completed: 5, favorited: false },
        { title: "Data Structures", category: "Computer Science", instructor: "Grace Hopper", rating: 4.9, reviews: 90, capacity: 25, enrolled: 20, completed: 15, favorited: false },
        { title: "Machine Learning Basics", category: "Computer Science", instructor: "Andrew Ng", rating: 4.8, reviews: 150, capacity: 25, enrolled: 25, completed: 20, favorited: false },
        { title: "Introduction to AI", category: "Computer Science", instructor: "Elon Musk", rating: 4.5, reviews: 200, capacity: 20, enrolled: 18, completed: 10, favorited: false },
        { title: "Cyber Security Fundamentals", category: "IT Security", instructor: "Kevin Mitnick", rating: 4.7, reviews: 110, capacity: 20, enrolled: 19, completed: 10, favorited: false },
        { title: "Discrete Mathematics", category: "Mathematics", instructor: "Katherine Johnson", rating: 4.2, reviews: 70, capacity: 30, enrolled: 20, completed: 15, favorited: false },
        { title: "Web Development with React", category: "Coding", instructor: "Dan Abramov", rating: 4.9, reviews: 100, capacity: 25, enrolled: 20, completed: 18, favorited: false },
        { title: "SQL and Databases", category: "Computer Science", instructor: "Donald Chamberlin", rating: 4.6, reviews: 120, capacity: 20, enrolled: 19, completed: 15, favorited: false }
    ];

    // State für Kursdaten, Suche, Ansicht, Filter und Sortierung
    const [courses, setCourses] = useState(initialCourses);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewType, setViewType] = useState("grid");
    const [filterCategory, setFilterCategory] = useState("");
    const [sortOption, setSortOption] = useState("");

    // Filterfunktion basierend auf Suchbegriff und Kategorie
    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCategory ? course.category === filterCategory : true)
    );

    // Sortierfunktion basierend auf Benutzeroption
    const sortedCourses = [...filteredCourses].sort((a, b) => {
        if (sortOption === "rating") {
            return b.rating - a.rating;
        } else if (sortOption === "title") {
            return a.title.localeCompare(b.title);
        }
        return 0;
    });

    // Favoritenfunktion korrekt angepasst, damit sie auf die sortierten Daten angewendet wird
    const toggleFavorite = (courseTitle) => {
        const updatedCourses = courses.map((course) =>
            course.title === courseTitle ? { ...course, favorited: !course.favorited } : course
        );
        setCourses(updatedCourses);
    };

    return (
        <Container className="browse-catalog-page mt-5">
            {/* Suchleiste, Filter und Sortierung */}
            <Form className="d-flex justify-content-between align-items-center mb-4">
                <Form.Control
                    type="text"
                    placeholder="Suche nach Kursen..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-50"
                />
                <Button variant="secondary" onClick={() => setViewType(viewType === "grid" ? "list" : "grid")}>
                    <FontAwesomeIcon icon={viewType === "grid" ? faList : faThLarge} />
                </Button>
                <Form.Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                    <option value="">Alle Kategorien</option>
                    <option value="Coding">Coding</option>
                    <option value="IT Security">IT Security</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Computer Science">Computer Science</option>
                </Form.Select>
                <Form.Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="">Sortieren nach</option>
                    <option value="rating">Bewertung</option>
                    <option value="title">Titel</option>
                </Form.Select>
            </Form>

            {/* Kurskarten Sektion */}
            <div className={viewType === "grid" ? "d-flex flex-wrap gap-4 justify-content-center" : ""}>
                {sortedCourses.map((course, index) => (
                    <Card key={index} style={{ width: "20rem" }} className="course-card">
                        <Card.Body>
                            <Card.Title>{course.title}</Card.Title>
                            <Card.Text>
                                <strong>Kategorie:</strong> {course.category} <br />
                                <strong>Dozent:</strong> {course.instructor} <br />
                                <strong>Bewertung:</strong> {course.rating} <FontAwesomeIcon icon={faStar} style={{ color: "#FFD700" }} /> ({course.reviews} Bewertungen)
                            </Card.Text>

                            {/* Fortschrittsbalken  - je nachdem wieviele Leute in den Kurs passen entsteht hier ein Progress */}
                            <ProgressBar
                                now={(course.completed / course.capacity) * 100}
                                label={`${course.completed}/${course.capacity}`}
                                variant={course.completed === course.capacity ? "success" : "info"}
                                className="mb-3"
                            />

                            {/* Favoriten- und Buchungsbutton */}
                            <div className="button-group">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Zu Favoriten hinzufügen</Tooltip>}>
                                    <Button
                                        variant={course.favorited ? "danger" : "outline-danger"}
                                        onClick={() => toggleFavorite(course.title)}
                                    >
                                        <FontAwesomeIcon icon={faHeart} />
                                    </Button>
                                </OverlayTrigger>
                                <Button className="btn-primary">Jetzt buchen</Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
}

export default BrowseCatalog;