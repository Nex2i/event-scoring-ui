export interface LeaderboardTableData {
  rank: number;
  username: string;
  score: number;
  userId: string;
}

export interface Column {
  id: 'rank' | 'username' | 'score';
  label: string;
  minWidth?: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  format?: (value: number) => string;
}

export const leaderboardColumns: Column[] = [
  {
    id: 'rank',
    label: 'Rank',
    minWidth: '3%',
    align: 'left',
  },
  {
    id: 'username',
    label: 'User Id',
    minWidth: '50%',
    align: 'left',
  },
  {
    id: 'score',
    label: 'Score',
    minWidth: '10%',
    align: 'right',
  },
];
