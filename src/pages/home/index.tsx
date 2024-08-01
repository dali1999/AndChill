import styled from 'styled-components';
import TrendingMovieList from './components/trending-movie-list/trending-movie-list';
import UpcomingMovieList from './components/upcoming-movie-list/upcoming-movie-list';

const Home = () => {
  return (
    <S.Container>
      <UpcomingMovieList />
      <TrendingMovieList />
    </S.Container>
  );
};
export default Home;

const S = {
  Container: styled.div``,
};
