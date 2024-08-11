import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-600 to-purple-700">
      <div className={`relative w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-700 ${isSignUp ? 'right-panel-active' : ''}`}>
        <div className={`absolute top-0 left-0 w-full md:w-1/2 p-8 transition-transform duration-700 ease-in-out ${isSignUp ? 'transform translate-x-full opacity-0 z-0' : 'transform translate-x-0 opacity-100 z-10'}`}>
          <form className="bg-white">
            <h1 className="text-2xl font-bold mb-4">Sign In</h1>
            <div className="flex justify-center mb-4">
              <a href="#" className="mx-2 text-xl"><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="mx-2 text-xl"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="mx-2 text-xl"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="mx-2 text-xl"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span className="text-sm text-gray-600">or use your email for password</span>
            <input type="email" placeholder="Email" className="block w-full p-2 my-2 border rounded-md" />
            <input type="password" placeholder="Password" className="block w-full p-2 my-2 border rounded-md" />
            <a href="#" className="text-sm text-purple-600">Forget Your Password?</a>
            <button className="w-full py-2 mt-4 bg-purple-600 text-white rounded-md">Sign In</button>
          </form>
        </div>
        <div className={`absolute top-0 left-0 w-full md:w-1/2 p-8 transition-transform duration-700 ease-in-out ${isSignUp ? 'transform translate-x-0 opacity-100 z-10' : 'transform -translate-x-full opacity-0 z-0'}`}>
          <form className="bg-white">
            <h1 className="text-2xl font-bold mb-4">Create Account</h1>
            <div className="flex justify-center mb-4">
              <a href="#" className="mx-2 text-xl"><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="mx-2 text-xl"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="mx-2 text-xl"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="mx-2 text-xl"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span className="text-sm text-gray-600">or use your email for registration</span>
            <input type="text" placeholder="Name" className="block w-full p-2 my-2 border rounded-md" />
            <input type="email" placeholder="Email" className="block w-full p-2 my-2 border rounded-md" />
            <input type="password" placeholder="Password" className="block w-full p-2 my-2 border rounded-md" />
            <button className="w-full py-2 mt-4 bg-purple-600 text-white rounded-md">Sign Up</button>
          </form>
        </div>
        <div className="absolute w-full h-full top-0 left-1/2 bg-gradient-to-r from-purple-600 to-purple-700 text-white flex items-center justify-around transform transition-transform duration-700 ease-in-out">
          <div className={`w-2/4 p-8 text-center transform transition-transform duration-700 ease-in-out ${isSignUp ? 'transform translate-x-0' : 'transform -translate-x-full'}`}>
            <h1 className="text-2xl font-bold">Welcome Back!</h1>
            <p className="mt-2">Enter your personal details to use all of site features</p>
            <button className="mt-4 py-2 px-4 bg-white text-purple-600 rounded-md" onClick={toggleSignUp}>Sign In</button>
          </div>
          <div className={`w-2/4 p-8 text-center transform transition-transform duration-700 ease-in-out ${isSignUp ? 'transform translate-x-full' : 'transform translate-x-0'}`}>
            <h1 className="text-2xl font-bold">Hello, Friend!</h1>
            <p className="mt-2">Register with your personal details to use all of site features</p>
            <button className="mt-4 py-2 px-4 bg-white text-purple-600 rounded-md" onClick={toggleSignUp}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
