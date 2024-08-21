import { useState } from 'react';
import { TMovieCreditsFetchRes } from '@api/movie/movie-request.type';
import CarouselButton, { Button } from '@components/carousel/carousel-button';
import { IMAGE_SIZE } from '@constants/image-size';
import { getImage } from '@utils/get-image';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MovieDetailsSectionTemplate from './movie-details-section-template';

interface TMovieCreditsProps {
  data: TMovieCreditsFetchRes;
}

const MovieCredits = ({ data }: TMovieCreditsProps) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const castsData = data.cast;
  const length = castsData.length || 0;
  return (
    <MovieDetailsSectionTemplate title="출연진">
      <S.CastListWrapper>
        {length === 0 && <S.NoCreditText>인물 정보가 없습니다</S.NoCreditText>}
        <S.CastList $curIndex={currentIndex}>
          {castsData.map((cast) => (
            <S.CastItem key={cast.cast_id} onClick={() => navigate(`/people-details/${cast.id}`)}>
              {cast.profile_path ? (
                <S.ProfileImageWrapper>
                  <S.ProfileImage
                    src={getImage(IMAGE_SIZE.profile_sizes.size02, cast.profile_path)}
                    alt="출연진 프로필 이미지"
                  />
                </S.ProfileImageWrapper>
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

        <CarouselButton
          length={length}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          perSlide={2}
          positionTop={0}
          positionLR={-10}
          width={40}
          height={110}
          backgroundColor="var(--indigo02)"
        />
      </S.CastListWrapper>
    </MovieDetailsSectionTemplate>
  );
};

export default MovieCredits;

const S = {
  CastListWrapper: styled.div`
    position: relative;
    overflow: hidden;
    &:hover ${Button} {
      opacity: 0.8;
    }
  `,

  CastList: styled.ul<{ $curIndex: number }>`
    display: flex;
    gap: 20px;
    transform: ${({ $curIndex }) => `translateX(-${$curIndex * (190 + 20)}px)`};
    transition: 0.3s ease-in-out;
  `,

  CastItem: styled.li`
    display: flex;
    align-items: center;
    gap: 10px;
    height: 110px;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  `,

  ProfileImageWrapper: styled.div`
    border-radius: 40px;
    overflow: hidden;
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
    background-color: var(--indigo04);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0px 3px 13px rgba(0, 0, 0, 0.3);
  `,

  DummyImage: styled.img`
    opacity: 0.1;
    width: 40px;
    height: 31px;
  `,

  RoleWrapper: styled.div`
    width: 110px;
    & p:nth-child(1) {
      font-size: 15px;
      font-weight: 400;
      margin-bottom: 4px;
    }
    & p:nth-child(2) {
      font-size: 12px;
      font-weight: 100;
      color: var(--gray01);
    }
  `,

  NoCreditText: styled.p`
    font-size: 14px;
    color: var(--indigo08);
  `,
};
