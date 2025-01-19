import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";

const AnalyticsPage = () => {
  return ( 
    <div className="d-flex" style={{ height: "100vh" }}>
      {/* Sidebar */}
      <Nav
        className="flex-column bg-light p-3"
        style={{ width: "250px", minHeight: "100vh" }}
      >
        <h5 className="text-center mb-4">Analytics</h5>

        <Nav.Item>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active bg-primary text-white" : ""}`
            }
          >
            Admin Panel
          </NavLink>
        </Nav.Item>
        
        <Nav.Item>
          <NavLink
            to="/analytics/profile-changes"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active bg-primary text-white" : ""}`
            }
          >
            Profile Changes
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink
            to="/analytics/contact-entries"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active bg-primary text-white" : ""}`
            }
          >
            Contact Entries
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink
            to="/analytics/forum-posts"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active bg-primary text-white" : ""}`
            }
          >
            Forum Posts
          </NavLink>
        </Nav.Item>
       
      </Nav>

      {/* Main Content */}
      <div className="flex-grow-1">
        <Navbar bg="primary" variant="dark" className="mb-4">
          <Navbar.Brand>LearnLink Analytics</Navbar.Brand>
        </Navbar>
        <Container>
          <Outlet />
        </Container>
      </div>
    </div>
  );
};

export default AnalyticsPage;