import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('YOUR_BACKEND_LOGIN_URL', {
        email,
        password
      });
      
      const { role } = response.data;

      // Redirect based on the role
      if (role === 'admin') {
        navigate('/admin-dashboard'); // Change to the admin dashboard route
      } else if (role === 'user') {
        navigate('/user-dashboard'); // Change to the user dashboard route
      } else {
        navigate('/'); // Default or error handling route
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Image Section */}
      <div className="hidden md:block w-full md:w-1/2 bg-gray-200 flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/dgvslio7u/image/upload/v1723302697/gzx6czd1vjihamz8yykt.png"
          alt="Login Illustration"
          className="object-cover w-full h-full md:max-w-full"
        />
      </div>
      
      {/* Login Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4 md:p-8">
        <div className="w-full max-w-sm md:max-w-md p-6">
          <img
            src="https://res.cloudinary.com/dgvslio7u/image/upload/v1722411107/tyqao18fdxtj7pefzc3n.png"
            alt="Sign Up Logo"
            className="mx-auto h-16 mb-4"
          />
          <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 text-center">Welcome to FlexiWork!</h1>
          <p className="text-gray-600 text-center mb-6">Log in now and turn your passion into success.</p>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-1 focus:ring-blue-500 transition-shadow"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-1 focus:ring-blue-500 transition-shadow"
                placeholder="Your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Sign In
            </button>
            <div className="mt-4 text-center">
              <a href="#forgot-password" className="text-[#1e4487] hover:underline">Forgot Password?</a>
              <p className="text-gray-600 mt-2">
                <Link to="/signup" className="text-blue-500 hover:underline flex items-center justify-center">
                  Don't have an account?{' '} Sign Up
                </Link>
              </p>
            </div>
          </form>
          {/* Back Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleGoBack}
              className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg shadow-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
