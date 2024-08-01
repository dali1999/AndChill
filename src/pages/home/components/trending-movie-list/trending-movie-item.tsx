import { TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import { getImage } from '@utils/get-image';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

interface TTrendingMovieItemProps {
  data: TMovieListsItem;
}

const TrendingMovieItem = ({ data }: TTrendingMovieItemProps) => {
  const navigate = useNavigate();

  return (
    <li onClick={() => navigate(`/${data.id}`)}>
      <S.Container>
        <S.MovieImage src={getImage(data.poster_path)} className="scale-on-hover" />
        <S.Dummy>
          <S.MovieInfo>
            <S.MovieTitle>{data.title}</S.MovieTitle>
            <S.MovieOverView>{data.overview}</S.MovieOverView>
          </S.MovieInfo>
        </S.Dummy>
      </S.Container>
    </li>
  );
};
export default TrendingMovieItem;

const scrollCredits = keyframes`
  0% {
    top: 50%;
  }
  100% {
    top: -100%;
  }
`;

const S = {
  Container: styled.div`
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border-radius: 7px;
    &:hover .scale-on-hover {
      transform: scale(1.1);
    }
  `,

  MovieImage: styled.img`
    width: 200px;
    aspect-ratio: 1/1.5;
    border-radius: 7px;
    transition: transform 0.4s ease;
  `,

  Dummy: styled.div`
    color: white;
    position: absolute;
    display: flex;
    opacity: 0;
    align-items: center;
    justify-content: center;
    top: 0;
    width: 200px;
    aspect-ratio: 1/1.5;

    &:hover {
      background-color: rgba(0, 0, 0, 0.6);
      opacity: 1;
      div:nth-child(1) {
        padding: 15px;
        position: absolute;
        animation: ${scrollCredits} 15s linear infinite;
      }
    }
  `,

  MovieInfo: styled.div``,

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
