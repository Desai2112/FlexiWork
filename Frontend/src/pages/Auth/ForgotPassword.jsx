/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email is provided
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/forgot-password", {
        email,
      });

      const res = response.data;

      if (res.success) {
        toast.success("Password reset link sent to your email!");
        navigate("/login");
      } else {
        toast.error(res.message || "Failed to send password reset link. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred. Please try again later.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  const handleGoBack = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Image Section */}
      <div className="hidden md:block w-full md:w-1/2 bg-gray-200 flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/dgvslio7u/image/upload/v1723302697/gzx6czd1vjihamz8yykt.png"
          alt="Forgot Password Illustration"
          className="object-cover w-full h-full md:max-w-full"
        />
      </div>

      {/* Forgot Password Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4 md:p-8">
        <div className="w-full max-w-sm md:max-w-md p-6">
          <img
            src="https://res.cloudinary.com/dgvslio7u/image/upload/v1722411107/tyqao18fdxtj7pefzc3n.png"
            alt="Sign Up Logo"
            className="mx-auto h-16 mb-4"
          />
          <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 text-center">
            Forgot Your Password?
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Enter your email below and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-1 focus:ring-blue-500 transition-shadow"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Send Reset Link
            </button>
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
      <Toaster />
    </div>
  );
};

export default ForgotPassword;
