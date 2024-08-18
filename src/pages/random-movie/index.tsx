import styled from 'styled-components';
import Shuffle from './components/movie-cards-shuffle';

const RandomMovie = () => {
  return (
    <S.Container>
      <h2>오늘은 무슨 영화 볼까?</h2>
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
    background-color: var(--indigo02);
  `,
};
