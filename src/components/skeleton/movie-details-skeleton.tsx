import { skeleton, skeletonAnimation } from '@styles/skeleton';
import styled from 'styled-components';

const MovieDetailsSkeleton = () => {
  return (
    <S.container>
      <S.DummyContent></S.DummyContent>
    </S.container>
  );
};

export default MovieDetailsSkeleton;

const S = {
  container: styled.div`
    overflow: hidden;
    background-color: var(--indigo02);
    border-radius: 20px 20px 0 0;
    width: 100%;
    max-width: 1500px;
    height: 1200px;
    box-shadow: rgb(0, 0, 0) 0px 20px 80px -10px;
    margin-top: 170px;

    ${skeleton}
    &::before {
      ${skeletonAnimation}
    }
  `,
  DummyContent: styled.div`
    width: 100%;
    ${skeleton}
    &::before {
      ${skeletonAnimation}
    }
  `,
};
