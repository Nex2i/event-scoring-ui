import { FC, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { setActiveRound, setShot, trackerSelector } from '@/stores/slices/Tracker.slice';
import { useAppDispatch } from '@/stores/store.hooks';
import { BasicFilledInput } from '@/libs/ui/form/BasicFilledInput';
import useStateSafe from '@/libs/react/SafeState.hook';
import * as Styled from '../tracking.styles';
import { generateRound } from '../mvp_mocks/round_mock';
import ScoreTable from './scoreTable';
import { Bullseye } from './bullseye';
import localStorageRepository from '@/utils/localStorage.repository';

interface TrackerProps {
  targets: string;
  shotsPerTarget: string;
}

export const Tracker: FC<TrackerProps> = ({ targets, shotsPerTarget }) => {
  const [contestantName, setContestantName] = useStateSafe('');
  const trackerSlice = trackerSelector();
  const cachedRound = localStorageRepository.getActiveRound();

  const [finishedLastRound, setFinishedLastRound] = useState<boolean>(false);
  const [activeTargetId, setActiveTargetId] = useState<string>();
  const [activeShotId, setActiveShotId] = useState<string>();
  const [didScoreChange, setDidScoreChange] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const activeRound = cachedRound ? cachedRound : generateRound(parseInt(targets), parseInt(shotsPerTarget));
    dispatch(setActiveRound(activeRound));
    setActiveTargetId(activeRound?.targets[0].id);
    setActiveShotId(activeRound?.targets[0].shots[0].id);
  }, []);

  useEffect(() => {
    goToNextShot();
  }, [didScoreChange]);

  const handleBullseyeClick = (shotScore: number) => {
    if (!activeTargetId || !activeShotId || finishedLastRound) return;

    handleShotChange(activeTargetId, activeShotId, shotScore.toString());
    setDidScoreChange(!didScoreChange);
  };

  const handleShotChange = (targetId: string, shotId: string, newValue: string) => {
    dispatch(setShot({ targetId, shotScore: parseInt(newValue), shotId }));
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

  const onCellChange = (targetId: string, shotId: string, newValue: string) => {
    setActiveTargetId(targetId);
    setActiveShotId(shotId);
    handleShotChange(targetId, shotId, newValue);
    setDidScoreChange(!didScoreChange);
  };

  if (trackerSlice.ActiveRound === undefined) return <p>Loading...</p>;
  return (
    <Styled.Column>
      <Styled.TrackerHeader align="space-between">
        <div style={{ width: '60%' }}>
          <BasicFilledInput initialValue="Name" onValueChange={setContestantName} value={contestantName} />
        </div>
        <Styled.Row style={{ width: '30%', userSelect: 'none' }}>
          <p>SCORE:</p>
          <Typography variant="h4">{trackerSlice.ActiveRound?.roundTotal}</Typography>
        </Styled.Row>
      </Styled.TrackerHeader>
      <Bullseye onClick={handleBullseyeClick} activeTargetId={activeTargetId} />
      <ScoreTable
        roundData={trackerSlice.ActiveRound}
        onCellChange={onCellChange}
        activeTargetId={activeTargetId!}
        activeShotId={activeShotId!}
      />
    </Styled.Column>
  );
};
