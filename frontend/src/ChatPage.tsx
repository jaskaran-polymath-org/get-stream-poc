import { useEffect, useState } from "react";
import {
  Channel,
  ChannelHeader,
  Chat,
  Window,
  MessageInput,
  MessageList,
  Thread,
  useCreateChatClient,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import "./layout.css";
import { STREAM_APP_KEY } from "../../backend/constants";

type ChatPageProps = {
  sender: string;
  receiver: string;
  token: string;
  channelName: string;
};

const ChatPage = ({ sender, receiver, channelName, token }: ChatPageProps) => {
  const client = useCreateChatClient({
    apiKey: STREAM_APP_KEY, 
    tokenOrProvider: token,
    userData: { id: sender },
  });
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    if (!client) return;
    const channel = client.channel("messaging", channelName, {
      name: channelName,
      members: [sender, receiver],
    });
    setChannel(channel);
    // client.closeConnection();
    return () => {
      if (channel) {
        channel.closeConnection();
      }
    };
  }, [client]);

  if (!client || !channel) return <div>Loading...</div>;

  return (
    <Chat client={client}>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default ChatPage;
