import { useEffect, useState } from 'react';
import MovieListSkeleton from '@components/skeleton/movie-list-skeleton';
import { IMAGE_SIZE } from '@constants/image-size';
import { useMovieCollectionQuery } from '@hooks/react-query/use-query-movie-collection';
import MovieItem from '@pages/home/components/movie-list/movie-item';
import { useRegionStore } from '@stores/region';
import { getImage } from '@utils/get-image';
import { getImageColor } from '@utils/get-image-color';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const MovieCollection = () => {
  const { collectionId } = useParams() as { collectionId: string };
  const collectionIdNumber = Number(collectionId);

  const [backgroundColor, setBackgroundColor] = useState('linear-gradient(to bottom, var(--indigo04), var(--dark09))');

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

  const length = movieCollectionData?.parts?.length;
  const backdropURL = getImage(IMAGE_SIZE.backdrop_sizes.original, movieCollectionData?.backdrop_path);

  const fetchImageColor = async (url: string) => {
    const gradient = await getImageColor(url);
    setBackgroundColor(gradient);
  };

  useEffect(() => {
    if (backdropURL) {
      fetchImageColor(`${backdropURL}`);
    }
  }, [backdropURL]);

  useEffect(() => {
    refetch();
  }, [lang, refetch]);

  return (
    <S.Container $backgroundColor={backgroundColor}>
      <S.CollectionBanner style={{ transform: `translateY(${scrollY * 0.8}px)` }}>
        <S.Title>{movieCollectionData?.name}</S.Title>
        <S.CollectionImage $imageUrl={backdropURL} />
        <S.BlurContainer $backgroundColor={backgroundColor}></S.BlurContainer>
      </S.CollectionBanner>
      {isMovieCollectionLoading ? (
        <MovieListSkeleton height={220} />
      ) : length === 0 ? (
        <MovieListSkeleton text="검색 결과가 없습니다" height={220} />
      ) : (
        <S.CollectionMovieList>
          {movieCollectionData?.parts?.map((movie) => <MovieItem key={movie.id} data={movie} />)}
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
    gap: 10px 20px;
    flex-wrap: wrap;
    width: 100%;
    max-width: 80%;
  `,
};
