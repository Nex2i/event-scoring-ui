import { publicEventRoutes } from '@/routes/RouteConstants';
import { EventModel } from '@/types/models/event/event.model';
import { Button } from '@mui/material';
import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface NextTargetButtonProps {
  event: EventModel;
}

export const NextTargetButton: FC<NextTargetButtonProps> = ({ event }) => {
  const [isLastTarget, setIsLastTarget] = useState(false);
  const navigate = useNavigate();
  const { targetId, courseId } = useParams() as { targetId: string; courseId: string };

  const goToNextTarget = () => {
    if (!event.Courses) return;

    const currentCourseIndex = event.Courses?.findIndex((course) => course.id === courseId) ?? -1;
    const currentTargetIndex = event.Courses?.[currentCourseIndex]?.Targets.findIndex(
      (target) => target.id === targetId
    );

    const isLastTarget =
      currentTargetIndex === event.Courses[currentCourseIndex].Targets.length - 1;
    if (isLastTarget) {
      setIsLastTarget(true);
      return; // Exit
    }

    const nextTargetId = event.Courses[currentCourseIndex].Targets[currentTargetIndex + 1]?.id;
    if (nextTargetId) {
      navigate(`/${publicEventRoutes.base}/${event.id}/${courseId}/${nextTargetId}`);
    } else {
      console.error('No next target found');
    }
  };
  return isLastTarget ? (
    <Button onClick={goToNextTarget}>Submit Score</Button>
  ) : (
    <Button onClick={goToNextTarget}>Next Target</Button>
  );
};
