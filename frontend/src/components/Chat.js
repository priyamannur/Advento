import React, { useState } from 'react';
import './Chat.css';
import axios from "axios";
import Sideb from "./Sideb.js";

function Chat() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [recentPrompts, setRecentPrompts] = useState([]);
  const [showOlderPrompts, setShowOlderPrompts] = useState(false);

  const sendMessage = async () => {
    const message = userInput.trim();
    if (message) {
      setUserInput('');
      const newChatHistory = [...chatHistory, { sender: 'user', message }];
      setChatHistory(newChatHistory);
      if (!showOlderPrompts) {
        setRecentPrompts([...recentPrompts, message]);
      }

      try {
        const jmessage = { message };
        const response = await axios.post("/chat", jmessage);
        setChatHistory([...newChatHistory, { sender: 'server', message: response.data}]);
        setShowOlderPrompts(true); // Once a new message is sent, show older prompts along with it
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="Chat">
      <h1>Travel Assistant with Ed</h1>
      <div className="main-container">
        {/* <Sideb recentPrompts={recentPrompts} showOlderPrompts={showOlderPrompts} /> */}
        <div className="chat-container">
          <div className="chat-content">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`chat-message ${chat.sender}`}>
                <p>{chat.message}</p>
              </div>
            ))}
          </div>
          <div className="input-container">
            <input type="text" value={userInput} onChange={handleInputChange} placeholder="Type your message to Ed" />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
