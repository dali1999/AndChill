/* eslint-disable no-unused-vars */
import { StateCreator } from 'zustand';

export interface RegionState {
  region: string;
  setRegion: (name: string) => void;
  initGroupId: () => void;
}

export const selectRegionSlice: StateCreator<RegionState> = (set) => ({
  region: '',
  setRegion: (region: string) => set({ region }),
  initGroupId: () => set(() => ({ region: '' })),
});
