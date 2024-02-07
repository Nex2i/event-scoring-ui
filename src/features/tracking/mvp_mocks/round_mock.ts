import { Round } from '@/types/models/tracker/tracker.type';

export const round_mock: Round = {
  id: generateUniqueStringId(),
  name: 'My first round',
  targets: [
    {
      id: generateUniqueStringId(),
      name: 'First target',
      targetTotal: 0,
      shots: [
        {
          id: generateUniqueStringId(),
          score: null,
          timestamp: new Date(),
          name: 'First shot',
        },
        {
          id: generateUniqueStringId(),
          score: null,
          timestamp: new Date(),
          name: 'Second shot',
        },
      ],
      startTime: new Date(),
      endTime: new Date(),
    },
    {
      id: generateUniqueStringId(),
      name: 'Second target',
      targetTotal: 0,
      shots: [
        {
          id: generateUniqueStringId(),
          score: null,
          timestamp: new Date(),
          name: 'First shot',
        },
        {
          id: generateUniqueStringId(),
          score: null,
          timestamp: new Date(),
          name: 'Second shot',
        },
      ],
      startTime: new Date(),
      endTime: new Date(),
    },
    {
      id: generateUniqueStringId(),
      name: 'Third target',
      targetTotal: 0,
      shots: [
        {
          id: generateUniqueStringId(),
          score: null,
          timestamp: new Date(),
          name: 'First shot',
        },
        {
          id: generateUniqueStringId(),
          score: null,
          timestamp: new Date(),
          name: 'Second shot',
        },
      ],
      startTime: new Date(),
      endTime: new Date(),
    },
    {
      id: generateUniqueStringId(),
      name: 'Fourth target',
      targetTotal: 0,
      shots: [
        {
          id: generateUniqueStringId(),
          score: null,
          timestamp: new Date(),
          name: 'First shot',
        },
        {
          id: generateUniqueStringId(),
          score: null,
          timestamp: new Date(),
          name: 'Second shot',
        },
      ],
      startTime: new Date(),
      endTime: new Date(),
    },
    {
      id: generateUniqueStringId(),
      name: 'Fith target',
      targetTotal: 0,
      shots: [
        {
          id: generateUniqueStringId(),
          score: null,
          timestamp: new Date(),
          name: 'First shot',
        },
        {
          id: generateUniqueStringId(),
          score: null,
          timestamp: new Date(),
          name: 'Second shot',
        },
      ],
      startTime: new Date(),
      endTime: new Date(),
    },
    {
      id: generateUniqueStringId(),
      name: 'Sixth target',
      targetTotal: 0,
      shots: [
        {
          id: generateUniqueStringId(),
          score: null,
          timestamp: new Date(),
          name: 'First shot',
        },
        {
          id: generateUniqueStringId(),
          score: null,
          timestamp: new Date(),
          name: 'Second shot',
        },
      ],
      startTime: new Date(),
      endTime: new Date(),
    },
    {
      id: generateUniqueStringId(),
      name: 'Seventh target',
      targetTotal: 0,
      shots: [
        {
          id: generateUniqueStringId(),
          score: null,
          timestamp: new Date(),
          name: 'First shot',
        },
        {
          id: generateUniqueStringId(),
          score: null,
          timestamp: new Date(),
          name: 'Second shot',
        },
      ],
      startTime: new Date(),
      endTime: new Date(),
    },
    {
      id: generateUniqueStringId(),
      name: 'Eighth target',
      targetTotal: 0,
      shots: [
        {
          id: generateUniqueStringId(),
          score: null,
          timestamp: new Date(),
          name: 'First shot',
        },
        {
          id: generateUniqueStringId(),
          score: null,
          timestamp: new Date(),
          name: 'Second shot',
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

function generateUniqueStringId() {
  return Math.random().toString(36).substring(2);
}
