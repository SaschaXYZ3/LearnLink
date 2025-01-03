import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Hero from "./components/Hero";
import Header from "./components/header";
import About from "./components/About";
import AuthForm from "./components/AuthForm";
import Testimonials from "./components/testimonials";
import ContactForm from "./components/ContactForm";
import Tools from "./components/Tools"; 
import Forum from "./components/Forum";
import StudentView from "./components/StudentView";
import EditProfile from "./components/EditProfile";
import BrowseCatalog from "./components/BrowseCatalog";

function App() {
  const contactFormRef = useRef(null);

  const scrollToContact = () => {
    contactFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Router>
      <Header />
      <Routes>
        {/* Root Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Testimonials />
              <section ref={contactFormRef}>
                <ContactForm />
              </section>
            </>
          }
        />
        {/* About Page */}
        <Route
          path="/about"
          element={<About scrollToContact={scrollToContact} />}
        />
        {/* Tools Page */}
        <Route path="/tools" element={<Tools />} />
        {/* Login and Register Pages */}
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<AuthForm />} />
        <Route path="/connect" element={<Forum />} />
        <Route path="studentview" element={<StudentView />} />
        <Route path="browsecatalog" element={<BrowseCatalog />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
}

export default App;