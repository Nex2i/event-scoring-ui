import { Button, Typography } from '@mui/material';
import { debounce } from 'lodash';
import { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { EventModel } from '@/types/models/event/event.model';
import { formatDate } from '@/shared/formatDate';
import { publicEventRoutes } from '@/routes/RouteConstants';
import { useQuery } from '@/libs/routing/useQuery.hook';
import { BasicFilledInput } from '@/libs/ui/form/BasicFilledInput';
import { publicEventSelector, setUsername } from '@/stores/slices/PublicEvent.slice';
import * as Styled from '../publicEvent.styles';

interface PublicEventHomeProps {
  event: EventModel;
}

export const PublicEventHome: FC<PublicEventHomeProps> = ({ event }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username } = publicEventSelector();

  const [isSubmitted] = useQuery(['submitted']);
  const { totalTargets, averageShotsPerTarget } = calculateTargetsAndShots(event);

  const startCourse = () => {
    const firstCourseId = event.Courses?.[0].id;
    const firstTargetId = event.Courses?.[0].Targets[0].id;
    navigate(`/${publicEventRoutes.base}/${event.id}/${firstCourseId}/${firstTargetId}`);
  };

  const debouncedChangeHandler = useCallback(
    debounce((nextValue: string) => {
      if (nextValue.length >= 15) {
        return;
      }
      return dispatch(setUsername(nextValue));
    }, 50),
    []
  );

  const updateUsername = (usernameValue: string) => {
    // Call the debounced function with the latest value
    debouncedChangeHandler(usernameValue);
  };

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

  return (
    <div id="event-home-container">
      <Typography variant="h4">{event.name}</Typography>
      <BasicFilledInput initialValue="Username" onValueChange={updateUsername} value={username} />
      <Styled.Row>
        <Typography variant="h6">Start Date: {formatDate(event.startDate)}</Typography>
        <Typography variant="h6">End Date: {formatDate(event.endDate)}</Typography>
      </Styled.Row>
      <br />
      <Typography variant="subtitle1">Total Targets: {totalTargets}</Typography>
      <Typography variant="subtitle1">Avg Shots per Target: {averageShotsPerTarget}</Typography>
      <br />
      {isSubmitted === 'true' ? (
        <>
          <Typography variant="h6">You have already submitted your scores</Typography>
          <Button onClick={startCourse}>Go Again</Button>
        </>
      ) : (
        <Button onClick={startCourse}>START</Button>
      )}
    </div>
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
