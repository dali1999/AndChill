import { TMovieListsFetchRes } from '@api/movie-lists/movie-lists-request.type';
import MovieList from '@pages/home/components/movie-list/movie-list';
import styled from 'styled-components';
import MovieDetailsSectionTemplate from './movie-details-section-template';

interface TMovieSimilarProps {
  data: TMovieListsFetchRes;
}

const MovieSimilar = ({ data }: TMovieSimilarProps) => {
  const similarMoviesData = data.results;
  return (
    <MovieDetailsSectionTemplate title="유사한 영화">
      {similarMoviesData.length !== 0 ? (
        <MovieList data={similarMoviesData} />
      ) : (
        <S.NoSimilarMoviesText>유사한 영화가 없습니다</S.NoSimilarMoviesText>
      )}
    </MovieDetailsSectionTemplate>
  );
};

export default MovieSimilar;

const S = {
  NoSimilarMoviesText: styled.div`
    font-size: 14px;
    color: var(--gray01);
  `,
};
