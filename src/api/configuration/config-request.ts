import axios from '@api/axios';

const configurationRequest = {
  fetchRegionConfig: async () => {
    try {
      const { data } = await axios.get(`configuration/countries?language=ko`);
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
