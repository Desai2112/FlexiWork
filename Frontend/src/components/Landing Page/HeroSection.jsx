// src/components/Freelancer/HeroSection.js

import { useEffect } from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  useEffect(() => {
    const textElements = document.querySelectorAll('.hero-text');
    textElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      setTimeout(() => {
        el.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 300); // Delay for each text element
    });
  }, []);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white text-gray-800">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col ml-8 justify-center space-y-6">
            <div className="space-y-4 hero-text">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl leading-tight">
                Transform Your Projects with Top Freelancers
              </h1>
              <p className="text-lg max-w-lg md:text-xl">
                Connect with skilled freelancers who can elevate your business and deliver outstanding results.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <a
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                href="#"
              >
                Find Freelancers
              </a>
              <a
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-gray-100 px-6 py-3 text-base font-semibold text-gray-800 shadow-md transition-transform transform hover:scale-105 hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                href="#"
              >
                Join as a Freelancer
              </a>
            </div>
          </div>
          <motion.img
            src="https://res.cloudinary.com/dgvslio7u/image/upload/v1723056044/ciarrdkzdv5acdtixix4.png"
            width="550"
            height="550"
            alt="Hero"
            className="mx-auto rounded-xl object-cover mr-8 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;