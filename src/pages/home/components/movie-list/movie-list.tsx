import { useEffect, useState } from 'react';
import { TGenre } from '@api/genre/genre-request.type';
import { TMovieListsFetchRes, TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import leftRight from '@assets/icons/arrow-left.svg';
import arrowRight from '@assets/icons/arrow-right.svg';
import CarouselButton, { Button } from '@components/carousel/carousel-button';
import MovieListSkeleton from '@components/skeleton/movie-list-skeleton';
import { useMovieDiscoverResultsQuery } from '@hooks/react-query/use-query-discover';
import { useGenreListQuery } from '@hooks/react-query/use-query-genre';
import MovieItem from '@pages/home/components/movie-list/movie-item';
import { getRandomGenre } from '@pages/home/utils/get-random-genre';
import { fadeIn } from '@styles/animations';
import styled from 'styled-components';

interface TMovieListProps {
  title?: string;
  trendingMovieData?: TMovieListsFetchRes;
  isTrendingMovieLoading?: boolean;
}

const PER_SLIDE = 2;

const MovieList = ({ title, trendingMovieData, isTrendingMovieLoading }: TMovieListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomGenre, setRandomGenre] = useState<TGenre[] | undefined>();
  const genreIdsStr = randomGenre?.map((genre) => genre.id).join();
  const genreNamesStr = randomGenre?.map((genre) => genre.name).join(' • ');

  const { data: genreData } = useGenreListQuery();

  useEffect(() => {
    if (genreData?.genres) {
      setRandomGenre(getRandomGenre(genreData.genres));
    }
  }, [genreData]);

  const { data: randomMovieData, isLoading: isRandomMovieLoading } = useMovieDiscoverResultsQuery(
    'vote_count.desc',
    genreIdsStr,
  );

  const movieData = trendingMovieData || randomMovieData;
  const isLoading = isTrendingMovieLoading || isRandomMovieLoading;
  const length = movieData?.results.length || 0;

  const renderMovieList = () => (
    <S.MovieList $curIndex={currentIndex}>
      {movieData?.results.map((movie: TMovieListsItem) => (
        <li key={movie.id}>
          <MovieItem data={movie} />
        </li>
      ))}
    </S.MovieList>
  );

  return (
    <S.Container>
      <S.SectionTitle>{title || genreNamesStr}</S.SectionTitle>
      {isLoading ? (
        <MovieListSkeleton />
      ) : length === 0 ? (
        <MovieListSkeleton text="영화 정보가 없습니다" />
      ) : (
        <S.MovieListWrapper>{renderMovieList()}</S.MovieListWrapper>
      )}

      <CarouselButton
        length={length}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        perSlide={2}
        positionTop={30 + 32 + 20}
        positionLR={-25}
        width={60}
        height={300}
      />
    </S.Container>
  );
};

export default MovieList;

const S = {
  Container: styled.section`
    position: relative;
    padding: 30px 0;
    &:hover ${Button} {
      opacity: 0.8;
    }
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

  MovieListWrapper: styled.div`
    overflow: hidden;
  `,

  MovieList: styled.ul<{ $curIndex: number }>`
    padding-top: 20px;
    display: flex;
    gap: 38px;
    animation: ${fadeIn} 0.5s ease-in;
    transform: ${({ $curIndex }) => `translateX(-${$curIndex * 238}px)`};
    transition: 0.3s ease-in-out;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
};
