import { FC, useEffect, useState } from 'react';
import { setActiveCourse, setActiveRound, setShot, trackerSelector } from '@/stores/slices/Tracker.slice';
import { useAppDispatch } from '@/stores/store.hooks';
import * as Styled from '../tracking.styles';
import { course_mock } from '../mvp_mocks/course_mock';
import { round_mock } from '../mvp_mocks/round_mock';
import ScoreTable from './scoreTable';
import { Bullseye } from './bullseye';

interface TrackerProps {}

export const Tracker: FC<TrackerProps> = ({}) => {
  const trackerSlice = trackerSelector();

  const [finishedLastRound, setFinishedLastRound] = useState<boolean>(false);
  const [activeTargetId, setActiveTargetId] = useState<string>();
  const [activeShotId, setActiveShotId] = useState<string>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setActiveCourse(course_mock));
    dispatch(setActiveRound(round_mock));
    setActiveTargetId(round_mock?.targets[0].id);
    setActiveShotId(round_mock?.targets[0].shots[0].id);
  }, []);

  const handleBullseyeClick = (shotScore: number) => {
    if (!activeTargetId || !activeShotId || finishedLastRound) return;

    dispatch(setShot({ targetId: activeTargetId, shotScore, shotId: activeShotId }));
    goToNextShot();
  };

  const goToNextShot = () => {
    if (!activeTargetId || !activeShotId) return;

    const targetIndex = trackerSlice.ActiveRound?.targets.findIndex((target) => target.id === activeTargetId);
    const shotIndex = trackerSlice.ActiveRound?.targets[targetIndex!].shots.findIndex(
      (shot) => shot.id === activeShotId
    );

    if (shotIndex === trackerSlice.ActiveRound?.targets[targetIndex!].shots.length - 1) {
      if (targetIndex === trackerSlice.ActiveRound?.targets.length - 1) {
        setFinishedLastRound(true);
        return;
      }
      setActiveTargetId(trackerSlice.ActiveRound?.targets[targetIndex! + 1].id);
      setActiveShotId(trackerSlice.ActiveRound?.targets[targetIndex! + 1].shots[0].id);
      return;
    }
    setActiveShotId(trackerSlice.ActiveRound?.targets[targetIndex!].shots[shotIndex! + 1].id);
  };

  const onCellClick = (targetId: string, shotId: string) => {
    setActiveTargetId(targetId);
    setActiveShotId(shotId);
  };

  return (
    <Styled.Column>
      <Styled.Row align="space-between">
        <div>
          <p>{trackerSlice.ActiveCourse?.name}</p>
          <p>{trackerSlice.ActiveRound?.name}</p>
        </div>
        <p>TOTAL SCORE: {trackerSlice.ActiveRound?.roundTotal}</p>
      </Styled.Row>
      <Bullseye onClick={handleBullseyeClick} />
      <ScoreTable
        roundData={trackerSlice.ActiveRound}
        onCellClick={onCellClick}
        activeTargetId={activeTargetId!}
        activeShotId={activeShotId!}
      />
    </Styled.Column>
  );
};
