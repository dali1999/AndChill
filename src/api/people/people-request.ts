import axios from '@api/axios';

const peopleRequest = {
  fetchPeopleDetails: async (peopleId: number, language: string) => {
    try {
      const { data } = await axios.get(`person/${peopleId}?language=${language}`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchPeopleImages: async (peopleId: number) => {
    try {
      const { data } = await axios.get(`person/${peopleId}/images`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchPeopleCredits: async (peopleId: number, language: string) => {
    try {
      const { data } = await axios.get(`person/${peopleId}/movie_credits?language=${language}`);
      return data;
    } catch (error) {
      return error;
    }
  },
} as const;

export default peopleRequest;
