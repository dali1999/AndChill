import { useState } from 'react';
import { TMovieImagesFetchRes } from '@api/movie/movie-request.type';
import CarouselButton, { Button } from '@components/carousel/carousel-button';
import { IMAGE_SIZE } from '@constants/image-size';
import { getImage } from '@utils/get-image';

import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import MovieDetailsSectionTemplate from './movie-details-section-template';

interface TMovieImagesProps {
  data: TMovieImagesFetchRes;
}

const MovieImages = ({ data }: TMovieImagesProps) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const movieImages = data?.backdrops;
  const imageDatalength = movieImages?.length || 0;

  return (
    <MovieDetailsSectionTemplate title={t('movie_details.images.title')}>
      {imageDatalength !== 0 ? (
        <S.MovieImageListWrapper>
          <S.MovieImageList $curIndex={currentIndex}>
            {movieImages?.map((image) => (
              <S.BackdropImage
                key={image.file_path}
                src={getImage(IMAGE_SIZE.backdrop_sizes.size02, image.file_path)}
              />
            ))}
          </S.MovieImageList>

          <CarouselButton
            length={imageDatalength}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            perSlide={1}
            positionTop={0}
            positionLR={-10}
            width={40}
            height={198}
            backgroundColor="var(--indigo02)"
          />
        </S.MovieImageListWrapper>
      ) : (
        <S.NoImageText>{t('movie_details.images.nodata')}</S.NoImageText>
      )}
    </MovieDetailsSectionTemplate>
  );
};

export default MovieImages;

const S = {
  MovieImageListWrapper: styled.div`
    position: relative;
    overflow: hidden;
    &:hover ${Button} {
      opacity: 0.6;
    }
  `,

  MovieImageList: styled.ul<{ $curIndex: number }>`
    display: flex;
    gap: 20px;
    transform: ${({ $curIndex }) => `translateX(-${$curIndex * (350 + 20)}px)`};
    transition: 0.4s ease-in-out;
  `,

  BackdropImage: styled.img`
    width: 350px;
    border-radius: 8px;
  `,

  NoImageText: styled.p`
    font-size: 14px;
    color: var(--indigo08);
  `,
};
