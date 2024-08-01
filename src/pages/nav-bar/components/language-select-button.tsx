/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useRegionConfigQuery } from '@hooks/react-query/use-query-config';
import styled from 'styled-components';

interface TRegionSelectButtonProps {
  setRegion: (iso_3166_1: string) => void;
}

const RegionSelectButton = ({ setRegion }: TRegionSelectButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: regionData, isLoading, isError } = useRegionConfigQuery();

  const handleRegionItemClick = (regionCode: string) => {
    setRegion(regionCode);
    location.reload();
  };

  return (
    <S.RegionSelectButton onClick={() => setIsOpen(!isOpen)}>
      지역
      {isOpen && (
        <S.RegionList>
          {regionData?.map((region) => {
            return (
              <S.RegionItem onClick={() => handleRegionItemClick(region.iso_3166_1)} key={region.iso_3166_1}>
                {region.native_name}
              </S.RegionItem>
            );
          })}
        </S.RegionList>
      )}
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
    padding: 7px 10px;
    flex-shrink: 0;
  `,

  RegionList: styled.ul`
    z-index: 9999;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    position: absolute;
    background-color: var(--dark03);
    border-radius: 5px;
    top: 40px;
    right: 0;
    padding: 10px;
    height: 300px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  RegionItem: styled.li`
    width: 150px;
    &:hover {
      color: var(--gray02);
    }
  `,
};
