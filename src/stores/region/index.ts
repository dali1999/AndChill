import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import { RegionState, selectRegionSlice } from './select-region-slice';

type SliceCreator = RegionState;

export const useRegionStore = create<SliceCreator>()(
  persist(
    (...set) => ({
      ...selectRegionSlice(...set),
    }),
    {
      name: 'region-storage',
    },
  ),
);
