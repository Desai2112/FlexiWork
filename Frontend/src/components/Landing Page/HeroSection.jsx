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
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gray-50 text-gray-800" style={{background:'rgb(49, 54, 63)'}}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
            <div className="hero-text space-y-5">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-gray-900 leading-tight" style={{color:'rgb(238,238,238)'}}>
                Elevate Your Projects with Top Freelancers
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-lg lg:max-w-xl" style={{color:'rgb(238,238,238)'}}>
                Partner with skilled freelancers to drive your business forward. Discover talents who deliver exceptional results on time, every time.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
              style={{background:'rgb(118,171,174)'}}
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                href="#"
              >
                Find Freelancers
              </a>
              <a
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-8 py-3 text-base font-semibold text-gray-800 shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                href="#"
              >
                Join as a Freelancer
              </a>
            </div>
          </div>
          <motion.img
            src="https://res.cloudinary.com/dgvslio7u/image/upload/v1723056044/ciarrdkzdv5acdtixix4.png"
            alt="Hero"
            className="mx-auto rounded-lg object-cover shadow-lg max-w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
