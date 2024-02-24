import { FC } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Card } from '@mui/material';
import { LeaderboardAverageUserShot } from '@/types/models/leaderboard/leaderboard.type';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import * as Styled from '../event.styles';

interface CourseStatsProps {
  averages: LeaderboardAverageUserShot[] | null;
}

const chartSetting = {
  yAxis: [
    {
      label: 'Average Score',
    },
  ],
  width: getViewWidth(),
  height: 300,
};

function getViewWidth(): number {
  return window.innerWidth / 2;
}

export const CourseStats: FC<CourseStatsProps> = ({ averages }) => {
  if (averages === null) return <LoadingComponent />;
  if (averages[0].averageScore === null)
    return (
      <Card>
        <p>No data available</p>
      </Card>
    );

  const dataSet = formatAverages(averages);
  const valueFormatter = (value: number) => `${value} points`;

  return (
    <Styled.CourseResultCell>
      <BarChart
        dataset={dataSet}
        xAxis={[{ scaleType: 'band', dataKey: 'targetName' }]}
        series={[{ dataKey: 'averageScore', label: 'Average Score Per Target', valueFormatter }]}
        {...chartSetting}
      />
    </Styled.CourseResultCell>
  );
};

function formatAverages(averages: LeaderboardAverageUserShot[]) {
  return averages.map((target) => ({
    targetName: target.targetName,
    averageScore: target.averageScore,
  }));
}
