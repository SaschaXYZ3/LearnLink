import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
    const token = localStorage.getItem("token"); // Token prüfen
    const storedRole = localStorage.getItem("role");

    if (!token) {
        // Wenn kein Token, Benutzer zur Login-Seite weiterleiten
        return <Navigate to="/login" replace />;
    }

    if (role && storedRole !== role) {
        // Wenn Rolle nicht übereinstimmt, Zugriff verweigern
        return <Navigate to="/unauthorized" replace />;
    }

    return children; // Zugriff gewähren
};

export default PrivateRoute;
