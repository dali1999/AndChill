import { useState } from 'react';
import infoIcon from '@assets/icons/info.svg';
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
        <S.InfoIcon src={infoIcon} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} />
        {hovered && <CardsInfoModal />}
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
  `,

  TitleWrapper: styled.div`
    padding: 6px 0 0 16px;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
  `,

  Title: styled.h2`
    padding-bottom: 12px;
    font-size: 20px;
    font-weight: 600;
  `,

  InfoIcon: styled.img`
    margin: 0 0 10px 10px;
    width: 18px;
    cursor: pointer;
  `,

  CardsBackground: styled.div`
    background-color: var(--indigo02);
    position: absolute;
    top: 74px;
    width: 90%;
    height: 700px;
    border-radius: 18px;
  `,
};
