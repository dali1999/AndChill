import styled from 'styled-components';
import Shuffle from './components/movie-cards-shuffle';

const RandomMovie = () => {
  return (
    <S.Container>
      <Shuffle />
    </S.Container>
  );
};

export default RandomMovie;

const S = {
  Container: styled.div`
    padding: 0 5%;
  `,
};
