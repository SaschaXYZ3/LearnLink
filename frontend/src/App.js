import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:3000/api/message')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">React + Express Example</h1>
      <p className="lead">{message}</p>
    </div>
  );
}

export default App;