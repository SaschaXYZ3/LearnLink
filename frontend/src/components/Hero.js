import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="text-center mt-5">
      <h1 className="display-4">Welcome to LearnLink!</h1>
      <p className="lead">Your journey to learning starts here</p>
      <div className="mt-4">
        <Link to="#" className="btn btn-primary me-2">
          Login
        </Link>
        <Link to="#" className="btn btn-secondary">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Hero;
