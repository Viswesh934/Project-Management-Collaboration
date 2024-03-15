import React from "react";

const MemberProjectIdeas = () => {
  // Sample project ideas data
  const projectIdeas = [
    {
      id: 1,
      title: "Social Media App",
      description: "An app that connects people around the world.",
      skillsRequired: ["React", "Node.js", "MongoDB"],
      createdBy: "John Doe",
      contact: "john@example.com", // Assuming this is the email of the team lead
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "A platform for buying and selling products online.",
      skillsRequired: ["React", "Express", "MySQL"],
      createdBy: "Jane Smith",
      contact: "jane@example.com", // Assuming this is the email of the team lead
    },
  ];

  const handleContactClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Project Ideas</h2>
      {projectIdeas.map((idea) => (
        <div key={idea.id} className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-bold mb-2">{idea.title}</h3>
          <p className="mb-2">{idea.description}</p>
          <p className="mb-2">
            <strong>Skills Required:</strong>{" "}
            {idea.skillsRequired.join(", ")}
          </p>
          <p className="mb-2">
            <strong>Created By:</strong> {idea.createdBy}
          </p>
          {/* Button to contact team lead */}
          <button
            onClick={() => handleContactClick(idea.contact)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Contact Team Lead
          </button>
        </div>
      ))}
    </div>
  );
};

export default MemberProjectIdeas;
