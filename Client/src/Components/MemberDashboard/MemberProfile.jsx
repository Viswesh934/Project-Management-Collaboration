import React, { useState } from "react";

const MemberProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    gender: "Male",
    skills: ["React", "Node.js", "JavaScript"],
    githubUsername: "johndoe",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // Perform save operation (e.g., update member profile)
    // Here, you might send a request to your backend API to update the member profile
    console.log("Updated member profile:", formData);
    // After saving, exit edit mode
    setEditMode(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Member Profile</h2>
      {editMode ? (
        <div>
          {/* Editable fields */}
          <div className="mb-4">
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Gender:</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Skills:</label>
            <input
              type="text"
              name="skills"
              value={formData.skills.join(", ")}
              onChange={handleInputChange}
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">GitHub Username:</label>
            <input
              type="text"
              name="githubUsername"
              value={formData.githubUsername}
              onChange={handleInputChange}
              className="border rounded px-2 py-1"
            />
          </div>
          <button
            onClick={handleSaveClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          {/* Display mode */}
          <div>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Gender:</strong> {formData.gender}</p>
            <p><strong>Skills:</strong> {formData.skills.join(", ")}</p>
            <p><strong>GitHub Username:</strong> {formData.githubUsername}</p>
          </div>
          <button
            onClick={handleEditClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default MemberProfile;
