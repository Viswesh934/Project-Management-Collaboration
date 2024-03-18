import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Assuming you have axios installed
import Logout from "../Login/Logout";
import * as jwt_decode from "jwt-decode"; // Import jwt-decode library to decode JWT tokens

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Function to fetch user type based on the decoded JWT token
    const fetchUserType = async () => {
      const token = getCookie("jwt"); // Get the JWT token from cookies
    
      if (token) {
        try {
          const response = await axios.get("http://localhost:3000/usertype");
          const userType = response.data; // Accessing the data property of the response
    
          setUserType(userType); // Setting user type
          setIsLoggedIn(true); // Marking user as logged in
        } catch (error) {
          // Handle error
          console.error("Error fetching user type:", error);
        }
      }
    
      setIsLoading(false); // Marking loading as complete
    };
    

    fetchUserType();
  }, []);

  // Function to get cookie value by name
  const getCookie = (name) => {
    const cookieValue = document.cookie.match(
      "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : null;
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    // Logic for logout
    setIsLoggedIn(false);
    setShowDropdown(false);
    // Clear the token from cookies
  };
  return (
    <div className="bg-white border-b border-gray-200 h-16 flex items-center justify-between">
      <div className="ml-8">
        <Link to="/" className="text-gray-800 text-xl font-bold">
          CoLab Pro
        </Link>
      </div>
      <div className="flex items-center">
        <div className="mr-4">
          <Link
            to="/projects"
            className="text-gray-800 hover:text-gray-700 font-bold"
          >
            Projects
          </Link>
        </div>
        <div className="mr-4">
          <Link
            to="/projectideas"
            className="text-gray-800 hover:text-gray-700 font-bold"
          >
            Project Ideas
          </Link>
        </div>
        <div className="mr-4">
          <Link
            to="/community"
            className="text-gray-800 hover:text-gray-700 font-bold"
          >
            Community
          </Link>
        </div>
        <div className="mr-4">
          <Link
            to="/contactus"
            className="text-gray-800 hover:text-gray-700 font-bold"
          >
            Contact Us
          </Link>
        </div>
        <div className="mr-4">
          <Link
            to="/resources"
            className="text-gray-800 hover:text-gray-700 font-bold"
          >
            Resources
          </Link>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={handleDropdownClick}
            className="text-gray-800 hover:text-gray-700 font-bold focus:outline-none"
          >
            {isLoggedIn ? "Dashboard" : "Profile"}
            <svg
              className="fill-current h-4 w-4 ml-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 8.586 9.414 9.293 8l4.657 4.657H3.343z" />
            </svg>
          </button>
          {showDropdown && (
            <ul className="absolute right-0 mt-2 origin-top-right bg-white border border-gray-200 rounded shadow-lg z-10">
              {isLoggedIn &&
              (userType === "organization" || userType === "member") ? (
                <div>
                  <li className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li
                    className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    <Logout />
                  </li>
                </div>
              ) : (
                <div>
                  <li className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                    <Link to="/login">Login</Link>
                  </li>
                  <li className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                    <Link to="/signup">Signup</Link>
                  </li>
                </div>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
