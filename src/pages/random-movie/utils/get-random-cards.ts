import { TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import { TEXT } from '@pages/random-movie/constants/text';

export const getRandomSixCards = (deck: TMovieListsItem[] | undefined) => {
  if (!deck) return;

  const shuffledDeck = [...deck];

  for (let i = 19; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }

  return shuffledDeck.slice(0, 6);
};

export const getRandomText = () => {
  const strArray = TEXT;
  const randomText = strArray[Math.floor(Math.random() * strArray.length)];

  return randomText;
};
