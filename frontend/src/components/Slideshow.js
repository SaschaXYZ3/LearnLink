import React, { useState, useEffect } from "react";
import "../Slideshow.css"; // Add custom styles for the slideshow

const Slideshow = ({ courses }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex]);

  // Navigate to the next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % courses.length);
  };

  // Navigate to the previous slide
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? courses.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slideshow">
      {/* Card Section */}
      <div className="card" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {courses.map((course, index) => (
          <div className="slide" key={index}>
            <img src={course.image} alt={course.title} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{course.title}</h5>
              <p className="card-text">{course.description}</p>
              <button onClick={course.link} className="btn btn-primary">
                Book Course
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button className="prev-btn" onClick={handlePrevious}>
        ❮
      </button>
      <button className="next-btn" onClick={handleNext}>
        ❯
      </button>
    </div>
  );
};

export default Slideshow;