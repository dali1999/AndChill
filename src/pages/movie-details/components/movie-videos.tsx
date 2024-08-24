/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { TMovieVideosFetchRes } from '@api/movie/movie-request.type';
import CarouselButton, { Button } from '@components/carousel/carousel-button';
import { device } from '@styles/breakpoints';
import { useTranslation } from 'react-i18next';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import MovieDetailsSectionTemplate from './movie-details-section-template';

interface TMovieVideosProps {
  data: TMovieVideosFetchRes;
}

const MovieVideos = ({ data }: TMovieVideosProps) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const videoOptions = {
    width: '350',
    height: '197',
    playerVars: {
      autoplay: 0,
      rel: 0,
    },
  };

  const trailerVideos = data?.results.filter((video) => video.type === 'Trailer');
  const videoDataLength = trailerVideos.length;

  return (
    <MovieDetailsSectionTemplate title={t('movie_details.videos.title')}>
      {videoDataLength !== 0 ? (
        <S.VideoListWrapper>
          <S.VideosList $curIndex={currentIndex}>
            {trailerVideos?.map((video) => (
              <S.VideoListItem key={video.id}>
                <S.VideoWrapper>
                  <S.StyledVideo
                    videoId={video.key}
                    opts={videoOptions}
                    onEnd={(e: { target: { stopVideo: (arg0: number) => void } }) => {
                      e.target.stopVideo(0);
                    }}
                  />
                </S.VideoWrapper>
              </S.VideoListItem>
            ))}
          </S.VideosList>

          <CarouselButton
            length={videoDataLength}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            perSlide={1}
            positionTop={0}
            positionLR={-10}
            width={40}
            height={198}
            backgroundColor="var(--indigo02)"
          />
        </S.VideoListWrapper>
      ) : (
        <S.NoVideoText>{t('movie_details.videos.nodata')}</S.NoVideoText>
      )}
    </MovieDetailsSectionTemplate>
  );
};

export default MovieVideos;

const S = {
  VideoListWrapper: styled.div`
    position: relative;
    overflow: hidden;
    @media ${device.mobile} {
      overflow-x: auto;
    }
    &:hover ${Button} {
      opacity: 0.8;
    }
  `,

  VideosList: styled.ul<{ $curIndex: number }>`
    display: flex;
    gap: 16px;
    width: 100%;
    transform: ${({ $curIndex }) => `translateX(-${$curIndex * (352 + 16)}px)`};
    transition: 0.3s ease-in-out;
    @media ${device.mobile} {
      gap: 10px;
    }
  `,

  VideoListItem: styled.li``,

  VideoWrapper: styled.div`
    overflow: hidden;
    border-radius: 8px;
    min-width: 352px;
    height: 198px;
    background-color: var(--indigo01);
    margin-bottom: 10px;
  `,

  StyledVideo: styled(YouTube)``,

  NoVideoText: styled.p`
    font-size: 14px;
    color: var(--indigo08);
  `,
};
