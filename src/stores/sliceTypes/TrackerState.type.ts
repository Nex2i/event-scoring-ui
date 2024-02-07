import { Course, Round } from '@/types/models/tracker/tracker.type';

export class TrackerState {
  ActiveCourse: Course = {
    name: 'Your first course',
    id: '1',
    rounds: [],
    startTime: new Date(),
    endTime: new Date(),
  } as Course;
  ActiveRound: Round = {} as Round;
}
