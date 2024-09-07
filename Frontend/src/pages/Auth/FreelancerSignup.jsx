import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";

const FreelancerSignupPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const email = state?.email || "";
  const role = state?.role || "freelancer";

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [skillsOptions, setSkillsOptions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    fetchSkillsOptions();
  }, []);

  const fetchSkillsOptions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/common/skills");
      if (Array.isArray(response.data.skills)) {
        const options = response.data.skills.map((skill) => ({
          value: skill._id,
          label: skill.skill,
        }));
        setSkillsOptions(options);
      } else {
        toast.error("Unexpected data format received.");
      }
    } catch (error) {
      toast.error("Failed to load skills.");
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "FlexiWork");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgvslio7u/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
      return null;
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);

    if (data.password !== data.confirmPassword) {
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
      ...data,
      email,
      role,
      profilePicUrl: imageUrl,
      skills: selectedSkills.map((skill) => skill.value),
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/freelancer/signup",
        userDetails
      );

      if (response.status === 201) {
        toast.success("Freelancer details saved successfully.");
        navigate("/freelancer");
      }
    } catch (error) {
      toast.error("Failed to save freelancer details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex md:w-1/2 bg-gray-200">
        <img
          src="https://res.cloudinary.com/dgvslio7u/image/upload/v1723302697/gzx6czd1vjihamz8yykt.png"
          alt="Freelancer Details Illustration"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="w-full md:w-1/2 overflow-y-auto bg-white p-4 md:p-8">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
            Freelancer Details
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
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
              <label className="block text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: "Password is required" })}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
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
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                })}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Mobile No</label>
              <input
                type="tel"
                {...register("mobileNo", {
                  required: "Mobile number is required",
                })}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
              {errors.mobileNo && (
                <p className="text-red-500 text-sm">
                  {errors.mobileNo.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Skills</label>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <Select
                    isMulti
                    {...field}
                    value={selectedSkills}
                    onChange={(selectedOptions) => {
                      setSelectedSkills(selectedOptions);
                      setValue("skills", selectedOptions);
                    }}
                    options={skillsOptions}
                    className="w-full"
                    classNamePrefix="select"
                    placeholder="Select your skills"
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Bio</label>
              <textarea
                {...register("bio")}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                rows={4}
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePic(e.target.files[0])}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded-lg"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FreelancerSignupPage;
