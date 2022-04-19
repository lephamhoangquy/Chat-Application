// import { useRef } from 'react';
import { io } from 'socket.io-client';

let socket;

export default {
  initSocketConnection: () => {
    let token = localStorage.getItem('token') || null;
    socket = io(process.env.SERVER_URL, {
      query: { token },
    });
    socket.on('connect', () => {
      console.log('connecting socket...');
    });
  },
  disconnectSocket: () => {
    console.log('disconnecting socket...');
    if (socket) {
      socket.disconnect();
    }
  },
  subscribeToChat: (cb) => {
    socket.on('private message', (data) => {
      cb(null, data);
    });
  },
  sendMessage: (sender, conversationID, message) => {
    socket.emit('private message', {
      sender,
      conversationID,
      message,
    });
  },
  getUserOnline: (cb) => {
    socket.on('usersOnline', (users) => {
      cb(null, users);
    });
  },
};
