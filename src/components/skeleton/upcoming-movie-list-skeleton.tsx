import styled from 'styled-components';

const UpcomingMovieListSkeleton = () => {
  return <S.Skeleton>로딩중...</S.Skeleton>;
};
export default UpcomingMovieListSkeleton;

const S = {
  Skeleton: styled.div`
    height: 180px;
    margin: 20px 0 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
