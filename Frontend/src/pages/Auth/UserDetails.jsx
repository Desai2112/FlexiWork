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
  const [skillsOptions, setSkillsOptions] = useState([]); 
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [bio, setBio] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null); // State for profile picture
  const [profilePicUrl, setProfilePicUrl] = useState(""); // URL for uploaded profile picture

  useEffect(() => {
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

  // Function to handle profile picture upload to Cloudinary
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "FlexiWork"); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgvslio7u/image/upload", // Replace 'your_cloud_name' with your actual Cloudinary cloud name
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    let imageUrl = profilePicUrl;

    if (profilePic && !profilePicUrl) {
      imageUrl = await uploadImage(profilePic);
      if (!imageUrl) {
        setLoading(false);
        return;
      }
      setProfilePicUrl(imageUrl);
    }

    const userDetails = {
      name,
      email,
      role,
      password,
      mobileNo,
      companyName,
      skills: selectedSkills.map((skill) => skill.value),
      bio,
      profilePicUrl: imageUrl,
    };

    try {
      const response = await axios.post('http://localhost:5000/auth/signup', userDetails);

      if (response.status === 200) {
        toast.success("User details saved successfully.");
        navigate(`/${role}`);
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
            <div>
              <label className="block text-gray-700 mb-1">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePic(e.target.files[0])}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 rounded-lg text-white ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserDetails;
