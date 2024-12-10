import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Hero from "./components/Hero";
import Header from "./components/header";
import About from "./components/About";
import Course from "./components/course";

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <div className="course-container">
        <Course
          title="Math"
          image="./pictures/math.png"
          description="Dive into a comprehensive and engaging mathematics program designed to build strong problem-solving skills and mathematical understanding."
          link=""
        />
        <Course
          title="C"
          image="./pictures/c.png"
          description="Master the fundamentals of C programming with hands-on exercises and projects, perfect for beginners and aspiring developers."
          link=""
        />
        <Course
          title="Java"
          image="./pictures/java.png"
          description="Learn Java programming from the ground up, focusing on object-oriented principles and practical applications for real-world projects."
          link=""
        />
        <Course
          title="Webtech"
          image="./pictures/webtech.png"
          description="Explore the latest web technologies and frameworks to create dynamic, responsive, and modern web applications."
          link=""
        />
      </div>
    </div>
  );
}

export default App;
