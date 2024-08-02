import React from 'react';
import { useMovieDetailsQuery } from '@hooks/react-query/use-query-movie';
import { getImage } from '@utils/get-image';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const MovieDetails: React.FC = () => {
  const { movieId } = useParams<Record<string, string>>();
  const movieIdNumber: number = Number(movieId);
  const { data: movieDetailsData, isLoading, isError } = useMovieDetailsQuery(movieIdNumber);

  const imageUrl = getImage('w780', movieDetailsData?.poster_path);
  const collectionImageUrl = getImage('w780', movieDetailsData?.belongs_to_collection?.poster_path);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div>
      {/* <h1>영화 정보</h1> */}
      <h1>{movieDetailsData?.title}</h1>
      <S.GenreList>{movieDetailsData?.genres.map((genre) => <li>{genre.name}</li>)}</S.GenreList>
      <p>{movieDetailsData?.overview}</p>
      <S.Image src={imageUrl} />
      {movieDetailsData?.belongs_to_collection?.poster_path ? (
        <S.Image src={collectionImageUrl} />
      ) : (
        <p>No Collection</p>
      )}
    </div>
  );
};

export default MovieDetails;

const S = {
  GenreList: styled.ul`
    display: flex;
    gap: 10px;
    margin: 10px 0 30px 0;
  `,

  Image: styled.img`
    width: 300px;
    margin: 20px 0;
  `,
};
