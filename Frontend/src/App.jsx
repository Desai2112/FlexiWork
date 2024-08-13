// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import VerifyOtp from './pages/Auth/VerifyOtp';
import UserDetails from './pages/Auth/UserDetails';
import Homepage from './pages/Client/Homepage';
import FHomepage from './pages/Freelancer/FHomepage';
import GuidesPage from './pages/Common/GuidesPage';
import LandingPage from './pages/Common/LandingPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/client" element={<Homepage />} />
        <Route path="/freelancer" element={<FHomepage />} />
        <Route path="/guides" element={<GuidesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
