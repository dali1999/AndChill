import { TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import UpcomingMovieListSkeleton from '@components/skeleton/upcoming-movie-list-skeleton';
import { useUpcomingMovieListsQuery } from '@hooks/react-query/use-query-movie-lists';
import styled from 'styled-components';
import UpcomingMovieItem from './upcoming-movie-item';

const UpcomingMovieList = () => {
  const { data: upcomingMovieData, isLoading } = useUpcomingMovieListsQuery();
  return (
    <S.Container>
      <S.SectionTitle>📆 개봉 예정인 영화들</S.SectionTitle>
      {isLoading ? (
        <UpcomingMovieListSkeleton />
      ) : (
        <S.UpcomingMovieList>
          {upcomingMovieData?.results.map((movie: TMovieListsItem) => (
            <UpcomingMovieItem data={movie} key={movie.id} />
          ))}
        </S.UpcomingMovieList>
      )}
    </S.Container>
  );
};
export default UpcomingMovieList;

const S = {
  Container: styled.section`
    padding: 30px 0;
  `,

  SectionTitle: styled.h2`
    margin-bottom: 20px;
  `,

  UpcomingMovieList: styled.ul`
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    display: flex;
    gap: 40px;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
};
