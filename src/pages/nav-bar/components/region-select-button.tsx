/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useRegionConfigQuery } from '@hooks/react-query/use-query-config';
import RegionSelectModal from '@pages/nav-bar/components/region-select-modal';
import { addFlagIcons } from '@pages/nav-bar/utils/add-flag-icons';
import { useRegionStore } from '@stores/region';
import { device } from '@styles/breakpoints';
import styled from 'styled-components';

const RegionSelectButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { region, lang } = useRegionStore((state) => ({ region: state.region, lang: state.language }));
  const { data: regionData, isLoading, isError, refetch } = useRegionConfigQuery(lang);

  const selectedRegionIcon = `/region-flags/${region.toLowerCase()}.svg`;

  const regionsWithFlags = regionData ? addFlagIcons(regionData) : [];

  const handleSetIsOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    refetch();
  }, [lang, refetch]);

  return (
    <S.Container>
      <S.RegionSelectButton onClick={handleSetIsOpen}>
        <S.SelectedRegionIcon src={selectedRegionIcon} alt="current region flag" />
      </S.RegionSelectButton>
      {isOpen && <RegionSelectModal regionData={regionsWithFlags} handleSetIsOpen={handleSetIsOpen} />}
    </S.Container>
  );
};

export default RegionSelectButton;

const S = {
  Container: styled.div`
    position: relative;
    @media ${device.mobile} {
      position: static;
    }
  `,

  RegionSelectButton: styled.div`
    cursor: pointer;
    background-color: var(--indigo04);
    border-radius: 5px;
    padding: 6px 8px;
    flex-shrink: 0;
    @media ${device.mobile} {
      position: absolute;
      top: 13px;
      padding: 4px 6px;
      right: 3%;
    }
  `,

  SelectedRegionIcon: styled.img`
    width: 30px;
    border-radius: 2px;
    @media ${device.mobile} {
      width: 24px;
      border-radius: 2px;
    }
  `,
};
