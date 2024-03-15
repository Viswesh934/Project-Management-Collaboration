import React, { useState } from "react";

const OrganizationProjectIdeas = () => {
  const [projectIdeas, setProjectIdeas] = useState([
    {
      id: 1,
      title: "Project Idea 1",
      description: "This is a description of Project Idea 1.",
      skillsRequired: ["React", "Node.js", "MongoDB"],
      contactEmail: "contact@example.com",
    },
    {
      id: 2,
      title: "Project Idea 2",
      description: "This is a description of Project Idea 2.",
      skillsRequired: ["Vue.js", "Express", "MySQL"],
      contactEmail: "contact@example.com",
    },
    // Add more project ideas as needed
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Project Ideas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectIdeas.map((idea) => (
          <div key={idea.id} className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2"m>{idea.title}</h3>
            <p className="mb-2">{idea.description}</p>
            <p className="mb-2">
              <strong>Skills Required:</strong>{" "}
              {idea.skillsRequired.map((skill, index) => (
                <span key={index} className="mr-2">
                  {skill}
                </span>
              ))}
            </p>
            <a
              href={`mailto:${idea.contactEmail}`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
            >
              Contact Project Lead
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationProjectIdeas;
