import { FC, useEffect } from 'react';
import * as Styled from '../tracking.styles';
import { Bullseye } from './bullseye';
import { ScoreTable } from './scoreTable';
import { setActiveCourse, setActiveRound, trackerSelector, updateRoundTotal } from '@/stores/slices/Tracker.slice';
import { useAppDispatch } from '@/stores/store.hooks';
import { course_mock } from '../mvp_mocks/course_mock';
import { round_mock } from '../mvp_mocks/round_mock';

interface TrackerProps {}

export const Tracker: FC<TrackerProps> = ({}) => {
  const trackerSlice = trackerSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setActiveCourse(course_mock));
    dispatch(setActiveRound(round_mock));
  }, []);

  const handleBullseyeClick = (value: number) => {
    console.log('You scored:', value);
    dispatch(updateRoundTotal(value));
  };

  return (
    <Styled.Column>
      <p>{trackerSlice.ActiveCourse?.name}</p>
      <p>{trackerSlice.ActiveRound?.name}</p>
      <p>TOTAL SCORE: {trackerSlice.ActiveRound?.totalScore}</p>
      <Bullseye onClick={handleBullseyeClick} />
      <ScoreTable numRows={10} />
    </Styled.Column>
  );
};
