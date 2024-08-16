import { useEffect, useState } from 'react';
import { TMovieImagesFetchRes } from '@api/movie/movie-request.type';
import { IMAGE_SIZE } from '@constants/image-size';
import { getImage } from '@utils/get-image';
import styled from 'styled-components';

interface TMovieImagesProps {
  data: TMovieImagesFetchRes;
}

const MovieLogoImage = ({ data }: TMovieImagesProps) => {
  const [scrollY, setScrollY] = useState(0);
  const movieImage = data?.logos.length !== 0 ? data?.logos[0] : null;
  const aspectRatio = movieImage?.aspect_ratio as number;
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <S.Container style={{ transform: `translateY(${scrollY * 0.6}px)` }} $isLogoExist={!!movieImage}>
      <S.ImageWrapper>
        {movieImage && (
          <S.LogoImage src={getImage(IMAGE_SIZE.logo_sizes.size05, movieImage?.file_path)} $aspectRatio={aspectRatio} />
        )}
      </S.ImageWrapper>
    </S.Container>
  );
};

export default MovieLogoImage;

const S = {
  Container: styled.div<{ $isLogoExist: boolean }>`
    width: 100%;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${(props) => !props.$isLogoExist && 170}px;
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
