import { TGenre } from '@api/genre/genre-request.type';

export const getRandomGenre = (genres: TGenre[] | undefined): TGenre[] | undefined => {
  if (genres) {
    const firstIdx = Math.floor(Math.random() * genres.length);

    let secondIdx: number;
    do {
      secondIdx = Math.floor(Math.random() * genres.length);
    } while (secondIdx === firstIdx);

    return [genres[firstIdx], genres[secondIdx]];
  }
};
