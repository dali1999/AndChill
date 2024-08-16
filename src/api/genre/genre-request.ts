import axios from '@api/axios';

const genreRequest = {
  fetchGenreList: async (language: string) => {
    try {
      const { data } = await axios.get(`genre/movie/list?language=${language}`);
      if (!data.genres[0].name) {
        const { data } = await axios.get(`genre/movie/list?language=en`);
        return data;
      }

      return data;
    } catch (error) {
      return error;
    }
  },
} as const;

export default genreRequest;
