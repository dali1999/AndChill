/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { TRegionConfigItem } from '@api/configuration/config-request.type';
import { useRegionConfigQuery } from '@hooks/react-query/use-query-config';
import { useRegionStore } from '@stores/region';
import styled from 'styled-components';
import { NOT_SUPPORTED_REGIONS } from '../constants/not-supported-regions';

interface TRegionSelectButtonProps {
  setRegion: (iso_3166_1: string) => void;
}

const RegionSelectButton = ({ setRegion }: TRegionSelectButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const region = useRegionStore((state) => state.region);
  const { data: regionData, isLoading, isError } = useRegionConfigQuery();

  const selectedRegionIcon = `/region-flags/${region.toLowerCase()}.svg`;

  const handleRegionItemClick = (regionCode: string) => {
    setRegion(regionCode);
    location.reload();
  };

  const addFlagIcons = (regions: TRegionConfigItem[] | undefined) => {
    return regions?.map((region) => {
      const flagIconPath = `/region-flags/${region.iso_3166_1.toLowerCase()}.svg`;
      return { ...region, flag_icon: flagIconPath };
    });
  };

  const regionsWithFlags = addFlagIcons(regionData);

  return (
    <S.RegionSelectButton onClick={() => setIsOpen(!isOpen)}>
      <S.SelectedRegionIcon src={selectedRegionIcon} />
      {isOpen &&
        (isLoading ? (
          <p>로딩중...</p>
        ) : (
          <S.RegionList>
            {regionsWithFlags
              ?.filter((region) => !NOT_SUPPORTED_REGIONS.includes(region.iso_3166_1))
              .map((region) => {
                return (
                  <S.RegionItem onClick={() => handleRegionItemClick(region.iso_3166_1)} key={region.iso_3166_1}>
                    <S.FlagIconSkeleton></S.FlagIconSkeleton>
                    <S.FlagIcon src={region.flag_icon} />
                    <S.RegionName>{region.native_name}</S.RegionName>
                  </S.RegionItem>
                );
              })}
          </S.RegionList>
        ))}
    </S.RegionSelectButton>
  );
};

export default RegionSelectButton;

const S = {
  RegionSelectButton: styled.div`
    position: relative;
    cursor: pointer;
    background-color: var(--dark02);
    border-radius: 5px;
    padding: 5px 10px;
    flex-shrink: 0;
  `,

  SelectedRegionIcon: styled.img`
    width: 25px;
  `,

  RegionList: styled.ul`
    z-index: 9999;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    position: absolute;
    background-color: var(--dark03);
    border-radius: 5px;
    top: 40px;
    right: 0;
    padding: 10px;
    height: 325px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  RegionItem: styled.li`
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 200px;
    &:hover {
    }
  `,

  FlagIconSkeleton: styled.div`
    width: 35px;
    aspect-ratio: 4/3;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    z-index: 2;
  `,

  FlagIcon: styled.img`
    position: absolute;
    width: 35px;
    border-radius: 2px;
    z-index: 1;
  `,

  RegionName: styled.span`
    font-size: 13px;
  `,
};
