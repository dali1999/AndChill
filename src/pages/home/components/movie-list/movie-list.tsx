import { useState } from 'react';
import { TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import CarouselButton, { Button } from '@components/carousel/carousel-button';
import { fadeIn } from '@styles/animations';
import styled from 'styled-components';
import MovieItem from './movie-item';

interface TMovieListProps {
  data: TMovieListsItem[] | undefined;
}

const MovieList = ({ data }: TMovieListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
        backgroundColor="var(--indigo01)"
      />
    </S.MovieListWrapper>
  );
};

export default MovieList;

const S = {
  MovieListWrapper: styled.div`
    position: relative;
    overflow: hidden;
    &:hover ${Button} {
      opacity: 0.8;
    }
  `,

  MovieList: styled.ul<{ $curIndex: number }>`
    padding-top: 20px;
    display: flex;
    gap: 38px;
    animation: ${fadeIn} 0.5s ease-in;
    transform: ${({ $curIndex }) => `translateX(-${$curIndex * 238}px)`};
    transition: 0.3s ease-in-out;
  `,
};
