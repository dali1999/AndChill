import { useTrendingMovieListQuery } from '@hooks/react-query/use-query-trending';
import MovieListSection from '@pages/home/components/movie-list/movie-list-section';
import UpcomingMovieList from '@pages/home/components/upcoming-movie-list/upcoming-movie-list';
import styled from 'styled-components';

const Home = () => {
  const { data: trendingMovieData, isLoading: isTrendingLoading } = useTrendingMovieListQuery();

  return (
    <S.Container>
      <UpcomingMovieList />
      <MovieListSection
        title="이번 주 🌎 트렌드"
        trendingMovieData={trendingMovieData}
        isTrendingMovieLoading={isTrendingLoading}
      />
      <MovieListSection />
      <MovieListSection />
      <MovieListSection />
    </S.Container>
  );
};
export default Home;

const S = {
  Container: styled.div`
    padding: 0 5%;
  `,
};
