import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 h-16 flex items-center justify-between">
      <div className="ml-8">
        <Link to="/" className="text-gray-800 text-xl font-bold">
          CoLab Pro
        </Link>
      </div>
      <div className="flex items-center mr-8">
        <div className="mr-4">
          <Link to="/projects" className="text-gray-800 hover:text-gray-700 font-bold">
            Projects
          </Link>
        </div>
        <div className="mr-4">
          <Link to="/community" className="text-gray-800 hover:text-gray-700 font-bold">
            Community
          </Link>
        </div>
        <div className="mr-4">
          <Link to="/contact-us" className="text-gray-800 hover:text-gray-700 font-bold">
            Contact Us
          </Link>
        </div>
        <div className="mr-4">
          <Link to="/resources" className="text-gray-800 hover:text-gray-700 font-bold">
            Resources
          </Link>
        </div>
        <div className="mr-4">
          <Link to="/login" className="text-gray-800 hover:text-gray-700 font-bold">
            Login
          </Link>
        </div>
        <div className="mr-4">
          <Link to="/signup" className="text-gray-800 hover:text-gray-700 font-bold">
            Signup
          </Link>
        </div>
        <div>
          {isLoggedIn ? (
            <div className="relative">
              <button className="flex items-center focus:outline-none" onClick={() => setIsLoggedIn(false)}>
                <img src="https://via.placeholder.com/40x40" alt="Profile" className="w-10 h-10 rounded-full" />
                <span className="ml-2 text-gray-800 font-bold">Dashboard</span>
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 8.586 9.414 9.293 8l4.657 4.657H3.343z" />
                </svg>
              </button>
              <ul className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 rounded shadow-lg z-10">
                <li className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                  <Link to="/logout">Logout</Link>
                </li>
              </ul>
            </div>
          ) : (
            <button className="flex items-center focus:outline-none" onClick={() => setIsLoggedIn(true)}>
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.707 10.293A8 8 0 1 1 2.293 2.293a8 8 0 0 1 14.414 7.586z" />
                <path d="M8.586 14.586 10 12.914 11.414 14.586a1 1 0 0 1-1.893 0l-2.787-2.787a1 1 0 0 1 1.414-1.414l2.787 2.787zm7.284-7.284A5.975 5.975 0 0 0 4 9.75v2.062a10.007 10.007 0 0 1-.939 2.062l-1.893-1.893a5.97 5.97 0 0 0 8.586-8.586z" />
              </svg>
              <span className="ml-2 text-gray-800 font-bold">Login</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
