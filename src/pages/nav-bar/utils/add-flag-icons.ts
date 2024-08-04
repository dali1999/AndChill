import { TRegionConfigItem } from '@api/configuration/config-request.type';

export const addFlagIcons = (regions: TRegionConfigItem[]): TRegionConfigItem[] => {
  return regions.map((region) => {
    const flagIconPath = `/region-flags/${region.iso_3166_1.toLowerCase()}.svg`;
    return { ...region, flag_icon: flagIconPath };
  });
};
