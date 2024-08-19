import { useState } from 'react';
import styled from 'styled-components';
import Shuffle from './components/movie-cards-shuffle';

const RandomMovie = () => {
  const [randomText, setRandomText] = useState('');
  return (
    <S.Container>
      <S.Title>오늘 뭐 볼까?</S.Title>
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

  Title: styled.h2`
    padding-bottom: 12px;
    font-size: 20px;
    font-weight: 600;
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
