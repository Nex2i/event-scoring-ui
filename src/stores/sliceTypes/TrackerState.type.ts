import { round_mock } from '@/features/tracking/mvp_mocks/round_mock';
import { Course, Round } from '@/types/models/tracker/tracker.type';

export class TrackerState {
  ActiveCourse: Course = {
    name: 'Your first course',
    id: '1',
    rounds: [initialRound],
    startTime: new Date(),
    endTime: new Date(),
  } as Course;
  ActiveRound: Round = initialRound;
}

export const initialRound: Round = round_mock;
