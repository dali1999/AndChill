import axios from '@api/axios';

const movieSearchRequest = {
  fetchMovieSearchResults: async (searchQuery: string | number, language: string) => {
    try {
      const { data } = await axios.get(`search/movie?query=${searchQuery}&include_adult=true&language=${language}`);
      return data;
    } catch (error) {
      return error;
    }
  },
} as const;

export default movieSearchRequest;
