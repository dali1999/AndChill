import { TGenre } from '@api/genre/genre-request.type';

export const getRandomGenre = (genres: TGenre[] | undefined): TGenre | undefined => {
  if (genres) {
    const randomIndex = Math.floor(Math.random() * genres.length);
    return genres[randomIndex];
  }
};
