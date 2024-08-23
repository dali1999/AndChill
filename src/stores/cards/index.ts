import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CardState, selectCardSlice } from './cards-state-slice';

type SliceCreator = CardState;

export const useCardStore = create<SliceCreator>()(
  persist(
    (...set) => ({
      ...selectCardSlice(...set),
    }),
    {
      name: 'card-storage',
    },
  ),
);
