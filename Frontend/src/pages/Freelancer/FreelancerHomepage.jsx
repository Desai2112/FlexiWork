import { FaRegMoneyBillAlt, FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Freelancer/Navbar';

const FreelancerHome = () => {
  return (
    <>
    <Navbar />
   
    <div className="container mx-auto p-6">
      {/* Welcome Section */}
      <section className="bg-blue-50 p-6 rounded-lg mb-8">
        <h1 className="text-2xl font-bold">Welcome back, [Freelancer Name]!</h1>
        <p className="text-gray-700">Here's what's happening with your projects today.</p>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Active Projects */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Active Projects</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Project Title 1</h3>
                <p className="text-gray-500 text-sm">Due: Sept 20, 2024</p>
              </div>
              <Link to="/project/1" className="text-blue-600">View</Link>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Project Title 2</h3>
                <p className="text-gray-500 text-sm">Due: Sept 25, 2024</p>
              </div>
              <Link to="/project/2" className="text-blue-600">View</Link>
            </div>
            <Link to="/projects" className="text-blue-600 mt-4 inline-block">View All Projects</Link>
          </div>
        </div>

        {/* Proposals/Bids */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Proposals & Bids</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Proposal for Job Title 1</h3>
                <p className="text-gray-500 text-sm">Submitted: 2 days ago</p>
              </div>
              <Link to="/bids/1" className="text-blue-600">View</Link>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Proposal for Job Title 2</h3>
                <p className="text-gray-500 text-sm">Submitted: 5 days ago</p>
              </div>
              <Link to="/bids/2" className="text-blue-600">View</Link>
            </div>
            <Link to="/proposals" className="text-blue-600 mt-4 inline-block">View All Proposals</Link>
          </div>
        </div>

        {/* Suggested Jobs */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Suggested Jobs</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Job Title 1</h3>
                <p className="text-gray-500 text-sm">Category: Web Development</p>
              </div>
              <Link to="/jobs/1" className="text-blue-600">View</Link>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Job Title 2</h3>
                <p className="text-gray-500 text-sm">Category: Graphic Design</p>
              </div>
              <Link to="/jobs/2" className="text-blue-600">View</Link>
            </div>
            <Link to="/jobs" className="text-blue-600 mt-4 inline-block">Browse All Jobs</Link>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg flex items-center">
              <FaBell className="text-blue-600 mr-3" />
              <p>You have a new message from [Client Name].</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex items-center">
              <FaBell className="text-blue-600 mr-3" />
              <p>Your proposal for Job Title 2 has been viewed.</p>
            </div>
            <Link to="/notifications" className="text-blue-600 mt-4 inline-block">View All Notifications</Link>
          </div>
        </div>

        {/* Earnings Overview */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Earnings Overview</h2>
          <div className="flex items-center">
            <FaRegMoneyBillAlt className="text-blue-600 text-4xl mr-4" />
            <div>
              <h3 className="text-2xl font-bold">$2,500</h3>
              <p className="text-gray-500">Total Earnings</p>
            </div>
          </div>
          <Link to="/earnings" className="text-blue-600 mt-4 inline-block">View Earnings Details</Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default FreelancerHome;
