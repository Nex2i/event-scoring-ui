import { Round, Target } from '@/types/models/tracker/tracker.type';

const numberOfTargets = 8;
const numberOfShotsPerTarget = 2;

export const generateRound = (
  targets: number = numberOfTargets,
  shots: number = numberOfShotsPerTarget
): Round => {
  const targetsBuilt: Target[] = Array.from({ length: targets }, (_, i) => {
    return {
      id: generateUniqueStringId(),
      name: `Target ${i + 1}`,
      targetTotal: 0,
      bullseye: {
        id: generateUniqueStringId(),
        name: 'Bullseye',
        rings: [
          { value: 0, color: 'white', id: generateUniqueStringId() },
          { value: 5, color: 'black', id: generateUniqueStringId() },
          { value: 8, color: 'blue', id: generateUniqueStringId() },
          { value: 10, color: 'red', id: generateUniqueStringId() },
          { value: 12, color: 'yellow', id: generateUniqueStringId() },
        ],
      },
      shots: Array.from({ length: shots }, (_, i) => {
        return {
          id: generateUniqueStringId(),
          value: null,
          timestamp: new Date(),
          name: `Shot ${i + 1}`,
          score: null, // Add the 'score' property here
        };
      }),
      startTime: new Date(),
      endTime: new Date(),
    };
  });

  return {
    id: generateUniqueStringId(),
    name: 'My first round',
    targets: targetsBuilt,
    roundTotal: 0,
    startTime: new Date(),
    endTime: new Date(),
  };
};

export const round_mock: Round = generateRound();

function generateUniqueStringId() {
  return Math.random().toString(36).substring(2);
}
