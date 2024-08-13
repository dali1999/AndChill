/* eslint-disable no-unused-vars */
import { useMovieVideosQuery } from '@hooks/react-query/use-query-movie';
import YouTube from 'react-youtube';
import styled from 'styled-components';

interface TMovieVideosProps {
  movieId: number;
}

const MovieVideos = ({ movieId }: TMovieVideosProps) => {
  const { data: movieVideosData } = useMovieVideosQuery(movieId);
  const videoOptions = {
    width: '432',
    height: '243',
    playerVars: {
      autoplay: 0,
      rel: 0,
    },
  };

  const trailerVideos = movieVideosData?.results.filter((video) => video.type === 'Trailer');

  return (
    <S.Container>
      {/* <p>예고편</p> */}
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
    padding: 0 40px;
  `,

  VideosList: styled.ul`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  `,

  StyledVideo: styled(YouTube)``,
};
