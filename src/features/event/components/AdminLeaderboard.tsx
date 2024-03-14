import { Card, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { FC } from 'react';
import { LeaderboardCourseRecord } from '@/types/models/leaderboard/leaderboard.type';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import { LeaderboardHeader } from '@/components/leaderboard/leaderboardHeader';
import { leaderboardColumns } from '@/components/leaderboard/types';
import { mapLeaderboardToTableData } from '@/components/leaderboard/mappers';
import * as Styled from '../event.styles';

interface AdminLeaderboardProps {
  leaderBoard: LeaderboardCourseRecord[] | null;
}

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
    <Styled.CourseResultCellCard>
      <Styled.LeaderboardTableContainer>
        <Table stickyHeader aria-label="sticky table">
          <LeaderboardHeader />
          <TableBody>
            {dataSet?.map((row, i) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                  {leaderboardColumns.map((column) => {
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
    </Styled.CourseResultCellCard>
  );
};
