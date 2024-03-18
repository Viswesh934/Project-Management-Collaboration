import React, { useState, useEffect } from "react";
import axios from 'axios';
import './sliding.css';

const IdeaCard = (props) => {
  const handleButtonClick = () => {
    
    const { memberId, organizationId } = props.ideaData;
    if (memberId) {
      console.log("Member ID:", memberId);
    }else{
      console.log("Organization ID:", organizationId);
    }

  };

  return (
    <div className="card">
      <img src={props.imgUrl} alt={props.alt || "Image"} />
      <div className="card-content">
        <h2>Title: {props.title}</h2>
        <p>Description: {props.content}</p>
        <p>Skills required: {props.skills}</p>
        <button onClick={handleButtonClick}>View ID</button>
      </div>
    </div>
  );
};


const IdeaCardContainer = (props) => (
  <div className="cards-container">
    {props.cards.map((idea) => (
      <IdeaCard
        key={idea._id}
        title={idea.title}
        content={idea.description}
        imgUrl={"https://via.placeholder.com/400x300"}
        skills={idea.skillsRequired.join(", ")}
        ideaData={idea} // Pass the ideaData prop here
      />
    ))}
  </div>
);

const AllProjectsIdeas = () => {
  axios.defaults.withCredentials = true;
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/everyprojectidea');
        setIdeas(response.data);
      } catch (error) {
        console.error('Error fetching project ideas:', error);
      }
    };

    fetchIdeas();
  }, []);

  return (
    <div className="container mx-auto py-16 bg-white">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Project Ideas</h2>
      <div>
        <IdeaCardContainer cards={ideas} />
      </div>
    </div>
  );
};

export  { AllProjectsIdeas, IdeaCardContainer };
