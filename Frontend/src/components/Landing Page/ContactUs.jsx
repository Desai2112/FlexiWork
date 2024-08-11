/* eslint-disable react/no-unescaped-entities */
// import React from 'react';

const ContactUs = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-16 bg-gray-100">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mt-4 sm:text-5xl">Get in Touch with Us</h2>
          <p className="mt-4 max-w-3xl mx-auto text-gray-600 md:text-xl">
            Whether you have a question about our services, need support, or want to provide feedback, we're here to help. Feel free to reach out to us using the form below or through our contact details.
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Content Side */}
          <div className="flex-1 mb-8 md:mb-0">
            <h3 className="text-2xl font-semibold text-gray-800">Our Contact Details</h3>
            <p className="mt-4 text-gray-700">We are located at 1234 Street Name, City, State, Country. Feel free to visit us or get in touch via the following methods:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
              <li><strong>Phone:</strong> +1 (123) 456-7890</li>
              <li><strong>Email:</strong> contact@yourcompany.com</li>
              <li><strong>Address:</strong> 1234 Street Name, City, State, Country</li>
            </ul>
            <p className="mt-4 text-gray-700">Our office hours are Monday to Friday, 9 AM to 5 PM. We look forward to hearing from you!</p>
          </div>
          {/* Form Side */}
          <form action="#" method="POST" className="flex-1 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-800">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500/50"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500/50"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-800">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500/50"
                placeholder="Your Message"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
