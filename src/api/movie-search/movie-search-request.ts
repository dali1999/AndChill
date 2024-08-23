import axios from '@api/axios';

const movieSearchRequest = {
  fetchMovieSearchResults: async (searchQuery: string | number, language: string, page: number) => {
    try {
      const { data } = await axios.get(`search/movie?query=${searchQuery}&language=${language}&page=${page}`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchCollectionSearchResults: async (searchQuery: string | number, language: string, page: number) => {
    try {
      const { data } = await axios.get(`search/collection?query=${searchQuery}&language=${language}&page=${page}`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchPeopleSearchResults: async (searchQuery: string | number, language: string, page: number) => {
    try {
      const { data } = await axios.get(`search/person?query=${searchQuery}&language=${language}&page=${page}`);
      return data;
    } catch (error) {
      return error;
    }
  },
} as const;

export default movieSearchRequest;
