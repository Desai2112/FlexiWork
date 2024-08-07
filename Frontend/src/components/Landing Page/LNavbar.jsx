// import React from 'react';

const LNavbar = () => (
  <header className="px-4 lg:px-6 h-14 flex items-center">
    <a className="flex items-center justify-center" href="#">
      <img
        src="https://res.cloudinary.com/dgvslio7u/image/upload/v1720845639/tofmmxz1oj8lvexsqaet.png"
        alt="Project Logo"
        className="h-10 w-auto"
      />
      <span className="sr-only">Freelance Hub</span>
    </a>
    <nav className="ml-auto flex gap-4 sm:gap-6">
      <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
        Find Freelancers
      </a>
      <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
        Post a Job
      </a>
      <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
        Pricing
      </a>
      <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
        About
      </a>
    </nav>
  </header>
);

export default LNavbar;
