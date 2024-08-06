import { TMovieListsFetchRes, TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import UpcomingMovieListSkeleton from '@components/skeleton/upcoming-movie-list-skeleton';
import TrendingMovieItem from '@pages/home/components/trending-movie-list/trending-movie-item';
import { fadeIn } from '@styles/animations';
import styled from 'styled-components';

interface TMovieListProps {
  title: string;
  data: TMovieListsFetchRes | undefined;
  isLoading: boolean;
}

const MovieList = ({ title, data, isLoading }: TMovieListProps) => {
  return (
    <S.Container>
      <S.SectionTitle>{title}</S.SectionTitle>
      {isLoading ? (
        <UpcomingMovieListSkeleton />
      ) : data?.total_results === 0 ? (
        <UpcomingMovieListSkeleton text="영화 정보가 없습니다" />
      ) : (
        <S.TrendingMovieList>
          {data?.results.map((movie: TMovieListsItem) => <TrendingMovieItem data={movie} key={movie.id} />)}
        </S.TrendingMovieList>
      )}
    </S.Container>
  );
};
export default MovieList;

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
