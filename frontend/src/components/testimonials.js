import React from "react";
import "../css/testimonials.css" // Optional: eigenes CSS für Testimonials
import ViktImage from "../images/ViktoriaLernreich.png"; // Importiere das Bild
import CamillaImage from "../images/CamillaStudiosa.png"; // Importiere das Bild
import ChristianImage from "../images/ChristianKlug.png"; // Importiere das Bild

const Testimonials = () => {
  const testimonialsData = [
    {
      name: "Camilla Studiosa",
      text: "LearnLink hat mir geholfen, mein Studium erfolgreich zu meistern. Die Tutoren sind großartig!",
      image: CamillaImage
    },
    {
      name: "Christian Klug",
      text: "Die Plattform bietet eine unglaubliche Vielfalt an Kursen und tollen Lernressourcen.",
      image: ChristianImage
    },
    {
      name: "Viktoria Lernreich",
      text: "Die Flexibilität und Unterstützung, die ich hier erhalten habe, ist unschlagbar.",
      image: ViktImage
    },
  ];

  return (
    <section className="testimonials">
      <h2 className="testimonials-title">What people say about us</h2>
      <div className="testimonials-container">
        {testimonialsData.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="testimonial-image"
            />
            <p className="testimonial-text">"{testimonial.text}"</p>
            <h4 className="testimonial-name">- {testimonial.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;