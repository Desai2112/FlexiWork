import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PulseLoader from 'react-spinners/PulseLoader'; // Import the loader component

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('client'); // Default role
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter email address!');
      return;
    } else {
      toast.success('OTP sent successfully! Redirecting to OTP verification.');

      // Set loading state to true and redirect after a delay
      setLoading(true);
      setTimeout(() => {
        setLoading(false); // Hide loader
        navigate('/verify-otp', { state: { email, role } });
      }, 2000); // 2 seconds delay to simulate loading
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Image Section */}
      <div className="hidden md:block w-full md:w-1/2 bg-gray-200 flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/dgvslio7u/image/upload/v1723302697/gzx6czd1vjihamz8yykt.png"
          alt="Sign Up Illustration"
          className="object-cover w-full h-full md:max-w-full"
        />
      </div>
      
      {/* Sign Up Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4 md:p-8">
        <div className="w-full max-w-sm md:max-w-md p-6">
          <img
            src="https://res.cloudinary.com/dgvslio7u/image/upload/v1722411107/tyqao18fdxtj7pefzc3n.png"
            alt="Sign Up Logo"
            className="mx-auto h-16 mb-4"
          />
          <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 text-center">Join FlexiWork!</h1>
          <p className="text-gray-600 text-center mb-6">Sign up to start your journey as a client or freelancer.</p>

          <form onSubmit={handleSendOtp} className="flex flex-col space-y-6">
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
              <label className="block text-gray-700 text-sm font-medium mb-1">Join as</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="client"
                    checked={role === 'client'}
                    onChange={handleRoleChange}
                    className="mr-2"
                  />
                  <span>Client</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="freelancer"
                    checked={role === 'freelancer'}
                    onChange={handleRoleChange}
                    className="mr-2"
                  />
                  <span>Freelancer</span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Send OTP
            </button>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Log In
                </Link>
              </p>
            </div>
          </form>
          {loading && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
              <PulseLoader
                color="#ffffff"
                loading={loading}
                size={15} // You can adjust size if needed
              />
              <p className="text-white mt-4">Loading...</p>
            </div>
          )}
        </div>
      </div>
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default SignUp;
