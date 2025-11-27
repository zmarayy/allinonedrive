import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import AboutUs from './AboutUs';
import Packages from './Packages';
import Contact from './Contact';
import FAQ from './FAQ';
import Terms from './Terms';
import TeachWithUs from './TeachWithUs';
import WeekSelection from './WeekSelection';
import AppPage from './AppPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/weeks" element={<WeekSelection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/teach" element={<TeachWithUs />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
    </Router>
  );
}

export default App;
