import React, { useState } from "react";

const OrganizationProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "Example Organization",
    email: "example@example.com",
    sector: "Technology",
    phoneNumber: "123-456-7890",
    description: "This is a description of the organization.",
    githubUsername: "exampleorg",
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
    // Perform save operation (e.g., update organization profile)
    // Here, you might send a request to your backend API to update the organization profile
    console.log("Updated organization profile:", formData);
    // After saving, exit edit mode
    setEditMode(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Organization Profile</h2>
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
            <label className="block mb-1">Sector:</label>
            <input
              type="text"
              name="sector"
              value={formData.sector}
              onChange={handleInputChange}
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description:</label>
            <textarea
              name="description"
              value={formData.description}
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
            <p><strong>Sector:</strong> {formData.sector}</p>
            <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
            <p><strong>Description:</strong> {formData.description}</p>
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

export default OrganizationProfile;
