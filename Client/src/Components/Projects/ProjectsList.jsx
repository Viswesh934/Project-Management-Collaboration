import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3000/everyproject');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleConnect = (projectId) => {
    navigate(`/message-app/${projectId}`);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mt-8 mb-4">All Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project._id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-2">{project.title}</h2>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <p className="text-gray-600 mb-2">Technologies Used: {project.techUsed.join(', ')}</p>
            <p className="text-gray-600 mb-4">Team Members: {project.teamMembers.join(', ')}</p>
            <div className="flex space-x-4">
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500"
              >
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  GitHub
                </button>
              </a>
              <button
                onClick={() => handleConnect(project.organizationId)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsList;
