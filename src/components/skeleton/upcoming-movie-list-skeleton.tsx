import styled from 'styled-components';

interface TUpcomingMovieListSkeletonProps {
  text: string;
}

const UpcomingMovieListSkeleton = ({ text }: TUpcomingMovieListSkeletonProps) => {
  return <S.Skeleton>{text}</S.Skeleton>;
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
