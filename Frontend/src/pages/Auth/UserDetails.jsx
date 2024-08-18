import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import axios from 'axios';

const UserDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const email = state?.email || "";
  const role = state?.role || "";

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [skillsOptions, setSkillsOptions] = useState([]); // Dynamic options state
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [bio, setBio] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch skills data from the backend
    if (role !== "client") {
      fetch("http://localhost:5000/auth/get-all-skills")
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data.skills)) {
            const options = data.skills.map((skill) => ({
              value: skill._id,
              label: skill.skill,
            }));
            setSkillsOptions(options);
          } else {
            console.error("Unexpected data format:", data);
            toast.error("Unexpected data format received.");
          }
        })
        .catch((error) => {
          console.error("Error fetching skills:", error);
          toast.error("Failed to load skills.");
        });
    }
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    const userDetails = {
      name,
      email,
      role,
      password, // Include password in the request
      mobileNo,
      companyName,
      skills: selectedSkills.map((skill) => skill.value),
      bio,
    };

    try {
      // Make the signup request
      const response = await axios.post('http://localhost:5000/auth/signup', userDetails);
      
      if (response.status === 200) {
        toast.success("User details saved successfully.");
        // Redirect to a different page if needed
        navigate(`/${role}`); // Replace '/success' with your actual route
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Failed to save user details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!email || !role) {
      navigate("/signup");
    }
  }, [email, role, navigate]);

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex md:w-1/2 bg-gray-200">
        <img
          src="https://res.cloudinary.com/dgvslio7u/image/upload/v1723302697/gzx6czd1vjihamz8yykt.png"
          alt="User Details Illustration"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="w-full md:w-1/2 overflow-y-auto bg-white p-4 md:p-8">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
            User Details
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                readOnly
                className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Role</label>
              <input
                type="text"
                value={role}
                readOnly
                className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Mobile No</label>
              <input
                type="tel"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                required
              />
            </div>
            {role === "client" && (
              <div>
                <label className="block text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                />
              </div>
            )}
            {role !== "client" && (
              <div>
                <label className="block text-gray-700 mb-1">Skills</label>
                <Select
                  isMulti
                  value={selectedSkills}
                  onChange={setSelectedSkills}
                  options={skillsOptions}
                  className="w-full"
                  classNamePrefix="select"
                  placeholder="Select your skills"
                />
              </div>
            )}
            <div>
              <label className="block text-gray-700 mb-1">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                rows="4"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Details"}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default UserDetails;
