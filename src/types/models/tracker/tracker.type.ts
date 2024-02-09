import { Bullseye } from '../../../features/tracking/components/bullseye';
export interface Shot {
  id: string;
  score: number | null;
  timestamp: Date;
  name: string;
}

export interface Target {
  id: string;
  name: string;
  shots: Shot[];
  startTime: Date;
  endTime: Date;
  targetTotal: number;
  bullseye: Bullseye;
}

export interface Bullseye {
  id: string;
  name: string;
  rings: BullseyeRing[];
}

export interface BullseyeRing {
  id: string;
  color: string;
  score: number;
}

export interface Round {
  id: string;
  name: string;
  targets: Target[];
  roundTotal: number;
  startTime: Date;
  endTime: Date;
}

export interface Course {
  id: string;
  name: string;
  rounds: Round[];
  startTime: Date;
  endTime: Date;
}
