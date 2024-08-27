import { useEffect, useRef, useState } from 'react';
import { TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import CarouselButton, { Button } from '@components/carousel/carousel-button';
import { calculateGroups } from '@pages/home/utils/calculate-groups';
import { fadeIn } from '@styles/animations';
import { device, size } from '@styles/breakpoints';
import styled from 'styled-components';
import MovieItem from './movie-item';

interface TMovieListProps {
  data: TMovieListsItem[] | undefined;
}

const MovieList = ({ data }: TMovieListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [perSlide, setPerSlide] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(window.devicePixelRatio);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const [test, setTest] = useState(0);

  const movieListRef = useRef<HTMLUListElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const length = data?.length || 0;
  const groups = calculateGroups(length, perSlide);

  useEffect(() => {
    setCurrentIndex(0);
    if (pageWidth >= 2450) setPerSlide(10);
    else if (pageWidth >= 2220) setPerSlide(9);
    else if (pageWidth >= 1970) setPerSlide(8);
    else if (pageWidth >= 1720) setPerSlide(7);
    else if (pageWidth >= 1480) setPerSlide(6);
    else if (pageWidth >= 1220) setPerSlide(5);
    else if (pageWidth >= 980) setPerSlide(4);
    else if (pageWidth >= size.mobile) setPerSlide(3);
  }, [zoomLevel, pageWidth]);

  useEffect(() => {
    const handleResize = () => {
      const newZoomLevel = window.devicePixelRatio;
      const newPageWidth = window.innerWidth;

      if (newZoomLevel !== zoomLevel) setZoomLevel(newZoomLevel);
      if (newPageWidth !== pageWidth) setPageWidth(newPageWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [zoomLevel, pageWidth]);

  useEffect(() => {
    if (movieListRef.current && wrapperRef.current) {
      const wrapperWidth = wrapperRef.current.offsetWidth;
      const movieListWidth = movieListRef.current.scrollWidth;
      setTest(wrapperWidth - movieListWidth);
    }
  }, [zoomLevel, pageWidth]);

  return (
    <S.MovieListWrapper ref={wrapperRef}>
      <S.MovieList $curIndex={currentIndex} $groups={groups} $perSlide={perSlide} $test={test} ref={movieListRef}>
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
        perSlide={perSlide}
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

  MovieList: styled.ul<{ $curIndex: number; $groups: number; $perSlide: number; $test: number }>`
    height: 300px;
    display: flex;
    gap: 20px;
    transform: ${({ $curIndex, $groups, $perSlide, $test }) =>
      $curIndex !== ($groups - 1) * $perSlide ? `translateX(-${$curIndex * 220}px)` : `translateX(${$test}px)`};
    transition: 0.3s ease-in-out;
    @media ${device.mobile} {
      gap: 12px;
    }
  `,
};
