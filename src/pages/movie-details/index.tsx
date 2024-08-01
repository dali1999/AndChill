import React from 'react';
import { useMovieDetailsQuery } from '@hooks/react-query/use-query-movie';
import { useParams } from 'react-router-dom';

const MovieDetails: React.FC = () => {
  const { movieId } = useParams<Record<string, string>>();

  const movieIdNumber: number = Number(movieId);

  const { data: movieDetailsData, isLoading, isError } = useMovieDetailsQuery(movieIdNumber);
  //   console.log(movieDetailsData);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div>
      <h1>Movie Details</h1>
      <p>Movie ID: {movieIdNumber}</p>
      <p>{movieDetailsData?.title}</p>
    </div>
  );
};

export default MovieDetails;
