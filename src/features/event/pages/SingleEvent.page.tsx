import { FC, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@mui/material';
import { useEventHook } from '@/hooks/event/useEvent.hook';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import { QrCode } from '@/components/qr/QrCode';
import { ApiContext } from '@/apis/api.context';
import { EventModel } from '@/types/models/event/event.model';
import { formatDate } from '@/shared/formatDate';
import * as Styled from '../event.styles';
import { AdminLeaderboard } from '../components/AdminLeaderboard';

interface SingleEventPageProps {}

export const SingleEventPage: FC<SingleEventPageProps> = ({}) => {
  const { id } = useParams() as { id: string };
  const { apiUrl } = useContext(ApiContext);

  const { isFetching: isEventFetching, event } = useEventHook(id);

  if (isEventFetching) return <LoadingComponent loadingText="Fetching Event" />;
  if (!event) return <p>Error: No event found</p>;

  const qrCodeUrl = `${apiUrl}/api/qr/event/${id}`;
  const qrCodeName = buildEventQrName(event);
  return (
    <Styled.ScrollableContainer maxHeight="90vh">
      <Styled.StartRow align="flex-start">
        <Card>
          <div>
            <p>Name: {event.name}</p>
            <p>
              Dates: {formatDate(event.startDate)} - {formatDate(event.endDate)}
            </p>
            <div>
              <p>Courses:</p>
              {event?.Courses?.map((course) => (
                <div key={course.id}>
                  <p>{course.name}</p>
                  {course.Targets.map((target) => (
                    <Styled.Row key={target.id}>
                      <p>Name: {target.name}</p>
                      <p>Shots: {target.Shots.length}</p>
                    </Styled.Row>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Card>
        <QrCode url={qrCodeUrl} qrName={qrCodeName} />
      </Styled.StartRow>
      <AdminLeaderboard eventId={id} />
    </Styled.ScrollableContainer>
  );
};

function buildEventQrName(event: EventModel) {
  return `event-${formatDate(event.startDate)}-${formatDate(event.endDate)}-qr-code`;
}
