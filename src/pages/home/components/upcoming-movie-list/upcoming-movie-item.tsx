import { TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import { IMAGE_SIZE } from '@constants/image-size';
import { calculateLeftDays } from '@pages/home/utils/calculate-left-days';
import { getImage } from '@utils/get-image';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReleaseDateBar from './release-date-bar';

interface TUpcomingMovieItemProps {
  data: TMovieListsItem;
}

const UpcomingMovieItem = ({ data }: TUpcomingMovieItemProps) => {
  const navigate = useNavigate();
  const daysLeft = calculateLeftDays(data.release_date);
  const backDropImageUrl = data.backdrop_path
    ? getImage(IMAGE_SIZE.backdrop_sizes.size02, data.backdrop_path)
    : '/andchill-logo.png';

  return (
    <li onClick={() => navigate(`/${data.id}`)}>
      <S.Container>
        <S.MovieImage src={backDropImageUrl} className="scale-on-hover" />
        <S.PopularityLabel>
          <S.Popularity>{Math.round(data.popularity)} </S.Popularity>
          만큼 기대중
        </S.PopularityLabel>
        <S.MovieReleaseDate>{data.release_date}</S.MovieReleaseDate>
        <S.MovieTitle>{data.title}</S.MovieTitle>
        {daysLeft <= 105 && daysLeft >= 0 && <ReleaseDateBar daysLeft={daysLeft} />}
        {daysLeft < 0 && <S.RereleaseLabel>재개봉작</S.RereleaseLabel>}
      </S.Container>
    </li>
  );
};
export default UpcomingMovieItem;

const S = {
  Container: styled.div`
    width: 360px;
    height: 180px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    background-color: var(--dark01);
    &:hover .scale-on-hover {
      transform: scale(1.08);
    }
  `,

  PopularityLabel: styled.div`
    position: absolute;
    top: 0;
    right: 0;
    background-color: var(--white);
    background-color: var(--dark04);
    border-radius: 0 0 0 20px;
    padding: 0 20px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
  `,

  Popularity: styled.span`
    color: var(--yellow01);
    margin-right: 4px;
    font-size: 18px;
    font-weight: 600;
  `,

  MovieImage: styled.img`
    opacity: 0.3;
    transition: transform 0.4s ease;
  `,

  MovieReleaseDate: styled.p`
    position: absolute;
    color: var(--gray02);
    font-size: 17px;
    top: 60px;
    left: 30px;
    font-size: 16px;
  `,

  MovieTitle: styled.p`
    position: absolute;
    top: 88px;
    left: 30px;
    font-weight: 600;
    font-size: 22px;
  `,

  RereleaseLabel: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--yellow01);
    color: var(--dark04);
    font-weight: 600;
    font-size: 15px;
    padding: 6px 10px;
    position: absolute;
    bottom: 15px;
    right: 20px;
    border-radius: 7px;
  `,
};
