import { useState } from 'react';
import infoIcon from '@assets/icons/info.svg';
import { device } from '@styles/breakpoints';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import CardsInfoModal from './components/cards-info-modal';
import Shuffle from './components/movie-cards-shuffle';

const RandomMovie = () => {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);
  return (
    <S.Container>
      <S.TitleWrapper>
        <S.Title>{t('random_movie.title')}</S.Title>
        <S.InfoWrapper>
          <S.InfoIcon src={infoIcon} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} />
          {hovered && <CardsInfoModal />}
        </S.InfoWrapper>
      </S.TitleWrapper>
      <Shuffle />
      <S.CardsBackground></S.CardsBackground>
    </S.Container>
  );
};

export default RandomMovie;

const S = {
  Container: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 5%;
    padding-top: 20px;
    background-color: var(--dark09);
    @media ${device.mobile} {
      margin-top: 100px;
      height: 640px;
    }
  `,

  TitleWrapper: styled.div`
    padding: 6px 0 0 16px;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    @media ${device.mobile} {
      padding: 6px 0 0 0px;
    }
  `,

  Title: styled.h2`
    padding-bottom: 12px;
    font-size: 20px;
    font-weight: 600;
    @media ${device.mobile} {
      font-size: 18px;
    }
  `,

  InfoIcon: styled.img`
    margin: 0 0 10px 10px;
    width: 18px;
    height: 18px;
    cursor: pointer;
  `,

  InfoWrapper: styled.div`
    position: relative;
  `,

  CardsBackground: styled.div`
    background-color: var(--indigo02);
    position: absolute;
    top: 74px;
    width: 90%;
    height: 700px;
    border-radius: 18px;
    @media ${device.mobile} {
      width: 100%;
      height: 540px;
    }
  `,
};
