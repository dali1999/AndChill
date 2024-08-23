/* eslint-disable no-unused-vars */
import { TMovieListsItem } from '@api/movie-lists/movie-lists-request.type';
import { StateCreator } from 'zustand';

export interface CardState {
  flipped: boolean[];
  movieDeck: TMovieListsItem[] | undefined;
  setFlipped: (flipped: boolean[]) => void;
  setMovieDeck: (deck: TMovieListsItem[] | undefined) => void;
  resetCardState: () => void;
}

export const selectCardSlice: StateCreator<CardState> = (set) => ({
  flipped: Array(6).fill(false),
  movieDeck: [],

  setFlipped: (flipped: boolean[]) => set({ flipped }),
  setMovieDeck: (deck: TMovieListsItem[] | undefined) => set({ movieDeck: deck }),
  resetCardState: () => set(() => ({ flipped: Array(6).fill(false), movieDeck: [] })),
});
