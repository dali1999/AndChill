/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useRegionConfigQuery } from '@hooks/react-query/use-query-config';
import RegionSelectModal from '@pages/nav-bar/components/region-select-modal';
import { addFlagIcons } from '@pages/nav-bar/utils/add-flag-icons';
import { useRegionStore } from '@stores/region';
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
        <S.SelectedRegionIcon src={selectedRegionIcon} />
      </S.RegionSelectButton>
      {isOpen && <RegionSelectModal regionData={regionsWithFlags} handleSetIsOpen={handleSetIsOpen} />}
    </S.Container>
  );
};

export default RegionSelectButton;

const S = {
  Container: styled.div`
    position: relative;
  `,

  RegionSelectButton: styled.div`
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
