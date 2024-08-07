// import React from 'react';

import Footer from "../components/Landing Page/Footer";
import FreelancersSection from "../components/Landing Page/FreelancersSection";
import HeroSection from "../components/Landing Page/HeroSection";
import LNavbar from "../components/Landing Page/LNavbar";
import ServicesSection from "../components/Landing Page/ServicesSection";



const LandingPage = () => (
  <>
    <LNavbar />
    <main>
      <HeroSection />
      <ServicesSection />
      <FreelancersSection />
    </main>
    <Footer />
  </>
);

export default LandingPage;
