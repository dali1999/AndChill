import React from 'react';
import fireIcon from '@assets/icons/popcorn.svg';
import styled, { keyframes } from 'styled-components';

interface TReleaseDateBarProps {
  daysLeft: number;
}

const ReleaseDateBar = ({ daysLeft }: TReleaseDateBarProps) => {
  return (
    <React.Fragment>
      <S.ReleaseDateBar></S.ReleaseDateBar>
      <S.ProgressBar $percentage={100 - daysLeft}>
        <S.FireIcon src={fireIcon} alt="불 아이콘" />
        <S.DdayLabel>D-{daysLeft}</S.DdayLabel>
      </S.ProgressBar>
    </React.Fragment>
  );
};

const animateWidth = keyframes`
  from {
    width: 0;
  }
  to {
    width: var(--percentage);
  }
`;

const S = {
  ReleaseDateBar: styled.div`
    position: absolute;
    bottom: 8px;
    width: 100%;
    height: 6px;
    background-color: #704a00;
  `,

  ProgressBar: styled.div<{ $percentage: number }>`
    --percentage: ${({ $percentage }) => `${$percentage - 5}%`};
    position: absolute;
    bottom: 8px;
    width: var(--percentage);
    height: 6px;
    animation: ${animateWidth} 2.5s cubic-bezier(0.2, 0, 0.2, 1);
    background: linear-gradient(270deg, var(--red01) 30%, var(--yellow01) 70%) no-repeat;
    background-color: var(--yellow01);
  `,

  FireIcon: styled.img`
    position: absolute;
    width: 25px;
    height: 25px;
    top: -17px;
    right: -14px;
    z-index: 1;
  `,

  DdayLabel: styled.div`
    background-color: var(--dark04);
    border: 1px solid var(--dark02);
    color: var(--yellow01);
    font-weight: 600;
    font-size: 12px;

    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 3px 0;
    width: 40px;
    top: -36px;
    right: -22px;
    z-index: 0;
  `,
};

export default ReleaseDateBar;
