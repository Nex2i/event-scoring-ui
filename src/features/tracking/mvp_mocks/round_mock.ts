import { Round } from '@/types/models/tracker/tracker.type';

export const round_mock: Round = {
  id: '1',
  name: 'My first round',
  targets: [
    {
      id: '1',
      name: 'First target',
      shots: [
        {
          id: '1',
          score: 5,
          timestamp: new Date(),
        },
        {
          id: '2',
          score: 4,
          timestamp: new Date(),
        },
        {
          id: '3',
          score: 3,
          timestamp: new Date(),
        },
        {
          id: '4',
          score: 2,
          timestamp: new Date(),
        },
        {
          id: '5',
          score: 1,
          timestamp: new Date(),
        },
      ],
      startTime: new Date(),
      endTime: new Date(),
    },
    {
      id: '2',
      name: 'Second target',
      shots: [
        {
          id: '6',
          score: 5,
          timestamp: new Date(),
        },
        {
          id: '7',
          score: 4,
          timestamp: new Date(),
        },
        {
          id: '8',
          score: 3,
          timestamp: new Date(),
        },
        {
          id: '9',
          score: 2,
          timestamp: new Date(),
        },
        {
          id: '10',
          score: 1,
          timestamp: new Date(),
        },
      ],
      startTime: new Date(),
      endTime: new Date(),
    },
  ],
  totalScore: 0,
  startTime: new Date(),
  endTime: new Date(),
};
