import { useEffect, useState } from 'react';
import { IMAGE_SIZE } from '@constants/image-size';
import { useMovieDetailsQuery } from '@hooks/react-query/use-query-movie';
import { getImage } from '@utils/get-image';
import styled from 'styled-components';

interface TMovieInfoProps {
  movieId: number;
}

const MovieInfo = ({ movieId }: TMovieInfoProps) => {
  const [formattedRuntime, setFormattedRuntime] = useState('');
  const { data: movieDetailsData, isLoading, isError } = useMovieDetailsQuery(movieId);
  const posterUrl = getImage(IMAGE_SIZE.poster_sizes.size04, movieDetailsData?.poster_path);
  const backdropUrl = getImage(IMAGE_SIZE.backdrop_sizes.size03, movieDetailsData?.backdrop_path);

  const claculateRuntime = (runtime: number | undefined) => {
    if (runtime) {
      const hour = Math.floor(runtime / 60);
      const min = runtime % 60;
      setFormattedRuntime(`${hour}시간 ${min}분`);
    }
  };

  useEffect(() => {
    claculateRuntime(movieDetailsData?.runtime);
  }, [movieDetailsData?.runtime]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <S.Container $backdropUrl={backdropUrl}>
      <S.PosterImage src={posterUrl} />
      <S.MovieInfoWrapper>
        <S.Title>
          <h1>{movieDetailsData?.title}</h1>
          <span>({movieDetailsData?.release_date.slice(0, 4)})</span>
        </S.Title>

        <div>{movieDetailsData?.vote_average}</div>
        {/* <S.CircularRate></S.CircularRate> */}

        <S.GenreList>
          {movieDetailsData?.genres.map((genre) => <S.GenreItem key={genre.id}>{genre.name}</S.GenreItem>)}
          <p>• {formattedRuntime}</p>
        </S.GenreList>

        <S.Overview>
          <p>{movieDetailsData?.tagline}</p>
          <p>{movieDetailsData?.overview}</p>
        </S.Overview>

        {/* <p>평점: {movieDetailsData?.vote_average}</p>
        <p>제작비: {movieDetailsData?.budget}</p>
        <p>수익: {movieDetailsData?.revenue}</p>
        <p>원어: {movieDetailsData?.original_language}</p>
        <p>원어: {movieDetailsData?.status}</p> */}
        {/* <MovieSites movieId={movieId} /> */}
      </S.MovieInfoWrapper>
    </S.Container>
  );
};

export default MovieInfo;

const S = {
  Container: styled.div<{ $backdropUrl: string }>`
    position: relative;
    display: flex;
    gap: 30px;
    z-index: 1;
    padding: 40px;

    &::before {
      content: '';
      background-image: url(${({ $backdropUrl }) => $backdropUrl});
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

  CircularRate: styled.div`
    height: 90px;
    width: 90px;
    border-radius: 90px;
    background: linear-gradient(90deg, blue 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)),
      linear-gradient(480deg, blue 50%, red 50%, red);
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
