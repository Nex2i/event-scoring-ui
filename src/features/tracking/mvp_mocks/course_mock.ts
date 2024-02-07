import { Course } from '@/types/models/tracker/tracker.type';
import { round_mock } from './round_mock';

export const course_mock: Course = {
  id: '1',
  name: 'Your first course',
  rounds: [round_mock],
  startTime: new Date(),
  endTime: new Date(),
};
