import { TRegionConfigItem } from '@api/configuration/config-request.type';

export const filteredRegionsBySearchQuery = (regionLists: TRegionConfigItem[], searchQuery: string) => {
  return regionLists?.filter((region) => {
    return searchQuery.trim() === '' || region.native_name.includes(searchQuery);
  });
};
