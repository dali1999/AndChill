/* eslint-disable no-unused-vars */
import { TRegionConfigItem } from '@api/configuration/config-request.type';
import { useRegionConfigQuery } from '@hooks/react-query/use-query-config';
import { addFlagIcons } from '@pages/nav-bar/utils/add-flag-icons';
import { filteredRegionsBySearchQuery } from '@pages/nav-bar/utils/filterd-regions-by-search-query';
import styled from 'styled-components';

interface TRegionSelectProps {
  lang: string;
  selectedRegion: string;
  setSelectedRegion: (regionArr: string) => void;
  setSelectedRegionName: (regionArr: string) => void;
}

const RegionSelect = ({ lang, selectedRegion, setSelectedRegion, setSelectedRegionName }: TRegionSelectProps) => {
  const { data: regionData, isLoading, refetch } = useRegionConfigQuery(lang);
  const filteredRegionList = regionData && filteredRegionsBySearchQuery(regionData, '');
  const regionsWithFlags = filteredRegionList && addFlagIcons(filteredRegionList);

  const handleClickRegion = (region: TRegionConfigItem) => {
    setSelectedRegion(region.iso_3166_1);
    console.log(region.native_name);
    setSelectedRegionName(region.native_name);
  };

  return (
    <div>
      <S.Title>국가 선택</S.Title>
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
              {/* <S.RegionName>{region.native_name}</S.RegionName> */}
            </S.RegionItem>
          );
        })}
      </S.RegionList>
    </div>
  );
};

export default RegionSelect;

const S = {
  Title: styled.h3`
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 12px;
  `,

  RegionList: styled.ul`
    display: flex;
    gap: 10px;
    width: 100%;
    flex-wrap: wrap;
  `,

  RegionItem: styled.li<{ $isSelected: boolean }>`
    background-color: var(--indigo03);
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    padding: 6px 8px;
    border: 3px solid ${({ $isSelected }) => ($isSelected ? 'var(--yellow03)' : 'var(--indigo03)')};
  `,

  FlagIconSkeleton: styled.div`
    width: 35px;
    height: calc(35px * 3 / 4);
    background-color: rgba(0, 0, 0, 0.9);
    border-radius: 2px;
    z-index: 0;
  `,

  FlagIcon: styled.img`
    position: absolute;
    width: 35px;
    height: calc(35px * 3 / 4);
    border-radius: 2px;
    z-index: 1;
    opacity: 0.8;
  `,

  RegionName: styled.span`
    font-size: 12px;
    width: 90px;
  `,
};
