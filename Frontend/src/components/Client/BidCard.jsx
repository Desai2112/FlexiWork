// import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BidCard = ({ bid }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md flex items-center">
      <Link to={`/freelancer/${bid.freelancerId}`} className="mr-4">
        <img
          src={bid.freelancerLogo}
          alt={bid.name}
          className="w-16 h-16 rounded-full object-cover"
        />
      </Link>
      <div>
        <Link to={`/client/freelancer/profile`}>
          <h3 className="text-xl font-semibold text-blue-600 hover:underline">
            {bid.name}
          </h3>
        </Link>
        <p className="text-gray-600 mb-2"><strong>Bid Amount:</strong> ${bid.bidAmount.toLocaleString()}</p>
        <p className="text-gray-800"><strong>Description:</strong> {bid.description}</p>
        <div className="flex mt-4">
          <button className="bg-green-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-green-600">
            Accept
          </button>
          <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

BidCard.propTypes = {
  bid: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bidAmount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    freelancerId: PropTypes.string.isRequired,
    freelancerLogo: PropTypes.string.isRequired,
  }).isRequired,
};

export default BidCard;
