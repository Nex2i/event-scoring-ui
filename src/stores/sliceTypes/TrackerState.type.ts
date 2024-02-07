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

export const initialRound: Round = {
  id: '1',
  name: 'My first round',
  targets: [
    {
      id: '1',
      name: 'First target',
      targetTotal: 0,
      shots: [
        {
          id: '1',
          score: 0,
          timestamp: new Date(),
        },
        {
          id: '2',
          score: 0,
          timestamp: new Date(),
        },
      ],
      startTime: new Date(),
      endTime: new Date(),
    },
    {
      id: '2',
      name: 'Second target',
      targetTotal: 0,
      shots: [
        {
          id: '1',
          score: 0,
          timestamp: new Date(),
        },
        {
          id: '2',
          score: 0,
          timestamp: new Date(),
        },
      ],
      startTime: new Date(),
      endTime: new Date(),
    },
  ],
  roundTotal: 0,
  startTime: new Date(),
  endTime: new Date(),
};
