import  { useState } from "react";
import Navbar from "../../components/Client/Navbar";
import ProjectBidsCard from "../../components/Client/ProjectBidsCard";
import { useNavigate } from "react-router-dom";

const BidsPage = () => {
  const [projectsWithBids] = useState([
    {
      _id: "1",
      projectName: "E-commerce Website",
      bids: [
        {  _id:"1",name: "John Doe", bidAmount: 10000 },
        { _id:"2", name: "Jane Smith", bidAmount: 12000 },
      ],
    },
    {
      _id: "2",
      projectName: "Social Media Management",
      bids: [
        { _id:"1",name: "Alice Brown", bidAmount: 7500 },
        { _id:"2",name: "Bob Johnson", bidAmount: 8000 },
      ],
    },
    {
      _id: "3",
      projectName: "SEO Optimization",
      bids: [
        {  _id:"1",name: "Charlie Davis", bidAmount: 5000 },
        {  _id:"2",name: "Diana Lee", bidAmount: 6000 },
      ],
    },
  ]);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold mb-4">Bids on Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsWithBids.map((project) => (
            <ProjectBidsCard
              key={project._id}
              project={project}
              onViewAll={() => navigate(`/client/bids/${project._id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BidsPage;
