import { FC } from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@/libs/routing/useQuery.hook';
import { publicEventRoutes } from '@/routes/RouteConstants';
import { EventModel } from '@/types/models/event/event.model';
import { useAppDispatch } from '@/stores/store.hooks';
import { initializeCourse } from '@/stores/slices/PublicEvent.slice';
import * as Styled from '../publicEvent.styles';
import { PublicLeaderboard } from './PublicLeaderboard';

interface EventInfoAndStartContainerProps {
  event: EventModel;
  disableStart: boolean;
}

export const EventInfoAndStartContainer: FC<EventInfoAndStartContainerProps> = ({
  event,
  disableStart,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { recordingType } = useParams() as { recordingType: string };

  const [isSubmitted] = useQuery(['submitted']);
  const { totalTargets, averageShotsPerTarget } = calculateTargetsAndShots(event);

  const startCourse = () => {
    const firstCourseId = event.Courses?.[0].id;
    const firstTargetId = event.Courses?.[0].Targets[0].id;
    dispatch(initializeCourse());
    navigate(
      `/${publicEventRoutes.base}/${event.id}/${recordingType}/${firstCourseId}/${firstTargetId}`
    );
  };
  return (
    <>
      {isSubmitted && <PublicLeaderboard eventId={event.id} />}
      <Styled.PublicEventHomeInfoContainer>
        <Typography variant="subtitle1">Total Targets: {totalTargets}</Typography>
        <Typography variant="subtitle1">Avg Shots per Target: {averageShotsPerTarget}</Typography>
        <br />
        {isSubmitted === 'true' ? (
          <>
            <Button onClick={startCourse} disabled={disableStart}>
              Go Again
            </Button>
          </>
        ) : (
          <Button onClick={startCourse} disabled={disableStart}>
            START
          </Button>
        )}
      </Styled.PublicEventHomeInfoContainer>
    </>
  );
};

function calculateTargetsAndShots(event: EventModel) {
  let totalTargets = 0;
  let totalShots = 0;

  event.Courses?.forEach((course) => {
    totalTargets += course.Targets.length;
    course.Targets.forEach((target) => {
      totalShots += target.Shots.length;
    });
  });

  const averageShotsPerTarget = totalTargets > 0 ? totalShots / totalTargets : 0;

  return {
    totalTargets,
    averageShotsPerTarget,
  };
}
