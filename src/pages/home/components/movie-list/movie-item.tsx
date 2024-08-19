import { useState } from 'react';
import { TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import { IMAGE_SIZE } from '@constants/image-size';
import { useGenreListQuery } from '@hooks/react-query/use-query-genre';
import { useRegionStore } from '@stores/region';
import { getGenreById } from '@utils/get-genre-by-id';
import { getImage } from '@utils/get-image';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

interface TMovieItemProps {
  data: TMovieListsItem;
}

const MovieItem = ({ data }: TMovieItemProps) => {
  const lang = useRegionStore((state) => state.language);
  const navigate = useNavigate();
  const { data: genreListData } = useGenreListQuery(lang);
  const genreList = genreListData?.genres;
  const mappedGenres = getGenreById(data, genreList);
  const [hovered, setHovered] = useState(false);

  return (
    <S.Container
      onClick={() => navigate(`/movie-details/${data.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {data.poster_path ? (
        <S.MovieImage src={getImage(IMAGE_SIZE.poster_sizes.size04, data.poster_path)} className="scale-on-hover" />
      ) : (
        <S.DummyImageWrapper>
          <S.NoPosterMovieTitle>
            <h3>{data.title}</h3>
            <p>{data.release_date?.slice(0, 4)}</p>
          </S.NoPosterMovieTitle>
          <S.DummyImage src="/andchill-logo-300.png" className="scale-on-hover" />
        </S.DummyImageWrapper>
      )}
      <S.MovieLightInfo $isOverview={!!data.overview}>
        {hovered && (
          <div>
            <S.MovieGenreList>
              {mappedGenres?.map((genre) => {
                return <S.MovieGenreItem key={genre}>{genre}</S.MovieGenreItem>;
              })}
            </S.MovieGenreList>
            <S.MovieTitle>{data.title}</S.MovieTitle>
            <S.MovieOverView>{data.overview}</S.MovieOverView>
          </div>
        )}
      </S.MovieLightInfo>
    </S.Container>
  );
};
export default MovieItem;

const scrollCredits = keyframes`
  0% {
    top: 40%;
  }
  100% {
    top: -100%;
  }
`;

const S = {
  Container: styled.div`
    width: 200px;
    aspect-ratio: 1/1.5;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border-radius: 7px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 18px;
    &:hover .scale-on-hover {
      transform: scale(1.08);
    }
  `,

  MovieImage: styled.img`
    border-radius: 7px;
    transition: transform 0.4s ease-in-out;
    background-color: var(--indigo05);
  `,

  DummyImageWrapper: styled.div`
    box-shadow: inset 0px 3px 33px rgba(0, 0, 0, 0.3);
    background-color: var(--indigo04);
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  NoPosterMovieTitle: styled.div`
    position: absolute;
    top: 45px;
    width: 100%;
    padding: 0 12px;
    text-align: center;
    h3 {
      font-size: 18px;
      margin-bottom: 8px;
      color: var(--gray03);
    }
    p {
      font-size: 16px;
      color: var(--gray01);
    }
  `,

  DummyImage: styled.img`
    transition: transform 0.4s ease-in-out;
    opacity: 0.3;
    height: 80px;
  `,

  MovieLightInfo: styled.div<{ $isOverview: boolean }>`
    color: white;
    position: absolute;
    display: flex;
    opacity: 0;
    align-items: center;
    justify-content: center;
    top: 0;
    width: 200px;
    aspect-ratio: 1/1.5;
    transition: 0.4s ease-in-out;

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
      opacity: 1;
      div {
        padding: 15px;
        position: absolute;
        animation: ${scrollCredits} 10s linear infinite;
        animation: ${scrollCredits} ${({ $isOverview }) => ($isOverview ? 10 : 0)}s linear infinite;
      }
    }
  `,

  MovieGenreList: styled.ul`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  `,

  MovieGenreItem: styled.li`
    background-color: var(--yellow01);
    font-weight: 600;
    font-size: 13px;
    padding: 3px 5px;
    border-radius: 3px;
    color: var(--dark04);
  `,

  MovieTitle: styled.p`
    font-weight: 600;
    font-size: 19px;
    text-align: center;
    margin-bottom: 10px;
  `,

  MovieOverView: styled.p`
    font-size: 14px;
    line-height: 23px;
  `,
};
