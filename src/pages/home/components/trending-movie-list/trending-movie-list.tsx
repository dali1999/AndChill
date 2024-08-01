import { TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import UpcomingMovieListSkeleton from '@components/skeleton/upcoming-movie-list-skeleton';
import { useTrendingMovieListQuery } from '@hooks/react-query/use-query-trending';
import { fadeIn } from '@styles/animations';
import styled from 'styled-components';
import TrendingMovieItem from './trending-movie-item';

const TrendingMovieList = () => {
  const { data: trendingMovieData, isLoading } = useTrendingMovieListQuery();

  return (
    <S.Container>
      <S.SectionTitle>이번 주 🌎 트렌드</S.SectionTitle>
      {isLoading ? (
        <UpcomingMovieListSkeleton />
      ) : trendingMovieData?.total_results === 0 ? (
        <UpcomingMovieListSkeleton text="영화 정보가 없습니다" />
      ) : (
        <S.TrendingMovieList>
          {trendingMovieData?.results.map((movie: TMovieListsItem) => (
            <TrendingMovieItem data={movie} key={movie.id} />
          ))}
        </S.TrendingMovieList>
      )}
    </S.Container>
  );
};
export default TrendingMovieList;

const S = {
  Container: styled.section`
    padding: 30px 0;
  `,

  SectionTitle: styled.h2`
    margin-bottom: 20px;
  `,

  TrendingMovieList: styled.ul`
    overflow-x: auto;
    display: flex;
    gap: 40px;
    animation: ${fadeIn} 0.5s ease-in;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  NoDataContainer: styled.div``,
};
