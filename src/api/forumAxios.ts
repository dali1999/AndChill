import axios from 'axios';

const forumInstance = axios.create({
  baseURL: import.meta.env.VITE_FORUM_API_BASE_URL,
  headers: {
    'Access-Control-Allow-Credentials': true,
    'ngrok-skip-browser-warning': true,
  },
});

export default forumInstance;
