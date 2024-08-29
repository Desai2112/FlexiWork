import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { GoLock } from "react-icons/go";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams(); // Get the token from the URL parameters
  const navigate = useNavigate(); // Initialize navigate hook for redirection
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(null); // Track token validity

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  // Verify token when the component mounts
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/auth/password-token-verify",
          { token }
        );
        const res = response.data;
        setIsTokenValid(res.success);

        if (!res.success) {
          toast.error(res.message || "The reset link has expired or is invalid.");
        }
      } catch (error) {
        setIsTokenValid(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(
        "http://localhost:5000/auth/reset-password",
        { token, password }
      );
      const res = response.data;

      if (res.success) {
        toast.success("Password reset successfully!");
      } else {
        toast.error(res.message || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred. Please try again later.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Display a message if the token is invalid or expired
  if (isTokenValid === false) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-red-50 rounded-lg shadow-lg border border-gray-200 text-center">
          <h2 className="text-xl font-bold text-red-600">Link Expired</h2>
          <p className="text-gray-700 mb-4">
            The password reset link is invalid or has expired. Please request a new link.
          </p>
          <button
            onClick={() => navigate("/login")} // Navigate back to login
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 focus:outline-none"
          >
            Go Back to Login
          </button>
        </div>
        <Toaster />
      </div>
    );
  }

  // Show a loader or placeholder while verifying the token
  if (isTokenValid === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-center text-gray-700">Verifying token...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-green-50 rounded-lg shadow-lg border border-gray-200">
        <div className="flex items-center justify-center mb-6">
          <GoLock className="text-6xl text-green-700" />
        </div>
        <h2 className="mb-4 text-xl font-bold text-center text-gray-800">
          Reset Your Password
        </h2>
        <p className="block text-md text-gray-600 mb-4 text-center">
          Please enter your new password and confirm it to reset your password.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your new password"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm your new password"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        {/* Button to redirect to login after success */}
        {isTokenValid && !loading && (
          <button
            onClick={() => navigate("/login")}
            className="mt-4 w-full py-2 text-white bg-green-700 rounded-lg hover:bg-green-800 focus:outline-none"
          >
            Go Back to Login
          </button>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default ResetPassword;
