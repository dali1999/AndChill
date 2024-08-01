import loadingIcon from '@assets/icons/loading.svg';
import styled from 'styled-components';

interface TUpcomingMovieListSkeletonProps {
  text?: string;
}

const UpcomingMovieListSkeleton = ({ text }: TUpcomingMovieListSkeletonProps) => {
  return (
    <S.Skeleton>
      {text ? (
        <p>{text}</p>
      ) : (
        <>
          <S.LoadingIcon src={loadingIcon} />
        </>
      )}
    </S.Skeleton>
  );
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

  LoadingIcon: styled.img`
    width: 40px;
    height: 40px;
  `,
};
