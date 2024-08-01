import { TRegionConfigItem } from '@api/configuration/config-request.type';
import { useRegionStore } from '@stores/region';
import styled from 'styled-components';
import { NOT_SUPPORTED_REGIONS } from '../constants/not-supported-regions';

interface TRegionSelectModalProps {
  regionData: TRegionConfigItem[];
}

const RegionSelectModal = ({ regionData }: TRegionSelectModalProps) => {
  const { setRegion } = useRegionStore((state) => ({
    region: state.region,
    setRegion: state.setRegion,
  }));

  const handleRegionItemClick = (regionCode: string) => {
    setRegion(regionCode);
    location.reload();
  };

  return (
    <S.Container>
      {regionData
        .filter((region) => !NOT_SUPPORTED_REGIONS.includes(region.iso_3166_1))
        .map((region) => {
          return (
            <S.RegionItem onClick={() => handleRegionItemClick(region.iso_3166_1)} key={region.iso_3166_1}>
              <S.FlagIconSkeleton></S.FlagIconSkeleton>
              <S.FlagIcon src={region.flag_icon} />
              <S.RegionName>{region.native_name}</S.RegionName>
            </S.RegionItem>
          );
        })}
    </S.Container>
  );
};

export default RegionSelectModal;
const S = {
  Container: styled.ul`
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
    box-shadow: rgba(0, 0, 0, 0.7) 0px 5px 20px;
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--gray01);
      border-radius: 10px;
      height: 130px;
    }
  `,

  RegionItem: styled.li`
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 150px;
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
