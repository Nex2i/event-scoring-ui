import { Button } from '@mui/material';
import { FC, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EventModel } from '@/types/models/event/event.model';
import { publicEventRoutes } from '@/routes/RouteConstants';
import { clearAll } from '@/utils/localStorage';
import { publicEventSelector } from '@/stores/slices/PublicEvent.slice';
import { ApiContext } from '@/apis/api.context';
import * as Styled from '../publicEvent.styles';

interface NextTargetButtonProps {
  event: EventModel;
}

export const NextTargetButton: FC<NextTargetButtonProps> = ({ event }) => {
  const navigate = useNavigate();
  const { targetId, courseId, recordingType } = useParams() as {
    targetId: string;
    courseId: string;
    recordingType: string;
  };
  const [isLastTarget, setIsLastTarget] = useState(false);
  const [isFirstTarget, setIsFirstTarget] = useState(true);
  const { userCourseData } = publicEventSelector();
  const { userRecordApi } = useContext(ApiContext);

  useEffect(() => {
    if (!event.Courses) return;

    const currentCourseIndex = event.Courses?.findIndex((course) => course.id === courseId) ?? -1;
    const currentTargetIndex = event.Courses?.[currentCourseIndex]?.Targets.findIndex(
      (target) => target.id === targetId
    );

    setIsFirstTarget(currentTargetIndex === 0);
    setIsLastTarget(currentTargetIndex === event.Courses[currentCourseIndex].Targets.length - 1);
  }, [event]);

  const goToPreviousTarget = () => {
    if (!event.Courses) return;

    const currentCourseIndex = event.Courses?.findIndex((course) => course.id === courseId) ?? -1;
    const currentTargetIndex = event.Courses?.[currentCourseIndex]?.Targets.findIndex(
      (target) => target.id === targetId
    );

    const previousTargetId = event.Courses[currentCourseIndex].Targets[currentTargetIndex - 1]?.id;
    if (previousTargetId) {
      navigate(`/${publicEventRoutes.base}/${event.id}/${courseId}/${previousTargetId}`);
    } else {
      console.error('No previous target found');
    }
  };

  const goToNextTarget = () => {
    if (!event.Courses) return;

    const currentCourseIndex = event.Courses?.findIndex((course) => course.id === courseId) ?? -1;
    const currentTargetIndex = event.Courses?.[currentCourseIndex]?.Targets.findIndex(
      (target) => target.id === targetId
    );

    if (isLastTarget) {
      setIsLastTarget(true);
      return;
    }

    const nextTargetId = event.Courses[currentCourseIndex].Targets[currentTargetIndex + 1]?.id;
    if (nextTargetId) {
      navigate(
        `/${publicEventRoutes.base}/${event.id}/${recordingType}/${courseId}/${nextTargetId}`
      );
    } else {
      console.error('No next target found');
    }
  };

  const submitScore = async () => {
    if (!userCourseData) return;

    const payloadData = { ...userCourseData };

    await userRecordApi
      .submitCourse(payloadData)
      .then(() => {
        navigate(`/${publicEventRoutes.base}/${event.id}?submitted=true`);
      })
      .catch((error) => {
        console.error('Error submitting score', error);
      });
  };
  return (
    <Styled.AroundRow>
      {isFirstTarget ? (
        <Button onClick={clearCache}>Reset</Button>
      ) : (
        <Button onClick={goToPreviousTarget}>Back</Button>
      )}
      {isLastTarget ? (
        <Button onClick={submitScore}>Submit Score</Button>
      ) : (
        <Button onClick={goToNextTarget}>Next Target</Button>
      )}
    </Styled.AroundRow>
  );
};

function clearCache() {
  clearAll();
  location.reload();
}
