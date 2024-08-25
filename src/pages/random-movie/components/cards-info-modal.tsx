import polygon from '@assets/icons/polygon-top.svg';
import styled from 'styled-components';
import { CARD_INFO } from '../constants/card-info';
import { dotGlowAnimation } from '../style/card-animation';

const CardsInfoModal = () => {
  return (
    <S.Container>
      <S.CardsInfo>
        {Object.entries(CARD_INFO).map(([key, value]) => (
          <S.CardInfoItem key={key}>
            <S.ColorDot style={{ backgroundColor: value.originColor }} $color={value.color}></S.ColorDot>
            <S.Rank>{key.charAt(0).toUpperCase() + key.slice(1)}</S.Rank>
          </S.CardInfoItem>
        ))}
      </S.CardsInfo>
      <S.Polygon src={polygon} />
    </S.Container>
  );
};

export default CardsInfoModal;

const S = {
  Container: styled.div`
    position: absolute;
    top: 40px;
    right: -48px;
    z-index: 10;
  `,

  CardsInfo: styled.ul`
    border-radius: 10px;
    background-color: var(--indigo04);
    width: 114px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    padding: 0 20px;
    gap: 10px;
  `,

  CardInfoItem: styled.li`
    display: flex;
    align-items: center;
    gap: 10px;
  `,

  ColorDot: styled.div<{ $color: string }>`
    width: 16px;
    height: 16px;
    border-radius: 20px;
    animation: ${(props) => dotGlowAnimation(props.$color)} 1.8s infinite;
  `,

  Rank: styled.p`
    font-size: 13px;
    font-weight: 100;
  `,

  Polygon: styled.img`
    position: absolute;
    top: -12px;
    left: calc(50% - 15px);
    width: 30px;
    height: 30px;
    z-index: -1;
  `,
};
