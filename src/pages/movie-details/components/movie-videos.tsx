/* eslint-disable no-unused-vars */
import { TMovieVideosFetchRes } from '@api/movie/movie-request.type';
import YouTube from 'react-youtube';
import styled from 'styled-components';

interface TMovieVideosProps {
  data: TMovieVideosFetchRes;
}

const MovieVideos = ({ data }: TMovieVideosProps) => {
  const videoOptions = {
    width: '352',
    height: '198',
    playerVars: {
      autoplay: 0,
      rel: 0,
    },
  };

  const trailerVideos = data?.results.filter((video) => video.type === 'Trailer');

  return (
    <S.Container>
      <S.Title>예고편</S.Title>
      <S.VideosList>
        {trailerVideos?.map((video) => (
          <li key={video.id}>
            <S.StyledVideo
              videoId={video.key}
              opts={videoOptions}
              onEnd={(e: { target: { stopVideo: (arg0: number) => void } }) => {
                e.target.stopVideo(0);
              }}
            />
          </li>
        ))}
      </S.VideosList>
    </S.Container>
  );
};

export default MovieVideos;

const S = {
  Container: styled.div`
    padding: 20px 0;
  `,

  Title: styled.h2`
    margin-bottom: 20px;
  `,

  VideosList: styled.ul`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  StyledVideo: styled(YouTube)``,
};
