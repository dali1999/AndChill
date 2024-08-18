import { TMovieSearchResultsFetchRes } from '@api/movie-search/movie-search-request.type';
import MovieListSkeleton from '@components/skeleton/movie-list-skeleton';
import MovieItem from '@pages/home/components/movie-list/movie-item';
import styled from 'styled-components';

interface TMovieSearchResultsProps {
  isLoading: boolean;
  data: TMovieSearchResultsFetchRes | undefined;
}

const MovieSearchResults = ({ isLoading, data }: TMovieSearchResultsProps) => {
  const length = data?.results.length;

  return (
    <>
      {isLoading ? (
        <MovieListSkeleton height={220} />
      ) : length === 0 ? (
        <MovieListSkeleton text="검색 결과가 없습니다" height={220} />
      ) : (
        <S.SearchResultList>
          {data?.results.map((movie) => <MovieItem key={movie.id} data={movie} />)}
        </S.SearchResultList>
      )}
    </>
  );
};

export default MovieSearchResults;
const S = {
  SearchResultList: styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 40px 20px;
    flex-wrap: wrap;
    width: 100%;
  `,
};
