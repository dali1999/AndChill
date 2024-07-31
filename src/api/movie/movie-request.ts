import axios from '@api/axios';

const movieRequest = {
  fetchMovieDetails: async (movieId: number) => {
    try {
      const { data } = await axios.get(`movie/${movieId}?language=ko`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchMovieImages: async (movieId: number) => {
    try {
      const { data } = await axios.get(`movie/${movieId}/images?language=ko`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchMovieRecommendations: async (movieId: number) => {
    try {
      const { data } = await axios.get(`movie/${movieId}/recommendations?language=ko`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchMovieReviews: async (movieId: number) => {
    try {
      const { data } = await axios.get(`movie/${movieId}/reviews`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchSimilarMovies: async (movieId: number) => {
    try {
      const { data } = await axios.get(`movie/${movieId}/similar?language=ko`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchMovieSites: async (movieId: number) => {
    try {
      const { data } = await axios.get(`movie/${movieId}/watch/providers?language=ko`);
      return data;
    } catch (error) {
      return error;
    }
  },
} as const;

export default movieRequest;
