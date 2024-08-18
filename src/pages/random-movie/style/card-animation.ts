import { keyframes } from 'styled-components';

export const shuffle1 = keyframes`
  0% {
      z-index: 6;
      transform : translate(0%, 0%);
  }
  5% {
      transform : translate(-65%, 0%) skewY(4deg);
      z-index: 6;
  }
  6% {
      z-index: 0;
  }
  10% {
      z-index: 0;
      transform : translate(0%, 0%);
  }
  20% {
      z-index: 1;
  }
  30%{z-index: 2;}
  40%{z-index: 3;}
  50%{z-index: 4;}
  60%{z-index: 5;}
  100%{z-index: 6; }

`;
export const shuffle2 = keyframes`
  0% {
      z-index: 5;
  }
  10% {
      z-index: 6;
      transform : translate(0%, 0%);
  }
  15% {
      transform : translate(65%, -10%) skewY(-4deg);
      z-index: 6;
  }
  16% {
      z-index: 0;
  }
  20% {
      z-index: 0;
      transform : translate(0%, 0%);
  }
  30%{z-index: 1;}
  40%{z-index: 2;}
  50%{z-index: 3;}
  60%{z-index: 4;}
  100%{z-index: 5;}

`;
export const shuffle3 = keyframes`
  0% {
      z-index: 4;
  }
  10% {
      z-index: 5;
  }
  20%{
      z-index: 6;
      transform : translate(0%, 0%);
  }
  25% {
      transform : translate(-65%, 0%) skewY(4deg);
      z-index: 6;
  }
  26% {
      z-index: 0;
  }
  30% {
      z-index: 0;
      transform : translate(0%, 0%);
  }
  40%{z-index: 1;}
  50%{z-index: 2;}
  60%{z-index: 3;}
  100%{z-index: 4;}

`;
export const shuffle4 = keyframes`
  0%{
      z-index: 3;
  }
  10% {
      z-index: 4;
  }
  20% {
      z-index: 5;
  }
  30% {
      z-index: 6;
      transform : translate(0%, 0%);
  }
  35% {
    transform : translate(65%, -10%) skewY(-4deg);
      z-index: 6;
  }
  36% {
      z-index: 0;
  }
  40% {
      z-index: 0;
      transform : translate(0%, 0%);
  }
  50%{z-index: 1;}
  60%{z-index: 2;}
  100%{z-index: 3;}

`;
export const shuffle5 = keyframes`
  0% {
      z-index: 2;
  }
  10% {
      z-index: 3;
  }
  20% {
      z-index: 4;
  }
  30%{
      z-index: 5;
  }
  40% {
      z-index: 6;
      transform : translate(0%, 0%);
  }
  45% {
      transform : translate(-65%, 0%) skewY(4deg);
      z-index: 6;
  }
  46% {
      z-index: 0;
  }
  50% {
      z-index: 0;
      transform : translate(0%, 0%);
  }
  60%{z-index: 1;}
  100%{z-index: 2;}

`;
export const shuffle6 = keyframes`
  0% {
      z-index: 1;
  }
  10% {
      z-index: 2;
  }
  20% {
      z-index: 3;
  }
  30%{
      z-index: 4;
  }
  40% {
      z-index: 5;
  }
  50% {
      z-index: 6;
      transform : translate(0%, 0%);
  }
  55% {
    transform : translate(65%, -10%) skewY(-4deg);
      z-index: 6;
  }
  56% {
      z-index: 0;
  }
  60% {
      z-index: 0;
      transform : translate(0%, 0%);
  }
  100%{z-index: 1;}

`;

export const glowAnimation = (color: string) => keyframes` 
  0% {
    filter: drop-shadow(0 0 2px ${color}) drop-shadow(0 0 2px ${color})
    drop-shadow(0 0 10px ${color});
  }
  50% {
    filter: drop-shadow(0 0 8px ${color}) drop-shadow(0 0 2px ${color})
    drop-shadow(0 0 10px ${color});
  }
  100% {
    filter: drop-shadow(0 0 2px ${color}) drop-shadow(0 0 2px ${color})
    drop-shadow(0 0 10px ${color});
  }
`;

export const spreadAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(calc(var(--row) * 320px - 140px - var(--index) * 4px)) translateX(calc(var(--col) * 220px - 204px - var(--index) * 5px));
  }
`;

export const stackAnimation = keyframes`
  0% {
    transform: translateY(calc(var(--row) * 320px - 140px - var(--index) * 4px)) translateX(calc(var(--col) * 220px - 204px - var(--index) * 5px));
  }
  100% {
    transform: translateY(0) translateX(0);
  }
`;
