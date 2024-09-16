import { useEffect, useMemo, useState } from 'react';
import { TGenre } from '@api/genre/genre-request.type';
import { TMovieListsFetchRes } from '@api/movie-lists/movie-lists-request.type';
import MovieListSkeleton from '@components/skeleton/movie-list-skeleton';
import { useMovieDiscoverResultsQuery } from '@hooks/react-query/use-query-discover';
import { useGenreListQuery } from '@hooks/react-query/use-query-genre';
import { getRandomGenre } from '@pages/home/utils/get-random-genre';
import { useRegionStore } from '@stores/region';
import { device } from '@styles/breakpoints';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import MovieList from './movie-list';

interface TMovieListSectionProps {
  title?: string;
  trendingMovieData?: TMovieListsFetchRes;
  isTrendingMovieLoading?: boolean;
}

const MovieListSection = ({ title, trendingMovieData, isTrendingMovieLoading }: TMovieListSectionProps) => {
  const { t } = useTranslation();
  const [randomGenre, setRandomGenre] = useState<TGenre[] | undefined>();
  const [page, setPage] = useState(1);
  const genreIdsStr = randomGenre?.map((genre) => genre.id).join();
  const genreNamesStr = randomGenre?.map((genre) => genre.name).join(' • ');

  const { lang } = useRegionStore((state) => ({ lang: state.language }));
  const { data: genreData } = useGenreListQuery(lang);

  useEffect(() => {
    const randomPage = Math.floor(Math.random() * 4) + 1;
    setPage(randomPage);
  }, []);

  useEffect(() => {
    if (genreData?.genres) {
      setRandomGenre(getRandomGenre(genreData.genres));
    }
  }, [genreData]);

  const { data: randomMovieData, isLoading: isRandomMovieLoading } = useMovieDiscoverResultsQuery(
    lang,
    'vote_count.desc',
    genreIdsStr,
    page,
    '',
  );

  const movieData = useMemo(() => trendingMovieData || randomMovieData, [trendingMovieData, randomMovieData]);
  const isLoading = isTrendingMovieLoading || isRandomMovieLoading;
  const length = movieData?.results.length || 0;

  return (
    <S.Container>
      <S.SectionTitle>{title || genreNamesStr}</S.SectionTitle>
      {/* {isLoading ? (
        <MovieListSkeleton />
      ) : length === 0 ? (
        <MovieListSkeleton text={t('home.movielist_nodata')} />
      ) : ( */}
      <MovieList data={movieData?.results} />
      {/* )} */}
    </S.Container>
  );
};

export default MovieListSection;

const S = {
  Container: styled.section`
    position: relative;
    padding: 30px 0;
    @media ${device.mobile} {
      padding: 20px 0;
    }
    ::-webkit-scrollbar {
      display: none;
    }
  `,

  SectionTitle: styled.h2`
    height: 32px;
    position: relative;
    padding-left: 15px;
    @media ${device.mobile} {
      height: 26px;
      font-size: 18px;
    }
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
