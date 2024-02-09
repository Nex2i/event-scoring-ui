import { Bullseye, Round, Target } from '@/types/models/tracker/tracker.type';

const numberOfTargets = 8;
const numberOfShotsPerTarget = 1;

const generateRound = (): Round => {
  const targets: Target[] = Array.from({ length: numberOfTargets }, (_, i) => {
    return {
      id: generateUniqueStringId(),
      name: `Target ${i + 1}`,
      targetTotal: 0,
      bullseye: {
        id: generateUniqueStringId(),
        name: 'Bullseye',
        rings: [
          { score: 0, color: 'white', id: generateUniqueStringId() },
          { score: 5, color: 'black', id: generateUniqueStringId() },
          { score: 8, color: 'blue', id: generateUniqueStringId() },
          { score: 10, color: 'red', id: generateUniqueStringId() },
          { score: 12, color: 'yellow', id: generateUniqueStringId() },
        ],
      },
      shots: Array.from({ length: numberOfShotsPerTarget }, (_, i) => {
        return {
          id: generateUniqueStringId(),
          score: null,
          timestamp: new Date(),
          name: `Shot ${i + 1}`,
        };
      }),
      startTime: new Date(),
      endTime: new Date(),
    };
  });

  return {
    id: generateUniqueStringId(),
    name: 'My first round',
    targets,
    roundTotal: 0,
    startTime: new Date(),
    endTime: new Date(),
  };
};

export const round_mock: Round = generateRound();

function generateUniqueStringId() {
  return Math.random().toString(36).substring(2);
}
