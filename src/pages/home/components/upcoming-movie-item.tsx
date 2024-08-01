import { TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import fireIcon from '@assets/icons/fire.svg';
import { getImage } from '@utils/get-image';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { calculateLeftDays } from '../utils/calculate-left-days';

interface TUpcomingMovieItemProps {
  data: TMovieListsItem;
}

const UpcomingMovieItem = ({ data }: TUpcomingMovieItemProps) => {
  const navigate = useNavigate();
  const daysLeft = calculateLeftDays(data.release_date);

  return (
    <li onClick={() => navigate(`/${data.id}`)}>
      <S.Container>
        <S.MovieImage src={getImage(data.backdrop_path)} className="scale-on-hover" />
        <S.UpcomingLabel>{Math.round(data.popularity)}만큼 기대중</S.UpcomingLabel>
        <S.MovieReleaseDate>{data.release_date}</S.MovieReleaseDate>
        <S.MovieTitle>{data.title}</S.MovieTitle>
        {daysLeft <= 105 && daysLeft >= 0 && (
          <>
            <S.ReleaseDateBar></S.ReleaseDateBar>
            <S.ProgressBar $percentage={100 - daysLeft}>
              <S.FireIcon src={fireIcon} alt="불 아이콘" />
              <S.DdayLabel>D-{daysLeft}</S.DdayLabel>
            </S.ProgressBar>
          </>
        )}
      </S.Container>
    </li>
  );
};
export default UpcomingMovieItem;

const animateWidth = keyframes`
  from {
    width: 0;
  }
  to {
    width: var(--percentage);
  }
`;

const S = {
  Container: styled.div`
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    &:hover .scale-on-hover {
      transform: scale(1.1);
    }
  `,

  UpcomingLabel: styled.p`
    position: absolute;
    top: 0;
    right: 0;
    background-color: var(--white);
    color: black;
    border-radius: 0 0 0 20px;
    width: 150px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: var(--dark06);
  `,

  MovieImage: styled.img`
    opacity: 0.5;
    width: 360px;
    height: 180px;
    border-radius: 20px;
    transition: transform 0.4s ease;
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
    bottom: 55px;
    left: 30px;
    font-weight: 600;
    font-size: 22px;
  `,

  ReleaseDateBar: styled.div`
    position: absolute;
    bottom: 8px;
    width: 100%;
    height: 6px;
    border: 1px solid var(--dark02);
    background-color: var(--dark01);
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
