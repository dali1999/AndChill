import { useState } from 'react';
import infoIcon from '@assets/icons/info.svg';
import styled from 'styled-components';
import CardsInfoModal from './components/cards-info-modal';
import Shuffle from './components/movie-cards-shuffle';

const RandomMovie = () => {
  const [randomText, setRandomText] = useState('');
  const [hovered, setHovered] = useState(false);
  return (
    <S.Container>
      <S.TitleWrapper>
        <S.Title>오늘 뭐 볼까?</S.Title>
        <S.InfoIcon src={infoIcon} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} />
        {hovered && <CardsInfoModal />}
      </S.TitleWrapper>
      <S.CardsBackground></S.CardsBackground>
      <Shuffle setRandomText={setRandomText} />
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
    background-color: var(--indigo01);
    position: absolute;
    top: 64px;
    width: 90%;
    height: 690px;
    border-radius: 18px;
  `,
};
