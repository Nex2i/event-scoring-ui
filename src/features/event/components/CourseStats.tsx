import { FC, useEffect, useRef, useState } from 'react';
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
  height: 300,
};

export const CourseStats: FC<CourseStatsProps> = ({ averages }) => {
  if (averages === null) return <LoadingComponent />;
  if (averages[0].averageScore === null)
    return (
      <Card>
        <p>No data available</p>
      </Card>
    );
  const containerRef = useRef<HTMLDivElement>(null);

  const [graphWidth, setGraphWidth] = useState<number>(0); // Step 3

  useEffect(() => {
    const updateWidth = () => {
      const parentWidth = containerRef.current?.offsetWidth;
      if (parentWidth) {
        setGraphWidth(parentWidth * 0.9);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const dataSet = formatAverages(averages);
  const valueFormatter = (value: number) => `${value} points`;

  console.log('containerRef', graphWidth);

  return (
    <Styled.CourseResultCellCard ref={containerRef}>
      <BarChart
        dataset={dataSet}
        xAxis={[{ scaleType: 'band', dataKey: 'targetName' }]}
        series={[{ dataKey: 'averageScore', label: 'Average Score Per Target', valueFormatter }]}
        {...chartSetting}
        width={graphWidth}
      />
    </Styled.CourseResultCellCard>
  );
};

function formatAverages(averages: LeaderboardAverageUserShot[]) {
  return averages.map((target) => ({
    targetName: target.targetName,
    averageScore: target.averageScore,
  }));
}
