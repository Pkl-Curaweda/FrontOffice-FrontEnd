import io from 'socket.io-client';
import func from '../../stores/func'

const socket = io(
    'http://localhost:3000', //Development
    {
      query: {
        name: JSON.parse(localStorage.getItem('auth')).user.name
      }
    } 
);

export default {
  connect() {
    return new Promise((resolve, reject) => {
      socket.on('connect', () => {
        resolve();
      });

      socket.on('connect_error', (error) => {
        reject(error);
      });
    });
  },

  disconnect() {
    socket.disconnect();
  },

  on(event, callback) {
    socket.on(event, callback);
  },

  off(event, callback) {
    socket.off(event, callback);
  },

  emit(event, data) {
    socket.emit(event, data);
  }
};
