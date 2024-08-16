import axios from '@api/axios';

const movieRequest = {
  fetchMovieDetails: async (movieId: number, language: string) => {
    try {
      const { data } = await axios.get(`movie/${movieId}?language=${language}`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchMovieImages: async (movieId: number) => {
    try {
      const { data } = await axios.get(`movie/${movieId}/images?language=en`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchMovieVideos: async (movieId: number, language: string) => {
    try {
      const { data } = await axios.get(`movie/${movieId}/videos?language=${language}`);
      if (data.results.length === 0) {
        const { data } = await axios.get(`movie/${movieId}/videos?language=en`);
        return data;
      } else {
        return data;
      }
    } catch (error) {
      return error;
    }
  },

  fetchMovieRecommendations: async (movieId: number, language: string) => {
    try {
      const { data } = await axios.get(`movie/${movieId}/recommendations?language=${language}`);
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

  fetchSimilarMovies: async (movieId: number, language: string) => {
    try {
      const { data } = await axios.get(`movie/${movieId}/similar?language=${language}`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchMovieSites: async (movieId: number, language: string) => {
    try {
      const { data } = await axios.get(`movie/${movieId}/watch/providers?language=${language}`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchMovieCredits: async (movieId: number, language: string) => {
    try {
      const { data } = await axios.get(`movie/${movieId}/credits?language=${language}`);
      return data;
    } catch (error) {
      return error;
    }
  },
} as const;

export default movieRequest;
