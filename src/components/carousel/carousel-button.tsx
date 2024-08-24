import { Dispatch, SetStateAction } from 'react';
import leftRight from '@assets/icons/arrow-left.svg';
import arrowRight from '@assets/icons/arrow-right.svg';
import { device } from '@styles/breakpoints';
import styled from 'styled-components';

interface TCarouselButtonProps {
  length: number | undefined;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  perSlide: number;
  positionTop: number;
  positionLR: number;
  width: number;
  height: number;
  backgroundColor: string;
}

const CarouselButton = ({
  length,
  currentIndex,
  setCurrentIndex,
  perSlide,
  positionTop,
  positionLR,
  width,
  height,
  backgroundColor,
}: TCarouselButtonProps) => {
  const handleNext = () => {
    if (length && currentIndex < length - perSlide) {
      setCurrentIndex((prev) => prev + perSlide);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - perSlide);
    }
  };

  return (
    <>
      <S.PrevButton
        onClick={handlePrev}
        $curIndex={currentIndex}
        $positionTop={positionTop}
        $positionLR={positionLR}
        $width={width}
        $height={height}
        $bgColor={backgroundColor}
      >
        <img src={leftRight} />
      </S.PrevButton>
      <S.NextButton
        onClick={handleNext}
        $curIndex={currentIndex}
        $totalLength={length}
        $perSlide={perSlide}
        $positionTop={positionTop}
        $positionLR={positionLR}
        $width={width}
        $height={height}
        $bgColor={backgroundColor}
      >
        <img src={arrowRight} />
      </S.NextButton>
    </>
  );
};

export default CarouselButton;

export const Button = styled.button<{ $positionTop: number; $width: number; $height: number }>`
  opacity: 0;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 100;
  top: calc(${(props) => props.$positionTop}px);
  font-size: 30px;
  transition: 0.4s ease-in-out;
  clip-path: inset(-50px -50px -50px -50px);
  img {
    width: 30px;
    height: 30px;
  }
  @media ${device.mobile} {
    display: none;
  }
`;

const S = {
  PrevButton: styled(Button)<{ $curIndex: number; $positionLR: number; $bgColor: string }>`
    left: ${(props) => props.$positionLR}px;
    visibility: ${(props) => props.$curIndex <= 0 && 'hidden'};
    background: linear-gradient(to right, ${(props) => props.$bgColor} 60%, rgba(75, 0, 130, 0) 100%);
  `,

  NextButton: styled(Button)<{
    $curIndex: number;
    $totalLength: number | undefined;
    $perSlide: number;
    $positionLR: number;
    $bgColor: string;
  }>`
    right: ${(props) => props.$positionLR}px;
    visibility: ${(props) => props.$totalLength && props.$curIndex >= props.$totalLength - props.$perSlide && 'hidden'};
    background: linear-gradient(to left, ${(props) => props.$bgColor} 60%, rgba(75, 0, 130, 0) 100%);
  `,
};
