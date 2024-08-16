import axios from '@api/axios';

const configurationRequest = {
  fetchRegionConfig: async (language: string) => {
    try {
      const { data } = await axios.get(`configuration/countries?language=${language}`);
      return data;
    } catch (error) {
      return error;
    }
  },

  fetchLanguageConfig: async () => {
    try {
      const { data } = await axios.get(`configuration/languages`);
      return data;
    } catch (error) {
      return error;
    }
  },
} as const;

export default configurationRequest;
