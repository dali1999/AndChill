import { TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import { getImage } from '@utils/get-image';
import styled from 'styled-components';

interface TUpcomingMovieItemProps {
  data: TMovieListsItem;
}

const UpcomingMovieItem = ({ data }: TUpcomingMovieItemProps) => {
  return (
    <S.Container>
      <S.MovieImage src={getImage(data.backdrop_path)} />
      <S.UpcomingLabel>{Math.round(data.popularity)}만큼 기대중</S.UpcomingLabel>
      <S.MovieReleaseDate>{data.release_date}</S.MovieReleaseDate>
      <S.MovieTitle>{data.title}</S.MovieTitle>
    </S.Container>
  );
};
export default UpcomingMovieItem;

const S = {
  Container: styled.li`
    position: relative;
  `,

  UpcomingLabel: styled.p`
    position: absolute;
    top: 0;
    right: 0;
    background-color: var(--white);
    color: black;
    border-radius: 0 20px 0 20px;
    width: 150px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: var(--dark06);
  `,

  MovieImage: styled.img`
    opacity: 0.4;
    width: 360px;
    height: 180px;
    border-radius: 20px;
  `,

  MovieReleaseDate: styled.p`
    position: absolute;
    color: var(--gray01);
    font-size: 17px;
    top: 22px;
    left: 30px;
  `,

  MovieTitle: styled.p`
    position: absolute;
    bottom: 40px;
    left: 30px;
    font-weight: 600;
    font-size: 22px;
  `,
};
