import { TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import { IMAGE_SIZE } from '@constants/image-size';
import { calculateLeftDays } from '@pages/home/utils/calculate-left-days';
import { device } from '@styles/breakpoints';
import { getImage } from '@utils/get-image';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReleaseDateBar from './release-date-bar';

interface TUpcomingMovieItemProps {
  data: TMovieListsItem;
}

const UpcomingMovieItem = ({ data }: TUpcomingMovieItemProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const daysLeft = calculateLeftDays(data.release_date);
  const backDropImageUrl = data.backdrop_path
    ? getImage(IMAGE_SIZE.backdrop_sizes.size02, data.backdrop_path)
    : '/andchill-logo.png';

  return (
    <li onClick={() => navigate(`/movie-details/${data.id}`)}>
      <S.Container>
        <S.MovieImage src={backDropImageUrl} className="scale-on-hover" />
        <S.PopularityLabel>
          <S.Popularity>{Math.round(data.popularity)} </S.Popularity>
          {t('home.upcoming_label')}
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
    @media ${device.mobile} {
      width: 300px;
      height: 154px;
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
    @media ${device.mobile} {
      padding: 0 16px;
      height: 38px;
      font-size: 12px;
    }
  `,

  Popularity: styled.span`
    color: var(--yellow01);
    margin-right: 4px;
    font-size: 18px;
    font-weight: 600;
    @media ${device.mobile} {
      font-size: 15px;
    }
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
    @media ${device.mobile} {
      top: 48px;
      left: 26px;
    }
  `,

  MovieTitle: styled.p`
    position: absolute;
    top: 88px;
    left: 30px;
    font-weight: 600;
    font-size: 22px;
    @media ${device.mobile} {
      top: 74px;
      left: 26px;
    }
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
