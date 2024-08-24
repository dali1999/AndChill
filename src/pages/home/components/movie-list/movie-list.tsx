import { useState } from 'react';
import { TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import CarouselButton, { Button } from '@components/carousel/carousel-button';
import { fadeIn } from '@styles/animations';
import { device } from '@styles/breakpoints';
import styled from 'styled-components';
import MovieItem from './movie-item';

interface TMovieListProps {
  data: TMovieListsItem[] | undefined;
}

const MovieList = ({ data }: TMovieListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = data?.length;

  return (
    <S.MovieListWrapper>
      <S.MovieList $curIndex={currentIndex}>
        {data?.map((movie: TMovieListsItem) => (
          <li key={movie.id}>
            <MovieItem data={movie} />
          </li>
        ))}
      </S.MovieList>
      <CarouselButton
        length={length}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        perSlide={2}
        positionTop={20}
        positionLR={-22}
        width={60}
        height={300}
        backgroundColor="var(--dark09)"
      />
    </S.MovieListWrapper>
  );
};

export default MovieList;

const S = {
  MovieListWrapper: styled.div`
    padding-top: 20px;
    position: relative;
    overflow: hidden;
    animation: ${fadeIn} 0.5s ease-in;
    &:hover ${Button} {
      opacity: 0.8;
    }

    @media ${device.mobile} {
      overflow: auto;
    }
  `,

  MovieList: styled.ul<{ $curIndex: number }>`
    display: flex;
    gap: 20px;
    transform: ${({ $curIndex }) => `translateX(-${$curIndex * 220}px)`};
    transition: 0.3s ease-in-out;
    @media ${device.mobile} {
      gap: 12px;
    }
  `,
};
