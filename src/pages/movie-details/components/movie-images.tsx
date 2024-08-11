import { useEffect, useState } from 'react';
import leftRight from '@assets/icons/arrow-left.svg';
import arrowRight from '@assets/icons/arrow-right.svg';
import { IMAGE_SIZE } from '@constants/image-size';
import { useMovieImagesQuery } from '@hooks/react-query/use-query-movie';
import { getImage } from '@utils/get-image';

import { getImageColor } from '@utils/get-image-color';
import styled from 'styled-components';

interface TMovieImagesProps {
  movieId: number;
}

const PER_SLIDE = 1;
// http://localhost:5173/475557

const MovieImages = ({ movieId }: TMovieImagesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backgroundStyle, setBackgroundStyle] = useState('');

  const { data: movieImagesData, isLoading } = useMovieImagesQuery(movieId);
  const movieImages = movieImagesData?.backdrops.length !== 0 ? movieImagesData?.posters : movieImagesData?.posters;
  const length = movieImages?.length || 0;

  const imageURL = getImage(IMAGE_SIZE.backdrop_sizes.size02, movieImages && movieImages[0].file_path);

  const fetchImageColor = async (url: string) => {
    const gradient = await getImageColor(url);
    setBackgroundStyle(gradient);
  };

  useEffect(() => {
    if (movieImages && movieImages[0].file_path !== undefined) {
      fetchImageColor(`https://cors-anywhere.herokuapp.com/${imageURL}`);
    }
    if (backgroundStyle) {
      document.body.style.background = `${backgroundStyle}`;
    }

    return () => {
      document.body.style.background = ``;
    };
  }, [backgroundStyle, imageURL, movieImages]);

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

  return (
    <S.Container>
      <S.MovieImageWrapper>
        <S.MovieImageList $curIndex={currentIndex}>
          {isLoading ? (
            <p>로딩중</p>
          ) : (
            movieImages?.map((image) => (
              <S.BackdropImage
                key={image.file_path}
                src={getImage(IMAGE_SIZE.backdrop_sizes.size02, image.file_path)}
              />
            ))
          )}
        </S.MovieImageList>

        <S.PrevButton onClick={handlePrev} $curIndex={currentIndex}>
          <img src={leftRight} />
        </S.PrevButton>
        <S.NextButton onClick={handleNext} $curIndex={currentIndex} $totalLength={length} $perSlide={PER_SLIDE}>
          <img src={arrowRight} />
        </S.NextButton>
      </S.MovieImageWrapper>
    </S.Container>
  );
};

export default MovieImages;

const Button = styled.button`
  opacity: 0;
  width: 50px;
  height: 338px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 10;
  top: 0;
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
  Container: styled.div`
    z-index: 0;
    position: absolute;
    height: 330px;
    top: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  `,

  MovieImageList: styled.ul<{ $curIndex: number }>`
    display: flex;
    transform: ${({ $curIndex }) => `translateX(-${$curIndex * 600}px)`};
    transition: 0.4s ease-in-out;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  MovieImageWrapper: styled.div`
    position: relative;
    &:hover ${Button} {
      opacity: 0.6;
      transition: 0.4s ease-in-out;
    }
  `,

  BackdropImage: styled.img`
    width: 600px;
    aspect-ratio: 16 / 9;
  `,

  PrevButton: styled(Button)<{ $curIndex: number }>`
    left: 0;
    visibility: ${(props) => props.$curIndex <= 0 && 'hidden'};
    transition: 0.4s ease-in-out;
  `,

  NextButton: styled(Button)<{ $curIndex: number; $totalLength: number | undefined; $perSlide: number }>`
    right: 0;
    visibility: ${(props) => props.$totalLength && props.$curIndex >= props.$totalLength - props.$perSlide && 'hidden'};
  `,
};
