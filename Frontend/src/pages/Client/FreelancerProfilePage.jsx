import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaLinkedin, FaGithub, FaTwitter, FaGlobe } from "react-icons/fa";
import { MdPhone, MdMoney, MdOutlineBusinessCenter } from "react-icons/md";
import Navbar from "../../components/Client/Navbar";

// Dummy data for the freelancer profile
const dummyFreelancer = {
  userId: "123456789",
  name: "John Doe",
  bio: "Experienced web developer with expertise in frontend and backend technologies.",
  mobileNo: "+1234567890",
  skills: [
    { _id: "1", name: "JavaScript" },
    { _id: "2", name: "React" },
    { _id: "3", name: "Node.js" },
  ],
  projects: [
    {
      projectName: "Portfolio Website",
      projectDescription:
        "A personal portfolio to showcase projects and skills.",
      technologiesUsed: [
        { _id: "1", name: "React" },
        { _id: "2", name: "Tailwind CSS" },
      ],
      projectLink: "https://example.com",
      projectStart: "2023-01-01",
      projectEnd: "2023-01-31",
    },
    {
      projectName: "E-commerce Platform",
      projectDescription: "An online store built with full-stack JavaScript.",
      technologiesUsed: [
        { _id: "1", name: "Node.js" },
        { _id: "2", name: "Express" },
        { _id: "3", name: "MongoDB" },
      ],
      projectLink: "https://example-ecommerce.com",
      projectStart: "2023-02-01",
      projectEnd: "2023-03-01",
    },
  ],
  socialMediaLinks: {
    linkedin: "https://linkedin.com/in/example",
    github: "https://github.com/example",
    twitter: "https://twitter.com/example",
    personalWebsite: "https://example.com",
  },
  moneyEarned: 5000,
  profilePicUrl:
    "https://res.cloudinary.com/dgvslio7u/image/upload/v1725353935/Flexiwork/m9x3ksy6eodb5hmbg86r.jpg",
};

const FreelancerProfilePage = () => {
  const { id } = useParams(); // Assuming you are using React Router for routing
  const [freelancer, setFreelancer] = useState(null);

  // Simulate fetching data
  useEffect(() => {
    // Simulate fetching freelancer data from an API
    setFreelancer(dummyFreelancer);
  }, [id]);

  if (!freelancer) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-8 bg-gray-50 shadow-lg rounded-lg">
        {/* Profile Header */}
        <div className="flex items-start space-x-8 border-b pb-6 mb-6">
          <img
            src={freelancer.profilePicUrl}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-black"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-black">{freelancer.name}</h1>
            <div className="text-md  text-black">{freelancer.bio}</div>
            <p className="flex items-center text-gray-600 mt-2">
              <MdPhone className="mr-2 text-green-600" /> {freelancer.mobileNo}
            </p>
            <p className="flex items-center text-gray-600 mt-1">
              <MdMoney className="mr-2 text-green-600" /> Total Earnings:{" "}
              <span className="ml-1 text-slate-800 font-semibold">
                ${freelancer.moneyEarned}
              </span>
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-black">Skills</h2>
          <ul className="flex flex-wrap gap-2">
            {freelancer.skills.map((skill) => (
              <li
                key={skill._id}
                className="bg-black text-white px-3 py-1 rounded-full"
              >
                {skill.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-black">Projects</h2>
          {freelancer.projects.map((project, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg mb-4 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-xl font-bold text-slate-700">
                {project.projectName}
              </h3>
              <p className="text-gray-700 mt-2">{project.projectDescription}</p>
              <p className="text-gray-500 mt-2">
                <MdOutlineBusinessCenter className="inline-block mr-1 text-slate-600" />
                Technologies Used:{" "}
                {project.technologiesUsed.map((tech) => tech.name).join(", ")}
              </p>
              <a
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-2 block"
              >
                View Project
              </a>
              <p className="text-gray-500 mt-1">
                Duration: {project.projectStart} to {project.projectEnd}
              </p>
            </div>
          ))}
        </div>

        {/* Social Media Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-black">
            Social Media Links
          </h2>
          <ul className="flex space-x-6">
            {freelancer.socialMediaLinks.linkedin && (
              <li>
                <a
                  href={freelancer.socialMediaLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <FaLinkedin size={24} />
                </a>
              </li>
            )}
            {freelancer.socialMediaLinks.github && (
              <li>
                <a
                  href={freelancer.socialMediaLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-black transition-colors"
                >
                  <FaGithub size={24} />
                </a>
              </li>
            )}
            {freelancer.socialMediaLinks.twitter && (
              <li>
                <a
                  href={freelancer.socialMediaLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  <FaTwitter size={24} />
                </a>
              </li>
            )}
            {freelancer.socialMediaLinks.personalWebsite && (
              <li>
                <a
                  href={freelancer.socialMediaLinks.personalWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 transition-colors"
                >
                  <FaGlobe size={24} />
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FreelancerProfilePage;
