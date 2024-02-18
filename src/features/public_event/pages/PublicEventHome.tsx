import { Button, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventModel } from '@/types/models/event/event.model';
import { formatDate } from '@/shared/formatDate';
import { publicEventRoutes } from '@/routes/RouteConstants';
import { useQuery } from '@/libs/routing/useQuery.hook';

interface PublicEventHomeProps {
  event: EventModel;
}

export const PublicEventHome: FC<PublicEventHomeProps> = ({ event }) => {
  const navigate = useNavigate();
  const [isSubmitted] = useQuery(['submitted']);
  const { totalTargets, averageShotsPerTarget } = calculateTargetsAndShots(event);

  const startCourse = () => {
    const firstCourseId = event.Courses?.[0].id;
    const firstTargetId = event.Courses?.[0].Targets[0].id;
    navigate(`/${publicEventRoutes.base}/${event.id}/${firstCourseId}/${firstTargetId}`);
  };

  return (
    <div>
      <Typography variant="h4">{event.name}</Typography>
      <Typography variant="h6">Start Date: {formatDate(event.startDate)}</Typography>
      <Typography variant="h6">End Date: {formatDate(event.endDate)}</Typography>
      <Typography variant="body1">Total Targets: {totalTargets}</Typography>
      <Typography variant="body1">AVG Shots per Target: {averageShotsPerTarget}</Typography>
      <br />
      <br />
      <br />
      <br />
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
