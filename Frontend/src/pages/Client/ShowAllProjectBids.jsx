import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Client/Navbar';
import BidCard from '../../components/Client/BidCard'; // Import the BidCard component
import { IoMdArrowRoundBack } from "react-icons/io";

const projectData = {
  _id: "66c99461fdedcb27f627c445",
  projectName: "Website Development",
  bids: [
    {
      _id: "bid1",
      name: "John Doe",
      bidAmount: 1200,
      description: "Experienced developer with a proven track record in building responsive websites.",
      freelancerId: "freelancer1",
      freelancerLogo: "https://example.com/freelancer1-logo.jpg"
    },
    {
      _id: "bid2",
      name: "Jane Smith",
      bidAmount: 1500,
      description: "Full-stack developer offering a comprehensive solution for your website needs.",
      freelancerId: "freelancer2",
      freelancerLogo: "https://example.com/freelancer2-logo.jpg"
    }
  ]
};

const ShowAllBidsPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <button
            onClick={handleBackClick}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            <IoMdArrowRoundBack className="h-5 w-5" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-semibold ml-4">{`Bids for ${projectData.projectName}`}</h1>
        </div>
        
        {projectData.bids.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectData.bids.map(bid => (
              <BidCard key={bid._id} bid={bid} />
            ))}
          </div>
        ) : (
          <p className="text-gray-700">No bids have been placed for this project yet.</p>
        )}
      </div>
    </div>
  );
};

export default ShowAllBidsPage;