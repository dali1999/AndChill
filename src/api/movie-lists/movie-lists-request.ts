import axios from '@api/axios';

const movieListsRequest = {
  fetchNowPlayingMovieList: async (region: string, language: string) => {
    try {
      const { data } = await axios.get(`movie/now_playing?region=${region}&language=${language}}`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchPopularMovieList: async (region: string, language: string) => {
    try {
      const { data } = await axios.get(`movie/popular?region=${region}&language=${language}}`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchTopRatedMovieList: async (region: string, language: string) => {
    try {
      const { data } = await axios.get(`movie/top_rated?region=${region}&language=${language}}`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchUpcomingMovieList: async (region: string, language: string) => {
    try {
      const { data } = await axios.get(`movie/upcoming?region=${region}&language=${language}`);
      return data;
    } catch (error) {
      return error;
    }
  },
} as const;

export default movieListsRequest;
