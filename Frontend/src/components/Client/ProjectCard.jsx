import PropTypes from 'prop-types';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mx-4 my-4 transition-transform transform hover:scale-105">
      <div className="flex items-center mb-4">
        <div className="bg-blue-600 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold shadow-md">
          {project.projectName.charAt(0)}
        </div>
        <h3 className="text-2xl font-extrabold ml-4 text-gray-800">{project.projectName}</h3>
      </div>
      <p className={`text-sm ${project.valueClass || 'text-gray-600'} mb-4 font-medium`}>{project.status.toUpperCase()}</p>
      <div className="bg-gray-50 p-5 rounded-lg shadow-inner mb-4 border border-gray-300">
        <div className="flex justify-between text-sm text-gray-700 mb-3">
          <span className="font-semibold">Max Price:</span>
          <span className="font-medium text-gray-900">${project.maxPrice}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700 mb-3">
          <span className="font-semibold">Expected Time:</span>
          <span className="font-medium text-gray-900">{project.expectedTime} days</span>
        </div>
        <div className="text-sm text-gray-700">
          <span className="font-semibold">Description:</span>
          <p className="mt-1 text-gray-800">{project.description}</p>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm text-gray-700 mb-4">
        <span className="font-medium">Bids: {/* You might want to include bid count here if available */}</span>
        <span className={`text-xs ${project.valueClass || 'text-gray-600'}`}>{`Status: ${project.status}`}</span>
      </div>
      <div className="text-right">
        <a 
          href={`/client/project/${project._id}`} 
          className="text-blue-600 hover:underline text-sm font-semibold"
        >
          View Details
        </a>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    projectName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    maxPrice: PropTypes.number.isRequired,
    expectedTime: PropTypes.number.isRequired,
    bidDuration: PropTypes.number, // Optional, if needed
    bidEnds: PropTypes.string, // Optional, if needed
    requiredSkills: PropTypes.arrayOf(PropTypes.string), // Optional, if needed
    ClientId: PropTypes.string, // Optional, if needed
    createdAt: PropTypes.string, // Optional, if needed
    updatedAt: PropTypes.string, // Optional, if needed
    valueClass: PropTypes.string,
    _id:PropTypes.string, // Optional, if needed
  }).isRequired,
};

export default ProjectCard;
