import { useState } from 'react';
import { TMovieListsFetchRes, TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import leftRight from '@assets/icons/arrow-left.svg';
import arrowRight from '@assets/icons/arrow-right.svg';
import MovieListSkeleton from '@components/skeleton/movie-list-skeleton';
import MovieItem from '@pages/home/components/trending-movie-list/movie-item';
import { fadeIn } from '@styles/animations';
import styled from 'styled-components';

interface TMovieListProps {
  title: string;
  data: TMovieListsFetchRes | undefined;
  isLoading: boolean;
}
const PER_SLIDE = 2;

const MovieList = ({ title, data, isLoading }: TMovieListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = data?.results.length;

  const next = () => {
    if (length && currentIndex < length - PER_SLIDE) {
      setCurrentIndex((prevState) => prevState + PER_SLIDE);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - PER_SLIDE);
    }
  };

  return (
    <S.Container>
      <S.SectionTitle>{title}</S.SectionTitle>
      {isLoading ? (
        <MovieListSkeleton />
      ) : data?.total_results === 0 ? (
        <MovieListSkeleton text="영화 정보가 없습니다" />
      ) : (
        <div style={{ overflow: 'hidden' }}>
          <S.TrendingMovieList $curIndex={currentIndex}>
            {data?.results.map((movie: TMovieListsItem) => (
              <li key={movie.id}>
                <MovieItem data={movie} />
              </li>
            ))}
          </S.TrendingMovieList>
        </div>
      )}
      <S.PrevButton onClick={prev} $curIndex={currentIndex}>
        <img src={leftRight} />
      </S.PrevButton>
      <S.NextButton onClick={next} $curIndex={currentIndex} $totalLength={length} $perSlide={PER_SLIDE}>
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
    margin-bottom: 20px;
    height: 32px;
  `,

  TrendingMovieList: styled.ul<{ $curIndex: number }>`
    display: flex;
    justify-content: space-between;
    gap: 48px;
    animation: ${fadeIn} 0.5s ease-in;
    transform: ${(props) => `translateX(-${props.$curIndex * 248}px)`};
    transition: 0.4s ease-in-out;

    &::-webkit-scrollbar {
      display: none;
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
