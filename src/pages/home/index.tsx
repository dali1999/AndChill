import { useTrendingMovieListQuery } from '@hooks/react-query/use-query-trending';
import MovieList from '@pages/home/components/trending-movie-list/movie-list';
import UpcomingMovieList from '@pages/home/components/upcoming-movie-list/upcoming-movie-list';
import styled from 'styled-components';
// original_title.desc
// popularity.desc
// revenue.desc
// primary_release_date.desc
// title.desc
// vote_average.desc
// vote_count.desc

const Home = () => {
  const { data: trendingMovieData, isLoading: isTrendingLoading } = useTrendingMovieListQuery();

  return (
    <S.Container>
      <UpcomingMovieList />
      <MovieList
        title="이번 주 🌎 트렌드"
        trendingMovieData={trendingMovieData}
        isTrendingMovieLoading={isTrendingLoading}
      />

      <MovieList />
      <MovieList />
      <MovieList />
    </S.Container>
  );
};
export default Home;

const S = {
  Container: styled.div`
    padding: 0 5%;
  `,
};
