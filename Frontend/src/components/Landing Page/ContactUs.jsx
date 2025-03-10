/* eslint-disable react/no-unescaped-entities */
const ContactUs = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8" style={{background:'rgb(34, 40, 49)'}}>
      <div className="bg-gray-50 rounded-lg shadow-xl p-8 sm:p-12 lg:p-16 w-full max-w-6xl" style={{background:'rgb(49, 54, 63)'}}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Details Section */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6"style={{color:'rgb(238,238,238)'}}>
              Contact FlexiWork
            </h2>
            <p className="text-lg text-gray-600 mb-8"style={{color:'rgb(238,238,238)'}}>
              Have a project in mind? Whether you’re looking to hire freelancers or collaborate, we're here to help you get started.
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-gray-700"style={{color:'rgb(238,238,238)'}}>
                  <strong className="text-gray-900"style={{color:'rgb(238,238,238)'}}>Email:</strong> <br />
                  <a href="mailto:contact@flexiwork.com" className="text-blue-600 hover:underline"style={{color:'rgb(118,171,174)'}}>
                    contact@flexiwork.com
                  </a>
                </p>
              </div>
              <div>
                <p className="text-gray-700"style={{color:'rgb(238,238,238)'}}>
                  <strong className="text-gray-900"style={{color:'rgb(238,238,238)'}}>Phone:</strong> <br />
                  <a href="tel:+1234567890" className="text-blue-600 hover:underline" style={{color:'rgb(118,171,174)'}}>
                    +123 456 7890
                  </a>
                </p>
              </div>
              <div>
                <p className="text-gray-700"style={{color:'rgb(238,238,238)'}}>
                  <strong className="text-gray-900"style={{color:'rgb(238,238,238)'}}>Address:</strong> <br />
                  123 Freelance Blvd, Remote City, Workland
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <input
                    style={{background:'rgb(238,238,238)',borderColor:'rgb(118,171,174)'}}
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                  />
                </div>
                <div>
                  <input
                    style={{background:'rgb(238,238,238)',borderColor:'rgb(118,171,174)'}}
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div>
                <textarea
                  style={{background:'rgb(238,238,238)',borderColor:'rgb(118,171,174)'}}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                  rows="6"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 ease-in-out"
                style={{color:'rgb(238,238,238)', background:'rgb(118,171,174)',borderColor:'rgb(118,171,174)'}}>
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
