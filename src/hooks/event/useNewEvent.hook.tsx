import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '@/apis/api.context';
import { EventModelCreate } from '@/types/models/event/event.model';
import { CourseModelCreate } from '@/types/models/course/course.model';
import { TargetModel } from '@/types/models/target/target.model';
import { ShotModel } from '@/types/models/shot/shot.model';
import { useAuth } from '../authentication/useAuth.hook';
import { NewEventFormSchema } from './newEventForm';

interface hookResponse {
  isFetching: boolean;
  newEvent: unknown;
}

const defaultTargetTypeId = '06ccfdd3-40c2-457e-99d5-3bb9235f3221';

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
        console.log('course', course);
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
  console.log('map event form', form);
  return {
    companyId,
    name: form.eventName,
    startDate: form.startDate,
    endDate: form.endDate,
  };
}

function mapFormToCourse(form: NewEventFormSchema, eventId: string): CourseModelCreate {
  console.log('map course form', form);
  const course = {
    eventId,
    name: form.courseName,
    targets: [] as TargetModel[],
  };

  const shotPreset = [] as ShotModel[];
  for (let i = 0; i < form.numberOfShotsPerTarget; i++) {
    shotPreset.push({});
  }
  for (let i = 0; i < form.numberOfTargets; i++) {
    course.targets.push({
      name: `Target ${i + 1}`,
      distance: 20,
      targetTypeId: defaultTargetTypeId,
      shots: shotPreset,
    });
  }

  return course;
}
