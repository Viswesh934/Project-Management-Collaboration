import React, { useState } from "react";
import axios from "axios";

const ProjectFormDialog = ({ isOpen, onClose, addProject }) => {
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    tech: [], // Change to an array for multiple tech used
    teamMembers: [],
    githubLink: "",
    googledoclink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure teamMembers is converted to an array
    let teamMembersArray = [];
    if (formData.teamMembers) {
      // If teamMembers is not empty, split it
      if (typeof formData.teamMembers === 'string') {
        // If teamMembers is a string, split it
        teamMembersArray = formData.teamMembers.split(",").map(member => member.trim());
      } else if (Array.isArray(formData.teamMembers)) {
        // If teamMembers is already an array, use it directly
        teamMembersArray = formData.teamMembers;
      }
    }
  
    const newProject = {
      ...formData,
      techUsed: formData.tech.split(",").map((tech) => tech.trim()), // Split and trim tech stack
      teamMembers: teamMembersArray, // Use the formatted teamMembers array
    };
  
    try {
      const response = await axios.post("http://localhost:3000/createproject", newProject);
      const createdProject = response.data;
      addProject(createdProject);
      onClose();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };
  

  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? "" : "hidden"}`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <input type="text" placeholder="Name" name="title" value={formData.title} onChange={handleChange} className="mb-2 block" required />
              <input type="text" placeholder="Description" name="description" value={formData.description} onChange={handleChange} className="mb-2 block" required />
              <input type="text" placeholder="Image URL" name="image" value={formData.image} onChange={handleChange} className="mb-2 block" />
              <input type="text" placeholder="Tech Used (comma-separated)" name="tech" value={formData.tech} onChange={handleChange} className="mb-2 block" required />
              <input type="text" placeholder="Team Members (comma-separated)" name="teamMembers" value={formData.teamMembers} onChange={handleChange} className="mb-2 block" />
              <input type="text" placeholder="GitHub Link" name="githubLink" value={formData.githubLink} onChange={handleChange} className="mb-2 block" required />
              <input type="text" placeholder="Google Doc Link" name="googledoclink" value={formData.googledoclink} onChange={handleChange} className="mb-2 block" />
              <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Add Project
              </button>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Add Project
              </button>
              <button
                onClick={onClose}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectFormDialog;
