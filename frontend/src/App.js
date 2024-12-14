import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Hero from "./components/Hero";
import Header from "./components/header";
import About from "./components/About";
import Course from "./components/course";
import AuthForm from "./components/AuthForm";

function App() {
  return (
    <Router>
      <Header /> {/* This can stay outside of routing if it’s common */}
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<Hero />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
export default App;
