import React, { useEffect, useState } from "react";
import axios from "axios";
import MessageApp from "./MessageApp"; // Import the MessageApp component
import { useNavigate } from "react-router-dom";

function ChatPage() {
  axios.defaults.withCredentials = true;
  const [senders, setSenders] = useState([]);
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  useEffect(() => {
    axios.defaults.withCredentials = true;
    // Fetch sender IDs
    const fetchSenderIds = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/senderIds`);
        setSenders(response.data);
      } catch (error) {
        console.error("Error fetching sender IDs:", error);
      }
    };

    fetchSenderIds();
  }, []);

  const handleSelectSender = (senderId) => {
    // Navigate to the MessageApp component with the selected sender ID as a route parameter
    navigate(`/message-app/${senderId}`);
  };

  return (
    <div>
      <h1>Chat Page</h1>
      <div>
        <h2>All Senders</h2>
        <ul>
          {senders.map((senderId) => (
            <li key={senderId} onClick={() => handleSelectSender(senderId)}>
              {/* Display sender ID */}
              <p>ID: {senderId}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChatPage;
