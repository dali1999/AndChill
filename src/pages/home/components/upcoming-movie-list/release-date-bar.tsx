import React from 'react';
import fireIcon from '@assets/icons/fire.svg';
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
    animation: ${animateWidth} 2s cubic-bezier(0.3, 0, 0.2, 1);
    background: linear-gradient(270deg, #fe0e0e 17.19%, #eec42b 75.52%, #e7c02d 99.99%) no-repeat;
  `,

  FireIcon: styled.img`
    position: absolute;
    width: 15px;
    height: 25px;
    top: -17px;
    right: -10px;
  `,

  DdayLabel: styled.div`
    background-color: var(--dark02);
    position: absolute;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 3px 0;
    width: 35px;
    border: 1px solid var(--dark01);
    top: -40px;
    right: -20px;
  `,
};

export default ReleaseDateBar;
