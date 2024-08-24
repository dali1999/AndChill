import { useEffect, useState } from 'react';
import { TMovieCrew, TMovieDetailsFetchRes } from '@api/movie/movie-request.type';
import { IMAGE_SIZE } from '@constants/image-size';
import { claculateRuntime } from '@pages/movie-details/utils/calculate-runtime';
import { fadeIn } from '@styles/animations';
import { device } from '@styles/breakpoints';
import { getImage } from '@utils/get-image';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MovieRate from './movie-rate';

interface TMovieInfoProps {
  data: TMovieDetailsFetchRes;
  directors: TMovieCrew[];
  lang: string;
}

const MovieInfo = ({ data, directors, lang }: TMovieInfoProps) => {
  const { t } = useTranslation();
  const [formattedRuntime, setFormattedRuntime] = useState<number[] | undefined>([]);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const { runtime, title, release_date, vote_average, genres, tagline, overview, vote_count, belongs_to_collection } =
    data;
  const posterURL = getImage(IMAGE_SIZE.poster_sizes.size04, data?.poster_path);
  const backdropURL = getImage(IMAGE_SIZE.backdrop_sizes.size03, data?.backdrop_path);

  useEffect(() => {
    setFormattedRuntime(claculateRuntime(runtime));
  }, [runtime]);

  return (
    <S.Container $backdropURL={backdropURL} $isImageExist={!!data.backdrop_path}>
      {belongs_to_collection && (
        <S.CollectionLabel
          onClick={() => navigate(`/movie-collections/${belongs_to_collection.id}`)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? belongs_to_collection.name : '다른 시리즈도 볼래요?'}
        </S.CollectionLabel>
      )}

      {data.poster_path ? (
        <S.PosterImage src={posterURL} />
      ) : (
        <S.DummyImageWrapper>
          <S.DummyImage src={'/andchill-logo-800.png'} />
        </S.DummyImageWrapper>
      )}

      <S.MovieInfoWrapper>
        <S.Title>
          <h1>{title}</h1>
          <span>({release_date ? release_date.slice(0, 4) : ' - '})</span>
        </S.Title>

        <S.GenreList>
          {genres.map((genre) => (
            <S.GenreItem key={genre.id}>{genre.name}</S.GenreItem>
          ))}
          {formattedRuntime && (
            <p>
              • {formattedRuntime[0]}
              {t('movie_details.hour')} {formattedRuntime[1]}
              {t('movie_details.min')}
            </p>
          )}
        </S.GenreList>

        <MovieRate rate={vote_average} voteCounts={vote_count} />

        <S.Overview>
          <p>{tagline}</p>
          {overview ? (
            <p>{overview}</p>
          ) : (
            <S.NoOverviewText>{t('movie_details.no_overview', { lang })}</S.NoOverviewText>
          )}
        </S.Overview>

        <S.Directors>
          {directors.map((director) => (
            <li key={director.id} onClick={() => navigate(`/people-details/${director.id}`)}>
              <S.DirectorName>{director.name}</S.DirectorName>
              <S.DirectorJob>{director.job}</S.DirectorJob>
            </li>
          ))}
        </S.Directors>
      </S.MovieInfoWrapper>
    </S.Container>
  );
};

export default MovieInfo;

const S = {
  Container: styled.div<{ $backdropURL: string; $isImageExist: boolean }>`
    position: relative;
    padding: 40px;
    display: flex;
    gap: 40px;
    z-index: 1;
    border-bottom: ${({ $isImageExist }) => !$isImageExist && `2px solid var(--indigo04)`};
    @media ${device.mobile} {
      padding: 26px 4% 4%;
    }

    &::before {
      content: '';
      background-image: url(${({ $backdropURL }) => $backdropURL});
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0.1;
      border-radius: 20px 20px 0 0;
      z-index: -1;
      @media ${device.mobile} {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }
  `,

  CollectionLabel: styled.div`
    cursor: pointer;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 24px;
    border-radius: 10px 3px 0 10px;
    right: -14px;
    top: 154px;
    font-weight: 800;
    font-size: 16px;
    color: var(--dark04);
    background-color: var(--yellow02);
    height: 44px;
    transition: width 0.2s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 10px 10px;
    animation: ${fadeIn} 0.5s ease-in;
    @media ${device.mobile} {
      right: -14px;
      top: 136px;
    }

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 44px;
      right: -0px;
      border-width: 14px 14px 0px 0px;
      border-style: solid;
      border-color: var(--yellow03) transparent transparent;
    }
  `,

  PosterImage: styled.img`
    animation: ${fadeIn} 0.5s ease-in;
    width: 330px;
    border-radius: 6px;

    @media ${device.mobile} {
      display: none;
    }
  `,

  DummyImageWrapper: styled.div`
    animation: ${fadeIn} 0.5s ease-in;
    background-color: var(--indigo04);
    padding: 0 25px;
    height: 470px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
  `,

  DummyImage: styled.img`
    opacity: 0.1;
    width: 280px;
    height: 120px;
  `,

  MovieInfoWrapper: styled.div`
    animation: ${fadeIn} 0.5s ease-in;
    width: 100%;
    height: 100%;
  `,

  Title: styled.div`
    margin-bottom: 20px;
    display: flex;
    gap: 8px;
    align-items: center;
    text-align: baseline;
    h1 {
      font-weight: 600;
      @media ${device.mobile} {
        font-size: 26px;
      }
    }
    span {
      font-size: 25px;
      color: var(--gray02);
    }
  `,

  GenreList: styled.ul`
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px 0 30px 0;
    flex-wrap: wrap;
  `,

  GenreItem: styled.li`
    background-color: var(--yellow01);
    font-weight: 600;
    font-size: 13px;
    padding: 3px 5px;
    border-radius: 3px;
    color: var(--dark04);
  `,

  Overview: styled.div`
    font-size: 16px;
    line-height: 26px;
    color: var(--gray03);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media ${device.mobile} {
      font-size: 14px;
    }

    & p:first-child {
      margin-bottom: 10px;
      font-weight: 600;
      font-size: 20px;
      color: var(--gray01);
      @media ${device.mobile} {
        font-size: 16px;
      }
    }
  `,

  NoOverviewText: styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 180px;
    color: var(--indigo08);
    font-weight: 600;
  `,

  Directors: styled.ul`
    margin-top: 40px;
    display: flex;
    gap: 34px;
    li {
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
  `,
  DirectorName: styled.p`
    font-size: 18px;
  `,
  DirectorJob: styled.p`
    margin-top: 4px;
    font-size: 14px;
    color: var(--gray01);
  `,
};
