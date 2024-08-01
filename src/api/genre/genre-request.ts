import axios from '@api/axios';

const genreRequest = {
  fetchGenreList: async () => {
    try {
      const { data } = await axios.get(`genre/movie/list?language=ko`);
      return data;
    } catch (error) {
      return error;
    }
  },
} as const;

export default genreRequest;
