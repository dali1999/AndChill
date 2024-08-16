import { useState } from 'react';
import { TMovieCreditsFetchRes } from '@api/movie/movie-request.type';
import CarouselButton, { Button } from '@components/carousel/carousel-button';
import { IMAGE_SIZE } from '@constants/image-size';
import { getImage } from '@utils/get-image';
import styled from 'styled-components';

interface TMovieCreditsProps {
  data: TMovieCreditsFetchRes;
}

const MovieCredits = ({ data }: TMovieCreditsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const castsData = data.cast;
  const length = castsData.length || 0;
  return (
    <S.Container>
      <S.Title>출연진</S.Title>
      <S.CastListWrapper>
        <S.CastList $curIndex={currentIndex}>
          {castsData.map((cast) => (
            <S.CastItem key={cast.cast_id}>
              {cast.profile_path ? (
                <S.ProfileImage
                  src={getImage(IMAGE_SIZE.profile_sizes.size02, cast.profile_path)}
                  alt="출연진 프로필 이미지"
                />
              ) : (
                <S.DummyImageWrapper>
                  <S.DummyImage src="/andchill-favicon.svg" alt="출연진 기본 프로필 이미지" />
                </S.DummyImageWrapper>
              )}
              <S.RoleWrapper>
                <p>{cast.name}</p>
                <p>{cast.character}</p>
              </S.RoleWrapper>
            </S.CastItem>
          ))}
        </S.CastList>
      </S.CastListWrapper>

      <CarouselButton
        length={length}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        perSlide={2}
        positionTop={40 + 30}
        positionLR={-10}
        width={40}
        height={110}
        backgroundColor="var(--indigo02)"
      />
    </S.Container>
  );
};

export default MovieCredits;

const S = {
  Container: styled.div`
    padding: 20px 0;
    position: relative;

    &:hover ${Button} {
      opacity: 0.8;
    }
  `,

  Title: styled.h2`
    margin-bottom: 20px;
    height: 30px;
  `,

  CastListWrapper: styled.div`
    overflow: hidden;
  `,

  CastList: styled.ul<{ $curIndex: number }>`
    display: flex;
    gap: 20px;
    transform: ${({ $curIndex }) => `translateX(-${$curIndex * (190 + 20)}px)`};
    transition: 0.3s ease-in-out;
    width: 100%;
  `,

  CastItem: styled.li`
    display: flex;
    align-items: center;
    gap: 10px;
    height: 110px;

    p {
      width: 110px;
    }
    & p:nth-child(1) {
      font-size: 15px;
      font-weight: 100;
    }
    & p:nth-child(2) {
      font-size: 12px;
      font-weight: 100;
      color: var(--gray01);
    }
  `,

  ProfileImage: styled.img`
    border-radius: 40px;
    width: 70px;
    height: 110px;
  `,

  DummyImageWrapper: styled.div`
    border-radius: 40px;
    width: 70px;
    height: 110px;
    background-color: var(--indigo05);
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  DummyImage: styled.img`
    opacity: 0.5;
    width: 40px;
    height: 31px;
  `,

  RoleWrapper: styled.div``,
};
