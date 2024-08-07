import React from 'react';

const Footer = () => (
  <footer className="w-full bg-muted py-8">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col gap-6 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <img
            src="https://res.cloudinary.com/dgvslio7u/image/upload/v1720845639/tofmmxz1oj8lvexsqaet.png"
            alt="Project Logo"
            className="h-10 w-auto mb-4"
          />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Freelance Hub. All rights reserved.
          </p>
        </div>
        <div className="text-center md:text-right">
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <p className="text-sm text-muted-foreground">1234 Freelance St, Suite 100</p>
          <p className="text-sm text-muted-foreground">City, State, ZIP</p>
          <p className="text-sm text-muted-foreground">Phone: (123) 456-7890</p>
          <p className="text-sm text-muted-foreground">Email: contact@freelancehub.com</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
