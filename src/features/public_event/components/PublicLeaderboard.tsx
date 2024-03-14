import { Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { FC } from 'react';
import { LeaderboardHeader } from '@/components/leaderboard/leaderboardHeader';
import { mapLeaderboardToTableData } from '@/components/leaderboard/mappers';
import { LeaderboardTableData, leaderboardColumns } from '@/components/leaderboard/types';
import { useGuestLeaderboard } from '@/hooks/leaderboard/useGuestLeaderboard.hook';
import { authenticationSelector } from '@/stores/slices/Authentication.slice';
import { getOrdinal } from '@/utils/ordinal';
import * as Styled from '../publicEvent.styles';

interface PublicLeaderboardProps {
  eventId: string;
}

export const PublicLeaderboard: FC<PublicLeaderboardProps> = ({ eventId }) => {
  const { userId } = authenticationSelector();
  const { isFetching: isLeaderboardFetching, userLeaderboard } = useGuestLeaderboard(eventId);

  if (isLeaderboardFetching || !userLeaderboard) return <div>Loading...</div>;

  const dataSet = mapLeaderboardToTableData(userLeaderboard);
  const userRank = findUserRank(dataSet, userId);
  return (
    <Styled.LeaderboardContainer>
      <Typography variant="h6">Your Rank: {userRank}</Typography>
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
    </Styled.LeaderboardContainer>
  );
};

function findUserRank(dataSet: LeaderboardTableData[], userId: string): string {
  const userData = dataSet.find((record: LeaderboardTableData) => record.userId === userId);
  if (!userData) return 'N/A';

  return getOrdinal(userData?.rank);
}
