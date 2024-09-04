import axios from 'axios';

const forumInstance = axios.create({
  baseURL: 'https://7ce0-175-117-199-226.ngrok-free.app/api',
  headers: {
    'Access-Control-Allow-Credentials': true,
    'ngrok-skip-browser-warning': true,
  },
});

export default forumInstance;
