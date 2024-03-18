import React, { useState, useEffect } from "react";
import axios from "axios";

const OrganizationProfile = () => {
  axios.defaults.withCredentials = true;
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchOrganizationProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/org/profile");
        setFormData(response.data.organizationProfile);
      } catch (error) {
        console.error("Error fetching organization profile:", error);
      }
    };
    fetchOrganizationProfile();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      // Check if formData is defined and contains necessary fields
      if (!formData || !formData.name) {
        console.error("Error: formData or name is undefined");
        return;
      }

      // Send PUT request to update organization profile
      const response = await axios.put(
        "http://localhost:3000/org/editprofile",
        formData
      );
      console.log("Organization profile updated:", response.data);
      // After saving, exit edit mode
      setEditMode(false);
    } catch (error) {
      console.error("Error updating organization profile:", error);
    }
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
        name="orgname"
        value={formData.name}
        onChange={handleInputChange} // Add onChange handler
        className="border rounded px-2 py-1"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Email:</label>
      <input
        type="text"
        name="emailid"
        value={formData.email}
        onChange={handleInputChange} // Add onChange handler
        className="border rounded px-2 py-1"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Sector:</label>
      <input
        type="text"
        name="industry"
        value={formData.industry}
        onChange={handleInputChange} // Add onChange handler
        className="border rounded px-2 py-1"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Phone Number:</label>
      <input
        type="text"
        name="contact"
        value={formData.contact}
        onChange={handleInputChange} // Add onChange handler
        className="border rounded px-2 py-1"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Description:</label>
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleInputChange} // Add onChange handler
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
)
 : (
        <div>
          {/* Display mode */}
          <div>
            <p>
              <strong>Name:</strong> {formData.name}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Sector:</strong> {formData.industry}
            </p>
            <p>
              <strong>Phone Number:</strong> {formData.contact}
            </p>
            <p>
              <strong>Description:</strong> {formData.description}
            </p>
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
