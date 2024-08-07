// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Freelancer/Navbar';
import Footer from './components/Freelancer/Footer';
// import MultiStepForm from './components/MultiStepForm';
// import Login from './pages/Login';
import LandingPage from './pages/LandingPage'; // Make sure to import the LandingPage component if it exists
// import Dashboard from './pages/Dashboard'; // Example of another page component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<MultiStepForm />} />
        <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
