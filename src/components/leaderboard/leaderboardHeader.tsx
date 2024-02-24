import { TableHead, TableRow, TableCell } from '@mui/material';
import { FC } from 'react';
import { leaderboardColumns } from './types';

interface leaderboardHeaderProps {}

export const LeaderboardHeader: FC<leaderboardHeaderProps> = ({}) => {
  return (
    <TableHead>
      <TableRow>
        {leaderboardColumns.map((column) => (
          <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
