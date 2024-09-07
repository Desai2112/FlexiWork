/* eslint-disable no-unreachable */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Navbar from "../../components/Client/Navbar"; // Ensure Navbar component is imported correctly
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TailSpin } from "react-loader-spinner";

const ViewProjectPage = () => {
  const { id } = useParams();
  const [projectData, setProjectData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/job/${id}`, {
          withCredentials: true,
        });
        setProjectData(response.data.project);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [id]); // Depend on 'id' to refetch if it changes

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleViewAllBids = () => {
    navigate(`/client/project/${id}/bids`);
  };

  if (!projectData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#2563EB"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    ); // Correctly return the loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <button
          onClick={handleBackClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md mb-6 flex items-center space-x-2 hover:bg-blue-600 transition duration-300"
        >
          <IoMdArrowRoundBack className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-semibold mb-4">
            {projectData.projectName}
          </h1>
          <p className="text-gray-700 mb-4">
            <strong>Description:</strong> {projectData.description}
          </p>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4">
            <div className="flex flex-col lg:flex-row lg:items-center mb-4 lg:mb-0">
              <div className="text-lg font-medium mr-4">Status:</div>
              <div
                className={`px-3 py-1 rounded-full text-white ${
                  capitalizeFirstLetter(projectData.status) === "Expired"
                    ? "bg-gray-500"
                    : "bg-green-500"
                }`}
              >
                {capitalizeFirstLetter(projectData.status)}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center mb-4 lg:mb-0">
              <div className="text-lg font-medium mr-4">Budget:</div>
              <div className="text-lg font-semibold">
                ${projectData.maxPrice.toLocaleString()}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center">
              <div className="text-lg font-medium mr-4">Bid Ends:</div>
              <div className="text-lg font-semibold">
                {new Date(projectData.bidEnds).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-300 mt-6 pt-4">
            <h2 className="text-2xl font-semibold mb-4">Required Skills</h2>
            <ul className="list-disc pl-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {projectData.requiredSkills.map((skill) => (
                <li key={skill._id} className="text-gray-700">
                  {skill.skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Bids</h2>
          {projectData.bids.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {projectData.bids.map((bid) => (
                  <div
                    key={bid._id}
                    className="bg-gray-50 p-4 rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-semibold mb-2">{bid.name}</h3>
                    <p className="text-gray-600 mb-2">
                      <strong>Freelancer:</strong> {bid.freelancerName}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <strong>Bid Amount:</strong> $
                      {bid.bidAmount.toLocaleString()}
                    </p>
                    <p className="text-gray-800 mb-2">
                      <strong>Description:</strong> {bid.description}
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={handleViewAllBids}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md flex items-center space-x-2 hover:bg-blue-600 transition duration-300"
              >
                <span>View All Bids</span>
              </button>
            </div>
          ) : (
            <p className="text-gray-700">
              No bids have been placed for this project yet.
            </p>
          )}
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any doubts or need further information, please reach us
            at:
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Company:</strong> {projectData.ClientId.companyName}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Email:</strong>{" "}
            <a
              href={`mailto:${projectData.ClientId.email}`}
              className="text-blue-500 hover:underline"
            >
              {projectData.ClientId.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

ViewProjectPage.propTypes = {
  projectData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    projectName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    deleted: PropTypes.bool.isRequired,
    maxPrice: PropTypes.number.isRequired,
    expectedTime: PropTypes.number.isRequired,
    bidDuration: PropTypes.number.isRequired,
    bidEnds: PropTypes.string.isRequired,
    requiredSkills: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        skill: PropTypes.string.isRequired,
      })
    ).isRequired,
    ClientId: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      companyName: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    bids: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        freelancerName: PropTypes.string.isRequired,
        bidAmount: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
};

export default ViewProjectPage;
