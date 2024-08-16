/* eslint-disable no-unused-vars */
import { StateCreator } from 'zustand';

export interface RegionState {
  region: string;
  language: string;
  setRegion: (region: string, language: string) => void;
  initGroupId: () => void;
}

export const selectRegionSlice: StateCreator<RegionState> = (set) => ({
  region: 'KR',
  language: 'ko',
  setRegion: (region: string, language: string) => set({ region, language }),
  initGroupId: () => set(() => ({ region: 'KR', language: 'ko' })),
});
