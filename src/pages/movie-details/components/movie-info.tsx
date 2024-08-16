import { useEffect, useState } from 'react';
import { TMovieDetailsFetchRes } from '@api/movie/movie-request.type';
import { IMAGE_SIZE } from '@constants/image-size';
import { claculateRuntime } from '@pages/movie-details/utils/calculate-runtime';
import { getImage } from '@utils/get-image';
import styled from 'styled-components';

interface TMovieInfoProps {
  data: TMovieDetailsFetchRes;
}

const MovieInfo = ({ data }: TMovieInfoProps) => {
  const [formattedRuntime, setFormattedRuntime] = useState<string | undefined>('');
  const { runtime, title, release_date, vote_average, genres, tagline, overview } = data;
  const posterURL = getImage(IMAGE_SIZE.poster_sizes.size04, data?.poster_path);
  const backdropURL = getImage(IMAGE_SIZE.backdrop_sizes.size03, data?.backdrop_path);

  useEffect(() => {
    setFormattedRuntime(claculateRuntime(runtime));
  }, [runtime]);

  return (
    <S.Container $backdropURL={backdropURL}>
      <S.PosterImage src={posterURL} />
      <S.MovieInfoWrapper>
        <S.Title>
          <h1>{title}</h1>
          <span>({release_date.slice(0, 4)})</span>
        </S.Title>

        <S.GenreList>
          {genres.map((genre) => (
            <S.GenreItem key={genre.id}>{genre.name}</S.GenreItem>
          ))}
          <p>• {formattedRuntime}</p>
        </S.GenreList>

        <p>{vote_average}</p>
        <S.Rate>
          <S.RatePercent $voteAverage={vote_average}></S.RatePercent>
        </S.Rate>

        <S.Overview>
          <p>{tagline}</p>
          <p>{overview}</p>
        </S.Overview>
      </S.MovieInfoWrapper>
    </S.Container>
  );
};

export default MovieInfo;

const S = {
  Container: styled.div<{ $backdropURL: string }>`
    position: relative;
    padding: 40px;
    display: flex;
    gap: 30px;
    z-index: 1;

    &::before {
      content: '';
      background-image: url(${({ $backdropURL }) => $backdropURL});
      background-repeat: no-repeat;
      background-size: cover;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0.1;
      z-index: -1;
    }
  `,

  MovieInfoWrapper: styled.div``,

  Title: styled.div`
    margin-bottom: 20px;
    display: flex;
    gap: 8px;
    align-items: center;
    text-align: baseline;
    h1 {
      font-weight: 600;
    }
    span {
      font-size: 25px;
      color: var(--gray02);
    }
  `,

  Rate: styled.div`
    position: relative;
    width: 40px;
    height: 50px;
    border-radius: 7px;
    background-color: var(--dark03);
    margin: 8px 0 20px;
    overflow: hidden;
  `,

  RatePercent: styled.div<{ $voteAverage: number }>`
    --percentage: ${({ $voteAverage }) => `${$voteAverage * 10}%`};
    position: absolute;
    bottom: 0;
    width: 100%;
    height: var(--percentage);
    background-color: var(--yellow01);
  `,

  GenreList: styled.ul`
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px 0 30px 0;
  `,

  GenreItem: styled.li`
    background-color: var(--yellow01);
    font-weight: 600;
    font-size: 13px;
    padding: 3px 5px;
    border-radius: 3px;
    color: var(--dark04);
  `,

  Overview: styled.div`
    font-size: 16px;
    line-height: 26px;
    color: var(--gray03);
    & p:first-child {
      margin-bottom: 10px;
      font-weight: 600;
      font-size: 20px;
      color: var(--gray01);
    }
  `,

  PosterImage: styled.img`
    width: 330px;
    border-radius: 5px;
  `,
};
