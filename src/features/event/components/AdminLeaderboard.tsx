import { Card, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { FC } from 'react';
import { LeaderboardCourseRecord } from '@/types/models/leaderboard/leaderboard.type';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import * as Styled from '../event.styles';

interface AdminLeaderboardProps {
  leaderBoard: LeaderboardCourseRecord[] | null;
}

interface TableData {
  rank: number;
  username: string;
  score: number;
}

interface Column {
  id: 'rank' | 'username' | 'score';
  label: string;
  minWidth?: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  format?: (value: number) => string;
}

const columns: Column[] = [
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

export const AdminLeaderboard: FC<AdminLeaderboardProps> = ({ leaderBoard }) => {
  if (leaderBoard === null) return <LoadingComponent />;
  if (!leaderBoard.length) {
    return (
      <Card>
        <p>No completions</p>
      </Card>
    );
  }

  const dataSet = mapLeaderboardToTableData(leaderBoard);

  return (
    <Styled.CourseResultCell>
      <Styled.LeaderboardTableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataSet?.map((row, i) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Styled.LeaderboardTableContainer>
    </Styled.CourseResultCell>
  );
};

function mapLeaderboardToTableData(leaderBoard: LeaderboardCourseRecord[]): TableData[] {
  return leaderBoard.map((record, i) => ({
    rank: i + 1,
    username: record.username,
    score: record.totalScore,
  }));
}
