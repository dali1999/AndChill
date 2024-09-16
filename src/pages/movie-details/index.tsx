import { useEffect, useState } from 'react';
import MovieDetailsSkeleton from '@components/skeleton/movie-details-skeleton';
import { IMAGE_SIZE } from '@constants/image-size';
import {
  useMovieCreditsQuery,
  useMovieDetailsQuery,
  useMovieImagesQuery,
  useMovieRecommendationsQuery,
  useMovieSitesQuery,
  useMovieVideosQuery,
} from '@hooks/react-query/use-query-movie';
import MovieInfo from '@pages/movie-details/components/movie-info';
import MovieLogoImage from '@pages/movie-details/components/movie-logo-image';
import MovieSecondaryDetails from '@pages/movie-details/components/movie-secondary-info';
import MovieSites from '@pages/movie-details/components/movie-sites';
import MovieVideos from '@pages/movie-details/components/movie-videos';
import MetaTag from '@pages/SEOMetaTag';
import { useRegionStore } from '@stores/region';
import { fadeIn } from '@styles/animations';
import { device } from '@styles/breakpoints';
import { getImage } from '@utils/get-image';
import { getImageColor } from '@utils/get-image-color';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import MovieCredits from './components/movie-credits';
import MovieImages from './components/movie-images';
import MovieSimilar from './components/movie-similar';

const MovieDetails = () => {
  const [backgroundColor, setBackgroundColor] = useState('linear-gradient(to bottom, var(--dark09), var(--dark09))');
  const { movieId } = useParams() as { movieId: string };
  const movieIdNumber = Number(movieId);
  const lang = useRegionStore((state) => state.language);

  const { data: movieImagesData, isFetching: isImagesLoading } = useMovieImagesQuery(movieIdNumber);
  const { data: movieDetailsData, isFetching: isDetailsLoading } = useMovieDetailsQuery(movieIdNumber, lang);
  const { data: movieSitesData, isFetching: isSitesLoading } = useMovieSitesQuery(movieIdNumber, lang);
  const { data: movieVideosData, isFetching: isVideosLoading } = useMovieVideosQuery(movieIdNumber, lang);
  const { data: movieCreditsData, isFetching: isCreditsLoading } = useMovieCreditsQuery(movieIdNumber, lang);
  const { data: movieRecommendationsData, isFetching: isMovieRecommendationsLoading } = useMovieRecommendationsQuery(
    movieIdNumber,
    lang,
  );

  const movieImage = movieImagesData?.logos.length !== 0 ? movieImagesData?.logos[0] : movieImagesData?.posters[0];
  const colorImageURL = getImage(
    IMAGE_SIZE.backdrop_sizes.size01,
    movieImagesData?.backdrops[0]?.file_path || movieImagesData?.posters[0]?.file_path,
  );
  const directors = movieCreditsData?.crew.filter((people) => people.job === 'Director');

  const isFetching =
    isDetailsLoading ||
    isImagesLoading ||
    isSitesLoading ||
    isVideosLoading ||
    isCreditsLoading ||
    isMovieRecommendationsLoading;

  const fetchImageColor = async (url: string) => {
    const gradient = await getImageColor(url);
    setBackgroundColor(gradient);
  };

  useEffect(() => {
    if (movieImage?.file_path !== undefined) {
      fetchImageColor(`${colorImageURL}`);
    }
  }, [colorImageURL, movieImage?.file_path]);

  return (
    <>
      {movieDetailsData && (
        <MetaTag
          title={`${movieDetailsData.title}`}
          description={`'${movieDetailsData.title}' 영화 상세 정보 페이지 입니다. 상세: ${movieDetailsData.overview}`}
        />
      )}
      <S.Container $backgroundColor={backgroundColor}>
        {isFetching ? (
          <MovieDetailsSkeleton />
        ) : (
          <>
            {movieImagesData && <MovieLogoImage data={movieImagesData} />}
            <S.MovieDetails>
              {movieDetailsData && directors && <MovieInfo data={movieDetailsData} directors={directors} lang={lang} />}
              <S.BottomSection>
                <S.BottomLeftSection>
                  {movieCreditsData && <MovieCredits data={movieCreditsData} />}
                  {movieSitesData && <MovieSites data={movieSitesData} />}
                  {movieVideosData && <MovieVideos data={movieVideosData} />}
                  {movieImagesData && <MovieImages data={movieImagesData} />}
                  {movieRecommendationsData && <MovieSimilar data={movieRecommendationsData} />}
                </S.BottomLeftSection>
                {movieDetailsData && <MovieSecondaryDetails data={movieDetailsData} />}
              </S.BottomSection>
            </S.MovieDetails>
          </>
        )}
      </S.Container>
    </>
  );
};

export default MovieDetails;

const S = {
  Container: styled.div<{ $backgroundColor: string }>`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 5%;
    width: 100%;
    background: ${({ $backgroundColor }) => ($backgroundColor ? `${$backgroundColor}` : 'var(--indigo07)')};

    @media ${device.mobile} {
      padding: 0;
      margin-top: 100px;
    }
  `,

  MovieDetails: styled.div`
    z-index: 1;
    background-color: var(--indigo02);
    border-radius: 20px 20px 0 0;
    max-width: 1500px;
    box-shadow: rgb(0, 0, 0) 0px 20px 80px -10px;
    width: 100%;
  `,

  BottomSection: styled.div`
    display: flex;
    @media ${device.mobile} {
      flex-direction: column-reverse;
    }
  `,

  BottomLeftSection: styled.div`
    animation: ${fadeIn} 0.5s ease-in;
    flex: 1;
    overflow: hidden;
    padding: 40px 20px 10px 40px;
    @media ${device.mobile} {
      padding: 20px 4% 10px 4%;
    }
    ::-webkit-scrollbar {
      display: none;
    }
  `,
};
