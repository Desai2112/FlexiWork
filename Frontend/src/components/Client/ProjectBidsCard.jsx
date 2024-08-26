import PropTypes from 'prop-types';

const ProjectBidsCard = ({ project, onViewAll }) => (
  <div className="bg-white shadow-md rounded-lg p-4">
    <h2 className="text-lg font-semibold mb-2">{project.projectName}</h2>
    <ul>
      {project.bids.map((bid, index) => (
        <li key={index} className="mb-1 flex justify-between">
          <span className="font-medium">{bid.name}</span>
          <span className="ml-4">${bid.bidAmount.toLocaleString()}</span>
        </li>
      ))}
    </ul>
    <button
      onClick={onViewAll}
      className="text-blue-500 hover:underline mt-4 block"
    >
      View All Bids
    </button>
  </div>
);

ProjectBidsCard.propTypes = {
  project: PropTypes.shape({
    projectName: PropTypes.string.isRequired,
    bids: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        bidAmount: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onViewAll: PropTypes.func.isRequired,
};

export default ProjectBidsCard;
