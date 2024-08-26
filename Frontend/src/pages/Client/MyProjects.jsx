/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Client/Navbar';
import ProjectCard from '../../components/Client/ProjectCard';

const MyProjects = () => {
  const [myProjects, setMyProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6; // Number of projects per page

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/job/show', { withCredentials: true });
        console.log(response);
        setMyProjects(response.data.projects);
        setFilteredProjects(response.data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [statusFilter, myProjects]);

  const filterProjects = () => {
    if (statusFilter === 'all') {
      setFilteredProjects(myProjects);
    } else {
      setFilteredProjects(myProjects.filter(project => project.status === statusFilter));
    }
  };

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold mb-4 lg:mb-0">My Projects</h1>
          <div className="flex flex-wrap justify-center lg:justify-end space-x-0 lg:space-x-4 space-y-2 lg:space-y-0">
            <button 
              className={`px-4 py-2 border rounded ${statusFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setStatusFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 border rounded ${statusFilter === 'new' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setStatusFilter('new')}
            >
              New
            </button>
            <button 
              className={`px-4 py-2 border rounded ${statusFilter === 'ongoing' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setStatusFilter('ongoing')}
            >
              Ongoing
            </button>
            <button 
              className={`px-4 py-2 border rounded ${statusFilter === 'completed' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setStatusFilter('completed')}
            >
              Completed
            </button>
            <button 
              className={`px-4 py-2 border rounded ${statusFilter === 'expired' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setStatusFilter('expired')}
            >
              Expired
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {currentProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <nav>
            <ul className="flex flex-wrap justify-center space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index + 1}>
                  <button 
                    className={`px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MyProjects;
