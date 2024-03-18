import React, { useState } from 'react';
import axios from 'axios';
import Logout from './Logout';
import io from "socket.io-client";

const OrganizationLogin = () => {
  axios.defaults.withCredentials = true;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/org/login', { email, password });
      console.log(fetchUserId());
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error('Error:', error); // Handle error
    }
  };
  async function fetchUserId() {
    try {
      const response = await axios.get("http://localhost:3000/userId", {
        withCredentials: true // Send cookies with the request
      });
      console.log("User ID:", response.data.userId);
      setUserId(response.data.userId);

      // Establish socket connection after setting userId
      const newSocket = io("http://localhost:3000", {
        transports: ["websocket", "polling", "flashsocket"],
        auth: {
          userId: response.data.userId
        }
      });

      newSocket.on("connect", () => {
        console.log("Connected to server!");
        // Perform actions based on connection establishment
      });

      return () => {
        newSocket.disconnect();
      };
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Organization Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
      <Logout />
    </div>
  );
};

export default OrganizationLogin;