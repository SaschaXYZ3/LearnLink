import React from 'react';

function About() {
  return (
    <div className="container mt-5">
      <h1>About Us</h1>
      <p className="lead">
        Willkommen auf unserer About-Seite! Wir sind ein Team von Entwicklern, die leidenschaftlich daran arbeiten, großartige Anwendungen zu erstellen.
      </p>
      <p>
        Unser Ziel ist es, einfache, intuitive und leistungsstarke Softwarelösungen zu liefern, die den Alltag unserer Nutzer verbessern.
      </p>
      <h2>Unsere Werte</h2>
      <ul>
        <li>Innovation</li>
        <li>Teamarbeit</li>
        <li>Kundenzufriedenheit</li>
        <li>Nachhaltigkeit</li>
      </ul>
      <p>
        Danke, dass du dir die Zeit genommen hast, mehr über uns zu erfahren. Wenn du Fragen hast, <a href="#contact">kontaktiere uns gerne</a>!
      </p>
    </div>
  );
}

export default About;