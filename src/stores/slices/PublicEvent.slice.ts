import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EventModel } from '@/types/models/event/event.model';
import {
  UserCourseDataModel,
  UserShotDataModel,
  UserTargetDataModel,
} from '@/types/models/userInteraction/userCourseData.model';
import { useAppSelector } from '../store.hooks';
import { PublicEventState, RecordShotPayload } from '../sliceTypes/PublicEventState.type';

export const initialPublicEventState = {} as PublicEventState;

export const publicEventSliceName = 'publicEventSlice';

export const publicEventSlice = createSlice({
  name: publicEventSliceName,
  initialState: initialPublicEventState,
  reducers: {
    recordScore: recordUserScore,
    initializeEvent: (state, action: PayloadAction<EventModel>) => {
      state.activeEvent = action.payload;

      const firstCourseId = action.payload.Courses?.[0].id;
      state.userCourseData = createInitialCourse(firstCourseId);
    },
  },
});

export const publicEventSelector = () => useAppSelector((store) => store.publicEvent);

export const { recordScore, initializeEvent } = publicEventSlice.actions;

export default publicEventSlice.reducer;

function calculateTotalScore(targets: UserTargetDataModel[]) {
  console.log('targets', targets);
  return targets.reduce((acc, target) => acc + target.totalScore, 0);
}

function calculateShotsTotalScore(targets: UserShotDataModel[]) {
  return targets.reduce((acc, target) => acc + target.score, 0);
}

function createInitialCourse(courseId?: string): UserCourseDataModel {
  if (!courseId) {
    throw new Error('No courseId');
  }

  return {
    courseId: courseId,
    totalScore: 0,
    targets: [],
  };
}

function recordUserScore(state: PublicEventState, action: PayloadAction<RecordShotPayload>) {
  const { courseId, targetId, shotId, score } = action.payload;

  if (state.activeEvent === undefined) {
    console.error('No active event');
    return;
  }

  if (!state.userCourseData) {
    state.userCourseData = createInitialCourse(courseId);
  }

  const targetIndex = state.userCourseData.targets.findIndex(
    (target) => target.targetId === targetId
  );

  if (targetIndex === -1) {
    state.userCourseData.targets.push({
      targetId,
      totalScore: score,
      shots: [{ shotId, score, time: new Date() }],
    });
    state.userCourseData.totalScore = calculateTotalScore(state.userCourseData.targets);
    return;
  }

  const shotIndex = state.userCourseData.targets[targetIndex].shots.findIndex(
    (shot) => shot.shotId === shotId
  );

  if (shotIndex === -1) {
    state.userCourseData.targets[targetIndex].shots.push({ shotId, score, time: new Date() });
  } else {
    state.userCourseData.targets[targetIndex].shots[shotIndex] = {
      shotId,
      score,
      time: new Date(),
    };
  }

  state.userCourseData.targets[targetIndex].totalScore = calculateShotsTotalScore(
    state.userCourseData.targets[targetIndex].shots
  );
  state.userCourseData.totalScore = calculateTotalScore(state.userCourseData.targets);
}
