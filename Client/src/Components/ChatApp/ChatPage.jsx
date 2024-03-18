import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChatPage() {
  axios.defaults.withCredentials = true;
  const [senders, setSenders] = useState([]);
  const [organizationSenders, setOrganizationSenders] = useState([]);
  const [memberSenders, setMemberSenders] = useState([]);
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  useEffect(() => {
    axios.defaults.withCredentials = true;
    // Fetch sender IDs
    const fetchSenderIds = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/senderIds`);
        setSenders(response.data);
        fetchSenderInfo(response.data);
      } catch (error) {
        console.error("Error fetching sender IDs:", error);
      }
    };

    fetchSenderIds();
  }, []);

  const fetchSenderInfo = async (senderIds) => {
    try {
      const organizationInfoPromises = senderIds.map(async (senderId) => {
        try {
          const response = await axios.get(`http://localhost:3000/org/getorganizationinfo/${senderId}`);
          return { type: "organization", data: response.data };
        } catch (error) {
          return null;
        }
      });

      const memberInfoPromises = senderIds.map(async (senderId) => {
        try {
          const response = await axios.get(`http://localhost:3000/mem/getmemberinfo/${senderId}`);
          return { type: "member", data: response.data };
        } catch (error) {
          return null;
        }
      });

      const organizationResults = await Promise.all(organizationInfoPromises);
      const memberResults = await Promise.all(memberInfoPromises);

      const filteredOrganizationSenders = organizationResults.filter((result) => result !== null);
      const filteredMemberSenders = memberResults.filter((result) => result !== null);

      setOrganizationSenders(filteredOrganizationSenders);
      setMemberSenders(filteredMemberSenders);
    } catch (error) {
      console.error("Error fetching sender info:", error);
    }
  };

  const handleSelectSender = (senderId) => {
    // Navigate to the MessageApp component with the selected sender ID as a route parameter
    navigate(`/message-app/${senderId}`);
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      <h1 className="text-3xl text-center py-4 bg-blue-500 text-white">Chat Page</h1>
      <div className="flex-1 flex overflow-x-auto">
        <div className="w-1/2 mx-auto">
          <h2 className="text-xl my-4">All Senders</h2>
          <div>
            <h3 className="text-lg mb-2">Organization Senders</h3>
            <ul className="overflow-y-auto max-h-72">
              {organizationSenders.map((sender, index) => (
                <li key={`org-${index}`} onClick={() => handleSelectSender(sender.data._id)} className="cursor-pointer border-b border-gray-300 py-2">
                  {/* Display sender info */}
                  <p className="text-blue-600">{sender.data.name}</p>
                  <p className="text-gray-600">{sender.data.email}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg mb-2 mt-4">Member Senders</h3>
            <ul className="overflow-y-auto max-h-72">
              {memberSenders.map((sender, index) => (
                <li key={`member-${index}`} onClick={() => handleSelectSender(sender.data._id)} className="cursor-pointer border-b border-gray-300 py-2">
                  {/* Display sender info */}
                  <p className="text-blue-600">{sender.data.name}</p>
                  <p className="text-gray-600">{sender.data.email}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;