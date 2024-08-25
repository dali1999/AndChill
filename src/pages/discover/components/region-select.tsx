/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { TRegionConfigItem } from '@api/configuration/config-request.type';
import { useRegionConfigQuery } from '@hooks/react-query/use-query-config';
import { addFlagIcons } from '@pages/nav-bar/utils/add-flag-icons';
import { filteredRegionsBySearchQuery } from '@pages/nav-bar/utils/filterd-regions-by-search-query';
import { device } from '@styles/breakpoints';
import styled from 'styled-components';

interface TRegionSelectProps {
  lang: string;
  selectedRegion: string;
  setSelectedRegion: (regionArr: string) => void;
}

const RegionSelect = ({ lang, selectedRegion, setSelectedRegion }: TRegionSelectProps) => {
  const [selectedRegionName, setSelectedRegionName] = useState('');
  const { data: regionData } = useRegionConfigQuery(lang);
  const filteredRegionList = regionData && filteredRegionsBySearchQuery(regionData, '');
  const regionsWithFlags = filteredRegionList && addFlagIcons(filteredRegionList);

  const handleClickRegion = (region: TRegionConfigItem) => {
    if (selectedRegion === region.iso_3166_1) {
      setSelectedRegion('');
      setSelectedRegionName('');
    } else {
      setSelectedRegion(region.iso_3166_1);
      setSelectedRegionName(region.native_name);
    }
  };

  return (
    <S.Container>
      <S.TitleWrapper>
        <S.Title>국가</S.Title>
        <S.RegionName>{selectedRegionName ? selectedRegionName : '전체'}</S.RegionName>
      </S.TitleWrapper>
      <S.RegionList>
        {regionsWithFlags?.map((region) => {
          return (
            <S.RegionItem
              key={region.iso_3166_1}
              onClick={() => handleClickRegion(region)}
              $isSelected={selectedRegion === region.iso_3166_1}
            >
              <S.FlagIconSkeleton></S.FlagIconSkeleton>
              <S.FlagIcon src={region.flag_icon} />
            </S.RegionItem>
          );
        })}
      </S.RegionList>
    </S.Container>
  );
};

export default RegionSelect;

const S = {
  Container: styled.div`
    align-items: center;
    gap: 12px;
    @media ${device.mobile} {
      gap: 6px;
    }
  `,

  TitleWrapper: styled.div`
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    color: var(--gray01);
    @media ${device.mobile} {
      margin-bottom: 8px;
    }
  `,

  Title: styled.h3`
    font-size: 16px;
    width: 40px;
  `,

  RegionName: styled.span`
    font-size: 14px;
    color: var(--yellow02);
  `,

  RegionList: styled.ul`
    display: flex;
    gap: 4px;
    width: 100%;
    flex-wrap: wrap;
    @media ${device.mobile} {
      gap: 0px;
    }
  `,

  RegionItem: styled.li<{ $isSelected: boolean }>`
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 4px 5px;
    border: 2px solid ${({ $isSelected }) => ($isSelected ? 'var(--yellow03)' : 'transparent')};
    @media ${device.mobile} {
      padding: 2px;
    }
  `,

  FlagIconSkeleton: styled.div`
    width: 35px;
    height: calc(35px * 3 / 4);
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 2px;
    z-index: 0;
    @media ${device.mobile} {
      width: 30px;
      height: calc(30px * 3 / 4);
    }
  `,

  FlagIcon: styled.img`
    position: absolute;
    width: 35px;
    height: calc(35px * 3 / 4);
    border-radius: 2px;
    z-index: 1;
    opacity: 0.8;
    @media ${device.mobile} {
      width: 30px;
      height: calc(30px * 3 / 4);
    }
  `,
};
