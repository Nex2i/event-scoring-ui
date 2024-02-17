import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '@/apis/api.context';
import { EventModelCreate } from '@/types/models/event/event.model';
import { CourseModelCreate } from '@/types/models/course/course.model';
import { TargetModelCreate } from '@/types/models/target/target.model';
import { ShotModelCreate } from '@/types/models/shot/shot.model';
import { useAuth } from '../authentication/useAuth.hook';
import { NewEventFormSchema } from './newEventForm';

interface hookResponse {
  isFetching: boolean;
  newEvent: unknown;
}

const { VITE_DEFAULT_TARGET_TYPE_ID } = import.meta.env;

export const useNewEventHook = ({ event }: { event?: NewEventFormSchema }): hookResponse => {
  const { user } = useAuth();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const apis = useContext(ApiContext);
  const navigate = useNavigate();

  const createEvent = async () => {
    if (!event) return;
    const eventPayload = mapFormToEvent(event, user.companyId);
    return await apis.event.createEvent(eventPayload);
  };

  const createCourse = async (eventId: string) => {
    if (!event) return;
    const coursePayload = mapFormToCourse(event, eventId);
    return await apis.course.createCourse(coursePayload);
  };

  const createNewEventAndCourse = async () => {
    const createdEvent = await createEvent();
    if (!createdEvent) return;
    return await createCourse(createdEvent.event.id);
  };

  useEffect(() => {
    let isMounted = true;

    if (!event) return;

    setIsFetching(true);

    createNewEventAndCourse()
      .then((course) => {
        if (isMounted && course) {
          navigate(`/event/${course.course.eventId}`);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsFetching(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [event]);

  return {
    isFetching,
    newEvent: {},
  };
};

function mapFormToEvent(form: NewEventFormSchema, companyId: string): EventModelCreate {
  return {
    companyId,
    name: form.eventName,
    startDate: form.startDate,
    endDate: form.endDate,
  };
}

function mapFormToCourse(form: NewEventFormSchema, eventId: string): CourseModelCreate {
  const course = {
    eventId,
    name: form.courseName,
    targets: [] as TargetModelCreate[],
  };

  const shotPreset = [] as ShotModelCreate[];
  for (let i = 0; i < form.numberOfShotsPerTarget; i++) {
    shotPreset.push({});
  }
  for (let i = 0; i < form.numberOfTargets; i++) {
    course.targets.push({
      name: `Target ${i + 1}`,
      distance: 20,
      targetTypeId: VITE_DEFAULT_TARGET_TYPE_ID,
      shots: shotPreset,
    });
  }

  return course;
}
