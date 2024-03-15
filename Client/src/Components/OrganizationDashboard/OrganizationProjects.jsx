import React, { useState } from "react";

const OrganizationProjects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Project 1",
      description: "This is a description of Project 1.",
      image: "https://via.placeholder.com/150",
      tech: ["React", "Node.js", "MongoDB"],
      teamMembers: [
        { name: "John Doe", role: "Developer" },
        { name: "Jane Doe", role: "Designer" },
      ],
      githubLink: "https://github.com/example/project1",
      googledoclink: "https://docs.google.com/document/d/1",
    },
    {
      id: 2,
      name: "Project 2",
      description: "This is a description of Project 2.",
      image: "https://via.placeholder.com/150",
      tech: ["Vue.js", "Express", "MySQL"],
      teamMembers: [
        { name: "Alice Smith", role: "Developer" },
        { name: "Bob Smith", role: "Tester" },
      ],
      githubLink: "https://github.com/example/project2",
      googledoclink: "https://docs.google.com/document/d/1",
    },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            // Logic to handle adding projects
            console.log("Adding project...");
          }}
        >
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2">{project.name}</h3>
            <img src={project.image} alt={project.name} className="mb-2" />
            <div className="mb-2">{project.description}</div>
            <div className="mb-2">
              <strong>Tech:</strong>{" "}
              {project.tech.map((tech, index) => (
                <span key={index} className="mr-2">
                  {tech}
                </span>
              ))}
            </div>
            <div className="mb-2">
              <strong>Team Members:</strong>
              <ul>
                {project.teamMembers.map((member, index) => (
                  <li key={index}>
                    {member.name} - {member.role}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between">
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block mr-2"
              >
                GitHub
              </a>
              <a
                href={project.googledoclink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
              >
                Google Doc
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationProjects;
