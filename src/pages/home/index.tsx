import styled from 'styled-components';
import UpcomingMovieList from './components/upcoming-movie-list/upcoming-movie-list';

const Home = () => {
  return (
    <S.Container>
      <UpcomingMovieList />
      <UpcomingMovieList />
    </S.Container>
  );
};
export default Home;

const S = {
  Container: styled.div``,
};
