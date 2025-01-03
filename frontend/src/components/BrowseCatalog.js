import React, { useState } from "react";
import { Navbar, Container, Button, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCode,
    faNetworkWired,
    faUserSecret,
    faSquareRootVariable,
    faChevronDown,
    faChevronUp
} from "@fortawesome/free-solid-svg-icons";
import "../css/BrowseCatalog.css";

function BrowseCatalog() {
    const [expandedCategory, setExpandedCategory] = useState(null);

    const categories = [
        {
            title: "Coding",
            subcategories: ["Python", "JavaScript", "React", "C++", "Java"],
            icon: faCode
        },
        {
            title: "Network Technologies",
            subcategories: ["Cloud Networking", "CCNA Basics", "Wireless Fundamentals"],
            icon: faNetworkWired
        },
        {
            title: "IT Security",
            subcategories: ["Network Security", "Penetration Testing", "Ethical Hacking"],
            icon: faUserSecret
        },
        {
            title: "Mathematics",
            subcategories: ["Algebra", "Calculus", "Statistics", "Linear Algebra"],
            icon: faSquareRootVariable
        }
    ];

    const toggleCategory = (index) => {
        setExpandedCategory(expandedCategory === index ? null : index);
    };

    return (
        <div className="catalog-page">
            {/* Navbar */}
            <Navbar expand="lg" className="navbar-custom">
                <Container>
                    <Navbar.Brand href="/">LearnLink</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Button className="btn-primary" href="/">Back to Home</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Hero Section */}
            <div className="catalog-hero">
                <h1>Browse All Courses</h1>
                <p>Explore expertly curated courses tailored to expand your skills.</p>
            </div>

            {/* Course Categories Section */}
            <Container className="catalog-grid">
                {categories.map((category, index) => (
                    <div key={index} className="category-card">
                        <div className="category-header" onClick={() => toggleCategory(index)}>
                            <FontAwesomeIcon icon={category.icon} className="category-icon" />
                            <h3>{category.title}</h3>
                            <FontAwesomeIcon
                                icon={expandedCategory === index ? faChevronUp : faChevronDown}
                                className="expand-icon"
                            />
                        </div>

                        {/* Subcategory Section */}
                        <div className={`subcategory-list ${expandedCategory === index ? "show" : ""}`}>
                            {category.subcategories.map((subcategory, subIndex) => (
                                <Badge key={subIndex} pill className="subcategory-badge">
                                    {subcategory}
                                </Badge>
                            ))}
                        </div>
                    </div>
                ))}
            </Container>

            {/* Footer */}
            <footer className="catalog-footer text-center">
                <p>© 2024 LearnLink. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

export default BrowseCatalog;