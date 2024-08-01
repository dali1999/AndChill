import { TGenre } from '@api/genre/genre-request.type';
import { TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';

export const getGenreById = (movieData: TMovieListsItem, genreList: TGenre[] | undefined) => {
  const mappedGenres = movieData.genre_ids
    .map((id) => {
      const genre = genreList?.find((genre) => genre.id === id);
      return genre ? genre.name : null;
    })
    .filter((name) => name !== null);

  return mappedGenres;
};
