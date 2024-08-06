import axios from '@api/axios';

const discoverRequest = {
  fetchMovieDiscoverResults: async (genres: string) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?language=ko&page=1&sort_by=revenue.desc&watch_region=KR&with_genres=${genres}`,
      );
      return data;
    } catch (error) {
      return error;
    }
  },
} as const;

export default discoverRequest;
