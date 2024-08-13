import { useEffect, useState } from 'react';

import { IMAGE_SIZE } from '@constants/image-size';
import { useMovieImagesQuery } from '@hooks/react-query/use-query-movie';
import { getImage } from '@utils/get-image';

import { getImageColor } from '@utils/get-image-color';
import styled from 'styled-components';

interface TMovieImagesProps {
  movieId: number;
}

const MovieLogoImage = ({ movieId }: TMovieImagesProps) => {
  const [backgroundStyle, setBackgroundStyle] = useState('');

  const { data: movieImagesData, isLoading } = useMovieImagesQuery(movieId);
  const movieImage = movieImagesData?.logos.length !== 0 ? movieImagesData?.logos[0] : movieImagesData?.posters[0];

  const colorImageURL = getImage(IMAGE_SIZE.backdrop_sizes.size02, movieImagesData?.backdrops[0].file_path);
  const aspectRatio = movieImage?.aspect_ratio as number;

  const fetchImageColor = async (url: string) => {
    const gradient = await getImageColor(url);
    setBackgroundStyle(gradient);
  };

  useEffect(() => {
    if (movieImage?.file_path !== undefined) {
      fetchImageColor(`https://cors-anywhere.herokuapp.com/${colorImageURL}`);
    }
    if (backgroundStyle) {
      document.body.style.background = `${backgroundStyle}`;
    }

    return () => {
      document.body.style.background = ``;
    };
  }, [backgroundStyle, colorImageURL, movieImage]);

  return (
    <S.Container>
      <S.ImageWrapper>
        {isLoading ? (
          <p>로딩중</p>
        ) : (
          <S.LogoImage
            src={getImage(IMAGE_SIZE.backdrop_sizes.size02, movieImage?.file_path)}
            $aspectRatio={aspectRatio}
          />
        )}
      </S.ImageWrapper>
    </S.Container>
  );
};

export default MovieLogoImage;

const S = {
  Container: styled.div`
    width: 100%;
    /* height: 250px; */
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  ImageWrapper: styled.div`
    position: relative;
  `,

  LogoImage: styled.img<{ $aspectRatio: number }>`
    max-width: 300px;
    aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
    margin: 50px 0;
  `,
};
