import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Course, Round } from '@/types/models/tracker/tracker.type';
import { useAppSelector } from '../store.hooks';
import { TrackerState } from '../sliceTypes/TrackerState.type';
import localStorageRepository from '@/utils/localStorage.repository';

type setShotPayload = {
  targetId: string;
  shotId: string;
  shotScore: number;
};

export const initialTrackerState: TrackerState = {} as TrackerState;
export const trackerSliceName = 'trackerSlice';
export const trackerSlice = createSlice({
  name: trackerSliceName,
  initialState: initialTrackerState,
  reducers: {
    setActiveCourse: (state, action: PayloadAction<Course>) => {
      state.ActiveCourse = action.payload;
    },
    setActiveRound: (state, action: PayloadAction<Round>) => {
      state.ActiveRound = action.payload;
      localStorageRepository.setActiveRound(action.payload);
    },
    setShot: (state, action: PayloadAction<setShotPayload>) => {
      const { targetId, shotScore, shotId } = action.payload;
      const targetIndex = state.ActiveRound.targets.findIndex((target) => target.id === targetId);
      const shotIndex = state.ActiveRound.targets[targetIndex].shots.findIndex((shot) => shot.id === shotId);
      state.ActiveRound.targets[targetIndex].shots[shotIndex].score = shotScore;
      state.ActiveRound.targets[targetIndex].shots[shotIndex].timestamp = new Date();
      state.ActiveRound.targets[targetIndex].targetTotal += shotScore;
      state.ActiveRound.roundTotal += shotScore;
      localStorageRepository.setActiveRound(state.ActiveRound);
    },
    resetTracker: (state) => {
      state.ActiveCourse = initialTrackerState.ActiveCourse;
      state.ActiveRound = initialTrackerState.ActiveRound;
      localStorageRepository.deleteActiveRound();
    },
  },
});

export const trackerSelector = () => useAppSelector((store) => store.tracker);

export const { setActiveCourse, setActiveRound, setShot, resetTracker } = trackerSlice.actions;

export default trackerSlice.reducer;
