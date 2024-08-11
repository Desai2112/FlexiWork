import { useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyOtp = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Retrieve email and role from state
  const email = state?.email || '';
  const role = state?.role || 'client';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  // Function to handle OTP input change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    const newOtp = [...otp];
    
    if (/^[0-9]$/.test(value) || value === '') { // Only allow digits
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input if the current input is filled
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    } else {
      toast.error('Please enter only digits.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all OTP fields are filled
    if (otp.some(digit => digit === '')) {
      toast.error('Please enter the complete OTP.');
      return;
    }

    setLoading(true);

    // Simulate OTP verification process
    setTimeout(() => {
      setLoading(false);
      // Simulate a successful verification
      if (email && role) {
        toast.success('OTP verified successfully! Redirecting to user details.');
        navigate('/user-details', { state: { email, role } });
      } else {
        toast.error('Error verifying OTP. Please try again.');
      }
    }, 2000); // Simulate a delay for the verification
  };

  useEffect(() => {
    if (!email || !role) {
      navigate('/signup'); 
    }
  }, [email, role, navigate]);
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Image Section */}
      <div className="hidden md:block w-full md:w-1/2 bg-gray-200 flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/dgvslio7u/image/upload/v1723302697/gzx6czd1vjihamz8yykt.png"
          alt="OTP Verification Illustration"
          className="object-cover w-full h-full md:max-w-full"
        />
      </div>

      {/* OTP Verification Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4 md:p-8">
        <div className="w-full max-w-sm md:max-w-md p-6">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 text-center">Verify Your OTP</h1>
          <p className="text-gray-600 text-center mb-6">Enter the OTP sent to your email.</p>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <div className="flex justify-between">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-12 text-center focus:ring-1 focus:ring-blue-500 transition-shadow"
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Didn't receive the OTP?{' '}
                <a href="#" className="text-blue-500 hover:underline">
                  Resend OTP
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default VerifyOtp;
