import { useEffect, useState } from 'react';
import thumbIcon from '@assets/icons/thumb.svg';
import MovieListSkeleton from '@components/skeleton/movie-list-skeleton';
import { IMAGE_SIZE } from '@constants/image-size';
import { useMovieCollectionQuery } from '@hooks/react-query/use-query-movie-collection';
import MovieItem from '@pages/home/components/movie-list/movie-item';
import { useRegionStore } from '@stores/region';
import { device } from '@styles/breakpoints';
import { getImage } from '@utils/get-image';
import { getImageColor } from '@utils/get-image-color';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const MovieCollection = () => {
  const { collectionId } = useParams() as { collectionId: string };
  const collectionIdNumber = Number(collectionId);

  const [backgroundColor, setBackgroundColor] = useState('linear-gradient(to bottom, var(--indigo04), var(--dark09))');
  const [bestMovieId, setBestMovieId] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const lang = useRegionStore((state) => state.language);

  const {
    data: movieCollectionData,
    isFetching: isMovieCollectionLoading,
    refetch,
  } = useMovieCollectionQuery(collectionIdNumber, lang);

  const backdropURL = getImage(IMAGE_SIZE.backdrop_sizes.original, movieCollectionData?.backdrop_path);

  const fetchImageColor = async (url: string) => {
    const gradient = await getImageColor(url);
    setBackgroundColor(gradient);
  };

  useEffect(() => {
    if (movieCollectionData?.backdrop_path !== undefined) {
      fetchImageColor(`${backdropURL}`);
    }
  }, [backdropURL, movieCollectionData?.backdrop_path]);

  useEffect(() => {
    refetch();
    const movieWithHighestVote = movieCollectionData?.parts.reduce(
      (max, movie) => (movie.vote_average > max.vote_average ? movie : max),
      movieCollectionData?.parts[0],
    );
    if (movieWithHighestVote) {
      setBestMovieId(movieWithHighestVote.id);
    }
  }, [lang, movieCollectionData?.parts, refetch]);

  return (
    <S.Container $backgroundColor={backgroundColor}>
      <S.CollectionBanner style={{ transform: `translateY(${scrollY * 0.8}px)` }}>
        <S.Title>{movieCollectionData?.name}</S.Title>
        <S.CollectionImage $imageUrl={backdropURL} />
        <S.BlurContainer $backgroundColor={backgroundColor}></S.BlurContainer>
      </S.CollectionBanner>

      {isMovieCollectionLoading ? (
        <MovieListSkeleton height={220} />
      ) : (
        <S.CollectionMovieList>
          {movieCollectionData?.parts?.map((movie) => (
            <S.MovieItemWrapper key={movie.id}>
              <MovieItem data={movie} />
              {movie.id === bestMovieId && (
                <S.BestMovieLabel>
                  <img src={thumbIcon} alt="시리즈 베스트 영화 라벨 아이콘" />
                </S.BestMovieLabel>
              )}
            </S.MovieItemWrapper>
          ))}
        </S.CollectionMovieList>
      )}
    </S.Container>
  );
};

export default MovieCollection;

const S = {
  Container: styled.div<{ $backgroundColor: string }>`
    background: ${({ $backgroundColor }) => $backgroundColor};
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    width: 100%;
  `,

  CollectionBanner: styled.div`
    position: relative;
  `,

  Title: styled.h1`
    position: absolute;
    font-size: 70px;
    top: 230px;
    right: 8%;
    left: 8%;
    color: var(--gray02);
    font-weight: 900;
    z-index: 1;
    opacity: 0.9;
    text-align: end;
    @media ${device.mobile} {
      font-size: 40px;
      top: 120px;
      right: 5%;
      left: 5%;
    }
  `,

  CollectionImage: styled.div<{ $imageUrl: string }>`
    height: 550px;
    background: ${({ $imageUrl }) => ($imageUrl ? `url(${$imageUrl})` : 'none')};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 0.1;
  `,

  BlurContainer: styled.div<{ $backgroundColor: string }>`
    width: 100%;
    background: ${({ $backgroundColor }) => $backgroundColor};
    bottom: -20px;
    height: 40px;
    position: absolute;
    filter: blur(30px);
    -webkit-filter: blur(30px);
  `,

  CollectionMovieList: styled.ul`
    padding: 0px 10% 100px;
    margin-top: -110px;
    display: flex;
    justify-content: start;
    gap: 20px;
    flex-wrap: wrap;
    width: 100%;
    max-width: 80%;
    @media ${device.mobile} {
      max-width: 100%;
      padding: 0px 4% 50px;
      justify-content: center;
      margin-top: -220px;
    }
  `,

  MovieItemWrapper: styled.div`
    position: relative;
  `,

  BestMovieLabel: styled.div`
    position: absolute;
    top: -8px;
    left: 20px;
    width: 40px;
    height: 40px;
    background-color: var(--yellow02);
    border-radius: 2px 2px 4px 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--indigo02);
    font-weight: 900;
    font-size: 14px;
    box-shadow: rgba(0, 0, 0, 0.6) -4px 4px 3px;

    img {
      width: 22px;
      height: 22px;
    }

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 1.2px;
      left: -4px;
      border-width: 6.8px 4px 0px 0px;
      border-style: solid;
      border-color: transparent var(--yellow04) transparent;
    }
  `,
};
