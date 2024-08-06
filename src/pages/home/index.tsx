/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useTrendingMovieListQuery } from '@hooks/react-query/use-query-trending';
import MovieList from '@pages/home/components/trending-movie-list/movie-list';
import UpcomingMovieList from '@pages/home/components/upcoming-movie-list/upcoming-movie-list';
import styled from 'styled-components';

const Home = () => {
  const { data: trendingMovieData, isLoading, isError } = useTrendingMovieListQuery();

  return (
    <S.Container>
      <UpcomingMovieList />
      <MovieList title="이번 주 🌎 트렌드" data={trendingMovieData} isLoading={isLoading} />
    </S.Container>
  );
};
export default Home;

const S = {
  Container: styled.div``,
};
