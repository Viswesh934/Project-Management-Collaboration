import React, { useState, useEffect } from "react";
import axios from 'axios';
import './sliding.css';
import { useNavigate } from 'react-router-dom';

const Card = (props) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    const { organizationId } = props.projectInfo;
    navigate(`/message-app/${organizationId}`);
  };

  return (
    <div className="card flex flex-col bg-white rounded shadow-md overflow-hidden">
      <img src={props.imgUrl} alt={props.alt || 'Image'} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Title: {props.title}</h2>
        <p className="mb-2">Description: {props.content}</p>
        <p className="mb-2">Tech Used: {props.techused}</p>
        <a href={props.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline block mb-2">Github</a>
        <button onClick={handleButtonClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Connect
        </button>
      </div>
    </div>
  );
};

const CardContainer = (props) => (
  <div className="cards-container">
    {props.cards.map((card) => (
      <Card
        key={card._id}
        title={card.title}
        content={card.description}
        imgUrl={'https://via.placeholder.com/400x300'}
        techused={card.techUsed.join(', ')}
        github={card.githubLink}
        projectInfo={card} // Pass the entire card object as projectInfo
      />
    ))}
  </div>
);

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  
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

  return (
    <div className="container mx-auto py-16 bg-white">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Projects By Organizations</h2>
      <div>
        <CardContainer cards={projects} />
      </div>
    </div>
  );
};

export { AllProjects, CardContainer };
