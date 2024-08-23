import { TMovieListsFetchRes } from '@api/movie-lists/movie-lists-request.type';
import MovieList from '@pages/home/components/movie-list/movie-list';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import MovieDetailsSectionTemplate from './movie-details-section-template';

interface TMovieSimilarProps {
  data: TMovieListsFetchRes;
}

const MovieSimilar = ({ data }: TMovieSimilarProps) => {
  const { t } = useTranslation();
  const similarMoviesData = data.results;
  return (
    <MovieDetailsSectionTemplate title={t('movie_details.similar.title')}>
      {similarMoviesData.length !== 0 ? (
        <MovieList data={similarMoviesData} />
      ) : (
        <S.NoSimilarMoviesText>{t('movie_details.similar.nodata')}</S.NoSimilarMoviesText>
      )}
    </MovieDetailsSectionTemplate>
  );
};

export default MovieSimilar;

const S = {
  NoSimilarMoviesText: styled.div`
    font-size: 14px;
    color: var(--indigo08);
  `,
};
