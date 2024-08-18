import styled from 'styled-components';
import Shuffle from './components/movie-cards-shuffle';

const RandomMovie = () => {
  return (
    <S.Container>
      <S.Title>오늘은 무슨 영화 볼까?</S.Title>
      <S.CardsBackground></S.CardsBackground>
      <Shuffle />
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
  `,

  Title: styled.h2`
    padding-bottom: 12px;
  `,

  CardsBackground: styled.div`
    background-color: var(--indigo02);
    position: absolute;
    top: 64px;
    width: 740px;
    height: 690px;
    border-radius: 18px;
  `,
};
