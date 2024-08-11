import { useEffect, useState } from 'react';
import { TGenre } from '@api/genre/genre-request.type';
import { TMovieListsFetchRes, TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import leftRight from '@assets/icons/arrow-left.svg';
import arrowRight from '@assets/icons/arrow-right.svg';
import MovieListSkeleton from '@components/skeleton/movie-list-skeleton';
import { useMovieDiscoverResultsQuery } from '@hooks/react-query/use-query-discover';
import { useGenreListQuery } from '@hooks/react-query/use-query-genre';
import MovieItem from '@pages/home/components/trending-movie-list/movie-item';
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
  const [randomGenre, setRandomGenre] = useState<TGenre | undefined>();

  const { data: genreData } = useGenreListQuery();

  useEffect(() => {
    if (genreData?.genres) {
      setRandomGenre(getRandomGenre(genreData.genres));
    }
  }, [genreData]);

  const { data: randomMovieData, isLoading: isRandomMovieLoading } = useMovieDiscoverResultsQuery(
    'vote_count.desc',
    randomGenre?.id ?? 0,
  );

  const movieData = trendingMovieData || randomMovieData;
  const isLoading = isTrendingMovieLoading || isRandomMovieLoading;
  const length = movieData?.results.length || 0;

  const handleNext = () => {
    if (currentIndex < length - PER_SLIDE) {
      setCurrentIndex((prev) => prev + PER_SLIDE);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - PER_SLIDE);
    }
  };

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
      <S.SectionTitle>{title || randomGenre?.name}</S.SectionTitle>
      {isLoading ? (
        <MovieListSkeleton />
      ) : length === 0 ? (
        <MovieListSkeleton text="영화 정보가 없습니다" />
      ) : (
        <S.MovieListWrapper>{renderMovieList()}</S.MovieListWrapper>
      )}

      <S.PrevButton onClick={handlePrev} $curIndex={currentIndex}>
        <img src={leftRight} />
      </S.PrevButton>
      <S.NextButton onClick={handleNext} $curIndex={currentIndex} $totalLength={length} $perSlide={PER_SLIDE}>
        <img src={arrowRight} />
      </S.NextButton>
    </S.Container>
  );
};

export default MovieList;

const Button = styled.button`
  opacity: 0;
  width: 40px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 100;
  top: calc(30px + 32px + 20px);
  font-size: 30px;
  background-color: var(--indigo01);

  img {
    width: 36px;
    height: 36px;
  }

  &.swiper-button-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const S = {
  Container: styled.section`
    position: relative;
    padding: 30px 0;
    &:hover ${Button} {
      opacity: 0.8;
      transition: 0.4s ease-in-out;
    }
  `,

  SectionTitle: styled.h2`
    height: 32px;
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
    transition: 0.4s ease-in-out;

    &::-webkit-scrollbar {
      display: none;
    }

    &:hover ${Button} {
      opacity: 0.8;
      transition: 0.4s ease-in-out;
    }
  `,

  PrevButton: styled(Button)<{ $curIndex: number }>`
    left: -25px;
    visibility: ${(props) => props.$curIndex <= 0 && 'hidden'};
  `,

  NextButton: styled(Button)<{ $curIndex: number; $totalLength: number | undefined; $perSlide: number }>`
    right: -25px;
    visibility: ${(props) => props.$totalLength && props.$curIndex >= props.$totalLength - props.$perSlide && 'hidden'};
  `,
};
