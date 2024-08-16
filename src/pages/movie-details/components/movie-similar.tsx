import { TMovieListsFetchRes } from '@api/movie-lists/movie-lists-request.type';
import MovieList from '@pages/home/components/movie-list/movie-list';
import MovieDetailsSectionTemplate from './movie-details-section-template';

interface TMovieSimilarProps {
  data: TMovieListsFetchRes;
}

const MovieSimilar = ({ data }: TMovieSimilarProps) => {
  const similarMoviesData = data.results;
  return (
    <MovieDetailsSectionTemplate title="유사한 영화">
      <MovieList data={similarMoviesData} />
    </MovieDetailsSectionTemplate>
  );
};

export default MovieSimilar;
