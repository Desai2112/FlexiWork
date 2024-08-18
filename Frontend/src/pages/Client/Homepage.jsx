import React from 'react';
import Navbar from '../../components/Client/Navbar';

const HomePage = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
      <Navbar />
        <div className="flex justify-between items-center my-6 mx-8">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          {/* Add New Project Button */}
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            + Add New Project
          </button>
        </div>
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-8">
          
          {/* My Projects */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">My Projects</h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Website Redesign</span>
                <span className="text-sm text-gray-500">In Progress</span>
              </li>
              <li className="flex justify-between">
                <span>Mobile App Development</span>
                <span className="text-sm text-gray-500">In Progress</span>
              </li>
              <li className="flex justify-between">
                <span>Branding and Marketing</span>
                <span className="text-sm text-gray-500">Completed</span>
              </li>
            </ul>
            <a href="#" className="block text-blue-500 mt-4">View All Projects</a>
          </div>

          {/* Upcoming Projects */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Upcoming Projects</h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>E-commerce Website</span>
                <span className="text-sm text-gray-500">Due in 2 weeks</span>
              </li>
              <li className="flex justify-between">
                <span>Social Media Management</span>
                <span className="text-sm text-gray-500">Due in 1 month</span>
              </li>
              <li className="flex justify-between">
                <span>SEO Optimization</span>
                <span className="text-sm text-gray-500">Due in 3 months</span>
              </li>
            </ul>
            <a href="#" className="block text-blue-500 mt-4">View All Upcoming Projects</a>
          </div>

          {/* Bids on Upcoming Projects */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Bids on Upcoming Projects</h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>E-commerce Website</span>
                <span className="font-semibold">$10,000 - 5 Bids</span>
              </li>
              <li className="flex justify-between">
                <span>Social Media Management</span>
                <span className="font-semibold">$7,500 - 3 Bids</span>
              </li>
              <li className="flex justify-between">
                <span>SEO Optimization</span>
                <span className="font-semibold">$5,000 - 4 Bids</span>
              </li>
            </ul>
            <a href="#" className="block text-blue-500 mt-4">View All Bids</a>
          </div>
          {/* Activity Summary */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Activity Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Projects Completed</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between">
                <span>Invoices Sent</span>
                <span className="font-semibold">24</span>
              </div>
              <div className="flex justify-between">
                <span>Messages Sent</span>
                <span className="font-semibold">87</span>
              </div>
            </div>
            <a href="#" className="block text-blue-500 mt-4">View All Activity</a>
          </div>

          {/* Recent Invoices */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Recent Invoices</h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Website Redesign</span>
                <span className="font-semibold">$2,500</span>
              </li>
              <li className="flex justify-between">
                <span>Mobile App Development</span>
                <span className="font-semibold">$3,000</span>
              </li>
              <li className="flex justify-between">
                <span>Branding and Marketing</span>
                <span className="font-semibold">$1,800</span>
              </li>
            </ul>
            <a href="#" className="block text-blue-500 mt-4">View All Invoices</a>
          </div>

          {/* Recent Messages */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Recent Messages</h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>New Project Inquiry</span>
                <span className="text-sm text-gray-500">2 days ago</span>
              </li>
              <li className="flex justify-between">
                <span>Feedback on Website</span>
                <span className="text-sm text-gray-500">1 week ago</span>
              </li>
              <li className="flex justify-between">
                <span>Invoice Payment Reminder</span>
                <span className="text-sm text-gray-500">3 weeks ago</span>
              </li>
            </ul>
            <a href="#" className="block text-blue-500 mt-4">View All Messages</a>
          </div>
          
        </main>
      </div>
    </>
  );
};

export default HomePage;
