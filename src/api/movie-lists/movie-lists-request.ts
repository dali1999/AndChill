import axios from '@api/axios';
import { getRegionAndLanguageUrl } from '@utils/get-region-and-language-url';

const movieListsRequest = {
  fetchNowPlayingMovieList: async (region: string, language: string) => {
    try {
      const { data } = await axios.get(`movie/now_playing?${getRegionAndLanguageUrl(region, language)}`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchPopularMovieList: async (region: string, language: string) => {
    try {
      const { data } = await axios.get(`movie/popular?${getRegionAndLanguageUrl(region, language)}`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchTopRatedMovieList: async (region: string, language: string) => {
    try {
      const { data } = await axios.get(`movie/top_rated?${getRegionAndLanguageUrl(region, language)}`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchUpcomingMovieList: async (region: string, language: string) => {
    try {
      const { data } = await axios.get(`movie/upcoming?${getRegionAndLanguageUrl(region, language)}`);
      return data;
    } catch (error) {
      return error;
    }
  },
} as const;

export default movieListsRequest;
