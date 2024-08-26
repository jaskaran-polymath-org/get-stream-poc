/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import "stream-chat-react/dist/css/v2/index.css";
import "./layout.css";
import ChatPage from "./ChatPage";
import axios from "axios";

const callApi = async (sender: any, receiver: any) => {
  try {
    const { data } = await axios.post("http://localhost:9876/token", {
      sender,
      receiver,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const App = (): any => {
  const [sender, setSender] = useState();
  const [receiver, setReceiver] = useState();
  const [chatInfo, setChatInfo] = useState(undefined);

  const handleButtonClick = async () => {
    if (!sender || !receiver)
      window.alert("Complete the form before proceeding...");

    const data = await callApi(sender, receiver);
    setChatInfo(data);
  };

  if (chatInfo && sender && receiver)
    return (
      <ChatPage
        sender={sender}
        receiver={receiver}
        token={chatInfo.token}
        channelName={chatInfo.channelName}
      />
    );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        flexDirection: "column",
      }}
    >
      <h2>Start a Chat</h2>
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          name="sender"
          placeholder="Your username"
          style={{ padding: "10px", width: "100%" }}
          onChange={(e) => setSender(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          name="receiver"
          placeholder="Chat with"
          style={{ padding: "10px", width: "100%" }}
          onChange={(e) => setReceiver(e.target.value)}
        />
      </div>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={handleButtonClick}
      >
        Submit
      </button>
    </div>
  );
};

export default App;
