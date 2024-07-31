import axios from '@api/axios';

const movieListsRequest = {
  fetchNowPlayingMovieLists: async () => {
    try {
      const { data } = await axios.get(`movie/now_playing?region=KR&language=ko`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchPopularMovieLists: async () => {
    try {
      const { data } = await axios.get(`movie/popular?region=KR&language=ko`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchTopRatedMovieLists: async () => {
    try {
      const { data } = await axios.get(`movie/top_rated?region=KR&language=ko`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchUpcomingMovieLists: async () => {
    try {
      const { data } = await axios.get(`movie/upcoming?region=KR&language=ko`);
      return data;
    } catch (error) {
      return error;
    }
  },
} as const;

export default movieListsRequest;
