import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EventModel } from '@/types/models/event/event.model';
import {
  UserCourseDataModel,
  UserShotDataModel,
  UserTargetDataModel,
} from '@/types/models/userInteraction/userCourseData.model';
import localStorageRepository from '@/utils/localStorage.repository';
import { useAppSelector } from '../store.hooks';
import { PublicEventState, RecordShotPayload } from '../sliceTypes/PublicEventState.type';

const localCacheActiveUsername = localStorageRepository.getPublicEventUsername();
const localCachePoolUsernames = localStorageRepository.getPublicEventPoolUsernames();

function getActiveUsername() {
  if (localCacheActiveUsername) return localCacheActiveUsername;

  if (localCachePoolUsernames?.length) return localCachePoolUsernames[0];

  return '';
}

const initialPublicEventState = {
  activeUsername: getActiveUsername(),
  poolUsernames: localStorageRepository.getPublicEventPoolUsernames() || [],
} as PublicEventState;

export const publicEventSliceName = 'publicEventSlice';

export const publicEventSlice = createSlice({
  name: publicEventSliceName,
  initialState: initialPublicEventState,
  reducers: {
    recordScore: recordUserScore,
    initializeEvent: (state, action: PayloadAction<EventModel>) => {
      state.activeEvent = action.payload;
      localStorageRepository.setActivePublicEvent(action.payload);
    },
    initializeCourse: (state) => {
      state.userCourseData = createInitialCourse(
        state.activeUsername,
        state.activeEvent?.Courses![0].id
      );
    },
    setActiveShotId: (state, action: PayloadAction<string>) => {
      state.activeShotId = action.payload;
    },
    setActiveUsername: setActiveUsernameFunc,
    addPoolUsername: (state, action: PayloadAction<string>) => {
      if (state.poolUsernames.length === 0) {
        state.activeUsername = action.payload;
      }
      state.poolUsernames.push(action.payload);
      localStorageRepository.setPublicEventPoolUsernames(state.poolUsernames);
    },
  },
});

export const publicEventSelector = () => useAppSelector((store) => store.publicEvent);
export const getActiveTotals = (): number => {
  const { userCourseData, activeUsername } = publicEventSelector();
  if (!userCourseData || !activeUsername || !userCourseData[activeUsername]) {
    return 0;
  }
  return userCourseData[activeUsername].totalScore ?? 0;
};

export const {
  recordScore,
  initializeEvent,
  setActiveShotId,
  setActiveUsername,
  initializeCourse,
  addPoolUsername,
} = publicEventSlice.actions;

export default publicEventSlice.reducer;

function calculateTotalScore(targets: UserTargetDataModel[]) {
  return targets.reduce((acc, target) => acc + target.totalScore, 0);
}

function calculateShotsTotalScore(targets: UserShotDataModel[]) {
  return targets.reduce((acc, target) => acc + target.score, 0);
}

function createInitialCourse(
  activeUsername?: string,
  courseId?: string
): Record<string, UserCourseDataModel> {
  if (!courseId) {
    throw new Error('No courseId');
  }

  if (!activeUsername) {
    throw new Error('No activeUsername');
  }

  const cachedUserCourseData = localStorageRepository.getUserCourseData(courseId);
  if (cachedUserCourseData) {
    return cachedUserCourseData;
  }

  const userCourseData: Record<string, UserCourseDataModel> = {};

  userCourseData[activeUsername] = {
    courseId: courseId,
    totalScore: 0,
    username: activeUsername,
    targets: [],
  };

  localStorageRepository.setUserCourseData(courseId, userCourseData);

  return userCourseData;
}

function setActiveUsernameFunc(state: PublicEventState, action: PayloadAction<string>) {
  state.activeUsername = action.payload;
  localStorageRepository.setPublicEventUsername(action.payload);

  if (!state.userCourseData) {
    state.userCourseData = createInitialCourse(action.payload, state.activeEvent?.Courses![0].id);
  }

  if (!state.userCourseData[action.payload]) {
    state.userCourseData[action.payload] = {
      courseId: state.activeEvent!.Courses![0].id,
      totalScore: 0,
      username: action.payload,
      targets: [],
    };
    localStorageRepository.setUserCourseData(
      state.activeEvent!.Courses![0].id,
      state.userCourseData
    );
  }
}

function recordUserScore(state: PublicEventState, action: PayloadAction<RecordShotPayload>) {
  const { courseId, targetId, shotId, score } = action.payload;
  const { activeUsername } = state;

  if (state.activeEvent === undefined) {
    console.error('No active event');
    return;
  }

  if (!state.userCourseData) {
    state.userCourseData = createInitialCourse(activeUsername, courseId);
  }

  if (!state.userCourseData[activeUsername]) {
    state.userCourseData[activeUsername] = {
      courseId: courseId,
      totalScore: 0,
      username: activeUsername,
      targets: [],
    };
  }

  const targetIndex = state.userCourseData[activeUsername]!.targets.findIndex(
    (target) => target.targetId === targetId
  );

  if (targetIndex === -1) {
    state.userCourseData[activeUsername]!.targets.push({
      targetId,
      totalScore: score,
      shots: [{ shotId, score, time: new Date() }],
    });
    state.userCourseData[activeUsername]!.totalScore = calculateTotalScore(
      state.userCourseData[activeUsername]!.targets
    );

    return;
  }

  const shotIndex = state.userCourseData[activeUsername]!.targets[targetIndex].shots.findIndex(
    (shot) => shot.shotId === shotId
  );

  if (shotIndex === -1) {
    state.userCourseData[activeUsername]!.targets[targetIndex].shots.push({
      shotId,
      score,
      time: new Date(),
    });
  } else {
    state.userCourseData[activeUsername]!.targets[targetIndex].shots[shotIndex] = {
      shotId,
      score,
      time: new Date(),
    };
  }

  state.userCourseData[activeUsername]!.targets[targetIndex].totalScore = calculateShotsTotalScore(
    state.userCourseData[activeUsername]!.targets[targetIndex].shots
  );
  state.userCourseData[activeUsername]!.totalScore = calculateTotalScore(
    state.userCourseData[activeUsername]!.targets
  );

  localStorageRepository.setUserCourseData(courseId, state.userCourseData);
}
