import { useState } from 'react';
import { TPeopleImagesFetchRes } from '@api/people/people-request.type';
import CarouselButton, { Button } from '@components/carousel/carousel-button';
import { IMAGE_SIZE } from '@constants/image-size';
import { fadeIn } from '@styles/animations';
import { device } from '@styles/breakpoints';
import { getImage } from '@utils/get-image';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface TPeopleImagesProps {
  data: TPeopleImagesFetchRes;
}

const PeopleImages = ({ data }: TPeopleImagesProps) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const movieImages = data?.profiles;
  const imageDatalength = movieImages?.length || 0;

  return (
    <S.Container>
      {imageDatalength !== 0 ? (
        <S.MovieImageListWrapper>
          <S.MovieImageList $curIndex={currentIndex}>
            {movieImages
              .slice(1)
              ?.map((image) => (
                <S.BackdropImage
                  key={image.file_path}
                  src={getImage(IMAGE_SIZE.profile_sizes.size02, image.file_path)}
                />
              ))}
          </S.MovieImageList>

          <CarouselButton
            length={imageDatalength}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            perSlide={1}
            positionTop={14}
            positionLR={-10}
            width={60}
            height={271}
            backgroundColor="var(--dark09)"
          />
        </S.MovieImageListWrapper>
      ) : (
        <S.NoImageText>{t('people_details.no_image')}</S.NoImageText>
      )}
    </S.Container>
  );
};

export default PeopleImages;

const S = {
  Container: styled.div`
    margin: 20px 5% 40px;
    @media ${device.mobile} {
      margin: 20px 4% 20px;
    }
    ::-webkit-scrollbar {
      display: none;
    }
  `,

  MovieImageListWrapper: styled.div`
    position: relative;
    overflow: hidden;
    padding-top: 14px;

    &:hover ${Button} {
      opacity: 0.6;
    }
    @media ${device.mobile} {
      overflow: auto;
    }
  `,

  MovieImageList: styled.ul<{ $curIndex: number }>`
    display: flex;
    gap: 20px;
    transform: ${({ $curIndex }) => `translateX(-${$curIndex * (150 + 20)}px)`};
    transition: 0.4s ease-in-out;
    animation: ${fadeIn} 0.5s ease-in;
    @media ${device.mobile} {
      gap: 10px;
    }
  `,

  BackdropImage: styled.img`
    width: 180px;
    border-radius: 4px;
    @media ${device.mobile} {
      width: 140px;
    }
  `,

  NoImageText: styled.p`
    text-align: center;
    font-size: 14px;
    color: var(--indigo08);
  `,
};
