import axios from '@api/axios';

const movieSearchRequest = {
  fetchMovieSearchResults: async (searchQuery: string | number) => {
    try {
      const { data } = await axios.get(`movie/?query=${searchQuery}&language=ko&region=KR`);
      return data;
    } catch (error) {
      return error;
    }
  },
} as const;

export default movieSearchRequest;
