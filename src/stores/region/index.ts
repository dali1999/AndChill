import { RegionState, selectRegionSlice } from '@stores/region/select-region-slice';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
