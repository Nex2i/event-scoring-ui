import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '../store.hooks';
import { TrackerState } from '../sliceTypes/TrackerState.type';
import { Course, Round } from '@/types/models/tracker/tracker.type';

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
    },
    updateRoundTotal: (state, action: PayloadAction<number>) => {
      state.ActiveRound.totalScore += action.payload;
    },
    resetTracker: (state) => {
      state.ActiveCourse = initialTrackerState.ActiveCourse;
      state.ActiveRound = initialTrackerState.ActiveRound;
    },
  },
});

export const trackerSelector = () => useAppSelector((store) => store.tracker);

export const { setActiveCourse, setActiveRound, updateRoundTotal, resetTracker } = trackerSlice.actions;

export default trackerSlice.reducer;
