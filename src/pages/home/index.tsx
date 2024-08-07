/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useMovieDiscoverResultsQuery } from '@hooks/react-query/use-query-discover';
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
  const sortByVotes = 'vote_count.desc';
  const horrorGenres = [27, 53].join();
  const animationGenres = [16].join();
  const westGenres = [37].join();
  const { data: discoveredMovieData, isLoading: isHorrorLoading } = useMovieDiscoverResultsQuery(
    sortByVotes,
    horrorGenres,
  );
  const { data: animationMovieData, isLoading: isAnimationLoading } = useMovieDiscoverResultsQuery(
    sortByVotes,
    animationGenres,
  );
  const { data: westMovieData, isLoading: isWestLoading } = useMovieDiscoverResultsQuery(sortByVotes, westGenres);

  return (
    <S.Container>
      <UpcomingMovieList />
      <MovieList title="이번 주 🌎 트렌드" data={trendingMovieData} isLoading={isTrendingLoading} />
      <MovieList title="공포, 스릴러" data={discoveredMovieData} isLoading={isHorrorLoading} />
      <MovieList title="애니메이션" data={animationMovieData} isLoading={isAnimationLoading} />
      <MovieList title="서부" data={westMovieData} isLoading={isWestLoading} />
    </S.Container>
  );
};
export default Home;

const S = {
  Container: styled.div``,
};
