import TrendingMovieList from '@pages/home/components/trending-movie-list/trending-movie-list';
import UpcomingMovieList from '@pages/home/components/upcoming-movie-list/upcoming-movie-list';
import styled from 'styled-components';

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
