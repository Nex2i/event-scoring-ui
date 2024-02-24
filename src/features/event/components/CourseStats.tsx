import { FC } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LeaderboardAverageUserShot } from '@/types/models/leaderboard/leaderboard.type';
import { Card } from '@mui/material';

interface CourseStatsProps {
  averages: LeaderboardAverageUserShot[];
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
  const dataSet = formatAverages(averages);
  const valueFormatter = (value: number) => `${value} points`;

  return (
    <Card>
      <BarChart
        dataset={dataSet}
        xAxis={[{ scaleType: 'band', dataKey: 'targetName' }]}
        series={[{ dataKey: 'averageScore', label: 'Average Score Per Target', valueFormatter }]}
        {...chartSetting}
      />
    </Card>
  );
};

function formatAverages(averages: LeaderboardAverageUserShot[]) {
  return averages.map((target) => ({
    targetName: target.targetName,
    averageScore: target.averageScore,
  }));
}
