import React, {  } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Hero from './components/Hero';
import Header from './components/header';
import About from './components/About';


function App() {
  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}


export default App;