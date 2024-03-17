import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectFormDialog from "./Projectdialog";

const OrganizationProjects = () => {
  axios.defaults.withCredentials = true;
  const [projects, setProjects] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:3000/allprojects");
      const allProjects = response.data.projects;
      setProjects(allProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const addProject = async () => {
    window.location.reload();
  };

  const handleEdit = (id) => {
    setEditProjectId(id);
  };

  const handleSave = async (id, updatedProject) => {
    try {
      await axios.put(`http://localhost:3000/editproject/${id}`, updatedProject);
      setEditProjectId(null);
      fetchProjects(); // Fetch projects again to reflect changes
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/deleteproject/${id}`);
      setProjects(projects.filter(project => project._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <button
          onClick={openDialog}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Project
        </button>
      </div>
      <ProjectFormDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        addProject={addProject}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project._id} className="bg-white shadow-md rounded p-4">
            {editProjectId === project._id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave(project._id, {
                    title: e.target.title.value || project.title,
                    description: e.target.description.value || project.description,
                    githubLink: e.target.githubLink.value || project.githubLink,
                    techUsed: e.target.techUsed.value || project.techUsed,
                    teamMembers: e.target.teamMembers.value || project.teamMembers,
                  });
                }}
              >
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Title"
                  defaultValue={project.title}
                  className="mb-2 border border-gray-300 rounded px-2 py-1"
                />
                <textarea
                  name="description"
                  placeholder="Enter Description"
                  defaultValue={project.description}
                  className="mb-2 border border-gray-300 rounded px-2 py-1"
                />
                <input
                  type="text"
                  name="githubLink"
                  placeholder="Enter GitHub Link"
                  defaultValue={project.githubLink}
                  className="mb-2 border border-gray-300 rounded px-2 py-1"
                />
                <input
                  type="text"
                  name="techUsed"
                  placeholder="Enter Technologies Used"
                  defaultValue={project.techUsed}
                  className="mb-2 border border-gray-300 rounded px-2 py-1"
                />
                <input
                  type="text"
                  name="teamMembers"
                  placeholder="Enter Team Members"
                  defaultValue={project.teamMembers}
                  className="mb-2 border border-gray-300 rounded px-2 py-1"
                />
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditProjectId(null)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </form>
              
            ) : (
              <>
                
                <h2 className="text-xl font-bold">{project.title}</h2>
                <p className="text-gray-600">{project.description}</p>
                <p className="text-gray-600">Technologies Used: {project.techUsed}</p>
                <p className="text-gray-600">Team Members: {project.teamMembers}</p>
                <div className="mt-4">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500"
                  >
                    <button>GitHub</button>
                  </a>
                  <button
                    onClick={() => handleEdit(project._id)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationProjects;
