import { useEffect, useState } from 'react';
import { TGenre } from '@api/genre/genre-request.type';
import { TMovieListsFetchRes } from '@api/movie-lists/movie-lists-request.type';
import MovieListSkeleton from '@components/skeleton/movie-list-skeleton';
import { useMovieDiscoverResultsQuery } from '@hooks/react-query/use-query-discover';
import { useGenreListQuery } from '@hooks/react-query/use-query-genre';
import { getRandomGenre } from '@pages/home/utils/get-random-genre';
import { useRegionStore } from '@stores/region';
import styled from 'styled-components';
import MovieList from './movie-list';

interface TMovieListSectionProps {
  title?: string;
  trendingMovieData?: TMovieListsFetchRes;
  isTrendingMovieLoading?: boolean;
}

const MovieListSection = ({ title, trendingMovieData, isTrendingMovieLoading }: TMovieListSectionProps) => {
  const [randomGenre, setRandomGenre] = useState<TGenre[] | undefined>();
  const genreIdsStr = randomGenre?.map((genre) => genre.id).join();
  const genreNamesStr = randomGenre?.map((genre) => genre.name).join(' • ');

  const { lang } = useRegionStore((state) => ({ lang: state.language }));
  const { data: genreData } = useGenreListQuery(lang);

  useEffect(() => {
    if (genreData?.genres) {
      setRandomGenre(getRandomGenre(genreData.genres));
    }
  }, [genreData]);

  const { data: randomMovieData, isLoading: isRandomMovieLoading } = useMovieDiscoverResultsQuery(
    'vote_count.desc',
    genreIdsStr,
    lang,
  );

  const movieData = trendingMovieData || randomMovieData;
  const isLoading = isTrendingMovieLoading || isRandomMovieLoading;
  const length = movieData?.results.length || 0;

  return (
    <S.Container>
      <S.SectionTitle>{title || genreNamesStr}</S.SectionTitle>
      {isLoading ? (
        <MovieListSkeleton />
      ) : length === 0 ? (
        <MovieListSkeleton text="영화 정보가 없습니다" />
      ) : (
        <MovieList data={movieData?.results} />
      )}
    </S.Container>
  );
};

export default MovieListSection;

const S = {
  Container: styled.section`
    position: relative;
    padding: 30px 0;
  `,

  SectionTitle: styled.h2`
    height: 32px;
    position: relative;
    padding-left: 15px;
    &::before {
      content: '';
      background-color: var(--yellow01);
      width: 3px;
      height: 100%;
      position: absolute;
      left: 0;
    }
  `,
};
