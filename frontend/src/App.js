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
import AdminPanel from "./components/AdminPanel";
import TutorView from "./components/TutorView";
import Unauthorized from "./components/Unauthorized";
import PrivateRoute from "./components/PrivateRoute";
import Help from "./components/Help";
import AnalyticsPage from "./components/AnalyticsPage";
import ContactEntriesView from "./components/ContactEntriesView";
import ForumPostsView from "./components/ForumPostsView";
import ProfileChangesView from "./components/ProfileChangesView";
import UserLogs from "./components/UserLogs";
import Calendar from "./components/Calendar";

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
        <Route path="/browsecatalog" element={<BrowseCatalog />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/calendarA" element={<Calendar />} />
        <Route path="/help" element={<Help />} />

        {/* Geschützte Routen */}
        <Route
          path="/studentview"
          element={
            <PrivateRoute role="student">
              <StudentView />
            </PrivateRoute>
          }
        />
        <Route
          path="/tutorview"
          element={
            <PrivateRoute role="tutor">
              <TutorView />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/adminlogs"
          element={
            <PrivateRoute role="admin">
              <UserLogs />
            </PrivateRoute>
          }
        />
        {/* USER LOGS */}
        <Route
          path="/studentlogs"
          element={
            <PrivateRoute role="student">
              <UserLogs role="student" />
            </PrivateRoute>
          }
        />

        <Route
          path="/tutorlogs"
          element={
            <PrivateRoute role="tutor">
              <UserLogs role="tutor" />
            </PrivateRoute>
          }
        />
        {/* Analytics Parent Route */}
        <Route
          path="/analytics"
          element={
            <PrivateRoute role="admin">
              <AnalyticsPage />
            </PrivateRoute>
          }>
          {/* Nested Routes for Analytics Subpages */}
          <Route index element={<div>Welcome to Analytics Dashboard</div>} />
          <Route path="contact-entries" element={<ContactEntriesView />} />
          <Route path="forum-posts" element={<ForumPostsView />} />
          <Route path="profile-changes" element={<ProfileChangesView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
