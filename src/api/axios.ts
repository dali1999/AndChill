import axios from 'axios';

export interface TAxiosError {
  errorMessage: string;
  errorCode: string;
  statusCode: number;
}

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = import.meta.env.VITE_API_KEY;
    if (!accessToken) {
      window.location.href = '/login';
      return config;
    }

    config.headers['Authorization'] = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default instance;
