/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { TRegionConfigItem } from '@api/configuration/config-request.type';
import { useRegionConfigQuery } from '@hooks/react-query/use-query-config';
import { useRegionStore } from '@stores/region';
import styled from 'styled-components';
import RegionSelectModal from './region-select-modal';

const RegionSelectButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const region = useRegionStore((state) => state.region);
  const { data: regionData, isLoading, isError } = useRegionConfigQuery();

  const selectedRegionIcon = `/region-flags/${region.toLowerCase()}.svg`;

  const addFlagIcons = (regions: TRegionConfigItem[]): TRegionConfigItem[] => {
    return regions.map((region) => {
      const flagIconPath = `/region-flags/${region.iso_3166_1.toLowerCase()}.svg`;
      return { ...region, flag_icon: flagIconPath };
    });
  };

  const regionsWithFlags = regionData ? addFlagIcons(regionData) : [];

  return (
    <S.Container onClick={() => setIsOpen(!isOpen)}>
      <S.SelectedRegionIcon src={selectedRegionIcon} />
      {isOpen && <RegionSelectModal regionData={regionsWithFlags} />}
    </S.Container>
  );
};

export default RegionSelectButton;

const S = {
  Container: styled.div`
    position: relative;
    cursor: pointer;
    background-color: var(--dark02);
    border-radius: 5px;
    padding: 8px 10px;
    flex-shrink: 0;
  `,

  SelectedRegionIcon: styled.img`
    width: 25px;
    border-radius: 2px;
  `,
};
