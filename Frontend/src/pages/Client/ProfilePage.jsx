import { useState } from 'react';
import Navbar from '../../components/Freelancer/Navbar';
import Footer from '../../components/Freelancer/Footer';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'A passionate freelancer specializing in web development.',
    skills: 'React, Node.js, CSS, JavaScript',
  });

  const [projects, setProjects] = useState([
    {
      id: 1,
      projectName: 'Portfolio Website',
      projectDescription: 'A personal portfolio website to showcase my work.',
      technolgiesUsed: ['React', 'CSS'],
      projectLink: 'https://portfolio.example.com',
      projectStart: '2023-01-01',
      projectEnd: '2023-03-01',
    },
    {
      id: 2,
      projectName: 'E-commerce Platform',
      projectDescription: 'An e-commerce platform built with React and Node.js.',
      technolgiesUsed: ['React', 'Node.js', 'MongoDB'],
      projectLink: 'https://ecommerce.example.com',
      projectStart: '2023-04-01',
      projectEnd: '2023-06-01',
    },
  ]);

  const [newProject, setNewProject] = useState({
    projectName: '',
    projectDescription: '',
    technolgiesUsed: '',
    projectLink: '',
    projectStart: '',
    projectEnd: '',
  });

  const toggleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProjectChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const addProject = () => {
    setProjects([...projects, { ...newProject, id: projects.length + 1 }]);
    setNewProject({
      projectName: '',
      projectDescription: '',
      technolgiesUsed: '',
      projectLink: '',
      projectStart: '',
      projectEnd: '',
    });
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Details</h2>
              <button
                onClick={toggleEditProfile}
                className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
              >
                {isEditing ? 'Save' : 'Edit Profile'}
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full border rounded-md px-4 py-2"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full border rounded-md px-4 py-2"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-gray-600">Bio</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full border rounded-md px-4 py-2"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-gray-600">Skills</label>
                <input
                  type="text"
                  name="skills"
                  value={profile.skills}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full border rounded-md px-4 py-2"
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Projects</h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex justify-between items-center bg-gray-100 rounded-md p-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {project.projectName}
                    </h3>
                    <p className="text-gray-600">{project.projectDescription}</p>
                    <p className="text-gray-600">
                      Technologies: {project.technolgiesUsed.join(', ')}
                    </p>
                    <p className="text-gray-600">
                      Project Link: <a href={project.projectLink} className="text-blue-500">{project.projectLink}</a>
                    </p>
                    <p className="text-gray-600">
                      Duration: {project.projectStart} - {project.projectEnd}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Add New Project</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600">Project Name</label>
                  <input
                    type="text"
                    name="projectName"
                    value={newProject.projectName}
                    onChange={handleProjectChange}
                    className="mt-1 block w-full border rounded-md px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Project Description</label>
                  <textarea
                    name="projectDescription"
                    value={newProject.projectDescription}
                    onChange={handleProjectChange}
                    className="mt-1 block w-full border rounded-md px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Technologies Used</label>
                  <input
                    type="text"
                    name="technolgiesUsed"
                    value={newProject.technolgiesUsed}
                    onChange={handleProjectChange}
                    placeholder="Comma separated"
                    className="mt-1 block w-full border rounded-md px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Project Link</label>
                  <input
                    type="text"
                    name="projectLink"
                    value={newProject.projectLink}
                    onChange={handleProjectChange}
                    className="mt-1 block w-full border rounded-md px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Project Start</label>
                  <input
                    type="date"
                    name="projectStart"
                    value={newProject.projectStart}
                    onChange={handleProjectChange}
                    className="mt-1 block w-full border rounded-md px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Project End</label>
                  <input
                    type="date"
                    name="projectEnd"
                    value={newProject.projectEnd}
                    onChange={handleProjectChange}
                    className="mt-1 block w-full border rounded-md px-4 py-2"
                  />
                </div>
                <button
                  onClick={addProject}
                  className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                >
                  Add Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;
