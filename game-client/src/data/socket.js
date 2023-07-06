import config from '../config';
const { io } = require('socket.io-client');

export let socket;

export const loadSocket = () => {
  if (socket == null) {
    socket = io(config.socketUrl);
    socket.on('error', (payload) => {
      console.error('Error from server: ', payload);
    });

    socket.on('message', (payload) => {
      console.log('Message from server: ', payload);
    });
  }

  return socket;
};
