import { IMAGE_SIZE } from '@constants/image-size';
import { useMovieDetailsQuery } from '@hooks/react-query/use-query-movie';
import { getImage } from '@utils/get-image';
import styled from 'styled-components';
import MovieSites from './movie-sites';

interface TMovieInfoProps {
  movieId: number;
}

const MovieInfo = ({ movieId }: TMovieInfoProps) => {
  const { data: movieDetailsData, isLoading, isError } = useMovieDetailsQuery(movieId);
  const posterUrl = getImage(IMAGE_SIZE.poster_sizes.size04, movieDetailsData?.poster_path);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div>
      <S.TitleWrapper>
        <h1>{movieDetailsData?.title}</h1>
      </S.TitleWrapper>
      <S.GenreList>{movieDetailsData?.genres.map((genre) => <li key={genre.id}>{genre.name}</li>)}</S.GenreList>
      <p>{movieDetailsData?.overview}</p>
      <S.PosterImage src={posterUrl} />
      <MovieSites movieId={movieId} />
    </div>
  );
};

export default MovieInfo;

const S = {
  TitleWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
    margin-bottom: 30px;
  `,

  GenreList: styled.ul`
    display: flex;
    gap: 10px;
    margin: 10px 0 30px 0;
  `,

  MovieLogoImage: styled.img`
    width: 100px;
  `,
  PosterImage: styled.img`
    width: 200px;
    border-radius: 5px;
    margin: 20px 0;
  `,
};
