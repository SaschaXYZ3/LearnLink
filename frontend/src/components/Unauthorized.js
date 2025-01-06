import React from "react";
import { Link } from "react-router-dom";

function Unauthorized() {
    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>Unauthorized</h1>
            <p style={{ fontSize: "18px" }}>You do not have permission to access this page.</p>
            <p style={{ fontSize: "18px" }}>
                If you want to visit this page, please{" "}
                <Link to="/login" style={{ color: "#006400", textDecoration: "none", fontWeight: "bold" }}>
                    log in
                </Link>.
            </p>
        </div>
    );
}

export default Unauthorized;

