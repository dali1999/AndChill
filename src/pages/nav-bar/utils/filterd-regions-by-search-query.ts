import { TRegionConfigItem } from '@api/configuration/config-request.type';
// ---------------------- 한,    영,    중,  아랍,  프,   독,  스,   일,   러,   포르, 베트,  이탈, 태국, 인도네시아
const allowedCountries = ['KR', 'US', 'CN', 'AE', 'FR', 'DE', 'ES', 'JP', 'RU', 'PT', 'VN', 'IT', 'TH', 'ID'];

export const filteredRegionsBySearchQuery = (regionLists: TRegionConfigItem[], searchQuery: string) => {
  const allowedRegions = regionLists.filter((region) => allowedCountries.includes(region.iso_3166_1));

  return allowedRegions?.filter((region) => {
    return searchQuery.trim() === '' || region.native_name.includes(searchQuery);
  });
};
