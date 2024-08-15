import { useEffect, useState } from 'react';
import MovieDetailsSkeleton from '@components/skeleton/movie-details-skeleton';
import { IMAGE_SIZE } from '@constants/image-size';
import {
  useMovieDetailsQuery,
  useMovieImagesQuery,
  useMovieSitesQuery,
  useMovieVideosQuery,
} from '@hooks/react-query/use-query-movie';
import MovieInfo from '@pages/movie-details/components/movie-info';
import MovieLogoImage from '@pages/movie-details/components/movie-logo-image';
import MovieSecondaryDetails from '@pages/movie-details/components/movie-secondary-info';
import MovieSites from '@pages/movie-details/components/movie-sites';
import MovieVideos from '@pages/movie-details/components/movie-videos';
import { getImage } from '@utils/get-image';
import { getImageColor } from '@utils/get-image-color';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const MovieDetails = () => {
  const [backgroundColor, setBackgroundColor] = useState('');
  const { movieId } = useParams() as { movieId: string };
  const movieIdNumber = Number(movieId);
  const { data: movieImagesData, isFetching: isImageDataLoading } = useMovieImagesQuery(movieIdNumber);
  const { data: movieDetailsData, isFetching: isDetailsDataLoading } = useMovieDetailsQuery(movieIdNumber);
  const { data: movieSitesData, isFetching: isSiteDataLoading } = useMovieSitesQuery(movieIdNumber);
  const { data: movieVideosData, isFetching: isVideoDataLoading } = useMovieVideosQuery(movieIdNumber);
  const movieImage = movieImagesData?.logos.length !== 0 ? movieImagesData?.logos[0] : movieImagesData?.posters[0];
  const colorImageURL = getImage(IMAGE_SIZE.backdrop_sizes.size02, movieImagesData?.backdrops[0]?.file_path);

  const isFetching = isDetailsDataLoading || isImageDataLoading || isSiteDataLoading || isVideoDataLoading;
  console.log(isFetching);

  const fetchImageColor = async (url: string) => {
    const gradient = await getImageColor(url);
    setBackgroundColor(gradient);
  };

  useEffect(() => {
    if (movieImage?.file_path !== undefined) {
      fetchImageColor(`${colorImageURL}`); //https://cors-anywhere.herokuapp.com/
    }

    return () => {
      setBackgroundColor('');
    };
  }, [colorImageURL, movieImage?.file_path]);

  return (
    <S.Container $backgroundColor={backgroundColor}>
      {isFetching ? (
        <MovieDetailsSkeleton />
      ) : (
        <>
          {movieImagesData && <MovieLogoImage data={movieImagesData} />}
          <S.MovieDetails>
            {movieDetailsData && <MovieInfo data={movieDetailsData} />}
            <S.BottomSection>
              <S.BottomLeftSection>
                {movieSitesData && <MovieSites data={movieSitesData} />}
                {movieVideosData && <MovieVideos data={movieVideosData} />}
              </S.BottomLeftSection>
              {movieDetailsData && <MovieSecondaryDetails data={movieDetailsData} />}
            </S.BottomSection>
          </S.MovieDetails>
        </>
      )}
    </S.Container>
  );
};

export default MovieDetails;

const S = {
  Container: styled.div<{ $backgroundColor: string }>`
    position: relative;
    margin-bottom: -30px; //footer
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 5%;
    width: 100%;
    background: ${({ $backgroundColor }) => `${$backgroundColor}`};
  `,

  MovieDetails: styled.div`
    z-index: 1;
    overflow: hidden;
    background-color: var(--indigo02);
    border-radius: 20px 20px 0 0;
    max-width: 1500px;
    box-shadow: rgb(0, 0, 0) 0px 20px 80px -10px;
    padding: 40px;
    width: 100%;
  `,

  BottomSection: styled.div`
    display: flex;
  `,
  BottomLeftSection: styled.div`
    flex: 1;
  `,

  BottomRightSection: styled.div`
    border: 1px solid yellow;
    display: flex;
  `,
};
