// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import VerifyOtp from './pages/Auth/VerifyOtp';
import UserDetails from './pages/Auth/UserDetails';
// import Homepage from './pages/Client/Homepage';
import FreelancerHome from './pages/Freelancer/FreelancerHomepage';
import GuidesPage from './pages/Common/GuidesPage';
import LandingPage from './pages/Common/LandingPage';
import HomePage from './pages/Client/Homepage';
// import ProfilePage from './pages/Client/ProfilePage';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import MyProjects from './pages/Client/MyProjects';
import BidsPage from './pages/Client/BidsPage';
import ViewProjectPage from './pages/Client/ViewProject';
import ShowAllProjectBids from './pages/Client/ShowAllProjectBids';
import ClientSignupPage from './pages/Auth/ClientSignup';
import FreelancerSignupPage from './pages/Auth/FreelancerSignup';
import FreelancerProfilePage from './pages/Client/FreelancerProfilePage';
import CompanyProfilePage from './pages/Client/CompanyProfilePage';
import ProjectCard from './components/Freelancer/ProjectCard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/client/signup" element={<ClientSignupPage />} />
        <Route path="/freelancer/signup" element={<FreelancerSignupPage />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/client" element={<HomePage />} />
        <Route path="/client/project" element={<MyProjects />} />
        <Route path="/client/project/:id" element={<ViewProjectPage />} />
        <Route path="/client/project/:id/bids" element={<ShowAllProjectBids />} />
        <Route path="/client/bids" element={<BidsPage />} />
        <Route path="/client/freelancer/profile" element={<FreelancerProfilePage />} />
        <Route path="/client/profile" element={<CompanyProfilePage />} />
        <Route path="/freelancer" element={<FreelancerHome />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/projectcard" element={<ProjectCard />} />
      </Routes>
    </Router>
  );
}

export default App;
