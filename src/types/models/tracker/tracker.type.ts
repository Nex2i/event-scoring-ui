export interface Shot {
  id: string;
  score: number;
  timestamp: Date;
}

export interface Target {
  id: string;
  name: string;
  shots: Shot[];
  startTime: Date;
  endTime: Date;
}

export interface Round {
  id: string;
  name: string;
  targets: Target[];
  totalScore: number;
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
