import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling", "flashsocket"],
});

function MessageApp() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiverId, setReceiverId] = useState(""); // State to store receiver ID
  const [senderId, setSenderId] = useState(""); // State to store sender ID

  useEffect(() => {
    // Socket.io event listeners
    socket.on("connect", () => {
      console.log("Connected to server!");
      // Perform actions based on connection establishment
    });

    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage && receiverId && senderId) {
      try {
        const data = {
          message: newMessage,
          jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjQ0ZDA3ODVkYTdiZTgwZTU2YTg1NSIsImlhdCI6MTcxMDY2NTU4MSwiZXhwIjoxNzEwNjY2NTgxfQ.GxQgW9PwKYhT3QS3xU-v-C2X3VgprbaR5JzuUfCuitk", // Assuming you have a valid JWT token for authentication
        };
        const response = await axios.post(
          `http://localhost:3000/send/${receiverId}`,
          data
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error sending message:", error);
      }
      socket.emit("sendMessage", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter message..."
        />
        <input
          type="text"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          placeholder="Receiver ID"
        />
        <input
          type="text"
          value={senderId}
          onChange={(e) => setSenderId(e.target.value)}
          placeholder="Sender ID"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default MessageApp;
