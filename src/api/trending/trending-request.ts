import axios from '@api/axios';

const trendingRequest = {
  fetchTrendingMovieList: async () => {
    try {
      const { data } = await axios.get(`trending/movie/week?language=ko`);
      return data;
    } catch (error) {
      return error;
    }
  },
} as const;

export default trendingRequest;
