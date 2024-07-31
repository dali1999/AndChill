import configurationRequest from '@api/configuration/config-request';
import { TLanguageConfigItem, TRegionConfigItem } from '@api/configuration/config-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useRegionConfigQuery = () => {
  const query = useQuery<TRegionConfigItem[], Error>({
    queryKey: [QUERY_KEY.regionConfig],
    queryFn: async () => await configurationRequest.fetchRegionConfig(),
  });
  return query;
};

export const useLanguageConfigQuery = () => {
  const query = useQuery<TLanguageConfigItem[], Error>({
    queryKey: [QUERY_KEY.languageConfig],
    queryFn: async () => await configurationRequest.fetchLanguageConfig(),
  });
  return query;
};
