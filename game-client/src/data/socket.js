import config from '../config';
const { io } = require('socket.io-client');

export let socket;

export const loadSocket = () => {
  if (socket == null) {
    socket = io(config.socketUrl);
  }
  
  return socket;
};
