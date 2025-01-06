# LearnLink

# How to start a Webserver:

start webserver static

```bash
npm start
```

start webserver witrh auto update if some changes are made

```bash
npm start nodemon
```

## In case it does not work:

Do this in frontend directory

```bash
npm install --save-dev nodemon #this installs it locally in the repo
#initialize npm packet manager
npm init -y
#install react
npm install react-scripts --save
```

Maybe some vulnerabilities appear and the Webserver doesnt start, try this 1-2 times

```
#Update - vulnerabilities
npm audit fix --force
#redo if more than 2 vulnerabilities appear
```

## install additional packages

bcrypt to hash passwords for storing in database\
sqlite3 as database\
body-parser to compile to SQL-querries

```
npm init -y
npm install express sqlite3 body-parser cors bcrypt
```

## install Jason Web Token for assigning jwt

```
npm install jsonwebtoken
```

## install react-router-dom for routing

```
npm install react-router-dom
```


## install fortawesome for twitter, insta, etc. icons

```
npm install @fortawesome/fontawesome-free
```

## dependencies
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
npm install react-icons bootstrap
npm install react-bootstrap bootstrap

npm install react-calendar react-datepicker


---------


für später:


import React, { useEffect, useState } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import axios from "axios";
import "../css/CourseCatalog.css";

function CourseCatalog() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/courses")
            .then((response) => {
                setCourses(response.data);
            })
            .catch((error) => {
                console.error("Error fetching courses:", error);
            });
    }, []);

    return (
        <div className="catalog-page">
            {/* Navbar Section */}
            <Navbar expand="lg" className="navbar-custom">
                <Container>
                    <Navbar.Brand href="/">LearnLink</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Button className="btn-primary">Login</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Hero Section */}
            <div className="catalog-hero">
                <h1>Explore Your Next Learning Adventure</h1>
                <p>Find expertly curated courses to elevate your skills.</p>
                <Button className="hero-btn">Browse Courses</Button>
            </div>

            {/* Course Cards Section */}
            <Container className="catalog-grid">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className={`course-card ${course.available ? "" : "not-available"}`}
                    >
                        <div className="card-content">
                            <h3>{course.title}</h3>
                            <p><strong>Category:</strong> {course.category}</p>
                            <p><strong>Instructor:</strong> {course.instructor}</p>
                            {course.available ? (
                                <Button className="btn-course">Book Now</Button>
                            ) : (
                                <Button className="btn-course-disabled" disabled>
                                    Fully Booked
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </Container>

            {/* Footer Section */}
            <footer className="catalog-footer text-center">
                <p>© 2024 LearnLink. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

export default CourseCatalog;

-----


const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API-Endpunkt zum Abrufen der Kurse
app.get("/courses", (req, res) => {
    db.all("SELECT * FROM courses", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});

-----

const sqlite3 = require("sqlite3").verbose();

// Verbindung zur SQLite-Datenbank
const db = new sqlite3.Database("./database/courses.db", (err) => {
    if (err) {
        console.error("Error opening database", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

// Kurs-Tabelle erstellen
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            category TEXT,
            instructor TEXT,
            available INTEGER DEFAULT 1
        )
    `);

    // Beispielkurse einfügen (falls Tabelle leer ist)
    db.run(`
        INSERT INTO courses (title, category, instructor, available)
        VALUES
            ('Python Basics', 'Coding', 'John Doe', 1),
            ('Network Security', 'IT Security', 'Jane Smith', 1),
            ('Algebra Essentials', 'Mathematics', 'Alan Turing', 0),
            ('Cloud Networking', 'Network Technologies', 'Ada Lovelace', 1),
            ('Public Speaking', 'Social Skills', 'Elon Musk', 0)
    `);
});

module.exports = db;