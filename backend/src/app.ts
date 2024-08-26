import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { StreamChat } from 'stream-chat';
import { STREAM_APP_KEY, STREAM_SECRET } from '../constants';
import { createHMAC } from 'utils';

export const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.post('/token', async (req, res, next) => {
  try {
    const { sender, receiver } = req.body;
    const serverClient = StreamChat.getInstance(STREAM_APP_KEY, STREAM_SECRET);
    // Upsert user
    await serverClient.upsertUsers([
      {
        id: sender,
        name: sender,
      },
      {
        id: receiver,
        name: receiver,
      },
    ]);

    // Create channel between them
    const channelName = createHMAC([sender, receiver].sort());
    const channel = serverClient.channel('messaging', channelName, {
      created_by_id: sender,
    });
    await channel.create();

    // Add members to this channel
    await channel.addMembers([sender, receiver]);
    // Create auth token for the requester
    const token = serverClient.createToken(sender);
    
    res.send({ token, channelName });
  } catch (error) {
    return next(error);
  }
});
