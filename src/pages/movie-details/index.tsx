import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import MovieInfo from './components/movie-info';
import MovieLogoImage from './components/movie-logo-image';
import MovieSites from './components/movie-sites';
import MovieVideos from './components/movie-videos';

const MovieDetails = () => {
  const { movieId } = useParams() as { movieId: string };
  const movieIdNumber: number = Number(movieId);

  return (
    <S.Container>
      {/* <MovieImages movieId={movieIdNumber} /> */}
      <MovieLogoImage movieId={movieIdNumber} />
      <S.MovieWrapper>
        <MovieInfo movieId={movieIdNumber} />
        <MovieSites movieId={movieIdNumber} />
        <MovieVideos movieId={movieIdNumber} />
      </S.MovieWrapper>
    </S.Container>
  );
};

export default MovieDetails;

const S = {
  Container: styled.div`
    position: relative;
    margin-bottom: -30px; //footer 떄문에
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 5%;
    width: 100%;
    /* height: 100vh; */
  `,

  MovieWrapper: styled.div`
    z-index: 1;
    overflow: hidden;
    background-color: #171b2d;
    border-radius: 20px 20px 0 0;
    max-width: 1500px;
    box-shadow: rgb(0, 0, 0) 0px 20px 80px -10px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  `,
};
