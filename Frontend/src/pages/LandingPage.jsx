// import React from 'react';

import ContactUs from "../components/Landing Page/ContactUs";
import FreelancersSection from "../components/Landing Page/FreelancersSection";
import HeroSection from "../components/Landing Page/HeroSection";
import LNavbar from "../components/Landing Page/LNavbar";
import ServicesSection from "../components/Landing Page/ServicesSection";



const LandingPage = () => (
  <>
    <LNavbar />
    <main>
      <section id="hero">
        <HeroSection />
      </section>
      <section id="services">
        <ServicesSection />
      </section>
      <section id="freelancers">
        <FreelancersSection />
      </section>
      <section id="contact">
        <ContactUs />
      </section>
    </main>
  </>
);

export default LandingPage;
