import { useEffect, useState } from 'react';
import { TMovieCrew, TMovieDetailsFetchRes } from '@api/movie/movie-request.type';
import { IMAGE_SIZE } from '@constants/image-size';
import { claculateRuntime } from '@pages/movie-details/utils/calculate-runtime';
import { getImage } from '@utils/get-image';
import styled from 'styled-components';
import MovieRate from './movie-rate';

interface TMovieInfoProps {
  data: TMovieDetailsFetchRes;
  directors: TMovieCrew[];
}

const MovieInfo = ({ data, directors }: TMovieInfoProps) => {
  const [formattedRuntime, setFormattedRuntime] = useState<string | undefined>('');
  const { runtime, title, release_date, vote_average, genres, tagline, overview } = data;
  const posterURL = data.poster_path
    ? getImage(IMAGE_SIZE.poster_sizes.size04, data?.poster_path)
    : '/andchill-logo-800.png';
  const backdropURL = getImage(IMAGE_SIZE.backdrop_sizes.size03, data?.backdrop_path);

  useEffect(() => {
    setFormattedRuntime(claculateRuntime(runtime));
  }, [runtime]);

  return (
    <S.Container $backdropURL={backdropURL} $isImageExist={!!data.backdrop_path}>
      {data.poster_path ? (
        <S.PosterImage src={posterURL} />
      ) : (
        <S.DummyImageWrapper>
          <S.DummyImage src={posterURL} />
        </S.DummyImageWrapper>
      )}
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

        <MovieRate rate={vote_average} />

        <S.Overview>
          <p>{tagline}</p>
          {overview ? <p>{overview}</p> : <S.NoOverviewText>영화 내용에 관한 정보가 없습니다</S.NoOverviewText>}
        </S.Overview>

        <S.Directors>
          {directors.map((director) => (
            <li key={director.id}>
              <S.DirectorName>{director.name}</S.DirectorName>
              <S.DirectorJob>{director.job}</S.DirectorJob>
            </li>
          ))}
        </S.Directors>
      </S.MovieInfoWrapper>
    </S.Container>
  );
};

export default MovieInfo;

const S = {
  Container: styled.div<{ $backdropURL: string; $isImageExist: boolean }>`
    position: relative;
    padding: 40px;
    display: flex;
    gap: 40px;
    z-index: 1;
    border-bottom: ${({ $isImageExist }) => !$isImageExist && `2px solid var(--indigo04)`};

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

  PosterImage: styled.img`
    width: 330px;
    border-radius: 6px;
  `,

  DummyImageWrapper: styled.div`
    background-color: var(--indigo04);
    width: 330px;
    height: 472px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
  `,

  DummyImage: styled.img`
    opacity: 0.2;
    width: 280px;
    height: 120px;
  `,

  MovieInfoWrapper: styled.div`
    width: 100%;
    height: 100%;
  `,

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
    width: 100%;

    & p:first-child {
      margin-bottom: 10px;
      font-weight: 600;
      font-size: 20px;
      color: var(--gray01);
    }

    display: flex;
    flex-direction: column;
    justify-content: center;
  `,

  NoOverviewText: styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 180px;
  `,

  Directors: styled.ul`
    margin-top: 40px;
  `,
  DirectorName: styled.p`
    font-size: 18px;
  `,
  DirectorJob: styled.p`
    margin-top: 4px;
    font-size: 14px;
    color: var(--gray01);
  `,
};
