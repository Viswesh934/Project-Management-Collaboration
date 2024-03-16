import React, { useState, useEffect } from "react";
import axios from "axios";

const EditableField = ({ label, value, name, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1">{label}:</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="border rounded px-2 py-1"
      />
    </div>
  );
};

const DisplayField = ({ label, value }) => {
  return (
    <div>
      <p>
        <strong>{label}:</strong>
      </p>
      <ul>
        {Array.isArray(value)
          ? value.map((interest, index) => <li key={index}>{interest}</li>)
          : <li>{value}</li>
        }
      </ul>
    </div>
  );
};


const MemberProfile = () => {
  axios.defaults.withCredentials = true;
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    skills: [],
    githubUsername: "",
    contact: "", // Added for edit
    interests: "", // Added for edit
    twitter: "", // Added for edit
    github: "", // Added for edit
    linkedin: "", // Added for edit
  });

  useEffect(() => {
    fetchMemberProfile();
  }, []);

  const fetchMemberProfile = async () => {
    try {
      const response = await axios.get("http://localhost:3000/mem/memberprofile");
      const userData = response.data;
      console.log(userData);
      setFormData(userData);
    } catch (error) {
      console.error("Error fetching member profile:", error);
    }
  };

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

  const handleSaveClick = async () => {
    try {
      await axios.patch("http://localhost:3000/mem/editprofile", formData);
      console.log("Member profile updated successfully.");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating member profile:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Member Profile</h2>
      {editMode ? (
        <div>
          {/* Editable fields */}
          <EditableField label="Name" value={formData.name} name="name" onChange={handleInputChange} />
          <EditableField label="Email" value={formData.email} name="email" onChange={handleInputChange} />
          <EditableField label="Skills" value={formData.skills.join(", ")} name="skills" onChange={handleInputChange} />
          <EditableField label="Contact" value={formData.contact} name="contact" onChange={handleInputChange} />
          <EditableField label="Interests" value={formData.interests} name="interests" onChange={handleInputChange} />
          <EditableField label="Twitter" value={formData.twitter} name="twitter" onChange={handleInputChange} />
          <EditableField label="GitHub" value={formData.github} name="github" onChange={handleInputChange} />
          <EditableField label="LinkedIn" value={formData.linkedin} name="linkedin" onChange={handleInputChange} />

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
          <DisplayField label="Name" value={formData.name} />
          <DisplayField label="Email" value={formData.email} />
          <DisplayField label="Skills" value={formData.skills.join(", ")} />
          <DisplayField label="Contact" value={formData.contact} />
          <DisplayField label="Interests" value={formData.interests} />

          <DisplayField label="Twitter" value={formData.twitter} />
          <DisplayField label="GitHub" value={formData.github} />
          <DisplayField label="LinkedIn" value={formData.linkedin} />

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
