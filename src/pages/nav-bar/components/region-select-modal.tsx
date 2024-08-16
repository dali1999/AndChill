import { SetStateAction, useState } from 'react';
import { TRegionConfigItem } from '@api/configuration/config-request.type';
import { NOT_SUPPORTED_REGIONS } from '@pages/nav-bar/constants/not-supported-regions';
import { filteredRegionsBySearchQuery } from '@pages/nav-bar/utils/filterd-regions-by-search-query';
import { useRegionStore } from '@stores/region';
import { getLanguageByCountry } from '@utils/get-region-language';
import styled from 'styled-components';

interface TRegionSelectModalProps {
  regionData: TRegionConfigItem[];
  handleSetIsOpen: () => void;
}

const RegionSelectModal = ({ regionData, handleSetIsOpen }: TRegionSelectModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { setRegion } = useRegionStore((state) => ({
    region: state.region,
    setRegion: state.setRegion,
  }));

  const handleRegionItemClick = (regionCode: string) => {
    setRegion(regionCode, getLanguageByCountry(regionCode));
  };

  const handleRegionSearchChange = (e: { currentTarget: { value: SetStateAction<string> } }) => {
    setSearchQuery(e.currentTarget.value);
  };

  const filteredRegionList = filteredRegionsBySearchQuery(regionData, searchQuery);

  return (
    <S.Container>
      <S.SearchBar type="text" placeholder="어떤 국가의 영화 정보를 알고 싶나요?" onChange={handleRegionSearchChange} />
      <S.RegionInfoContainer>
        {filteredRegionList
          .filter((region) => !NOT_SUPPORTED_REGIONS.includes(region.iso_3166_1))
          .map((region) => {
            return (
              <S.RegionItem
                onClick={() => {
                  handleRegionItemClick(region.iso_3166_1);
                  handleSetIsOpen();
                }}
                key={region.iso_3166_1}
              >
                <S.FlagIconSkeleton></S.FlagIconSkeleton>
                <S.FlagIcon src={region.flag_icon} />
                <S.RegionName>{region.native_name}</S.RegionName>
              </S.RegionItem>
            );
          })}
      </S.RegionInfoContainer>
    </S.Container>
  );
};

export default RegionSelectModal;
const S = {
  Container: styled.div`
    position: absolute;
    top: 45px;
    right: 0;
    border-radius: 5px;
    overflow: hidden;
    background-color: var(--indigo04);
    z-index: 100;
    box-shadow: rgba(0, 0, 0, 0.7) 0px 5px 20px;
  `,

  SearchBar: styled.input`
    margin: 10px 10px 5px;
    background-color: var(--indigo02);
    border-radius: 5px;
    padding: 10px;
    width: 340px;
    &::placeholder {
      color: var(--gray02);
    }
  `,

  RegionInfoContainer: styled.ul`
    display: flex;
    flex-wrap: wrap; // 2열 만들기
    gap: 20px;
    max-height: 325px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--gray01);
      border-radius: 10px;
      height: 130px;
    }
    padding: 15px;
  `,

  RegionItem: styled.li`
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 46%; // 2열 만들기
    height: 26px;
  `,

  FlagIconSkeleton: styled.div`
    width: 35px;
    aspect-ratio: 4/3;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    z-index: 0;
  `,

  FlagIcon: styled.img`
    position: absolute;
    width: 35px;
    border-radius: 2px;
    z-index: 1;
  `,

  RegionName: styled.span`
    font-size: 10px;
    width: 95px;
  `,
};
