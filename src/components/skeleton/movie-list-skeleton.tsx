import loadingIcon from '@assets/icons/loading.svg';
import styled from 'styled-components';

interface TMovieListSkeletonProps {
  text?: string;
  height?: number;
}

// 포스터 높이 200px 기준으로 초기값 설정
const MovieListSkeleton = ({ text, height = 300 }: TMovieListSkeletonProps) => {
  return (
    <S.Container $height={height}>
      {text ? (
        <S.NoDataText>{text}</S.NoDataText>
      ) : (
        <>
          <S.LoadingIcon src={loadingIcon} />
        </>
      )}
    </S.Container>
  );
};
export default MovieListSkeleton;

const S = {
  Container: styled.div<{ $height: number }>`
    height: ${(props) => `${props.$height}px`};
    margin: 20px 0 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  NoDataText: styled.p`
    font-weight: 100;
    color: var(--gray02);
  `,

  LoadingIcon: styled.img`
    width: 40px;
    height: 40px;
  `,
};
