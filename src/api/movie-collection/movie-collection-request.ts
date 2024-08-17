import axios from '@api/axios';

const movieCollectionRequest = {
  fetchMovieCollection: async (collectionId: number, language: string) => {
    try {
      const { data } = await axios.get(`collection/${collectionId}?language=${language}`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchMovieCollectionImages: async (collectionId: number, language: string) => {
    try {
      const { data } = await axios.get(
        `collection/${collectionId}/images?include_image_language=${language}&language=${language}`,
      );
      if (data.backdrops.length === 0 && data.posters.length === 0) {
        const { data } = await axios.get(`collection/${collectionId}/images?include_image_language=en&language=en`);
        return data;
      } else {
        return data;
      }
    } catch (error) {
      return error;
    }
  },
} as const;

export default movieCollectionRequest;
