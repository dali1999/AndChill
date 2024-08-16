import { keyframes, css } from 'styled-components';

const loading = keyframes`
  0% {
    left: -50%
  }
  
  100% {
    left: 90%;
  }
`;

export const skeleton = css`
  position: relative;
  background: var(--indigo02);
  overflow: hidden;
`;

export const skeletonAnimation = css`
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: 100%;
  background: linear-gradient(to right, var(--indigo02), var(--indigo04), var(--indigo02));
  animation: ${loading} 1s infinite linear;
`;
