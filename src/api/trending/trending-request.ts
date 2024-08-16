import axios from '@api/axios';

const trendingRequest = {
  fetchTrendingMovieList: async (language: string) => {
    try {
      const { data } = await axios.get(`trending/movie/week?language=${language}`);
      return data;
    } catch (error) {
      return error;
    }
  },
} as const;

export default trendingRequest;
