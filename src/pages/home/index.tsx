import styled from 'styled-components';
import UpcomingMovieList from './components/upcoming-movies';

const Home = () => {
  return (
    <S.Container>
      <UpcomingMovieList />
    </S.Container>
  );
};
export default Home;

const S = {
  Container: styled.div`
    padding: 0 10%;
  `,
};
