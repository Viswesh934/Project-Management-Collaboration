import React, { useState } from "react";
import NavigationBar from "../Homepage/Navigationbar";
import OrganizationProjects from "../OrganizationDashboard/OrganizationProjects";
import MemberProfile from "./MemberProfile";
import MemberProjectIdeas from "./MemberProjectIdeas";
/*
import AnotherOptionComponent from "./AnotherOptionComponent";
*/

const MemberDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Profile");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <NavigationBar />
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-800 text-white">
          <h1 className="text-lg font-bold p-4">Dashboard</h1>
          <ul>
            <li
              className={`p-4 cursor-pointer ${
                selectedOption === "Profile" && "bg-gray-700"
              }`}
              onClick={() => handleOptionChange("Profile")}
            >
              Profile
            </li>
            <li
              className={`p-4 cursor-pointer ${
                selectedOption === "Project Ideas" && "bg-gray-700"
              }`}
              onClick={() => handleOptionChange("Project Ideas")}
            >
              Project Ideas
            </li>
            <li
              className={`p-4 cursor-pointer ${
                selectedOption === "Another Option" && "bg-gray-700"
              }`}
              onClick={() => handleOptionChange("Another Option")}
            >
              Another Option
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-4">
          <h2 className="text-xl font-bold mb-4">{selectedOption}</h2>
          {/* Render content based on selectedOption */}
          {selectedOption === "Profile" && (
            <MemberProfile />
          )}
          {selectedOption === "Project Ideas" && (
            <MemberProjectIdeas />
          )}
          {selectedOption === "Another Option" && (
            <OrganizationProjects />
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
