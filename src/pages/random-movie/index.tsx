import styled from 'styled-components';
import Shuffle from './components/movie-cards-shuffle';

const RandomMovie = () => {
  return (
    <S.Container>
      <S.Title>오늘은 무슨 영화 볼까?</S.Title>
      <Shuffle />
    </S.Container>
  );
};

export default RandomMovie;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 5%;
    padding-top: 40px;
  `,

  Title: styled.h2`
    padding-bottom: 18px;
  `,
};
