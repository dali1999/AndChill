import axios from '@api/axios';

const discoverRequest = {
  fetchMovieDiscoverResults: async (language: string, sortBy: string, genres?: string, page?: number) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?language=${language}&sort_by=${sortBy}&with_genres=${genres}&page=${page}`,
      );
      return data;
    } catch (error) {
      return error;
    }
  },
} as const;

export default discoverRequest;
